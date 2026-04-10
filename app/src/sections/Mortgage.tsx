import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { LeadForm } from '@/components/LeadForm';
import { Landmark, Code, Wheat, Shield, RefreshCw, Check } from 'lucide-react';

const programs = [
  {
    icon: Landmark,
    name: 'Семейная ипотека',
    rate: 4.9,
    description: 'Для семей с детьми до 18 лет',
    features: ['Первоначальный взнос от 15%', 'Сумма до 12 млн ₽', 'Срок до 30 лет']
  },
  {
    icon: Code,
    name: 'Ипотека для IT',
    rate: 5.0,
    description: 'Для работников IT-компаний',
    features: ['Первоначальный взнос от 15%', 'Сумма до 18 млн ₽', 'Срок до 30 лет']
  },
  {
    icon: Wheat,
    name: 'Сельская ипотека',
    rate: 3.0,
    description: 'Для покупки жилья в сельской местности',
    features: ['Первоначальный взнос от 10%', 'Сумма до 6 млн ₽', 'Срок до 25 лет']
  },
  {
    icon: Shield,
    name: 'Военная ипотека',
    rate: 5.3,
    description: 'Для военнослужащих-участников НИС',
    features: ['Первоначальный взнос от 10%', 'Сумма до 12 млн ₽', 'Срок до 25 лет']
  },
  {
    icon: RefreshCw,
    name: 'Рефинансирование',
    rate: 6.5,
    description: 'Перевод ипотеки от другого банка',
    features: ['Снижение ставки', 'Объединение кредитов', 'Срок до 30 лет']
  }
];

function AnimatedRate({ rate }: { rate: number }) {
  const [displayRate, setDisplayRate] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const duration = 1500;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setDisplayRate(Number((progress * rate).toFixed(1)));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, rate]);

  return <span ref={ref}>{displayRate.toFixed(1)}</span>;
}

export function Mortgage() {
  return (
    <section id="mortgage" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4">
            Все льготные ипотеки — <span className="text-orange">поможем с одобрением!</span>
          </h2>
          <p className="text-dark-light text-lg max-w-2xl mx-auto">
            Работаем со всеми крупными банками. Поможем выбрать лучшую программу и получить одобрение
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 mb-16">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateX: -30 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 text-center group hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange group-hover:scale-110 transition-all duration-300">
                <program.icon className="w-7 h-7 text-orange group-hover:text-white transition-colors" />
              </div>
              
              <h3 className="font-bold text-dark mb-1">{program.name}</h3>
              <p className="text-xs text-dark-light mb-3">{program.description}</p>
              
              <div className="text-3xl font-bold text-orange mb-4">
                от <AnimatedRate rate={program.rate} />%
              </div>
              
              <ul className="text-left space-y-2">
                {program.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-dark-light">
                    <Check className="w-4 h-4 text-green flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-dark to-dark-light rounded-3xl p-8 md:p-12"
        >
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Получить консультацию по ипотеке
            </h3>
            <p className="text-white/70 mb-6">
              Наши специалисты помогут выбрать оптимальную программу и собрать документы
            </p>
            <LeadForm
              title=""
              buttonText="Получить одобрение"
              fields={['name', 'phone']}
              variant="dark"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
