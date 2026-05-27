import Hero from "@/components/Hero";
import DishCarousel from "@/components/DishCarousel";
import Philosophy from "@/components/Philosophy";
import MenuSection from "@/components/MenuSection";
import Reviews from "@/components/Reviews";
import InfoSection from "@/components/InfoSection";
import PhotoCollage from "@/components/PhotoCollage";

export default function Home() {
  return (
    <>
      <Hero />
      <DishCarousel />
      <Philosophy />
      <MenuSection />
      <Reviews />
      <InfoSection />
      <PhotoCollage />
    </>
  );
}
