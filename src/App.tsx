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
import { ErrorBoundary } from './components/ErrorBoundary'

export type Screen = 'home' | 'bingo' | 'quiz' | 'land' | 'oppdrag' | 'skilt' | 'spill' | 'dagbok'

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
  const [dark, setDark] = useState(() => localStorage.getItem(THEME_KEY) === 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
  }, [dark])

  // First run: ask for the player's name.
  if (!state.playerName) {
    return (
      <div className="intro">
        <div className="big-emoji">🚗🏔️</div>
        <h1>Gardaturen</h1>
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
        <h1>Gardaturen</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            className="theme-toggle"
            onClick={() => setDark((d) => !d)}
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
