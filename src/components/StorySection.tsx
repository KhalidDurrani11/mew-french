import { Heart, Flame, UtensilsCrossed, Clock } from 'lucide-react';
import { RESTAURANT_INFO, IMAGES } from '../data/restaurantData';

export default function StorySection() {
  return (
    <section id="histoire" className="py-24 lg:py-32 bg-[#F8F3E9] text-[#291C17] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Editorial 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Composition with Atmosphere */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-sm overflow-hidden shadow-2xl border border-[#291C17]/10 aspect-4/3 group">
              <img
                src={IMAGES.restaurantInterior}
                alt="Intérieur chaleureux du restaurant La Felicità Grenoble Quai Perrière"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#291C17]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-[#F8F3E9] p-4 bg-[#291C17]/80 backdrop-blur-xs rounded-xs">
                <span className="text-[11px] uppercase tracking-widest text-[#C83B28] font-bold block mb-0.5">
                  Quai Perrière · Grenoble
                </span>
                <p className="text-xs text-[#F8F3E9]/90 font-light">
                  Au pied de la Bastille, le parfum du feu de bois et la chaleur des tablées italiennes.
                </p>
              </div>
            </div>

            {/* Subtle decorative detail stamp */}
            <div className="hidden sm:block absolute -top-6 -left-6 bg-[#C83B28] text-[#F8F3E9] p-4 rounded-xs shadow-lg text-center max-w-[130px]">
              <span className="text-2xl font-display font-bold block leading-none">20+</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold block mt-1">
                Années de tradition
              </span>
            </div>
          </div>

          {/* Right Column: Editorial Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C83B28] font-semibold">
              <Heart className="w-3.5 h-3.5" />
              <span>Hospitalité & Tradition</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#291C17] leading-[1.1] text-balance">
              {RESTAURANT_INFO.storyHeadline}
            </h2>

            <p className="text-lg text-[#291C17]/85 font-light leading-relaxed">
              Installé sur les berges historiques du Quai Perrière à Grenoble, face aux remparts et au murmure de l’Isère, <strong>La Felicità</strong> est une invitation sincère à partager le meilleur de la table italienne.
            </p>

            <p className="text-sm sm:text-base text-[#291C17]/75 font-light leading-relaxed">
              Ici, nous cultivons le respect du geste artisanal : nos pâtes fraîches sont laminées quotidiennement, nos gratins et pizzas dorent sous la flamme d’un véritable four à bois, et notre fameux tiramisù perpétue la recette secrète du chef depuis plus de vingt ans.
            </p>

            {/* Core Values Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#291C17]/10">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xs bg-[#291C17]/5 text-[#C83B28] shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-[#291C17]">Cuisson au Feu de Bois</h4>
                  <p className="text-xs text-[#291C17]/70">Pizzas, calzones et gratins du chef saisis à haute braise.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xs bg-[#291C17]/5 text-[#C83B28] shrink-0">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-[#291C17]">Pâtes Fraîches Maison</h4>
                  <p className="text-xs text-[#291C17]/70">Tagliatelles, ravioles et linguine aux sauces mijotées.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xs bg-[#291C17]/5 text-[#C83B28] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-[#291C17]">Pâte Reposée 48h</h4>
                  <p className="text-xs text-[#291C17]/70">Fermentation lente pour une légèreté et digestion parfaite.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xs bg-[#291C17]/5 text-[#C83B28] shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-[#291C17]">Accueil Italien Sincère</h4>
                  <p className="text-xs text-[#291C17]/70">Une ambiance familiale et chaleureuse pour vos déjeuners et dîners.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
