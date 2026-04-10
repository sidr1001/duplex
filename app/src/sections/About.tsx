import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { LeadForm } from '@/components/LeadForm';
import { Users, Shield, Award, Calendar } from 'lucide-react';

function AnimatedCounter({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { icon: Calendar, value: 15, suffix: '+', label: 'лет на рынке' },
  { icon: Award, value: 2000, suffix: '+', label: 'построенных домов' },
  { icon: Users, value: 150, suffix: '+', label: 'специалистов' },
  { icon: Shield, value: 10, suffix: '', label: 'лет гарантии' }
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-6">
              Строим дома для счастья <span className="text-turquoise">с 2009 года</span>
            </h2>
            
            <p className="text-dark-light text-lg mb-8 leading-relaxed">
              За 15+ лет работы мы построили более 2000 объектов. Собственное производство 
              строительных материалов позволяет контролировать качество на каждом этапе 
              и держать честные цены.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-turquoise/10 flex items-center justify-center flex-shrink-0">
                    <stat.icon className="w-6 h-6 text-turquoise" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-dark">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-dark-light text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <LeadForm
              title="Получить презентацию компании"
              buttonText="Отправить"
              fields={['email']}
              variant="light"
            />
          </motion.div>

          {/* Right Column - Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-card-hover">
                <img
                  src="/images/production.jpg"
                  alt="Наше производство"
                  className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-card-hover mt-8">
                <img
                  src="/images/team.jpg"
                  alt="Наша команда"
                  className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-card-hover">
              <img
                src="/images/family-happy.jpg"
                alt="Счастливые клиенты"
                className="w-full h-48 md:h-56 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
