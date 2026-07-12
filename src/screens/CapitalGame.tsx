import { useState } from 'react'
import { ModePicker } from '../components/ModePicker'
import { COUNTRIES } from '../data/countries'
import { useStore } from '../store'

const CAPITALS = COUNTRIES.map((c) => c.capital)
const ROUNDS_2P = 8

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickRound() {
  const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)]
  const wrong = shuffle(CAPITALS.filter((c) => c !== country.capital)).slice(0, 3)
  const options = shuffle([country.capital, ...wrong])
  return { country, options }
}

export default function CapitalGame() {
  const { unlockAchievement } = useStore()
  const [players, setPlayers] = useState<1 | 2 | null>(null)
  const [round, setRound] = useState(pickRound)
  const [picked, setPicked] = useState<string | null>(null)
  const [turn, setTurn] = useState(0)
  const [score, setScore] = useState({ a: 0, b: 0 })

  const revealed = picked !== null
  const correct = picked === round.country.capital
  const activePlayer: 1 | 2 = turn % 2 === 0 ? 1 : 2
  const done2p = players === 2 && turn >= ROUNDS_2P

  const start = (n: 1 | 2) => {
    setPlayers(n)
    setRound(pickRound())
    setPicked(null)
    setTurn(0)
    setScore({ a: 0, b: 0 })
  }

  const answer = (cap: string) => {
    if (revealed) return
    setPicked(cap)
    const ok = cap === round.country.capital
    if (players === 1) {
      if (ok) unlockAchievement('hovedstad')
    } else if (ok) {
      setScore((s) => (activePlayer === 1 ? { ...s, a: s.a + 1 } : { ...s, b: s.b + 1 }))
    }
  }

  const next = () => {
    if (players === 2) setTurn((t) => t + 1)
    setRound(pickRound())
    setPicked(null)
  }

  if (players === null) {
    return (
      <ModePicker
        title="🏛️ Hovedstad-spillet"
        desc="Hvilken by er hovedstaden? Alene: samle stjerner. To spillere: dere bytter på – flest riktige av 8 vinner."
        onPick={start}
      />
    )
  }

  if (done2p) {
    return (
      <>
        <button className="backbtn" onClick={() => setPlayers(null)}>
          ← Antall spillere
        </button>
        <div className="card" style={{ marginTop: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 40 }}>🏁</div>
          <p style={{ fontWeight: 800 }}>
            Spiller 1: {score.a} – Spiller 2: {score.b}
            <br />
            {score.a > score.b
              ? '🏆 Spiller 1 vant!'
              : score.b > score.a
                ? '🏆 Spiller 2 vant!'
                : 'Uavgjort! 🤝'}
          </p>
          <button className="primary" onClick={() => start(2)}>
            🔁 Spill igjen
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <button className="backbtn" onClick={() => setPlayers(null)}>
        ← Antall spillere
      </button>
      <div className="card" style={{ textAlign: 'center', marginTop: 12 }}>
        {players === 2 && (
          <p className="subtle" style={{ marginTop: 0 }}>
            Runde {turn + 1}/{ROUNDS_2P} · Tur: <b>Spiller {activePlayer}</b> · S1 {score.a} – S2{' '}
            {score.b}
          </p>
        )}
        <div style={{ fontSize: 40 }}>{round.country.flag}</div>
        <p className="quiz-q" style={{ fontSize: 19 }}>
          Hva er hovedstaden i {round.country.name}?
        </p>
        <div className="quiz-opts">
          {round.options.map((cap) => {
            let cls = 'opt'
            if (revealed) {
              if (cap === round.country.capital) cls += ' correct'
              else if (cap === picked) cls += ' wrong'
              else cls += ' dim'
            }
            return (
              <button
                key={cap}
                className={cls}
                disabled={revealed}
                style={{ textAlign: 'center' }}
                onClick={() => answer(cap)}
              >
                {cap}
              </button>
            )
          })}
        </div>
        {revealed && (
          <>
            <div className="factbox" style={{ textAlign: 'center' }}>
              {correct ? '✅ Riktig! ' : '💡 '}
              Hovedstaden i {round.country.name} er <b>{round.country.capital}</b>.
            </div>
            <button className="primary" onClick={next}>
              {players === 2 && turn + 1 >= ROUNDS_2P ? 'Se resultat 🏁' : 'Neste →'}
            </button>
          </>
        )}
      </div>
    </>
  )
}
