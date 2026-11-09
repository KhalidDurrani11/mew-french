import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IMAGES } from '../data/restaurantData';
import { useLanguage } from '../context/LanguageContext';
import { Flame } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

interface OpeningSequenceProps {
  onComplete: () => void;
}

export default function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  // Clear any past session storage cache so the loader always displays
  useEffect(() => {
    try {
      sessionStorage.removeItem('felicita_intro_seen');
      localStorage.removeItem('felicita_intro_seen');
    } catch {}

    const timer = setTimeout(() => {
      handleFinish();
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  const handleFinish = () => {
    setIsVisible(false);
    setTimeout(onComplete, 600);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FAF6F0] overflow-hidden"
          role="dialog"
          aria-label="Introduction La Felicità"
        >
          {/* Subtle background photo reveal with editorial scrim */}
          <motion.div
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.18 }}
            transition={{ duration: 2.4, ease: 'easeOut' }}
            className="absolute inset-0 pointer-events-none filter blur-[1px] overflow-hidden"
          >
            <ImageWithFallback
              src={IMAGES.heroPizza}
              fallbackSrc={IMAGES.fallbacks.heroPizza}
              fallbackSources={[IMAGES.local.heroPizza, '/images/hero_pizza.jpg']}
              alt="La Felicità Grenoble"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          {/* Warm paper gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/90 via-[#FAF6F0]/80 to-[#FAF6F0]/95 pointer-events-none" />

          {/* Floating fire glow in background */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#C83B28]/10 blur-3xl pointer-events-none" />

          {/* Central Editorial Sequence */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
            {/* Flame Icon & Location Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-[#C83B28] font-bold mb-4"
            >
              <Flame className="w-3.5 h-3.5 animate-pulse" />
              <span>Grenoble · 34 Quai Perrière · Dal Cuore d’Italia</span>
            </motion.div>

            {/* Oversized Brand Typography with Mask Reveal */}
            <div className="overflow-hidden py-1 sm:py-2">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ delay: 0.35, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#1A1412] font-bold drop-shadow-xs"
              >
                LA FELICITÀ
              </motion.h1>
            </div>

            {/* Sub-kicker */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#1A1412]/60 font-semibold mt-1 mb-4"
            >
              Ristorante & Pizzeria al Forno a Legna
            </motion.p>

            {/* Red & Gold traversing laser hairline */}
            <div className="w-64 sm:w-80 h-[2px] bg-[#1A1412]/10 my-2 relative overflow-hidden rounded-full">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ delay: 0.5, duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
                className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-[#C83B28] to-transparent"
              />
            </div>

            {/* Poetic statement */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="font-serif-subtle italic text-lg sm:text-2xl text-[#1A1412]/80 mt-3"
            >
              « {t('Un assaggio d’Italia, cuit au feu de bois.', 'A taste of Italy, baked over wood fire.')} »
            </motion.p>

            {/* Progress dot pulse */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="flex items-center gap-1.5 mt-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C83B28] animate-ping" />
              <span className="text-[10px] uppercase tracking-widest text-[#1A1412]/40 font-mono">
                {t('Chargement de l’expérience...', 'Loading experience...')}
              </span>
            </motion.div>
          </div>

          {/* Instant Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            onClick={handleFinish}
            type="button"
            className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 text-xs uppercase tracking-widest text-[#1A1412]/70 hover:text-[#C83B28] transition-colors py-2 px-4 border border-[#1A1412]/15 rounded-full hover:border-[#C83B28]/50 cursor-pointer bg-white/70 backdrop-blur-xs font-semibold shadow-xs"
          >
            {t('Entrer sur le site →', 'Enter site →')}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
