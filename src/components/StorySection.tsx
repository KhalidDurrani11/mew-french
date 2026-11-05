import { Heart, Flame, UtensilsCrossed, Clock } from 'lucide-react';
import { RESTAURANT_INFO, IMAGES } from '../data/restaurantData';
import { useLanguage } from '../context/LanguageContext';
import ImageWithFallback from './ImageWithFallback';

export default function StorySection() {
  const { language, t } = useLanguage();

  return (
    <section id="histoire" className="py-24 lg:py-32 bg-[#F8F3E9] text-[#291C17] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-sm overflow-hidden shadow-2xl border border-[#291C17]/10 aspect-4/3 group">
              <ImageWithFallback
                src={IMAGES.restaurantInterior}
                fallbackSrc={IMAGES.fallbacks.restaurantInterior}
                fallbackSources={[IMAGES.local.restaurantInterior, '/images/restaurant_interior.jpg']}
                alt="Intérieur chaleureux du restaurant La Felicità Grenoble Quai Perrière"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#291C17]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-[#F8F3E9] p-4 bg-[#291C17]/80 backdrop-blur-xs rounded-xs">
                <span className="text-[11px] uppercase tracking-widest text-[#C83B28] font-bold block mb-0.5">
                  Quai Perrière · Grenoble
                </span>
                <p className="text-xs text-[#F8F3E9]/90 font-light">
                  {t(
                    'Au pied de la Bastille, le parfum du feu de bois et la chaleur des tablées italiennes.',
                    'At the foot of the Bastille, the fragrance of wood fire and the warmth of Italian gatherings.'
                  )}
                </p>
              </div>
            </div>

            <div className="hidden sm:block absolute -top-6 -left-6 bg-[#C83B28] text-[#F8F3E9] p-4 rounded-xs shadow-lg text-center max-w-[130px]">
              <span className="text-2xl font-display font-bold block leading-none">20+</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold block mt-1">
                {t('Années de tradition', 'Years of craft')}
              </span>
            </div>
          </div>

          {/* Editorial Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C83B28] font-semibold">
              <Heart className="w-3.5 h-3.5" />
              <span>{t('Hospitalité & Tradition', 'Hospitality & Tradition')}</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#291C17] leading-[1.1] text-balance">
              {language === 'en' ? RESTAURANT_INFO.storyHeadlineEn : RESTAURANT_INFO.storyHeadline}
            </h2>

            <p className="text-lg text-[#291C17]/85 font-light leading-relaxed">
              {t(
                "Installé sur les berges historiques du Quai Perrière à Grenoble, face aux remparts et au murmure de l’Isère, La Felicità est une invitation sincère à partager le meilleur de la table italienne.",
                "Nestled on the historic riverbanks of Quai Perrière in Grenoble, overlooking the ancient ramparts and the flowing Isère river, La Felicità is a heartfelt invitation to savor authentic Italian culinary heritage."
              )}
            </p>

            <p className="text-sm sm:text-base text-[#291C17]/75 font-light leading-relaxed">
              {t(
                "Ici, nous cultivons le respect du geste artisanal : nos pâtes fraîches sont laminées quotidiennement, nos gratins et pizzas dorent sous la flamme d’un véritable four à bois, et notre fameux tiramisù perpétue la recette secrète du chef depuis plus de vingt ans.",
                "Here, culinary heritage comes first: our fresh pasta is rolled every morning, our calzones, gratins, and pizzas bake under live stone-oven flame, and our legendary tiramisù follows the chef's secret family recipe crafted for over two decades."
              )}
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#291C17]/10">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xs bg-[#291C17]/5 text-[#C83B28] shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-[#291C17]">
                    {t('Cuisson au Feu de Bois', 'Wood-Fired Hearth')}
                  </h4>
                  <p className="text-xs text-[#291C17]/70">
                    {t('Pizzas, calzones et gratins du chef saisis à haute braise.', 'Pizzas, calzones, and gratins seared over live hardwood flame.')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xs bg-[#291C17]/5 text-[#C83B28] shrink-0">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-[#291C17]">
                    {t('Pâtes Fraîches Maison', 'Fresh Handmade Pasta')}
                  </h4>
                  <p className="text-xs text-[#291C17]/70">
                    {t('Tagliatelles, ravioles et linguine aux sauces mijotées.', 'Tagliatelle, ravioli, and linguine tossed in slow-simmered sauces.')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xs bg-[#291C17]/5 text-[#C83B28] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-[#291C17]">
                    {t('Pâte Reposée 48h', '48h Slow Cold Rise')}
                  </h4>
                  <p className="text-xs text-[#291C17]/70">
                    {t('Fermentation lente pour une légèreté et digestion parfaite.', 'Extended fermentation for exquisite airiness and digestibility.')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xs bg-[#291C17]/5 text-[#C83B28] shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-[#291C17]">
                    {t('Accueil Italien Sincère', 'Warm Italian Welcome')}
                  </h4>
                  <p className="text-xs text-[#291C17]/70">
                    {t('Une ambiance familiale et chaleureuse pour vos déjeuners et dîners.', 'Generous, authentic Italian hospitality for every lunch and dinner.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
