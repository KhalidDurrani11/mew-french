import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, PhoneCall, UtensilsCrossed } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { soundEngine } from '../utils/audioAtmosphere';
import { useLanguage } from '../context/LanguageContext';

interface NavigationProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
}

export default function Navigation({ onOpenReservation, onOpenMenu }: NavigationProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const active = soundEngine.toggle();
    setIsAudioActive(active);
  };

  const navLinks = [
    { label: t('Menu', 'Menu'), onClick: onOpenMenu },
    { label: t('Four à Bois', 'Wood Oven'), href: '#pizza-reveal' },
    { label: t('Histoire', 'Story'), href: '#histoire' },
    { label: t('Ingrédients', 'Ingredients'), href: '#ingredients' },
    { label: t('Galerie', 'Gallery'), href: '#galerie' },
    { label: t('Horaires', 'Hours'), href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF6F0]/98 backdrop-blur-md border-b border-[#291C17]/10 py-2 sm:py-2.5 shadow-sm'
            : 'bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#291C17]/10 py-2.5 sm:py-3.5 shadow-xs'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-4">

          {/* Brand Wordmark */}
          <a href="#" className="flex flex-col group shrink-0">
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#291C17] group-hover:text-[#C83B28] transition-colors leading-none">
              LA FELICITÀ
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#C83B28] font-semibold mt-0.5">
              {t('Ristorante & Pizzeria', 'Ristorante & Pizzeria')}
            </span>
          </a>

          {/* Desktop Nav Links — visible on all desktop / laptop screens */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-[13px] font-medium text-[#291C17]/80 justify-center">
            {navLinks.map((link) =>
              link.onClick ? (
                <button
                  key={link.label}
                  onClick={link.onClick}
                  type="button"
                  className="hover:text-[#C83B28] transition-colors whitespace-nowrap cursor-pointer relative group/nl py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C83B28] transition-all duration-200 group-hover/nl:w-full" />
                </button>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-[#C83B28] transition-colors whitespace-nowrap relative group/nl py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C83B28] transition-all duration-200 group-hover/nl:w-full" />
                </a>
              )
            )}
          </nav>

          {/* Right-side Actions — perfectly balanced, guaranteed no overflow */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">

            {/* Language Switcher */}
            <div
              className="flex items-center p-0.5 bg-[#291C17]/6 border border-[#291C17]/12 rounded-sm shrink-0"
              role="group"
              aria-label="Language selection"
            >
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`px-2 py-1 text-[10px] font-bold tracking-wider transition-colors rounded-xs cursor-pointer ${
                  language === 'fr'
                    ? 'bg-[#291C17] text-[#F8F3E9]'
                    : 'text-[#291C17]/60 hover:text-[#291C17]'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-[10px] font-bold tracking-wider transition-colors rounded-xs cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#291C17] text-[#F8F3E9]'
                    : 'text-[#291C17]/60 hover:text-[#291C17]'
                }`}
              >
                EN
              </button>
            </div>

            {/* Open Menu CTA — opens interactive menu modal */}
            <button
              onClick={onOpenMenu}
              type="button"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider font-bold text-[#291C17] bg-white hover:bg-[#FAF6F0] border border-[#C83B28]/35 hover:border-[#C83B28] rounded-sm transition-all shadow-xs hover:shadow-sm cursor-pointer active:scale-95 group/mb shrink-0"
              title={t('Consulter la carte complète', 'Open full menu')}
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-[#C83B28] group-hover/mb:rotate-12 transition-transform" />
              <span>{t('Menu', 'Menu')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C83B28] animate-pulse" />
            </button>

            {/* Historic Italian Soundscape Toggle */}
            <button
              onClick={toggleSound}
              type="button"
              title={isAudioActive ? t('Couper la musique italienne', 'Mute Italian melody') : t('Écouter l’ambiance d’époque italienne', 'Play historic Italian music')}
              className={`hidden md:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-sm transition-all cursor-pointer uppercase tracking-wider shrink-0 ${
                isAudioActive
                  ? 'bg-[#C83B28] text-white shadow-xs'
                  : 'text-[#291C17]/70 hover:text-[#291C17] bg-[#291C17]/5 hover:bg-[#291C17]/10'
              }`}
            >
              {isAudioActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-pulse text-white" />
                  <span className="hidden xl:inline">{t('Son ON', 'Sound ON')}</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">{t('Son OFF', 'Sound OFF')}</span>
                </>
              )}
            </button>

            {/* Book Table CTA — guaranteed completely visible without clipping */}
            <button
              onClick={onOpenReservation}
              type="button"
              className="px-4 sm:px-5 py-2 text-xs uppercase tracking-wider font-bold text-white bg-[#C83B28] hover:bg-[#b53220] rounded-sm shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 whitespace-nowrap shrink-0"
            >
              {t('Réserver une table', 'Book a Table')}
            </button>

            {/* Mobile burger button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="lg:hidden p-1.5 text-[#291C17] hover:text-[#C83B28] transition-colors cursor-pointer shrink-0"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-[#FAF6F0] pt-20 pb-8 px-6 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-5">
            <div className="pb-4 border-b border-[#291C17]/10">
              <span className="text-xs uppercase tracking-widest text-[#C83B28] font-bold block mb-0.5">
                La Felicità Grenoble
              </span>
              <p className="text-xs text-[#291C17]/60">
                34 Quai Perrière · {t('Au pied de la Bastille', 'By the Bastille')}
              </p>
            </div>

            <nav className="flex flex-col space-y-1">
              <button
                onClick={() => { setIsMobileMenuOpen(false); onOpenMenu(); }}
                type="button"
                className="flex items-center justify-between py-3.5 px-4 rounded-xl bg-[#C83B28]/8 text-[#C83B28] font-bold font-display text-lg border border-[#C83B28]/15"
              >
                <span>{t('Consulter la Carte Complète', 'Full Food & Wine Menu')}</span>
                <UtensilsCrossed className="w-5 h-5" />
              </button>

              <a
                href="/menu.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 px-4 rounded-xl text-[#291C17]/75 font-display text-base hover:text-[#C83B28] hover:bg-[#1A1412]/3 transition-colors"
              >
                <span>{t('Menu PDF Officiel', 'Official PDF Menu')}</span>
                <span className="text-xs font-mono font-bold text-[#C83B28] border border-[#C83B28]/30 px-2 py-0.5 rounded">PDF</span>
              </a>

              {/* Mobile Soundscape Toggle */}
              <button
                onClick={toggleSound}
                type="button"
                className={`flex items-center justify-between py-3 px-4 rounded-xl font-display text-base border transition-colors cursor-pointer ${
                  isAudioActive
                    ? 'bg-[#C83B28] text-white border-[#C83B28] shadow-sm'
                    : 'text-[#291C17]/75 border-[#291C17]/8 hover:bg-[#1A1412]/3'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isAudioActive ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
                  <span>{isAudioActive ? t('Musique Italienne Active', 'Italian Music Playing') : t('Ambiance Musicale Italienne', 'Historic Italian Melody')}</span>
                </div>
                <span className="text-xs uppercase tracking-widest font-mono font-bold">
                  {isAudioActive ? 'ON' : 'OFF'}
                </span>
              </button>

              {navLinks.slice(1).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 px-4 rounded-xl font-display text-base text-[#291C17]/75 hover:text-[#C83B28] hover:bg-[#1A1412]/3 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-[#291C17]/10 space-y-3">
            <button
              onClick={() => { setIsMobileMenuOpen(false); onOpenReservation(); }}
              type="button"
              className="w-full py-4 text-center text-sm uppercase tracking-widest font-bold text-white bg-[#C83B28] rounded-xl shadow-lg"
            >
              {t('Réserver une Table', 'Book a Table')}
            </button>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 text-sm uppercase tracking-wider font-semibold text-[#291C17] bg-[#291C17]/5 border border-[#291C17]/12 rounded-xl"
            >
              <PhoneCall className="w-4 h-4 text-[#C83B28]" />
              <span>{RESTAURANT_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
