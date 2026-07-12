import { useMemo } from 'react'
import { getCountry } from '../data/countryDB'
import { REGIONS, computeCrop, countryShape, labelsInCrop } from '../data/europeMap'
import { useStore } from '../store'

// Offline locator map: real European borders, framed on the active trip's
// countries, with the given country filled and pinned.
export function CountryMap({ id }: { id: string }) {
  const { routeCountries } = useStore()
  const crop = useMemo(() => computeCrop(routeCountries.map((c) => c.id)), [routeCountries])
  const labels = useMemo(() => labelsInCrop(crop), [crop])

  const country = getCountry(id)
  const shape = countryShape(id)
  const cx = shape ? (shape.bbox.minX + shape.bbox.maxX) / 2 : 0
  const cy = shape ? (shape.bbox.minY + shape.bbox.maxY) / 2 : 0

  return (
    <svg
      viewBox={crop.viewBox}
      className="country-map"
      role="img"
      aria-label={`Kart over Europa der ${country?.name ?? ''} er markert`}
    >
      <rect x={crop.x} y={crop.y} width={crop.w} height={crop.h} fill="#a5d8ef" />
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
      {labels.map((l) => {
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
      {shape && (
        <>
          <circle cx={cx} cy={cy} r={3.4} fill="#dc2626" stroke="#fff" strokeWidth={1.1} />
          <circle cx={cx} cy={cy} r={1} fill="#fff" />
        </>
      )}
    </svg>
  )
}
