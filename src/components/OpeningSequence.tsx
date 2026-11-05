import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IMAGES } from '../data/restaurantData';

interface OpeningSequenceProps {
  onComplete: () => void;
}

export default function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Automatically complete after a short, cinematic 2.8s display
    const timer = setTimeout(() => {
      handleFinish();
    }, 2800);

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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#F8F3E9] overflow-hidden"
          role="dialog"
          aria-label="Introduction La Felicità"
        >
          {/* Subtle background photo reveal with editorial scrim */}
          <motion.div
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.22 }}
            transition={{ duration: 2.2, ease: 'easeOut' }}
            className="absolute inset-0 bg-cover bg-center pointer-events-none filter blur-[1px]"
            style={{ backgroundImage: `url(${IMAGES.heroPizza})` }}
          />

          {/* Grain and paper texture overlay */}
          <div className="absolute inset-0 bg-[#F8F3E9]/85 pointer-events-none" />

          {/* Central Editorial Sequence */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
            {/* Italian Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xs uppercase tracking-[0.35em] text-[#343A25] font-medium mb-3"
            >
              Grenoble · Quai Perrière · Dal Cuore d’Italia
            </motion.div>

            {/* Oversized Brand Typography with Mask Reveal */}
            <div className="overflow-hidden py-2">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ delay: 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#291C17] font-semibold"
              >
                LA FELICITÀ
              </motion.h1>
            </div>

            {/* Tomato-red hairline traversing the composition */}
            <div className="w-full max-w-md h-[2px] bg-[#C83B28]/20 my-4 relative overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ delay: 0.6, duration: 1.6, ease: 'easeInOut' }}
                className="absolute inset-y-0 w-24 bg-[#C83B28]"
              />
            </div>

            {/* Subtitle statement */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="font-display italic text-lg sm:text-2xl text-[#291C17]/80"
            >
              « Un assaggio d’Italia, cuit au feu de bois. »
            </motion.p>
          </div>

          {/* Skip button for zero-latency direct access */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            onClick={handleFinish}
            className="absolute bottom-8 right-8 text-xs uppercase tracking-widest text-[#291C17]/60 hover:text-[#C83B28] transition-colors py-2 px-3 border border-[#291C17]/15 rounded-sm hover:border-[#C83B28]/50"
          >
            Accéder au site →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
