import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  User, 
  Mail, 
  Send, 
  CheckCircle, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Structure } from '../types';

interface BookingFormProps {
  structure: Structure;
  onClose: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ structure, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    notes: '',
    guests: '2',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="bg-brand-50/90 dark:bg-brand-50 p-5 rounded-3xl border border-brand-200/80 dark:border-brand-300/30 shadow-xs">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0, scale: 0.97, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -5 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit} 
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-brand-500 dark:text-brand-600 animate-pulse" />
              <h4 className="font-bold font-display text-brand-900 dark:text-brand-950 text-base">
                Richiedi Informazioni o Soggiorno
              </h4>
            </div>
            
            <p className="text-xs text-brand-800/80 dark:text-brand-800 leading-relaxed mb-4">
              Invia una richiesta simulata per <span className="font-semibold text-brand-700 dark:text-brand-800">{structure.name}</span>. Riceverai una conferma immediata.
            </p>

            {/* Name Input */}
            <div>
              <label className="block text-xs font-semibold text-brand-850 dark:text-brand-800 mb-1.5">
                Nome e Cognome
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="es. Mario Rossi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-brand-50/40 dark:bg-brand-100/30 border border-brand-200 dark:border-brand-300/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:text-brand-950 text-brand-900 transition-all duration-200"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold text-brand-850 dark:text-brand-800 mb-1.5">
                Indirizzo Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  placeholder="es. mario@example.it"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-brand-50/40 dark:bg-brand-100/30 border border-brand-200 dark:border-brand-300/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:text-brand-950 text-brand-900 transition-all duration-200"
                />
              </div>
            </div>

            {/* Row: Date & Guests */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-brand-850 dark:text-brand-800 mb-1.5">
                  Data Prevista
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-400">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-brand-50/40 dark:bg-brand-100/30 border border-brand-200 dark:border-brand-300/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:text-brand-950 text-brand-900 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-850 dark:text-brand-800 mb-1.5">
                  Numero Ospiti
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-brand-50/45 dark:bg-brand-100/80 border border-brand-200 dark:border-brand-300/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:text-brand-950 text-brand-900 transition-all duration-200"
                >
                  <option value="1">1 Ospite</option>
                  <option value="2">2 Ospiti</option>
                  <option value="3">3 Ospiti</option>
                  <option value="4">4 Ospiti</option>
                  <option value="5+">5+ Ospiti</option>
                </select>
              </div>
            </div>

            {/* Custom Notes */}
            <div>
              <label className="block text-xs font-semibold text-brand-850 dark:text-brand-800 mb-1.5">
                Note o Richieste Particolari
              </label>
              <div className="relative">
                <span className="absolute top-3 left-3.5 text-brand-400">
                  <MessageSquare className="w-4 h-4" />
                </span>
                <textarea
                  placeholder="Es. necessito di noleggio e-bike, colazione vegana, etc."
                  value={formData.notes}
                  rows={2}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-brand-50/40 dark:bg-brand-100/30 border border-brand-200 dark:border-brand-300/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:text-brand-950 text-brand-900 transition-all duration-200"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 px-4 py-2.5 text-brand-700 dark:text-brand-700 hover:text-brand-900 dark:hover:text-[#2C1E14] text-xs font-semibold rounded-2xl border border-brand-200 dark:border-brand-300/30 hover:bg-brand-100 dark:hover:bg-brand-100/40 transition-all duration-200 cursor-pointer"
              >
                Annulla
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-2/3 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 dark:bg-brand-600 dark:hover:bg-brand-700 dark:text-white text-xs font-semibold rounded-2xl shadow-md cursor-pointer disabled:opacity-50 transition-all duration-200"
              >
                {isSubmitting ? (
                  <span className="border-2 border-white/30 border-t-white w-4 h-4 rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Invia Richiesta</span>
                  </>
                )}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-center py-6 px-4 space-y-4"
          >
            <div className="mx-auto w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-100 flex items-center justify-center text-brand-600 dark:text-brand-700 border border-transparent dark:border-brand-300/30">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold font-display text-brand-900 dark:text-brand-950 text-lg">
                Richiesta Ricevuta!
              </h4>
              <p className="text-brand-800/80 dark:text-brand-800 text-xs mt-1 leading-relaxed">
                Grazie <span className="font-semibold text-brand-900 dark:text-brand-900">{formData.name}</span>! La tua richiesta per {structure.name} (per il giorno {formData.date}) è stata registrata con successo nel sistema locale.
              </p>
            </div>
            
            <div className="bg-brand-100/50 dark:bg-brand-100/50 p-3 rounded-xl border border-brand-200 dark:border-brand-300/30 text-left text-xs text-brand-800 dark:text-brand-850">
              <span className="font-bold">Riepilogo temporaneo:</span>
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px]">
                <li>Ospiti: {formData.guests}</li>
                {formData.notes && <li>Note: &ldquo;{formData.notes}&rdquo;</li>}
              </ul>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', date: '', notes: '', guests: '2' });
              }}
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 dark:bg-brand-600 dark:text-white text-white text-xs font-semibold rounded-xl transition-colors duration-200 cursor-pointer"
            >
              Invia un'altra richiesta
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
