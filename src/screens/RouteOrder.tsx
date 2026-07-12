import { useState } from 'react'
import { byOrder } from '../data/countries'
import { useStore } from '../store'

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function RouteOrder() {
  const { unlockAchievement } = useStore()
  const [placed, setPlaced] = useState<string[]>([]) // country ids in chosen order
  const [wrongId, setWrongId] = useState<string | null>(null)
  const [pool, setPool] = useState(() => shuffled(byOrder))

  const nextExpected = byOrder[placed.length]
  const done = placed.length === byOrder.length

  const tap = (id: string) => {
    if (placed.includes(id)) return
    if (id === nextExpected.id) {
      const np = [...placed, id]
      setPlaced(np)
      setWrongId(null)
      if (np.length === byOrder.length) unlockAchievement('reiserute')
    } else {
      setWrongId(id)
      setTimeout(() => setWrongId(null), 500)
    }
  }

  const restart = () => {
    setPlaced([])
    setWrongId(null)
    setPool(shuffled(byOrder))
  }

  return (
    <div className="card">
      <p style={{ fontWeight: 800, margin: '0 0 4px' }}>🗺️ Reiseruta</p>
      <p className="subtle" style={{ marginTop: 0 }}>
        Trykk landene i riktig rekkefølge – slik dere kjører fra Skien til Gardasjøen!
      </p>

      {/* Progress: chosen route so far */}
      <div className="route-progress">
        🏁
        {placed.map((id) => {
          const c = byOrder.find((x) => x.id === id)!
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
