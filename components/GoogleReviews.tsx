// Server Component — fetches from Google Places API (New)
// Falls back to reviews-data if GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID are not set.

import GoogleReviewsCarousel from "./GoogleReviewsCarousel";
import { reviewsData } from "@/lib/reviews-data";

interface Review {
  author: string;
  rating: number;
  text: string;
  time: string;
}

async function fetchGoogleReviews(): Promise<{
  reviews: Review[];
  rating: number;
  totalRatings: number;
} | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return null;
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount&key=${apiKey}`,
      {
        next: { revalidate: 3600 },
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "reviews,rating,userRatingCount",
        },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();

    if (!data.reviews) return null;

    const allReviews: Review[] = data.reviews.map(
      (r: {
        authorAttribution?: { displayName?: string };
        rating?: number;
        text?: { text?: string };
        relativePublishTimeDescription?: string;
      }) => ({
        author: r.authorAttribution?.displayName ?? "Gast",
        rating: r.rating ?? 5,
        text: r.text?.text ?? "",
        time: r.relativePublishTimeDescription ?? "",
      })
    );

    const reviews = allReviews.filter((r) => r.rating === 5);

    return {
      reviews,
      rating: data.rating ?? 5,
      totalRatings: data.userRatingCount ?? allReviews.length,
    };
  } catch {
    return null;
  }
}

export default async function GoogleReviews() {
  const apiData = await fetchGoogleReviews();

  const reviews = apiData?.reviews ?? reviewsData.reviews;
  const overallRating = apiData?.rating ?? reviewsData.overallRating;
  const totalRatings = apiData?.totalRatings ?? reviewsData.totalRatings;

  return (
    <GoogleReviewsCarousel
      reviews={reviews}
      overallRating={overallRating}
      totalRatings={totalRatings}
    />
  );
}
