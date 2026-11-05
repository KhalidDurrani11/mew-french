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
import ReservationSection from './components/ReservationSection';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';
import MenuModal from './components/MenuModal';
import AnimateVideoModal from './components/AnimateVideoModal';
import { UtensilsCrossed } from 'lucide-react';

function AppContent() {
  const { t } = useLanguage();
  const [hasCompletedOpening, setHasCompletedOpening] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isVideoStudioOpen, setIsVideoStudioOpen] = useState(false);
  const [selectedDishForReservation, setSelectedDishForReservation] = useState<string | undefined>(undefined);

  const handleOpenReservation = (dishName?: string) => {
    setSelectedDishForReservation(dishName);
    setIsReservationOpen(true);
  };

  const handleOpenMenu = () => {
    setIsMenuModalOpen(true);
  };

  const handleOpenVideoStudio = () => {
    setIsVideoStudioOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F3E9] text-[#291C17] font-body selection:bg-[#C83B28] selection:text-[#F8F3E9] relative">
      {/* Slim, elegant tomato red scroll progress indicator */}
      <ScrollProgress />

      {/* Cinematic Opening Sequence */}
      {!hasCompletedOpening && (
        <OpeningSequence onComplete={() => setHasCompletedOpening(true)} />
      )}

      {/* Primary Top Bar with Subtle Language Toggle & Separate Menu Button */}
      <Navigation
        onOpenReservation={() => handleOpenReservation()}
        onOpenMenu={handleOpenMenu}
        onOpenVideoStudio={handleOpenVideoStudio}
      />

      {/* Main Experience Flow */}
      <main>
        {/* Cinematic Hero with separate Open Menu CTA */}
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

        {/* WOW Moment 3: The Menu Experience & Interactive Transformation */}
        <MenuSection
          onOpenReservation={() => handleOpenReservation()}
          onOpenMenu={handleOpenMenu}
        />

        {/* WOW Moment 4: Immersive Editorial Gallery & Lightbox */}
        <GallerySection onOpenVideoStudio={handleOpenVideoStudio} />

        {/* WOW Moment 5: Evening Arrival, Contact & Reservations */}
        <ReservationSection onOpenReservation={() => handleOpenReservation()} />
      </main>

      {/* Floating Quick Action Menu Pill on screen bottom-right */}
      <div className="fixed bottom-6 right-6 z-30">
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

      {/* Footer */}
      <Footer onOpenReservation={() => handleOpenReservation()} />

      {/* Separate Dedicated Menu Modal: Opens when ANY menu button is clicked */}
      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        onSelectDishForReservation={(dishName) => {
          handleOpenReservation(dishName);
        }}
      />

      {/* Global Interactive Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => {
          setIsReservationOpen(false);
          setSelectedDishForReservation(undefined);
        }}
        initialDishNote={selectedDishForReservation}
      />

      {/* Gemini Omni Flash Video Generation Studio */}
      <AnimateVideoModal
        isOpen={isVideoStudioOpen}
        onClose={() => setIsVideoStudioOpen(false)}
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
