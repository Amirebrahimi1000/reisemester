import { countryShape } from '../data/europeMap'

// The country's real outline (e.g. Italy's boot), drawn on its own tight
// viewBox so the shape fills the box.
export function CountrySilhouette({ id }: { id: string }) {
  const shape = countryShape(id)
  if (!shape) return null
  const { minX, minY, maxX, maxY } = shape.bbox
  const w = maxX - minX
  const h = maxY - minY
  const pad = Math.max(w, h) * 0.12
  const viewBox = `${minX - pad} ${minY - pad} ${w + 2 * pad} ${h + 2 * pad}`
  return (
    <svg
      viewBox={viewBox}
      className="country-silhouette"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Landets form"
    >
      <path d={shape.path} fill="#0e7490" stroke="#fff" strokeWidth={Math.max(w, h) * 0.012} />
    </svg>
  )
}
