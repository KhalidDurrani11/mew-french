/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import ScrollProgress from './components/ScrollProgress';
import OpeningSequence from './components/OpeningSequence';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import PizzaRevealExperience from './components/PizzaRevealExperience';
import IngredientsExperience from './components/IngredientsExperience';
import StorySection from './components/StorySection';
import MenuSection from './components/MenuSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import ReservationSection from './components/ReservationSection';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';
import MenuModal from './components/MenuModal';
import { UtensilsCrossed, PhoneCall, Calendar, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from './data/restaurantData';

function AppContent() {
  const { t } = useLanguage();
  const [hasCompletedOpening, setHasCompletedOpening] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [selectedDishForReservation, setSelectedDishForReservation] = useState<string | undefined>(undefined);

  const handleOpenReservation = (dishName?: string) => {
    setSelectedDishForReservation(dishName);
    setIsReservationOpen(true);
  };

  const handleOpenMenu = () => {
    setIsMenuModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F3E9] text-[#291C17] font-body selection:bg-[#C83B28] selection:text-[#F8F3E9] relative pb-16 md:pb-0">
      {/* Elegant scroll progress indicator */}
      <ScrollProgress />

      {/* Cinematic Opening Sequence */}
      {!hasCompletedOpening && (
        <OpeningSequence onComplete={() => setHasCompletedOpening(true)} />
      )}

      {/* Top Header Bar */}
      <Navigation
        onOpenReservation={() => handleOpenReservation()}
        onOpenMenu={handleOpenMenu}
      />

      {/* Main Experience Flow */}
      <main>
        {/* Cinematic Hero */}
        <HeroSection
          onOpenReservation={() => handleOpenReservation()}
          onOpenMenu={handleOpenMenu}
        />

        {/* WOW Moment 1: The Pizza Reveal & 3D Wood-Fired Oven */}
        <PizzaRevealExperience />

        {/* The Restaurant Story on Quai Perrière */}
        <StorySection />

        {/* WOW Moment 2: The Ingredients Experience (Terroirs DOP) */}
        <IngredientsExperience />

        {/* WOW Moment 3: The Menu Experience & Interactive Dish Explorer */}
        <MenuSection
          onOpenReservation={(dish) => handleOpenReservation(dish)}
          onOpenMenu={handleOpenMenu}
        />

        {/* WOW Moment 4: Immersive Photography Gallery & Lightbox */}
        <GallerySection />

        {/* Guest Reviews */}
        <TestimonialsSection />

        {/* WOW Moment 5: Evening Arrival, Contact, Map & Bookings */}
        <ReservationSection onOpenReservation={() => handleOpenReservation()} />
      </main>

      {/* Floating Quick Action Menu Pill on Desktop */}
      <div className="hidden md:block fixed bottom-6 right-6 z-30">
        <button
          onClick={handleOpenMenu}
          type="button"
          className="flex items-center gap-2.5 px-5 py-3 bg-[#291C17] hover:bg-[#C83B28] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-[#C83B28]/40 hover:border-white group ring-2 ring-[#C83B28]/20 hover:ring-[#C83B28]/60"
          title={t('Ouvrir la carte du restaurant', 'Open restaurant menu')}
        >
          <UtensilsCrossed className="w-4 h-4 text-[#C83B28] group-hover:text-white group-hover:rotate-12 transition-all" />
          <span>{t('Ouvrir la Carte', 'Open Menu')}</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C83B28] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C83B28] group-hover:bg-white transition-colors" />
          </span>
        </button>
      </div>

      {/* Sticky Bottom Action Bar for Mobile Devices (High conversion agency pattern) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1F1511]/95 backdrop-blur-md border-t border-[#F8F3E9]/15 px-3 py-2 flex items-center justify-around shadow-2xl">
        <a
          href={`tel:${RESTAURANT_INFO.phone}`}
          className="flex flex-col items-center gap-0.5 text-[#F8F3E9] text-[10px] font-medium p-1 hover:text-[#C83B28] transition-colors"
        >
          <PhoneCall className="w-4 h-4 text-[#C83B28]" />
          <span>{t('Appeler', 'Call')}</span>
        </a>

        <button
          onClick={handleOpenMenu}
          type="button"
          className="flex flex-col items-center gap-0.5 text-[#F8F3E9] text-[10px] font-medium p-1 hover:text-[#C83B28] transition-colors cursor-pointer"
        >
          <UtensilsCrossed className="w-4 h-4 text-[#C83B28]" />
          <span>{t('La Carte', 'Menu')}</span>
        </button>

        <button
          onClick={() => handleOpenReservation()}
          type="button"
          className="flex items-center gap-1.5 px-4 py-2 bg-[#C83B28] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md active:scale-95 transition-transform"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{t('Réserver', 'Book')}</span>
        </button>

        <a
          href={RESTAURANT_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 text-[#F8F3E9] text-[10px] font-medium p-1 hover:text-[#C83B28] transition-colors"
        >
          <MapPin className="w-4 h-4 text-[#C83B28]" />
          <span>{t('Accès', 'Maps')}</span>
        </a>
      </div>

      {/* Footer */}
      <Footer onOpenReservation={() => handleOpenReservation()} />

      {/* Dedicated Full Screen Menu Modal */}
      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        onSelectDishForReservation={(dishName) => {
          handleOpenReservation(dishName);
        }}
      />

      {/* Interactive Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => {
          setIsReservationOpen(false);
          setSelectedDishForReservation(undefined);
        }}
        initialDishNote={selectedDishForReservation}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
