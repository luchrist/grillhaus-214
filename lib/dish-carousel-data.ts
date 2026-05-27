export interface DishCarouselItem {
  name: string;
  description: string;
  price?: string;
  image: string;
  alt: string;
  objectPosition?: string;
}

// Curated from the Grillhaus 214 acquisition photo and the stock-media pool
// fetched during acquisition. Keep empty to hide the section; add items to show it.
export const dishCarouselItems: DishCarouselItem[] = [
  {
    name: "Döner Teller mit Pommes",
    description: "Drehspießfleisch mit Pommes, frischem Salat und hausgemachter Soße.",
    price: "10,00 €",
    image: "/assets/acquisition/dishes/doner-teller-mit-pommes-01.jpg",
    alt: "Döner Teller mit Drehspießfleisch, Pommes und Salat",
  },
  {
    name: "Drehspießteller",
    description: "Hähnchenfleisch frisch vom Drehspieß, dazu Pommes, Salat und Soße.",
    price: "10,00 €",
    image: "/assets/featured-1.webp",
    alt: "Drehspießteller mit Hähnchen, Pommes und Salat",
  },
  {
    name: "Hähnchen vom Drehspieß",
    description: "Saftiges, gut gewürztes Hähnchenfleisch, erst auf Bestellung abgeschnitten.",
    price: "10,00 €",
    image: "/assets/featured-3.webp",
    alt: "Teller mit Hähnchen vom Drehspieß und Beilagen",
  },
  {
    name: "Drehspießteller mit Salat",
    description: "Unser meistbestellter Teller: Drehspieß, knusprige Pommes und frischer Salat.",
    price: "10,00 €",
    image: "/assets/featured-5.webp",
    alt: "Voller Drehspießteller mit Salat und Pommes",
  },
];
