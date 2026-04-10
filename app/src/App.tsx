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
import { AdminPanel } from '@/components/AdminPanel';
import { MapSection } from '@/sections/MapSection';
import { useSiteContent } from '@/context/SiteContentContext';

function App() {
  const { content } = useSiteContent();

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (href) {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }, []);

  useEffect(() => {
    document.title = content.seo.title;

    const setMeta = (name: string, value: string, attr: 'name' | 'property' = 'name') => {
      let tag = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.content = value;
    };

    setMeta('description', content.seo.description);
    setMeta('keywords', content.seo.keywords);
    setMeta('og:title', content.seo.ogTitle, 'property');
    setMeta('og:description', content.seo.ogDescription, 'property');
    setMeta('og:image', content.seo.ogImage, 'property');
  }, [content.seo]);

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
      <MapSection />
      <FinalCTA />
      <Footer />
      <FloatingButton />
      <AdminPanel />
      <Toaster />
    </div>
  );
}

export default App;
