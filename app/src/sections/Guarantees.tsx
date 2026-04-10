import { motion } from 'framer-motion';
import { Shield, FileCheck, ScrollText, Users, Wallet, Gavel } from 'lucide-react';

const guarantees = [
  {
    icon: Shield,
    title: 'Гарантия 10 лет',
    description: 'По договору на все строительные работы'
  },
  {
    icon: FileCheck,
    title: 'Страхование',
    description: 'Ответственности застройщика'
  },
  {
    icon: ScrollText,
    title: 'Проектная декларация',
    description: 'Размещена на сайте в открытом доступе'
  },
  {
    icon: Users,
    title: 'Членство в СРО',
    description: 'Саморегулируемая организация строителей'
  },
  {
    icon: Wallet,
    title: 'Эскроу-счета',
    description: 'Безопасные расчеты при покупке'
  },
  {
    icon: Gavel,
    title: 'Соблюдение 214-ФЗ',
    description: 'Закон о долевом строительстве'
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

export function Guarantees() {
  return (
    <section className="py-20 md:py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ваши риски — <span className="text-turquoise">под нашей защитой</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Работаем прозрачно и официально. Все гарантии закреплены в договоре
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors duration-300"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1 + 0.3,
                  type: 'spring',
                  stiffness: 200
                }}
                className="w-14 h-14 rounded-xl bg-turquoise/20 flex items-center justify-center mb-4"
              >
                <guarantee.icon className="w-7 h-7 text-turquoise" />
              </motion.div>
              
              <h3 className="text-lg font-bold text-white mb-2">{guarantee.title}</h3>
              <p className="text-white/60 text-sm">{guarantee.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-wrap justify-center gap-8"
        >
          {[
            'Работаем с 2009 года',
            '2000+ построенных домов',
            '150+ сотрудников',
            'Собственное производство'
          ].map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-2 text-white/80"
            >
              <div className="w-2 h-2 rounded-full bg-green" />
              <span className="text-sm">{badge}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
