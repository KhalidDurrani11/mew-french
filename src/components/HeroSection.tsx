import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, Flame, UtensilsCrossed, Thermometer, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO, IMAGES } from '../data/restaurantData';
import { useLanguage } from '../context/LanguageContext';
import ImageWithFallback from './ImageWithFallback';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
}

export default function HeroSection({ onOpenReservation, onOpenMenu }: HeroSectionProps) {
  const { language, t } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX / width - 0.5) * 16;
    const y = (clientY / height - 0.5) * 16;
    setMousePos({ x, y });
  };

  const marqueeItems = [
    t('Cuisson au feu de bois 450°C', 'Wood-fired stone oven 450°C'),
    t('Pâte alvéolée reposée 48h', '48-hour slow-fermented dough'),
    t('Mozzarella di Bufala Campana DOP', 'Mozzarella di Bufala Campana DOP'),
    t('Pâtes fraîches laminées maison', 'Handmade fresh pasta rolled daily'),
    t('Quai Perrière au pied de la Bastille', 'Quai Perrière by the Bastille'),
    t('Vins nobles & Chianti Classico', 'Noble Italian wines & Chianti'),
  ];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#291C17] text-[#F8F3E9] pt-28 pb-6 px-6 lg:px-12"
    >
      {/* Cinematic Background Image with Multi-Tier Fallback guaranteed on Netlify & GitHub Pages */}
      <motion.div
        animate={{
          x: mousePos.x * -1,
          y: mousePos.y * -1,
          scale: 1.05,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 60 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <ImageWithFallback
          src={IMAGES.heroPizza}
          fallbackSrc={IMAGES.fallbacks.heroPizza}
          fallbackSources={[IMAGES.local.heroPizza, '/images/hero_pizza.jpg']}
          alt="La Felicità pizza au feu de bois"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Luxury Cinematic Contrast Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#291C17] via-[#291C17]/70 to-[#291C17]/45 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#291C17]/35 to-[#291C17]/90 pointer-events-none" />

      {/* Ambient Floating Fire Embers Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute w-1.5 h-1.5 rounded-full bg-[#C83B28] top-1/4 left-1/5 animate-float blur-[0.5px]" />
        <div className="absolute w-2 h-2 rounded-full bg-[#E65A32] top-1/2 left-3/4 animate-pulse-glow blur-[1px]" />
        <div className="absolute w-1 h-1 rounded-full bg-[#F8F3E9] top-2/3 left-1/3 animate-float blur-[0.5px]" />
        <div className="absolute w-2.5 h-2.5 rounded-full bg-[#C83B28] top-1/3 right-1/4 animate-ember blur-[1.5px]" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center my-auto">
        {/* Animated Kicker badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#F8F3E9]/80 mb-5 font-medium"
        >
          <Flame className="w-3.5 h-3.5 text-[#C83B28] animate-pulse" />
          <span>{t('Four à bois traditionnel', 'Traditional Wood-Fired Oven')}</span>
          <span aria-hidden="true" className="text-[#C83B28]">·</span>
          <span>Grenoble Quai Perrière</span>
        </motion.div>

        {/* Restaurant Wordmark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-xs sm:text-sm tracking-[0.45em] uppercase text-[#F8F3E9]/70 mb-3 font-semibold"
        >
          {t('Ristorante & Pizzeria', 'Italian Restaurant & Pizzeria')}
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-[#F8F3E9] leading-[1.05] text-balance mb-6 drop-shadow-md"
        >
          {language === 'en' ? RESTAURANT_INFO.taglineEn : RESTAURANT_INFO.tagline}
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="max-w-2xl text-base sm:text-lg lg:text-xl text-[#F8F3E9]/85 font-light leading-relaxed mb-9 text-balance"
        >
          {language === 'en' ? RESTAURANT_INFO.subTaglineEn : RESTAURANT_INFO.subTagline}
        </motion.p>

        {/* Primary & Secondary Actions with SEPARATE DIRECT MENU BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* SEPARATE MENU BUTTON: Direct Click Opens the Menu Modal */}
          <button
            onClick={onOpenMenu}
            type="button"
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm uppercase tracking-widest font-bold text-[#291C17] bg-[#F8F3E9] hover:bg-white rounded-xs transition-all duration-200 shadow-xl hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <UtensilsCrossed className="w-4 h-4 text-[#C83B28] group-hover:rotate-12 transition-transform" />
            <span>{t('Ouvrir la Carte des Plats', 'Open Food Menu')}</span>
          </button>

          <button
            onClick={onOpenReservation}
            type="button"
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm uppercase tracking-widest font-semibold text-[#F8F3E9] bg-[#C83B28] hover:bg-[#b53220] rounded-xs transition-all duration-200 shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            {t('Réserver une table', 'Book a Table')}
          </button>
        </motion.div>

        {/* Address and Opening status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-10 pt-5 border-t border-[#F8F3E9]/15 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-[#F8F3E9]/75"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#C83B28]" />
            <span>34 Quai Perrière, 38000 Grenoble</span>
          </div>
          <span aria-hidden="true" className="hidden sm:inline text-[#F8F3E9]/30">|</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C83B28]" />
            <span>{t('Midi & Soir 7j/7 (Jeudi sur réservation)', 'Lunch & Dinner 7d/7 (Thu by booking)')}</span>
          </div>
          <span aria-hidden="true" className="hidden sm:inline text-[#F8F3E9]/30">|</span>
          <div className="flex items-center gap-1.5 text-[#F8F3E9]">
            <Sparkles className="w-3 h-3 text-[#C83B28]" />
            <span className="font-medium">{t('Pâte alvéolée reposée 48h', '48h Slow-Fermented Crust')}</span>
          </div>
        </motion.div>
      </div>

      {/* Animated Infinite Marquee Banner along bottom of Hero */}
      <div className="relative z-10 w-full overflow-hidden py-3 border-t border-[#F8F3E9]/10 text-xs tracking-widest uppercase text-[#F8F3E9]/60">
        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] gap-8">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 shrink-0">
              <span className="font-mono text-[#C83B28]">★</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
