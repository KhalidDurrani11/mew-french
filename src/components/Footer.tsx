import { RESTAURANT_INFO } from '../data/restaurantData';
import { PhoneCall, MapPin, Instagram, Globe } from 'lucide-react';

interface FooterProps {
  onOpenReservation: () => void;
}

export default function Footer({ onOpenReservation }: FooterProps) {
  return (
    <footer className="bg-[#1f1511] text-[#F8F3E9] pt-20 pb-12 border-t border-[#F8F3E9]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#F8F3E9]/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#"
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F8F3E9] hover:text-[#C83B28] transition-colors inline-block"
            >
              LA FELICITÀ
            </a>
            <p className="text-xs uppercase tracking-[0.25em] text-[#C83B28] font-semibold">
              Ristorante Italiano & Pizza al Forno a Legna
            </p>
            <p className="text-sm text-[#F8F3E9]/75 font-light leading-relaxed max-w-sm">
              L'amour de la gastronomie italienne traditionnelle au cœur de Grenoble. Pizzas au feu de bois, pâtes fraîches façonnées maison et produits d'origine protégée.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-[#C83B28] text-white transition-colors"
                aria-label="Instagram de La Felicità Grenoble"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.eatbuUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-[#C83B28] text-white transition-colors"
                aria-label="Site web officiel Eatbu"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links Col */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#F8F3E9]/50 font-mono block mb-2">
              Navigation
            </span>
            <ul className="space-y-2 text-sm text-[#F8F3E9]/80 font-light">
              <li>
                <a href="#histoire" className="hover:text-[#C83B28] transition-colors">Notre Histoire</a>
              </li>
              <li>
                <a href="#carte" className="hover:text-[#C83B28] transition-colors">La Carte & Pizzas</a>
              </li>
              <li>
                <a href="#pizza-reveal" className="hover:text-[#C83B28] transition-colors">L’Artisanat du Feu</a>
              </li>
              <li>
                <a href="#ingredients" className="hover:text-[#C83B28] transition-colors">Ingrédients DOP</a>
              </li>
              <li>
                <a href="#galerie" className="hover:text-[#C83B28] transition-colors">Galerie Photo</a>
              </li>
              <li>
                <button
                  onClick={onOpenReservation}
                  type="button"
                  className="hover:text-[#C83B28] transition-colors text-left cursor-pointer"
                >
                  Réserver une Table
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#F8F3E9]/50 font-mono block mb-2">
              Adresse & Réservations
            </span>
            <div className="space-y-2.5 text-xs text-[#F8F3E9]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C83B28] shrink-0 mt-0.5" />
                <span>
                  34 Quai Perrière, 38000 Grenoble, France
                  <br />
                  <span className="text-[#F8F3E9]/50">Au bord de l’Isère, quartier Saint-Laurent</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#C83B28] shrink-0" />
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="hover:text-[#C83B28] transition-colors font-medium tabular-nums"
                >
                  {RESTAURANT_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenReservation}
                type="button"
                className="w-full py-3 text-xs uppercase tracking-widest font-semibold text-[#F8F3E9] bg-[#C83B28] hover:bg-[#a92c1b] rounded-xs transition-colors cursor-pointer"
              >
                Réserver en Ligne
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright and Italian proverbs */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F3E9]/50">
          <p>© {new Date().getFullYear()} La Felicità Grenoble. Tous droits réservés.</p>
          <p className="font-display italic text-sm text-[#F8F3E9]/70">
            « A tavola non si invecchia. » — À table, on ne vieillit jamais.
          </p>
        </div>
      </div>
    </footer>
  );
}
