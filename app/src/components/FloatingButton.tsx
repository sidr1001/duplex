import { Phone } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';

export function FloatingButton() {
  const { content } = useSiteContent();
  return (
    <a
      href={`tel:${content.contacts.phoneHref}`}
      className="fixed bottom-6 right-6 z-50 bg-orange hover:bg-orange-dark text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 pulse-button md:hidden"
      aria-label="Позвонить"
    >
      <Phone className="w-6 h-6" />
    </a>
  );
}
