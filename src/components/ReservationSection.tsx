import { useState } from 'react';
import { PhoneCall, MapPin, Clock, Calendar, Navigation as NavIcon, Heart, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO, IMAGES } from '../data/restaurantData';
import { useLanguage } from '../context/LanguageContext';
import ImageWithFallback from './ImageWithFallback';

interface ReservationSectionProps {
  onOpenReservation: () => void;
}

export default function ReservationSection({ onOpenReservation }: ReservationSectionProps) {
  const { language, t } = useLanguage();
  const [mapCopied, setMapCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setMapCopied(true);
    setTimeout(() => setMapCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#291C17] text-[#F8F3E9] relative overflow-hidden">
      <div className="absolute inset-0 opacity-25 filter blur-[0.5px] overflow-hidden pointer-events-none">
        <ImageWithFallback
          src={IMAGES.restaurantInterior}
          fallbackSrc={IMAGES.fallbacks.restaurantInterior}
          fallbackSources={[IMAGES.local.restaurantInterior, '/images/restaurant_interior.jpg']}
          alt="Ambiance restaurant La Felicità"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#291C17] via-[#291C17]/90 to-[#291C17]/80 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C83B28] font-semibold mb-3">
            <Heart className="w-3.5 h-3.5" />
            <span>{t('Signature N° 05 · L’Arrivée du Soir', 'Signature No. 05 · The Evening Arrival')}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F8F3E9] leading-tight text-balance mb-6">
            {t('Votre table en Italie vous attend.', 'Your table in Italy awaits.')}
          </h2>
          <p className="text-base sm:text-lg text-[#F8F3E9]/85 font-light leading-relaxed">
            {t(
              'Un dîner aux chandelles au bord de l’Isère, le parfum de la truffe et du bois de chêne, la générosité des recettes maison : nous avons hâte de vous recevoir au 34 Quai Perrière.',
              'A candlelit dinner on the banks of the Isère river, the fragrant aroma of truffles and burning oak, generous handcrafted recipes: we look forward to welcoming you at 34 Quai Perrière.'
            )}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenReservation}
              type="button"
              className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-widest font-semibold text-[#F8F3E9] bg-[#C83B28] hover:bg-[#b53220] rounded-xs shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              {t('Réserver votre table', 'Reserve Your Table')}
            </button>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs uppercase tracking-widest font-semibold text-[#F8F3E9] bg-white/10 hover:bg-white/15 border border-white/20 rounded-xs transition-colors tabular-nums"
            >
              <PhoneCall className="w-4 h-4 text-[#C83B28]" />
              <span>{t('Appeler le', 'Call')} {RESTAURANT_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* 3-Column Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Hours */}
          <div className="bg-[#F8F3E9]/5 border border-[#F8F3E9]/15 rounded-xs p-6 backdrop-blur-xs space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C83B28] font-bold">
              <Clock className="w-4 h-4" />
              <span>{t('Horaires de Service', 'Opening Hours')}</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#F8F3E9]">
              {t('Du Lundi au Dimanche', 'Monday to Sunday')}
            </h3>
            <div className="space-y-2 text-xs divide-y divide-[#F8F3E9]/10 pt-1">
              {RESTAURANT_INFO.hours.map((h) => (
                <div key={h.day} className="pt-2 flex justify-between items-center text-[#F8F3E9]/80">
                  <span className="font-medium">{language === 'en' ? h.dayEn : h.day}</span>
                  <div className="text-right">
                    <span className="tabular-nums font-mono block">{h.lunch}</span>
                    <span className="tabular-nums font-mono text-[11px] text-[#F8F3E9]/60">{h.dinner}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Address */}
          <div className="bg-[#F8F3E9]/5 border border-[#F8F3E9]/15 rounded-xs p-6 backdrop-blur-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C83B28] font-bold">
                <MapPin className="w-4 h-4" />
                <span>{t('Situation Géographique', 'Location & Access')}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#F8F3E9]">
                {t('Au Cœur de Grenoble', 'Heart of Grenoble')}
              </h3>
              <p className="text-sm text-[#F8F3E9]/85 font-light leading-relaxed">
                <strong>{RESTAURANT_INFO.address}</strong>
                <br />
                {language === 'en' ? RESTAURANT_INFO.locationDetailsEn : RESTAURANT_INFO.locationDetails}.
              </p>
              <div className="p-3 bg-[#291C17]/70 rounded-xs border border-[#F8F3E9]/10 text-xs text-[#F8F3E9]/75 space-y-1">
                <div>{t('🚇 Tram B — Arrêt « Esplanade » ou « Sainte-Claire »', '🚇 Tram B — Station "Esplanade" or "Sainte-Claire"')}</div>
                <div>{t('🚗 Parking Esplanade ou Quai de France à proximité', '🚗 Nearby parking at Esplanade or Quai de France')}</div>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#F8F3E9] bg-[#343A25] hover:bg-[#434b30] rounded-xs transition-colors"
              >
                <NavIcon className="w-3.5 h-3.5" />
                <span>{t('Ouvrir dans Google Maps', 'Open in Google Maps')}</span>
              </a>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="text-[11px] text-[#F8F3E9]/60 hover:text-[#F8F3E9] underline text-center cursor-pointer transition-colors"
              >
                {mapCopied
                  ? t('✓ Adresse copiée dans le presse-papier !', '✓ Address copied to clipboard!')
                  : t('Copier l’adresse complète', 'Copy address')}
              </button>
            </div>
          </div>

          {/* Card 3: Groups */}
          <div className="bg-[#F8F3E9]/5 border border-[#F8F3E9]/15 rounded-xs p-6 backdrop-blur-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C83B28] font-bold">
                <Calendar className="w-4 h-4" />
                <span>{t('Groupes & Événements', 'Groups & Private Events')}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#F8F3E9]">
                {t('Privatisation & Accueil', 'Private Dining & Gatherings')}
              </h3>
              <p className="text-sm text-[#F8F3E9]/85 font-light leading-relaxed">
                {t(
                  'Le restaurant accueille vos repas d’affaires, anniversaires et événements familiaux. Le jeudi est spécialement réservé à l’accueil de groupes sur réservation préalable.',
                  'We host business dinners, celebrations, and family gatherings. Thursdays are exclusively reserved for private groups upon prior booking.'
                )}
              </p>
              <div className="space-y-2 text-xs text-[#F8F3E9]/80 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#C83B28] font-bold">·</span>
                  <span>{t('Formules sur mesure avec accords mets et vins italiens', 'Custom menus tailored with Italian wine pairings')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#C83B28] font-bold">·</span>
                  <span>{t('Capacité de groupe et terrasse en saison', 'Spacious dining room and seasonal riverside terrace')}</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={`mailto:${RESTAURANT_INFO.email}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#291C17] bg-[#F8F3E9] hover:bg-white rounded-xs transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t('Demande de Groupe par Email', 'Group Inquiries by Email')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
