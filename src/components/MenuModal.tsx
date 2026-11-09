import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Sparkles, Utensils, Wine, Download, ExternalLink, Calendar, Flame, Check, FileText } from 'lucide-react';
import { MENU_ITEMS, MenuItem, RESTAURANT_INFO, IMAGES } from '../data/restaurantData';
import { useLanguage } from '../context/LanguageContext';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDishForReservation?: (dishName: string) => void;
}

type CategoryKey = 
  | 'all' 
  | 'bufala_pizza' 
  | 'trad_pizza' 
  | 'raviole_pizza' 
  | 'calzone' 
  | 'pasta' 
  | 'entrees_salades' 
  | 'viandes_poissons' 
  | 'desserts' 
  | 'boissons_vins';

export default function MenuModal({ isOpen, onClose, onSelectDishForReservation }: MenuModalProps) {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'halal' | 'wood'>('all');

  const categories = useMemo(() => [
    { key: 'all' as CategoryKey, label: t('Toute la Carte', 'Full Menu'), count: MENU_ITEMS.length },
    { key: 'bufala_pizza' as CategoryKey, label: t('Pizzas Bufala', 'Bufala Specials'), count: MENU_ITEMS.filter(m => m.category === 'bufala_pizza').length },
    { key: 'trad_pizza' as CategoryKey, label: t('Pizzas Traditionnelles', 'Classic Pizzas'), count: MENU_ITEMS.filter(m => m.category === 'trad_pizza').length },
    { key: 'raviole_pizza' as CategoryKey, label: t('Pizzas Ravioles', 'Ravioles Pizzas'), count: MENU_ITEMS.filter(m => m.category === 'raviole_pizza').length },
    { key: 'calzone' as CategoryKey, label: t('Calzones', 'Calzones'), count: MENU_ITEMS.filter(m => m.category === 'calzone').length },
    { key: 'pasta' as CategoryKey, label: t('Pâtes Fraîches', 'Fresh Pasta'), count: MENU_ITEMS.filter(m => m.category === 'pasta').length },
    { key: 'entrees_salades' as CategoryKey, label: t('Entrées & Salades', 'Starters & Salads'), count: MENU_ITEMS.filter(m => m.category === 'entrees_salades').length },
    { key: 'viandes_poissons' as CategoryKey, label: t('Viandes & Poissons', 'Meat & Fish'), count: MENU_ITEMS.filter(m => m.category === 'viandes_poissons').length },
    { key: 'desserts' as CategoryKey, label: t('Desserts', 'Desserts'), count: MENU_ITEMS.filter(m => m.category === 'desserts').length },
    { key: 'boissons_vins' as CategoryKey, label: t('Vins & Boissons', 'Wines & Drinks'), count: MENU_ITEMS.filter(m => m.category === 'boissons_vins').length },
  ], [language]);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      let matchesDiet = true;
      if (dietaryFilter === 'veg') matchesDiet = !!item.isVegetarian;
      if (dietaryFilter === 'halal') matchesDiet = !!item.isHalal;
      if (dietaryFilter === 'wood') matchesDiet = !!item.isWoodFired;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.nameEn && item.nameEn.toLowerCase().includes(q)) ||
        item.description.toLowerCase().includes(q) ||
        (item.descriptionEn && item.descriptionEn.toLowerCase().includes(q)) ||
        (item.badge && item.badge.toLowerCase().includes(q));

      return matchesCategory && matchesDiet && matchesSearch;
    });
  }, [selectedCategory, dietaryFilter, searchQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-hidden"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F8F3E9] text-[#291C17] w-full max-w-6xl h-[94vh] max-h-[920px] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#291C17]/20 flex flex-col overflow-hidden relative"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-[#291C17]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F8F3E9]/95 shrink-0">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C83B28] font-bold">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>La Felicità · 34 Quai Perrière Grenoble</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#291C17] mt-0.5">
                  {t('La Carte Complète du Restaurant', 'The Complete Restaurant Menu')}
                </h2>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href="/menu.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider font-bold text-white bg-[#C83B28] hover:bg-[#b53220] rounded-xs transition-colors cursor-pointer shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t('Carte PDF', 'PDF Menu')}</span>
                </a>
                <button
                  onClick={() => window.print()}
                  type="button"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider font-semibold text-[#291C17] bg-[#291C17]/5 hover:bg-[#291C17]/10 border border-[#291C17]/15 rounded-xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#C83B28]" />
                  <span>{t('Imprimer', 'Print')}</span>
                </button>
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

            {/* Filter Tabs & Search in Modal */}
            <div className="px-4 sm:px-6 py-3 border-b border-[#291C17]/10 bg-white/50 shrink-0 space-y-3">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      type="button"
                      className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-[#291C17] text-[#F8F3E9] shadow-xs'
                          : 'bg-[#291C17]/5 text-[#291C17]/75 hover:bg-[#291C17]/10 hover:text-[#291C17]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`ml-1.5 text-[10px] tabular-nums font-mono ${isActive ? 'text-[#C83B28]' : 'text-[#291C17]/50'}`}>
                        ({cat.count})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search & Dietary Filters */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#291C17]/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('Rechercher plat, ingrédient...', 'Search dish, ingredient...')}
                    className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-[#291C17]/15 rounded-xs focus:outline-none focus:border-[#C83B28]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#291C17]/50 hover:text-[#291C17]"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDietaryFilter('all')}
                    className={`px-2 py-1 text-[11px] rounded-xs font-medium cursor-pointer ${
                      dietaryFilter === 'all' ? 'bg-[#C83B28] text-white' : 'bg-[#291C17]/5 text-[#291C17]/70'
                    }`}
                  >
                    {t('Tous', 'All')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDietaryFilter(dietaryFilter === 'veg' ? 'all' : 'veg')}
                    className={`px-2 py-1 text-[11px] rounded-xs font-medium cursor-pointer ${
                      dietaryFilter === 'veg' ? 'bg-[#C83B28] text-white' : 'bg-[#291C17]/5 text-[#291C17]/70'
                    }`}
                  >
                    🌱 {t('Végétarien', 'Veg')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDietaryFilter(dietaryFilter === 'halal' ? 'all' : 'halal')}
                    className={`px-2 py-1 text-[11px] rounded-xs font-medium cursor-pointer ${
                      dietaryFilter === 'halal' ? 'bg-[#C83B28] text-white' : 'bg-[#291C17]/5 text-[#291C17]/70'
                    }`}
                  >
                    🥩 {t('Halal', 'Halal')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDietaryFilter(dietaryFilter === 'wood' ? 'all' : 'wood')}
                    className={`px-2 py-1 text-[11px] rounded-xs font-medium cursor-pointer ${
                      dietaryFilter === 'wood' ? 'bg-[#C83B28] text-white' : 'bg-[#291C17]/5 text-[#291C17]/70'
                    }`}
                  >
                    🔥 {t('Four à bois', 'Wood fire')}
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Items Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {filteredItems.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-display text-xl text-[#291C17]/70">
                    {t('Aucun plat ne correspond à vos critères.', 'No dishes match your criteria.')}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setDietaryFilter('all');
                    }}
                    className="mt-3 text-xs uppercase tracking-wider text-[#C83B28] font-bold hover:underline cursor-pointer"
                  >
                    {t('Réinitialiser', 'Reset filters')}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xs bg-white border border-[#291C17]/10 hover:border-[#C83B28]/40 transition-colors shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-1.5">
                          <div>
                            <h4 className="font-display text-xl font-bold text-[#291C17] leading-tight">
                              {item.name}
                            </h4>
                            {item.nameEn && language === 'en' && item.nameEn !== item.name && (
                              <span className="text-[11px] text-[#291C17]/60 italic block">
                                {item.nameEn}
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-base font-bold text-[#C83B28] tabular-nums shrink-0">
                            {item.priceDisplay ? item.priceDisplay.split('|')[0] : `${item.price.toFixed(2)} €`}
                          </span>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-2">
                          {item.badge && (
                            <span className="px-1.5 py-0.5 text-[9px] uppercase font-bold tracking-wider bg-[#C83B28]/10 text-[#C83B28] rounded-2xs">
                              {language === 'en' && item.badgeEn ? item.badgeEn : item.badge}
                            </span>
                          )}
                          {item.isWoodFired && (
                            <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-[#291C17]/5 text-[#291C17]/80 rounded-2xs flex items-center gap-0.5">
                              <Flame className="w-2.5 h-2.5 text-[#C83B28]" />
                              <span>{t('Feu de bois', 'Wood fire')}</span>
                            </span>
                          )}
                          {item.isVegetarian && (
                            <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-emerald-50 text-emerald-800 rounded-2xs">
                              🌱 {t('Végétarien', 'Veg')}
                            </span>
                          )}
                          {item.isHalal && (
                            <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-amber-50 text-amber-900 rounded-2xs">
                              🥩 {t('Halal', 'Halal')}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-xs text-[#291C17]/75 font-light leading-relaxed mb-2">
                          {language === 'en' ? item.descriptionEn : item.description}
                        </p>

                        {/* Options note */}
                        {item.optionsNote && (
                          <div className="text-[11px] p-1.5 bg-[#F8F3E9] rounded-2xs text-[#291C17]/90 font-medium mb-2 border-l-2 border-[#C83B28]">
                            {language === 'en' && item.optionsNoteEn ? item.optionsNoteEn : item.optionsNote}
                          </div>
                        )}

                        {/* Sizing display if full list */}
                        {item.priceDisplay && item.priceDisplay.includes('|') && (
                          <div className="text-[11px] text-[#291C17]/80 font-mono mb-2">
                            {item.priceDisplay}
                          </div>
                        )}
                      </div>

                      {/* Footer actions */}
                      <div className="pt-2 border-t border-[#291C17]/5 flex items-center justify-between gap-2 mt-2">
                        {item.pairing ? (
                          <div className="flex items-center gap-1 text-[11px] text-[#291C17]/60 truncate" title={item.pairing}>
                            <Wine className="w-3 h-3 text-[#C83B28] shrink-0" />
                            <span className="truncate">{language === 'en' && item.pairingEn ? item.pairingEn : item.pairing}</span>
                          </div>
                        ) : <div />}

                        {onSelectDishForReservation && (
                          <button
                            type="button"
                            onClick={() => {
                              onSelectDishForReservation(item.name);
                              onClose();
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] uppercase tracking-wider font-semibold text-[#291C17] hover:text-[#C83B28] bg-[#291C17]/5 hover:bg-[#C83B28]/10 rounded-xs transition-colors shrink-0 cursor-pointer"
                          >
                            <Calendar className="w-3 h-3 text-[#C83B28]" />
                            <span>{t('Choisir ce plat', 'Select dish')}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Bottom Bar */}
            <div className="p-4 sm:p-5 border-t border-[#291C17]/10 bg-[#F8F3E9] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="text-xs text-[#291C17]/70">
                <span className="font-semibold text-[#291C17]">{t('Commandes & Vente à emporter :', 'Takeaway & Phone orders:')}</span>{' '}
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-[#C83B28] font-bold tabular-nums hover:underline">
                  {RESTAURANT_INFO.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs uppercase tracking-wider font-semibold text-[#291C17] bg-[#291C17]/5 hover:bg-[#291C17]/10 rounded-xs transition-colors cursor-pointer"
                >
                  {t('Fermer', 'Close')}
                </button>
                {onSelectDishForReservation && (
                  <button
                    type="button"
                    onClick={() => {
                      onSelectDishForReservation('Menu complet');
                      onClose();
                    }}
                    className="px-5 py-2 text-xs uppercase tracking-wider font-bold text-white bg-[#C83B28] hover:bg-[#b53220] rounded-xs transition-colors cursor-pointer shadow-xs"
                  >
                    {t('Réserver une Table', 'Book a Table')}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
