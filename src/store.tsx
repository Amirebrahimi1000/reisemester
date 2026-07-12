import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { BUILTIN_TRIPS, tripCountries as resolveTripCountries } from './data/trips'
import type { Trip } from './data/trips'
import type { Country } from './data/countryDB'

// ---- Points awarded per action (stars) -------------------------------------
export const POINTS = {
  bingoCell: 1,
  quizCorrect: 2,
  country: 3,
  mission: 5,
  plate: 2,
  flag: 2,
  journal: 3,
  achievement: 4,
} as const

export interface JournalEntry {
  id: string
  date: string
  country: string
  mood: string
  text: string
}

// Per-trip game progress (each trip has its own, kept separately).
interface Progress {
  bingo: Record<string, string[]>
  quiz: Record<string, boolean>
  countries: string[]
  missions: string[]
  plates: string[]
  flags: string[]
  journal: JournalEntry[]
  tripJournalIds: string[]
  achievements: string[]
}

const EMPTY: Progress = {
  bingo: {},
  quiz: {},
  countries: [],
  missions: [],
  plates: [],
  flags: [],
  journal: [],
  tripJournalIds: [],
  achievements: [],
}

const PLAYER_KEY = 'gardaturen.player'
const ACTIVE_KEY = 'gardaturen.activeTrip'
const USERTRIPS_KEY = 'gardaturen.userTrips'
const OLD_SAVE_KEY = 'gardaturen.save.v1'
const saveKey = (tripId: string) => `gardaturen.save.v1.${tripId}`

// One-time migration: move the old single save into the "ned" trip and lift the
// player name to a global key.
function migrate() {
  try {
    const old = localStorage.getItem(OLD_SAVE_KEY)
    if (!old) return
    const parsed = JSON.parse(old)
    if (parsed.playerName && !localStorage.getItem(PLAYER_KEY)) {
      localStorage.setItem(PLAYER_KEY, parsed.playerName)
    }
    if (!localStorage.getItem(saveKey('ned'))) {
      const { playerName: _drop, ...progress } = parsed
      localStorage.setItem(saveKey('ned'), JSON.stringify(progress))
    }
    localStorage.removeItem(OLD_SAVE_KEY)
  } catch {
    /* ignore */
  }
}
migrate()

function loadProgress(tripId: string): Progress {
  try {
    const raw = localStorage.getItem(saveKey(tripId))
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : { ...EMPTY }
  } catch {
    return { ...EMPTY }
  }
}

