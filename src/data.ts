import { Structure, TypologyDetail } from './types';

export const TYPOLOGIES: TypologyDetail[] = [
  {
    id: 'territorio',
    title: 'Valorizzazione del Territorio',
    subtitle: 'Albergo Diffuso',
    iconName: 'MapPin',
    description: 'Modello di ospitalità integrata che valorizza centri storici e borghi antichi, offrendo alloggi sparsi e servizi centralizzati.',
    colorScheme: 'emerald'
  },
  {
    id: 'agriturismo',
    title: 'Agriturismo',
    subtitle: 'Integrazione Agricola',
    iconName: 'Sprout',
    description: 'Ospitalità legata alla coltivazione della terra, all’allevamento e alla ristorazione con prodotti genuini e Km zero.',
    colorScheme: 'lime'
  },
  {
    id: 'rurale',
    title: 'Struttura Ricettiva Rurale',
    subtitle: 'Patrimonio Naturalistico',
    iconName: 'Trees',
    description: 'Gestione imprenditoriale focalizzata sul patrimonio ecologico, naturalistico e storico del territorio campestre.',
    colorScheme: 'green'
  },
  {
    id: 'bike',
    title: 'Modello Bike Hotel',
    subtitle: 'Turismo Attivo & Ciclisti',
    iconName: 'Bike',
    description: 'Accoglienza su misura per cicloturisti con officine, depositi di sicurezza, colazioni energetiche e percorsi dedicati.',
    colorScheme: 'teal'
  },
  {
    id: 'emozionale',
    title: 'Strutture Emozionali',
    subtitle: 'Esperienze Uniche',
    iconName: 'Sparkles',
    description: 'Alloggi insoliti progettati per connettere profondamente l’ospite con la natura, come le stanze trasparenti sotto le stelle.',
    colorScheme: 'violet'
  }
];

export const STRUCTURES: Structure[] = [
  {
    id: 'bertinoro',
    name: 'Albergo Diffuso di Bertinoro',
    location: 'Bertinoro (FC)',
    distanceFromCervia: 'circa 25 minuti da Cervia',
    description: 'Incarna perfettamente il modello di albergo diffuso, con unità abitative finemente integrate nel centro storico di un suggestivo borgo medievale noto come il Balcone di Romagna.',
    typology: 'territorio',
    features: ['Camere diffuse nel borgo', 'Centro storico medievale', 'Vista panoramica sulla Romagna', 'Colazione con specialità locali', 'Servizi centralizzati'],
    coordinates: { lat: 44.1491, lng: 12.1328 }
  },
  {
    id: 'km0',
    name: 'Agriturismo Kilometri 0',
    location: 'Savio di Ravenna (RA)',
    distanceFromCervia: 'circa 10 km da Cervia',
    description: 'Offre un’autentica ospitalità legata alla coltivazione diretta del fondo e all’offerta di prodotti freschi a filiera cortissima (Km zero), rispettando appieno le normative del Codice Civile sull’attività agricola connessa.',
    typology: 'agriturismo',
    features: ['Cucina a Km zero', 'Coltivazione diretta', 'Camere immerse nella campagna', 'Produzione propria di vino e olio', 'Ricarica e-bike'],
    coordinates: { lat: 44.3167, lng: 12.3000 }
  },
  {
    id: 'salina',
    name: 'Agriturismo La Salina',
    location: 'Pisignano, Cervia (RA)',
    distanceFromCervia: 'nella campagna di Cervia',
    description: 'Un eccellente esempio di gestione rurale focalizzata sul patrimonio naturalistico, ecologico e paesaggistico delle celebri Saline di Cervia, ideale per il relax e il birdwatching.',
    typology: 'rurale',
    features: ['Vicina alle Saline di Cervia', 'Birdwatching guidato', 'Ampio giardino relax', 'Architettura rurale restaurata', 'Prodotti artigianali di sale dolci'],
    coordinates: { lat: 44.2568, lng: 12.3276 }
  },
  {
    id: 'fantini',
    name: 'Fantini Club Hotel',
    location: 'Cervia (RA)',
    distanceFromCervia: 'direttamente sulla spiaggia di Cervia',
    description: 'Struttura d’eccellenza specializzata nell’accoglienza "cyclist-friendly". Propone pacchetti sportivi dedicati, deposito videosorvegliato di ultima generazione per biciclette e un programma completo di assistenza tecnica e massaggi post-allenamento.',
    typology: 'bike',
    features: ['Deposito bici sicuro', 'Officina e lavaggio', 'Spiaggia privata e palestra', 'Guide ciclistiche locali', 'Nutrizione e colazioni per atleti'],
    coordinates: { lat: 44.2647, lng: 12.3610 }
  },
  {
    id: 'bubble-experience',
    name: 'Bubble Room Experience',
    location: 'Casteldelci (RN)',
    distanceFromCervia: 'sulle colline dell’alta Valmarecchia',
    description: 'Esempio emblematico di ecoturismo emozionale e benessere. Sospesa tra i boschi montani della Romagna, questa struttura offre una totale immersione nella natura appenninica, garantendo un’esperienza purificante di distacco dal caos urbano.',
    typology: 'emozionale',
    features: ['Immersione nell’Appennino', 'Terrazza panoramica in legno', 'Colazione all’aperto', 'Stargazing professionale', 'Ecosostenibile al 100%'],
    coordinates: { lat: 43.7915, lng: 12.1554 }
  }
];
