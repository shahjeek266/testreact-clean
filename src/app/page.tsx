import {
  Hero,
  ProblemStatement,
  Solution,
  Welcome,
  LiveExperience,
  Differentiators,
  PackagesIntro,
  SparkTier,
  PulseTier,
  ApexTier,
  WhyNow,
  Faq,
  CTA,
} from "./components/sections";
import SwiperWrapper from "./components/SwiperWrapper";

export default function Home() {
  // Create components as React elements with proper keys
  const slides = [
    <Hero key="hero" />,
    <Welcome key="welcome" />,
    <ProblemStatement key="problem" />,
    <Solution key="solution" />,
    <LiveExperience key="liveExperience" />,
    <Differentiators key="differentiators" />,
    <PackagesIntro key="packagesIntro" />,
    <SparkTier key="sparkTier" />,
    <PulseTier key="pulseTier" />,
    <ApexTier key="apexTier" />,
    <WhyNow key="whyNow" />,
    <Faq key="faq" />,
    <CTA key="cta" />,
  ];

  return (
    <main>
      <SwiperWrapper>{slides}</SwiperWrapper>
    </main>
  );
}
