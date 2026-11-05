import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Utensils, Wine, Download, ExternalLink } from 'lucide-react';
import { MENU_ITEMS, MenuItem, RESTAURANT_INFO, IMAGES } from '../data/restaurantData';
import { useLanguage } from '../context/LanguageContext';
import ImageWithFallback from './ImageWithFallback';

interface MenuSectionProps {
  onOpenReservation: () => void;
  onOpenMenu?: () => void;
}

type CategoryKey = 'all' | 'pizza_rosso' | 'pizza_bianco' | 'pasta' | 'gratins_secondi' | 'antipasti' | 'dolci' | 'bevande';

export default function MenuSection({ onOpenReservation, onOpenMenu }: MenuSectionProps) {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyVegetarian, setOnlyVegetarian] = useState(false);
  const [activeDish, setActiveDish] = useState<MenuItem | null>(null);

  const categories = useMemo(() => [
    { key: 'all' as CategoryKey, label: t('Toute la Carte', 'Full Menu'), count: MENU_ITEMS.length },
    { key: 'pizza_rosso' as CategoryKey, label: t('Pizzas Base Tomate', 'Tomato Base Pizzas'), count: MENU_ITEMS.filter(m => m.category === 'pizza_rosso').length },
    { key: 'pizza_bianco' as CategoryKey, label: t('Pizzas Base Crème & Signatures', 'White Base & Signatures'), count: MENU_ITEMS.filter(m => m.category === 'pizza_bianco').length },
    { key: 'pasta' as CategoryKey, label: t('Pâtes Fraîches Maison', 'Fresh Handmade Pasta'), count: MENU_ITEMS.filter(m => m.category === 'pasta').length },
    { key: 'gratins_secondi' as CategoryKey, label: t('Gratins & Plats', 'Wood-Fired Gratins & Mains'), count: MENU_ITEMS.filter(m => m.category === 'gratins_secondi').length },
    { key: 'antipasti' as CategoryKey, label: t('Antipasti & Entrées', 'Antipasti & Starters'), count: MENU_ITEMS.filter(m => m.category === 'antipasti').length },
    { key: 'dolci' as CategoryKey, label: t('Desserts du Chef', 'Chef’s Desserts'), count: MENU_ITEMS.filter(m => m.category === 'dolci').length },
    { key: 'bevande' as CategoryKey, label: t('Vins d’Italie & Boissons', 'Italian Wines & Drinks'), count: MENU_ITEMS.filter(m => m.category === 'bevande').length },
  ], [language]);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesVeg = !onlyVegetarian || item.isVegetarian;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        (item.nameEn && item.nameEn.toLowerCase().includes(q)) ||
        item.description.toLowerCase().includes(q) ||
        (item.descriptionEn && item.descriptionEn.toLowerCase().includes(q));
      return matchesCategory && matchesVeg && matchesSearch;
    });
  }, [selectedCategory, onlyVegetarian, searchQuery]);

  return (
    <section id="carte" className="py-24 lg:py-32 bg-[#F8F3E9] text-[#291C17] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#291C17]/10 pb-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C83B28] font-semibold mb-2">
              <Utensils className="w-3.5 h-3.5" />
              <span>{t('Signature N° 03 · Gastronomie & Carte', 'Signature No. 03 · Gastronomy & Menu')}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#291C17]">
              {t('La Carte de La Felicità', 'The Menu at La Felicità')}
            </h2>
            <p className="text-sm sm:text-base text-[#291C17]/70 font-light mt-2 max-w-xl">
              {t(
                'Toutes nos préparations sont faites maison avec des produits nobles d’Italie, cuites dans notre four à bois de pierre réfractaire.',
                'All dishes are made in-house using authentic Italian DOP ingredients, baked in our stone wood-fired oven.'
              )}
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-3">
            {onOpenMenu && (
              <button
                onClick={onOpenMenu}
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs uppercase tracking-wider font-bold text-white bg-[#C83B28] hover:bg-[#b53220] rounded-xs transition-colors cursor-pointer shadow-xs"
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>{t('Ouvrir la Carte Plein Écran', 'Open Full Screen Menu')}</span>
              </button>
            )}
            <button
              onClick={() => window.print()}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wider font-semibold text-[#291C17] bg-[#291C17]/5 hover:bg-[#291C17]/10 border border-[#291C17]/15 rounded-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#C83B28]" />
              <span>{t('Imprimer la Carte', 'Print Menu')}</span>
            </button>
            <a
              href={RESTAURANT_INFO.eatbuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wider font-semibold text-[#291C17] bg-[#291C17]/5 hover:bg-[#291C17]/10 border border-[#291C17]/15 rounded-xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#C83B28]" />
              <span>{t('Carte Officielle Eatbu', 'Official Eatbu Page')}</span>
            </a>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  type="button"
                  className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#291C17] text-[#F8F3E9] shadow-md'
                      : 'bg-[#291C17]/5 text-[#291C17]/80 hover:bg-[#291C17]/10 hover:text-[#291C17]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`ml-2 text-[10px] tabular-nums font-mono ${isActive ? 'text-[#C83B28]' : 'text-[#291C17]/50'}`}>
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#291C17]/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder={t('Rechercher un plat, ingrédient (truffe, burrata...)', 'Search dish or ingredient (truffle, burrata...)')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white/80 border border-[#291C17]/15 rounded-xs focus:outline-none focus:border-[#C83B28] text-[#291C17]"
              />
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setOnlyVegetarian(!onlyVegetarian)}
                className={`px-3 py-1.5 text-xs font-medium rounded-xs border transition-colors cursor-pointer ${
                  onlyVegetarian
                    ? 'bg-[#343A25] text-[#F8F3E9] border-[#343A25]'
                    : 'bg-white/80 text-[#291C17]/70 border-[#291C17]/15 hover:text-[#291C17]'
                }`}
              >
                🌱 {t('Options Végétariennes uniquement', 'Vegetarian Options Only')}
              </button>
            </div>
          </div>
        </div>

        {/* Flagship Highlight Banner */}
        {selectedCategory === 'all' && searchQuery === '' && !onlyVegetarian && (
          <div className="mb-12 bg-[#291C17] text-[#F8F3E9] rounded-sm p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-xl border border-[#291C17]/20">
            <div className="md:col-span-5 relative aspect-4/3 rounded-xs overflow-hidden">
              <ImageWithFallback
                src={IMAGES.burrataPizza}
                fallbackSrc={IMAGES.fallbacks.burrataPizza}
                fallbackSources={[IMAGES.local.burrataPizza, '/images/burrata_pizza.jpg']}
                alt="Pizza La Felicità Signature à la truffe et burrata"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C83B28] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('La Signature Iconique du Chef', 'The Chef’s Iconic Signature')}</span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#F8F3E9]">
                  La Félicità ({t('Pizza Éponyme', 'Flagship Pizza')})
                </h3>
                <span className="font-display text-2xl font-bold text-[#C83B28] tabular-nums shrink-0">
                  16,00 €
                </span>
              </div>
              <p className="text-sm text-[#F8F3E9]/85 font-light leading-relaxed">
                {t(
                  'Base crème onctueuse à la truffe noire d’Italie, généreuse burrata truffée entière déposée au centre, roquette poivrée et tomates séchées fondantes.',
                  'Velvety Italian black truffle cream base, molten whole truffled burrata placed in the center, peppery rocket, and slow-dried sweet tomatoes.'
                )}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenReservation}
                  type="button"
                  className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#F8F3E9] bg-[#C83B28] hover:bg-[#b53220] rounded-xs cursor-pointer transition-colors"
                >
                  {t('Réserver et Déguster', 'Book and Taste')}
                </button>
                <span className="text-xs text-[#F8F3E9]/60 italic">
                  {t('Accord conseillé : Chianti Riserva DOCG', 'Suggested pairing: Chianti Riserva DOCG')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveDish(item)}
              className="group cursor-pointer p-4 -mx-4 rounded-xs hover:bg-white/60 transition-colors border-b border-[#291C17]/10"
            >
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#291C17] group-hover:text-[#C83B28] transition-colors">
                    {language === 'en' && item.nameEn ? item.nameEn : item.name}
                  </h3>
                  {item.isVegetarian && (
                    <span className="text-xs" title="Plat Végétarien">🌱</span>
                  )}
                </div>
                <div className="font-display text-xl sm:text-2xl font-bold text-[#291C17] tabular-nums shrink-0">
                  {item.price.toFixed(2).replace('.', ',')} €
                </div>
              </div>

              {(item.badge || item.badgeEn) && (
                <div className="text-[11px] font-semibold text-[#C83B28] uppercase tracking-wider mb-1">
                  ★ {language === 'en' && item.badgeEn ? item.badgeEn : item.badge}
                </div>
              )}

              <p className="text-xs sm:text-sm text-[#291C17]/75 font-light leading-relaxed">
                {language === 'en' && item.descriptionEn ? item.descriptionEn : item.description}
              </p>

              {(item.pairing || item.pairingEn) && (
                <div className="mt-2 text-[11px] text-[#343A25] font-medium flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                  <Wine className="w-3 h-3 text-[#C83B28]" />
                  <span>{t('Accord :', 'Pairing:')} {language === 'en' && item.pairingEn ? item.pairingEn : item.pairing}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-[#291C17]/60">
            <p className="font-display text-2xl">{t('Aucun plat ne correspond à votre recherche.', 'No dishes match your search query.')}</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setOnlyVegetarian(false); }}
              type="button"
              className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#C83B28] underline cursor-pointer"
            >
              {t('Réinitialiser les filtres', 'Reset filters')}
            </button>
          </div>
        )}

        {/* Dish Detail Modal */}
        <AnimatePresence>
          {activeDish && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
              onClick={() => setActiveDish(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#F8F3E9] text-[#291C17] max-w-lg w-full p-8 rounded-xs shadow-2xl border border-[#291C17]/15 relative"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#C83B28] font-bold block mb-1">
                      {language === 'en' && activeDish.badgeEn ? activeDish.badgeEn : activeDish.badge || t('Spécialité Maison', 'House Special')}
                    </span>
                    <h3 className="font-display text-3xl font-bold text-[#291C17]">
                      {language === 'en' && activeDish.nameEn ? activeDish.nameEn : activeDish.name}
                    </h3>
                  </div>
                  <span className="font-display text-2xl font-bold text-[#C83B28] tabular-nums">
                    {activeDish.price.toFixed(2).replace('.', ',')} €
                  </span>
                </div>

                <p className="text-sm text-[#291C17]/85 font-light leading-relaxed mb-6">
                  {language === 'en' && activeDish.descriptionEn ? activeDish.descriptionEn : activeDish.description}
                </p>

                {(activeDish.pairing || activeDish.pairingEn) && (
                  <div className="p-3 bg-[#291C17]/5 rounded-xs border border-[#291C17]/10 mb-6">
                    <span className="text-[11px] uppercase tracking-wider text-[#343A25] font-semibold flex items-center gap-1.5 mb-1">
                      <Wine className="w-3.5 h-3.5 text-[#C83B28]" />
                      {t('Suggestion d’accord du sommelier', 'Sommelier pairing recommendation')}
                    </span>
                    <p className="text-xs text-[#291C17]/80">
                      {language === 'en' && activeDish.pairingEn ? activeDish.pairingEn : activeDish.pairing}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#291C17]/10">
                  <button
                    onClick={() => setActiveDish(null)}
                    type="button"
                    className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-[#291C17]/70 hover:text-[#291C17] cursor-pointer"
                  >
                    {t('Fermer', 'Close')}
                  </button>
                  <button
                    onClick={() => {
                      setActiveDish(null);
                      onOpenReservation();
                    }}
                    type="button"
                    className="px-6 py-2.5 text-xs uppercase tracking-widest font-semibold text-[#F8F3E9] bg-[#C83B28] hover:bg-[#b53220] rounded-xs cursor-pointer"
                  >
                    {t('Réserver une table', 'Book a Table')}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
