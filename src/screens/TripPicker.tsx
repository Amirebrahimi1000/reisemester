import type { Screen } from '../App'
import { useStore } from '../store'
import { tripCountries } from '../data/trips'

export default function TripPicker({ go }: { go: (s: Screen) => void }) {
  const { trips, activeTrip, setActiveTrip, deleteTrip } = useStore()

  return (
    <>
      <button className="backbtn" onClick={() => go('home')}>
        ← Tilbake
      </button>
      <h2 className="screen-title" style={{ marginTop: 10 }}>
        🗺️ Velg tur
      </h2>
      <p className="subtle" style={{ color: '#e0f2fe', margin: '0 4px 12px' }}>
        Hver tur har sin egen framgang og dagbok. Velg turen dere er på nå!
      </p>

      {trips.map((t) => {
        const active = t.id === activeTrip.id
        const lands = tripCountries(t)
        return (
          <div key={t.id} className={`trip-card ${active ? 'active' : ''}`}>
            <button
              className="trip-main"
              onClick={() => {
                setActiveTrip(t.id)
                go('home')
              }}
            >
              <span className="trip-emoji">{t.emoji}</span>
              <span className="trip-info">
                <span className="trip-name">
                  {t.name} {active && <span className="trip-badge">Aktiv</span>}
                </span>
                <span className="trip-route">
                  {t.from.name} → {t.to.name}
                </span>
                <span className="trip-flags">{lands.map((c) => c.flag).join(' ')}</span>
              </span>
            </button>
            {!t.builtIn && (
              <button
                className="trip-del"
                onClick={() => {
                  if (confirm(`Slette turen «${t.name}»? Framgang og dagbok for turen forsvinner.`))
                    deleteTrip(t.id)
                }}
              >
                🗑️
              </button>
            )}
          </div>
        )
      })}

      <button className="primary" onClick={() => go('lagtur')}>
        ➕ Lag ny tur
      </button>
    </>
  )
}
