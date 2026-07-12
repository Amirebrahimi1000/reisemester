export interface Question {
  id: string
  q: string
  options: string[]
  answer: number // index into options
  fact: string // fun fact shown after answering
}

export interface QuizCategory {
  id: string
  title: string
  flag: string
  questions: Question[]
}

export const QUIZ: QuizCategory[] = [
  {
    id: 'norge',
    title: 'Norge',
    flag: '🇳🇴',
    questions: [
      {
        id: 'no1',
        q: 'Hva heter hovedstaden i Norge?',
        options: ['Bergen', 'Oslo', 'Trondheim', 'Stavanger'],
        answer: 1,
        fact: 'Oslo ligger innerst i Oslofjorden og har rundt 700 000 innbyggere.',
      },
      {
        id: 'no2',
        q: 'Hvilket dyr kalles «skogens konge» i Norge?',
        options: ['Bjørn', 'Rev', 'Elg', 'Ulv'],
        answer: 2,
        fact: 'En elgokse kan veie over 500 kg – like mye som 7 voksne mennesker!',
      },
      {
        id: 'no3',
        q: 'Hva er et fjord?',
        options: ['Et høyt fjell', 'En lang sjøarm inn i landet', 'En stor skog', 'En type båt'],
        answer: 1,
        fact: 'Fjorder ble laget av isbreer som gravde ut daler for tusenvis av år siden.',
      },
      {
        id: 'no4',
        q: 'Byen dere starter i, Skien, er kjent for en berømt dikter. Hvem?',
        options: ['Henrik Ibsen', 'Roald Dahl', 'Astrid Lindgren', 'H.C. Andersen'],
        answer: 0,
        fact: 'Henrik Ibsen ble født i Skien i 1828 og skrev skuespill som spilles i hele verden.',
      },
      {
        id: 'no5',
        q: 'Omtrent hvor mange timer tar bilturen fra Skien til Gardasjøen?',
        options: ['Cirka 6 timer', 'Cirka 12 timer', 'Cirka 30 timer', 'Cirka 100 timer'],
        answer: 2,
        fact: 'Ruten er på rundt 30 timers kjøring – derfor deler man den opp over flere dager!',
      },
    ],
  },
  {
    id: 'danmark',
    title: 'Danmark',
    flag: '🇩🇰',
    questions: [
      {
        id: 'dk1',
        q: 'Hva heter hovedstaden i Danmark?',
        options: ['Odense', 'Aarhus', 'København', 'Aalborg'],
        answer: 2,
        fact: 'I København finner du den lille havfruen – en statue laget etter et eventyr.',
      },
      {
        id: 'dk2',
        q: 'Hvilken kjent leke ble funnet opp i Danmark?',
        options: ['Barbie', 'Lego', 'Rubiks kube', 'Yo-yo'],
        answer: 1,
        fact: 'Navnet «Lego» kommer fra de danske ordene «leg godt» = lek godt.',
      },
      {
        id: 'dk3',
        q: 'Hvordan er landskapet i Danmark for det meste?',
        options: ['Høye fjell', 'Flatt og grønt', 'Ørken', 'Regnskog'],
        answer: 1,
        fact: 'Danmarks høyeste punkt er bare 171 meter – lavere enn mange norske bakker!',
      },
      {
        id: 'dk4',
        q: 'Hva sier man for «hei» på dansk?',
        options: ['Ciao', 'Hallo', 'Hej', 'Grüezi'],
        answer: 2,
        fact: '«Hej» uttales nesten som «hai». Dansk og norsk ligner mye på hverandre.',
      },
      {
        id: 'dk5',
        q: 'Danmark består av fastland og mange…?',
        options: ['Fjell', 'Øyer', 'Vulkaner', 'Innsjøer'],
        answer: 1,
        fact: 'Danmark har over 400 øyer, og mange er koblet sammen med lange broer.',
      },
    ],
  },
  {
    id: 'tyskland',
    title: 'Tyskland',
    flag: '🇩🇪',
    questions: [
      {
        id: 'de1',
        q: 'Hva heter de tyske motorveiene?',
        options: ['Highway', 'Autobahn', 'Autostrada', 'Motorvei'],
        answer: 1,
        fact: 'På enkelte strekninger av Autobahn finnes det ingen fartsgrense i det hele tatt!',
      },
      {
        id: 'de2',
        q: 'Hvilken av disse bilene er tysk?',
        options: ['Volvo', 'Toyota', 'BMW', 'Tesla'],
        answer: 2,
        fact: 'BMW, Mercedes, Audi, VW og Porsche er alle tyske bilmerker.',
      },
      {
        id: 'de3',
        q: 'Hva sier man for «hei» på tysk?',
        options: ['Hallo', 'Ciao', 'Hej', 'Salut'],
        answer: 0,
        fact: 'Vil du telle på tysk? Eins (1), zwei (2), drei (3), vier (4), fünf (5)!',
      },
      {
        id: 'de4',
        q: 'Brødrene Grimm fra Tyskland samlet inn kjente…?',
        options: ['Biler', 'Eventyr', 'Frimerker', 'Steiner'],
        answer: 1,
        fact: 'Askepott, Rødhette, Snøhvit og Hans og Grete kommer fra brødrene Grimm.',
      },
      {
        id: 'de5',
        q: 'Hva betyr skiltet «Ausfahrt» på tyske motorveier?',
        options: ['Bensinstasjon', 'Avkjøring / utkjørsel', 'Rasteplass', 'Bomstasjon'],
        answer: 1,
        fact: 'Ausfahrt betyr «utkjørsel». Einfahrt betyr «innkjørsel».',
      },
    ],
  },
  {
    id: 'sveits',
    title: 'Sveits & Alpene',
    flag: '🇨🇭',
    questions: [
      {
        id: 'ch1',
        q: 'Hva heter den store fjellkjeden i Sveits?',
        options: ['Andesfjellene', 'Alpene', 'Himalaya', 'Klippfjellene'],
        answer: 1,
        fact: 'Alpene strekker seg gjennom flere land, og mange topper har snø hele året.',
      },
      {
        id: 'ch2',
        q: 'Hva er Sveits aller mest kjent for å lage?',
        options: ['Sjokolade og ost', 'Sushi', 'Tacos', 'Pølser'],
        answer: 0,
        fact: 'Sveitsere spiser i snitt rundt 10 kg sjokolade i året per person!',
      },
      {
        id: 'ch3',
        q: 'Hvorfor har mange kyr i Sveits bjelle rundt halsen?',
        options: [
          'For pynt',
          'Så bonden hører hvor de er i fjellet',
          'For å skremme ulver',
          'For å lage musikk',
        ],
        answer: 1,
        fact: 'Bjelleklangen gjør at bonden finner kyrne selv i tåke og bratt terreng.',
      },
      {
        id: 'ch4',
        q: 'Hvor mange offisielle språk har Sveits?',
        options: ['Ett', 'To', 'Fire', 'Ti'],
        answer: 2,
        fact: 'Tysk, fransk, italiensk og rutoromansk – folk bytter språk fra dal til dal.',
      },
      {
        id: 'ch5',
        q: 'Hva bruker biler for å komme raskt gjennom høye fjell?',
        options: ['Broer', 'Tunneler', 'Heiser', 'Ferjer'],
        answer: 1,
        fact: 'Gotthard-jernbanetunnelen er over 57 km lang – en av verdens lengste.',
      },
    ],
  },
  {
    id: 'italia',
    title: 'Italia & Gardasjøen',
    flag: '🇮🇹',
    questions: [
      {
        id: 'it1',
        q: 'Hvilken av disse rettene kommer fra Italia?',
        options: ['Sushi', 'Pizza', 'Taco', 'Wienerbrød'],
        answer: 1,
        fact: 'Gelato er italiensk is – ofte kremere og med mer smak enn vanlig iskrem.',
      },
      {
        id: 'it2',
        q: 'Italia er formet som hva?',
        options: ['En hånd', 'En støvel', 'En stjerne', 'En fisk'],
        answer: 1,
        fact: 'Støvelen «sparker» øya Sicilia, som ligger like ved tuppen.',
      },
      {
        id: 'it3',
        q: 'Gardasjøen er Italias …?',
        options: ['Høyeste fjell', 'Største innsjø', 'Lengste elv', 'Eldste by'],
        answer: 1,
        fact: 'Gardasjøen er så stor at du nesten ikke ser over til andre siden – med fjell rundt.',
      },
      {
        id: 'it4',
        q: 'Hva sier man for «hei» på italiensk?',
        options: ['Ciao', 'Hallo', 'Hej', 'Grüezi'],
        answer: 0,
        fact: '«Ciao» (uttales tsjao) betyr både hei OG ha det. Grazie betyr takk.',
      },
      {
        id: 'it5',
        q: 'Det berømte tårnet i den italienske byen Pisa er kjent for at det…?',
        options: ['Er verdens høyeste', 'Heller til siden', 'Er laget av gull', 'Kan snurre rundt'],
        answer: 1,
        fact: 'Tårnet i Pisa begynte å helle allerede mens det ble bygget, for over 800 år siden.',
      },
    ],
  },
  {
    id: 'benelux',
    title: 'Belgia, Luxembourg & Frankrike',
    flag: '🧇',
    questions: [
      {
        id: 'bx1',
        q: 'Hvilken kjent matbit ble faktisk funnet opp i Belgia?',
        options: ['Sushi', 'Pommes frites', 'Tacos', 'Pizza'],
        answer: 1,
        fact: 'Belgierne er stolte av pommes frites – mange sier de er bedre enn de franske!',
      },
      {
        id: 'bx2',
        q: 'Hva er ekstra kult med bussene og togene i Luxembourg?',
        options: ['De kjører under vann', 'De er helt gratis', 'De flyr', 'De er laget av sjokolade'],
        answer: 1,
        fact: 'Luxembourg var det første landet i verden som gjorde all kollektivtransport gratis.',
      },
      {
        id: 'bx3',
        q: 'Hva heter det berømte jerntårnet i Paris?',
        options: ['Big Ben', 'Eiffeltårnet', 'Det skjeve tårn', 'Frihetsgudinnen'],
        answer: 1,
        fact: 'Eiffeltårnet er 330 meter høyt. Om sommeren «vokser» det litt fordi jernet utvider seg i varmen!',
      },
      {
        id: 'bx4',
        q: 'Luxembourg er et av verdens …?',
        options: ['Største land', 'Minste land', 'Kaldeste land', 'Varmeste land'],
        answer: 1,
        fact: 'Dere kan kjøre gjennom hele Luxembourg på under en time – men dere skal overnatte der!',
      },
      {
        id: 'bx5',
        q: 'Hvor mange typer ost lager de i Frankrike?',
        options: ['Cirka 10', 'Cirka 100', 'Over 1000', 'Bare én'],
        answer: 2,
        fact: 'En fransk president sa en gang at det er umulig å styre et land med over 1000 oster!',
      },
    ],
  },
  {
    id: 'blandet',
    title: 'Blandet på veien',
    flag: '🚗',
    questions: [
      {
        id: 'mix1',
        q: 'Hvilken retning kjører dere for å komme fra Norge til Italia?',
        options: ['Nordover', 'Sørover', 'Østover', 'Vestover'],
        answer: 1,
        fact: 'Dere kjører sørover gjennom Europa – det blir varmere jo lenger sør dere kommer.',
      },
      {
        id: 'mix2',
        q: 'Hvilken felles pengevaluta bruker Tyskland og Italia?',
        options: ['Dollar', 'Kroner', 'Euro', 'Pund'],
        answer: 2,
        fact: 'Over 20 land i Europa bruker euro. Norge, Danmark og Sveits gjør det ikke.',
      },
      {
        id: 'mix3',
        q: 'Hva betyr et rundt skilt med rød kant og et tall inni?',
        options: ['Anbefalt fart', 'Fartsgrense', 'Avstand til byen', 'Antall svinger'],
        answer: 1,
        fact: 'Tallet er høyeste lovlige fart i km/t. Fartsgrensene er ulike i hvert land.',
      },
      {
        id: 'mix4',
        q: 'Hva slags bil er det ekstra lurt å lade underveis på denne turen?',
        options: ['Dieselbil', 'Elbil', 'Veteranbil', 'Racerbil'],
        answer: 1,
        fact: 'Elbiler lades på ladestasjoner. En god pause: strekk på beina mens bilen lader!',
      },
      {
        id: 'mix5',
        q: 'Hvilket land ligger MELLOM Norge og Tyskland på ruten deres?',
        options: ['Sverige', 'Danmark', 'Nederland', 'Polen'],
        answer: 1,
        fact: 'Dere tar ferje fra Norge til Danmark, og kjører så videre ned til Tyskland.',
      },
      {
        id: 'mix6',
        q: 'Hvorfor har land forskjellige språk?',
        options: [
          'Fordi de bestemte det i går',
          'Språk har vokst fram over veldig lang tid',
          'For å gjøre det vanskelig',
          'Alle land har egentlig samme språk',
        ],
        answer: 1,
        fact: 'Mange europeiske språk er i slekt – «natt» heter Nacht (tysk) og notte (italiensk).',
      },
    ],
  },
]
