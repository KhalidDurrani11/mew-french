import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, PhoneCall, Film, UtensilsCrossed } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { soundEngine } from '../utils/audioAtmosphere';
import { useLanguage } from '../context/LanguageContext';

interface NavigationProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
  onOpenVideoStudio?: () => void;
}

export default function Navigation({ onOpenReservation, onOpenMenu, onOpenVideoStudio }: NavigationProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const active = soundEngine.toggle();
    setIsAudioActive(active);
  };

  const navLinks = [
    { label: t('Notre Histoire', 'Our Story'), href: '#histoire' },
    { label: t('Ingrédients DOP', 'DOP Ingredients'), href: '#ingredients' },
    { label: t('Galerie', 'Gallery'), href: '#galerie' },
    { label: t('Accès & Horaires', 'Access & Hours'), href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F3E9]/95 backdrop-blur-md border-b border-[#291C17]/10 py-3 shadow-xs'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-[#291C17] hover:text-[#C83B28] transition-colors whitespace-nowrap shrink-0"
          >
            LA FELICITÀ
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#291C17]/80">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#C83B28] transition-colors whitespace-nowrap shrink-0 relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C83B28] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions (Language Toggle, SEPARATE MENU BUTTON, Audio, Reservation CTA) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Subtle Language Toggle (FR | EN) */}
            <div
              className="flex items-center p-0.5 bg-[#291C17]/5 border border-[#291C17]/15 rounded-xs"
              role="group"
              aria-label="Language selection"
            >
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`px-2 py-1 text-[11px] font-semibold tracking-wider transition-colors rounded-xs cursor-pointer ${
                  language === 'fr'
                    ? 'bg-[#291C17] text-[#F8F3E9] shadow-xs'
                    : 'text-[#291C17]/60 hover:text-[#291C17]'
                }`}
                title="Passer en Français"
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-[11px] font-semibold tracking-wider transition-colors rounded-xs cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#291C17] text-[#F8F3E9] shadow-xs'
                    : 'text-[#291C17]/60 hover:text-[#291C17]'
                }`}
                title="Switch to English"
              >
                EN
              </button>
            </div>

            {/* SEPARATE MENU BUTTON: Direct Click Opens the Menu Modal */}
            <button
              onClick={onOpenMenu}
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 text-xs uppercase tracking-wider font-bold text-[#291C17] bg-[#F8F3E9] hover:bg-white border-2 border-[#C83B28]/40 hover:border-[#C83B28] rounded-xs transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95 group relative"
              title={t('Ouvrir la carte complète du restaurant', 'Open full restaurant menu')}
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-[#C83B28] group-hover:rotate-12 transition-transform" />
              <span>{t('Menu & Carte', 'Food Menu')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C83B28] animate-pulse" />
            </button>

            {/* Video Studio Button */}
            {onOpenVideoStudio && (
              <button
                type="button"
                onClick={onOpenVideoStudio}
                title={t('Animer une photo en vidéo', 'Animate photo into video')}
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-[#291C17]/70 hover:text-[#291C17] bg-[#291C17]/5 hover:bg-[#291C17]/10 rounded-xs transition-colors cursor-pointer"
              >
                <Film className="w-3.5 h-3.5 text-[#C83B28]" />
                <span className="text-[11px] uppercase tracking-wider font-semibold">Studio</span>
              </button>
            )}

            {/* Audio Atmosphere Toggle */}
            <button
              onClick={toggleSound}
              type="button"
              title={isAudioActive ? t('Désactiver le son du four', 'Mute hearth sound') : t('Activer l’ambiance sonore', 'Enable soundscape')}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-[#291C17]/70 hover:text-[#291C17] bg-[#291C17]/5 hover:bg-[#291C17]/10 rounded-xs transition-colors cursor-pointer"
            >
              {isAudioActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#C83B28]" />
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#C83B28]">
                    {t('Ambiance', 'Sound On')}
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="text-[11px] uppercase tracking-wider">
                    {t('Son Off', 'Sound Off')}
                  </span>
                </>
              )}
            </button>

            {/* Direct Phone Call */}
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="hidden md:inline-flex items-center gap-1.5 text-xs text-[#291C17]/80 hover:text-[#C83B28] px-2.5 py-2 rounded-xs transition-colors border border-[#291C17]/15 whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#C83B28]" />
              <span className="tabular-nums font-medium">{RESTAURANT_INFO.phoneDisplay}</span>
            </a>

            {/* Primary Action Button */}
            <button
              onClick={onOpenReservation}
              type="button"
              className="px-4 lg:px-5 py-2 text-xs uppercase tracking-wider font-semibold text-[#F8F3E9] bg-[#C83B28] hover:bg-[#a92c1b] rounded-xs transition-colors shadow-xs whitespace-nowrap cursor-pointer active:scale-[0.98]"
            >
              {t('Réserver', 'Book Table')}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 text-[#291C17] hover:text-[#C83B28] transition-colors cursor-pointer"
              aria-label="Menu principal"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-[#F8F3E9] pt-24 px-8 pb-12 flex flex-col justify-between overflow-y-auto">
          <div className="flex flex-col gap-6 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.25em] text-[#343A25] font-semibold">
                Navigation
              </span>
              {/* Language toggle inside mobile menu */}
              <div className="flex items-center p-0.5 bg-[#291C17]/10 rounded-xs">
                <button
                  type="button"
                  onClick={() => setLanguage('fr')}
                  className={`px-3 py-1 text-xs font-semibold rounded-xs transition-colors ${
                    language === 'fr' ? 'bg-[#291C17] text-white' : 'text-[#291C17]/60'
                  }`}
                >
                  FR
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 text-xs font-semibold rounded-xs transition-colors ${
                    language === 'en' ? 'bg-[#291C17] text-white' : 'text-[#291C17]/60'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Separate Menu Trigger in Mobile Menu */}
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenMenu();
              }}
              className="flex items-center justify-between py-3 px-4 bg-[#291C17] text-white rounded-xs shadow-md font-display text-2xl"
            >
              <span className="flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-[#C83B28]" />
                {t('Ouvrir la Carte des Plats', 'Open Food Menu')}
              </span>
              <span className="text-xs font-sans uppercase tracking-widest text-[#C83B28]">→</span>
            </button>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display text-3xl font-medium text-[#291C17] hover:text-[#C83B28] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}

            {onOpenVideoStudio && (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenVideoStudio();
                }}
                className="flex items-center gap-2 text-left font-display text-2xl font-medium text-[#C83B28] py-1"
              >
                <Film className="w-5 h-5" />
                <span>{t('Animer une photo en vidéo', 'Animate photo into video')}</span>
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-[#291C17]/10">
            <button
              onClick={toggleSound}
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 text-xs uppercase tracking-wider font-medium text-[#291C17] border border-[#291C17]/20 rounded-xs"
            >
              {isAudioActive ? <Volume2 className="w-4 h-4 text-[#C83B28]" /> : <VolumeX className="w-4 h-4" />}
              {isAudioActive ? t('Désactiver l’ambiance', 'Mute soundscape') : t('Activer l’ambiance du four', 'Enable hearth sound')}
            </button>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 text-xs uppercase tracking-wider font-medium text-[#291C17] border border-[#291C17]/20 rounded-xs"
            >
              <PhoneCall className="w-4 h-4 text-[#C83B28]" />
              {t('Appeler le', 'Call')} {RESTAURANT_INFO.phoneDisplay}
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenReservation();
              }}
              type="button"
              className="w-full py-3 text-center text-xs uppercase tracking-widest font-semibold text-[#F8F3E9] bg-[#C83B28] rounded-xs"
            >
              {t('Réserver une table', 'Book a table')}
            </button>
            <p className="text-center text-xs text-[#291C17]/60 mt-1">
              {RESTAURANT_INFO.address}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
