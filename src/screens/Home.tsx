import type { Screen } from '../App'
import { GOAL_STARS, useStore } from '../store'
import { BINGO_CARDS } from '../data/bingo'
import { QUIZ } from '../data/quiz'
import { COUNTRIES } from '../data/countries'
import { MISSIONS } from '../data/missions'
import { PLATES } from '../data/plates'

const TILES: { id: Screen; emoji: string; name: string; desc: string }[] = [
  { id: 'bingo', emoji: '🎯', name: 'Reisebingo', desc: 'Finn ting ut av bilvinduet' },
  { id: 'quiz', emoji: '❓', name: 'Quiz', desc: 'Spørsmål om landene' },
  { id: 'flagg', emoji: '🚩', name: 'Gjett landet', desc: 'Kjenn igjen flaggene' },
  { id: 'land', emoji: '🌍', name: 'Grenseland', desc: 'Lås opp fakta om hvert land' },
  { id: 'oppdrag', emoji: '🏆', name: 'Oppdrag', desc: 'Morsomme utfordringer' },
  { id: 'skilt', emoji: '🚗', name: 'Skiltjakt', desc: 'Samle bilskilt fra Europa' },
  { id: 'dagbok', emoji: '📔', name: 'Reisedagbok', desc: 'Skriv om turen din' },
]

export default function Home({ go }: { go: (s: Screen) => void }) {
  const { state, stars, reset } = useStore()

  const bingoCells = Object.values(state.bingo).reduce((n, a) => n + a.length, 0)
  const totalBingo = BINGO_CARDS.reduce((n, c) => n + c.cells.length, 0)
  const quizDone = Object.values(state.quiz).filter(Boolean).length
  const totalQuiz = QUIZ.reduce((n, c) => n + c.questions.length, 0)

  const counts: Record<Screen, string> = {
    home: '',
    bingo: `${bingoCells}/${totalBingo}`,
    quiz: `${quizDone}/${totalQuiz}`,
    flagg: `${state.flags.length}/${PLATES.length}`,
    land: `${state.countries.length}/${COUNTRIES.length}`,
    oppdrag: `${state.missions.length}/${MISSIONS.length}`,
    skilt: `${state.plates.length}/${PLATES.length}`,
    dagbok: `${state.journal.length} sider`,
  }

  const pct = Math.min(100, Math.round((stars / GOAL_STARS) * 100))

  return (
    <>
      <div className="roadmeter">
        <h2>Hei {state.playerName}! 👋</h2>
        <p className="subtle" style={{ margin: '2px 0 4px' }}>
          Reise-o-meteret: samle stjerner så kjører bilen nærmere Gardasjøen!
        </p>
        <div className="track">
          <div className="track-fill" style={{ width: `${pct}%` }} />
          <div className="track-car" style={{ left: `${pct}%` }}>
            🚗
          </div>
        </div>
        <div className="track-ends">
          <span>🏁 Skien</span>
          <span>Gardasjøen 🏖️</span>
        </div>
        <div className="progresstext">
          {pct < 100 ? `${pct}% framme – ⭐ ${stars} stjerner` : '🎉 Framme ved Gardasjøen!'}
        </div>
      </div>

      <div className="menu-grid">
        {TILES.map((t) => (
          <button key={t.id} className="tile" onClick={() => go(t.id)}>
            <span className="emoji">{t.emoji}</span>
            <span className="tname">{t.name}</span>
            <span className="tdesc">{t.desc}</span>
            <span className="badge">{counts[t.id]}</span>
          </button>
        ))}
      </div>

      <button
        className="reset-link"
        onClick={() => {
          if (confirm('Nullstille alle stjerner og starte reisen på nytt (f.eks. for hjemturen)?'))
            reset()
        }}
      >
        Nullstill for ny tur
      </button>
    </>
  )
}
