export interface Country {
  id: string
  name: string
  flag: string
  order: number // order along the route from Skien to Gardasjøen
  capital: string
  language: string
  hello: string // how to say hi in the local language
  helloTip: string // pronunciation for a 10-year-old
  currency: string
  facts: string[]
  eat: string // a local food to try
}

// The route: Skien → ferge → Danmark → Tyskland → Belgia → Luxembourg
// (overnatting) → Frankrike → Sveits → Liechtenstein → Italia → Gardasjøen.
export const COUNTRIES: Country[] = [
  {
    id: 'no',
    name: 'Norge',
    flag: '🇳🇴',
    order: 0,
    capital: 'Oslo',
    language: 'Norsk',
    hello: 'Hei!',
    helloTip: 'Det kan du jo fra før 😄',
    currency: 'Norske kroner (kr)',
    eat: 'Brunost på matpakka',
    facts: [
      'Norge har over 1000 fjorder – vann som strekker seg langt inn i landet.',
      'Turen deres starter i Skien, hjembyen til dikteren Henrik Ibsen.',
      'Norge har verdens lengste veitunnel: Lærdalstunnelen er 24,5 km!',
      'Elg kalles «skogens konge» og kan bli like høy som en bil er lang.',
    ],
  },
  {
    id: 'dk',
    name: 'Danmark',
    flag: '🇩🇰',
    order: 1,
    capital: 'København',
    language: 'Dansk',
    hello: 'Hej!',
    helloTip: 'Uttales «hai», nesten som på engelsk',
    currency: 'Danske kroner (kr)',
    eat: 'Wienerbrød eller en hotdog',
    facts: [
      'Danmark er nesten helt flatt – det høyeste «fjellet» er bare 171 meter!',
      'Danmark har over 400 øyer, og mange er bundet sammen med lange broer.',
      'Legoklossen ble funnet opp i Danmark i 1958.',
      'Det danske flagget, Dannebrog, er et av verdens eldste flagg.',
    ],
  },
  {
    id: 'de',
    name: 'Tyskland',
    flag: '🇩🇪',
    order: 2,
    capital: 'Berlin',
    language: 'Tysk',
    hello: 'Hallo!',
    helloTip: 'Uttales «hallo», med trykk på siste del',
    currency: 'Euro (€)',
    eat: 'Bratwurst (grillpølse) med brød',
    facts: [
      'På tyske motorveier (Autobahn) er det noen steder INGEN fartsgrense.',
      'Tyskland lager kjente biler: BMW, Mercedes, Volkswagen, Porsche og Audi.',
      'Eventyrene om Askepott, Rødhette og Snøhvit ble skrevet ned i Tyskland av brødrene Grimm.',
      'Tyskland grenser til hele 9 land – flere enn nesten alle andre land i Europa.',
    ],
  },
  {
    id: 'be',
    name: 'Belgia',
    flag: '🇧🇪',
    order: 3,
    capital: 'Brussel',
    language: 'Nederlandsk, fransk og tysk',
    hello: 'Hallo! / Bonjour!',
    helloTip: 'I nord sier man «hallo», i sør «bonjour» (bonsjur)',
    currency: 'Euro (€)',
    eat: 'Belgiske vafler eller pommes frites',
    facts: [
      'Pommes frites ble faktisk funnet opp i Belgia – ikke i Frankrike!',
      'Tintin og Smurfene er tegneseriefigurer som kommer fra Belgia.',
      'I Brussel står en berømt bitte liten statue av en gutt som tisser: «Manneken Pis».',
      'Belgia er verdenskjent for sjokolade – du finner sjokoladebutikker overalt.',
    ],
  },
  {
    id: 'lu',
    name: 'Luxembourg',
    flag: '🇱🇺',
    order: 4,
    capital: 'Luxembourg by',
    language: 'Luxemburgsk, fransk og tysk',
    hello: 'Moien!',
    helloTip: 'Uttales «moi-en» – hei på luxemburgsk',
    currency: 'Euro (€)',
    eat: 'Gromperekichelcher (sprø potetkaker)',
    facts: [
      'Luxembourg er et av verdens minste land – dere kjører gjennom det på under en time.',
      'Her er ALL buss, trikk og tog helt gratis for alle – også for turister!',
      'Hovedstaden er bygd på høye klipper med dype kløfter og gamle broer.',
      'Landet styres av en storhertug – nesten som en konge, men med en annen tittel.',
    ],
  },
  {
    id: 'fr',
    name: 'Frankrike',
    flag: '🇫🇷',
    order: 5,
    capital: 'Paris',
    language: 'Fransk',
    hello: 'Bonjour!',
    helloTip: 'Uttales «bonsjur» – god dag på fransk',
    currency: 'Euro (€)',
    eat: 'En croissant eller en fersk baguette',
    facts: [
      'I Paris står Eiffeltårnet, som er 330 meter høyt og bygd helt av jern.',
      'I Frankrike lager de over 1000 forskjellige typer ost!',
      'Tour de France er verdens mest kjente sykkelritt.',
      'Fransk snakkes ikke bare i Frankrike, men i mange land over hele verden.',
    ],
  },
  {
    id: 'ch',
    name: 'Sveits',
    flag: '🇨🇭',
    order: 6,
    capital: 'Bern',
    language: 'Tysk, fransk og italiensk',
    hello: 'Grüezi!',
    helloTip: 'Uttales «grytsi» – slik hilser man i tysktalende Sveits',
    currency: 'Sveitserfranc (CHF)',
    eat: 'Sveitsisk sjokolade 🍫',
    facts: [
      'Sveits er kjent for Alpene, sjokolade, ost og lommekniver.',
      'Gotthard-tunnelen gjennom fjellet er en av verdens lengste – over 57 km med tog!',
      'Kyr i Sveits går ofte med store bjeller rundt halsen som klinger i fjellet.',
      'Sveits har fire offisielle språk. Folk bytter språk fra dal til dal.',
    ],
  },
  {
    id: 'li',
    name: 'Liechtenstein',
    flag: '🇱🇮',
    order: 7,
    capital: 'Vaduz',
    language: 'Tysk',
    hello: 'Hoi!',
    helloTip: 'Uttales «hoi» – et uformelt hei',
    currency: 'Sveitserfranc (CHF)',
    eat: 'Käsknöpfle (ostepasta, litt som makaroni og ost)',
    facts: [
      'Liechtenstein er så lite at det får plass mellom Sveits og Østerrike.',
      'Landet har ingen egen flyplass og bruker sveitsiske penger.',
      'En ekte fyrste (prins) bor i et slott høyt over hovedstaden Vaduz.',
      'Liechtenstein er et av få land i verden helt uten egen hær.',
    ],
  },
  {
    id: 'it',
    name: 'Italia',
    flag: '🇮🇹',
    order: 8,
    capital: 'Roma',
    language: 'Italiensk',
    hello: 'Ciao!',
    helloTip: 'Uttales «tsjao» – betyr både hei og ha det',
    currency: 'Euro (€)',
    eat: 'Ekte italiensk pizza eller gelato (is)',
    facts: [
      'Pizza og spaghetti kommer fra Italia – og gelato (italiensk is) også!',
      'Landet er formet som en støvel som sparker en ball (øya Sicilia).',
      'Gardasjøen er Italias STØRSTE innsjø – nesten som et hav med fjell rundt.',
      'I Italia finnes tårnet i Pisa, som heller til siden uten å falle.',
    ],
  },
]

export const byOrder = [...COUNTRIES].sort((a, b) => a.order - b.order)
