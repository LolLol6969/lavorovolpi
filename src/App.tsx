import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Sprout, 
  Trees, 
  Bike, 
  Sparkles, 
  Sun, 
  Moon, 
  Info, 
  Compass, 
  Layers, 
  CheckCircle, 
  Map, 
  ChevronRight,
  BookOpen,
  Filter,
  X,
  Maximize2,
  CalendarCheck,
  Building,
  Undo2
} from 'lucide-react';
import { STRUCTURES, TYPOLOGIES } from './data';
import { Structure, Typology } from './types';
import { StructureCard, getIcon, getColorClass, getBadgeLabel } from './components/StructureCard';
import { BookingForm } from './components/BookingForm';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Typology | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [selectedStructure, setSelectedStructure] = useState<Structure | null>(null);
  const [activeBooking, setActiveBooking] = useState<boolean>(false);

  // Initialize and auto-select system dark-theme preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  // Update document body with dark class for custom Tailwind compatibility
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Set the first structure as default selected on large displays so the detail panel isn't blank
  useEffect(() => {
    if (STRUCTURES.length > 0 && !selectedStructure) {
      setSelectedStructure(STRUCTURES[0]);
    }
  }, []);

  // Filter logic
  const filteredStructures = STRUCTURES.filter((structure) => {
    const matchesCategory = selectedCategory === 'all' || structure.typology === selectedCategory;
    const cleanQuery = searchQuery.toLowerCase().trim();
    if (!cleanQuery) return matchesCategory;

    const matchesName = structure.name.toLowerCase().includes(cleanQuery);
    const matchesLocation = structure.location.toLowerCase().includes(cleanQuery);
    const matchesDescription = structure.description.toLowerCase().includes(cleanQuery);
    const matchesFeatures = structure.features.some(feat => feat.toLowerCase().includes(cleanQuery));

    return matchesCategory && (matchesName || matchesLocation || matchesDescription || matchesFeatures);
  });

  // Categories helper to display counts dynamically
  const getCategoryCount = (typologyId: Typology | 'all') => {
    if (typologyId === 'all') return STRUCTURES.length;
    return STRUCTURES.filter(s => s.typology === typologyId).length;
  };

  // Extract a suitable manual note or legal background reference based on typology
  const getTheoreticalInsight = (typology: Typology) => {
    switch (typology) {
      case 'territorio':
        return {
          title: "Inquadramento Albergo Diffuso",
          norm: "Legge Regionale per la Valorizzazione dei Borghi",
          text: "Rappresenta una formula in grado di rivitalizzare aree interne senza generare nuova volumetria stradale o edilizia. Sfrutta immobili storici preesistenti distanti massimo 200 metri dalla reception centrale e dalla sala colazione."
        };
      case 'agriturismo':
        return {
          title: "Modello Imprenditoriale Agricolo",
          norm: "Art. 2135 del Codice Civile Italiano",
          text: "Definisce l'agriturismo come attività connessa all'imprenditore agricolo. L'accoglienza e la somministrazione devono rimanere in rapporto di complementarità rispetto alla coltivazione del fondo e all'allevamento."
        };
      case 'rurale':
        return {
          title: "Struttura Ricettiva Rurale",
          norm: "Strategia Nazionale per lo Sviluppo Sostenibile",
          text: "Focus sul restauro e sulla tutela ecologica dei complessi storici campestri. Questi alloggi fungono da punto di salvaguardia naturalistica promuovendo attività non invasive come birdwatching ed escursionismo a piedi."
        };
      case 'bike':
        return {
          title: "Modello Cicloturistico (Bike friendly)",
          norm: "Linee Guida Nazionali per la Mobilità Dolce",
          text: "Prevede la dotazione obbligatoria di officine tecniche dedicate, sistemi di sicurezza hi-tech per le bici, lavanderie rapide per abbigliamento sportivo e menù sani ad alto apporto glucidico tarati sulle tappe locali."
        };
      case 'emozionale':
        return {
          title: "Glamping ed Alloggi Emozionali",
          norm: "Frontiera del Nuovo Ecoturismo Esperienziale",
          text: "L'alloggio (es. Bubble room trasparente) non è un semplice pernottamento ma l'evento clou del viaggio. Integrazione minima con l'ambiente, strutture amovibili e enfasi assoluta sullo stargazing e sul benessere psicofisico."
        };
      default:
        return {
          title: "Modello Ricettivo",
          norm: "Codice del Turismo",
          text: "Modelli normati per promuovere la sostenibilità locale e diversificare l'offerta turistica territoriale romagnola."
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] bg-gradient-to-br from-[#FAF6F0] via-[#FCF9F2] to-[#F3EAE1] dark:from-[#EADBC8] dark:to-[#FAF6F0] text-[#2C1E14] dark:text-[#3C2A20] transition-colors duration-300 flex flex-col antialiased">
      
      {/* 1. Header Section */}
      <header className="sticky top-0 z-30 bg-transparent transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center">
            
            {/* Quick Search */}
            <div className="relative w-full max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-600">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Cerca nome, località, servizi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-white/40 dark:bg-brand-100/25 backdrop-blur-md border border-brand-200/50 dark:border-brand-300/35 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 rounded-full focus:outline-none dark:text-brand-900 text-brand-900 placeholder-brand-600/60 shadow-xs transition-all duration-200"
                id="search-bar"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-brand-600 hover:text-brand-850 dark:hover:text-brand-950"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* 2. Main Layout Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6 relative overflow-visible">
        
        {/* Left Side: Filter Tabs & Structure List */}
        <section className="flex-1 flex flex-col gap-6" id="left-structures-panel">
          
          {/* Welcome Intro for theoretical context */}
          <div className="bg-[#FDFBF7] dark:bg-brand-100/40 p-6 rounded-3xl border border-brand-200/50 dark:border-brand-300/30 shadow-xs">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold text-brand-600 dark:text-brand-700 uppercase tracking-widest bg-brand-50 dark:bg-brand-100 px-2.5 py-0.5 rounded-md border border-brand-200/40 dark:border-brand-300/30">
                Libro di Testo Integrato
              </span>
              <h2 className="text-base sm:text-lg font-bold font-display text-brand-900 dark:text-brand-950 mt-1.5">
                Modelli di Ospitalità nella Riviera e nel Forlivese
              </h2>
              <p className="text-xs text-brand-800/80 dark:text-brand-800/90 mt-1 leading-relaxed">
                Strutture reali vicino a Cervia classificate secondo le tipologie commerciali e del Codice Civile. Esplora le caratteristiche salienti ed i quadri teorici di riferimento.
              </p>
            </div>
          </div>

          {/* Minimalist Tabbed Filter Navigation for Typologies with intuitive icons */}
          <div className="w-full overflow-x-auto pb-1 scrollbar-none" id="category-filter-nav">
            <div className="flex gap-2 min-w-max">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl border transition-all duration-200 cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-brand-600 text-white border-brand-600 dark:bg-brand-700 dark:text-white dark:border-brand-700'
                    : 'bg-[#FDFBF7] dark:bg-brand-100/40 text-brand-700 dark:text-brand-900 border-brand-200/80 dark:border-brand-300/40 hover:bg-brand-100/50 dark:hover:bg-brand-100'
                }`}
                id="filter-all"
              >
                <Layers className="w-4 h-4" />
                <span>Tutti i Modelli</span>
                <span className={`ml-1 px-1.5 py-0.5 text-[10px] rounded-md ${selectedCategory === 'all' ? 'bg-brand-700 text-white' : 'bg-brand-100 text-brand-700 dark:bg-brand-200/50 dark:text-brand-800'}`}>
                  {getCategoryCount('all')}
                </span>
              </button>

              {TYPOLOGIES.map((typ) => {
                const isActive = selectedCategory === typ.id;
                return (
                  <button
                    key={typ.id}
                    onClick={() => setSelectedCategory(typ.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-brand-600 text-white border-brand-600 dark:bg-brand-700 dark:text-white dark:border-brand-700'
                        : 'bg-[#FDFBF7] dark:bg-brand-100/40 text-brand-700 dark:text-brand-900 border-brand-200/80 dark:border-brand-300/40 hover:bg-brand-100/50 dark:hover:bg-brand-100'
                    }`}
                    id={`filter-${typ.id}`}
                  >
                    {getIcon(typ.id, "w-4 h-4")}
                    <span>{typ.subtitle}</span>
                    <span className={`ml-1 px-1.5 py-0.5 text-[10px] rounded-md ${isActive ? 'bg-brand-700 text-white border border-transparent' : 'bg-brand-100 text-brand-700 dark:bg-brand-200/50 dark:text-brand-800'}`}>
                      {getCategoryCount(typ.id)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Structures List Grid */}
          <div>
            {filteredStructures.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredStructures.map((struct) => (
                    <StructureCard
                      key={struct.id}
                      structure={struct}
                      searchQuery={searchQuery}
                      onSelect={(s) => {
                        setSelectedStructure(s);
                        setActiveBooking(false); // Reset booking inquiry when changing selected
                        // Scroll to side panel on smaller screens
                        const sidePanel = document.getElementById('details-explorer-panel');
                        if (sidePanel) {
                          sidePanel.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#FDFBF7] dark:bg-brand-50 border border-brand-200/80 dark:border-brand-300/40 text-center p-12 rounded-3xl flex flex-col items-center justify-center space-y-4"
              >
                <div className="p-4 rounded-full bg-brand-50 dark:bg-brand-100/50 text-brand-505">
                  <Search className="w-8 h-8 text-brand-500" />
                </div>
                <div>
                  <h3 className="text-brand-900 dark:text-brand-950 font-bold font-display text-lg">Nessun modello trovato</h3>
                  <p className="text-brand-700/85 dark:text-brand-800/80 text-xs mt-1 max-w-sm">
                    Prova a modificare i termini di ricerca o seleziona un'altra categoria di modelli dalla barra superiore.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-4 py-2 text-xs font-semibold bg-brand-600 dark:bg-brand-700 dark:hover:bg-brand-850 hover:bg-brand-700 text-white rounded-lg transition-colors cursor-pointer"
                >
                  Azzera filtri
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Right Side: Detailed Focus Screen Interface */}
        <aside 
          className="w-full lg:w-[420px] lg:shrink-0"
          id="details-explorer-panel"
        >
          <div className="sticky top-24 bg-[#FDFBF7] dark:bg-brand-50 rounded-3xl border border-brand-200/80 dark:border-brand-300/40 shadow-xs p-6 overflow-hidden transition-all duration-300">
            <AnimatePresence mode="wait">
              {selectedStructure ? (
                <motion.div
                  key={selectedStructure.id}
                  initial={{ opacity: 0, x: 15, y: 5 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -15, y: -5 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  
                  {/* Detailed Card Top Info */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 text-[11px] font-bold rounded-lg border ${getColorClass(selectedStructure.typology)}`}>
                        {getIcon(selectedStructure.typology, "w-3 h-3")}
                        {getBadgeLabel(selectedStructure.typology)}
                      </span>
                      <span className="text-xs text-brand-600 dark:text-brand-700 font-semibold uppercase tracking-wider flex items-center gap-1.5 bg-brand-50 dark:bg-brand-100 px-2 py-0.5 rounded-md border border-brand-200/40 dark:border-brand-300/30">
                        <MapPin className="w-3.5 h-3.5" />
                        Romagna
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold font-display text-brand-900 dark:text-brand-950 leading-tight">
                      {selectedStructure.name}
                    </h2>
                    
                    <p className="text-xs text-brand-700/80 dark:text-brand-800/80 mt-1">
                      {selectedStructure.location} &middot; <span className="font-semibold text-brand-600 dark:text-brand-700">{selectedStructure.distanceFromCervia}</span>
                    </p>
                  </div>

                  {/* Complete Description */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-brand-600 dark:text-brand-700 uppercase tracking-widest">
                      Descrizione del Caso Reale
                    </h4>
                    <p className="text-sm text-brand-850 dark:text-brand-900 leading-relaxed bg-brand-50/50 dark:bg-brand-100/30 p-3.5 rounded-2xl border border-brand-200/50 dark:border-brand-300/30">
                      {selectedStructure.description}
                    </p>
                  </div>

                  {/* Interactive Booking Trigger or Form rendering */}
                  <div className="border-t border-brand-200/60 dark:border-brand-300/40 pt-5 space-y-4">
                    {!activeBooking ? (
                      <div className="space-y-4">
                        
                        {/* Highlights list */}
                        <div className="space-y-2.5">
                          <h4 className="text-xs font-bold text-brand-600 dark:text-brand-700 uppercase tracking-widest flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5 text-brand-500" />
                            Servizi ed Elementi Chiave
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            {selectedStructure.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-brand-800 dark:text-brand-900">
                                <span className="p-0.5 rounded-full bg-brand-50 dark:bg-brand-100 text-brand-700 dark:text-brand-800 mt-0.5 border border-transparent dark:border-brand-300/20">
                                  <ChevronRight className="w-3 h-3" />
                                </span>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Legal Theoretical Section block */}
                        {(() => {
                          const theoreticalData = getTheoreticalInsight(selectedStructure.typology);
                          return (
                            <div className="bg-brand-50/40 dark:bg-brand-100/30 border border-brand-200/50 dark:border-brand-300/30 p-4 rounded-2xl space-y-2">
                              <div className="flex items-center gap-2 text-brand-800 dark:text-brand-850">
                                <BookOpen className="w-4 h-4 shrink-0" />
                                <span className="text-xs font-bold font-display uppercase tracking-wider">{theoreticalData.title}</span>
                              </div>
                              <p className="text-[11px] font-semibold text-brand-600 dark:text-brand-700 bg-brand-100 dark:bg-brand-100/50 px-2 py-0.5 rounded inline-block border border-transparent dark:border-brand-300/20">
                                Riferimento: {theoreticalData.norm}
                              </p>
                              <p className="text-xs text-brand-800/90 dark:text-brand-900 leading-relaxed font-light">
                                {theoreticalData.text}
                              </p>
                            </div>
                          );
                        })()}

                        {/* Contact inquiry button */}
                        <button
                          onClick={() => setActiveBooking(true)}
                          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-600 hover:bg-brand-700 dark:bg-brand-700 dark:hover:bg-brand-800 text-white font-semibold text-sm rounded-2xl transition-all duration-200 cursor-pointer shadow-md shadow-brand-500/10 hover:shadow-brand-500/25"
                          id="btn-open-booking"
                        >
                          <CalendarCheck className="w-4 h-4" />
                          <span>Richiedi Soggiorno o Info</span>
                        </button>
                      </div>
                    ) : (
                      <BookingForm 
                        structure={selectedStructure} 
                        onClose={() => setActiveBooking(false)} 
                      />
                    )}
                  </div>

                </motion.div>
              ) : (
                <div className="text-center py-12 text-brand-650 dark:text-brand-400 flex flex-col items-center justify-center space-y-3">
                  <Building className="w-12 h-12 stroke-1 text-brand-400/80 dark:text-brand-700" />
                  <p className="text-xs max-w-xs leading-relaxed">
                    Seleziona una delle strutture ricettive a sinistra per esaminare la relativa scheda teorica e richiedere informazioni.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </aside>

      </main>

      {/* 3. Footer Section */}
      <footer className="mt-auto bg-[#FAF6F0] dark:bg-[#EADBC8]/40 border-t border-brand-200/50 dark:border-brand-300/30 py-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-850 dark:text-brand-900">
          <div>
            <p className="font-semibold text-brand-850 dark:text-brand-900">
              Cervia & Romagna Sostenibile &middot; Modelli Teorici di Ricettività
            </p>
            <p className="mt-1">
              Esame accademico delle tesi di valorizzazione dei centri storici, agriturismi Km 0, bike hospitality e alloggi emozionali.
            </p>
          </div>
          

        </div>
      </footer>

    </div>
  );
}
