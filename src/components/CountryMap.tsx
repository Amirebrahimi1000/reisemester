import { byOrder } from '../data/countries'
import { EUROPE_VIEWBOX, LABELS, REGIONS, countryShape } from '../data/europeMap'

const [vx, vy, vw, vh] = EUROPE_VIEWBOX.split(' ').map(Number)

// A small offline locator map: real European borders, with the given country
// filled and pinned so a child can see where it sits among its neighbours.
export function CountryMap({ id }: { id: string }) {
  const country = byOrder.find((c) => c.id === id)
  const shape = countryShape(id)
  const cx = shape ? (shape.bbox.minX + shape.bbox.maxX) / 2 : 0
  const cy = shape ? (shape.bbox.minY + shape.bbox.maxY) / 2 : 0

  return (
    <svg
      viewBox={EUROPE_VIEWBOX}
      className="country-map"
      role="img"
      aria-label={`Kart over Europa der ${country?.name ?? ''} er markert`}
    >
      {/* sea */}
      <rect x={vx} y={vy} width={vw} height={vh} fill="#a5d8ef" />
      {/* land + borders */}
      {REGIONS.map((r) => (
        <path
          key={r.id}
          d={r.path}
          fill={r.id === id ? '#22c55e' : '#e7dcc0'}
          stroke="#ffffff"
          strokeWidth={0.4}
          strokeLinejoin="round"
        />
      ))}
      {/* neighbour names */}
      {LABELS.map((l) => {
        const active = l.id === id
        return (
          <text
            key={l.id}
            x={l.x}
            y={active ? l.y - 6 : l.y}
            textAnchor="middle"
            fontSize={active ? 5.5 : 4.4}
            fontWeight={active ? 800 : 600}
            fill={active ? '#065f46' : '#334155'}
            stroke="#ffffff"
            strokeWidth={active ? 1.5 : 1.15}
            strokeLinejoin="round"
            style={{ paintOrder: 'stroke' }}
          >
            {l.name}
          </text>
        )
      })}

      {/* "you are here" pin */}
      {shape && (
        <>
          <circle cx={cx} cy={cy} r={3.4} fill="#dc2626" stroke="#fff" strokeWidth={1.1} />
          <circle cx={cx} cy={cy} r={1} fill="#fff" />
        </>
      )}
    </svg>
  )
}
