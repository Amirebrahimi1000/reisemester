export interface Plate {
  code: string
  country: string
  flag: string
  onRoute: boolean // land dere faktisk kjører gjennom
}

// Nasjonalitetskoder du kan se på bilskilt i Europa (den ovale merkelappen
// eller det blå feltet på EU-skilt). Samle så mange du kan!
export const PLATES: Plate[] = [
  { code: 'N', country: 'Norge', flag: '🇳🇴', onRoute: true },
  { code: 'DK', country: 'Danmark', flag: '🇩🇰', onRoute: true },
  { code: 'D', country: 'Tyskland', flag: '🇩🇪', onRoute: true },
  { code: 'CH', country: 'Sveits', flag: '🇨🇭', onRoute: true },
  { code: 'I', country: 'Italia', flag: '🇮🇹', onRoute: true },
  { code: 'B', country: 'Belgia', flag: '🇧🇪', onRoute: true },
  { code: 'L', country: 'Luxembourg', flag: '🇱🇺', onRoute: true },
  { code: 'F', country: 'Frankrike', flag: '🇫🇷', onRoute: true },
  { code: 'FL', country: 'Liechtenstein', flag: '🇱🇮', onRoute: true },
  { code: 'S', country: 'Sverige', flag: '🇸🇪', onRoute: false },
  { code: 'NL', country: 'Nederland', flag: '🇳🇱', onRoute: false },
  { code: 'A', country: 'Østerrike', flag: '🇦🇹', onRoute: false },
  { code: 'PL', country: 'Polen', flag: '🇵🇱', onRoute: false },
  { code: 'FIN', country: 'Finland', flag: '🇫🇮', onRoute: false },
  { code: 'CZ', country: 'Tsjekkia', flag: '🇨🇿', onRoute: false },
  { code: 'E', country: 'Spania', flag: '🇪🇸', onRoute: false },
]
