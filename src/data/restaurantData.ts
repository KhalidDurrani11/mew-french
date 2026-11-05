export interface MenuItem {
  id: string;
  name: string;
  nameEn?: string;
  category: 'pizza_rosso' | 'pizza_bianco' | 'pasta' | 'gratins_secondi' | 'antipasti' | 'dolci' | 'bevande';
  description: string;
  descriptionEn: string;
  price: number;
  highlight?: string;
  highlightEn?: string;
  badge?: string;
  badgeEn?: string;
  isVegetarian?: boolean;
  pairing?: string;
  pairingEn?: string;
}

export interface IngredientStory {
  id: string;
  name: string;
  nameEn: string;
  italianName: string;
  origin: string;
  originEn: string;
  description: string;
  descriptionEn: string;
  terroirNote: string;
  terroirNoteEn: string;
}

export const RESTAURANT_INFO = {
  name: 'La Felicità',
  subtitle: 'Restaurant Italien & Pizzeria au Feu de Bois',
  subtitleEn: 'Authentic Italian Restaurant & Wood-Fired Pizzeria',
  tagline: "Un assaggio d'Italia.",
  taglineEn: "A taste of Italy.",
  subTagline: "Authentic Italian flavors, made with love in the heart of Grenoble.",
  subTaglineEn: "Authentic Italian flavors, made with love in the heart of Grenoble.",
  storyHeadline: "Un luogo où l'on se sent chez soi.",
  storyHeadlineEn: "A place where you truly feel at home.",
  address: '34 Quai Perrière, 38000 Grenoble, France',
  locationDetails: 'Sur les quais de l’Isère, au pied de la Bastille',
  locationDetailsEn: 'On the banks of the Isère river, at the foot of the Bastille',
  phone: '+33 4 76 16 81 39',
  phoneDisplay: '04 76 16 81 39',
  email: 'contact@lafelicita-grenoble.fr',
  googleMapsUrl: 'https://maps.google.com/?q=34+Quai+Perriere+38000+Grenoble',
  instagramUrl: 'https://www.instagram.com/lafelicitagrenoble/',
  eatbuUrl: 'https://la-felicita-grenoble.eatbu.com/?lang=en',
  hours: [
    { day: 'Lundi', dayEn: 'Monday', lunch: '12h10 – 13h45', dinner: '18h30 – 21h45', status: 'Ouvert', statusEn: 'Open' },
    { day: 'Mardi', dayEn: 'Tuesday', lunch: '12h10 – 13h45', dinner: '18h30 – 21h45', status: 'Ouvert', statusEn: 'Open' },
    { day: 'Mercredi', dayEn: 'Wednesday', lunch: '12h00 – 13h45', dinner: '18h00 – 21h45', status: 'Ouvert', statusEn: 'Open' },
    { day: 'Jeudi', dayEn: 'Thursday', lunch: 'Fermé', dinner: 'Groupes sur réservation', status: 'Sur réservation', statusEn: 'Private bookings' },
    { day: 'Vendredi', dayEn: 'Friday', lunch: '12h10 – 13h45', dinner: '18h30 – 21h45', status: 'Ouvert', statusEn: 'Open' },
    { day: 'Samedi', dayEn: 'Saturday', lunch: '12h10 – 13h45', dinner: '18h30 – 21h45', status: 'Ouvert', statusEn: 'Open' },
    { day: 'Dimanche', dayEn: 'Sunday', lunch: '12h10 – 13h45', dinner: '18h30 – 21h45', status: 'Ouvert', statusEn: 'Open' },
  ],
  features: [
    'Four à bois traditionnel haute température',
    'Pâte à fermentation lente 48h',
    'Pâtes fraîches artisanales faites maison',
    'Ingrédients d’origine protégée DOP et IGP',
    'Terrasse et salle chaleureuse Quai Perrière',
  ],
  featuresEn: [
    'Traditional high-temperature wood-fired stone oven',
    '48-hour slow-fermentation sourdough dough',
    'Fresh artisanal handmade pasta rolled daily',
    'Protected Designation of Origin (DOP & IGP) Italian products',
    'Warm dining room and riverside terrace on Quai Perrière',
  ]
};

