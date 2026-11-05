import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles, MapPin, Flame } from 'lucide-react';
import { RESTAURANT_INFO, IMAGES } from '../data/restaurantData';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export default function HeroSection({ onOpenReservation, onExploreMenu }: HeroSectionProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX / width - 0.5) * 16;
    const y = (clientY / height - 0.5) * 16;
    setMousePos({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#291C17] text-[#F8F3E9] pt-24 pb-16 px-6 lg:px-12"
    >
      {/* Cinematic Background with Parallax & Subtle Zoom */}
      <motion.div
        animate={{
          x: mousePos.x * -1,
          y: mousePos.y * -1,
          scale: 1.05,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 60 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGES.heroPizza})` }}
      />

      {/* Luxury Cinematic Contrast Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#291C17] via-[#291C17]/65 to-[#291C17]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#291C17]/30 to-[#291C17]/80 pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Kicker badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#F8F3E9]/80 mb-6 font-medium"
        >
          <Flame className="w-3.5 h-3.5 text-[#C83B28]" />
          <span>Four à bois traditionnel</span>
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
          Ristorante & Pizzeria
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-[#F8F3E9] leading-[1.05] text-balance mb-6 drop-shadow-md"
        >
          {RESTAURANT_INFO.tagline}
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="max-w-2xl text-base sm:text-lg lg:text-xl text-[#F8F3E9]/85 font-light leading-relaxed mb-10 text-balance"
        >
          {RESTAURANT_INFO.subTagline}
        </motion.p>

        {/* Primary & Secondary Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onExploreMenu}
            type="button"
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm uppercase tracking-widest font-semibold text-[#F8F3E9] bg-[#C83B28] hover:bg-[#b53220] rounded-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
          >
            Découvrir notre carte
          </button>

          <button
            onClick={onOpenReservation}
            type="button"
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm uppercase tracking-widest font-semibold text-[#F8F3E9] bg-transparent hover:bg-[#F8F3E9]/10 border border-[#F8F3E9]/35 hover:border-[#F8F3E9] rounded-sm transition-all duration-200 cursor-pointer"
          >
            Réserver une table
          </button>
        </motion.div>

        {/* Real Address and Opening status indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-14 pt-6 border-t border-[#F8F3E9]/15 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-[#F8F3E9]/75"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#C83B28]" />
            <span>34 Quai Perrière, 38000 Grenoble</span>
          </div>
          <span aria-hidden="true" className="hidden sm:inline text-[#F8F3E9]/30">|</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C83B28]" />
            <span>Midi & Soir du Lundi au Dimanche (Jeudi sur résa)</span>
          </div>
          <span aria-hidden="true" className="hidden sm:inline text-[#F8F3E9]/30">|</span>
          <div className="flex items-center gap-1.5 text-[#F8F3E9]">
            <Sparkles className="w-3 h-3 text-[#C83B28]" />
            <span className="font-medium">Pâte alvéolée reposée 48h</span>
          </div>
        </motion.div>
      </div>

      {/* Down indicator */}
      <a
        href="#pizza-reveal"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[#F8F3E9]/60 hover:text-[#C83B28] transition-colors flex flex-col items-center gap-1 cursor-pointer"
        aria-label="Découvrir la suite"
      >
        <span className="text-[10px] uppercase tracking-widest">Explorer</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
