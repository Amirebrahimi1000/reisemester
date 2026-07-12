import { useEffect, useState } from 'react'
import { StoreProvider, useStore } from './store'
import Home from './screens/Home'
import Bingo from './screens/Bingo'
import Quiz from './screens/Quiz'
import Countries from './screens/Countries'
import Missions from './screens/Missions'
import Plates from './screens/Plates'
import Games from './screens/Games'
import Journal from './screens/Journal'
import Merker from './screens/Merker'
import TripPicker from './screens/TripPicker'
import TripBuilder from './screens/TripBuilder'
import { ErrorBoundary } from './components/ErrorBoundary'

export type Screen =
  | 'home'
  | 'bingo'
  | 'quiz'
  | 'land'
  | 'oppdrag'
  | 'skilt'
  | 'spill'
  | 'dagbok'
  | 'merker'
  | 'velgtur'
  | 'lagtur'

const TABS: { id: Screen; label: string; emoji: string }[] = [
  { id: 'home', label: 'Hjem', emoji: '🏠' },
  { id: 'bingo', label: 'Bingo', emoji: '🎯' },
  { id: 'quiz', label: 'Quiz', emoji: '❓' },
  { id: 'spill', label: 'Spill', emoji: '🎮' },
  { id: 'land', label: 'Land', emoji: '🌍' },
  { id: 'oppdrag', label: 'Oppdrag', emoji: '🏆' },
  { id: 'skilt', label: 'Skilt', emoji: '🚗' },
  { id: 'dagbok', label: 'Dagbok', emoji: '📔' },
]

const THEME_KEY = 'gardaturen.theme'

function Shell() {
  const { state, stars, setName } = useStore()
  const [screen, setScreen] = useState<Screen>('home')
  const [nameDraft, setNameDraft] = useState('')
  // Default follows the phone's setting; once the user toggles, we remember it.
  const [dark, setDark] = useState<boolean>(() => {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'dark') return true
    if (stored === 'light') return false
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  })

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  // Follow live system changes until the user makes an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mq) return
    const onChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(THEME_KEY)) setDark(e.matches)
    }
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  const toggleTheme = () => {
    setDark((d) => {
      const next = !d
      localStorage.setItem(THEME_KEY, next ? 'dark' : 'light') // explicit choice
      return next
    })
  }

  // First run: ask for the player's name.
  if (!state.playerName) {
    return (
      <div className="intro">
        <div className="big-emoji">🚗🏔️</div>
        <h1>Reisemester</h1>
        <p style={{ color: '#fff', maxWidth: 320, fontWeight: 700 }}>
          Reisespill for hele veien fra Skien til Gardasjøen! Hva heter du?
        </p>
        <input
          autoFocus
          placeholder="Navnet ditt"
          value={nameDraft}
          onChange={(e) => setNameDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && nameDraft.trim()) setName(nameDraft.trim())
          }}
        />
        <button
          className="primary"
          style={{ maxWidth: 320 }}
          disabled={!nameDraft.trim()}
          onClick={() => nameDraft.trim() && setName(nameDraft.trim())}
        >
          Start reisen! 🎉
        </button>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="topbar">
        <h1>Reisemester</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={dark ? 'Bytt til dagmodus' : 'Bytt til kveldsmodus'}
          >
            {dark ? '☀️' : '🌙'}
          </button>
          <span className="starcount">⭐ {stars}</span>
        </div>
      </div>

      <ErrorBoundary key={screen}>
        {screen === 'home' && <Home go={setScreen} />}
        {screen === 'bingo' && <Bingo />}
        {screen === 'quiz' && <Quiz />}
        {screen === 'land' && <Countries />}
        {screen === 'oppdrag' && <Missions />}
        {screen === 'skilt' && <Plates />}
        {screen === 'spill' && <Games />}
        {screen === 'dagbok' && <Journal />}
        {screen === 'merker' && <Merker onBack={() => setScreen('home')} />}
        {screen === 'velgtur' && <TripPicker go={setScreen} />}
        {screen === 'lagtur' && <TripBuilder go={setScreen} />}
      </ErrorBoundary>

      <nav className="tabbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={screen === t.id ? 'active' : ''}
            onClick={() => setScreen(t.id)}
          >
            <span className="tabemoji">{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  )
}
