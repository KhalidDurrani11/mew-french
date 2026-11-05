/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
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

export default function App() {
  const [hasCompletedOpening, setHasCompletedOpening] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const handleOpenReservation = () => {
    setIsReservationOpen(true);
  };

  const handleExploreMenu = () => {
    const carteEl = document.getElementById('carte');
    if (carteEl) {
      carteEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3E9] text-[#291C17] font-body selection:bg-[#C83B28] selection:text-[#F8F3E9]">
      {/* Cinematic Opening Sequence */}
      {!hasCompletedOpening && (
        <OpeningSequence onComplete={() => setHasCompletedOpening(true)} />
      )}

      {/* Primary Top Bar */}
      <Navigation onOpenReservation={handleOpenReservation} />

      {/* Main Experience Flow */}
      <main>
        {/* Cinematic Hero */}
        <HeroSection
          onOpenReservation={handleOpenReservation}
          onExploreMenu={handleExploreMenu}
        />

        {/* WOW Moment 1: The Pizza Reveal & Wood-fire Craft */}
        <PizzaRevealExperience />

        {/* The Restaurant Story on Quai Perrière */}
        <StorySection />

        {/* WOW Moment 2: The Ingredients Experience (Terroirs DOP) */}
        <IngredientsExperience />

        {/* WOW Moment 3: The Menu Experience & Interactive Transformation */}
        <MenuSection onOpenReservation={handleOpenReservation} />

        {/* WOW Moment 4: Immersive Editorial Gallery & Lightbox */}
        <GallerySection />

        {/* WOW Moment 5: Evening Arrival, Contact & Reservations */}
        <ReservationSection onOpenReservation={handleOpenReservation} />
      </main>

      {/* Footer */}
      <Footer onOpenReservation={handleOpenReservation} />

      {/* Global Interactive Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </div>
  );
}
