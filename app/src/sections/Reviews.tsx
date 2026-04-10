import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LeadForm } from '@/components/LeadForm';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Семья Ивановых',
    duplex: 'Дуплекс "Солнечный"',
    date: 'Март 2024',
    image: '/images/review-1.jpg',
    text: 'Долго выбирали застройщика и не ошиблись! Дом яркий, теплый, все сделали в срок. Отдельное спасибо за помощь с ипотекой — одобрили за один день!',
    rating: 5
  },
  {
    id: 2,
    name: 'Александр и Мария',
    duplex: 'Дуплекс "Яркий"',
    date: 'Февраль 2024',
    image: '/images/review-2.jpg',
    text: 'Потрясающий дом! Дизайн превзошел все ожидания. Качество строительства на высоте, никаких нареканий. Рекомендуем всем!',
    rating: 5
  },
  {
    id: 3,
    name: 'Семья Петровых',
    duplex: 'Дуплекс "Семейный"',
    date: 'Январь 2024',
    image: '/images/review-3.jpg',
    text: 'Отличная компания! Построили дом точно в срок, отделка под ключ — заехали и сразу начали жить. Дети в восторге от своих комнат!',
    rating: 5
  },
  {
    id: 4,
    name: 'Николай и Елена',
    duplex: 'Дуплекс "Мечта"',
    date: 'Декабрь 2023',
    image: '/images/review-4.jpg',
    text: 'Покупали дом в строительстве по стартовой цене. Очень выгодно! Получили отличное жилье и сэкономили более миллиона рублей.',
    rating: 5
  }
];

export function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 2;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, reviews.length - itemsPerView + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, reviews.length - itemsPerView + 1)) % Math.max(1, reviews.length - itemsPerView + 1));
  };

  return (
    <section id="reviews" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4">
            Истории счастья <span className="text-turquoise">наших клиентов</span>
          </h2>
          <p className="text-dark-light text-lg max-w-2xl mx-auto">
            Уже более 2000 семей обрели свой дом мечты вместе с нами
          </p>
        </motion.div>

        {/* Reviews Slider */}
        <div className="relative mb-16">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: -currentIndex * (100 / itemsPerView + 2) + '%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="w-full md:w-[calc(50%-12px)] flex-shrink-0"
                >
                  <div className="bg-white p-6 md:p-8 rounded-3xl shadow-card h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-dark">{review.name}</h4>
                        <p className="text-sm text-dark-light">{review.duplex}</p>
                        <p className="text-xs text-gray-400">{review.date}</p>
                      </div>
                      <Quote className="w-8 h-8 text-orange/20" />
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          <Star className="w-5 h-5 fill-yellow text-yellow" />
                        </motion.div>
                      ))}
                    </div>

                    <p className="text-dark-light leading-relaxed">{review.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full border-gray-200 hover:bg-orange hover:text-white hover:border-orange transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full border-gray-200 hover:bg-orange hover:text-white hover:border-orange transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Bottom Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-turquoise/10 to-green/10 rounded-3xl p-8 md:p-12"
        >
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-dark mb-4">
              Хотите так же?
            </h3>
            <p className="text-dark-light mb-6">
              Запишитесь на просмотр и убедитесь в качестве наших домов лично
            </p>
            <LeadForm
              title=""
              buttonText="Записаться"
              fields={['phone']}
              variant="light"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
