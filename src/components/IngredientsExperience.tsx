import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INGREDIENTS_DATA, IngredientStory } from '../data/restaurantData';
import { Compass, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function IngredientsExperience() {
  const { language, t } = useLanguage();
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientStory>(INGREDIENTS_DATA[0]);

  return (
    <section id="ingredients" className="py-24 lg:py-32 bg-[#291C17] text-[#F8F3E9] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C83B28]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#343A25]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C83B28] font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>{t('Signature N° 02 · Terroirs & Origines', 'Signature No. 02 · Terroirs & Provenance')}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8F3E9] mb-4">
            {t("L'Excellence des Ingrédients Italiens", 'The Excellence of Italian Terroirs')}
          </h2>
          <p className="text-base sm:text-lg text-[#F8F3E9]/80 font-light leading-relaxed">
            {t(
              'Chaque saveur servie à La Felicità commence par un choix sans compromis. Nos produits sont directement sélectionnés chez des artisans et producteurs italiens certifiés DOP et IGP.',
              'Every flavor served at La Felicità begins with an uncompromising commitment to terroir. Our ingredients are directly sourced from certified Italian DOP and IGP artisanal producers.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Navigation List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-[#F8F3E9]/50 font-mono mb-2">
              {t('Sélectionnez un ingrédient d’exception', 'Select an artisanal ingredient')}
            </span>
            {INGREDIENTS_DATA.map((item) => {
              const isActive = selectedIngredient.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedIngredient(item)}
                  type="button"
                  className={`text-left p-4 rounded-xs border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#F8F3E9] text-[#291C17] border-[#F8F3E9] shadow-xl translate-x-1.5'
                      : 'bg-[#F8F3E9]/5 text-[#F8F3E9]/80 border-[#F8F3E9]/10 hover:bg-[#F8F3E9]/10 hover:text-[#F8F3E9]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] uppercase tracking-wider font-semibold ${isActive ? 'text-[#C83B28]' : 'text-[#F8F3E9]/60'}`}>
                      {language === 'en' ? item.originEn : item.origin}
                    </span>
                    {isActive && <Sparkles className="w-3.5 h-3.5 text-[#C83B28]" />}
                  </div>
                  <div className="font-display text-xl font-bold mt-1">
                    {language === 'en' ? item.nameEn : item.name}
                  </div>
                  <div className={`text-xs mt-0.5 italic ${isActive ? 'text-[#291C17]/70' : 'text-[#F8F3E9]/50'}`}>
                    {item.italianName}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Detail Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIngredient.id}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="bg-[#F8F3E9]/5 border border-[#F8F3E9]/15 rounded-xs p-8 lg:p-10 relative overflow-hidden backdrop-blur-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F8F3E9]/15 pb-6 mb-8">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#C83B28] font-bold block mb-1">
                      {selectedIngredient.italianName}
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#F8F3E9]">
                      {language === 'en' ? selectedIngredient.nameEn : selectedIngredient.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs bg-[#F8F3E9]/10 px-3 py-1.5 rounded-xs text-[#F8F3E9]/90 border border-[#F8F3E9]/20">
                    <MapPin className="w-3.5 h-3.5 text-[#C83B28]" />
                    <span>{language === 'en' ? selectedIngredient.originEn : selectedIngredient.origin}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#F8F3E9]/60 font-semibold mb-2">
                      {t('Profil & Goût Authentique', 'Flavor Profile & Authenticity')}
                    </h4>
                    <p className="text-base sm:text-lg text-[#F8F3E9]/90 font-light leading-relaxed">
                      {language === 'en' ? selectedIngredient.descriptionEn : selectedIngredient.description}
                    </p>
                  </div>

                  <div className="bg-[#291C17]/60 p-5 rounded-xs border border-[#F8F3E9]/10 space-y-3">
                    <h4 className="text-xs uppercase tracking-widest text-[#C83B28] font-semibold flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      {t('Terroir & Traçabilité Garantie', 'Terroir & Protected Traceability')}
                    </h4>
                    <p className="text-sm text-[#F8F3E9]/80 leading-relaxed font-light">
                      {language === 'en' ? selectedIngredient.terroirNoteEn : selectedIngredient.terroirNote}
                    </p>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#F8F3E9]/75">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C83B28]" />
                      <span>{t('Appellation d’Origine Protégée (DOP)', 'Protected Designation of Origin (DOP)')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C83B28]" />
                      <span>{t('Arrivages directs d’Italie', 'Direct weekly shipments from Italy')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C83B28]" />
                      <span>{t('Respect des saisons', 'Seasonal peak harvest')}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
