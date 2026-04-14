import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ZaraHero from "@/components/ZaraHero";
import ScrollEditorial from "@/components/ScrollEditorial";
import CategoryGrid from "@/components/CategoryGrid";
import HorizontalLookbook from "@/components/HorizontalLookbook";
import MarqueeTicker from "@/components/MarqueeTicker";
import SplitEditorial from "@/components/SplitEditorial";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <ZaraHero />
        <ScrollEditorial />
        <MarqueeTicker />
        {/* <CategoryGrid /> */}
        <HorizontalLookbook />
        <SplitEditorial />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
