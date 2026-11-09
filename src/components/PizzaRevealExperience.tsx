import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Flame,
  Eye,
  Box,
  ChevronLeft,
  ChevronRight,
  Clock,
  Award,
  Layers,
} from 'lucide-react';
import { IMAGES } from '../data/restaurantData';
import { useLanguage } from '../context/LanguageContext';
import ThreeOvenScene from './ThreeOvenScene';
import ImageWithFallback from './ImageWithFallback';

interface Hotspot {
  id: string;
  num: string;
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
    num: '01',
    x: 18,
    y: 42,
    title: 'Cornicione Alvéolé',
    titleEn: 'Airy Cornicione Crust',
    subtitle: 'Fermentation 48h',
    subtitleEn: '48h Fermentation',
    description:
      'Bordure gonflée d’air, dorée et tachetée « léopard ». Notre pâte lève 48 heures au frais avec de la farine italienne de type 00 pour une digestibilité absolue.',
    descriptionEn:
      'Puffed, blistered leopard-crust. Our sourdough rests for 48 hours in cold fermentation with Italian tipo 00 flour for effortless digestion.',
  },
  {
    id: 'fior-di-latte',
    num: '02',
    x: 48,
    y: 52,
    title: 'Fior di Latte d’Italie',
    titleEn: 'Italian Fior di Latte',
    subtitle: 'Fonte crémeuse',
    subtitleEn: 'Creamy Melt',
    description:
      'Une mozzarella artisanale égouttée à la perfection, qui fond onctueusement à haute température sans détremper la pâte.',
    descriptionEn:
      'Artisanal mozzarella drained to perfection, melting smoothly under blistering heat without making the crust soggy.',
  },
  {
    id: 'pomodoro',
    num: '03',
    x: 68,
    y: 38,
    title: 'Tomates San Marzano DOP',
    titleEn: 'San Marzano DOP Tomatoes',
    subtitle: 'Terres du Vésuve',
    subtitleEn: 'Vesuvius Soil',
    description:
      'Pulpe rouge vif, naturellement sucrée et parfumée de basilic frais récolté à la main sur les terres fertiles de Campanie.',
    descriptionEn:
      'Vibrant sweet volcanic pulp, naturally balanced with fragrant hand-torn fresh basil leaves from Campania.',
  },
  {
    id: 'oven',
    num: '04',
    x: 22,
    y: 18,
    title: 'Four à Bois Traditionnel',
    titleEn: 'Traditional Wood Oven',
    subtitle: '450°C de braise',
    subtitleEn: '450°C Embers',
    description:
      'Cuisson éclair de 90 secondes sur pierre réfractaire. Les braises de bois dur confèrent ce parfum fumé inimitable.',
    descriptionEn:
      '90-second flash bake over refractory stone. Hardwood embers infuse an authentic, delicate smoky bouquet.',
  },
];

