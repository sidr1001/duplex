import { useEffect } from 'react';
import { Hero } from './sections/Hero';
import { Advantages } from './sections/Advantages';
import { About } from './sections/About';
import { ReadyDuplexes } from './sections/ReadyDuplexes';
import { ConstructionDuplexes } from './sections/ConstructionDuplexes';
import { Mortgage } from './sections/Mortgage';
import { Reviews } from './sections/Reviews';
import { Steps } from './sections/Steps';
import { Guarantees } from './sections/Guarantees';
import { FinalCTA } from './sections/FinalCTA';
import { Footer } from './sections/Footer';
import { FloatingButton } from './components/FloatingButton';
import { Toaster } from '@/components/ui/sonner';

function App() {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Hero />
      <Advantages />
      <About />
      <ReadyDuplexes />
      <ConstructionDuplexes />
      <Mortgage />
      <Reviews />
      <Steps />
      <Guarantees />
      <FinalCTA />
      <Footer />
      <FloatingButton />
      <Toaster />
    </div>
  );
}

export default App;
