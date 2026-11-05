export interface MenuItem {
  id: string;
  name: string;
  category: 'pizza_rosso' | 'pizza_bianco' | 'pasta' | 'gratins_secondi' | 'antipasti' | 'dolci' | 'bevande';
  description: string;
  price: number;
  highlight?: string;
  badge?: string;
  isVegetarian?: boolean;
  pairing?: string;
}

export interface IngredientStory {
  id: string;
  name: string;
  italianName: string;
  origin: string;
  description: string;
  terroirNote: string;
}

export const RESTAURANT_INFO = {
  name: 'La Felicità',
  subtitle: 'Restaurant Italien & Pizzeria au Feu de Bois',
  tagline: "Un assaggio d'Italia.",
  subTagline: "Authentic Italian flavors, made with love in the heart of Grenoble.",
  storyHeadline: "Un luogo où l'on se sent chez soi.",
  address: '34 Quai Perrière, 38000 Grenoble, France',
  locationDetails: 'Sur les quais de l’Isère, au pied de la Bastille',
  phone: '+33 4 76 16 81 39',
  phoneDisplay: '04 76 16 81 39',
  email: 'contact@lafelicita-grenoble.fr',
  googleMapsUrl: 'https://maps.google.com/?q=34+Quai+Perriere+38000+Grenoble',
  instagramUrl: 'https://www.instagram.com/lafelicitagrenoble/',
  eatbuUrl: 'https://la-felicita-grenoble.eatbu.com/?lang=en',
  hours: [
    { day: 'Lundi', lunch: '12h10 – 13h45', dinner: '18h30 – 21h45', status: 'Ouvert' },
    { day: 'Mardi', lunch: '12h10 – 13h45', dinner: '18h30 – 21h45', status: 'Ouvert' },
    { day: 'Mercredi', lunch: '12h00 – 13h45', dinner: '18h00 – 21h45', status: 'Ouvert' },
    { day: 'Jeudi', lunch: 'Fermé', dinner: 'Groupes sur réservation', status: 'Sur réservation' },
    { day: 'Vendredi', lunch: '12h10 – 13h45', dinner: '18h30 – 21h45', status: 'Ouvert' },
    { day: 'Samedi', lunch: '12h10 – 13h45', dinner: '18h30 – 21h45', status: 'Ouvert' },
    { day: 'Dimanche', lunch: '12h10 – 13h45', dinner: '18h30 – 21h45', status: 'Ouvert' },
  ],
  features: [
    'Four à bois traditionnel haute température',
    'Pâte à fermentation lente 48h',
    'Pâtes fraîches artisanales faites maison',
    'Ingrédients d’origine protégée DOP et IGP',
    'Terrasse et salle chaleureuse Quai Perrière',
  ]
};

export const IMAGES = {
  heroPizza: '/src/assets/images/hero_woodfired_pizza_1793877443465.jpg',
  burrataPizza: '/src/assets/images/pizza_burrata_truffle_1793877444867.jpg',
  freshPasta: '/src/assets/images/fresh_pasta_tagliatelle_1793877446159.jpg',
  restaurantInterior: '/src/assets/images/restaurant_ambiance_interior_1793877447455.jpg',
  tiramisu: '/src/assets/images/artisan_tiramisu_dessert_1793877446433.jpg',
};

