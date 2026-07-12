import { useState } from 'react'
import { ModePicker } from '../components/ModePicker'
import { useStore } from '../store'

interface Problem {
  text: string
  answer: number
  options: number[]
}

function makeProblem(): Problem {
  const ops = ['+', '−', '×'] as const
  const op = ops[Math.floor(Math.random() * ops.length)]
  let a: number, b: number, answer: number
  if (op === '×') {
    a = 2 + Math.floor(Math.random() * 10)
    b = 2 + Math.floor(Math.random() * 10)
    answer = a * b
  } else if (op === '+') {
    a = 5 + Math.floor(Math.random() * 45)
    b = 5 + Math.floor(Math.random() * 45)
    answer = a + b
  } else {
    a = 20 + Math.floor(Math.random() * 60)
    b = 1 + Math.floor(Math.random() * (a - 1))
    answer = a - b
  }
  const opts = new Set<number>([answer])
  while (opts.size < 4) {
    const delta = Math.floor(Math.random() * 9) - 4
    const cand = answer + (delta === 0 ? 5 : delta)
    if (cand >= 0) opts.add(cand)
  }
  const options = [...opts].sort(() => Math.random() - 0.5)
  return { text: `${a} ${op} ${b}`, answer, options }
}

const ROUNDS = 6 // total problems (2p: 3 each, alternating)

export default function PlateMath() {
  const { unlockAchievement } = useStore()
  const [players, setPlayers] = useState<1 | 2 | null>(null)
  const [problem, setProblem] = useState<Problem>(makeProblem)
  const [round, setRound] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState({ a: 0, b: 0 })

  const activePlayer: 1 | 2 = round % 2 === 0 ? 1 : 2
  const done = round >= (players === 2 ? ROUNDS : ROUNDS)
  const total = ROUNDS

  const start = (n: 1 | 2) => {
    setPlayers(n)
    setRound(0)
    setScore({ a: 0, b: 0 })
    setPicked(null)
    setProblem(makeProblem())
  }

  const answer = (opt: number) => {
    if (picked !== null) return
    setPicked(opt)
    const correct = opt === problem.answer
    if (correct) {
      if (players === 1) setScore((s) => ({ ...s, a: s.a + 1 }))
      else if (activePlayer === 1) setScore((s) => ({ ...s, a: s.a + 1 }))
      else setScore((s) => ({ ...s, b: s.b + 1 }))
    }
  }

  const next = () => {
    const nextRound = round + 1
    if (nextRound >= total) {
      if (players === 1) unlockAchievement('skiltmatte')
      setRound(total) // triggers done screen
      setPicked(null)
      return
    }
    setRound(nextRound)
    setPicked(null)
    setProblem(makeProblem())
  }

  if (players === null) {
    return (
      <ModePicker
        title="🔢 Skilt-matte"
        desc="Regn ut tallene på «bilskiltet»! Alene: hvor mange klarer du? To spillere: dere bytter på – flest riktige vinner."
        onPick={start}
      />
    )
  }

  if (done) {
    return (
      <>
        <button className="backbtn" onClick={() => setPlayers(null)}>
          ← Antall spillere
        </button>
        <div className="card" style={{ marginTop: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 40 }}>🏁</div>
          {players === 1 ? (
            <p style={{ fontWeight: 800 }}>Du fikk {score.a} av {total} riktige!</p>
          ) : (
            <p style={{ fontWeight: 800 }}>
              Spiller 1: {score.a} – Spiller 2: {score.b}
              <br />
              {score.a > score.b
                ? '🏆 Spiller 1 vant!'
                : score.b > score.a
                  ? '🏆 Spiller 2 vant!'
                  : 'Uavgjort! 🤝'}
            </p>
          )}
          <button className="primary" onClick={() => start(players)}>
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
      <div className="card" style={{ marginTop: 12, textAlign: 'center' }}>
        <div className="subtle" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Oppgave {round + 1}/{total}</span>
          <span style={{ fontWeight: 800 }}>
            {players === 1 ? `Riktige: ${score.a}` : `S1: ${score.a} – S2: ${score.b}`}
          </span>
        </div>

        {players === 2 && (
          <p className="subtle" style={{ margin: '4px 0' }}>
            Tur: <b>Spiller {activePlayer}</b>
          </p>
        )}

        <div className="plate-sign">
          🚗 {problem.text} = ?
        </div>

        <div className="quiz-opts">
          {problem.options.map((opt) => {
            let cls = 'opt'
            if (picked !== null) {
              if (opt === problem.answer) cls += ' correct'
              else if (opt === picked) cls += ' wrong'
              else cls += ' dim'
            }
            return (
              <button
                key={opt}
                className={cls}
                style={{ textAlign: 'center' }}
                disabled={picked !== null}
                onClick={() => answer(opt)}
              >
                {opt}
              </button>
            )
          })}
        </div>

        {picked !== null && (
          <button className="primary" onClick={next}>
            {round + 1 >= total ? 'Se resultat 🏁' : 'Neste →'}
          </button>
        )}
      </div>
    </>
  )
}
