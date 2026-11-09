import { motion } from 'motion/react';
import { Flame, Sparkles, Clock, Heart, Award } from 'lucide-react';
import { RESTAURANT_INFO, IMAGES } from '../data/restaurantData';
import { useLanguage } from '../context/LanguageContext';
import ImageWithFallback from './ImageWithFallback';

export default function StorySection() {
  const { language, t } = useLanguage();

  return (
    <section id="histoire" className="py-20 lg:py-28 bg-[#FAF6F0] text-[#1A1412] relative border-t border-[#1A1412]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Visual Column with Elegant Floating Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-4/3 group">
              <ImageWithFallback
                src={IMAGES.restaurantInterior}
                fallbackSrc={IMAGES.fallbacks.restaurantInterior}
                alt="Ambiance chaleureuse La Felicità Grenoble Quai Perrière"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white p-4 glass-dark rounded-xl">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C83B28] font-bold block mb-0.5">
                  Quai Perrière · Grenoble
                </span>
                <p className="text-xs sm:text-sm text-white/90 font-light">
                  {t(
                    'Au bord de l’Isère, face aux remparts et au pied du téléphérique de la Bastille.',
                    'Overlooking the Isère river, at the foot of the historic Bastille cable car.'
                  )}
                </p>
              </div>
            </div>

            {/* Floating Luxury Counter Badge */}
            <div className="absolute -top-3 left-2 sm:-top-6 sm:-left-6 bg-[#C83B28] text-white p-3.5 sm:p-5 rounded-2xl shadow-xl text-center z-10">
              <span className="text-2xl sm:text-3xl font-display font-bold block leading-none">20+</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold block mt-1">
                {t('Ans de Passion', 'Years of Craft')}
              </span>
            </div>
          </div>

          {/* Minimal, Punchy Editorial Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C83B28]/10 text-[#C83B28] text-xs font-semibold uppercase tracking-widest">
              <Heart className="w-3.5 h-3.5" />
              <span>{t('Hospitalité & Terroir', 'Hospitality & Terroir')}</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1412] leading-[1.1]">
              {language === 'en' ? RESTAURANT_INFO.storyHeadlineEn : RESTAURANT_INFO.storyHeadline}
            </h2>

            <p className="text-lg text-[#1A1412]/85 font-light leading-relaxed">
              {t(
                "Face au murmure de l’Isère au 34 Quai Perrière, La Felicità réunit l’exigence de la gastronomie italienne et la convivialité des grandes tablées transalpines.",
                "Facing the flowing Isère river at 34 Quai Perrière, La Felicità unites authentic Italian gastronomy with generous transalpine hospitality."
              )}
            </p>

            <p className="text-sm sm:text-base text-[#1A1412]/70 font-light leading-relaxed">
              {t(
                "Chaque pizza est saisie à plus de 450°C dans notre four à bois de pierre réfractaire après 48h de lente levée. Nos pâtes sont roulées fraîches chaque jour, et notre célèbre tiramisù maison perpétue la recette du chef depuis plus de deux décennies.",
                "Every pizza is baked at over 450°C in our stone wood-fired oven after 48 hours of slow sourdough fermentation. Fresh pasta is rolled daily, and our celebrated tiramisù follows the chef's 20-year recipe."
              )}
            </p>

            {/* 3 Clean Stat Pills (No massive blocks of text!) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 border-t border-[#1A1412]/10 text-center">
              <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#1A1412]/10 shadow-xs">
                <span className="font-display text-xl sm:text-2xl font-bold text-[#C83B28] block">450°C</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#1A1412]/80 block mt-0.5 leading-tight">
                  {t('Four à bois de pierre', 'Wood-fired stone oven')}
                </span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#1A1412]/10 shadow-xs">
                <span className="font-display text-xl sm:text-2xl font-bold text-[#C83B28] block">48 Heures</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#1A1412]/80 block mt-0.5 leading-tight">
                  {t('Fermentation lente', 'Slow sourdough rise')}
                </span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#1A1412]/10 shadow-xs">
                <span className="font-display text-xl sm:text-2xl font-bold text-[#C83B28] block">100%</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#1A1412]/80 block mt-0.5 leading-tight">
                  {t('Fait maison à la minute', 'Fresh to order')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
