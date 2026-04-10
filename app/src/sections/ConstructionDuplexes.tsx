import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { LeadForm } from '@/components/LeadForm';
import { Calendar, Maximize, TrendingUp, Gift } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';

function ProgressBar({ percentage }: { percentage: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isInView) setTimeout(() => setWidth(percentage), 200);
  }, [isInView, percentage]);

  return (
    <div ref={ref} className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <motion.div initial={{ width: 0 }} animate={{ width: `${width}%` }} transition={{ duration: 1.5, ease: 'easeOut' }} className="h-full bg-gradient-to-r from-turquoise to-green rounded-full" />
    </div>
  );
}

export function ConstructionDuplexes() {
  const { content } = useSiteContent();

  return (
    <section id="construction" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4">{content.construction.title}</h2>
          <p className="text-dark-light text-lg max-w-2xl mx-auto">{content.construction.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {content.construction.duplexes.map((duplex, index) => (
            <motion.div key={duplex.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.15 }} className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300">
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img src={duplex.image} alt={duplex.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                <Badge className="absolute top-4 left-4 bg-yellow text-dark border-0 font-semibold">{content.construction.badgeText}</Badge>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-dark mb-3">{duplex.name}</h3>
                <div className="flex flex-wrap gap-4 mb-4 text-dark-light text-sm">
                  <div className="flex items-center gap-1"><Maximize className="w-4 h-4" /><span>{duplex.area} м²</span></div>
                  <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /><span>{content.construction.completionText}: {duplex.completion}</span></div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-dark-light flex items-center gap-1"><TrendingUp className="w-4 h-4" />{content.construction.readinessText}</span>
                    <span className="font-bold text-turquoise">{duplex.progress}%</span>
                  </div>
                  <ProgressBar percentage={duplex.progress} />
                </div>

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-bold text-orange">{duplex.price} ₽</span>
                  {duplex.oldPrice && <span className="text-lg text-gray-400 line-through">{duplex.oldPrice} ₽</span>}
                </div>

                <div className="bg-yellow/10 border border-yellow/30 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-2"><Gift className="w-5 h-5 text-yellow-dark flex-shrink-0 mt-0.5" /><p className="text-sm text-dark">{duplex.offer}</p></div>
                </div>

                <LeadForm title="" buttonText={duplex.formTitle} fields={['phone']} variant="light" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
