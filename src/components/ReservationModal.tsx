import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, PhoneCall, Check, Sparkles, AlertCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useLanguage } from '../context/LanguageContext';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDishNote?: string;
}

export default function ReservationModal({ isOpen, onClose, initialDishNote }: ReservationModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2',
    date: new Date().toISOString().split('T')[0],
    time: '19:30',
    notes: initialDishNote ? `Spécialité souhaitée : ${initialDishNote}` : '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const timeSlots = [
    '12:15', '12:30', '13:00', '13:15',
    '18:45', '19:00', '19:30', '20:00', '20:30', '21:00'
  ];

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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F8F3E9] text-[#291C17] w-full max-w-xl p-6 sm:p-8 rounded-xs shadow-2xl border border-[#291C17]/15 relative my-8"
          >
            <button
              onClick={onClose}
              type="button"
              className="absolute top-5 right-5 p-2 text-[#291C17]/60 hover:text-[#C83B28] transition-colors cursor-pointer"
              aria-label="Fermer la réservation"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div>
                <div className="mb-6">
                  <span className="text-[11px] uppercase tracking-widest text-[#C83B28] font-bold block mb-1">
                    {t('Réservation de Table · Quai Perrière', 'Table Reservation · Quai Perrière')}
                  </span>
                  <h3 className="font-display text-3xl font-bold text-[#291C17]">
                    {t('Réserver à La Felicità', 'Book at La Felicità')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#291C17]/70 font-light mt-1">
                    {t(
                      'Pour les réservations de groupe immédiates ou du jour même, vous pouvez également appeler directement le restaurant.',
                      'For same-day or large party bookings, you can also call the restaurant directly.'
                    )}
                  </p>
                </div>

                {/* Direct Call Banner */}
                <div className="mb-6 p-3.5 bg-[#C83B28]/10 border border-[#C83B28]/25 rounded-xs flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <PhoneCall className="w-4 h-4 text-[#C83B28] shrink-0" />
                    <div>
                      <span className="text-xs font-semibold text-[#291C17] block">
                        {t('Réservation par téléphone en direct', 'Instant telephone booking')}
                      </span>
                      <span className="text-[11px] text-[#291C17]/70">
                        {t('Réponse immédiate pendant les heures de service', 'Direct response during dining service')}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="px-3 py-1.5 bg-[#C83B28] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#a92c1b] transition-colors whitespace-nowrap tabular-nums"
                  >
                    {RESTAURANT_INFO.phoneDisplay}
                  </a>
                </div>

                {errorMsg && (
                  <div className="mb-4 p-3 bg-red-100 text-red-800 text-xs rounded-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#291C17]/80 mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#C83B28]" /> {t('Date', 'Date')}
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#291C17]/20 rounded-xs focus:outline-none focus:border-[#C83B28]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#291C17]/80 mb-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#C83B28]" /> {t('Heure', 'Time')}
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#291C17]/20 rounded-xs focus:outline-none focus:border-[#C83B28]"
                      >
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#291C17]/80 mb-1 flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#C83B28]" /> {t('Couverts', 'Guests')}
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#291C17]/20 rounded-xs focus:outline-none focus:border-[#C83B28]"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((num) => (
                          <option key={String(num)} value={String(num)}>
                            {num} {Number(num) === 1 ? t('personne', 'guest') : t('personnes', 'guests')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#291C17]/80 mb-1">
                        {t('Nom complet *', 'Full name *')}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Marco Rossi"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#291C17]/20 rounded-xs focus:outline-none focus:border-[#C83B28]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#291C17]/80 mb-1">
                        {t('Téléphone *', 'Phone number *')}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="06 12 34 56 78"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#291C17]/20 rounded-xs focus:outline-none focus:border-[#C83B28]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#291C17]/80 mb-1">
                      {t('Email (facultatif)', 'Email (optional)')}
                    </label>
                    <input
                      type="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#291C17]/20 rounded-xs focus:outline-none focus:border-[#C83B28]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#291C17]/80 mb-1">
                      {t('Demande particulière ou intolérances (facultatif)', 'Special requests or dietary notes (optional)')}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={t('Anniversaire, table au calme, sans gluten...', 'Birthday celebration, quiet table, gluten-free...')}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#291C17]/20 rounded-xs focus:outline-none focus:border-[#C83B28] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 text-xs uppercase tracking-widest font-semibold text-[#F8F3E9] bg-[#C83B28] hover:bg-[#a92c1b] rounded-xs transition-colors shadow-md cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? t('Confirmation en cours...', 'Submitting request...') : t('Confirmer la Demande de Table', 'Confirm Table Request')}
                    </button>
                    <p className="text-[11px] text-center text-[#291C17]/60 mt-2">
                      {t('La Felicità vous contacte par SMS ou appel pour confirmer votre table.', 'Our team will contact you to confirm your table.')}
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 bg-[#343A25] text-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <Check className="w-7 h-7" />
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C83B28] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('Demande Enregistrée', 'Request Received')}</span>
                </div>
                <h3 className="font-display text-3xl font-bold text-[#291C17]">
                  Grazie Mille, {formData.name} !
                </h3>
                <p className="text-sm text-[#291C17]/80 font-light max-w-md mx-auto leading-relaxed">
                  {t(
                    `Votre demande pour ${formData.guests} couverts le ${formData.date} à ${formData.time} a bien été transmise à l'équipe de La Felicità.`,
                    `Your request for ${formData.guests} guests on ${formData.date} at ${formData.time} has been received by La Felicità.`
                  )}
                </p>

                <div className="p-4 bg-white rounded-xs border border-[#291C17]/10 text-xs text-left max-w-md mx-auto space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#291C17]/60">{t('Restaurant :', 'Restaurant:')}</span>
                    <span className="font-semibold">La Felicità Grenoble</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#291C17]/60">{t('Adresse :', 'Address:')}</span>
                    <span>34 Quai Perrière, 38000 Grenoble</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#291C17]/60">{t('Téléphone :', 'Phone:')}</span>
                    <span className="font-semibold tabular-nums">{RESTAURANT_INFO.phoneDisplay}</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={handleReset}
                    type="button"
                    className="px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#F8F3E9] bg-[#291C17] hover:bg-[#3d2b24] rounded-xs cursor-pointer transition-colors"
                  >
                    {t('Retour au site', 'Return to Website')}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
