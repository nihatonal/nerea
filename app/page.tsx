import NereaHeroSequence from "@/components/home/NereaHeroSequence";
import EveningExperience from "@/components/home/EveningExperience";
import SignatureCollection from "@/components/home/SignatureCollection";
import PhilosophySection from "@/components/home/PhilosophySection";
import PrivateDiningSection from "@/components/home/PrivateDiningSection";
import ReservationJourney from "@/components/home/ReservationJourney";
import LocationSection from "@/components/home/LocationSection";
import FinalCTA from "@/components/home/FinalCTA";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main>
      <Header />
      <NereaHeroSequence />
      <EveningExperience />
      <SignatureCollection />
      <PhilosophySection />
      <PrivateDiningSection />
      <ReservationJourney />
      <LocationSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
