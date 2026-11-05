import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Info, Flame, Eye } from 'lucide-react';
import { IMAGES } from '../data/restaurantData';

interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  subtitle: string;
  description: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'cornicione',
    x: 18,
    y: 42,
    title: 'Cornicione Alvéolé',
    subtitle: 'Fermentation 48h',
    description: 'Bordure gonflée d’air, dorée et tachetée « léopard ». Notre pâte lève 48 heures au frais avec de la farine italienne de type 00 pour une digestibilité absolue.'
  },
  {
    id: 'fior-di-latte',
    x: 48,
    y: 52,
    title: 'Fior di Latte d’Italie',
    subtitle: 'Fonte crémeuse',
    description: 'Une mozzarella artisanale égouttée à la perfection, qui fond onctueusement à haute température sans détremper la pâte.'
  },
  {
    id: 'pomodoro',
    x: 68,
    y: 38,
    title: 'Tomates San Marzano DOP',
    subtitle: 'Terres du Vésuve',
    description: 'Pulpe rouge vif, naturellement sucrée et parfumée de basilic frais récolté à la main.'
  },
  {
    id: 'oven',
    x: 22,
    y: 18,
    title: 'Four à Bois Traditionnel',
    subtitle: '450°C de braise',
    description: 'Cuisson éclair de 90 secondes sur pierre réfractaire. Les braises de bois dur confèrent ce parfum fumé inimitable.'
  }
];

export default function PizzaRevealExperience() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(HOTSPOTS[0]);
  const [showHotspots, setShowHotspots] = useState(true);

  return (
    <section id="pizza-reveal" className="relative py-24 lg:py-32 bg-[#F8F3E9] overflow-hidden">
      {/* Background Italian watermark decoration */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#291C17]/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C83B28] font-semibold mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Signature N° 01 · L’Artisanat du Feu</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#291C17]">
              La Naissance d’une Pizza
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={() => setShowHotspots(!showHotspots)}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#291C17] bg-[#291C17]/5 hover:bg-[#291C17]/10 border border-[#291C17]/15 rounded-sm transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#C83B28]" />
              {showHotspots ? 'Masquer les points clés' : 'Afficher les secrets'}
            </button>
          </div>
        </div>

        {/* Cinematic Stage */}
        <div className="relative rounded-lg overflow-hidden shadow-2xl bg-[#291C17] border border-[#291C17]/20">
          <div className="relative aspect-16/10 lg:aspect-21/9 overflow-hidden group">
            {/* The Giant Pizza Photo */}
            <motion.img
              src={IMAGES.heroPizza}
              alt="Pizza artisanale au feu de bois La Felicità Grenoble"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              loading="lazy"
            />

            {/* Subtle dark gradient scrim for typography legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#291C17]/90 via-[#291C17]/20 to-transparent pointer-events-none" />

            {/* Interactive Hotspot Markers */}
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

                    {/* Quick mini label on hover */}
                    <span className="hidden md:block absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-[#291C17]/90 text-white text-[11px] font-medium px-2 py-0.5 rounded-sm whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity pointer-events-none shadow-md">
                      {spot.title}
                    </span>
                  </button>
                );
              })}

            {/* Floating Active Story Card on Desktop */}
            <AnimatePresence mode="wait">
              {activeHotspot && (
                <motion.div
                  key={activeHotspot.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-md bg-[#291C17]/95 text-[#F8F3E9] p-6 rounded-md backdrop-blur-md border border-[#F8F3E9]/20 shadow-2xl z-30"
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-[11px] uppercase tracking-widest text-[#C83B28] font-bold flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5" />
                      {activeHotspot.subtitle}
                    </span>
                    <span className="text-xs text-[#F8F3E9]/50 font-mono">
                      Secret de fabrication
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#F8F3E9] mb-2">
                    {activeHotspot.title}
                  </h3>
                  <p className="text-sm text-[#F8F3E9]/85 leading-relaxed font-light">
                    {activeHotspot.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 3 Editorial Pillars below the showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-[#291C17]/10">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#C83B28] font-bold">01. Farine Italienne & Levain</span>
            <h4 className="font-display text-xl font-bold text-[#291C17]">Maturation Lente 48h</h4>
            <p className="text-sm text-[#291C17]/75 leading-relaxed">
              Une pâte légère, aérée et croustillante, hautement digestible grâce à une longue fermentation au repos.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#C83B28] font-bold">02. Bois de Chêne & Hêtre</span>
            <h4 className="font-display text-xl font-bold text-[#291C17]">Four à Bois 450°C</h4>
            <p className="text-sm text-[#291C17]/75 leading-relaxed">
              La flamme vive enveloppe la pizza pour saisir instantanément les arômes sans dessécher les ingrédients frais.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#C83B28] font-bold">03. Produits d'Origine Protégée</span>
            <h4 className="font-display text-xl font-bold text-[#291C17]">Garantie Terroir DOP</h4>
            <p className="text-sm text-[#291C17]/75 leading-relaxed">
              Fromages de Campanie, jambons de Parme affinés, truffes d'Italie et tomates gorgées du soleil méditerranéen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
