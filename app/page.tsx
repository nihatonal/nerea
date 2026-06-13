import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NereaHeroSequence from "@/components/home/NereaHeroSequence";
import HomeSections from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <main>
      <Header />
      <NereaHeroSequence />
      <HomeSections />
      <Footer />
    </main>
  );
}