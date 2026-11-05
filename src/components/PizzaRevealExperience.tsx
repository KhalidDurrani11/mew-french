import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Info, Flame, Eye, Box } from 'lucide-react';
import { IMAGES } from '../data/restaurantData';
import { useLanguage } from '../context/LanguageContext';
import ThreeOvenScene from './ThreeOvenScene';
import ImageWithFallback from './ImageWithFallback';

interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  description: string;
  descriptionEn: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'cornicione',
    x: 18,
    y: 42,
    title: 'Cornicione Alvéolé',
    titleEn: 'Airy Cornicione Crust',
    subtitle: 'Fermentation 48h',
    subtitleEn: '48h Fermentation',
    description: 'Bordure gonflée d’air, dorée et tachetée « léopard ». Notre pâte lève 48 heures au frais avec de la farine italienne de type 00 pour une digestibilité absolue.',
    descriptionEn: 'Puffed, blistered leopard-crust. Our sourdough rests for 48 hours in cold fermentation with Italian tipo 00 flour for effortless digestion.'
  },
  {
    id: 'fior-di-latte',
    x: 48,
    y: 52,
    title: 'Fior di Latte d’Italie',
    titleEn: 'Italian Fior di Latte',
    subtitle: 'Fonte crémeuse',
    subtitleEn: 'Creamy Melt',
    description: 'Une mozzarella artisanale égouttée à la perfection, qui fond onctueusement à haute température sans détremper la pâte.',
    descriptionEn: 'Artisanal mozzarella drained to perfection, melting smoothly under blistering heat without making the crust soggy.'
  },
  {
    id: 'pomodoro',
    x: 68,
    y: 38,
    title: 'Tomates San Marzano DOP',
    titleEn: 'San Marzano DOP Tomatoes',
    subtitle: 'Terres du Vésuve',
    subtitleEn: 'Vesuvius Soil',
    description: 'Pulpe rouge vif, naturellement sucrée et parfumée de basilic frais récolté à la main.',
    descriptionEn: 'Vibrant sweet volcanic pulp, naturally balanced with fragrant hand-torn fresh basil leaves.'
  },
  {
    id: 'oven',
    x: 22,
    y: 18,
    title: 'Four à Bois Traditionnel',
    titleEn: 'Traditional Wood Oven',
    subtitle: '450°C de braise',
    subtitleEn: '450°C Embers',
    description: 'Cuisson éclair de 90 secondes sur pierre réfractaire. Les braises de bois dur confèrent ce parfum fumé inimitable.',
    descriptionEn: '90-second flash bake over refractory stone. Hardwood embers infuse an authentic, delicate smoky bouquet.'
  }
];

