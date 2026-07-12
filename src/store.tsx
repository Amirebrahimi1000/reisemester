import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

// ---- Points awarded per action (stars) -------------------------------------
export const POINTS = {
  bingoCell: 1,
  quizCorrect: 2,
  country: 3,
  mission: 5,
  plate: 2,
  flag: 2,
  journal: 3,
} as const

// Total stars needed to "drive" all the way to Gardasjøen on the reise-o-meter.
// Chosen so the car clearly moves and can realistically arrive during the trip
// without needing 100 % completion of everything.
export const GOAL_STARS = 180

export interface JournalEntry {
  id: string
  date: string
  country: string // flag emoji of the country that day (or '')
  mood: string // emoji
  text: string
}

interface SaveState {
  playerName: string
  bingo: Record<string, string[]> // cardId -> marked cell ids
  quiz: Record<string, boolean> // questionId -> was answered correctly
  countries: string[] // unlocked country ids
  missions: string[] // completed mission ids
  plates: string[] // collected plate codes
  flags: string[] // plate codes guessed correctly in the flag game
  journal: JournalEntry[] // travel journal entries
}

const EMPTY: SaveState = {
  playerName: '',
  bingo: {},
  quiz: {},
  countries: [],
  missions: [],
  plates: [],
  flags: [],
  journal: [],
}

const STORAGE_KEY = 'gardaturen.save.v1'

function load(): SaveState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    return { ...EMPTY, ...JSON.parse(raw) }
  } catch {
    return EMPTY
  }
}

interface Store {
  state: SaveState
  stars: number
  setName: (name: string) => void
  toggleBingo: (cardId: string, cellId: string) => void
  answerQuiz: (questionId: string, correct: boolean) => void
  unlockCountry: (id: string) => void
  toggleMission: (id: string) => void
  togglePlate: (code: string) => void
  guessFlag: (code: string, correct: boolean) => void
  addJournal: (entry: Omit<JournalEntry, 'id' | 'date'>) => void
  deleteJournal: (id: string) => void
  reset: () => void
}

const StoreContext = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SaveState>(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const setName = useCallback((playerName: string) => {
    setState((s) => ({ ...s, playerName }))
  }, [])

  const toggleBingo = useCallback((cardId: string, cellId: string) => {
    setState((s) => {
      const marked = new Set(s.bingo[cardId] ?? [])
      marked.has(cellId) ? marked.delete(cellId) : marked.add(cellId)
      return { ...s, bingo: { ...s.bingo, [cardId]: [...marked] } }
    })
  }, [])

  const answerQuiz = useCallback((questionId: string, correct: boolean) => {
    setState((s) => {
      // Once answered correctly it stays correct; never regress the score.
      if (s.quiz[questionId]) return s
      return { ...s, quiz: { ...s.quiz, [questionId]: correct } }
    })
  }, [])

  const unlockCountry = useCallback((id: string) => {
    setState((s) => (s.countries.includes(id) ? s : { ...s, countries: [...s.countries, id] }))
  }, [])

  const toggleMission = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      missions: s.missions.includes(id)
        ? s.missions.filter((m) => m !== id)
        : [...s.missions, id],
    }))
  }, [])

  const togglePlate = useCallback((code: string) => {
    setState((s) => ({
      ...s,
      plates: s.plates.includes(code)
        ? s.plates.filter((p) => p !== code)
        : [...s.plates, code],
    }))
  }, [])

  const guessFlag = useCallback((code: string, correct: boolean) => {
    if (!correct) return
    setState((s) => (s.flags.includes(code) ? s : { ...s, flags: [...s.flags, code] }))
  }, [])

  const addJournal = useCallback((entry: Omit<JournalEntry, 'id' | 'date'>) => {
    setState((s) => {
      const now = new Date()
      const id = `${now.getTime()}-${s.journal.length}`
      const date = now.toLocaleDateString('nb-NO', { weekday: 'long', day: 'numeric', month: 'long' })
      return { ...s, journal: [{ id, date, ...entry }, ...s.journal] }
    })
  }, [])

  const deleteJournal = useCallback((id: string) => {
    setState((s) => ({ ...s, journal: s.journal.filter((e) => e.id !== id) }))
  }, [])

  const reset = useCallback(() => {
    setState((s) => ({ ...EMPTY, playerName: s.playerName }))
  }, [])

  const stars = useMemo(() => {
    const bingoCells = Object.values(state.bingo).reduce((n, arr) => n + arr.length, 0)
    const quizCorrect = Object.values(state.quiz).filter(Boolean).length
    return (
      bingoCells * POINTS.bingoCell +
      quizCorrect * POINTS.quizCorrect +
      state.countries.length * POINTS.country +
      state.missions.length * POINTS.mission +
      state.plates.length * POINTS.plate +
      state.flags.length * POINTS.flag +
      state.journal.length * POINTS.journal
    )
  }, [state])

  const value: Store = {
    state,
    stars,
    setName,
    toggleBingo,
    answerQuiz,
    unlockCountry,
    toggleMission,
    togglePlate,
    guessFlag,
    addJournal,
    deleteJournal,
    reset,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): Store {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