function loadUserTrips(): Trip[] {
  try {
    const raw = localStorage.getItem(USERTRIPS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

interface Store {
  state: Progress & { playerName: string }
  stars: number
  goalStars: number
  trips: Trip[]
  activeTrip: Trip
  routeCountries: Country[]
  setName: (name: string) => void
  setActiveTrip: (id: string) => void
  addTrip: (trip: Trip) => void
  deleteTrip: (id: string) => void
  toggleBingo: (cardId: string, cellId: string) => void
  answerQuiz: (questionId: string, correct: boolean) => void
  unlockCountry: (id: string) => void
  toggleMission: (id: string) => void
  togglePlate: (code: string) => void
  guessFlag: (code: string, correct: boolean) => void
  addJournal: (entry: Omit<JournalEntry, 'id' | 'date'>) => void
  deleteJournal: (id: string) => void
  unlockAchievement: (id: string) => void
  reset: () => void
}

const StoreContext = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [playerName, setPlayerNameState] = useState(() => localStorage.getItem(PLAYER_KEY) ?? '')
  const [userTrips, setUserTrips] = useState<Trip[]>(loadUserTrips)
  const trips = useMemo(() => [...BUILTIN_TRIPS, ...userTrips], [userTrips])

  const [activeTripId, setActiveTripId] = useState<string>(() => {
    const stored = localStorage.getItem(ACTIVE_KEY)
    return stored ?? 'ned'
  })
  const [progress, setProgress] = useState<Progress>(() => loadProgress(activeTripId))

  const activeTrip = useMemo(
    () => trips.find((t) => t.id === activeTripId) ?? BUILTIN_TRIPS[0],
    [trips, activeTripId],
  )
  const routeCountries = useMemo(() => resolveTripCountries(activeTrip), [activeTrip])

  // Persist progress for the current trip.
  useEffect(() => {
    localStorage.setItem(saveKey(activeTripId), JSON.stringify(progress))
  }, [activeTripId, progress])

  useEffect(() => {
    if (playerName) localStorage.setItem(PLAYER_KEY, playerName)
  }, [playerName])

  useEffect(() => {
    localStorage.setItem(USERTRIPS_KEY, JSON.stringify(userTrips))
  }, [userTrips])

  const setName = useCallback((name: string) => setPlayerNameState(name), [])

  const setActiveTrip = useCallback((id: string) => {
    setActiveTripId(id)
    setProgress(loadProgress(id))
    localStorage.setItem(ACTIVE_KEY, id)
  }, [])

  const addTrip = useCallback((trip: Trip) => {
    setUserTrips((ts) => [...ts, trip])
    setActiveTripId(trip.id)
    setProgress(loadProgress(trip.id))
    localStorage.setItem(ACTIVE_KEY, trip.id)
  }, [])

  const deleteTrip = useCallback((id: string) => {
    setUserTrips((ts) => ts.filter((t) => t.id !== id))
    try {
      localStorage.removeItem(saveKey(id))
    } catch {
      /* ignore */
    }
    setActiveTripId((cur) => {
      if (cur !== id) return cur
      setProgress(loadProgress('ned'))
      localStorage.setItem(ACTIVE_KEY, 'ned')
      return 'ned'
    })
  }, [])

  const toggleBingo = useCallback((cardId: string, cellId: string) => {
    setProgress((s) => {
      const marked = new Set(s.bingo[cardId] ?? [])
      marked.has(cellId) ? marked.delete(cellId) : marked.add(cellId)
      return { ...s, bingo: { ...s.bingo, [cardId]: [...marked] } }
    })
  }, [])

  const answerQuiz = useCallback((questionId: string, correct: boolean) => {
    setProgress((s) => (s.quiz[questionId] ? s : { ...s, quiz: { ...s.quiz, [questionId]: correct } }))
  }, [])

  const unlockCountry = useCallback((id: string) => {
    setProgress((s) => (s.countries.includes(id) ? s : { ...s, countries: [...s.countries, id] }))
  }, [])

  const toggleMission = useCallback((id: string) => {
    setProgress((s) => ({
      ...s,
      missions: s.missions.includes(id) ? s.missions.filter((m) => m !== id) : [...s.missions, id],
    }))
  }, [])

  const togglePlate = useCallback((code: string) => {
    setProgress((s) => ({
      ...s,
      plates: s.plates.includes(code) ? s.plates.filter((p) => p !== code) : [...s.plates, code],
    }))
  }, [])

  const guessFlag = useCallback((code: string, correct: boolean) => {
    if (!correct) return
    setProgress((s) => (s.flags.includes(code) ? s : { ...s, flags: [...s.flags, code] }))
  }, [])

  const addJournal = useCallback((entry: Omit<JournalEntry, 'id' | 'date'>) => {
    setProgress((s) => {
      const now = new Date()
      const id = `${now.getTime()}-${s.journal.length}`
      const date = now.toLocaleDateString('nb-NO', { weekday: 'long', day: 'numeric', month: 'long' })
      return {
        ...s,
        journal: [{ id, date, ...entry }, ...s.journal],
        tripJournalIds: [...s.tripJournalIds, id],
      }
    })
  }, [])

  const deleteJournal = useCallback((id: string) => {
    setProgress((s) => ({
      ...s,
      journal: s.journal.filter((e) => e.id !== id),
      tripJournalIds: s.tripJournalIds.filter((x) => x !== id),
    }))
  }, [])

  const unlockAchievement = useCallback((id: string) => {
    setProgress((s) => (s.achievements.includes(id) ? s : { ...s, achievements: [...s.achievements, id] }))
  }, [])

  const reset = useCallback(() => {
    // Keep this trip's journal; clear the rest of this trip's progress.
    setProgress((s) => ({ ...EMPTY, journal: s.journal }))
  }, [])

  const stars = useMemo(() => {
    const bingoCells = Object.values(progress.bingo).reduce((n, arr) => n + arr.length, 0)
    const quizCorrect = Object.values(progress.quiz).filter(Boolean).length
    return (
      bingoCells * POINTS.bingoCell +
      quizCorrect * POINTS.quizCorrect +
      progress.countries.length * POINTS.country +
      progress.missions.length * POINTS.mission +
      progress.plates.length * POINTS.plate +
      progress.flags.length * POINTS.flag +
      progress.tripJournalIds.length * POINTS.journal +
      progress.achievements.length * POINTS.achievement
    )
  }, [progress])

  const value: Store = {
    state: { playerName, ...progress },
    stars,
    goalStars: activeTrip.goalStars,
    trips,
    activeTrip,
    routeCountries,
    setName,
    setActiveTrip,
    addTrip,
    deleteTrip,
    toggleBingo,
    answerQuiz,
    unlockCountry,
    toggleMission,
    togglePlate,
    guessFlag,
    addJournal,
    deleteJournal,
    unlockAchievement,
    reset,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): Store {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
