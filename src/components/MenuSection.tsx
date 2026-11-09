import { useState } from 'react';
import { motion } from 'motion/react';
import { Utensils, FileText, ArrowUpRight, Flame, Sparkles, Download, Eye, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO, IMAGES } from '../data/restaurantData';
import { useLanguage } from '../context/LanguageContext';
import ImageWithFallback from './ImageWithFallback';

interface MenuSectionProps {
  onOpenReservation: (dishName?: string) => void;
  onOpenMenu: () => void;
}

interface FlagshipItem {
  name: string;
  tag: string;
  desc: string;
  descEn: string;
  price: string;
  image: string;
  isWoodFired?: boolean;
}

export default function MenuSection({ onOpenReservation, onOpenMenu }: MenuSectionProps) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'pizzas' | 'pastas' | 'desserts'>('pizzas');

  // Curated flagship highlights for homepage elegance (No wall of text!)
  const flagshipItems: Record<'pizzas' | 'pastas' | 'desserts', FlagshipItem[]> = {
    pizzas: [
      {
        name: 'La Burrata Bufala',
        tag: 'Spécialité du Chef',
        desc: 'Sauce tomate, Mozzarella di Bufala Campana, cœur de burrata crémeux, tomates confites, roquette & crème balsamique.',
        descEn: 'San Marzano tomatoes, Bufala Campana mozzarella, whole creamy burrata, confit tomatoes, wild rocket & balsamic glaze.',
        price: '16.90 €',
        image: IMAGES.burrataPizza,
        isWoodFired: true,
      },
      {
        name: 'La Culatello',
        tag: 'Épicée & Noble',
        desc: 'Sauce tomate, Chorizo, Spianata calabrese piquante, Bufala Campana, copeaux de Parmigiano Reggiano AOP & basilic.',
        descEn: 'Tomato sauce, chorizo, spicy Calabrian spianata, Bufala mozzarella, aged Parmigiano Reggiano shavings & fresh basil.',
        price: '16.90 €',
        image: IMAGES.heroPizza,
        isWoodFired: true,
      },
      {
        name: 'Calzone Roma',
        tag: 'Four à Bois',
        desc: 'Chausson doré : viande hachée halal, aubergines fondantes, câpres, persillade maison, mozzarella & olives.',
        descEn: 'Folded wood-fired calzone: halal beef, roasted aubergines, capers, parsley butter, mozzarella & olives.',
        price: '16.00 €',
        image: IMAGES.calzone,
        isWoodFired: true,
      },
    ],
    pastas: [
      {
        name: 'Fruits de Mer & Gambas',
        tag: 'Pâtes Fraîches',
        desc: 'Linguine ou Tagliatelle fraîches, crème délicate, Grana Padano, basilic frais et gambas sautées minute.',
        descEn: 'Fresh linguine or tagliatelle, gentle cream, Grana Padano, fresh basil and seared king gambas prawns.',
        price: '16.90 €',
        image: IMAGES.freshPasta,
      },
      {
        name: '4 Formaggi au Four à Bois',
        tag: 'Gratiné au Four',
        desc: 'Chèvre, Gorgonzola crémeux, Grana Padano, Mozzarella, le tout gratiné et bouillonnant sous la braise.',
        descEn: 'Goat cheese, creamy Gorgonzola, Grana Padano, Mozzarella, baked bubbling in the wood oven.',
        price: '15.90 €',
        image: IMAGES.freshPasta,
        isWoodFired: true,
      },
      {
        name: 'Gratin d’Aubergines du Chef',
        tag: 'Recette Historique',
        desc: 'Aubergines grillées, chapelure dorée, coulis maison et Grana Padano gratiné au feu de bois.',
        descEn: 'Layered grilled aubergines, golden crust, house coulis and wood-fired Grana Padano.',
        price: '14.50 €',
        image: IMAGES.heroPizza,
        isWoodFired: true,
      },
    ],
    desserts: [
      {
        name: 'Tiramisù Tradizionale',
        tag: 'Signature Maison',
        desc: 'Recette historique du chef depuis plus de 20 ans : espresso serré, crème mascarpone aérienne & cacao amer.',
        descEn: 'Historic chef recipe for over 20 years: rich espresso ladyfingers, velvety mascarpone cream & bitter cocoa.',
        price: '7.50 €',
        image: IMAGES.tiramisu,
      },
      {
        name: 'Panna Cotta Mangue',
        tag: 'Douceur Fraîche',
        desc: 'Crème soyeuse infusée à la vanille bourbon nappée d’un coulis généreux de mangue exotique.',
        descEn: 'Silky bourbon vanilla panna cotta topped with fragrant exotic mango coulis.',
        price: '7.00 €',
        image: IMAGES.pannaCotta,
      },
      {
        name: 'Café Gourmand Dégustation',
        tag: 'Le Grand Final',
        desc: 'Espresso italien servi avec mini tiramisù, panna cotta mangue et boule de glace vanille artisanale.',
        descEn: 'Italian espresso served with mini house tiramisù, mango panna cotta and artisanal vanilla gelato.',
        price: '8.50 €',
        image: IMAGES.tiramisu,
      },
    ]
  };

  return (
    <section id="carte" className="py-20 lg:py-28 bg-[#FAF6F0] text-[#1A1412] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header - Minimal & Punchy */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C83B28]/10 text-[#C83B28] text-xs font-semibold uppercase tracking-widest mb-3">
            <Utensils className="w-3.5 h-3.5" />
            <span>{t('Gastronomie Artisanale', 'Artisanal Gastronomy')}</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1412]">
            {t('Les Incontournables de la Maison', 'Our Signature Creations')}
          </h2>

          <p className="mt-3 text-base text-[#1A1412]/75 font-light max-w-xl mx-auto">
            {t(
              'Un aperçu de nos recettes phares. Pour découvrir l’ensemble de nos 94 spécialités, ouvrez la carte ou téléchargez le menu officiel.',
              'A curated glimpse of our house classics. Explore our complete 94-dish menu or view the official PDF.'
            )}
          </p>

          {/* Minimal Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab('pizzas')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'pizzas'
                  ? 'bg-[#1A1412] text-white shadow-md'
                  : 'bg-[#1A1412]/5 text-[#1A1412]/70 hover:bg-[#1A1412]/10'
              }`}
            >
              🍕 {t('Pizzas au Feu de Bois', 'Wood-Fired Pizzas')}
            </button>
            <button
              onClick={() => setActiveTab('pastas')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'pastas'
                  ? 'bg-[#1A1412] text-white shadow-md'
                  : 'bg-[#1A1412]/5 text-[#1A1412]/70 hover:bg-[#1A1412]/10'
              }`}
            >
              🍝 {t('Pâtes & Gratins', 'Pasta & Gratins')}
            </button>
            <button
              onClick={() => setActiveTab('desserts')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'desserts'
                  ? 'bg-[#1A1412] text-white shadow-md'
                  : 'bg-[#1A1412]/5 text-[#1A1412]/70 hover:bg-[#1A1412]/10'
              }`}
            >
              🍮 {t('Desserts Maison', 'House Desserts')}
            </button>
          </div>
        </div>

        {/* Curated Grid of 3 High-Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {flagshipItems[activeTab].map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
              className="bg-white rounded-xl overflow-hidden border border-[#1A1412]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-[#1A1412]">
                <ImageWithFallback
                  src={item.image}
                  fallbackSrc={IMAGES.fallbacks.heroPizza}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider text-[#1A1412]">
                  {item.tag}
                </span>

                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#C83B28] text-white font-mono text-xs font-bold shadow-md">
                  {item.price}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {item.isWoodFired && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-[#C83B28]">
                        <Flame className="w-3 h-3" />
                        <span>450°C Feu de bois</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#1A1412] mb-2 group-hover:text-[#C83B28] transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#1A1412]/75 font-light leading-relaxed">
                    {language === 'en' ? item.descEn : item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1A1412]/10 flex items-center justify-between">
                  <button
                    onClick={() => onOpenReservation(item.name)}
                    type="button"
                    className="text-xs font-bold uppercase tracking-wider text-[#C83B28] hover:text-[#962D24] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>{t('Commander ce plat', 'Book this dish')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={onOpenMenu}
                    type="button"
                    className="text-[11px] text-[#1A1412]/50 hover:text-[#1A1412] transition-colors cursor-pointer"
                  >
                    {t('Voir carte', 'View in menu')}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2 High-Class Conversion Action Cards (Separate Menu Experience) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Interactive Full Menu Modal */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#1A1412] text-white relative overflow-hidden flex flex-col justify-between group shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C83B28]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C83B28] font-bold block mb-2">
                Expérience Interactive
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-bold mb-3">
                {t('La Carte Complète du Restaurant', 'Explore the Full Menu')}
              </h3>
              <p className="text-sm text-white/75 font-light leading-relaxed mb-6 max-w-md">
                {t(
                  'Explorez l’intégralité de nos 94 propositions : Pizzas Bufala, Pizzas Ravioles locales, Pâtes faites maison, Viandes nobles, Desserts et Vins d’Italie avec filtres et recherche instantanée.',
                  'Browse all 94 dishes: Bufala specials, local ravioles pizzas, fresh pasta, prime steaks, desserts and Italian wines with instant search.'
                )}
              </p>
            </div>

            <div className="relative z-10 pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenMenu}
                type="button"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C83B28] hover:bg-[#e04530] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all hover:scale-102 cursor-pointer active:scale-98"
              >
                <Utensils className="w-4 h-4" />
                <span>{t('Ouvrir la Carte en Plein Écran', 'Open Full Screen Menu')}</span>
              </button>
              <span className="text-xs text-white/50 font-mono">94 créations</span>
            </div>
          </div>

          {/* Card 2: Official PDF Menu (Direct 1-Click Download/View) */}
          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#1A1412]/15 relative overflow-hidden flex flex-col justify-between group shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#1A1412]/5 text-[#1A1412] text-[10px] font-bold uppercase tracking-wider mb-2">
                <FileText className="w-3 h-3 text-[#C83B28]" />
                <span>Format Officiel Restaurant</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-[#1A1412]">
                {t('La Carte Officielle en PDF', 'Official PDF Menu')}
              </h3>
              <p className="text-sm text-[#1A1412]/75 font-light leading-relaxed mb-6 max-w-md">
                {t(
                  'Consultez ou téléchargez le menu original du restaurant sous format PDF haute définition, idéal pour commander à emporter ou choisir à l’avance.',
                  'View or download our original restaurant menu in high definition PDF format, perfect for takeaway orders and quick reference.'
                )}
              </p>
            </div>

            <div className="relative z-10 pt-4 flex flex-wrap items-center gap-3">
              <a
                href="/menu.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1A1412] hover:bg-[#C83B28] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all hover:scale-102 cursor-pointer active:scale-98"
              >
                <Eye className="w-4 h-4" />
                <span>{t('Consulter le PDF', 'View PDF Menu')}</span>
              </a>

              <a
                href="/menu.pdf"
                download="Menu-La-Felicita-Grenoble.pdf"
                className="inline-flex items-center gap-1.5 px-4 py-3.5 bg-[#1A1412]/5 hover:bg-[#1A1412]/10 text-[#1A1412] text-xs font-bold uppercase tracking-wider rounded-full transition-colors"
                title={t('Télécharger le fichier PDF', 'Download PDF file')}
              >
                <Download className="w-4 h-4 text-[#C83B28]" />
                <span>{t('Télécharger', 'Download')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
