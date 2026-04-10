import { Phone } from 'lucide-react';

export function FloatingButton() {
  return (
    <a
      href="tel:+78001234567"
      className="fixed bottom-6 right-6 z-50 bg-orange hover:bg-orange-dark text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 pulse-button md:hidden"
      aria-label="Позвонить"
    >
      <Phone className="w-6 h-6" />
    </a>
  );
}
