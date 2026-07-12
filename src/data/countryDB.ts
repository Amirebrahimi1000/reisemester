// Reusable database of countries, shared across all trips. Each trip just
// references country ids; the data (facts, flag, GPS box, greeting) lives here.
export interface Country {
  id: string // ISO alpha-2 (matches the map region ids)
  name: string
  flag: string
  capital: string
  language: string
  hello: string
  helloTip: string
  currency: string
  eat: string
  facts: string[]
  speechLang: string // BCP-47 tag for text-to-speech
  speechPhrase: string // what to pronounce for "hør språket"
  // Rough lat/lon bounding box for offline "which country am I in?" detection.
  latMin: number
  latMax: number
  lonMin: number
  lonMax: number
}

export const COUNTRY_DB: Record<string, Country> = {
  no: {
    id: 'no', name: 'Norge', flag: '🇳🇴', capital: 'Oslo', language: 'Norsk',
    hello: 'Hei!', helloTip: 'Det kan du jo fra før 😄', currency: 'Norske kroner (kr)',
    eat: 'Brunost på matpakka', speechLang: 'nb-NO', speechPhrase: 'Hei',
    latMin: 57.9, latMax: 71.2, lonMin: 4.5, lonMax: 31.2,
    facts: [
      'Norge har over 1000 fjorder – vann som strekker seg langt inn i landet.',
      'Norge har verdens lengste veitunnel: Lærdalstunnelen er 24,5 km!',
      'Elg kalles «skogens konge» og kan bli like høy som en bil er lang.',
      'Om sommeren i Nord-Norge går ikke sola ned – det kalles midnattssol.',
      'Nesten all strøm i Norge kommer fra vannkraft – fossefall og elver.',
      'Norge er et av landene i verden med aller flest elbiler.',
      'For over 1000 år siden seilte vikingene ut fra Norge i lange trebåter.',
      'Norge er langt og smalt – nesten like langt som herfra til Roma!',
    ],
  },
  dk: {
    id: 'dk', name: 'Danmark', flag: '🇩🇰', capital: 'København', language: 'Dansk',
    hello: 'Hej!', helloTip: 'Uttales «hai», nesten som på engelsk', currency: 'Danske kroner (kr)',
    eat: 'Wienerbrød eller en hotdog', speechLang: 'da-DK', speechPhrase: 'Hej',
    latMin: 54.5, latMax: 57.8, lonMin: 8.0, lonMax: 12.8,
    facts: [
      'Danmark er nesten helt flatt – det høyeste «fjellet» er bare 171 meter!',
      'Danmark har over 400 øyer, mange bundet sammen med lange broer.',
      'Legoklossen ble funnet opp i Danmark i 1958.',
      'Det danske flagget, Dannebrog, er et av verdens eldste flagg.',
      'Danmark er landet med flest sykler per person.',
      'Legoland, en fornøyelsespark bygd av Lego, ligger i Billund.',
      'Eventyrdikteren H.C. Andersen (Den lille havfrue) var dansk.',
      'Danskene er glade i «smørrebrød» – rugbrød med masse pålegg.',
    ],
  },
  de: {
    id: 'de', name: 'Tyskland', flag: '🇩🇪', capital: 'Berlin', language: 'Tysk',
    hello: 'Hallo!', helloTip: 'Uttales «hallo», med trykk på siste del', currency: 'Euro (€)',
    eat: 'Bratwurst (grillpølse) med brød', speechLang: 'de-DE', speechPhrase: 'Hallo',
    latMin: 47.2, latMax: 55.1, lonMin: 5.8, lonMax: 15.1,
    facts: [
      'På tyske motorveier (Autobahn) er det noen steder INGEN fartsgrense.',
      'Tyskland lager kjente biler: BMW, Mercedes, Volkswagen, Porsche og Audi.',
      'Askepott, Rødhette og Snøhvit ble skrevet ned av brødrene Grimm i Tyskland.',
      'Tyskland grenser til hele 9 land.',
      'Berlin var delt av en mur helt fram til 1989.',
      'Oktoberfest i München er en av verdens største folkefester.',
      'Tyskland har over 1500 forskjellige typer pølser (Wurst).',
      'Tradisjonen med å pynte juletre kommer opprinnelig fra Tyskland.',
    ],
  },
  be: {
    id: 'be', name: 'Belgia', flag: '🇧🇪', capital: 'Brussel', language: 'Nederlandsk, fransk og tysk',
    hello: 'Hallo! / Bonjour!', helloTip: 'I nord «hallo», i sør «bonjour» (bonsjur)', currency: 'Euro (€)',
    eat: 'Belgiske vafler eller pommes frites', speechLang: 'nl-BE', speechPhrase: 'Hallo',
    latMin: 49.5, latMax: 51.5, lonMin: 2.5, lonMax: 6.4,
    facts: [
      'Pommes frites ble faktisk funnet opp i Belgia – ikke i Frankrike!',
      'Tintin og Smurfene er tegneseriefigurer fra Belgia.',
      'I Brussel står en bitte liten statue av en gutt som tisser: «Manneken Pis».',
      'Belgia er verdenskjent for sjokolade.',
      'Belgia har tre offisielle språk: nederlandsk, fransk og tysk.',
      'Brussel regnes som «hovedstaden» i EU.',
      'Belgiske vafler spises med melis, sjokolade eller jordbær.',
      'Landet er ganske flatt – supert for sykkel.',
    ],
  },
  lu: {
    id: 'lu', name: 'Luxembourg', flag: '🇱🇺', capital: 'Luxembourg by', language: 'Luxemburgsk, fransk og tysk',
    hello: 'Moien!', helloTip: 'Uttales «moi-en» – hei på luxemburgsk', currency: 'Euro (€)',
    eat: 'Gromperekichelcher (sprø potetkaker)', speechLang: 'fr-FR', speechPhrase: 'Moien',
    latMin: 49.4, latMax: 50.2, lonMin: 5.7, lonMax: 6.55,
    facts: [
      'Luxembourg er et av verdens minste land – gjennomkjøring på under en time.',
      'Her er ALL buss, trikk og tog helt gratis for alle!',
      'Hovedstaden er bygd på høye klipper med dype kløfter og gamle broer.',
      'Landet styres av en storhertug.',
      'Luxembourg er et av de rikeste landene i verden.',
      'De fleste snakker flere språk flytende – ofte tre eller fire!',
      'Landet er så lite at Norge er over 100 ganger større.',
      'Nesten halvparten som bor her, kommer fra andre land.',
    ],
  },
  fr: {
    id: 'fr', name: 'Frankrike', flag: '🇫🇷', capital: 'Paris', language: 'Fransk',
    hello: 'Bonjour!', helloTip: 'Uttales «bonsjur» – god dag på fransk', currency: 'Euro (€)',
    eat: 'En croissant eller en fersk baguette', speechLang: 'fr-FR', speechPhrase: 'Bonjour',
    latMin: 42.3, latMax: 51.1, lonMin: -4.8, lonMax: 8.3,
    facts: [
      'I Paris står Eiffeltårnet, 330 meter høyt og bygd helt av jern.',
      'I Frankrike lager de over 1000 forskjellige typer ost!',
      'Tour de France er verdens mest kjente sykkelritt.',
      'Frankrike er landet flest turister i verden reiser til.',
      'I Paris ligger Louvre, et av verdens største museer – der henger Mona Lisa.',
      'Landet er nesten formet som en sekskant, kalt «l’Hexagone».',
      'Croissant og baguette er kjente franske bakverk.',
      'Fransk snakkes i mange land over hele verden.',
    ],
  },
  ch: {
    id: 'ch', name: 'Sveits', flag: '🇨🇭', capital: 'Bern', language: 'Tysk, fransk og italiensk',
    hello: 'Grüezi!', helloTip: 'Uttales «grytsi» – slik hilser man i tysktalende Sveits', currency: 'Sveitserfranc (CHF)',
    eat: 'Sveitsisk sjokolade 🍫', speechLang: 'de-CH', speechPhrase: 'Grüezi',
    latMin: 45.8, latMax: 47.8, lonMin: 5.9, lonMax: 10.5,
    facts: [
      'Sveits er kjent for Alpene, sjokolade, ost og lommekniver.',
      'Gotthard-tunnelen er en av verdens lengste – over 57 km med tog!',
      'Kyr i Sveits går ofte med store bjeller rundt halsen.',
      'Sveits har fire offisielle språk.',
      'Sveits bruker ikke euro, men sveitserfranc.',
      'Matterhorn er et av verdens mest kjente fjell – det på Toblerone-esken.',
      'Sveits har holdt seg nøytralt i over 200 år.',
      'Noen av verdens beste sjokoladefabrikker ligger her.',
    ],
  },
  li: {
    id: 'li', name: 'Liechtenstein', flag: '🇱🇮', capital: 'Vaduz', language: 'Tysk',
    hello: 'Hoi!', helloTip: 'Uttales «hoi» – et uformelt hei', currency: 'Sveitserfranc (CHF)',
    eat: 'Käsknöpfle (ostepasta)', speechLang: 'de-DE', speechPhrase: 'Hoi',
    latMin: 47.05, latMax: 47.28, lonMin: 9.47, lonMax: 9.64,
    facts: [
      'Liechtenstein er så lite at det får plass mellom Sveits og Østerrike.',
      'Landet har ingen egen flyplass og bruker sveitsiske penger.',
      'En ekte fyrste (prins) bor i et slott høyt over hovedstaden Vaduz.',
      'Liechtenstein er et av få land helt uten egen hær.',
      'Du rekker å gå tvers over hele landet på én dag.',
      'De lager utrolig mange kunstige tenner som selges over hele verden.',
      'Det bor færre mennesker her enn i mange norske byer.',
      'Landet deler språk og penger med naboene sine.',
    ],
  },
  it: {
    id: 'it', name: 'Italia', flag: '🇮🇹', capital: 'Roma', language: 'Italiensk',
    hello: 'Ciao!', helloTip: 'Uttales «tsjao» – betyr både hei og ha det', currency: 'Euro (€)',
    eat: 'Ekte italiensk pizza eller gelato', speechLang: 'it-IT', speechPhrase: 'Ciao',
    latMin: 36.6, latMax: 47.1, lonMin: 6.6, lonMax: 18.6,
    facts: [
      'Pizza og spaghetti kommer fra Italia – og gelato (italiensk is) også!',
      'Landet er formet som en støvel som sparker en ball (øya Sicilia).',
      'Gardasjøen er Italias STØRSTE innsjø.',
      'I Italia finnes tårnet i Pisa, som heller til siden uten å falle.',
      'Italia har flest UNESCO-verdensarvsteder av alle land i verden.',
      'Inni Roma ligger Vatikanstaten – verdens minste land.',
      'Colosseum i Roma er nesten 2000 år gammelt.',
      'Venezia er en by helt uten biler – der kjører man båt på kanaler.',
    ],
  },

  // --- Additional European countries (lighter data) for building new trips ---
  se: {
    id: 'se', name: 'Sverige', flag: '🇸🇪', capital: 'Stockholm', language: 'Svensk',
    hello: 'Hej!', helloTip: 'Uttales «hei» – nesten som på norsk', currency: 'Svenske kroner (kr)',
    eat: 'Köttbullar (kjøttboller) med syltetøy', speechLang: 'sv-SE', speechPhrase: 'Hej',
    latMin: 55.3, latMax: 69.1, lonMin: 11.1, lonMax: 24.2,
    facts: [
      'Sverige er Nordens største land og har enorme skoger.',
      'IKEA og godteri-lørdag («lördagsgodis») kommer fra Sverige.',
      'Astrid Lindgren skrev om Pippi Langstrømpe og Emil i Lønneberget.',
      'Stockholm er bygd på 14 øyer bundet sammen med broer.',
    ],
  },
  nl: {
    id: 'nl', name: 'Nederland', flag: '🇳🇱', capital: 'Amsterdam', language: 'Nederlandsk',
    hello: 'Hallo!', helloTip: 'Uttales «hallo»', currency: 'Euro (€)',
    eat: 'Poffertjes (små pannekaker)', speechLang: 'nl-NL', speechPhrase: 'Hallo',
    latMin: 50.7, latMax: 53.6, lonMin: 3.3, lonMax: 7.2,
    facts: [
      'Store deler av Nederland ligger under havnivå – beskyttet av diker.',
      'Landet er kjent for vindmøller, tulipaner og MASSE sykler.',
      'I Amsterdam er det kanaler i stedet for mange gater.',
      'Nederland er et av verdens flateste land.',
    ],
  },
  at: {
    id: 'at', name: 'Østerrike', flag: '🇦🇹', capital: 'Wien', language: 'Tysk',
    hello: 'Servus!', helloTip: 'Uttales «servus» – uformelt hei', currency: 'Euro (€)',
    eat: 'Wienerschnitzel eller Sachertorte', speechLang: 'de-AT', speechPhrase: 'Servus',
    latMin: 46.4, latMax: 49.0, lonMin: 9.5, lonMax: 17.2,
    facts: [
      'Østerrike ligger midt i Alpene – flott for ski om vinteren.',
      'Komponisten Mozart ble født i byen Salzburg.',
      'Filmen «The Sound of Music» ble spilt inn her.',
      'Wien er kjent for flotte slott og hestevogner.',
    ],
  },
  es: {
    id: 'es', name: 'Spania', flag: '🇪🇸', capital: 'Madrid', language: 'Spansk',
    hello: 'Hola!', helloTip: 'Uttales «ola» – h-en er stum', currency: 'Euro (€)',
    eat: 'Paella eller churros', speechLang: 'es-ES', speechPhrase: 'Hola',
    latMin: 36.0, latMax: 43.8, lonMin: -9.3, lonMax: 3.3,
    facts: [
      'Spania er kjent for sol, strender og fotball.',
      'I Barcelona står den fantastiske kirken Sagrada Família.',
      'Spansk snakkes av over 400 millioner mennesker i verden.',
      'Siesta betyr en liten hvil midt på den varmeste dagen.',
    ],
  },
  pt: {
    id: 'pt', name: 'Portugal', flag: '🇵🇹', capital: 'Lisboa', language: 'Portugisisk',
    hello: 'Olá!', helloTip: 'Uttales «ola»', currency: 'Euro (€)',
    eat: 'Pastel de nata (vaniljeterte)', speechLang: 'pt-PT', speechPhrase: 'Olá',
    latMin: 37.0, latMax: 42.2, lonMin: -9.5, lonMax: -6.2,
    facts: [
      'Portugal ligger helt vest i Europa, ved Atlanterhavet.',
      'Herfra seilte oppdagere ut på lange sjøreiser for lenge siden.',
      'Landet er kjent for fargerike fliser på husveggene.',
      'Pastel de nata er en berømt liten vaniljeterte.',
    ],
  },
  pl: {
    id: 'pl', name: 'Polen', flag: '🇵🇱', capital: 'Warszawa', language: 'Polsk',
    hello: 'Cześć!', helloTip: 'Uttales «tsjeshtsj»', currency: 'Złoty (zł)',
    eat: 'Pierogi (deigputer med fyll)', speechLang: 'pl-PL', speechPhrase: 'Cześć',
    latMin: 49.0, latMax: 54.9, lonMin: 14.1, lonMax: 24.2,
    facts: [
      'Polen har store skoger der det finnes ville bisonokser.',
      'Astronomen Kopernikus, som forsto at jorda går rundt sola, var polsk.',
      'Pierogi er små deigputer med potet, ost eller kjøtt.',
      'Landet har vakre gamlebyer med fargerike hus.',
    ],
  },
  cz: {
    id: 'cz', name: 'Tsjekkia', flag: '🇨🇿', capital: 'Praha', language: 'Tsjekkisk',
    hello: 'Ahoj!', helloTip: 'Uttales «ahoj» – som «ohoi»', currency: 'Tsjekkiske kroner (Kč)',
    eat: 'Trdelník (søtt bakverk)', speechLang: 'cs-CZ', speechPhrase: 'Ahoj',
    latMin: 48.5, latMax: 51.1, lonMin: 12.1, lonMax: 18.9,
    facts: [
      'Praha kalles «byen med hundre tårn» og har en gammel borg.',
      'Morsomt nok betyr «ahoj» hei – som et sjørøver-ohoi!',
      'Landet er kjent for vakre glass-varer.',
      'Her finnes mange eventyrslott på høye åser.',
    ],
  },
  sk: {
    id: 'sk', name: 'Slovakia', flag: '🇸🇰', capital: 'Bratislava', language: 'Slovakisk',
    hello: 'Ahoj!', helloTip: 'Uttales «ahoj»', currency: 'Euro (€)',
    eat: 'Bryndzové halušky (potetboller med ost)', speechLang: 'sk-SK', speechPhrase: 'Ahoj',
    latMin: 47.7, latMax: 49.6, lonMin: 16.8, lonMax: 22.6,
    facts: [
      'Slovakia har høye fjell som heter Tatra-fjellene.',
      'Landet har flest borger og slott per innbygger i verden.',
      'Hovedstaden Bratislava ligger rett ved elva Donau.',
      'Her finnes mange grotter man kan utforske.',
    ],
  },
  si: {
    id: 'si', name: 'Slovenia', flag: '🇸🇮', capital: 'Ljubljana', language: 'Slovensk',
    hello: 'Živjo!', helloTip: 'Uttales «zjivjo»', currency: 'Euro (€)',
    eat: 'Potica (rullekake)', speechLang: 'sl-SI', speechPhrase: 'Živjo',
    latMin: 45.4, latMax: 46.9, lonMin: 13.4, lonMax: 16.6,
    facts: [
      'Slovenia er grønt og fullt av fjell, skog og innsjøer.',
      'Bled-innsjøen har en liten øy med en kirke midt i.',
      'Navnet «Slovenia» inneholder ordet «love» (kjærlighet på engelsk).',
      'Landet har store, spennende drypphuler.',
    ],
  },
  hr: {
    id: 'hr', name: 'Kroatia', flag: '🇭🇷', capital: 'Zagreb', language: 'Kroatisk',
    hello: 'Bok!', helloTip: 'Uttales «bok»', currency: 'Euro (€)',
    eat: 'Fritule (små søte boller)', speechLang: 'hr-HR', speechPhrase: 'Bok',
    latMin: 42.4, latMax: 46.6, lonMin: 13.5, lonMax: 19.4,
    facts: [
      'Kroatia har en lang, vakker kyst med over 1000 øyer.',
      'Slottsbyen Dubrovnik er brukt i kjente filmer og serier.',
      'Slipsen ble oppfunnet i Kroatia!',
      'Havet her er krystallklart og blått.',
    ],
  },
  hu: {
    id: 'hu', name: 'Ungarn', flag: '🇭🇺', capital: 'Budapest', language: 'Ungarsk',
    hello: 'Szia!', helloTip: 'Uttales «sia»', currency: 'Forint (Ft)',
    eat: 'Gulasj (kraftig suppe)', speechLang: 'hu-HU', speechPhrase: 'Szia',
    latMin: 45.7, latMax: 48.6, lonMin: 16.1, lonMax: 22.9,
    facts: [
      'Budapest er to byer – Buda og Pest – delt av elva Donau.',
      'Ungarn er kjent for varme bade-kilder.',
      'Rubiks kube ble funnet opp av en ungarer!',
      'Gulasj er en kraftig og god kjøttsuppe.',
    ],
  },
  gb: {
    id: 'gb', name: 'Storbritannia', flag: '🇬🇧', capital: 'London', language: 'Engelsk',
    hello: 'Hello!', helloTip: 'Uttales «hellå»', currency: 'Pund (£)',
    eat: 'Fish and chips', speechLang: 'en-GB', speechPhrase: 'Hello',
    latMin: 49.9, latMax: 58.7, lonMin: -8.6, lonMax: 1.8,
    facts: [
      'I Storbritannia kjører bilene på venstre side av veien!',
      'London har den berømte klokka Big Ben og røde dobbeldekker-busser.',
      'Harry Potter-bøkene ble skrevet her.',
      'Landet er en øy, så man må ta båt eller tunnel for å komme dit.',
    ],
  },
  ie: {
    id: 'ie', name: 'Irland', flag: '🇮🇪', capital: 'Dublin', language: 'Engelsk og irsk',
    hello: 'Hello! / Dia duit!', helloTip: '«Dia duit» (dji-a ditt) er hei på irsk', currency: 'Euro (€)',
    eat: 'Irsk stew (lammegryte)', speechLang: 'en-IE', speechPhrase: 'Hello',
    latMin: 51.4, latMax: 55.4, lonMin: -10.5, lonMax: -6.0,
    facts: [
      'Irland kalles «den grønne øya» fordi det regner mye og alt er grønt.',
      'Kløveren med tre blader er et symbol for Irland.',
      'Fortellinger om nisser («leprechauns») med gullgryter kommer herfra.',
      'Landet har dramatiske klipper rett ned i havet.',
    ],
  },
  fi: {
    id: 'fi', name: 'Finland', flag: '🇫🇮', capital: 'Helsingfors', language: 'Finsk og svensk',
    hello: 'Moi!', helloTip: 'Uttales «moi»', currency: 'Euro (€)',
    eat: 'Karjalanpiirakka (rispai)', speechLang: 'fi-FI', speechPhrase: 'Moi',
    latMin: 59.8, latMax: 70.1, lonMin: 20.6, lonMax: 31.6,
    facts: [
      'Finland kalles «de tusen sjøers land» – det har over 180 000 innsjøer!',
      'Julenissen sier finnene bor i Rovaniemi i Nord-Finland.',
      'Badstue (sauna) er superviktig i Finland.',
      'Om vinteren kan man se nordlys på himmelen.',
    ],
  },
  gr: {
    id: 'gr', name: 'Hellas', flag: '🇬🇷', capital: 'Athen', language: 'Gresk',
    hello: 'Yassou!', helloTip: 'Uttales «ja-su»', currency: 'Euro (€)',
    eat: 'Gyros eller souvlaki', speechLang: 'el-GR', speechPhrase: 'Γεια σου',
    latMin: 34.8, latMax: 41.7, lonMin: 19.4, lonMax: 28.2,
    facts: [
      'De første olympiske lekene ble holdt i Hellas for lenge siden.',
      'Athen har det gamle tempelet Akropolis på en høyde.',
      'Hellas har tusenvis av øyer i det blå havet.',
      'Mange greske ord brukes i matte og vitenskap.',
    ],
  },
}

export const ALL_COUNTRIES = Object.values(COUNTRY_DB)
export const getCountry = (id: string): Country | undefined => COUNTRY_DB[id]
