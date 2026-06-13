"use client";

import dynamic from "next/dynamic";

const EveningExperience = dynamic(() => import("./EveningExperience"), {
  ssr: false,
});

const SignatureCollection = dynamic(() => import("./SignatureCollection"), {
  ssr: false,
});

const PhilosophySection = dynamic(() => import("./PhilosophySection"), {
  ssr: false,
});

const PrivateDiningSection = dynamic(() => import("./PrivateDiningSection"), {
  ssr: false,
});

const ReservationJourney = dynamic(() => import("./ReservationJourney"), {
  ssr: false,
});

const LocationSection = dynamic(() => import("./LocationSection"), {
  ssr: false,
});

const FinalCTA = dynamic(() => import("./FinalCTA"), {
  ssr: false,
});

export default function HomeSections() {
  return (
    <>
      <EveningExperience />
      <SignatureCollection />
      <PhilosophySection />
      <PrivateDiningSection />
      <ReservationJourney />
      <LocationSection />
      <FinalCTA />
    </>
  );
}