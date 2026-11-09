import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, Flame, UtensilsCrossed, Clock } from 'lucide-react';
import { RESTAURANT_INFO, IMAGES } from '../data/restaurantData';
import { useLanguage } from '../context/LanguageContext';
import { getLiveRestaurantStatus, RestaurantStatus } from '../utils/openingHours';
import ImageWithFallback from './ImageWithFallback';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
}

export default function HeroSection({ onOpenReservation, onOpenMenu }: HeroSectionProps) {
  const { language, t } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [liveStatus, setLiveStatus] = useState<RestaurantStatus | null>(null);

  useEffect(() => {
    setLiveStatus(getLiveRestaurantStatus());
    const interval = setInterval(() => {
      setLiveStatus(getLiveRestaurantStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX / width - 0.5) * 12;
    const y = (clientY / height - 0.5) * 12;
    setMousePos({ x, y });
  };

  const marqueeItems = [
    t('Cuisson au feu de bois 450°C', 'Wood-fired stone oven 450°C'),
    t('Pâte alvéolée reposée 48h', '48-hour slow-fermented dough'),
    t('Mozzarella di Bufala Campana DOP', 'Mozzarella di Bufala Campana DOP'),
    t('Pâtes fraîches maison façonnées minute', 'Handmade fresh pasta cooked to order'),
    t('Spécialités Ravioles du Dauphiné', 'Dauphiné Ravioles specialties'),
    t('Terrasse sur les Quais de l’Isère', 'Riverside terrace by the Bastille'),
    t('Vins nobles d’Italie & Chianti Classico', 'Noble Italian wines & Chianti'),
  ];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#291C17] text-[#F8F3E9] pt-28 sm:pt-32 pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 lg:px-12"
    >
      {/* Cinematic Parallax Hero Pizza Background */}
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
          alt="La Felicità pizza au feu de bois Quai Perrière Grenoble"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Luxury Cinematic Contrast Scrims */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#291C17] via-[#291C17]/75 to-[#291C17]/50 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#291C17]/35 to-[#291C17]/90 pointer-events-none" />

      {/* Ambient Floating Fire Embers Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-45">
        <div className="absolute w-1.5 h-1.5 rounded-full bg-[#C83B28] top-1/4 left-1/5 animate-float blur-[0.5px]" />
        <div className="absolute w-2 h-2 rounded-full bg-[#E65A32] top-1/2 left-3/4 animate-pulse-glow blur-[1px]" />
        <div className="absolute w-1 h-1 rounded-full bg-[#F8F3E9] top-2/3 left-1/3 animate-float blur-[0.5px]" />
        <div className="absolute w-2.5 h-2.5 rounded-full bg-[#C83B28] top-1/3 right-1/4 animate-ember blur-[1.5px]" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center my-auto px-2 py-4">
        {/* Live Status Badge in dark luxury glass */}
        {liveStatus && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#F8F3E9]/20 text-xs text-[#F8F3E9] mb-4 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${liveStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${liveStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </span>
            <span className="font-semibold">
              {language === 'en' ? liveStatus.labelEn : liveStatus.labelFr}
            </span>
            <span className="text-[#F8F3E9]/30">·</span>
            <span className="text-[#F8F3E9]/75 hidden sm:inline">
              {language === 'en' ? liveStatus.detailEn : liveStatus.detailFr}
            </span>
          </motion.div>
        )}

        {/* Subtitle kicker */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#F8F3E9]/90 mb-3 font-semibold"
        >
          <Flame className="w-3.5 h-3.5 text-[#C83B28] animate-pulse" />
          <span>{t('Four à bois traditionnel 450°C', 'Traditional Wood-Fired Oven 450°C')}</span>
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
          {t('Ristorante & Pizzeria al Forno a Legna', 'Wood-Fired Ristorante & Pizzeria')}
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-[#F8F3E9] leading-[1.05] text-balance mb-6 drop-shadow-lg"
        >
          {language === 'en' ? RESTAURANT_INFO.taglineEn : RESTAURANT_INFO.tagline}
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="max-w-2xl text-base sm:text-lg lg:text-xl text-[#F8F3E9]/85 font-light leading-relaxed mb-8 text-balance drop-shadow-sm"
        >
          {language === 'en' ? RESTAURANT_INFO.subTaglineEn : RESTAURANT_INFO.subTagline}
        </motion.p>

        {/* Primary Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
        >
          {/* Menu Modal CTA */}
          <button
            onClick={onOpenMenu}
            type="button"
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm uppercase tracking-widest font-bold text-[#291C17] bg-[#F8F3E9] hover:bg-white rounded-full transition-all duration-200 shadow-xl hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group active:scale-95"
          >
            <UtensilsCrossed className="w-4 h-4 text-[#C83B28] group-hover:rotate-12 transition-transform" />
            <span>{t('Ouvrir la Carte des Plats', 'Open Food & Wine Menu')}</span>
          </button>

          {/* Reservation CTA */}
          <button
            onClick={onOpenReservation}
            type="button"
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm uppercase tracking-widest font-bold text-white bg-[#C83B28] hover:bg-[#b53220] rounded-full transition-all duration-200 shadow-xl hover:-translate-y-0.5 cursor-pointer active:scale-95"
          >
            {t('Réserver une Table', 'Book a Table')}
          </button>
        </motion.div>

        {/* Floating Minimalist Info Pill in dark luxury glass */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-8 sm:mt-10 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-6 sm:px-8 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-[#F8F3E9]/15 text-xs text-[#F8F3E9]/85 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#C83B28]" />
            <span className="font-semibold text-[#F8F3E9]">34 Quai Perrière · Grenoble</span>
          </div>
          <span aria-hidden="true" className="hidden sm:inline text-[#F8F3E9]/25">|</span>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#C83B28]" />
            <span>{t('Midi dès 12h10 · Soir dès 18h30', 'Lunch from 12:10 · Dinner from 18:30')}</span>
          </div>
          <span aria-hidden="true" className="hidden sm:inline text-[#F8F3E9]/25">|</span>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C83B28]" />
            <span>{t('Pâte levée 48h & Produits DOP', '48h Dough & DOP Italian')}</span>
          </div>
        </motion.div>
      </div>

      {/* Transparent Classy Minimalist Sliding Ticker — Completely Detached from bottom border! */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-8 sm:mt-10">
        <div className="relative overflow-hidden py-3 sm:py-3.5 rounded-full bg-transparent border border-[#F8F3E9]/20 text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#F8F3E9]/80">
          {/* Left & Right Smooth Edge Fade Masks in Dark Hero Tone */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#291C17] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#291C17] to-transparent z-10" />

          {/* Slightly Faster, Smooth Infinite Sliding Animation */}
          <div className="flex whitespace-nowrap animate-[marquee_16s_linear_infinite] gap-8">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div key={idx} className="flex items-center gap-8 shrink-0">
                <span className="font-mono text-[#C83B28]">★</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
