import { useState } from 'react'
import { useStore } from '../store'
import type { Country } from '../data/countryDB'

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function RouteOrder() {
  const { unlockAchievement, routeCountries, activeTrip } = useStore()
  const order: Country[] = routeCountries
  const [placed, setPlaced] = useState<string[]>([])
  const [wrongId, setWrongId] = useState<string | null>(null)
  const [pool, setPool] = useState(() => shuffled(order))

  const done = placed.length === order.length
  const nextExpected = order[placed.length]

  const tap = (id: string) => {
    if (placed.includes(id) || !nextExpected) return
    if (id === nextExpected.id) {
      const np = [...placed, id]
      setPlaced(np)
      setWrongId(null)
      if (np.length === order.length) unlockAchievement('reiserute')
    } else {
      setWrongId(id)
      setTimeout(() => setWrongId(null), 500)
    }
  }

  const restart = () => {
    setPlaced([])
    setWrongId(null)
    setPool(shuffled(order))
  }

  return (
    <div className="card">
      <p style={{ fontWeight: 800, margin: '0 0 4px' }}>🗺️ Reiseruta</p>
      <p className="subtle" style={{ marginTop: 0 }}>
        Trykk landene i riktig rekkefølge – slik dere kjører fra {activeTrip.from.name} til{' '}
        {activeTrip.to.name}!
      </p>

      <div className="route-progress">
        🏁
        {placed.map((id) => {
          const c = order.find((x) => x.id === id)!
          return <span key={id}> → {c.flag}</span>
        })}
        {!done && <span className="route-next"> → ?</span>}
        {done && <span> → 🏖️</span>}
      </div>

      {done ? (
        <>
          <div className="win-banner" style={{ marginTop: 12 }}>
            🎉 Helt riktig rute! Du kan reisen! +4 ⭐
          </div>
          <button className="primary" onClick={restart}>
            🔁 Prøv igjen
          </button>
        </>
      ) : (
        <div className="route-grid">
          {pool.map((c) => {
            const isPlaced = placed.includes(c.id)
            return (
              <button
                key={c.id}
                className={`route-btn ${isPlaced ? 'placed' : ''} ${wrongId === c.id ? 'wrong' : ''}`}
                onClick={() => tap(c.id)}
                disabled={isPlaced}
              >
                <span style={{ fontSize: 26 }}>{c.flag}</span>
                <span>{c.name}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
