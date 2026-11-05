import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Sparkles, Utensils, Wine, Download, ExternalLink, Calendar, Heart } from 'lucide-react';
import { MENU_ITEMS, MenuItem, RESTAURANT_INFO, IMAGES } from '../data/restaurantData';
import { useLanguage } from '../context/LanguageContext';
import ImageWithFallback from './ImageWithFallback';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDishForReservation?: (dishName: string) => void;
}

type CategoryKey = 'all' | 'pizza_rosso' | 'pizza_bianco' | 'pasta' | 'gratins_secondi' | 'antipasti' | 'dolci' | 'bevande';

export default function MenuModal({ isOpen, onClose, onSelectDishForReservation }: MenuModalProps) {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyVegetarian, setOnlyVegetarian] = useState(false);

  const categories = useMemo(() => [
    { key: 'all' as CategoryKey, label: t('Toute la Carte', 'Full Menu'), count: MENU_ITEMS.length },
    { key: 'pizza_rosso' as CategoryKey, label: t('Pizzas Rosso', 'Red Pizzas'), count: MENU_ITEMS.filter(m => m.category === 'pizza_rosso').length },
    { key: 'pizza_bianco' as CategoryKey, label: t('Pizzas Bianco & Signatures', 'White Pizzas & Signatures'), count: MENU_ITEMS.filter(m => m.category === 'pizza_bianco').length },
    { key: 'pasta' as CategoryKey, label: t('Pâtes Fraîches Maison', 'Handmade Pasta'), count: MENU_ITEMS.filter(m => m.category === 'pasta').length },
    { key: 'gratins_secondi' as CategoryKey, label: t('Gratins & Plats', 'Gratins & Mains'), count: MENU_ITEMS.filter(m => m.category === 'gratins_secondi').length },
    { key: 'antipasti' as CategoryKey, label: t('Antipasti', 'Antipasti'), count: MENU_ITEMS.filter(m => m.category === 'antipasti').length },
    { key: 'dolci' as CategoryKey, label: t('Desserts du Chef', 'Chef Desserts'), count: MENU_ITEMS.filter(m => m.category === 'dolci').length },
    { key: 'bevande' as CategoryKey, label: t('Vins & Boissons', 'Wines & Drinks'), count: MENU_ITEMS.filter(m => m.category === 'bevande').length },
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
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-hidden"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F8F3E9] text-[#291C17] w-full max-w-5xl h-[92vh] max-h-[900px] rounded-xs shadow-2xl border border-[#291C17]/20 flex flex-col overflow-hidden relative"
          >
            {/* Top Bar of the Modal */}
            <div className="p-6 border-b border-[#291C17]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F8F3E9]/90 shrink-0">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C83B28] font-bold">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>La Felicità · 34 Quai Perrière Grenoble</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#291C17] mt-1">
                  {t('La Carte des Saveurs', 'The Gastronomic Menu')}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  type="button"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider font-semibold text-[#291C17] bg-[#291C17]/5 hover:bg-[#291C17]/10 border border-[#291C17]/15 rounded-xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#C83B28]" />
                  <span>{t('Imprimer', 'Print')}</span>
                </button>
                <a
                  href={RESTAURANT_INFO.eatbuUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider font-semibold text-[#291C17] bg-[#291C17]/5 hover:bg-[#291C17]/10 border border-[#291C17]/15 rounded-xs transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#C83B28]" />
                  <span>Eatbu</span>
                </a>
                <button
                  onClick={onClose}
                  type="button"
                  className="p-2 text-[#291C17]/70 hover:text-[#C83B28] hover:bg-[#291C17]/5 rounded-xs transition-colors cursor-pointer ml-auto sm:ml-0"
                  aria-label="Fermer le menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Sticky Filtering Controls */}
            <div className="px-6 py-3 border-b border-[#291C17]/10 bg-[#f3ece0] space-y-3 shrink-0">
              {/* Category tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      type="button"
                      className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-[#291C17] text-white shadow-xs'
                          : 'bg-white/60 text-[#291C17]/75 hover:bg-white hover:text-[#291C17]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`ml-1.5 text-[10px] tabular-nums font-mono ${isActive ? 'text-[#C83B28]' : 'text-[#291C17]/40'}`}>
                        ({cat.count})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search + Veg */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="w-3.5 h-3.5 text-[#291C17]/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder={t('Rechercher un plat (truffe, burrata...)', 'Search dish (truffle, burrata...)')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#291C17]/15 rounded-xs focus:outline-none focus:border-[#C83B28] text-[#291C17]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setOnlyVegetarian(!onlyVegetarian)}
                  className={`self-start sm:self-auto px-3 py-1.5 text-xs font-medium rounded-xs border transition-colors cursor-pointer ${
                    onlyVegetarian
                      ? 'bg-[#343A25] text-white border-[#343A25]'
                      : 'bg-white text-[#291C17]/70 border-[#291C17]/15 hover:text-[#291C17]'
                  }`}
                >
                  🌱 {t('Végétarien uniquement', 'Vegetarian only')}
                </button>
              </div>
            </div>

            {/* Scrollable Dish Catalog */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Chef Feature Card inside Modal */}
              {selectedCategory === 'all' && searchQuery === '' && !onlyVegetarian && (
                <div className="bg-[#291C17] text-[#F8F3E9] p-5 sm:p-6 rounded-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-lg border border-[#291C17]/20">
                  <div className="md:col-span-4 aspect-16/10 rounded-xs overflow-hidden relative">
                    <ImageWithFallback
                      src={IMAGES.burrataPizza}
                      fallbackSrc={IMAGES.fallbacks.burrataPizza}
                      fallbackSources={[IMAGES.local.burrataPizza, '/images/burrata_pizza.jpg']}
                      alt="Pizza La Felicità"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-8 space-y-2">
                    <span className="text-[11px] uppercase tracking-widest text-[#C83B28] font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {t('Pizza Éponyme du Chef', 'Chef’s Flagship Pizza')}
                    </span>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                        La Félicità
                      </h3>
                      <span className="font-display text-2xl font-bold text-[#C83B28] tabular-nums">
                        16,00 €
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                      {t(
                        'Base crème onctueuse à la truffe noire d’Italie, généreuse burrata truffée entière, roquette et tomates séchées.',
                        'Velvety Italian black truffle cream base, whole truffled burrata, fresh rocket, and slow-dried tomatoes.'
                      )}
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          onClose();
                          if (onSelectDishForReservation) {
                            onSelectDishForReservation('La Félicità (Pizza Truffe & Burrata)');
                          }
                        }}
                        type="button"
                        className="px-4 py-2 text-xs uppercase tracking-wider font-semibold text-white bg-[#C83B28] hover:bg-[#b53220] rounded-xs transition-colors cursor-pointer"
                      >
                        {t('Réserver pour déguster ce plat', 'Book a table for this dish')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white/70 hover:bg-white rounded-xs border border-[#291C17]/10 transition-all hover:shadow-xs flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-baseline justify-between gap-3 mb-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-display text-xl font-bold text-[#291C17] group-hover:text-[#C83B28] transition-colors">
                            {language === 'en' && item.nameEn ? item.nameEn : item.name}
                          </h4>
                          {item.isVegetarian && (
                            <span className="text-xs" title="Plat Végétarien">🌱</span>
                          )}
                        </div>
                        <span className="font-display text-xl font-bold text-[#291C17] tabular-nums shrink-0">
                          {item.price.toFixed(2).replace('.', ',')} €
                        </span>
                      </div>

                      {(item.badge || item.badgeEn) && (
                        <div className="text-[10px] font-semibold text-[#C83B28] uppercase tracking-wider mb-1">
                          ★ {language === 'en' && item.badgeEn ? item.badgeEn : item.badge}
                        </div>
                      )}

                      <p className="text-xs text-[#291C17]/75 font-light leading-relaxed mb-2">
                        {language === 'en' && item.descriptionEn ? item.descriptionEn : item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#291C17]/5 flex items-center justify-between text-[11px]">
                      {(item.pairing || item.pairingEn) ? (
                        <span className="text-[#343A25] flex items-center gap-1 opacity-80">
                          <Wine className="w-3 h-3 text-[#C83B28]" />
                          <span className="truncate max-w-[180px] sm:max-w-[220px]">
                            {language === 'en' && item.pairingEn ? item.pairingEn : item.pairing}
                          </span>
                        </span>
                      ) : (
                        <span />
                      )}

                      <button
                        onClick={() => {
                          onClose();
                          if (onSelectDishForReservation) {
                            onSelectDishForReservation(item.name);
                          }
                        }}
                        type="button"
                        className="text-[#C83B28] hover:text-[#9e2c1d] font-semibold text-[11px] underline cursor-pointer shrink-0 ml-2"
                      >
                        {t('Réserver →', 'Book table →')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-12 text-[#291C17]/60">
                  <p className="font-display text-xl">{t('Aucun plat ne correspond.', 'No dishes match your criteria.')}</p>
                  <button
                    onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setOnlyVegetarian(false); }}
                    type="button"
                    className="mt-2 text-xs font-semibold text-[#C83B28] underline cursor-pointer"
                  >
                    {t('Réinitialiser', 'Reset')}
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Bar with Direct Reservation Action */}
            <div className="p-4 border-t border-[#291C17]/10 bg-[#f8f3e9] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="text-xs text-[#291C17]/70 flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#C83B28]" />
                <span>
                  {t(
                    'Pâte à fermentation lente 48h · Ingrédients certifiés DOP & IGP',
                    '48-hour slow fermentation dough · Certified DOP & IGP ingredients'
                  )}
                </span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="px-4 py-2 text-xs font-semibold text-[#291C17] border border-[#291C17]/20 rounded-xs hover:border-[#C83B28] transition-colors tabular-nums text-center w-full sm:w-auto"
                >
                  {RESTAURANT_INFO.phoneDisplay}
                </a>
                <button
                  onClick={() => {
                    onClose();
                    if (onSelectDishForReservation) {
                      onSelectDishForReservation('Menu Découverte');
                    }
                  }}
                  type="button"
                  className="px-5 py-2 text-xs uppercase tracking-wider font-semibold text-white bg-[#C83B28] hover:bg-[#b53220] rounded-xs transition-colors shadow-xs text-center w-full sm:w-auto cursor-pointer"
                >
                  {t('Réserver une table', 'Book a Table')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
