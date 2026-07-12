import { useStore } from '../store'
import { tripCards } from '../data/bingo'
import { PLATES } from '../data/plates'
import { COUNTRY_DB } from '../data/countryDB'

type StoreState = ReturnType<typeof useStore>['state']
export interface BadgeDef {
  emoji: string
  name: string
  done: boolean
  hint: string
}

export function getBadges(
  state: StoreState,
  stars: number,
  totalCountries: number,
  goalStars: number,
  countryIds: string[],
): BadgeDef[] {
  const quizCorrect = Object.values(state.quiz).filter(Boolean).length
  const cards = tripCards(countryIds)
  const allBingo = cards.length > 0 && cards.every((c) => (state.bingo[c.id]?.length ?? 0) === c.items.length)
  const routeCodes = new Set(countryIds.map((id) => COUNTRY_DB[id]?.plate))
  const routePlates = PLATES.filter((p) => routeCodes.has(p.code))
  const gotRoutePlates = routePlates.length > 0 && routePlates.every((p) => state.plates.includes(p.code))

  return [
    { emoji: '🌍', name: 'Grensekrysser', done: totalCountries > 0 && state.countries.length >= totalCountries, hint: 'Besøk alle land' },
    { emoji: '🎯', name: 'Bingomester', done: allBingo, hint: 'Fullfør alle bingokort' },
    { emoji: '❓', name: 'Quizmester', done: quizCorrect >= 40, hint: '40 riktige i quiz' },
    { emoji: '🚗', name: 'Skiltsamler', done: gotRoutePlates, hint: 'Alle rute-skilt' },
    { emoji: '📔', name: 'Dagbokskribent', done: state.journal.length >= 5, hint: 'Skriv 5 sider' },
    { emoji: '🚩', name: 'Flaggekspert', done: state.flags.length >= 16, hint: 'Gjett 16 flagg' },
    { emoji: '🏖️', name: 'Framme!', done: stars >= goalStars, hint: 'Kjør helt fram' },
  ]
}

export function Badges() {
  const { state, stars, routeCountries, goalStars } = useStore()
  const badges = getBadges(state, stars, routeCountries.length, goalStars, routeCountries.map((c) => c.id))
  const earned = badges.filter((b) => b.done).length

  return (
    <div className="badges card">
      <div className="badges-head">
        🏅 Merker — {earned}/{badges.length}
      </div>
      <div className="badges-grid">
        {badges.map((b) => (
          <div key={b.name} className={`badge-item ${b.done ? 'earned' : ''}`}>
            <span className="badge-emoji">{b.emoji}</span>
            <span className="badge-name">{b.name}</span>
            <span className="badge-hint">{b.done ? 'Klart! ✓' : b.hint}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