// High-resolution source assets verified for live hosting (Netlify, GitHub Pages, Vercel, and local)
export const IMAGES = {
  heroPizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1920&q=85',
  burrataPizza: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1400&q=85',
  freshPasta: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281242?auto=format&fit=crop&w=1400&q=85',
  restaurantInterior: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=85',
  tiramisu: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1400&q=85',
  ovenFlame: 'https://images.unsplash.com/photo-1579684947550-22e945225d9a?auto=format&fit=crop&w=1400&q=85',
  wineChianti: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=85',
  // Local fallbacks if running entirely offline
  local: {
    heroPizza: './images/hero_pizza.jpg',
    burrataPizza: './images/burrata_pizza.jpg',
    freshPasta: './images/fresh_pasta.jpg',
    restaurantInterior: './images/restaurant_interior.jpg',
    tiramisu: './images/tiramisu.jpg',
  },
  fallbacks: {
    heroPizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1920&q=85',
    burrataPizza: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1400&q=85',
    freshPasta: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281242?auto=format&fit=crop&w=1400&q=85',
    restaurantInterior: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=85',
    tiramisu: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1400&q=85',
  }
};

export const INGREDIENTS_DATA: IngredientStory[] = [
  {
    id: 'fior-di-latte',
    name: 'Fior di Latte & Mozzarella di Bufala Campana DOP',
    nameEn: 'Fior di Latte & Mozzarella di Bufala Campana DOP',
    italianName: 'L’Oro Bianco della Campania',
    origin: 'Campanie & Pouilles, Italie',
    originEn: 'Campania & Puglia, Italy',
    description: 'Une mozzarella crémeuse, fondante au feu de bois sans jamais détremper la pâte, aux notes fraîches de lait de bufflonne.',
    descriptionEn: 'Creamy mozzarella that melts flawlessly in the wood-fired oven without making the crust soggy, with fresh notes of buffalo milk.',
    terroirNote: 'Produite selon le cahier des charges traditionnel DOP, livrée fraîche chaque semaine.',
    terroirNoteEn: 'Crafted under strict traditional DOP specifications, delivered fresh every week.'
  },
  {
    id: 'san-marzano',
    name: 'Tomates San Marzano DOP dell’Agro Sarnese',
    nameEn: 'San Marzano DOP Tomatoes dell’Agro Sarnese',
    italianName: 'Il Pomodoro del Vesuvio',
    origin: 'Terres volcaniques du Vésuve',
    originEn: 'Volcanic soils of Mount Vesuvius',
    description: 'Une acidité parfaitement balancée, une douceur naturelle concentrée et une texture pulpeuse gorgée de soleil italien.',
    descriptionEn: 'Perfect natural balance of sweetness and gentle acidity, with a rich pulpy texture nurtured by the Italian sun.',
    terroirNote: 'Récoltées à la main à pleine maturité dans les sols volcaniques du sud de l’Italie.',
    terroirNoteEn: 'Harvested by hand at peak ripeness in the volcanic mineral soils of Southern Italy.'
  },
  {
    id: 'farina-tipo-00',
    name: 'Farine Tipo 00 & Maturation 48 Heures',
    nameEn: 'Tipo 00 Flour & 48-Hour Slow Fermentation',
    italianName: 'La Lenta Lievitazione',
    origin: 'Meunerie artisanale italienne',
    originEn: 'Artisanal Italian mill',
    description: 'Un empâtement à haute hydratation reposé pendant 48 heures au frais pour une légèreté alvéolée et une digestibilité incomparable.',
    descriptionEn: 'High-hydration dough rested for 48 hours for an airy, blistered crust with unmatched lightness and digestibility.',
    terroirNote: 'Cuisson éclair à plus de 450°C dans notre four à bois de pierre réfractaire.',
    terroirNoteEn: 'Flash-baked at over 450°C in our refractory stone wood-fired oven.'
  },
  {
    id: 'prosciutto-parma',
    name: 'Prosciutto di Parma & San Daniele Affiné',
    nameEn: 'Aged Prosciutto di Parma & San Daniele',
    italianName: 'Salumi Artigianali',
    origin: 'Parme & Frioul, Italie',
    originEn: 'Parma & Friuli, Italy',
    description: 'Tranché finement à la minute, délicatement salé au sel marin naturel et affiné au vent des collines italiennes pendant 24 mois.',
    descriptionEn: 'Sliced thinly to order, cured with natural sea salt and aged in the dry winds of the Italian hills for 24 months.',
    terroirNote: 'Posé à la sortie du four pour préserver toute sa finesse et son fondant.',
    terroirNoteEn: 'Placed delicately right out of the oven to preserve its delicate aromas and silky texture.'
  },
  {
    id: 'tartufo-nero',
    name: 'Truffe Noire & Crème Truffée Italienne',
    nameEn: 'Black Truffle & Italian Truffle Cream',
    italianName: 'Tartufo Nero Pregiato',
    origin: 'Ombrie & Piémont',
    originEn: 'Umbria & Piedmont, Italy',
    description: 'La signature de notre pizza emblématique La Félicità : une crème onctueuse de truffes noires sublimée par une burrata fondante.',
    descriptionEn: 'The hallmark of our signature pizza La Félicità: a luscious black truffle cream elevated by a whole molten burrata.',
    terroirNote: 'Arôme boisé noble et puissant, emblème de la haute gastronomie transalpine.',
    terroirNoteEn: 'Noble woody aroma and earthiness, the crowning jewel of authentic transalpine dining.'
  },
  {
    id: 'parmigiano-24',
    name: 'Parmigiano Reggiano DOP 24 Mois',
    nameEn: 'Parmigiano Reggiano DOP Aged 24 Months',
    italianName: 'Re dei Formaggi',
    origin: 'Émilie-Romagne',
    originEn: 'Emilia-Romagna, Italy',
    description: 'Râpé ou en copeaux sur nos pâtes fraîches et nos carpaccios, apportant cette touche umami unique et cristalline.',
    descriptionEn: 'Grated fresh or shaved into delicate crystals over our pasta and carpaccios, delivering complex crystalline umami.',
    terroirNote: 'Affinage naturel garanti, issu d’élevages traditionnels d’Émilie-Romagne.',
    terroirNoteEn: 'Guaranteed natural aging from certified historic dairies in Emilia-Romagna.'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // Pizzas Base Tomate
  {
    id: 'p-margherita',
    name: 'La Margherita',
    category: 'pizza_rosso',
    description: 'Sauce tomate San Marzano DOP, mozzarella fior di latte, basilic frais, huile d’olive extra vierge.',
    descriptionEn: 'San Marzano DOP tomato sauce, fior di latte mozzarella, fresh basil, extra virgin olive oil.',
    price: 9.00,
    isVegetarian: true,
    highlight: 'Le classique intemporel de Naples',
    highlightEn: 'The timeless classic of Naples',
    pairing: 'Birra Moretti ou Chianti Classico',
    pairingEn: 'Birra Moretti or Chianti Classico'
  },
  {
    id: 'p-regina',
    name: 'La Regina',
    category: 'pizza_rosso',
    description: 'Sauce tomate, mozzarella fior di latte, champignons frais de Paris émincés, jambon cuit supérieur.',
    descriptionEn: 'Tomato sauce, fior di latte mozzarella, fresh button mushrooms, premium Italian cooked ham.',
    price: 11.00,
    pairing: 'Valpolicella Ripasso',
    pairingEn: 'Valpolicella Ripasso'
  },
  {
    id: 'p-vivaldi',
    name: 'La Vivaldi',
    category: 'pizza_rosso',
    description: 'Sauce tomate, mozzarella, aubergines grillées maison, champignons, tomates cerises confites, olives taggiasche, jambon.',
    descriptionEn: 'Tomato sauce, mozzarella, house grilled aubergines, mushrooms, confit cherry tomatoes, Taggiasca olives, ham.',
    price: 12.50,
    pairing: 'Chianti DOCG',
    pairingEn: 'Chianti DOCG'
  },
  {
    id: 'p-carne',
    name: 'La Carne',
    category: 'pizza_rosso',
    description: 'Sauce tomate, mozzarella fior di latte, bœuf haché assaisonné, oignons fondants, beurre persillé maison, poivrons marinés.',
    descriptionEn: 'Tomato sauce, fior di latte, seasoned minced beef, caramelized onions, house parsley butter, marinated peppers.',
    price: 12.50,
    pairing: 'Montepulciano d’Abruzzo',
    pairingEn: 'Montepulciano d’Abruzzo'
  },
  {
    id: 'p-cannibale',
    name: 'Il Cannibale',
    category: 'pizza_rosso',
    description: 'Sauce tomate, mozzarella, merguez artisanale, spianata calabraise épicée, filet de poulet rôti, bœuf haché.',
    descriptionEn: 'Tomato sauce, mozzarella, artisan merguez, spicy Calabrian spianata, roasted chicken fillet, seasoned beef.',
    price: 13.50,
    badge: 'Généreuse & Épicée',
    badgeEn: 'Hearty & Spicy',
    pairing: 'Lambrusco di Modena',
    pairingEn: 'Lambrusco di Modena'
  },
  {
    id: 'p-cinque-formaggi',
    name: 'La Cinque Formaggi',
    category: 'pizza_rosso',
    description: 'Sauce tomate douce, mozzarella, gorgonzola crémeux DOP, chèvre fermier, taleggio doux, camembert di bufala crémeux.',
    descriptionEn: 'Sweet tomato sauce, mozzarella, creamy Gorgonzola DOP, farmhouse goat cheese, gentle Taleggio, creamy buffalo camembert.',
    price: 13.50,
    isVegetarian: true,
    badge: '5 Fromages Nobles',
    badgeEn: '5 Noble Cheeses',
    pairing: 'Valpolicella',
    pairingEn: 'Valpolicella'
  },
  {
    id: 'p-napoli',
    name: 'La Napoli',
    category: 'pizza_rosso',
    description: 'Sauce tomate San Marzano, mozzarella, filets d’anchois de Méditerranée, stracciatella di bufala fraîche, zeste de citron jaune, basilic.',
    descriptionEn: 'San Marzano tomato sauce, mozzarella, Mediterranean anchovy fillets, fresh buffalo stracciatella, lemon zest, basil.',
    price: 13.90,
    badge: 'Coup de Cœur',
    badgeEn: 'Chef’s Favorite',
    pairing: 'Pinot Grigio delle Venezie',
    pairingEn: 'Pinot Grigio delle Venezie'
  },
  {
    id: 'p-burrata-rosso',
    name: 'La Burrata',
    category: 'pizza_rosso',
    description: 'Sauce tomate, burrata entière crémeuse posée au centre, jambon serrano affiné, roquette sauvage, tomates confites, crème balsamique di Modena.',
    descriptionEn: 'Tomato sauce, whole creamy burrata placed in the center, aged cured ham, wild rocket, confit tomatoes, Modena balsamic reduction.',
    price: 14.50,
    highlight: 'Fraîcheur et onctuosité absolue',
    highlightEn: 'Absolute freshness and creaminess',
    pairing: 'Prosecco Superiore DOCG',
    pairingEn: 'Prosecco Superiore DOCG'
  },

  // Pizzas Base Crème
  {
    id: 'p-capra-miele',
    name: 'La Capra e Miele',
    category: 'pizza_bianco',
    description: 'Crème fraîche légère, mozzarella, fromage de chèvre cendré, miel doux de fleurs, cerneaux de noix croquants.',
    descriptionEn: 'Light cream base, mozzarella, ashed goat cheese, wildflower honey, toasted walnuts.',
    price: 12.00,
    isVegetarian: true,
    pairing: 'Soave Classico',
    pairingEn: 'Soave Classico'
  },
  {
    id: 'p-calzone',
    name: 'Il Calzone Traditionnel',
    category: 'pizza_bianco',
    description: 'Chausson doré au feu de bois : mozzarella fior di latte, jambon supérieur, champignons émincés, œuf fermier coulant, crème.',
    descriptionEn: 'Folded pizza baked in the wood oven: fior di latte mozzarella, ham, sliced mushrooms, runny farm egg, light cream.',
    price: 12.00,
    highlight: 'Cuit à cœur dans la voûte du four',
    highlightEn: 'Baked to perfection in the stone dome',
    pairing: 'Chianti Classico',
    pairingEn: 'Chianti Classico'
  },
  {
    id: 'p-dolomitti',
    name: 'La Dolomitti',
    category: 'pizza_bianco',
    description: 'Crème légère, mozzarella, boursin aillé fondant, pommes de terre sautées, jambon cuit, champignons de Paris.',
    descriptionEn: 'Light cream, mozzarella, melting garlic boursin, sautéed potatoes, cooked ham, Paris mushrooms.',
    price: 12.50,
    pairing: 'Chardonnay delle Venezie',
    pairingEn: 'Chardonnay delle Venezie'
  },
  {
    id: 'p-vesuvio',
    name: 'La Vesuvio',
    category: 'pizza_bianco',
    description: 'Taleggio fondant, mozzarella, pommes de terre rôties, oignons doux caramélisés, lard fumé croustillant.',
    descriptionEn: 'Melting Taleggio, mozzarella, roasted potatoes, caramelized sweet onions, crispy smoked bacon.',
    price: 12.50,
    pairing: 'Barbera d’Asti',
    pairingEn: 'Barbera d’Asti'
  },
  {
    id: 'p-salmone',
    name: 'La Salmone',
    category: 'pizza_bianco',
    description: 'Base crème citronnée, mozzarella, duo de saumon fumé et frais, tomates cerises, oignons rouges, câpres de Pantelleria.',
    descriptionEn: 'Lemon-infused cream, mozzarella, duo of fresh and smoked salmon, cherry tomatoes, red onions, Pantelleria capers.',
    price: 12.50,
    pairing: 'Vermentino di Sardegna',
    pairingEn: 'Vermentino di Sardegna'
  },
  {
    id: 'p-calabrese-bianca',
    name: 'La Calabrese Bianca',
    category: 'pizza_bianco',
    description: 'Fior di latte, camembert di bufala, saucisse calabraise artisanale parfumée, roquette fraîche, copeaux de Parmigiano Reggiano.',
    descriptionEn: 'Fior di latte, buffalo camembert, seasoned Calabrian sausage, fresh rocket, shavings of Parmigiano Reggiano.',
    price: 14.00,
    pairing: 'Nero d’Avola',
    pairingEn: 'Nero d’Avola'
  },

  // Signatures
  {
    id: 'p-mortadella-pistacchio',
    name: 'Mortadella e Pistacchi',
    category: 'pizza_bianco',
    description: 'Base mozzarella, roquette fraîche, basilic, fine mortadelle de Bologne IGP, pistaches de Bronte concassées, pesto vert maison, cœur de burrata.',
    descriptionEn: 'Mozzarella base, fresh rocket, basil, delicate Bologna IGP mortadella, crushed Bronte pistachios, house pesto, heart of burrata.',
    price: 14.50,
    badge: 'Spécialité Signature',
    badgeEn: 'Signature Special',
    highlight: 'Contraste sublime chaud & froid',
    highlightEn: 'Sublime hot & fresh temperature contrast',
    pairing: 'Prosecco di Valdobbiadene',
    pairingEn: 'Prosecco di Valdobbiadene'
  },
  {
    id: 'p-la-felicita',
    name: 'La Félicità (Éponyme du Chef)',
    category: 'pizza_bianco',
    description: 'Base crème onctueuse à la truffe noire d’Italie, généreuse burrata truffée entière, roquette poivrée, tomates séchées fondantes.',
    descriptionEn: 'Silky Italian black truffle cream base, generous whole truffled burrata, peppery wild rocket, slow-dried sweet tomatoes.',
    price: 16.00,
    badge: 'La Signature Maison',
    badgeEn: 'House Icon',
    highlight: 'La pizza icône du restaurant',
    highlightEn: 'The flagship pizza of the restaurant',
    pairing: 'Barolo DOCG ou Chianti Riserva',
    pairingEn: 'Barolo DOCG or Chianti Riserva'
  },

  // Pâtes Fraîches Artisanales
  {
    id: 'pasta-tartufo',
    name: 'Tagliatelle al Tartufo Nero',
    category: 'pasta',
    description: 'Tagliatelles fraîches façonnées maison, émulsion de beurre fermier, crème de truffe d’été, copeaux de truffe noire et Parmigiano 24 mois.',
    descriptionEn: 'Handmade fresh tagliatelle pasta, farmhouse butter emulsion, summer truffle cream, black truffle shavings, 24-month Parmigiano.',
    price: 18.50,
    isVegetarian: true,
    highlight: 'Pâtes fraîches laminées chaque matin',
    highlightEn: 'Fresh pasta rolled every single morning',
    pairing: 'Valpolicella Ripasso',
    pairingEn: 'Valpolicella Ripasso'
  },
  {
    id: 'pasta-vongole',
    name: 'Linguine alle Vongole Veraci',
    category: 'pasta',
    description: 'Linguine fraîches, palourdes fraîches de Méditerranée, ail doux, vin blanc sec, persil plat ciselé, piment doux et huile d’olive.',
    descriptionEn: 'Fresh linguine, Mediterranean clams, gentle garlic, dry white wine, flat-leaf parsley, mild chili, extra virgin olive oil.',
    price: 17.50,
    pairing: 'Vermentino di Gallura',
    pairingEn: 'Vermentino di Gallura'
  },
  {
    id: 'pasta-ravioles-ricotta',
    name: 'Ravioles Maison Ricotta & Épinards',
    category: 'pasta',
    description: 'Grandes ravioles maison farcies à la ricotta fraîche et épinards sauvages, crème de parmesan et sauge croustillante.',
    descriptionEn: 'Handcrafted large ravioli filled with fresh ricotta and wild spinach, parmesan cream, crispy butter-fried sage.',
    price: 16.00,
    isVegetarian: true,
    pairing: 'Soave Classico',
    pairingEn: 'Soave Classico'
  },
  {
    id: 'pasta-pomodoro-burrata',
    name: 'Linguine al Pomodoro Fresco e Burrata',
    category: 'pasta',
    description: 'Sauce aux tomates San Marzano confites lentement, ail confit, basilic frais et une demi-burrata crémeuse déposée minute.',
    descriptionEn: 'Slow-simmered San Marzano tomatoes, confit garlic, fresh basil, topped with a creamy half burrata.',
    price: 15.50,
    isVegetarian: true,
    pairing: 'Chianti Classico',
    pairingEn: 'Chianti Classico'
  },

  // Gratins au feu de bois & Plats
  {
    id: 'sec-melanzane',
    name: 'Gratin d’Aubergines du Chef (Melanzane alla Parmigiana)',
    category: 'gratins_secondi',
    description: 'Spécialité historique du chef cuite au four à bois : fines tranches d’aubergines fondantes, coulis de tomate maison, basilic, mozzarella di bufala et parmesan doré.',
    descriptionEn: 'Historic chef’s specialty baked in the wood oven: tender layered aubergines, house tomato coulis, fresh basil, buffalo mozzarella, golden parmesan crust.',
    price: 15.50,
    isVegetarian: true,
    badge: 'Recette du Chef',
    badgeEn: 'Chef’s Heritage Recipe',
    highlight: 'Cuisson lente à la braise',
    highlightEn: 'Slow-baked over wood embers',
    pairing: 'Chianti Classico',
    pairingEn: 'Chianti Classico'
  },
  {
    id: 'sec-milanese',
    name: 'Escalope Milanaise Croustillante',
    category: 'gratins_secondi',
    description: 'Fine escalope de veau panée à la chapelure dorée et parmesan, beurre clarifié, quartiers de citron de Sorrente, servie avec linguine fraîches.',
    descriptionEn: 'Crispy breaded veal escalope crusted in parmesan breadcrumbs, clarified butter, Sorrento lemon wedges, served with fresh linguine.',
    price: 19.50,
    pairing: 'Valpolicella Classico',
    pairingEn: 'Valpolicella Classico'
  },
  {
    id: 'sec-boeuf',
    name: 'Filet de Bœuf au Feu de Bois & Morilles',
    category: 'gratins_secondi',
    description: 'Pièce noble de bœuf saisie à la flamme du four à bois, sauce onctueuse aux morilles parfumées et pommes de terre grenailles rôties au romarin.',
    descriptionEn: 'Prime cut of beef seared over wood flames, fragrant morel mushroom cream sauce, roasted rosemary baby potatoes.',
    price: 24.00,
    badge: 'Viande Noble',
    badgeEn: 'Prime Meat',
    pairing: 'Barolo ou Brunello di Montalcino',
    pairingEn: 'Barolo or Brunello di Montalcino'
  },
  {
    id: 'sec-carpaccio-san-daniele',
    name: 'Grand Carpaccio di Manzo San Daniele',
    category: 'gratins_secondi',
    description: 'Fines tranches de bœuf charolais, huile d’olive extra vierge de Toscane, citron pressé, câpres sauvages, roquette et abondance de Parmigiano Reggiano 24 mois.',
    descriptionEn: 'Thin slices of prime beef, Tuscan extra virgin olive oil, fresh lemon juice, wild capers, rocket, generous Parmigiano Reggiano 24-month shavings.',
    price: 16.00,
    pairing: 'Lambrusco sec',
    pairingEn: 'Dry Lambrusco'
  },

  // Antipasti
  {
    id: 'anti-burrata',
    name: 'Burrata Crémeuse des Pouilles & Tomates Antiques',
    category: 'antipasti',
    description: 'Burrata entière 200g, carpaccio de tomates de saison, pesto de basilic au pilon, fleur de sel de Guérande et réduction balsamique.',
    descriptionEn: 'Whole 200g artisanal burrata, heirloom tomato carpaccio, mortar-ground basil pesto, Guérande fleur de sel, balsamic glaze.',
    price: 13.50,
    isVegetarian: true,
    pairing: 'Aperol Spritz',
    pairingEn: 'Aperol Spritz'
  },
  {
    id: 'anti-bufala-prosciutto',
    name: 'Mozzarella di Bufala Campana & Prosciutto di Parma',
    category: 'antipasti',
    description: 'Boule de mozzarella di Bufala Campana DOP servie avec le véritable jambon de Parme affiné 24 mois et gressins artisanaux.',
    descriptionEn: 'Whole Mozzarella di Bufala Campana DOP served with authentic 24-month aged Parma prosciutto and artisanal breadsticks.',
    price: 14.00,
    pairing: 'Prosecco Valdobbiadene',
    pairingEn: 'Prosecco Valdobbiadene'
  },
  {
    id: 'anti-bruschette',
    name: 'Trio de Bruschette Rustiche',
    category: 'antipasti',
    description: 'Pain de campagne grillé frotté à l’ail, concassée de tomates fraîches au basilic, crème de truffe et gorgonzola crémeux aux noix.',
    descriptionEn: 'Toasted rustic bread rubbed with garlic, crushed fresh tomatoes and basil, truffle cream, creamy Gorgonzola with walnuts.',
    price: 9.50,
    isVegetarian: true,
    pairing: 'Spritz Campari',
    pairingEn: 'Spritz Campari'
  },
  {
    id: 'anti-misto',
    name: 'Planche de Dégustation d’Antipasti Misto (Pour 2)',
    category: 'antipasti',
    description: 'Assortiment généreux : charcuteries fines italiennes, légumes marinés à l’huile d’olive, artichauts alla romana, olives taggiasche et focaccia maison.',
    descriptionEn: 'Generous sharing platter: fine Italian charcuterie, marinated seasonal vegetables, artichokes alla romana, Taggiasca olives, warm focaccia.',
    price: 19.50,
    highlight: 'Idéal à partager en entrée',
    highlightEn: 'Ideal for two to share',
    pairing: 'Chianti ou Spritz',
    pairingEn: 'Chianti or Spritz'
  },

  // Dolci Maison
  {
    id: 'dolci-tiramisu',
    name: 'Tiramisù Tradizionale Fait Maison',
    category: 'dolci',
    description: 'La spécialité du chef depuis plus de 20 ans : biscuits savoiardi imbibés d’espresso italien puissant, crème mascarpone aérienne et cacao amer.',
    descriptionEn: 'The chef’s hallmark dessert for over 20 years: espresso-soaked savoiardi ladyfingers, velvety mascarpone cream, dark Valrhona cocoa.',
    price: 7.50,
    badge: 'La Spécialité du Chef',
    badgeEn: 'Chef’s Signature',
    highlight: 'Recette historique réputée à Grenoble',
    highlightEn: 'Celebrated historic Grenoble recipe'
  },
  {
    id: 'dolci-panna-cotta',
    name: 'Panna Cotta à la Vanille Bourbon',
    category: 'dolci',
    description: 'Crème soyeuse infusée à la vanille bourbon de Madagascar, coulis de fruits rouges acidulés ou caramel maison au beurre salé.',
    descriptionEn: 'Silky cream infused with Madagascar bourbon vanilla, served with tart berry coulis or salted butter caramel.',
    price: 7.00
  },
  {
    id: 'dolci-souffle-genepi',
    name: 'Soufflé Glacé Grand Marnier & Génépi des Alpes',
    category: 'dolci',
    description: 'Création artisanale célébrant le terroir grenoblois et la tradition italienne : soufflé glacé aux notes d’herbes alpines et d’orange amère.',
    descriptionEn: 'Artisanal creation uniting the Grenoble alpine terroir with Italian craft: frozen soufflé infused with alpine Génépi and bitter orange.',
    price: 8.50,
    badge: 'Création Alpine & Italienne',
    badgeEn: 'Alpine & Italian Fusion'
  },
  {
    id: 'dolci-nougat',
    name: 'Nougat Glacé Artisanal aux Éclats de Pistache',
    category: 'dolci',
    description: 'Miel de montagne, fruits secs torréfiés et coulis de framboises sauvages.',
    descriptionEn: 'Mountain honey, roasted nuts, wild raspberry coulis.',
    price: 7.50
  },
  {
    id: 'dolci-affogato',
    name: 'Affogato al Caffè',
    category: 'dolci',
    description: 'Boule de glace artisanale à la vanille des Alpes noyée sous un double espresso chaud à l’italienne.',
    descriptionEn: 'Scoop of artisanal alpine vanilla gelato drowned in a hot double Italian espresso shot.',
    price: 5.50
  },

  // Vins & Boissons
  {
    id: 'bev-spritz-aperol',
    name: 'Spritz Tradizionale (Aperol ou Campari)',
    category: 'bevande',
    description: 'Prosecco DOC, Aperol ou Campari, trait d’eau gazeuse, tranche d’orange fraîche et olive verte.',
    descriptionEn: 'Prosecco DOC, Aperol or Campari, splash of sparkling water, fresh orange slice, green olive.',
    price: 7.50
  },
  {
    id: 'bev-chianti',
    name: 'Chianti Classico DOCG (Bouteille 75cl)',
    category: 'bevande',
    description: 'Région Toscane. Arômes de cerise griotte, violette et notes épicées de chêne. Robe rubis intense.',
    descriptionEn: 'Tuscany region. Rich notes of morello cherry, violet, and gentle toasted oak. Intense ruby color.',
    price: 28.00
  },
  {
    id: 'bev-lambrusco',
    name: 'Lambrusco di Modena Frizzante DOC (75cl)',
    category: 'bevande',
    description: 'Pétillant rouge d’Émilie-Romagne, sec et fruité, le compagnon inséparable de la pizza artisanale.',
    descriptionEn: 'Sparkling red from Emilia-Romagna, dry and fruity, the authentic pairing for wood-fired pizza.',
    price: 22.00
  },
  {
    id: 'bev-prosecco',
    name: 'Prosecco Superiore di Valdobbiadene DOCG (75cl)',
    category: 'bevande',
    description: 'Effervescence fine et persistante, notes de pomme verte et fleurs blanches.',
    descriptionEn: 'Fine, persistent effervescence with crisp notes of green apple and white blossoms.',
    price: 32.00
  },
  {
    id: 'bev-moretti',
    name: 'Birra Moretti Ricetta Originale (33cl)',
    category: 'bevande',
    description: 'Bière blonde italienne de tradition depuis 1859, fraîche et maltée.',
    descriptionEn: 'Traditional Italian lager brewed since 1859, crisp and malt-forward.',
    price: 5.00
  },
  {
    id: 'bev-sanpellegrino',
    name: 'San Pellegrino / Acqua Panna (75cl)',
    category: 'bevande',
    description: 'Eau minérale pétillante ou plate des thermes italiens.',
    descriptionEn: 'Sparkling or still premium Italian mineral water.',
    price: 4.50
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    src: IMAGES.heroPizza,
    title: 'Sortie du Four à Bois',
    titleEn: 'Fresh Out of the Wood Oven',
    caption: 'Cuisson vive à haute température dans notre voûte de pierre au 34 Quai Perrière.',
    captionEn: 'High-temperature flash baking in our stone dome oven at 34 Quai Perrière.',
    category: 'Pizzas & Four',
    categoryEn: 'Pizza & Oven'
  },
  {
    id: 'gal-2',
    src: IMAGES.burrataPizza,
    title: 'La Felicità Signature',
    titleEn: 'La Felicità Signature',
    caption: 'Burrata crémeuse des Pouilles, prosciutto affiné et truffe noire d’Italie.',
    captionEn: 'Creamy Puglia burrata, aged prosciutto, and Italian black truffle.',
    category: 'Plats d’Exception',
    categoryEn: 'Signature Dishes'
  },
  {
    id: 'gal-3',
    src: IMAGES.freshPasta,
    title: 'Pâtes Fraîches Façonnées Maison',
    titleEn: 'Handmade Fresh Pasta',
    caption: 'Tagliatelles fraîches au beurre de sauge et Parmigiano Reggiano 24 mois.',
    captionEn: 'Fresh tagliatelle tossed in sage butter and 24-month Parmigiano Reggiano.',
    category: 'Pâtes Fraîches',
    categoryEn: 'Fresh Pasta'
  },
  {
    id: 'gal-4',
    src: IMAGES.restaurantInterior,
    title: 'L’Atmosphère Chaleureuse des Quais',
    titleEn: 'Warm Atmosphere on the Riverbank',
    caption: 'Murs de pierre authentiques, lumière dorée et convivialité au bord de l’Isère.',
    captionEn: 'Exposed stone walls, amber pendant glow, and warm hospitality by the Isère river.',
    category: 'Le Restaurant',
    categoryEn: 'The Restaurant'
  },
  {
    id: 'gal-5',
    src: IMAGES.tiramisu,
    title: 'Le Tiramisù Célèbre du Chef',
    titleEn: 'The Chef’s Celebrated Tiramisù',
    caption: 'La recette signature qui fait la réputation du restaurant depuis deux décennies.',
    captionEn: 'The signature recipe that has earned the restaurant its renown for two decades.',
    category: 'Dolci Fait Maison',
    categoryEn: 'Homemade Desserts'
  }
];
