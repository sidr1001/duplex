import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

const socialLinks = [
  { name: 'WhatsApp', href: 'https://wa.me/78001234567', icon: '💬' },
  { name: 'Telegram', href: 'https://t.me/duplexstroy', icon: '✈️' },
  { name: 'Instagram', href: 'https://instagram.com/duplexstroy', icon: '📷' },
];

const footerLinks = [
  {
    title: 'Навигация',
    links: [
      { label: 'Преимущества', href: '#advantages' },
      { label: 'О компании', href: '#about' },
      { label: 'Готовые дуплексы', href: '#ready' },
      { label: 'В строительстве', href: '#construction' },
      { label: 'Ипотека', href: '#mortgage' },
      { label: 'Отзывы', href: '#reviews' },
    ]
  },
  {
    title: 'Информация',
    links: [
      { label: 'Проектная декларация', href: '#' },
      { label: 'Политика конфиденциальности', href: '#' },
      { label: 'Договор долевого участия', href: '#' },
      { label: 'Правила продаж', href: '#' },
    ]
  }
];

export function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="text-2xl font-bold mb-4">
              <span className="text-orange">Дуплекс</span>-Строй
            </div>
            <p className="text-white/60 mb-6 max-w-md">
              Строим яркие дуплексы для счастливой жизни с 2009 года. 
              Собственное производство, все льготные ипотеки, отделка под ключ.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange transition-colors"
                  title={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-bold text-lg mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+78001234567" className="flex items-center gap-2 text-white/60 hover:text-orange transition-colors">
                  <Phone className="w-4 h-4" />
                  8 (800) 123-45-67
                </a>
              </li>
              <li>
                <a href="mailto:info@duplexstroy.ru" className="flex items-center gap-2 text-white/60 hover:text-orange transition-colors">
                  <Mail className="w-4 h-4" />
                  info@duplexstroy.ru
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/60">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>г. Москва, ул. Строителей, 25<br />Офис продаж</span>
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <Clock className="w-4 h-4" />
                <span>Пн-Пт: 9:00 - 19:00</span>
              </li>
            </ul>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-bold text-lg mb-4">Разделы</h4>
            <ul className="space-y-2">
              {footerLinks[0].links.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="text-white/60 hover:text-orange transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">
              © 2024 Дуплекс-Строй. Все права защищены.
              <br />
              ООО "Дуплекс-Строй", ИНН: 7701234567, ОГРН: 1157746123456
            </p>
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-white/40 hover:text-orange transition-colors flex items-center gap-1">
                Проектная декларация
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="#" className="text-white/40 hover:text-orange transition-colors">
                Политика конфиденциальности
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
