import { useState } from 'react'
import { ModePicker } from '../components/ModePicker'
import { useStore } from '../store'

const MOVES = [
  { id: 'stein', label: 'Stein', icon: '✊' },
  { id: 'saks', label: 'Saks', icon: '✌️' },
  { id: 'papir', label: 'Papir', icon: '✋' },
] as const
type MoveId = (typeof MOVES)[number]['id']

// returns 1 if a beats b, -1 if b beats a, 0 for draw
function judge(a: MoveId, b: MoveId): number {
  if (a === b) return 0
  const beats: Record<MoveId, MoveId> = { stein: 'saks', saks: 'papir', papir: 'stein' }
  return beats[a] === b ? 1 : -1
}

const icon = (id: MoveId) => MOVES.find((m) => m.id === id)!.icon

export default function RockPaperScissors() {
  const { unlockAchievement } = useStore()
  const [players, setPlayers] = useState<1 | 2 | null>(null)
  const [score, setScore] = useState({ a: 0, b: 0 })
  const [p1, setP1] = useState<MoveId | null>(null) // 2p: hidden first choice
  const [turn, setTurn] = useState<'p1' | 'p2'>('p1')
  const [msg, setMsg] = useState('')
  const [reveal, setReveal] = useState<{ a: MoveId; b: MoveId } | null>(null)

  const resetRound = () => {
    setP1(null)
    setTurn('p1')
    setReveal(null)
    setMsg('')
  }

  // ---- Single player vs. app ----
  const playVsApp = (move: MoveId) => {
    const appMove = MOVES[Math.floor(Math.random() * 3)].id
    const r = judge(move, appMove)
    setReveal({ a: move, b: appMove })
    if (r === 1) {
      setScore((s) => ({ ...s, a: s.a + 1 }))
      setMsg('Du vant runden! 🎉')
      unlockAchievement('saks')
    } else if (r === -1) {
      setScore((s) => ({ ...s, b: s.b + 1 }))
      setMsg('Appen vant runden 🤖')
    } else {
      setMsg('Uavgjort 🤝')
    }
  }

  // ---- Two players (pass and play) ----
  const pickP1 = (move: MoveId) => {
    setP1(move)
    setTurn('p2')
  }
  const pickP2 = (move: MoveId) => {
    const r = judge(p1!, move)
    setReveal({ a: p1!, b: move })
    if (r === 1) {
      setScore((s) => ({ ...s, a: s.a + 1 }))
      setMsg('🏆 Spiller 1 vant runden!')
    } else if (r === -1) {
      setScore((s) => ({ ...s, b: s.b + 1 }))
      setMsg('🏆 Spiller 2 vant runden!')
    } else {
      setMsg('Uavgjort 🤝')
    }
  }

  if (players === null) {
    return (
      <ModePicker
        title="✊ Stein-saks-papir"
        desc="Spill mot appen, eller mot hverandre i bilen (send skjermen fram og tilbake)."
        onPick={(n) => {
          setPlayers(n)
          setScore({ a: 0, b: 0 })
          resetRound()
        }}
      />
    )
  }

  const buttons = (onPick: (m: MoveId) => void) => (
    <div className="rps-row">
      {MOVES.map((m) => (
        <button key={m.id} className="rps-btn" onClick={() => onPick(m.id)}>
          <span className="rps-icon">{m.icon}</span>
          {m.label}
        </button>
      ))}
    </div>
  )

  return (
    <>
      <button className="backbtn" onClick={() => setPlayers(null)}>
        ← Antall spillere
      </button>

      <div className="card" style={{ marginTop: 12, textAlign: 'center' }}>
        <p style={{ fontWeight: 800, margin: '0 0 8px' }}>
          {players === 1 ? `Du ${score.a} – ${score.b} App` : `Spiller 1: ${score.a} – ${score.b} :Spiller 2`}
        </p>

        {reveal && (
          <div className="rps-reveal">
            <span>{icon(reveal.a)}</span>
            <span style={{ fontSize: 18, color: 'var(--muted)' }}>mot</span>
            <span>{icon(reveal.b)}</span>
          </div>
        )}
        {msg && <div className="factbox" style={{ textAlign: 'center' }}>{msg}</div>}

        {/* choice area */}
        {!reveal && players === 1 && buttons(playVsApp)}
        {!reveal && players === 2 && turn === 'p1' && (
          <>
            <p className="subtle">Spiller 1 velger (spiller 2 ser bort! 🙈)</p>
            {buttons(pickP1)}
          </>
        )}
        {!reveal && players === 2 && turn === 'p2' && (
          <>
            <p className="subtle">Spiller 1 har valgt. Spiller 2 velger nå! 👀</p>
            {buttons(pickP2)}
          </>
        )}

        {reveal && (
          <button className="primary" onClick={resetRound}>
            Ny runde 🔁
          </button>
        )}
      </div>
    </>
  )
}
