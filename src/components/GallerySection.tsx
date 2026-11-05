import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';

export default function GallerySection() {
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
    <section id="galerie" className="py-24 lg:py-32 bg-[#291C17] text-[#F8F3E9] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#F8F3E9]/15 pb-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C83B28] font-semibold mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Signature N° 04 · Exposition Photographique</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8F3E9]">
              L'Atmosphère de La Felicità
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs uppercase tracking-widest text-[#F8F3E9]/60 font-mono">
            34 Quai Perrière · Grenoble
          </p>
        </div>

        {/* Asymmetrical Editorial Gallery Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Item 1: Large Featured Lead (Wood-Fired Pizza) */}
          <div
            onClick={() => setLightboxIndex(0)}
            className="md:col-span-8 group relative aspect-16/10 rounded-sm overflow-hidden bg-[#291C17] cursor-pointer border border-[#F8F3E9]/15 shadow-2xl"
          >
            <img
              src={GALLERY_ITEMS[0].src}
              alt={GALLERY_ITEMS[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#291C17]/85 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#C83B28] font-bold block mb-1">
                  {GALLERY_ITEMS[0].category}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F8F3E9]">
                  {GALLERY_ITEMS[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#F8F3E9]/80 font-light mt-1 max-w-md hidden sm:block">
                  {GALLERY_ITEMS[0].caption}
                </p>
              </div>
              <div className="p-2.5 rounded-full bg-[#F8F3E9]/20 text-white backdrop-blur-sm group-hover:bg-[#C83B28] transition-colors shrink-0">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Item 2: Tall Interior Ambiance */}
          <div
            onClick={() => setLightboxIndex(3)}
            className="md:col-span-4 group relative aspect-3/4 rounded-sm overflow-hidden bg-[#291C17] cursor-pointer border border-[#F8F3E9]/15 shadow-2xl"
          >
            <img
              src={GALLERY_ITEMS[3].src}
              alt={GALLERY_ITEMS[3].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#291C17]/85 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[11px] uppercase tracking-widest text-[#C83B28] font-bold block mb-1">
                {GALLERY_ITEMS[3].category}
              </span>
              <h3 className="font-display text-2xl font-bold text-[#F8F3E9]">
                {GALLERY_ITEMS[3].title}
              </h3>
              <p className="text-xs text-[#F8F3E9]/80 font-light mt-1">
                {GALLERY_ITEMS[3].caption}
              </p>
            </div>
          </div>

          {/* Item 3: Handmade Tagliatelle */}
          <div
            onClick={() => setLightboxIndex(2)}
            className="md:col-span-4 group relative aspect-4/3 rounded-sm overflow-hidden bg-[#291C17] cursor-pointer border border-[#F8F3E9]/15 shadow-xl"
          >
            <img
              src={GALLERY_ITEMS[2].src}
              alt={GALLERY_ITEMS[2].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#291C17]/85 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[11px] uppercase tracking-widest text-[#C83B28] font-bold block">
                {GALLERY_ITEMS[2].category}
              </span>
              <h3 className="font-display text-xl font-bold text-[#F8F3E9]">
                {GALLERY_ITEMS[2].title}
              </h3>
            </div>
          </div>

          {/* Item 4: Burrata & Truffle Signature Pizza */}
          <div
            onClick={() => setLightboxIndex(1)}
            className="md:col-span-4 group relative aspect-4/3 rounded-sm overflow-hidden bg-[#291C17] cursor-pointer border border-[#F8F3E9]/15 shadow-xl"
          >
            <img
              src={GALLERY_ITEMS[1].src}
              alt={GALLERY_ITEMS[1].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#291C17]/85 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[11px] uppercase tracking-widest text-[#C83B28] font-bold block">
                {GALLERY_ITEMS[1].category}
              </span>
              <h3 className="font-display text-xl font-bold text-[#F8F3E9]">
                {GALLERY_ITEMS[1].title}
              </h3>
            </div>
          </div>

          {/* Item 5: Tiramisù Signature */}
          <div
            onClick={() => setLightboxIndex(4)}
            className="md:col-span-4 group relative aspect-4/3 rounded-sm overflow-hidden bg-[#291C17] cursor-pointer border border-[#F8F3E9]/15 shadow-xl"
          >
            <img
              src={GALLERY_ITEMS[4].src}
              alt={GALLERY_ITEMS[4].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#291C17]/85 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[11px] uppercase tracking-widest text-[#C83B28] font-bold block">
                {GALLERY_ITEMS[4].category}
              </span>
              <h3 className="font-display text-xl font-bold text-[#F8F3E9]">
                {GALLERY_ITEMS[4].title}
              </h3>
            </div>
          </div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-md"
              onClick={() => setLightboxIndex(null)}
              role="dialog"
              aria-modal="true"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                type="button"
                className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
                aria-label="Fermer l'exposition"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                type="button"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Active Image Stage */}
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
              >
                <div className="relative rounded-sm overflow-hidden shadow-2xl max-h-[70vh] flex items-center justify-center">
                  <img
                    src={GALLERY_ITEMS[lightboxIndex].src}
                    alt={GALLERY_ITEMS[lightboxIndex].title}
                    className="max-h-[70vh] w-auto max-w-full object-contain rounded-xs"
                  />
                </div>
                <div className="text-center mt-6 max-w-2xl text-white">
                  <span className="text-[11px] uppercase tracking-widest text-[#C83B28] font-bold block mb-1">
                    {GALLERY_ITEMS[lightboxIndex].category} · {lightboxIndex + 1} / {GALLERY_ITEMS.length}
                  </span>
                  <h3 className="font-display text-3xl font-bold">
                    {GALLERY_ITEMS[lightboxIndex].title}
                  </h3>
                  <p className="text-sm text-white/80 font-light mt-2">
                    {GALLERY_ITEMS[lightboxIndex].caption}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
