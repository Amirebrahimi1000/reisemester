import { useState } from 'react'
import type { Screen } from '../App'
import { useStore } from '../store'
import { ALL_COUNTRIES, COUNTRY_DB } from '../data/countryDB'
import { suggestGoal } from '../data/trips'
import type { Trip } from '../data/trips'

const center = (id: string) => {
  const c = COUNTRY_DB[id]
  return { lat: (c.latMin + c.latMax) / 2, lon: (c.lonMin + c.lonMax) / 2 }
}

export default function TripBuilder({ go }: { go: (s: Screen) => void }) {
  const { addTrip } = useStore()
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [selected, setSelected] = useState<string[]>([]) // country ids in tap order

  const toggle = (id: string) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  }

  const canSave = name.trim() && from.trim() && to.trim() && selected.length >= 2

  const save = () => {
    if (!canSave) return
    const firstC = center(selected[0])
    const lastC = center(selected[selected.length - 1])
    const trip: Trip = {
      id: `user-${new Date().getTime()}`,
      name: name.trim(),
      emoji: '🚗',
      from: { name: from.trim(), lat: firstC.lat, lon: firstC.lon },
      to: { name: to.trim(), lat: lastC.lat, lon: lastC.lon },
      countryIds: selected,
      goalStars: suggestGoal(selected.length),
    }
    addTrip(trip)
    go('home')
  }

  return (
    <>
      <button className="backbtn" onClick={() => go('velgtur')}>
        ← Tilbake
      </button>
      <h2 className="screen-title" style={{ marginTop: 10 }}>
        ➕ Lag ny tur
      </h2>
      <p className="subtle" style={{ color: '#e0f2fe', margin: '0 4px 12px' }}>
        Gi turen et navn, skriv start og mål, og trykk landene i den rekkefølgen
        dere kjører gjennom dem.
      </p>

      <div className="card">
        <label className="build-label">Navn på turen</label>
        <input
          className="journal-input"
          placeholder="F.eks. Sommerferie i Sverige"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <label className="build-label">Startsted</label>
            <input
              className="journal-input"
              placeholder="Skien"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label className="build-label">Mål</label>
            <input
              className="journal-input"
              placeholder="Stockholm"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>

        <label className="build-label">
          Velg land i rekkefølge {selected.length > 0 && `(${selected.length} valgt)`}
        </label>
        {selected.length > 0 && (
          <div className="build-order">
            🏁 {selected.map((id) => COUNTRY_DB[id].flag).join(' → ')} 🏁
          </div>
        )}
        <div className="build-grid">
          {ALL_COUNTRIES.map((c) => {
            const idx = selected.indexOf(c.id)
            return (
              <button
                key={c.id}
                className={`build-country ${idx >= 0 ? 'picked' : ''}`}
                onClick={() => toggle(c.id)}
              >
                {idx >= 0 && <span className="build-num">{idx + 1}</span>}
                <span className="build-flag">{c.flag}</span>
                <span className="build-cname">{c.name}</span>
              </button>
            )
          })}
        </div>

        <button className="primary" disabled={!canSave} onClick={save}>
          ✅ Lag turen
        </button>
        {!canSave && (
          <p className="subtle" style={{ textAlign: 'center', marginBottom: 0 }}>
            Fyll inn navn, start, mål og minst 2 land.
          </p>
        )}
      </div>
    </>
  )
}
