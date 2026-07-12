import { useEffect, useRef, useState } from 'react'
import { ModePicker } from '../components/ModePicker'
import { useStore } from '../store'

type Phase = 'ready' | 'waiting' | 'go' | 'done'

export default function Reaction() {
  const { unlockAchievement } = useStore()
  const [players, setPlayers] = useState<1 | 2 | null>(null)
  const [phase, setPhase] = useState<Phase>('ready')
  const [result, setResult] = useState('')
  const [best, setBest] = useState<number | null>(null)
  const goTime = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clear = () => {
    if (timer.current) clearTimeout(timer.current)
  }
  useEffect(() => clear, [])

  const arm = () => {
    setResult('')
    setPhase('waiting')
    const delay = 1500 + Math.random() * 3500
    clear()
    timer.current = setTimeout(() => {
      goTime.current = performance.now()
      setPhase('go')
    }, delay)
  }

  // player: 1 or 2 (which half tapped); ignored in single-player
  const tap = (player: 1 | 2) => {
    if (phase === 'ready' || phase === 'done') return
    if (phase === 'waiting') {
      clear()
      setPhase('done')
      setResult(players === 2 ? `For tidlig! 🏆 Spiller ${player === 1 ? 2 : 1} vinner!` : 'For tidlig! Vent på grønt. 🚦')
      return
    }
    // phase === 'go'
    if (players === 1) {
      const ms = Math.round(performance.now() - goTime.current)
      setResult(`${ms} ms ⚡`)
      setBest((b) => (b === null || ms < b ? ms : b))
      unlockAchievement('reaksjon') // one-time star for a valid reaction
    } else {
      setResult(`🏆 Spiller ${player} vant!`)
    }
    setPhase('done')
  }

  if (players === null) {
    return (
      <ModePicker
        title="⚡ Reaksjonstest"
        desc="Trykk så fort du kan når skjermen blir grønn – men ikke for tidlig! To spillere: hvem er raskest?"
        onPick={setPlayers}
      />
    )
  }

  const bg = phase === 'go' ? 'var(--ok)' : phase === 'waiting' ? 'var(--coral)' : 'var(--lake)'
  const label =
    phase === 'ready'
      ? 'Trykk «Start»'
      : phase === 'waiting'
        ? 'Vent … 🚦'
        : phase === 'go'
          ? 'TRYKK NÅ! ⚡'
          : result

  if (players === 1) {
    return (
      <>
        <button className="backbtn" onClick={() => setPlayers(null)}>
          ← Antall spillere
        </button>
        <button
          className="reaction-zone"
          style={{ background: bg, marginTop: 12 }}
          onClick={() => tap(1)}
          disabled={phase === 'ready' || phase === 'done'}
        >
          {label}
        </button>
        {best !== null && <p className="progresstext">Beste tid: {best} ms</p>}
        {(phase === 'ready' || phase === 'done') && (
          <button className="primary" onClick={arm}>
            {phase === 'done' ? '🔁 En gang til' : 'Start'}
          </button>
        )}
      </>
    )
  }

  // Two-player duel: split screen.
  return (
    <>
      <button className="backbtn" onClick={() => setPlayers(null)}>
        ← Antall spillere
      </button>
      <div className="reaction-split" style={{ marginTop: 12 }}>
        <button
          className="reaction-zone half top"
          style={{ background: bg }}
          onClick={() => tap(1)}
          disabled={phase === 'ready' || phase === 'done'}
        >
          Spiller 1 👆
        </button>
        <button
          className="reaction-zone half"
          style={{ background: bg }}
          onClick={() => tap(2)}
          disabled={phase === 'ready' || phase === 'done'}
        >
          Spiller 2 👆
        </button>
      </div>
      <p className="progresstext" style={{ minHeight: 24 }}>
        {phase === 'done' ? result : label}
      </p>
      {(phase === 'ready' || phase === 'done') && (
        <button className="primary" onClick={arm}>
          {phase === 'done' ? '🔁 En gang til' : 'Start duell'}
        </button>
      )}
    </>
  )
}
