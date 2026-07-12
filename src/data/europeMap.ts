import europe from './europePaths.json'

export interface BBox {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

// Crop of the world map (viewBox 0 0 1010 666) that frames the route countries
// from Norway down to Italy, with neighbours visible for context.
export const EUROPE_VIEWBOX = '449.5 161.1 124.2 205.9'

// Pre-extracted European country paths (see europePaths.json) – a small offline
// subset of the world map, drawn for geographic context.
export const REGIONS: { id: string; path: string }[] = europe.regions

const byId = Object.fromEntries(REGIONS.map((r) => [r.id, r]))

// Minimal SVG path point tracker – good enough for a bounding box.
function pathBBox(d: string): BBox {
  let x = 0, y = 0, sx = 0, sy = 0
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  const toks = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?/g) || []
  let i = 0, cmd = ''
  const num = () => parseFloat(toks[i++])
  const upd = (px: number, py: number) => {
    minX = Math.min(minX, px); minY = Math.min(minY, py)
    maxX = Math.max(maxX, px); maxY = Math.max(maxY, py)
  }
  while (i < toks.length) {
    if (/[a-zA-Z]/.test(toks[i])) cmd = toks[i++]
    const rel = cmd === cmd.toLowerCase()
    const C = cmd.toUpperCase()
    if (C === 'M') { const nx = num(), ny = num(); x = rel ? x + nx : nx; y = rel ? y + ny : ny; sx = x; sy = y; upd(x, y); cmd = rel ? 'l' : 'L' }
    else if (C === 'L') { const nx = num(), ny = num(); x = rel ? x + nx : nx; y = rel ? y + ny : ny; upd(x, y) }
    else if (C === 'H') { const nx = num(); x = rel ? x + nx : nx; upd(x, y) }
    else if (C === 'V') { const ny = num(); y = rel ? y + ny : ny; upd(x, y) }
    else if (C === 'C') { num(); num(); num(); num(); const nx = num(), ny = num(); x = rel ? x + nx : nx; y = rel ? y + ny : ny; upd(x, y) }
    else if (C === 'S' || C === 'Q') { num(); num(); const nx = num(), ny = num(); x = rel ? x + nx : nx; y = rel ? y + ny : ny; upd(x, y) }
    else if (C === 'T') { const nx = num(), ny = num(); x = rel ? x + nx : nx; y = rel ? y + ny : ny; upd(x, y) }
    else if (C === 'A') { num(); num(); num(); num(); num(); const nx = num(), ny = num(); x = rel ? x + nx : nx; y = rel ? y + ny : ny; upd(x, y) }
    else if (C === 'Z') { x = sx; y = sy }
    else i++
  }
  return { minX, minY, maxX, maxY }
}

// Route-country id (our ids match the map ids) -> path + bbox, for the pin
// position and the standalone silhouette.
export function countryShape(id: string): { path: string; bbox: BBox } | null {
  const loc = byId[id]
  if (!loc) return null
  return { path: loc.path, bbox: pathBBox(loc.path) }
}

// ---- Country name labels for the map ---------------------------------------
const CROP = { x: 449.5, y: 161.1, w: 124.2, h: 205.9 }

const NEIGHBOUR_NAMES: Record<string, string> = {
  no: 'Norge', se: 'Sverige', fi: 'Finland', dk: 'Danmark', de: 'Tyskland',
  nl: 'Nederl.', be: 'Belgia', fr: 'Frankrike', ch: 'Sveits', at: 'Østerrike',
  it: 'Italia', gb: 'Storbr.', ie: 'Irland', es: 'Spania', pl: 'Polen',
  cz: 'Tsjekkia', sk: 'Slovakia', hu: 'Ungarn', si: 'Slovenia', hr: 'Kroatia',
}

// Precompute label positions (bbox centre) for countries visible in the crop.
// Tiny countries are skipped to avoid clutter (they still get the red pin when
// they are the highlighted country).
export const LABELS = REGIONS.filter((r) => NEIGHBOUR_NAMES[r.id])
  .map((r) => {
    const b = pathBBox(r.path)
    return {
      id: r.id,
      name: NEIGHBOUR_NAMES[r.id],
      x: (b.minX + b.maxX) / 2,
      y: (b.minY + b.maxY) / 2,
      area: (b.maxX - b.minX) * (b.maxY - b.minY),
    }
  })
  .filter(
    (l) =>
      l.area > 8 &&
      l.x >= CROP.x && l.x <= CROP.x + CROP.w &&
      l.y >= CROP.y && l.y <= CROP.y + CROP.h,
  )