export default function PizzaRevealExperience() {
  const { language, t } = useLanguage();
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(HOTSPOTS[0]);
  const [showHotspots, setShowHotspots] = useState(true);
  const [viewMode, setViewMode] = useState<'photo' | '3d'>('photo');

  return (
    <section id="pizza-reveal" className="relative py-24 lg:py-32 bg-[#F8F3E9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-[#291C17]/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C83B28] font-semibold mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>{t('Signature N° 01 · L’Artisanat du Feu', 'Signature No. 01 · The Craft of Fire')}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#291C17]">
              {t('La Naissance d’une Pizza', 'The Birth of a Pizza')}
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3">
            {/* 2D Photo vs 3D Scene Toggle */}
            <div className="flex items-center p-0.5 bg-[#291C17]/5 border border-[#291C17]/15 rounded-xs">
              <button
                type="button"
                onClick={() => setViewMode('photo')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors cursor-pointer ${
                  viewMode === 'photo'
                    ? 'bg-[#291C17] text-white shadow-xs'
                    : 'text-[#291C17]/70 hover:text-[#291C17]'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-[#C83B28]" />
                <span>{t('Photo & Secrets', 'Photo & Craft')}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('3d')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors cursor-pointer ${
                  viewMode === '3d'
                    ? 'bg-[#291C17] text-white shadow-xs'
                    : 'text-[#291C17]/70 hover:text-[#291C17]'
                }`}
              >
                <Box className="w-3.5 h-3.5 text-[#C83B28]" />
                <span>{t('Four 3D Interactif', '3D Interactive Oven')}</span>
              </button>
            </div>

            {viewMode === 'photo' && (
              <button
                onClick={() => setShowHotspots(!showHotspots)}
                type="button"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#291C17] bg-[#291C17]/5 hover:bg-[#291C17]/10 border border-[#291C17]/15 rounded-xs transition-colors cursor-pointer"
              >
                <Eye className="w-3 h-3 text-[#C83B28]" />
                <span>{showHotspots ? t('Masquer les points', 'Hide points') : t('Afficher', 'Show')}</span>
              </button>
            )}
          </div>
        </div>

        {/* View Mode Switching: 3D Scene OR High-Res Editorial Photo with Hotspots */}
        {viewMode === '3d' ? (
          <ThreeOvenScene />
        ) : (
          <div className="relative rounded-sm overflow-hidden shadow-2xl bg-[#291C17] border border-[#291C17]/20">
            <div className="relative aspect-16/10 lg:aspect-21/9 overflow-hidden group">
              <ImageWithFallback
                src={IMAGES.heroPizza}
                fallbackSrc={IMAGES.fallbacks.heroPizza}
                fallbackSources={[IMAGES.local.heroPizza, '/images/hero_pizza.jpg']}
                alt="Pizza artisanale au feu de bois La Felicità Grenoble"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#291C17]/90 via-[#291C17]/20 to-transparent pointer-events-none" />

              {/* Hotspots */}
              {showHotspots &&
                HOTSPOTS.map((spot) => {
                  const isSelected = activeHotspot?.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => setActiveHotspot(spot)}
                      type="button"
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer transition-all duration-300 z-20 group/marker ${
                        isSelected ? 'scale-125' : 'hover:scale-110'
                      }`}
                      aria-label={`Détail: ${spot.title}`}
                    >
                      <span className="relative flex h-7 w-7 items-center justify-center">
                        <span
                          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${
                            isSelected ? 'bg-[#C83B28]' : 'bg-[#F8F3E9]'
                          }`}
                        />
                        <span
                          className={`relative inline-flex items-center justify-center rounded-full h-6 w-6 text-[10px] font-bold text-white shadow-lg transition-colors ${
                            isSelected
                              ? 'bg-[#C83B28] text-white ring-2 ring-white'
                              : 'bg-[#291C17]/85 text-[#F8F3E9] border border-white/40 hover:bg-[#C83B28]'
                          }`}
                        >
                          <Sparkles className="w-3 h-3" />
                        </span>
                      </span>

                      <span className="hidden md:block absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-[#291C17]/90 text-white text-[11px] font-medium px-2 py-0.5 rounded-xs whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity pointer-events-none shadow-md">
                        {language === 'en' ? spot.titleEn : spot.title}
                      </span>
                    </button>
                  );
                })}

              {/* Active Hotspot Story Box */}
              <AnimatePresence mode="wait">
                {activeHotspot && (
                  <motion.div
                    key={activeHotspot.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-md bg-[#291C17]/95 text-[#F8F3E9] p-6 rounded-xs backdrop-blur-md border border-[#F8F3E9]/20 shadow-2xl z-30"
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="text-[11px] uppercase tracking-widest text-[#C83B28] font-bold flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5" />
                        {language === 'en' ? activeHotspot.subtitleEn : activeHotspot.subtitle}
                      </span>
                      <span className="text-xs text-[#F8F3E9]/50 font-mono">
                        {t('Secret de fabrication', 'Artisanal secret')}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#F8F3E9] mb-2">
                      {language === 'en' ? activeHotspot.titleEn : activeHotspot.title}
                    </h3>
                    <p className="text-sm text-[#F8F3E9]/85 leading-relaxed font-light">
                      {language === 'en' ? activeHotspot.descriptionEn : activeHotspot.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-[#291C17]/10">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#C83B28] font-bold">01. {t('Farine Italienne & Levain', 'Italian Flour & Sourdough')}</span>
            <h4 className="font-display text-xl font-bold text-[#291C17]">{t('Maturation Lente 48h', '48-Hour Slow Fermentation')}</h4>
            <p className="text-sm text-[#291C17]/75 leading-relaxed">
              {t(
                'Une pâte légère, aérée et croustillante, hautement digestible grâce à une longue fermentation au repos.',
                'A light, blistered and crispy crust with effortless digestion thanks to prolonged cold fermentation.'
              )}
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#C83B28] font-bold">02. {t('Bois de Chêne & Hêtre', 'Oak & Beech Hardwood')}</span>
            <h4 className="font-display text-xl font-bold text-[#291C17]">{t('Four à Bois 450°C', '450°C Wood-Fired Dome')}</h4>
            <p className="text-sm text-[#291C17]/75 leading-relaxed">
              {t(
                'La flamme vive enveloppe la pizza pour saisir instantanément les arômes sans dessécher les ingrédients frais.',
                'Lively flames envelop the pizza to sear in aromatics in 90 seconds while keeping fresh ingredients tender.'
              )}
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#C83B28] font-bold">03. {t('Produits d’Origine Protégée', 'Protected Origin Certification')}</span>
            <h4 className="font-display text-xl font-bold text-[#291C17]">{t('Garantie Terroir DOP', 'DOP Certified Terroir')}</h4>
            <p className="text-sm text-[#291C17]/75 leading-relaxed">
              {t(
                'Fromages de Campanie, jambons de Parme affinés, truffes d’Italie et tomates gorgées du soleil méditerranéen.',
                'Campania cheeses, aged Parma prosciutto, Italian truffles, and sweet Mediterranean sun-ripened tomatoes.'
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
