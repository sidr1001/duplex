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
import { MapSection } from '@/sections/MapSection';
import { useSiteContent } from '@/context/SiteContentContext';
import { AdminPage } from '@/pages/AdminPage';

const adminPath = import.meta.env.VITE_ADMIN_PATH || '/admin';

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

  if (window.location.pathname === adminPath) {
    return <AdminPage />;
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {content.sections.hero && <Hero />}
      {content.sections.advantages && <Advantages />}
      {content.sections.about && <About />}
      {content.sections.ready && <ReadyDuplexes />}
      {content.sections.construction && <ConstructionDuplexes />}
      {content.sections.mortgage && <Mortgage />}
      {content.sections.reviews && <Reviews />}
      {content.sections.steps && <Steps />}
      {content.sections.guarantees && <Guarantees />}
      {content.sections.map && <MapSection />}
      {content.sections.finalCta && <FinalCTA />}
      <Footer />
      <FloatingButton />
      <Toaster />
    </div>
  );
}

export default App;
