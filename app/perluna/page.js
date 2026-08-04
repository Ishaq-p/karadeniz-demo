import HeroSection from "@/components/perluna/hero/HeroSection";
import GallerySection from "@/components/perluna/gallery/GallerySection";
import VirtualAdvisorSection from "@/components/perluna/advisor/VirtualAdvisorSection";
import BookingSection from "@/components/perluna/booking/BookingSection";
import VIPMembershipSection from "@/components/perluna/membership/VIPMembershipSection";
import BlogSection from "@/components/perluna/blog/BlogSection";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <HeroSection />
      <GallerySection />
      <VirtualAdvisorSection />
      <BookingSection />
      <VIPMembershipSection />
      <BlogSection />
    </main>
  );
}
