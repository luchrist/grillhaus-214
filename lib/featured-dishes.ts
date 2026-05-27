export interface FeaturedDish {
  name: string;
  turkish?: string;
  description: string;
  price?: string;
  image: string;
}

export const featuredDishes: FeaturedDish[] = [
  {
    name: "Drehspießteller",
    description: "Hähnchenfleisch frisch vom Drehspieß, dazu Pommes, Salat und Soße. Der Klassiker, mit dem Sie satt aus dem Haus gehen.",
    price: "10,00 €",
    image: "/assets/featured-1.webp",
  },
  {
    name: "Drehspießteller",
    description: "Hähnchen vom Drehspieß auf dem vollen Teller. Saftiges, gut gewürztes Fleisch mit Pommes, frischem Salat und hausgemachter Soße.",
    price: "10,00 €",
    image: "/assets/featured-3.webp",
  },
  {
    name: "Drehspießteller",
    description: "Unser meistbestellter Teller: Drehspieß-Hähnchen, knusprige Pommes, Salat aus der täglichen Frischlieferung und unsere Hausoße.",
    price: "10,00 €",
    image: "/assets/featured-5.webp",
  },
];
