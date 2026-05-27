export interface LocationConfig {
  slug: string;
  name: string;
  subtitle: string;
  address: {
    street: string;
    zip: string;
    city: string;
  };
  phone: string;
  phoneLink: string;
  email: string;
  googleMapsUrl: string;
  openingHours: {
    label: string;
    times: string;
  }[];
  menu: MenuCategory[];
  dishes: DishItem[];
  reviews: Review[];
  galleryImages: string[];
  philosophy: {
    headline: string;
    text: string;
    slogan: string;
  };
}

export interface MenuCategory {
  name: string;
  icon: string;
  items: MenuItem[];
}

export interface MenuItem {
  name: string;
  description?: string;
  price?: string;
  tags?: string[];
}

export interface DishItem {
  name: string;
  image: string;
}

export interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}
