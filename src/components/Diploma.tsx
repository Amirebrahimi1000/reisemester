import { useStore } from '../store'
import { COUNTRIES } from '../data/countries'

export function Diploma({ onClose }: { onClose: () => void }) {
  const { state, stars } = useStore()
  const dateStr = new Date().toLocaleDateString('nb-NO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const visitedFlags = COUNTRIES.filter((c) => state.countries.includes(c.id)).map((c) => c.flag)

  return (
    <div className="diploma-overlay" onClick={onClose}>
      <div className="diploma" onClick={(e) => e.stopPropagation()}>
        <div className="diploma-seal">🎓</div>
        <h2>Reisediplom</h2>
        <p className="diploma-sub">Gardaturen 🚗</p>
        <p className="diploma-name">{state.playerName || 'Reisende'}</p>
        <p className="diploma-text">
          har vært på biltur fra 🏁 Skien til 🏖️ Gardasjøen!
        </p>
        <div className="diploma-stats">
          <div>
            <b>{state.countries.length}</b>
            <span>land besøkt</span>
          </div>
          <div>
            <b>{stars}</b>
            <span>stjerner</span>
          </div>
          <div>
            <b>{state.journal.length}</b>
            <span>dagboksider</span>
          </div>
        </div>
        {visitedFlags.length > 0 && <div className="diploma-flags">{visitedFlags.join('  ')}</div>}
        <p className="diploma-date">{dateStr}</p>
        <div className="diploma-actions no-print">
          <button className="primary" style={{ marginTop: 0 }} onClick={() => window.print()}>
            🖨️ Skriv ut / lagre
          </button>
          <button className="backbtn" style={{ marginTop: 0 }} onClick={onClose}>
            Lukk
          </button>
        </div>
      </div>
    </div>
  )
}
