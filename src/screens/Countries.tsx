import { useState } from 'react'
import { byOrder } from '../data/countries'
import { useStore } from '../store'
import { CountryMap } from '../components/CountryMap'
import { CountrySilhouette } from '../components/CountrySilhouette'

// A little decorative emoji "postcard" per country.
const SCENES: Record<string, string[]> = {
  no: ['🏔️', '⛴️', '🌲', '🦌'],
  dk: ['🚲', '🧜‍♀️', '🌭', '🧱'],
  de: ['🏰', '🚗', '🥨', '🎄'],
  be: ['🍟', '🍫', '🧇', '🎨'],
  lu: ['🏰', '🌉', '🚈', '💶'],
  fr: ['🗼', '🥐', '🧀', '🚴'],
  ch: ['🏔️', '🍫', '🐄', '🧀'],
  li: ['🏰', '👑', '🏔️', '🎿'],
  it: ['🍕', '🍦', '🏛️', '🌅'],
}

export default function Countries() {
  const { state, unlockCountry } = useStore()
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <>
      <h2 className="screen-title">🌍 Grenseland</h2>
      <p className="subtle" style={{ color: '#e0f2fe', margin: '0 4px 12px' }}>
        Hver gang dere kjører inn i et nytt land, lås det opp og oppdag hemmelige fakta! ⭐⭐⭐
      </p>

      {byOrder.map((c) => {
        const unlocked = state.countries.includes(c.id)
        const open = openId === c.id

        if (!unlocked) {
          return (
            <div key={c.id} className="row-item locked">
              <span className="ricon">{c.flag}</span>
              <span>
                <div className="rtitle">{c.name}</div>
                <div className="rdesc">🔒 Ikke krysset ennå</div>
              </span>
              <button
                className="primary"
                style={{ width: 'auto', margin: 0, padding: '10px 14px', fontSize: 14 }}
                onClick={() => {
                  unlockCountry(c.id)
                  setOpenId(c.id)
                }}
              >
                Lås opp
              </button>
            </div>
          )
        }

        return (
          <div key={c.id} className="card" style={{ marginBottom: 12 }}>
            <button
              onClick={() => setOpenId(open ? null : c.id)}
              style={{
                background: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                textAlign: 'left',
                padding: 0,
              }}
            >
              <span className="ricon" style={{ fontSize: 34 }}>
                {c.flag}
              </span>
              <span style={{ flex: 1 }}>
                <div className="rtitle" style={{ fontSize: 19 }}>
                  {c.name}
                </div>
                <div className="hello-big">{c.hello}</div>
              </span>
              <span style={{ fontSize: 20, color: 'var(--muted)' }}>{open ? '▲' : '▼'}</span>
            </button>

            {open && (
              <div className="pop">
                <div className="country-visuals">
                  <figure className="visual">
                    <CountryMap id={c.id} />
                    <figcaption>Her i Europa</figcaption>
                  </figure>
                  <figure className="visual">
                    <CountrySilhouette id={c.id} />
                    <figcaption>Landets form</figcaption>
                  </figure>
                </div>
                <div className="emoji-scene">
                  {(SCENES[c.id] ?? []).map((e, i) => (
                    <span key={i}>{e}</span>
                  ))}
                </div>
                <div className="info-row">
                  <span className="pill">
                    <b>Hovedstad:</b> {c.capital}
                  </span>
                  <span className="pill">
                    <b>Språk:</b> {c.language}
                  </span>
                  <span className="pill">
                    <b>Penger:</b> {c.currency}
                  </span>
                  <span className="pill">
                    <b>Smak på:</b> {c.eat}
                  </span>
                </div>
                <p className="subtle" style={{ margin: '4px 0' }}>
                  Si «hei»: <b>{c.hello}</b> — {c.helloTip}
                </p>
                <div className="country-facts">
                  {c.facts.map((f, i) => (
                    <div key={i} className="fact-line">
                      <span>✨</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}
