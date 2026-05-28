import React from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Sprout, 
  Trees, 
  Bike, 
  Sparkles,
  Compass,
  ArrowRight
} from 'lucide-react';
import { Structure, Typology } from '../types';

export const getIcon = (typology: Typology, className = "w-5 h-5") => {
  switch (typology) {
    case 'territorio':
      return <MapPin className={className} />;
    case 'agriturismo':
      return <Sprout className={className} />;
    case 'rurale':
      return <Trees className={className} />;
    case 'bike':
      return <Bike className={className} />;
    case 'emozionale':
      return <Sparkles className={className} />;
    default:
      return <Compass className={className} />;
  }
};

export const getColorClass = (typology: Typology) => {
  switch (typology) {
    case 'territorio':
      return 'text-brand-600 bg-brand-50 border-brand-200 dark:text-brand-700 dark:bg-brand-50 dark:border-brand-300/40';
    case 'agriturismo':
      return 'text-brand-400 bg-brand-50 border-brand-200 dark:text-brand-600 dark:bg-brand-50 dark:border-brand-300/40';
    case 'rurale':
      return 'text-brand-700 bg-brand-50 border-brand-200 dark:text-brand-800 dark:bg-brand-50 dark:border-brand-300/40';
    case 'bike':
      return 'text-brand-400 bg-brand-50 border-brand-200 dark:text-brand-600 dark:bg-brand-50 dark:border-brand-300/40';
    case 'emozionale':
      return 'text-brand-600 bg-brand-50 border-brand-200 dark:text-brand-700 dark:bg-brand-50 dark:border-brand-300/40';
    default:
      return 'text-brand-600 bg-brand-50 border-brand-200 dark:text-brand-600 dark:bg-brand-50';
  }
};

export const getBadgeLabel = (typology: Typology) => {
  switch (typology) {
    case 'territorio':
      return 'Albergo Diffuso';
    case 'agriturismo':
      return 'Agriturismo';
    case 'rurale':
      return 'Struttura Rurale';
    case 'bike':
      return 'Bike Hotel';
    case 'emozionale':
      return 'Struttura Emozionale';
    default:
      return 'Struttura';
  }
};

interface StructureCardProps {
  structure: Structure;
  onSelect: (structure: Structure) => void;
  searchQuery: string;
}

export const StructureCard: React.FC<StructureCardProps> = ({
  structure,
  onSelect,
  searchQuery,
}) => {
  // Simple search highlighting helper
  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return <span>{text}</span>;
    const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, index) => 
          regex.test(part) ? (
            <mark key={index} className="bg-amber-100 dark:bg-amber-200 text-amber-950 dark:text-amber-950 px-0.5 rounded-sm">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, y: -10 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between bg-[#FDFBF7] dark:bg-brand-50 border border-brand-200/80 dark:border-brand-300/40 rounded-3xl p-6 shadow-xs hover:shadow-md hover:border-brand-500/30 dark:hover:border-brand-500/30 transition-all duration-300"
      id={`card-${structure.id}`}
    >
      <div>
        {/* Typology Badge */}
        <div className="flex justify-between items-start mb-4">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border ${getColorClass(structure.typology)}`}>
            {getIcon(structure.typology, "w-3.5 h-3.5")}
            {getBadgeLabel(structure.typology)}
          </span>
          <span className="text-xs font-medium text-brand-700/80 dark:text-brand-800 bg-brand-100/60 dark:bg-brand-100/70 px-2.5 py-0.5 rounded-md border border-transparent dark:border-brand-300/20">
            {structure.distanceFromCervia}
          </span>
        </div>

        {/* Structure Name */}
        <h3 className="text-lg font-bold font-display text-brand-900 dark:text-brand-950 mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-700 transition-colors duration-200">
          {highlightText(structure.name, searchQuery)}
        </h3>

        {/* Location Info */}
        <div className="flex items-center gap-1.5 text-brand-700/70 dark:text-brand-800/80 text-sm mb-4">
          <MapPin className="w-4 h-4 text-brand-500" />
          <span>{highlightText(structure.location, searchQuery)}</span>
        </div>

        {/* Short Description */}
        <p className="text-brand-800/80 dark:text-brand-850 text-xs line-clamp-3 mb-5 leading-relaxed">
          {highlightText(structure.description, searchQuery)}
        </p>

        {/* Highlights / Features pill list */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {structure.features.slice(0, 3).map((feat, idx) => (
            <span 
              key={idx}
              className="text-xs bg-brand-50 dark:bg-brand-100/50 text-brand-800 dark:text-brand-900 px-2.5 py-0.5 rounded-full border border-brand-200/30 dark:border-brand-300/20"
            >
              {feat}
            </span>
          ))}
          {structure.features.length > 3 && (
            <span className="text-xs text-brand-600 dark:text-brand-700 font-semibold px-1 py-0.5 animate-pulse">
              +{structure.features.length - 3} altro
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => onSelect(structure)}
        className="mt-auto w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-500/10 hover:bg-brand-500/20 dark:bg-brand-100 dark:hover:bg-brand-200 text-brand-700 dark:text-brand-900 text-xs font-semibold rounded-2xl transition-all duration-200 cursor-pointer"
        id={`btn-select-${structure.id}`}
      >
        <span>Scopri di più</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
};
