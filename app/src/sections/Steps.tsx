import { motion } from 'framer-motion';
import { LeadForm } from '@/components/LeadForm';
import { Phone, Home, FileText, Key } from 'lucide-react';

const steps = [
  {
    icon: Phone,
    number: '01',
    title: 'Заявка',
    description: 'Оставляете заявку на сайте или звоните нам. Мы перезвоним за 15 минут.',
    color: 'bg-orange'
  },
  {
    icon: Home,
    number: '02',
    title: 'Просмотр',
    description: 'Приезжаете на просмотр объектов. Покажем все готовые и строящиеся дуплексы.',
    color: 'bg-turquoise'
  },
  {
    icon: FileText,
    number: '03',
    title: 'Договор',
    description: 'Выбираете дуплекс и оформляем документы. Поможем с ипотекой.',
    color: 'bg-yellow'
  },
  {
    icon: Key,
    number: '04',
    title: 'Заселение',
    description: 'Получаете ключи и празднуете новоселье! Гарантия 10 лет.',
    color: 'bg-green'
  }
];

export function Steps() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4">
            4 шага до <span className="text-orange">вашего нового дома</span>
          </h2>
          <p className="text-dark-light text-lg max-w-2xl mx-auto">
            Простой и прозрачный процесс покупки от заявки до заселения
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mb-16">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gray-200">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-orange via-turquoise to-green"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.15 + 0.3,
                    type: 'spring',
                    stiffness: 200
                  }}
                  className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10`}
                >
                  <step.icon className="w-10 h-10 text-white" />
                </motion.div>

                {/* Number */}
                <div className="text-4xl font-bold text-gray-200 mb-2">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-dark mb-2">{step.title}</h3>
                <p className="text-dark-light text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-orange to-yellow rounded-3xl p-8 md:p-12"
        >
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Начните сейчас — сделайте первый шаг!
            </h3>
            <p className="text-white/80 mb-6">
              Оставьте заявку и получите бесплатную консультацию специалиста
            </p>
            <LeadForm
              title=""
              buttonText="Оставить заявку"
              fields={['name', 'phone']}
              variant="dark"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
