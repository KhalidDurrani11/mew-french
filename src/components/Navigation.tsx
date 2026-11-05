import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, PhoneCall } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { soundEngine } from '../utils/audioAtmosphere';

interface NavigationProps {
  onOpenReservation: () => void;
}

export default function Navigation({ onOpenReservation }: NavigationProps) {
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
    { label: 'Notre Histoire', href: '#histoire' },
    { label: 'La Carte', href: '#carte' },
    { label: 'Ingrédients DOP', href: '#ingredients' },
    { label: 'Galerie', href: '#galerie' },
    { label: 'Accès & Horaires', href: '#contact' },
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
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-[#291C17] hover:text-[#C83B28] transition-colors whitespace-nowrap shrink-0"
          >
            LA FELICITÀ
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#291C17]/80">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#C83B28] transition-colors whitespace-nowrap shrink-0 relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C83B28] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions (Ambient Audio + Primary CTA) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Audio Atmosphere Toggle */}
            <button
              onClick={toggleSound}
              type="button"
              title={isAudioActive ? 'Désactiver l’ambiance du four à bois' : 'Activer l’ambiance sonore du restaurant'}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#291C17]/70 hover:text-[#291C17] bg-[#291C17]/5 hover:bg-[#291C17]/10 rounded-sm transition-colors cursor-pointer"
            >
              {isAudioActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#C83B28] animate-pulse" />
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#C83B28]">Ambiance</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="text-[11px] uppercase tracking-wider">Son Off</span>
                </>
              )}
            </button>

            {/* Direct Phone Call for Instant Booking */}
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="hidden md:inline-flex items-center gap-1.5 text-xs text-[#291C17]/80 hover:text-[#C83B28] px-3 py-2 rounded-sm transition-colors border border-[#291C17]/15 whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#C83B28]" />
              <span className="tabular-nums font-medium">{RESTAURANT_INFO.phoneDisplay}</span>
            </a>

            {/* Primary Action Button */}
            <button
              onClick={onOpenReservation}
              type="button"
              className="px-4 lg:px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#F8F3E9] bg-[#C83B28] hover:bg-[#a92c1b] rounded-sm transition-colors shadow-xs whitespace-nowrap cursor-pointer active:scale-[0.98]"
            >
              Réserver
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 text-[#291C17] hover:text-[#C83B28] transition-colors"
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
            <span className="text-xs uppercase tracking-[0.25em] text-[#343A25] font-semibold">
              Navigation
            </span>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display text-3xl font-medium text-[#291C17] hover:text-[#C83B28] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-8 border-t border-[#291C17]/10">
            <button
              onClick={toggleSound}
              type="button"
              className="flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-wider font-medium text-[#291C17] border border-[#291C17]/20 rounded-sm"
            >
              {isAudioActive ? <Volume2 className="w-4 h-4 text-[#C83B28]" /> : <VolumeX className="w-4 h-4" />}
              {isAudioActive ? 'Désactiver le son d’ambiance' : 'Activer le son du four à bois'}
            </button>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-wider font-medium text-[#291C17] border border-[#291C17]/20 rounded-sm"
            >
              <PhoneCall className="w-4 h-4 text-[#C83B28]" />
              Appeler le {RESTAURANT_INFO.phoneDisplay}
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenReservation();
              }}
              type="button"
              className="w-full py-3.5 text-center text-xs uppercase tracking-widest font-semibold text-[#F8F3E9] bg-[#C83B28] rounded-sm"
            >
              Réserver une table
            </button>
            <p className="text-center text-xs text-[#291C17]/60 mt-2">
              {RESTAURANT_INFO.address}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