export const INGREDIENTS_DATA: IngredientStory[] = [
  {
    id: 'fior-di-latte',
    name: 'Fior di Latte & Mozzarella di Bufala Campana DOP',
    italianName: 'L’Oro Bianco della Campania',
    origin: 'Campanie & Pouilles, Italie',
    description: 'Une mozzarella crémeuse, fondante au feu de bois sans jamais détremper la pâte, aux notes fraîches de lait de bufflonne.',
    terroirNote: 'Produite selon le cahier des charges traditionnel DOP, livrée fraîche chaque semaine.'
  },
  {
    id: 'san-marzano',
    name: 'Tomates San Marzano DOP dell’Agro Sarnese',
    italianName: 'Il Pomodoro del Vesuvio',
    origin: 'Terres volcaniques du Vésuve',
    description: 'Une acidité parfaitement balancée, une douceur naturelle concentrée et une texture pulpeuse gorgée de soleil italien.',
    terroirNote: 'Récoltées à la main à pleine maturité dans les sols volcaniques du sud de l’Italie.'
  },
  {
    id: 'farina-tipo-00',
    name: 'Farine Tipo 00 & Maturation 48 Heures',
    italianName: 'La Lenta Lievitazione',
    origin: 'Meunerie artisanale italienne',
    description: 'Un empâtement à haute hydratation reposé pendant 48 heures au frais pour une légèreté alvéolée et une digestibilité incomparable.',
    terroirNote: 'Cuisson éclair à plus de 450°C dans notre four à bois de pierre réfractaire.'
  },
  {
    id: 'prosciutto-parma',
    name: 'Prosciutto di Parma & San Daniele Affiné',
    italianName: 'Salumi Artigianali',
    origin: 'Parme & Frioul, Italie',
    description: 'Tranché finement à la minute, délicatement salé au sel marin naturel et affiné au vent des collines italiennes pendant 24 mois.',
    terroirNote: 'Posé à la sortie du four pour préserver toute sa finesse et son fondant.'
  },
  {
    id: 'tartufo-nero',
    name: 'Truffe Noire & Crème Truffée Italienne',
    italianName: 'Tartufo Nero Pregiato',
    origin: 'Ombrie & Piémont',
    description: 'La signature de notre pizza emblématique La Félicità : une crème onctueuse de truffes noires sublimée par une burrata fondante.',
    terroirNote: 'Arôme boisé noble et puissant, emblème de la haute gastronomie transalpine.'
  },
  {
    id: 'parmigiano-24',
    name: 'Parmigiano Reggiano DOP 24 Mois',
    italianName: 'Re dei Formaggi',
    origin: 'Émilie-Romagne',
    description: 'Râpé ou en copeaux sur nos pâtes fraîches et nos carpaccios, apportant cette touche umami unique et cristalline.',
    terroirNote: 'Affinage naturel garanti, issu d’élevages traditionnels d’Émilie-Romagne.'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // Pizzas Base Tomate
  {
    id: 'p-margherita',
    name: 'La Margherita',
    category: 'pizza_rosso',
    description: 'Sauce tomate San Marzano DOP, mozzarella fior di latte, basilic frais, huile d’olive extra vierge.',
    price: 9.00,
    isVegetarian: true,
    highlight: 'Le classique intemporel de Naples',
    pairing: 'Birra Moretti ou Chianti Classico'
  },
  {
    id: 'p-regina',
    name: 'La Regina',
    category: 'pizza_rosso',
    description: 'Sauce tomate, mozzarella fior di latte, champignons frais de Paris émincés, jambon cuit supérieur.',
    price: 11.00,
    pairing: 'Valpolicella Ripasso'
  },
  {
    id: 'p-vivaldi',
    name: 'La Vivaldi',
    category: 'pizza_rosso',
    description: 'Sauce tomate, mozzarella, aubergines grillées maison, champignons, tomates cerises confites, olives taggiasche, jambon.',
    price: 12.50,
    pairing: 'Chianti DOCG'
  },
  {
    id: 'p-carne',
    name: 'La Carne',
    category: 'pizza_rosso',
    description: 'Sauce tomate, mozzarella fior di latte, bœuf haché assaisonné, oignons fondants, beurre persillé maison, poivrons marinés.',
    price: 12.50,
    pairing: 'Montepulciano d’Abruzzo'
  },
  {
    id: 'p-cannibale',
    name: 'Il Cannibale',
    category: 'pizza_rosso',
    description: 'Sauce tomate, mozzarella, merguez artisanale, spianata calabraise épicée, filet de poulet rôti, bœuf haché.',
    price: 13.50,
    badge: 'Généreuse & Épicée',
    pairing: 'Lambrusco di Modena'
  },
  {
    id: 'p-cinque-formaggi',
    name: 'La Cinque Formaggi',
    category: 'pizza_rosso',
    description: 'Sauce tomate douce, mozzarella, gorgonzola crémeux DOP, chèvre fermier, taleggio doux, camembert di bufala crémeux.',
    price: 13.50,
    isVegetarian: true,
    badge: '5 Fromages Nobles',
    pairing: 'Valpolicella'
  },
  {
    id: 'p-napoli',
    name: 'La Napoli',
    category: 'pizza_rosso',
    description: 'Sauce tomate San Marzano, mozzarella, filets d’anchois de Méditerranée, stracciatella di bufala fraîche, zeste de citron jaune, basilic.',
    price: 13.90,
    badge: 'Coup de Cœur',
    pairing: 'Pinot Grigio delle Venezie'
  },
  {
    id: 'p-burrata-rosso',
    name: 'La Burrata',
    category: 'pizza_rosso',
    description: 'Sauce tomate, burrata entière crémeuse posée au centre, jambon serrano affiné, roquette sauvage, tomates confites, crème balsamique di Modena.',
    price: 14.50,
    highlight: 'Fraîcheur et onctuosité absolue',
    pairing: 'Prosecco Superiore DOCG'
  },

  // Pizzas Base Crème
  {
    id: 'p-capra-miele',
    name: 'La Capra e Miele',
    category: 'pizza_bianco',
    description: 'Crème fraîche légère, mozzarella, fromage de chèvre cendré, miel doux de fleurs, cerneaux de noix croquants.',
    price: 12.00,
    isVegetarian: true,
    pairing: 'Soave Classico'
  },
  {
    id: 'p-calzone',
    name: 'Il Calzone Traditionnel',
    category: 'pizza_bianco',
    description: 'Chausson doré au feu de bois : mozzarella fior di latte, jambon supérieur, champignons émincés, œuf fermier coulant, crème.',
    price: 12.00,
    highlight: 'Cuit à cœur dans la voûte du four',
    pairing: 'Chianti Classico'
  },
  {
    id: 'p-dolomitti',
    name: 'La Dolomitti',
    category: 'pizza_bianco',
    description: 'Crème légère, mozzarella, boursin aillé fondant, pommes de terre sautées, jambon cuit, champignons de Paris.',
    price: 12.50,
    pairing: 'Chardonnay delle Venezie'
  },
  {
    id: 'p-vesuvio',
    name: 'La Vesuvio',
    category: 'pizza_bianco',
    description: 'Taleggio fondant, mozzarella, pommes de terre rôties, oignons doux caramélisés, lard fumé croustillant.',
    price: 12.50,
    pairing: 'Barbera d’Asti'
  },
  {
    id: 'p-salmone',
    name: 'La Salmone',
    category: 'pizza_bianco',
    description: 'Base crème citronnée, mozzarella, duo de saumon fumé et frais, tomates cerises, oignons rouges, câpres de Pantelleria.',
    price: 12.50,
    pairing: 'Vermentino di Sardegna'
  },
  {
    id: 'p-calabrese-bianca',
    name: 'La Calabrese Bianca',
    category: 'pizza_bianco',
    description: 'Fior di latte, camembert di bufala, saucisse calabraise artisanale parfumée, roquette fraîche, copeaux de Parmigiano Reggiano.',
    price: 14.00,
    pairing: 'Nero d’Avola'
  },

  // Signatures
  {
    id: 'p-mortadella-pistacchio',
    name: 'Mortadella e Pistacchi',
    category: 'pizza_bianco',
    description: 'Base mozzarella, roquette fraîche, basilic, fine mortadelle de Bologne IGP, pistaches de Bronte concassées, pesto vert maison, cœur de burrata.',
    price: 14.50,
    badge: 'Spécialité Signature',
    highlight: 'Contraste sublime chaud & froid',
    pairing: 'Prosecco di Valdobbiadene'
  },
  {
    id: 'p-la-felicita',
    name: 'La Félicità (Éponyme du Chef)',
    category: 'pizza_bianco',
    description: 'Base crème onctueuse à la truffe noire d’Italie, généreuse burrata truffée entière, roquette poivrée, tomates séchées fondantes.',
    price: 16.00,
    badge: 'La Signature Maison',
    highlight: 'La pizza icône du restaurant',
    pairing: 'Barolo DOCG ou Chianti Riserva'
  },

  // Pâtes Fraîches Artisanales
  {
    id: 'pasta-tartufo',
    name: 'Tagliatelle al Tartufo Nero',
    category: 'pasta',
    description: 'Tagliatelles fraîches façonnées maison, émulsion de beurre fermier, crème de truffe d’été, copeaux de truffe noire et Parmigiano 24 mois.',
    price: 18.50,
    isVegetarian: true,
    highlight: 'Pâtes fraîches laminées chaque matin',
    pairing: 'Valpolicella Ripasso'
  },
  {
    id: 'pasta-vongole',
    name: 'Linguine alle Vongole Veraci',
    category: 'pasta',
    description: 'Linguine fraîches, palourdes fraîches de Méditerranée, ail doux, vin blanc sec, persil plat ciselé, piment doux et huile d’olive.',
    price: 17.50,
    pairing: 'Vermentino di Gallura'
  },
  {
    id: 'pasta-ravioles-ricotta',
    name: 'Ravioles Maison Ricotta & Épinards',
    category: 'pasta',
    description: 'Grandes ravioles maison farcies à la ricotta fraîche et épinards sauvages, crème de parmesan et sauge croustillante.',
    price: 16.00,
    isVegetarian: true,
    pairing: 'Soave Classico'
  },
  {
    id: 'pasta-pomodoro-burrata',
    name: 'Linguine al Pomodoro Fresco e Burrata',
    category: 'pasta',
    description: 'Sauce aux tomates San Marzano confites lentement, ail confit, basilic frais et une demi-burrata crémeuse déposée minute.',
    price: 15.50,
    isVegetarian: true,
    pairing: 'Chianti Classico'
  },

  // Gratins au feu de bois & Plats
  {
    id: 'sec-melanzane',
    name: 'Gratin d’Aubergines du Chef (Melanzane alla Parmigiana)',
    category: 'gratins_secondi',
    description: 'Spécialité historique du chef cuite au four à bois : fines tranches d’aubergines fondantes, coulis de tomate maison, basilic, mozzarella di bufala et parmesan doré.',
    price: 15.50,
    isVegetarian: true,
    badge: 'Recette du Chef',
    highlight: 'Cuisson lente à la braise',
    pairing: 'Chianti Classico'
  },
  {
    id: 'sec-milanese',
    name: 'Escalope Milanaise Croustillante',
    category: 'gratins_secondi',
    description: 'Fine escalope de veau panée à la chapelure dorée et parmesan, beurre clarifié, quartiers de citron de Sorrente, servie avec linguine fraîches.',
    price: 19.50,
    pairing: 'Valpolicella Classico'
  },
  {
    id: 'sec-boeuf',
    name: 'Filet de Bœuf au Feu de Bois & Morilles',
    category: 'gratins_secondi',
    description: 'Pièce noble de bœuf saisie à la flamme du four à bois, sauce onctueuse aux morilles parfumées et pommes de terre grenailles rôties au romarin.',
    price: 24.00,
    badge: 'Viande Noble',
    pairing: 'Barolo ou Brunello di Montalcino'
  },
  {
    id: 'sec-carpaccio-san-daniele',
    name: 'Grand Carpaccio di Manzo San Daniele',
    category: 'gratins_secondi',
    description: 'Fines tranches de bœuf charolais, huile d’olive extra vierge de Toscane, citron pressé, câpres sauvages, roquette et abondance de Parmigiano Reggiano 24 mois.',
    price: 16.00,
    pairing: 'Lambrusco sec'
  },

  // Antipasti
  {
    id: 'anti-burrata',
    name: 'Burrata Crémeuse des Pouilles & Tomates Antiques',
    category: 'antipasti',
    description: 'Burrata entière 200g, carpaccio de tomates de saison, pesto de basilic au pilon, fleur de sel de Guérande et réduction balsamique.',
    price: 13.50,
    isVegetarian: true,
    pairing: 'Aperol Spritz'
  },
  {
    id: 'anti-bufala-prosciutto',
    name: 'Mozzarella di Bufala Campana & Prosciutto di Parma',
    category: 'antipasti',
    description: 'Boule de mozzarella di Bufala Campana DOP servie avec le véritable jambon de Parme affiné 24 mois et gressins artisanaux.',
    price: 14.00,
    pairing: 'Prosecco Valdobbiadene'
  },
  {
    id: 'anti-bruschette',
    name: 'Trio de Bruschette Rustiche',
    category: 'antipasti',
    description: 'Pain de campagne grillé frotté à l’ail, concassée de tomates fraîches au basilic, crème de truffe et gorgonzola crémeux aux noix.',
    price: 9.50,
    isVegetarian: true,
    pairing: 'Spritz Campari'
  },
  {
    id: 'anti-misto',
    name: 'Planche de Dégustation d’Antipasti Misto (Pour 2)',
    category: 'antipasti',
    description: 'Assortiment généreux : charcuteries fines italiennes, légumes marinés à l’huile d’olive, artichauts alla romana, olives taggiasche et focaccia maison.',
    price: 19.50,
    highlight: 'Idéal à partager en entrée',
    pairing: 'Chianti ou Spritz'
  },

  // Dolci Maison
  {
    id: 'dolci-tiramisu',
    name: 'Tiramisù Tradizionale Fait Maison',
    category: 'dolci',
    description: 'La spécialité du chef depuis plus de 20 ans : biscuits savoiardi imbibés d’espresso italien puissant, crème mascarpone aérienne et cacao amer.',
    price: 7.50,
    badge: 'La Spécialité du Chef',
    highlight: 'Recette historique réputée à Grenoble'
  },
  {
    id: 'dolci-panna-cotta',
    name: 'Panna Cotta à la Vanille Bourbon',
    category: 'dolci',
    description: 'Crème soyeuse infusée à la vanille bourbon de Madagascar, coulis de fruits rouges acidulés ou caramel maison au beurre salé.',
    price: 7.00
  },
  {
    id: 'dolci-souffle-genepi',
    name: 'Soufflé Glacé Grand Marnier & Génépi des Alpes',
    category: 'dolci',
    description: 'Création artisanale célébrant le terroir grenoblois et la tradition italienne : soufflé glacé aux notes d’herbes alpines et d’orange amère.',
    price: 8.50,
    badge: 'Création Alpine & Italienne'
  },
  {
    id: 'dolci-nougat',
    name: 'Nougat Glacé Artisanal aux Éclats de Pistache',
    category: 'dolci',
    description: 'Miel de montagne, fruits secs torréfiés et coulis de framboises sauvages.',
    price: 7.50
  },
  {
    id: 'dolci-affogato',
    name: 'Affogato al Caffè',
    category: 'dolci',
    description: 'Boule de glace artisanale à la vanille des Alpes noyée sous un double espresso chaud à l’italienne.',
    price: 5.50
  },

  // Vins & Boissons
  {
    id: 'bev-spritz-aperol',
    name: 'Spritz Tradizionale (Aperol ou Campari)',
    category: 'bevande',
    description: 'Prosecco DOC, Aperol ou Campari, trait d’eau gazeuse, tranche d’orange fraîche et olive verte.',
    price: 7.50
  },
  {
    id: 'bev-chianti',
    name: 'Chianti Classico DOCG (Bouteille 75cl)',
    category: 'bevande',
    description: 'Région Toscane. Arômes de cerise griotte, violette et notes épicées de chêne. Robe rubis intense.',
    price: 28.00
  },
  {
    id: 'bev-lambrusco',
    name: 'Lambrusco di Modena Frizzante DOC (75cl)',
    category: 'bevande',
    description: 'Pétillant rouge d’Émilie-Romagne, sec et fruité, le compagnon inséparable de la pizza artisanale.',
    price: 22.00
  },
  {
    id: 'bev-prosecco',
    name: 'Prosecco Superiore di Valdobbiadene DOCG (75cl)',
    category: 'bevande',
    description: 'Effervescence fine et persistante, notes de pomme verte et fleurs blanches.',
    price: 32.00
  },
  {
    id: 'bev-moretti',
    name: 'Birra Moretti Ricetta Originale (33cl)',
    category: 'bevande',
    description: 'Bière blonde italienne de tradition depuis 1859, fraîche et maltée.',
    price: 5.00
  },
  {
    id: 'bev-sanpellegrino',
    name: 'San Pellegrino / Acqua Panna (75cl)',
    category: 'bevande',
    description: 'Eau minérale pétillante ou plate des thermes italiens.',
    price: 4.50
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    src: IMAGES.heroPizza,
    title: 'Sortie du Four à Bois',
    caption: 'Cuisson vive à haute température dans notre voûte de pierre au 34 Quai Perrière.',
    category: 'Pizzas & Four'
  },
  {
    id: 'gal-2',
    src: IMAGES.burrataPizza,
    title: 'La Felicità Signature',
    caption: 'Burrata crémeuse des Pouilles, prosciutto affiné et truffe noire d’Italie.',
    category: 'Plats d’Exception'
  },
  {
    id: 'gal-3',
    src: IMAGES.freshPasta,
    title: 'Pâtes Fraîches Façonnées Maison',
    caption: 'Tagliatelles fraîches au beurre de sauge et Parmigiano Reggiano 24 mois.',
    category: 'Pâtes Fraîches'
  },
  {
    id: 'gal-4',
    src: IMAGES.restaurantInterior,
    title: 'L’Atmosphère Chaleureuse des Quais',
    caption: 'Murs de pierre authentiques, lumière dorée et convivialité au bord de l’Isère.',
    category: 'Le Restaurant'
  },
  {
    id: 'gal-5',
    src: IMAGES.tiramisu,
    title: 'Le Tiramisù Célèbre du Chef',
    caption: 'La recette signature qui fait la réputation du restaurant depuis deux décennies.',
    category: 'Dolci Fait Maison'
  }
];
