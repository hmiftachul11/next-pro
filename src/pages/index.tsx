import Layout from "@/components/Layout";
import Categories from "@/components/views/Home/Categories";
import HeroSection from "@/components/views/Home/Hero";
import PromoSection from "@/components/views/Home/CategoryContent";
import CategoryContent from "@/components/views/Home/CategoryContent";
import Offer from "@/components/views/Home/Offer";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <Offer />
      <Categories />
      <CategoryContent />
    </Layout>
  );
}
