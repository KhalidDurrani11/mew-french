import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS, IMAGES } from '../data/restaurantData';
import { useLanguage } from '../context/LanguageContext';
import ImageWithFallback from './ImageWithFallback';

const PASTA_IMAGE_SRC = 'https://images.unsplash.com/photo-1621996346565-e3d5d6281242?auto=format&fit=crop&w=1200&q=85';
const PASTA_FALLBACK = 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80';

const FALLBACK_MAP: Record<string, string> = {
  'gal-1': IMAGES.fallbacks.heroPizza,
  'gal-2': IMAGES.fallbacks.burrataPizza,
  'gal-3': PASTA_FALLBACK,
  'gal-4': IMAGES.fallbacks.restaurantInterior,
  'gal-5': IMAGES.fallbacks.tiramisu,
  'gal-6': IMAGES.calzone,
};

export default function GallerySection() {
  const { language, t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length);
  }, [lightboxIndex]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  }, [lightboxIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev]);

  return (
    <section id="galerie" className="py-20 lg:py-28 bg-[#291C17] text-[#F8F3E9] relative border-t border-[#F8F3E9]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#F8F3E9]/15 pb-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C83B28] font-bold mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>{t('Signature N° 04 · Immersion Visuelle', 'Signature No. 04 · Visual Immersion')}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8F3E9]">
              {t('L’Atmosphère de La Felicità', 'The Atmosphere of La Felicità')}
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <p className="text-xs uppercase tracking-widest text-[#F8F3E9]/60 font-mono">
              34 Quai Perrière · Grenoble
            </p>
          </div>
        </div>

        {/* Editorial Gallery Grid — Row 1: hero wide + tall, Row 2: 4 equal */}
        <div className="space-y-5 lg:space-y-6">
          {/* Row 1: big feature + tall portrait */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
            {/* Item 1 - Featured Wide */}
            <div
              onClick={() => setLightboxIndex(0)}
              className="md:col-span-8 group relative aspect-16/10 rounded-2xl overflow-hidden bg-black cursor-pointer border border-white/10 hover:border-[#C83B28]/50 shadow-2xl transition-all"
            >
              <ImageWithFallback
                src={GALLERY_ITEMS[0].src}
                fallbackSrc={FALLBACK_MAP['gal-1']}
                fallbackSources={[IMAGES.local.heroPizza, '/images/hero_pizza.jpg']}
                alt={GALLERY_ITEMS[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#C83B28] font-bold block mb-1">
                    {language === 'en' ? GALLERY_ITEMS[0].categoryEn : GALLERY_ITEMS[0].category}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {language === 'en' ? GALLERY_ITEMS[0].titleEn : GALLERY_ITEMS[0].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 font-light mt-1 max-w-md hidden sm:block">
                    {language === 'en' ? GALLERY_ITEMS[0].captionEn : GALLERY_ITEMS[0].caption}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-white/20 text-white backdrop-blur-xs group-hover:bg-[#C83B28] transition-colors shrink-0">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Item 2 - Tall portrait */}
            <div
              onClick={() => setLightboxIndex(1)}
              className="md:col-span-4 group relative aspect-4/5 md:aspect-auto rounded-2xl overflow-hidden bg-black cursor-pointer border border-white/10 hover:border-[#C83B28]/50 shadow-2xl transition-all"
            >
              <ImageWithFallback
                src={GALLERY_ITEMS[1].src}
                fallbackSrc={FALLBACK_MAP['gal-2']}
                fallbackSources={[IMAGES.local.burrataPizza, '/images/burrata_pizza.jpg']}
                alt={GALLERY_ITEMS[1].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[11px] uppercase tracking-widest text-[#C83B28] font-bold block mb-1">
                  {language === 'en' ? GALLERY_ITEMS[1].categoryEn : GALLERY_ITEMS[1].category}
                </span>
                <h3 className="font-display text-2xl font-bold text-white">
                  {language === 'en' ? GALLERY_ITEMS[1].titleEn : GALLERY_ITEMS[1].title}
                </h3>
              </div>
            </div>
          </div>

          {/* Row 2: 4 equal squares */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-6">
            {/* Item 3 — Fresh Pasta */}
            <div
              onClick={() => setLightboxIndex(2)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-black cursor-pointer border border-white/10 hover:border-[#C83B28]/50 shadow-lg transition-all"
            >
              <ImageWithFallback
                src={PASTA_IMAGE_SRC}
                fallbackSrc={PASTA_FALLBACK}
                fallbackSources={[IMAGES.local.freshPasta, '/images/fresh_pasta.jpg']}
                alt={GALLERY_ITEMS[2].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[9px] uppercase tracking-widest text-[#C83B28] font-bold block mb-0.5">
                  {language === 'en' ? GALLERY_ITEMS[2].categoryEn : GALLERY_ITEMS[2].category}
                </span>
                <h3 className="font-display text-sm sm:text-base font-bold text-white leading-tight">
                  {language === 'en' ? GALLERY_ITEMS[2].titleEn : GALLERY_ITEMS[2].title}
                </h3>
              </div>
            </div>

            {/* Item 4 — Interior */}
            <div
              onClick={() => setLightboxIndex(3)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-black cursor-pointer border border-white/10 hover:border-[#C83B28]/50 shadow-lg transition-all"
            >
              <ImageWithFallback
                src={GALLERY_ITEMS[3].src}
                fallbackSrc={FALLBACK_MAP['gal-4']}
                fallbackSources={[IMAGES.local.restaurantInterior, '/images/restaurant_interior.jpg']}
                alt={GALLERY_ITEMS[3].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[9px] uppercase tracking-widest text-[#C83B28] font-bold block mb-0.5">
                  {language === 'en' ? GALLERY_ITEMS[3].categoryEn : GALLERY_ITEMS[3].category}
                </span>
                <h3 className="font-display text-sm sm:text-base font-bold text-white leading-tight">
                  {language === 'en' ? GALLERY_ITEMS[3].titleEn : GALLERY_ITEMS[3].title}
                </h3>
              </div>
            </div>

            {/* Item 5 — Tiramisu */}
            <div
              onClick={() => setLightboxIndex(4)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-black cursor-pointer border border-white/10 hover:border-[#C83B28]/50 shadow-lg transition-all"
            >
              <ImageWithFallback
                src={GALLERY_ITEMS[4].src}
                fallbackSrc={FALLBACK_MAP['gal-5']}
                fallbackSources={[IMAGES.local.tiramisu, '/images/tiramisu.jpg']}
                alt={GALLERY_ITEMS[4].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[9px] uppercase tracking-widest text-[#C83B28] font-bold block mb-0.5">
                  {language === 'en' ? GALLERY_ITEMS[4].categoryEn : GALLERY_ITEMS[4].category}
                </span>
                <h3 className="font-display text-sm sm:text-base font-bold text-white leading-tight">
                  {language === 'en' ? GALLERY_ITEMS[4].titleEn : GALLERY_ITEMS[4].title}
                </h3>
              </div>
            </div>

            {/* Item 6 — Calzone */}
            <div
              onClick={() => setLightboxIndex(5)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-black cursor-pointer border border-white/10 hover:border-[#C83B28]/50 shadow-lg transition-all"
            >
              <ImageWithFallback
                src={GALLERY_ITEMS[5].src}
                fallbackSrc={FALLBACK_MAP['gal-6']}
                alt={GALLERY_ITEMS[5].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[9px] uppercase tracking-widest text-[#C83B28] font-bold block mb-0.5">
                  {language === 'en' ? GALLERY_ITEMS[5].categoryEn : GALLERY_ITEMS[5].category}
                </span>
                <h3 className="font-display text-sm sm:text-base font-bold text-white leading-tight">
                  {language === 'en' ? GALLERY_ITEMS[5].titleEn : GALLERY_ITEMS[5].title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal (Dark cinematic backdrop is best for viewing photography) */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              type="button"
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-[#C83B28] text-white transition-colors cursor-pointer z-20"
              aria-label="Fermer la vue agrandie"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              type="button"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-[#C83B28] text-white transition-colors cursor-pointer z-20"
              aria-label="Image précédente"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-[#C83B28] text-white transition-colors cursor-pointer z-20"
              aria-label="Image suivante"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div
              className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl">
                <ImageWithFallback
                  src={GALLERY_ITEMS[lightboxIndex].src}
                  fallbackSrc={FALLBACK_MAP[GALLERY_ITEMS[lightboxIndex].id] || IMAGES.fallbacks.heroPizza}
                  alt={GALLERY_ITEMS[lightboxIndex].title}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
                />
              </div>

              <div className="mt-4 text-center text-white max-w-xl">
                <span className="text-xs uppercase tracking-widest text-[#C83B28] font-bold block mb-1">
                  {language === 'en' ? GALLERY_ITEMS[lightboxIndex].categoryEn : GALLERY_ITEMS[lightboxIndex].category}
                </span>
                <h4 className="font-display text-2xl font-bold">
                  {language === 'en' ? GALLERY_ITEMS[lightboxIndex].titleEn : GALLERY_ITEMS[lightboxIndex].title}
                </h4>
                <p className="text-xs sm:text-sm text-white/80 font-light mt-1">
                  {language === 'en' ? GALLERY_ITEMS[lightboxIndex].captionEn : GALLERY_ITEMS[lightboxIndex].caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
