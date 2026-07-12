import { useState } from 'react'
import type { Screen } from '../App'
import { useStore } from '../store'
import { tripCards } from '../data/bingo'
import { tripCategories } from '../data/quiz'
import { MISSIONS } from '../data/missions'
import { PLATES } from '../data/plates'
import { haversineKm } from '../lib/distance'
import { getBadges } from '../components/Badges'

const TILES: { id: Screen; emoji: string; name: string; desc: string }[] = [
  { id: 'bingo', emoji: '🎯', name: 'Reisebingo', desc: 'Finn ting ut av bilvinduet' },
  { id: 'quiz', emoji: '❓', name: 'Quiz', desc: 'Spørsmål om landene' },
  { id: 'spill', emoji: '🎮', name: 'Minispill', desc: 'Flaggspill og husk-spill' },
  { id: 'land', emoji: '🌍', name: 'Grenseland', desc: 'Lås opp fakta om hvert land' },
  { id: 'oppdrag', emoji: '🏆', name: 'Oppdrag', desc: 'Morsomme utfordringer' },
  { id: 'skilt', emoji: '🚗', name: 'Skiltjakt', desc: 'Samle bilskilt fra Europa' },
  { id: 'dagbok', emoji: '📔', name: 'Reisedagbok', desc: 'Skriv om turen din' },
  { id: 'merker', emoji: '🏅', name: 'Merker & diplom', desc: 'Se merker og reisediplom' },
]

export default function Home({ go }: { go: (s: Screen) => void }) {
  const { state, stars, reset, goalStars, activeTrip, routeCountries } = useStore()
  const [dist, setDist] = useState('')
  const [distBusy, setDistBusy] = useState(false)
  const countryIds = routeCountries.map((c) => c.id)
  const badges = getBadges(state, stars, routeCountries.length, goalStars, countryIds)
  const earnedBadges = badges.filter((b) => b.done).length

  const howFar = () => {
    if (!('geolocation' in navigator)) {
      setDist('📵 Enheten støtter ikke posisjon.')
      return
    }
    setDistBusy(true)
    setDist('📡 Måler avstand …')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setDistBusy(false)
        const km = haversineKm(pos.coords.latitude, pos.coords.longitude, activeTrip.to.lat, activeTrip.to.lon)
        if (km < 3) setDist(`🎉 Dere er nesten framme ved ${activeTrip.to.name}!`)
        else setDist(`📏 Ca. ${Math.round(km).toLocaleString('nb-NO')} km igjen til ${activeTrip.to.name}`)
      },
      () => {
        setDistBusy(false)
        setDist('🛰️ Fikk ikke posisjon – GPS trenger fri himmel. Prøv igjen ute i det fri.')
      },
      { enableHighAccuracy: true, timeout: 9000, maximumAge: 60000 },
    )
  }

  const cards = tripCards(countryIds)
  const cats = tripCategories(countryIds)
  const bingoCells = cards.reduce((n, c) => n + (state.bingo[c.id]?.length ?? 0), 0)
  const totalBingo = cards.reduce((n, c) => n + c.items.length, 0)
  const quizDone = cats.reduce((n, c) => n + c.questions.filter((q) => state.quiz[q.id]).length, 0)
  const totalQuiz = cats.reduce((n, c) => n + c.questions.length, 0)

  const counts: Record<string, string> = {
    bingo: `${bingoCells}/${totalBingo}`,
    quiz: `${quizDone}/${totalQuiz}`,
    spill: '9 spill',
    land: `${state.countries.length}/${routeCountries.length}`,
    oppdrag: `${state.missions.length}/${MISSIONS.length}`,
    skilt: `${state.plates.length}/${PLATES.length}`,
    dagbok: `${state.journal.length} sider`,
    merker: `${earnedBadges}/${badges.length}`,
  }

  const pct = Math.min(100, Math.round((stars / goalStars) * 100))

  return (
    <>
      <div className="roadmeter">
        <h2>Hei {state.playerName}! 👋</h2>

        <button className="trip-switch" onClick={() => go('velgtur')}>
          {activeTrip.emoji} {activeTrip.name} <span className="trip-switch-hint">🗺️ Bytt tur</span>
        </button>

        <p className="subtle" style={{ margin: '8px 0 4px' }}>
          Reise-o-meteret: samle stjerner så kjører bilen nærmere {activeTrip.to.name}!
        </p>
        <div className="track">
          <div className="track-fill" style={{ width: `${pct}%` }} />
          <div className="track-car" style={{ left: `${pct}%` }}>
            🚗
          </div>
        </div>
        <div className="track-ends">
          <span>🏁 {activeTrip.from.name}</span>
          <span>{activeTrip.to.name} 🏖️</span>
        </div>
        <div className="progresstext">
          {pct < 100 ? `${pct}% framme – ⭐ ${stars} stjerner` : `🎉 Framme ved ${activeTrip.to.name}!`}
        </div>

        <div className="visited">
          <div className="visited-label">
            🌍 Vi har vært i <b>{state.countries.length}</b> av {routeCountries.length} land
          </div>
          <div className="visited-flags">
            {routeCountries.map((c) => (
              <span key={c.id} className={state.countries.includes(c.id) ? '' : 'flag-dim'}>
                {c.flag}
              </span>
            ))}
          </div>
        </div>

        <button className="farbtn" onClick={howFar} disabled={distBusy}>
          {distBusy ? '📡 Måler …' : `📏 Hvor langt igjen til ${activeTrip.to.name}?`}
        </button>
        {dist && <div className="far-msg">{dist}</div>}
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
          if (
            confirm(
              `Nullstille stjerner og spillframgang for «${activeTrip.name}»?\n\nReisedagboka for denne turen beholdes.`,
            )
          )
            reset()
        }}
      >
        Nullstill denne turen
      </button>
    </>
  )
}
