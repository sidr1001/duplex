import { motion } from 'framer-motion';
import { LeadForm } from '@/components/LeadForm';
import { Clock, Gift, FileCheck, Phone } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';

const triggers = [
  {
    icon: Clock,
    text: 'Акция действует до конца месяца'
  },
  {
    icon: Gift,
    text: 'Отделка в подарок при бронировании'
  },
  {
    icon: FileCheck,
    text: 'Фиксация цены в договоре'
  }
];

export function FinalCTA() {
  const { content } = useSiteContent();
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange via-orange-light to-yellow">
        <motion.div
          animate={{
            background: [
              'linear-gradient(135deg, #FF6B35 0%, #FF8A5C 50%, #FFD93D 100%)',
              'linear-gradient(135deg, #FFD93D 0%, #FF6B35 50%, #FF8A5C 100%)',
              'linear-gradient(135deg, #FF8A5C 0%, #FFD93D 50%, #FF6B35 100%)',
            ]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          className="absolute inset-0"
        />
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Не откладывайте мечту на потом!
            </h2>
            
            <p className="text-xl text-white/90 mb-8">
              Осталось всего <span className="font-bold">5 готовых дуплексов</span> по текущим ценам
            </p>

            <div className="space-y-4 mb-8">
              {triggers.map((trigger, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <trigger.icon className="w-5 h-5" />
                  </div>
                  <span className="text-white/90">{trigger.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Phone */}
            <motion.a
              href={`tel:${content.contacts.phoneHref}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-3 text-2xl font-bold hover:scale-105 transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              {content.contacts.phoneDisplay}
            </motion.a>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <LeadForm
              title="Записаться на просмотр и получить подарок"
              buttonText="Записаться на просмотр"
              fields={['name', 'phone']}
              variant="light"
            />
            <p className="text-center text-white/80 mt-4 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              Перезвоним за 15 минут
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
