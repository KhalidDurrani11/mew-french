import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Calendar,
  Clock,
  Users,
  PhoneCall,
  Check,
  Sparkles,
  AlertCircle,
  MapPin,
  Flame,
  Sun,
  Moon,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { RESTAURANT_INFO, IMAGES } from '../data/restaurantData';
import { useLanguage } from '../context/LanguageContext';
import ImageWithFallback from './ImageWithFallback';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDishNote?: string;
}

export default function ReservationModal({ isOpen, onClose, initialDishNote }: ReservationModalProps) {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2',
    date: new Date().toISOString().split('T')[0],
    time: '19:30',
    area: 'indifferent',
    notes: initialDishNote ? `Spécialité souhaitée : ${initialDishNote}` : '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const lunchSlots = ['12:15', '12:30', '13:00', '13:15'];
  const dinnerSlots = ['18:45', '19:00', '19:30', '20:00', '20:30', '21:00'];
  const guestOptions = ['1', '2', '3', '4', '5', '6', '7', '8+'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg(t('Veuillez renseigner votre nom et votre numéro de téléphone.', 'Please enter your name and phone number.'));
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FAF6F0] text-[#1A1412] w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#1A1412]/15 relative my-auto max-h-[94vh] flex flex-col overflow-hidden"
          >
            {/* ── Visual Header Banner ── */}
            <div className="relative h-28 sm:h-36 bg-[#1A1412] text-white p-5 sm:p-7 shrink-0 overflow-hidden flex flex-col justify-end">
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <ImageWithFallback
                  src={IMAGES.restaurantInterior}
                  fallbackSrc={IMAGES.fallbacks.restaurantInterior}
                  alt="La Felicità Grenoble"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412] via-[#1A1412]/80 to-transparent pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                type="button"
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-[#C83B28] text-white transition-all cursor-pointer z-20 backdrop-blur-xs"
                aria-label="Fermer la réservation"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header Titles */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C83B28]/80 text-white text-[10px] font-bold uppercase tracking-widest mb-1.5 shadow-sm">
                  <Flame className="w-3 h-3" />
                  <span>34 Quai Perrière · Grenoble</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                  {t('Réserver Votre Table', 'Reserve Your Table')}
                </h3>
              </div>
            </div>

            {/* ── Modal Scrollable Body ── */}
            <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
              {!isSubmitted ? (
                <div>
                  {/* Direct Call Quick Banner */}
                  <div className="p-3.5 bg-gradient-to-r from-[#C83B28]/10 via-[#C83B28]/5 to-transparent border border-[#C83B28]/25 rounded-xl flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#C83B28] text-white flex items-center justify-center shrink-0 shadow-sm">
                        <PhoneCall className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-[#1A1412] block truncate">
                          {t('Réservation immédiate par téléphone ?', 'Need an immediate table?')}
                        </span>
                        <span className="text-[11px] text-[#1A1412]/65 block truncate">
                          {t('Confirmation en direct avec notre équipe', 'Instant confirmation by call')}
                        </span>
                      </div>
                    </div>
                    <a
                      href={`tel:${RESTAURANT_INFO.phone}`}
                      className="px-3.5 py-1.5 bg-[#C83B28] hover:bg-[#b53220] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shrink-0 tabular-nums shadow-sm hover:scale-105 active:scale-95"
                    >
                      {RESTAURANT_INFO.phoneDisplay}
                    </a>
                  </div>

                  {errorMsg && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-800 text-xs rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* 1. Guests Selector (Interactive Pills) */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold text-[#1A1412] mb-2 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#C83B28]" />
                        <span>{t('Nombre de Couverts', 'Number of Guests')}</span>
                      </label>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                        {guestOptions.map((opt) => {
                          const isSelected = formData.guests === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setFormData({ ...formData, guests: opt })}
                              className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#C83B28] text-white border-[#C83B28] shadow-md shadow-[#C83B28]/25 scale-105'
                                  : 'bg-white text-[#1A1412] border-[#1A1412]/15 hover:border-[#1A1412]/30'
                              }`}
                            >
                              {opt} {opt === '8+' ? '' : 'pers.'}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 2. Date Selection */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold text-[#1A1412] mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#C83B28]" />
                        <span>{t('Date de la venue', 'Reservation Date')}</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs font-medium bg-white border border-[#1A1412]/15 rounded-xl focus:outline-none focus:border-[#C83B28] focus:ring-2 focus:ring-[#C83B28]/15 transition-all shadow-xs"
                      />
                    </div>

                    {/* 3. Time Slots (Midi & Soir interactive buttons) */}
                    <div className="space-y-2.5">
                      <label className="block text-xs uppercase tracking-wider font-bold text-[#1A1412] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#C83B28]" />
                        <span>{t('Heure du Service', 'Dining Service Time')}</span>
                      </label>

                      {/* Lunch slots */}
                      <div className="p-3 bg-white/70 rounded-xl border border-[#1A1412]/10 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1A1412]/70 uppercase tracking-wider">
                          <Sun className="w-3.5 h-3.5 text-amber-500" />
                          <span>{t('Service du Midi', 'Lunch Service')}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {lunchSlots.map((slot) => {
                            const isSelected = formData.time === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setFormData({ ...formData, time: slot })}
                                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#C83B28] text-white border-[#C83B28] shadow-sm scale-105'
                                    : 'bg-white text-[#1A1412]/80 border-[#1A1412]/12 hover:border-[#C83B28]/40'
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Dinner slots */}
                      <div className="p-3 bg-white/70 rounded-xl border border-[#1A1412]/10 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1A1412]/70 uppercase tracking-wider">
                          <Moon className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{t('Service du Soir', 'Dinner Service')}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {dinnerSlots.map((slot) => {
                            const isSelected = formData.time === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setFormData({ ...formData, time: slot })}
                                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#C83B28] text-white border-[#C83B28] shadow-sm scale-105'
                                    : 'bg-white text-[#1A1412]/80 border-[#1A1412]/12 hover:border-[#C83B28]/40'
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* 4. Preferred Seating Area */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold text-[#1A1412] mb-1.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C83B28]" />
                        <span>{t('Préférence de Table', 'Seating Preference')}</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'indifferent', label: t('Indifférent', 'Any Table') },
                          { id: 'terrasse', label: t('Terrasse Isère', 'River Terrace') },
                          { id: 'interieur', label: t('Près du Four', 'Near Hearth') },
                        ].map((area) => {
                          const isSelected = formData.area === area.id;
                          return (
                            <button
                              key={area.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, area: area.id })}
                              className={`py-2 px-2 text-center text-xs font-semibold rounded-xl border transition-all cursor-pointer truncate ${
                                isSelected
                                  ? 'bg-[#1A1412] text-white border-[#1A1412] shadow-sm'
                                  : 'bg-white text-[#1A1412]/75 border-[#1A1412]/12 hover:border-[#1A1412]/30'
                              }`}
                            >
                              {area.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 5. Contact Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1412]/80 mb-1">
                          {t('Nom complet *', 'Full Name *')}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Marco Rossi"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#1A1412]/15 rounded-xl focus:outline-none focus:border-[#C83B28] focus:ring-2 focus:ring-[#C83B28]/15 shadow-xs transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1412]/80 mb-1">
                          {t('Téléphone de confirmation *', 'Mobile Phone *')}
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="06 12 34 56 78"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#1A1412]/15 rounded-xl focus:outline-none focus:border-[#C83B28] focus:ring-2 focus:ring-[#C83B28]/15 shadow-xs transition-all"
                        />
                      </div>
                    </div>

                    {/* 6. Email (Optional) */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1412]/80 mb-1">
                        {t('Email (facultatif pour confirmation écrite)', 'Email (optional)')}
                      </label>
                      <input
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#1A1412]/15 rounded-xl focus:outline-none focus:border-[#C83B28] focus:ring-2 focus:ring-[#C83B28]/15 shadow-xs transition-all"
                      />
                    </div>

                    {/* 7. Special Requests */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1412]/80 mb-1">
                        {t('Demandes particulières ou intolérances (facultatif)', 'Dietary notes or special celebration (optional)')}
                      </label>
                      <textarea
                        rows={2}
                        placeholder={t('Anniversaire, table au calme, sans gluten, plat spécifique...', 'Birthday, quiet corner, gluten-free, requested dish...')}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-white border border-[#1A1412]/15 rounded-xl focus:outline-none focus:border-[#C83B28] focus:ring-2 focus:ring-[#C83B28]/15 shadow-xs resize-none transition-all"
                      />
                    </div>

                    {/* Submit CTA */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 text-xs uppercase tracking-[0.2em] font-bold text-white bg-[#C83B28] hover:bg-[#b53220] rounded-full shadow-lg shadow-[#C83B28]/25 hover:shadow-xl transition-all cursor-pointer disabled:opacity-50 active:scale-98 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>{t('Transmission en cours...', 'Submitting request...')}</span>
                          </>
                        ) : (
                          <>
                            <span>{t('Confirmer ma Demande de Table', 'Confirm Table Request')}</span>
                            <ChevronRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                      <p className="text-[11px] text-center text-[#1A1412]/55 mt-2.5">
                        {t('Notre équipe vous contacte par SMS ou appel pour valider définitivement.', 'Our team will contact you to confirm availability.')}
                      </p>
                    </div>
                  </form>
                </div>
              ) : (
                /* ── High-Emotion Success Screen ── */
                <div className="text-center py-6 sm:py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-xl shadow-emerald-600/30">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C83B28] font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t('Demande Enregistrée avec Succès', 'Booking Request Received')}</span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1412]">
                    Grazie Mille, {formData.name} !
                  </h3>

                  <p className="text-xs sm:text-sm text-[#1A1412]/75 font-light max-w-md mx-auto leading-relaxed">
                    {t(
                      `Votre demande de table pour ${formData.guests} ${Number(formData.guests) === 1 ? 'couvert' : 'couverts'} le ${formData.date} à ${formData.time} a bien été enregistrée à La Felicità Grenoble.`,
                      `Your table request for ${formData.guests} ${Number(formData.guests) === 1 ? 'guest' : 'guests'} on ${formData.date} at ${formData.time} has been received by La Felicità.`
                    )}
                  </p>

                  {/* Summary Card */}
                  <div className="p-5 bg-white rounded-2xl border border-[#1A1412]/10 text-xs text-left max-w-md mx-auto space-y-2 shadow-sm">
                    <div className="flex justify-between items-center pb-2 border-b border-[#1A1412]/8">
                      <span className="text-[#1A1412]/60">{t('Restaurant', 'Restaurant')}</span>
                      <span className="font-bold text-[#1A1412]">La Felicità Grenoble</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-[#1A1412]/8">
                      <span className="text-[#1A1412]/60">{t('Date & Heure', 'Date & Time')}</span>
                      <span className="font-mono font-bold text-[#C83B28]">{formData.date} · {formData.time}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-[#1A1412]/8">
                      <span className="text-[#1A1412]/60">{t('Couverts', 'Guests')}</span>
                      <span className="font-semibold">{formData.guests} {t('personnes', 'guests')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#1A1412]/60">{t('Adresse', 'Address')}</span>
                      <span className="text-right">34 Quai Perrière, 38000 Grenoble</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleReset}
                      type="button"
                      className="w-full sm:w-auto px-8 py-3 text-xs uppercase tracking-wider font-bold text-white bg-[#1A1412] hover:bg-[#33221b] rounded-full cursor-pointer transition-colors shadow-md"
                    >
                      {t('Retour au Site', 'Back to Website')}
                    </button>
                    <a
                      href={RESTAURANT_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 text-xs uppercase tracking-wider font-bold text-[#1A1412] bg-white border border-[#1A1412]/15 hover:border-[#C83B28] rounded-full transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#C83B28]" />
                      <span>{t('Itinéraire GPS', 'Directions')}</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
