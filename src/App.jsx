import CustomCursor from './components/CustomCursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Compare from './components/Compare';
import AudioFeature from './components/AudioFeature';
import StampSection from './components/StampSection';
import Locations from './components/Locations';
import HowItWorks from './components/HowItWorks';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <CustomCursor />
      <div className="grain" />
      <Nav />
      <main>
        <Hero />
        <Compare />
        <AudioFeature />
        <StampSection />
        <Locations />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
