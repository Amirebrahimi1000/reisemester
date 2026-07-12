import europe from './europePaths.json'

export interface BBox {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

// Pre-extracted European country paths (offline subset of the world map).
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

// Precompute bbox/centroid/area for every region once.
interface RegionInfo {
  id: string
  bbox: BBox
  cx: number
  cy: number
  area: number
}
const INFO: Record<string, RegionInfo> = {}
for (const r of REGIONS) {
  const b = pathBBox(r.path)
  INFO[r.id] = { id: r.id, bbox: b, cx: (b.minX + b.maxX) / 2, cy: (b.minY + b.maxY) / 2, area: (b.maxX - b.minX) * (b.maxY - b.minY) }
}

export function countryShape(id: string): { path: string; bbox: BBox } | null {
  const loc = byId[id]
  if (!loc) return null
  return { path: loc.path, bbox: INFO[id].bbox }
}

// Norwegian names for map labels (short forms for the tiny ones).
const NAMES: Record<string, string> = {
  no: 'Norge', se: 'Sverige', fi: 'Finland', dk: 'Danmark', de: 'Tyskland',
  nl: 'Nederl.', be: 'Belgia', lu: 'Lux.', fr: 'Frankrike', ch: 'Sveits',
  li: 'Liecht.', at: 'Østerrike', it: 'Italia', gb: 'Storbr.', ie: 'Irland',
  es: 'Spania', pt: 'Portugal', pl: 'Polen', cz: 'Tsjekkia', sk: 'Slovakia',
  hu: 'Ungarn', si: 'Slovenia', hr: 'Kroatia', ba: 'Bosnia', rs: 'Serbia',
  me: 'Monten.', al: 'Albania', mk: 'N-Maked.', gr: 'Hellas', ro: 'Romania',
  bg: 'Bulgaria', ee: 'Estland', lv: 'Latvia', lt: 'Litauen', by: 'Hviteruss.',
  ua: 'Ukraina', md: 'Moldova', is: 'Island', ma: 'Marokko', dz: 'Algerie',
  tn: 'Tunisia',
}

export interface Crop {
  viewBox: string
  x: number
  y: number
  w: number
  h: number
}

// A map crop that frames the given countries, with neighbours around them.
export function computeCrop(countryIds: string[]): Crop {
  const infos = countryIds.map((id) => INFO[id]).filter(Boolean)
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  if (infos.length === 0) {
    // Fallback: most of Europe.
    minX = 450; minY = 160; maxX = 574; maxY = 367
  } else {
    for (const info of infos) {
      minX = Math.min(minX, info.bbox.minX); minY = Math.min(minY, info.bbox.minY)
      maxX = Math.max(maxX, info.bbox.maxX); maxY = Math.max(maxY, info.bbox.maxY)
    }
  }
  const w0 = maxX - minX
  const h0 = maxY - minY
  const padX = Math.max(w0 * 0.12, 6)
  const padY = Math.max(h0 * 0.08, 6)
  const x = minX - padX
  const y = minY - padY
  const w = w0 + 2 * padX
  const h = h0 + 2 * padY
  return { viewBox: `${x} ${y} ${w} ${h}`, x, y, w, h }
}

export interface MapLabel {
  id: string
  name: string
  x: number
  y: number
}

// Country names whose centre falls inside the crop (skips tiny ones).
export function labelsInCrop(crop: Crop, minArea = 8): MapLabel[] {
  return REGIONS.filter((r) => NAMES[r.id])
    .map((r) => ({ id: r.id, name: NAMES[r.id], x: INFO[r.id].cx, y: INFO[r.id].cy, area: INFO[r.id].area }))
    .filter(
      (l) =>
        l.area > minArea &&
        l.x >= crop.x && l.x <= crop.x + crop.w &&
        l.y >= crop.y && l.y <= crop.y + crop.h,
    )
    .map(({ id, name, x, y }) => ({ id, name, x, y }))
}
