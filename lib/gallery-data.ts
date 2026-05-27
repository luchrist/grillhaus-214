export interface GalleryItem {
  src: string;
  alt: string;
}

// Curated from the Grillhaus 214 acquisition photos and the stock-media pool
// fetched during acquisition. Provide images to render the curated gallery.
export const galleryItems: GalleryItem[] = [
  {
    src: "/assets/acquisition/restaurant/restaurant-auenansicht-grill-haus-01.jpg",
    alt: "Außenansicht des Grillhaus 214 an der Hauptstraße in Eppelheim",
  },
  {
    src: "/assets/gallery-1.webp",
    alt: "Frisch gegrillte türkische Spezialitäten vom Drehspieß",
  },
  {
    src: "/assets/acquisition/restaurant/restaurant-fassade-mit-werbung-01.jpg",
    alt: "Fassade des Grillhaus 214 mit Speisenangebot",
  },
  {
    src: "/assets/gallery-3.webp",
    alt: "Türkische Grillgerichte und frisches Fladenbrot",
  },
  {
    src: "/assets/about-gallery-1.webp",
    alt: "Drehspieß mit saftigem Hähnchen- und Kalbfleisch",
  },
  {
    src: "/assets/acquisition/restaurant/auenansicht-imbiss-mit-fenster-01.jpg",
    alt: "Eingang und Bestelltresen des Grillhaus 214",
  },
];
