import { LocationConfig, MenuCategory } from "../types";
import { restaurant } from "@/lib/restaurant";
import { reviewsData } from "@/lib/reviews-data";
import { menuCategories } from "@/lib/menu-data";
import { galleryItems } from "@/lib/gallery-data";
import { dishCarouselItems } from "@/lib/dish-carousel-data";

// Derive the item type from the factory-generated data so the bridge stays valid
// even when the factory regenerates lib/menu-data.ts.
type FactoryMenuItem = (typeof menuCategories)[number]["items"][number];

// Bridge file: assembles the LocationConfig the components consume from the
// factory-generated data modules under lib/. The factory overwrites
// lib/restaurant.ts, lib/reviews-data.ts and lib/menu-data.ts per customer, and
// the content pipeline curates lib/gallery-data.ts and lib/dish-carousel-data.ts.
// Editorial copy that has no acquisition source (the philosophy block) lives here
// and may be rewritten by the content pipeline.

const philosophy = {
  headline: "Vom Drehspieß auf den Teller",
  text: "Im Grillhaus 214 steht der Drehspieß im Mittelpunkt. Hähnchen und Hackfleisch vom Kalb werden frisch aufgespießt, langsam gegart und erst beim Bestellen abgeschnitten. Unser Yufka- und Fladenbrot stellen wir im Haus selbst her, dazu gegrilltes Gemüse, hausgemachte Soßen und frischer Salat. Jedes Gericht geht so über die Theke, wie wir es selbst essen würden.",
  slogan: "Frisch vom Drehspieß, jeden Tag.",
};

function derivePostalCode(cityLine: string, city: string): string {
  const withoutCity = cityLine.replace(city, "").trim();
  return withoutCity || cityLine.split(" ")[0] || "";
}

function deriveTags(item: FactoryMenuItem): string[] | undefined {
  const tags: string[] = [];
  if (item.vegan) tags.push("Vegan");
  if (item.spicy) tags.push("Scharf");
  return tags.length > 0 ? tags : undefined;
}

const menu: MenuCategory[] = menuCategories.map((category) => ({
  name: category.label,
  icon: category.id,
  items: category.items.map((item) => ({
    name: item.name,
    description: item.description,
    price: item.price,
    tags: deriveTags(item),
  })),
}));

// PhotoCollage uses six fixed image slots. The content pipeline may curate fewer
// (the premium gallery contract is five), so cycle the sources to fill all slots.
const gallerySources = galleryItems.map((item) => item.src);
const galleryImages =
  gallerySources.length === 0
    ? []
    : Array.from(
        { length: Math.max(6, gallerySources.length) },
        (_, i) => gallerySources[i % gallerySources.length],
      );

const defaultLocation: LocationConfig = {
  slug: "default",
  name: restaurant.name,
  subtitle: restaurant.address.city,
  address: {
    street: restaurant.address.street,
    zip: derivePostalCode(restaurant.address.cityLine, restaurant.address.city),
    city: restaurant.address.city,
  },
  phone: restaurant.phone,
  phoneLink: restaurant.phoneLink,
  email: restaurant.email,
  googleMapsUrl: restaurant.mapsUrl,
  openingHours: restaurant.hours.map((h) => ({
    label: h.day,
    times: h.closed ? "Geschlossen" : h.time,
  })),
  philosophy,
  menu,
  dishes: dishCarouselItems.map((dish) => ({ name: dish.name, image: dish.image })),
  reviews: reviewsData.reviews.map((review) => ({
    name: review.author,
    rating: review.rating,
    text: review.text,
    date: review.time,
  })),
  galleryImages,
};

export default defaultLocation;
