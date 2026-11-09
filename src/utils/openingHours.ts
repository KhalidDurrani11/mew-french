// Calculates live restaurant open/closed status for Europe/Paris timezone

export interface RestaurantStatus {
  isOpen: boolean;
  labelFr: string;
  labelEn: string;
  detailFr: string;
  detailEn: string;
}

export function getLiveRestaurantStatus(): RestaurantStatus {
  try {
    const now = new Date();
    // Format to Paris local time components
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Paris',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    });

    const parts = formatter.formatToParts(now);
    let weekday = '';
    let hour = 0;
    let minute = 0;

    for (const p of parts) {
      if (p.type === 'weekday') weekday = p.value.toLowerCase();
      if (p.type === 'hour') hour = parseInt(p.value, 10);
      if (p.type === 'minute') minute = parseInt(p.value, 10);
    }

    const currentMinutes = hour * 60 + minute;

    // Hours rules:
    // Thu: Lunch closed, Dinner groups on booking
    if (weekday.startsWith('thu')) {
      if (currentMinutes >= 18 * 60 && currentMinutes <= 22 * 60) {
        return {
          isOpen: true,
          labelFr: 'Sur réservation ce soir',
          labelEn: 'Private bookings this evening',
          detailFr: 'Jeudi soir : groupes sur réservation au 04 76 16 81 39',
          detailEn: 'Thursday evening: bookings on request',
        };
      }
      return {
        isOpen: false,
        labelFr: 'Fermé le midi · Groupes le soir',
        labelEn: 'Closed lunch · Group bookings evening',
        detailFr: 'Réservation au 04 76 16 81 39',
        detailEn: 'Call 04 76 16 81 39 for bookings',
      };
    }

    // Wed: Lunch 12:00 - 13:45 (720 - 825), Dinner 18:00 - 21:45 (1080 - 1305)
    if (weekday.startsWith('wed')) {
      if ((currentMinutes >= 12 * 60 && currentMinutes <= 13 * 60 + 45) ||
          (currentMinutes >= 18 * 60 && currentMinutes <= 21 * 60 + 45)) {
        return {
          isOpen: true,
          labelFr: 'Ouvert actuellement',
          labelEn: 'Open now',
          detailFr: 'Service en cours · Sur place & à emporter',
          detailEn: 'Service in progress · Dine-in & takeaway',
        };
      }
      if (currentMinutes < 12 * 60) {
        return {
          isOpen: false,
          labelFr: 'Ouvre aujourd’hui à 12h00',
          labelEn: 'Opens today at 12:00',
          detailFr: 'Midi : 12h00 - 13h45 · Soir : 18h00 - 21h45',
          detailEn: 'Lunch: 12:00 - 13:45 · Dinner: 18:00 - 21:45',
        };
      }
      if (currentMinutes < 18 * 60) {
        return {
          isOpen: false,
          labelFr: 'Réouverture à 18h00 ce soir',
          labelEn: 'Reopens at 18:00 this evening',
          detailFr: 'Service du soir dès 18h00',
          detailEn: 'Evening service from 18:00',
        };
      }
    }

    // Mon, Tue, Fri, Sat, Sun:
    // Lunch 12:10 - 13:45 (730 - 825), Dinner 18:30 - 21:45 (1110 - 1305)
    const isLunch = currentMinutes >= 12 * 60 + 10 && currentMinutes <= 13 * 60 + 45;
    const isDinner = currentMinutes >= 18 * 60 + 30 && currentMinutes <= 21 * 60 + 45;

    if (isLunch || isDinner) {
      return {
        isOpen: true,
        labelFr: 'Ouvert actuellement',
        labelEn: 'Open now',
        detailFr: 'Service en cours · Sur place & à emporter',
        detailEn: 'Service in progress · Dine-in & takeaway',
      };
    }

    if (currentMinutes < 12 * 60 + 10) {
      return {
        isOpen: false,
        labelFr: 'Ouvre aujourd’hui à 12h10',
        labelEn: 'Opens today at 12:10',
        detailFr: 'Midi : 12h10 - 13h45 · Soir : 18h30 - 21h45',
        detailEn: 'Lunch: 12:10 - 13:45 · Dinner: 18:30 - 21:45',
      };
    }

    if (currentMinutes < 18 * 60 + 30) {
      return {
        isOpen: false,
        labelFr: 'Réouverture à 18h30 ce soir',
        labelEn: 'Reopens at 18:30 this evening',
        detailFr: 'Service du soir dès 18h30',
        detailEn: 'Evening service starts at 18:30',
      };
    }

    return {
      isOpen: false,
      labelFr: 'Fermé pour la nuit',
      labelEn: 'Closed for the night',
      detailFr: 'Réouverture demain midi dès 12h10',
      detailEn: 'Reopens tomorrow at 12:10',
    };
  } catch {
    return {
      isOpen: true,
      labelFr: 'Ouvert 7j/7',
      labelEn: 'Open 7 days/week',
      detailFr: 'Midi & Soir (Jeudi sur réservation)',
      detailEn: 'Lunch & Dinner (Thu bookings only)',
    };
  }
}

