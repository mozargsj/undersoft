import Header from "./components/Header";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import BlankSection from "./components/BlankSection";
import SolutionSection from "./components/SolutionSection";
import ServicesSection from "./components/ServicesSection";
import ProcessSection from "./components/ProcessSection";
import IntegrationsSection from "./components/IntegrationsSection";
import ReviewsSection from "./components/ReviewsSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import CtaSection from "./components/CtaSection";
import FaqSection from "./components/FaqSection";
import FloatingCta from "./components/FloatingCta";
import Footer from "./components/Footer";
import useParallaxReveal from "./hooks/useParallaxReveal";
import useSmoothScroll from "./hooks/useSmoothScroll";
import useSmoothSticky from "./hooks/useSmoothSticky";
import useCardReveal from "./hooks/useCardReveal";

function App() {
  useSmoothScroll();
  useParallaxReveal();
  useSmoothSticky();
  useCardReveal();

  return (
    <>
      <Header />

      <main id="top">
        <Hero />
        <ProblemSection />
        <BlankSection />
        <SolutionSection />
        <ServicesSection />
        <IntegrationsSection />
        <ProcessSection />
        <ReviewsSection />
        <AboutSection />
        <ContactSection />
        <FaqSection />
        <CtaSection />
      </main>

      <FloatingCta />

      <Footer />
    </>
  );
}

export default App;