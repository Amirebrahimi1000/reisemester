import { useState } from 'react'
import { useStore } from '../store'
import { CountryMap } from '../components/CountryMap'
import { CountrySilhouette } from '../components/CountrySilhouette'
import { detectCountry } from '../data/countryBounds'
import { celebrate } from '../lib/celebrate'
import { canSpeak, speakGreeting } from '../lib/speak'

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
  const { state, unlockCountry, unlockAchievement, routeCountries } = useStore()
  const [openId, setOpenId] = useState<string | null>(null)
  const [gpsBusy, setGpsBusy] = useState(false)
  const [gpsMsg, setGpsMsg] = useState('')

  const findMe = () => {
    if (!('geolocation' in navigator)) {
      setGpsMsg('📵 Denne enheten støtter ikke posisjon.')
      return
    }
    setGpsBusy(true)
    setGpsMsg('📡 Finner ut hvor dere er …')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsBusy(false)
        const id = detectCountry(
          pos.coords.latitude,
          pos.coords.longitude,
          routeCountries.map((c) => c.id),
        )
        const country = id ? routeCountries.find((c) => c.id === id) : null
        if (country) {
          unlockCountry(country.id)
          unlockAchievement(`gps-${country.id}`) // one-time bonus for a real check-in
          setOpenId(country.id)
          celebrate() // sound + vibration
          setGpsMsg(`🎉 Dere er i ${country.name}! Landet er låst opp – bonusstjerner! ⭐`)
        } else {
          setGpsMsg(
            '🤔 Fant ikke akkurat hvilket land dere er i – kanskje dere er mellom to land eller i en tunnel. Prøv igjen når dere er godt inne i landet.',
          )
        }
      },
      (err) => {
        setGpsBusy(false)
        setGpsMsg(
          err.code === err.PERMISSION_DENIED
            ? '🔐 Dere må tillate posisjon for å låse opp et land som besøkt. Dere kan uansett kikke på fakta om alle land nedenfor.'
            : '🛰️ Fikk ikke tak i posisjonen. GPS trenger fri himmel – det er vanskelig i tunneler. Prøv igjen ute i det fri.',
        )
      },
      { enableHighAccuracy: true, timeout: 9000, maximumAge: 60000 },
    )
  }

  return (
    <>
      <h2 className="screen-title">🌍 Grenseland</h2>
      <p className="subtle" style={{ color: '#e0f2fe', margin: '0 4px 10px' }}>
        Kjør inn i et land og trykk <b>«📍 Jeg er her nå!»</b> for å låse det opp som besøkt – da
        teller det på merker og diplom. Du kan alltid kikke på fakta om alle land! ⭐
      </p>

      <button className="primary gps-btn" onClick={findMe} disabled={gpsBusy}>
        {gpsBusy ? '📡 Finner posisjon …' : '📍 Jeg er her nå!'}
      </button>
      {gpsMsg && <div className="gps-msg">{gpsMsg}</div>}

      {routeCountries.map((c) => {
        const visited = state.countries.includes(c.id)
        const open = openId === c.id

        return (
          <div key={c.id} className={`card country-card ${visited ? '' : 'notvisited'}`} style={{ marginBottom: 12 }}>
            <button
              className="country-head"
              onClick={() => setOpenId(open ? null : c.id)}
            >
              <span className={`ricon ${visited ? '' : 'ricon-dim'}`} style={{ fontSize: 34 }}>
                {c.flag}
              </span>
              <span style={{ flex: 1 }}>
                <div className="rtitle" style={{ fontSize: 19 }}>
                  {c.name}
                </div>
                {visited ? (
                  <div className="hello-big">{c.hello}</div>
                ) : (
                  <div className="rdesc">🔒 Ikke krysset ennå</div>
                )}
              </span>
              {visited ? (
                <span className="visited-pill">✓ Besøkt</span>
              ) : (
                <span className="seefacts">{open ? '▲ Lukk' : '👀 Se fakta'}</span>
              )}
            </button>

            {open && (
              <div className="pop">
                <figure className="visual visual-map">
                  <CountryMap id={c.id} />
                  <figcaption>Her ligger {c.name} i Europa</figcaption>
                </figure>
                <div className="country-visuals">
                  <figure className="visual">
                    <CountrySilhouette id={c.id} />
                    <figcaption>Landets form</figcaption>
                  </figure>
                  <figure className="visual">
                    <div className="emoji-scene">
                      {(SCENES[c.id] ?? []).map((e, i) => (
                        <span key={i}>{e}</span>
                      ))}
                    </div>
                    <figcaption>Kjent for</figcaption>
                  </figure>
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
                  {canSpeak() && (
                    <button className="speak-btn" onClick={() => speakGreeting(c.id)}>
                      🔊 Hør
                    </button>
                  )}
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