export default function PizzaRevealExperience() {
  const { language, t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const [showHotspots, setShowHotspots] = useState(true);
  const [viewMode, setViewMode] = useState<'photo' | '3d'>('photo');

  const activeHotspot = HOTSPOTS[activeIdx];

  const handleNextSecret = () => {
    setActiveIdx((prev) => (prev + 1) % HOTSPOTS.length);
  };

  const handlePrevSecret = () => {
    setActiveIdx((prev) => (prev - 1 + HOTSPOTS.length) % HOTSPOTS.length);
  };

  return (
    <section id="pizza-reveal" className="relative py-20 sm:py-24 lg:py-32 bg-[#FAF6F0] overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C83B28]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 border-b border-[#1A1412]/10 pb-6 sm:pb-8 gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C83B28]/10 text-[#C83B28] text-xs font-semibold uppercase tracking-widest mb-3">
              <Flame className="w-3.5 h-3.5" />
              <span>{t('Signature N° 01 · L’Artisanat du Feu', 'Signature No. 01 · The Craft of Fire')}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1412] leading-[1.1]">
              {t('La Naissance d’une Pizza', 'The Birth of a Pizza')}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#1A1412]/65 font-light max-w-xl">
              {t(
                'Explorez les 4 secrets d’une cuisson napolitaine authentique à 450°C sur pierre réfractaire.',
                'Explore the 4 secrets of authentic Neapolitan baking at 450°C over refractory stone.'
              )}
            </p>
          </div>

          {/* Mode Switcher: 2D Photo vs 3D Scene Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 self-start lg:self-end">
            <div className="inline-flex items-center p-1 bg-white border border-[#1A1412]/12 rounded-full shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode('photo')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  viewMode === 'photo'
                    ? 'bg-[#1A1412] text-white shadow-xs'
                    : 'text-[#1A1412]/65 hover:text-[#1A1412]'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-[#C83B28]" />
                <span>{t('Photo & Secrets', 'Photo & Secrets')}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('3d')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  viewMode === '3d'
                    ? 'bg-[#1A1412] text-white shadow-xs'
                    : 'text-[#1A1412]/65 hover:text-[#1A1412]'
                }`}
              >
                <Box className="w-3.5 h-3.5 text-[#C83B28]" />
                <span>{t('Four 3D Interactif', '3D Oven')}</span>
              </button>
            </div>

            {viewMode === 'photo' && (
              <button
                onClick={() => setShowHotspots(!showHotspots)}
                type="button"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1A1412]/60 hover:text-[#1A1412] border border-[#1A1412]/12 rounded-full transition-colors cursor-pointer bg-white"
                title={showHotspots ? t('Masquer les points', 'Hide pins') : t('Afficher les points', 'Show pins')}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C83B28]" />
                <span>{showHotspots ? t('Points ON', 'Pins ON') : t('Points OFF', 'Pins OFF')}</span>
              </button>
            )}
          </div>
        </div>

        {/* ── View Mode: 3D Scene OR Responsive Editorial Photo ── */}
        {viewMode === '3d' ? (
          <ThreeOvenScene />
        ) : (
          <div className="space-y-4">
            {/* 1. The Visual Canvas */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-[#1A1412] border border-[#1A1412]/15">
              {/* Responsive Container: Taller on Mobile so pizza is huge and glorious */}
              <div className="relative h-[310px] sm:h-[400px] md:h-[480px] lg:aspect-21/9 lg:h-auto overflow-hidden group">
                <ImageWithFallback
                  src={IMAGES.heroPizza}
                  fallbackSrc={IMAGES.fallbacks.heroPizza}
                  fallbackSources={[IMAGES.local.heroPizza, '/images/hero_pizza.jpg']}
                  alt="Pizza artisanale au feu de bois La Felicità Grenoble"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
                />

                {/* Subtle dark vignette scrim for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30 pointer-events-none" />

                {/* Top Corner Badge on Mobile/Desktop */}
                <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold">
                    <Flame className="w-3.5 h-3.5 text-[#C83B28] animate-pulse" />
                    <span>{t('Touchez un point pour explorer', 'Tap a pin to explore')}</span>
                  </div>
                </div>

                {/* Interactive Hotspot Pins */}
                {showHotspots &&
                  HOTSPOTS.map((spot, idx) => {
                    const isSelected = activeIdx === idx;
                    return (
                      <button
                        key={spot.id}
                        onClick={() => setActiveIdx(idx)}
                        type="button"
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full cursor-pointer transition-all duration-300 z-20 group/marker ${
                          isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                        }`}
                        aria-label={`Détail: ${spot.title}`}
                      >
                        <span className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center">
                          {/* Pulsing beacon ring */}
                          <span
                            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-70 ${
                              isSelected ? 'bg-[#C83B28]' : 'bg-white'
                            }`}
                          />
                          {/* Pin core */}
                          <span
                            className={`relative inline-flex items-center justify-center rounded-full h-7 w-7 sm:h-8 sm:w-8 text-xs font-bold shadow-2xl transition-all ${
                              isSelected
                                ? 'bg-[#C83B28] text-white ring-2 sm:ring-4 ring-white shadow-[#C83B28]/50'
                                : 'bg-[#1A1412]/90 text-white border border-white/40 hover:bg-[#C83B28]'
                            }`}
                          >
                            <span className="font-mono text-[11px]">{spot.num}</span>
                          </span>
                        </span>

                        {/* Desktop Hover Label */}
                        <span className="hidden md:block absolute left-full ml-2.5 top-1/2 -translate-y-1/2 bg-[#1A1412]/95 text-white text-xs font-medium px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10">
                          {language === 'en' ? spot.titleEn : spot.title}
                        </span>
                      </button>
                    );
                  })}

                {/* Desktop HUD Story Overlay Card (Hidden on Mobile to NEVER cover the pizza) */}
                <div className="hidden md:block">
                  <AnimatePresence mode="wait">
                    {activeHotspot && (
                      <motion.div
                        key={activeHotspot.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.28 }}
                        className="absolute bottom-6 left-6 max-w-md bg-[#1A1412]/95 text-[#F8F3E9] p-6 rounded-2xl backdrop-blur-md border border-white/15 shadow-2xl z-30"
                      >
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <span className="text-[11px] uppercase tracking-widest text-[#C83B28] font-bold flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{activeHotspot.num}. {language === 'en' ? activeHotspot.subtitleEn : activeHotspot.subtitle}</span>
                          </span>
                          <span className="text-[10px] text-[#F8F3E9]/50 font-mono uppercase tracking-wider">
                            {t('Secret artisanal', 'Artisan secret')}
                          </span>
                        </div>

                        <h3 className="font-display text-2xl font-bold text-[#F8F3E9] mb-2">
                          {language === 'en' ? activeHotspot.titleEn : activeHotspot.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#F8F3E9]/80 leading-relaxed font-light">
                          {language === 'en' ? activeHotspot.descriptionEn : activeHotspot.description}
                        </p>

                        {/* Navigation arrows inside desktop HUD */}
                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10 text-xs">
                          <span className="text-[#F8F3E9]/50 font-mono text-[11px]">
                            {activeIdx + 1} / {HOTSPOTS.length}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={handlePrevSecret}
                              type="button"
                              className="p-1.5 rounded-full bg-white/10 hover:bg-[#C83B28] text-white transition-colors cursor-pointer"
                              aria-label="Secret précédent"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleNextSecret}
                              type="button"
                              className="p-1.5 rounded-full bg-white/10 hover:bg-[#C83B28] text-white transition-colors cursor-pointer"
                              aria-label="Secret suivant"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* 2. Mobile-Dedicated Experience: Clean Selector Pills + Story Card Below Image */}
            <div className="block md:hidden space-y-3">
              {/* Touch Pill Switcher */}
              <div className="grid grid-cols-2 gap-2">
                {HOTSPOTS.map((spot, idx) => {
                  const isSelected = activeIdx === idx;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => setActiveIdx(idx)}
                      type="button"
                      className={`py-2.5 px-3 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#C83B28] text-white border-[#C83B28] shadow-md shadow-[#C83B28]/25 scale-[1.01]'
                          : 'bg-white text-[#1A1412] border-[#1A1412]/10 hover:border-[#1A1412]/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-white/80' : 'text-[#C83B28]'}`}>
                          {spot.num}
                        </span>
                        <span className="text-xs font-bold truncate max-w-[110px]">
                          {language === 'en' ? spot.titleEn : spot.title}
                        </span>
                      </div>
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-[#C83B28]/30'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Mobile Dedicated Detail Card — NEVER covers the pizza */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHotspot.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#1A1412] text-white p-5 rounded-2xl border border-white/10 shadow-xl"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] uppercase tracking-widest text-[#C83B28] font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      <span>{activeHotspot.num}. {language === 'en' ? activeHotspot.subtitleEn : activeHotspot.subtitle}</span>
                    </span>
                    <span className="text-[10px] text-white/50 font-mono">
                      {activeIdx + 1} / {HOTSPOTS.length}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {language === 'en' ? activeHotspot.titleEn : activeHotspot.title}
                  </h3>

                  <p className="text-xs text-white/80 leading-relaxed font-light mb-4">
                    {language === 'en' ? activeHotspot.descriptionEn : activeHotspot.description}
                  </p>

                  {/* Previous / Next buttons for mobile navigation */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                    <button
                      onClick={handlePrevSecret}
                      type="button"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#C83B28] text-white transition-colors cursor-pointer text-[11px] font-semibold"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>{t('Précédent', 'Prev')}</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {HOTSPOTS.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveIdx(i)}
                          aria-label={`Aller au secret ${i + 1}`}
                          className={`w-2 h-2 rounded-full transition-all ${
                            activeIdx === i ? 'w-5 bg-[#C83B28]' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleNextSecret}
                      type="button"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#C83B28] hover:bg-[#e04530] text-white transition-colors cursor-pointer text-[11px] font-semibold"
                    >
                      <span>{t('Suivant', 'Next')}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ── 3 Craftsmanship Pillars ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 mt-12 sm:mt-16 pt-8 border-t border-[#1A1412]/10">
          {/* Pillar 1 */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#1A1412]/8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#C83B28] font-bold bg-[#C83B28]/10 px-2.5 py-1 rounded-full">
                  01. {t('Levain & Farine', 'Sourdough')}
                </span>
                <Clock className="w-4 h-4 text-[#C83B28]" />
              </div>
              <h4 className="font-display text-xl font-bold text-[#1A1412] mb-2">
                {t('Maturation Lente 48h', '48-Hour Slow Fermentation')}
              </h4>
              <p className="text-xs sm:text-sm text-[#1A1412]/70 leading-relaxed font-light">
                {t(
                  'Une pâte légère, aérée et croustillante, hautement digestible grâce à une longue fermentation au repos.',
                  'A light, blistered and crispy crust with effortless digestion thanks to prolonged cold fermentation.'
                )}
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#1A1412]/8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#C83B28] font-bold bg-[#C83B28]/10 px-2.5 py-1 rounded-full">
                  02. {t('Chêne & Hêtre', 'Hardwood')}
                </span>
                <Flame className="w-4 h-4 text-[#C83B28]" />
              </div>
              <h4 className="font-display text-xl font-bold text-[#1A1412] mb-2">
                {t('Four à Bois 450°C', '450°C Wood-Fired Dome')}
              </h4>
              <p className="text-xs sm:text-sm text-[#1A1412]/70 leading-relaxed font-light">
                {t(
                  'La flamme vive enveloppe la pizza pour saisir instantanément les arômes en 90 secondes sans dessécher les ingrédients frais.',
                  'Lively flames envelop the pizza to sear in aromatics in 90 seconds while keeping fresh ingredients tender.'
                )}
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#1A1412]/8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#C83B28] font-bold bg-[#C83B28]/10 px-2.5 py-1 rounded-full">
                  03. {t('Origine Certifiée', 'Protected Origin')}
                </span>
                <Award className="w-4 h-4 text-[#C83B28]" />
              </div>
              <h4 className="font-display text-xl font-bold text-[#1A1412] mb-2">
                {t('Garantie Terroir DOP', 'DOP Certified Terroir')}
              </h4>
              <p className="text-xs sm:text-sm text-[#1A1412]/70 leading-relaxed font-light">
                {t(
                  'Mozzarella di Bufala Campana, jambons nobles affinés et tomates San Marzano gorgées du soleil méditerranéen.',
                  'Campania Bufala mozzarella, aged Italian cured meats, and sweet sun-ripened San Marzano tomatoes.'
                )}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
