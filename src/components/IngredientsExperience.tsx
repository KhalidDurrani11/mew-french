import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INGREDIENTS_DATA } from '../data/restaurantData';
import { Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ImageWithFallback from './ImageWithFallback';

// Curated high-quality images per ingredient id
const INGREDIENT_IMAGES: Record<string, { src: string; fallback: string }> = {
  'fior-di-latte': {
    src: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=900&q=85',
    fallback: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=80',
  },
  'san-marzano': {
    src: 'https://images.unsplash.com/photo-1546094097-3f4a9bb3e1f4?auto=format&fit=crop&w=900&q=85',
    fallback: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80',
  },
  'farina-tipo-00': {
    src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85',
    fallback: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
  },
  'ravioles-dauphine': {
    src: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281242?auto=format&fit=crop&w=900&q=85',
    fallback: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80',
  },
  'salumi-italiani': {
    src: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85',
    fallback: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=80',
  },
  'parmigiano-aoc': {
    src: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=900&q=85',
    fallback: 'https://images.unsplash.com/photo-1587334274328-64186a80aeee?auto=format&fit=crop&w=900&q=80',
  },
};

const DEFAULT_IMAGE = {
  src: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=900&q=85',
  fallback: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
};

export default function IngredientsExperience() {
  const { language, t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const active = INGREDIENTS_DATA[activeIdx];
  const imgSet = INGREDIENT_IMAGES[active.id] ?? DEFAULT_IMAGE;

  return (
    <section id="ingredients" className="py-20 lg:py-28 bg-[#291C17] text-[#F8F3E9] relative overflow-hidden border-t border-[#F8F3E9]/10">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C83B28]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#343A25]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C83B28]/20 text-[#F8F3E9] text-xs font-semibold uppercase tracking-widest mb-3 border border-[#C83B28]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#C83B28]" />
            <span>{t('Appellations Contrôlées', 'Protected Origins')}</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#F8F3E9]">
            {t("L'Excellence des Produits Italiens", 'The Italian Terroirs')}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-[#F8F3E9]/75 font-light">
            {t(
              'Des ingrédients certifiés DOP et IGP importés directement de producteurs transalpins.',
              'Certified DOP and IGP ingredients sourced directly from traditional Italian producers.'
            )}
          </p>
        </div>

        {/* 6 Ingredient Selector Cards with Images on Dark */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {INGREDIENTS_DATA.map((item, idx) => {
            const isSelected = idx === activeIdx;
            const thumb = INGREDIENT_IMAGES[item.id] ?? DEFAULT_IMAGE;
            return (
              <button
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                type="button"
                className={`relative overflow-hidden rounded-xl text-left border transition-all duration-300 cursor-pointer group shadow-lg ${
                  isSelected
                    ? 'border-[#C83B28] ring-2 ring-[#C83B28] bg-[#1a120e] scale-[1.03]'
                    : 'border-[#F8F3E9]/15 hover:border-[#F8F3E9]/40 bg-[#1f1714] hover:scale-[1.01]'
                }`}
              >
                {/* Thumbnail */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <ImageWithFallback
                    src={thumb.src}
                    fallbackSrc={thumb.fallback}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      isSelected ? 'bg-[#C83B28]/25' : 'bg-black/30 group-hover:bg-black/10'
                    }`}
                  />
                </div>
                {/* Label */}
                <div className="p-2.5 bg-[#1f1714]">
                  <span className="text-[9px] uppercase font-bold tracking-wider block mb-0.5 text-[#C83B28]">
                    {item.origin.split(',')[0]}
                  </span>
                  <span className="font-display text-xs font-bold block line-clamp-1 text-[#F8F3E9]">
                    {language === 'en' ? item.nameEn.split('&')[0] : item.name.split('&')[0]}
                  </span>
                </div>
                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#C83B28] flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Featured Detail Panel — Dark Luxury Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl overflow-hidden border border-[#F8F3E9]/15 bg-[#1a120e] shadow-2xl grid md:grid-cols-2 text-[#F8F3E9]"
          >
            {/* Left — Full bleed image */}
            <div className="relative overflow-hidden min-h-[260px] md:min-h-[360px]">
              <ImageWithFallback
                src={imgSet.src}
                fallbackSrc={imgSet.fallback}
                alt={language === 'en' ? active.nameEn : active.name}
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a120e] via-transparent to-transparent" />
              {/* Floating italic name badge */}
              <div className="absolute bottom-4 left-4">
                <span className="text-[11px] italic text-[#F8F3E9] bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
                  « {active.italianName} »
                </span>
              </div>
            </div>

            {/* Right — Clean Classy Detail on Dark */}
            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-5 bg-[#1a120e]">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <MapPin className="w-4 h-4 text-[#C83B28] shrink-0" />
                  <span className="text-xs uppercase tracking-widest text-[#C83B28] font-bold">
                    {language === 'en' ? active.originEn : active.origin}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F8F3E9] leading-tight">
                  {language === 'en' ? active.nameEn : active.name}
                </h3>

                <p className="text-sm sm:text-base text-[#F8F3E9]/80 font-light leading-relaxed">
                  {language === 'en' ? active.descriptionEn : active.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#291C17]/90 border border-[#F8F3E9]/12 text-xs text-[#F8F3E9] space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2 text-[#C83B28] font-bold text-[11px] uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Garantie du Terroir</span>
                </div>
                <p className="font-light text-[#F8F3E9]/75 leading-relaxed">
                  {language === 'en' ? active.terroirNoteEn : active.terroirNote}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
