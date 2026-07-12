// Shared 1-player / 2-player chooser used by the two-player-capable mini-games.
export function ModePicker({
  title,
  desc,
  onPick,
}: {
  title: string
  desc: string
  onPick: (players: 1 | 2) => void
}) {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <p style={{ fontWeight: 800, fontSize: 18, margin: '4px 0' }}>{title}</p>
      <p className="subtle" style={{ marginTop: 0 }}>
        {desc}
      </p>
      <button className="primary" onClick={() => onPick(1)}>
        👤 Én spiller
      </button>
      <button className="primary" onClick={() => onPick(2)}>
        👥 To spillere
      </button>
    </div>
  )
}
