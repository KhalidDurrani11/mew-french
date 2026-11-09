import { useState } from 'react';
import { motion } from 'motion/react';
import {
  PhoneCall, MapPin, Clock, Calendar,
  Navigation as NavIcon, ExternalLink, Flame,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useLanguage } from '../context/LanguageContext';

interface ReservationSectionProps {
  onOpenReservation: () => void;
}

function isClosed(str: string) {
  return ['fermé', 'ferme', 'closed'].some((k) => str.toLowerCase().includes(k));
}

export default function ReservationSection({ onOpenReservation }: ReservationSectionProps) {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#1F1714] text-[#F8F3E9] relative overflow-hidden border-t border-[#F8F3E9]/10">
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#C83B28]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C83B28]/20 text-[#F8F3E9] text-xs font-semibold uppercase tracking-widest mb-4 border border-[#C83B28]/30">
            <Calendar className="w-3.5 h-3.5 text-[#C83B28]" />
            <span>{t('Réservations & Accès', 'Bookings & Location')}</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8F3E9] leading-tight">
            {t('Votre table vous attend.', 'Your table awaits.')}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#F8F3E9]/75 font-light leading-relaxed">
            {t(
              "Pour un dîner en terrasse au bord de l'Isère — réservez en ligne ou appelez-nous.",
              'For a riverside terrace dinner or an intimate evening — reserve online or call directly.'
            )}
          </p>

          {/* Flame divider */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-[#C83B28]/40" />
            <Flame className="w-5 h-5 text-[#C83B28]" />
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-[#C83B28]/40" />
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenReservation}
              type="button"
              className="w-full sm:w-auto px-10 py-4 text-xs uppercase tracking-[0.2em] font-bold text-white bg-[#C83B28] hover:bg-[#e04530] rounded-full shadow-xl hover:shadow-[#C83B28]/30 hover:scale-105 transition-all duration-300 cursor-pointer active:scale-95"
            >
              {t('Réserver une Table', 'Reserve Your Table')}
            </button>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold text-[#F8F3E9] bg-white/10 hover:bg-white/15 border border-[#F8F3E9]/20 hover:border-[#C83B28] rounded-full shadow-sm hover:shadow-md transition-all duration-300 tabular-nums cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#C83B28]" />
              <span>{RESTAURANT_INFO.phoneDisplay}</span>
            </a>
          </div>
        </motion.div>

        {/* ── Big Phone Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 p-6 sm:p-8 rounded-2xl bg-[#160E0B] border border-[#F8F3E9]/15 text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xl"
        >
          <div className="text-center sm:text-left">
            <p className="text-xs uppercase tracking-widest text-[#C83B28] font-bold mb-1">
              {t('Réservation Directe', 'Direct Reservation')}
            </p>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="font-display text-3xl sm:text-4xl font-bold text-white hover:text-[#C83B28] transition-colors tracking-tight tabular-nums"
            >
              {RESTAURANT_INFO.phoneDisplay}
            </a>
          </div>
          <div className="hidden sm:block h-12 w-px bg-white/15" />
          <p className="text-sm text-white/70 font-light text-center sm:text-left max-w-xs">
            {t(
              'Notre équipe vous accueille du Lundi au Dimanche pour toute demande.',
              'Our team is available Monday through Sunday for bookings and special requests.'
            )}
          </p>
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[#C83B28] hover:bg-[#e04530] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{t('Appeler', 'Call Now')}</span>
          </a>
        </motion.div>

        {/* ── Hours + Map Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 bg-[#160E0B] rounded-2xl p-6 sm:p-8 border border-[#F8F3E9]/15 shadow-xl text-[#F8F3E9]"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C83B28] font-bold mb-5">
              <Clock className="w-4 h-4" />
              <span>{t('Horaires de Service', 'Service Hours')}</span>
            </div>

            <div className="space-y-1">
              {RESTAURANT_INFO.hours.map((h, i) => {
                const dayLabel = language === 'en' ? h.dayEn : h.day;
                const lunchClosed = isClosed(h.lunch);
                const dinnerClosed = typeof h.dinner === 'string' && isClosed(h.dinner as string);
                const isSpecial = dayLabel.toLowerCase().startsWith('jeu') || dayLabel.toLowerCase().startsWith('thu');
                const parisDay = new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  timeZone: 'Europe/Paris',
                });
                const isToday = (language === 'en' ? h.dayEn : h.day)
                  .toLowerCase()
                  .startsWith(parisDay.toLowerCase().slice(0, 3));

                return (
                  <div
                    key={h.day + i}
                    className={`flex items-start justify-between gap-4 py-2.5 px-3 rounded-lg transition-colors ${
                      isToday ? 'bg-[#C83B28]/20 border border-[#C83B28]/40' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-[90px]">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 mt-0.5 ${
                          lunchClosed && (dinnerClosed || isSpecial) ? 'bg-red-400' : 'bg-emerald-400'
                        }`}
                      />
                      <span className={`text-xs font-semibold ${isToday ? 'text-[#ff6b55]' : 'text-[#F8F3E9]'}`}>
                        {dayLabel}
                        {isToday && (
                          <span className="ml-1.5 text-[9px] font-bold uppercase tracking-wider text-white bg-[#C83B28] px-2 py-0.5 rounded-full">
                            {t('Auj.', 'Today')}
                          </span>
                        )}
                      </span>
                    </div>

                    <div className="text-right flex flex-col items-end gap-0.5">
                      {isSpecial ? (
                        <span className="text-[11px] italic text-[#F8F3E9]/60 text-right">
                          {t('Groupes sur réservation', 'Groups on request')}
                        </span>
                      ) : (
                        <>
                          <span
                            className={`text-[11px] tabular-nums font-mono ${
                              lunchClosed
                                ? 'text-[#F8F3E9]/40 line-through'
                                : 'text-[#F8F3E9] font-medium'
                            }`}
                          >
                            {h.lunch}
                          </span>
                          {h.dinner && (
                            <span
                              className={`text-[10px] tabular-nums font-mono ${
                                dinnerClosed ? 'text-[#F8F3E9]/40' : 'text-[#F8F3E9]/70'
                              }`}
                            >
                              {h.dinner as string}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-[#F8F3E9]/12 flex items-center justify-between gap-2 text-[11px] text-[#F8F3E9]/60">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                {t('Ouvert', 'Open')}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                {t('Fermé', 'Closed')}
              </span>
              <span className="text-[#C83B28] font-semibold text-[10px] uppercase tracking-wider">
                {t('Sur place & À emporter', 'Dine-in & Takeaway')}
              </span>
            </div>
          </motion.div>

          {/* Map Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 bg-[#160E0B] rounded-2xl overflow-hidden border border-[#F8F3E9]/15 shadow-xl flex flex-col"
          >
            <div className="p-5 sm:p-6 border-b border-[#F8F3E9]/10 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C83B28] font-bold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>34 Quai Perrière · Grenoble</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F8F3E9]">
                  {t("Sur les Quais de l'Isère", "On the Banks of the Isère")}
                </h3>
                <p className="text-xs text-[#F8F3E9]/60 font-light mt-0.5">
                  {t('Quartier Saint-Laurent · Tram B · Parking proche', 'Saint-Laurent district · Tram B · Nearby parking')}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="shrink-0 text-[11px] text-[#F8F3E9]/80 hover:text-white border border-[#F8F3E9]/20 hover:border-[#C83B28] bg-white/5 px-3 py-1.5 rounded-full transition-colors font-medium whitespace-nowrap cursor-pointer"
              >
                {copied ? t('✓ Copiée !', '✓ Copied!') : t('Copier adresse', 'Copy address')}
              </button>
            </div>

            <div className="relative flex-1 min-h-[280px] sm:min-h-[340px]">
              <iframe
                title="Google Maps La Felicità Grenoble"
                src="https://maps.google.com/maps?q=34+Quai+Perri%C3%A8re+38000+Grenoble&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 absolute inset-0"
                loading="lazy"
              />
            </div>

            <div className="p-4 sm:p-5 border-t border-[#F8F3E9]/10 flex flex-wrap items-center justify-between gap-3">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#C83B28] hover:text-white transition-colors font-bold uppercase tracking-wider"
              >
                <NavIcon className="w-3.5 h-3.5" />
                <span>{t('Itinéraire GPS', 'Get Directions')}</span>
              </a>
              <a
                href={`mailto:${RESTAURANT_INFO.email}`}
                className="text-xs text-[#F8F3E9]/60 hover:text-[#C83B28] transition-colors flex items-center gap-1.5 font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t('Contact & Groupes', 'Group Enquiries')}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
