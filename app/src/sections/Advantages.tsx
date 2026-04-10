import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { LeadForm } from '@/components/LeadForm';
import { Factory, Percent, Building2, Palette, KeyRound, MapPin } from 'lucide-react';

const advantages = [
  {
    icon: Factory,
    title: 'Собственное производство',
    description: 'Материалы без наценок посредников'
  },
  {
    icon: Percent,
    title: 'Все льготные ипотеки',
    description: 'От 4,9%, поможем с одобрением'
  },
  {
    icon: Building2,
    title: '2000+ построенных объектов',
    description: 'Опыт с 2009 года'
  },
  {
    icon: Palette,
    title: 'Яркие проекты',
    description: 'Уникальная архитектура, не как у всех'
  },
  {
    icon: KeyRound,
    title: 'Отделка под ключ',
    description: 'Заезжай и живи'
  },
  {
    icon: MapPin,
    title: 'Удобная локация',
    description: 'Развитая инфраструктура'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

export function Advantages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="advantages" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4">
            Почему выбирают <span className="text-orange">наши дуплексы</span>
          </h2>
          <p className="text-dark-light text-lg max-w-2xl mx-auto">
            Мы строим не просто дома — мы создаём пространство для счастливой жизни
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16"
        >
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center mb-5">
                <advantage.icon className="w-7 h-7 text-orange" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">{advantage.title}</h3>
              <p className="text-dark-light">{advantage.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-md mx-auto"
        >
          <LeadForm
            title="Рассчитать стоимость вашего дуплекса"
            buttonText="Рассчитать"
            fields={['name', 'phone']}
            variant="light"
          />
        </motion.div>
      </div>
    </section>
  );
}
