import { RESTAURANT_INFO } from '../data/restaurantData';
import { PhoneCall, MapPin, Instagram } from 'lucide-react';
// Globe / eatbu icon removed per client request
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenReservation: () => void;
}

export default function Footer({ onOpenReservation }: FooterProps) {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#1f1511] text-[#F8F3E9] pt-20 pb-12 border-t border-[#F8F3E9]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
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
              {t(
                "L'amour de la gastronomie italienne traditionnelle au cœur de Grenoble. Pizzas au feu de bois, pâtes fraîches façonnées maison et produits d'origine protégée.",
                "A passion for authentic Italian gastronomy in the heart of Grenoble. Wood-fired pizzas, handmade pasta, and protected origin ingredients."
              )}
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
            </div>
          </div>

          {/* Nav Links Col */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#F8F3E9]/50 font-mono block mb-2">
              Navigation
            </span>
            <ul className="space-y-2 text-sm text-[#F8F3E9]/80 font-light">
              <li>
                <a href="#histoire" className="hover:text-[#C83B28] transition-colors">
                  {t('Notre Histoire', 'Our Story')}
                </a>
              </li>
              <li>
                <a href="#carte" className="hover:text-[#C83B28] transition-colors">
                  {t('La Carte & Pizzas', 'The Menu & Pizzas')}
                </a>
              </li>
              <li>
                <a href="#pizza-reveal" className="hover:text-[#C83B28] transition-colors">
                  {t('L’Artisanat du Feu', 'The Craft of Fire')}
                </a>
              </li>
              <li>
                <a href="#ingredients" className="hover:text-[#C83B28] transition-colors">
                  {t('Ingrédients DOP', 'DOP Ingredients')}
                </a>
              </li>
              <li>
                <a href="#galerie" className="hover:text-[#C83B28] transition-colors">
                  {t('Galerie Photo', 'Photo Gallery')}
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenReservation}
                  type="button"
                  className="hover:text-[#C83B28] transition-colors text-left cursor-pointer"
                >
                  {t('Réserver une Table', 'Book a Table')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#F8F3E9]/50 font-mono block mb-2">
              {t('Adresse & Réservations', 'Address & Bookings')}
            </span>
            <div className="space-y-2.5 text-xs text-[#F8F3E9]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C83B28] shrink-0 mt-0.5" />
                <span>
                  34 Quai Perrière, 38000 Grenoble, France
                  <br />
                  <span className="text-[#F8F3E9]/50">{t('Au bord de l’Isère, quartier Saint-Laurent', 'On the banks of the Isère, Saint-Laurent district')}</span>
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
                className="w-full py-3.5 text-xs uppercase tracking-widest font-bold text-[#F8F3E9] bg-[#C83B28] hover:bg-[#b53220] rounded-full transition-all duration-200 shadow-md cursor-pointer active:scale-95"
              >
                {t('Réserver en Ligne', 'Book Online')}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F3E9]/50">
          <p>© {new Date().getFullYear()} La Felicità Grenoble. {t('Tous droits réservés.', 'All rights reserved.')}</p>
          <p className="font-display italic text-sm text-[#F8F3E9]/70">
            « A tavola non si invecchia. » — {t('À table, on ne vieillit jamais.', 'At the table with good food, one never grows old.')}
          </p>
        </div>
      </div>
    </footer>
  );
}
