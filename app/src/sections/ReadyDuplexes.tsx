import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LeadForm } from '@/components/LeadForm';
import { Bed, Bath, Maximize, Check } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
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

export function ReadyDuplexes() {
  const { content } = useSiteContent();

  return (
    <section id="ready" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4">{content.ready.title}</h2>
          <p className="text-dark-light text-lg max-w-2xl mx-auto">{content.ready.subtitle}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16"
        >
          {content.ready.duplexes.map((duplex) => (
            <motion.div key={duplex.id} variants={itemVariants} className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-gray-100">
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img src={duplex.image} alt={duplex.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                <Badge className="absolute top-4 left-4 bg-green text-white border-0">{duplex.status}</Badge>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-dark mb-3">{duplex.name}</h3>
                <div className="flex flex-wrap gap-4 mb-4 text-dark-light text-sm">
                  <div className="flex items-center gap-1"><Maximize className="w-4 h-4" /><span>{duplex.area} м²</span></div>
                  <div className="flex items-center gap-1"><Bed className="w-4 h-4" /><span>{duplex.bedrooms} спальни</span></div>
                  <div className="flex items-center gap-1"><Bath className="w-4 h-4" /><span>{duplex.bathrooms} санузла</span></div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {duplex.features.map((feature, idx) => <span key={idx} className="text-xs bg-gray-100 text-dark-light px-3 py-1 rounded-full">{feature}</span>)}
                </div>

                <div className="flex items-baseline gap-2 mb-4"><span className="text-2xl font-bold text-orange">{duplex.price} ₽</span></div>

                <Dialog>
                  <DialogTrigger asChild><Button className="w-full bg-turquoise hover:bg-turquoise-dark text-white font-semibold rounded-xl">{content.ready.openPlanButtonText}</Button></DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader><DialogTitle className="text-2xl">{duplex.name} — Планировка</DialogTitle></DialogHeader>
                    <div className="grid md:grid-cols-2 gap-6">
                      <img src={duplex.image} alt={duplex.name} className="w-full h-64 object-cover rounded-xl" />
                      <div>
                        <h4 className="font-bold text-lg mb-3">Характеристики:</h4>
                        <ul className="space-y-2 text-dark-light">
                          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green" />Площадь: {duplex.area} м²</li>
                          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green" />Спален: {duplex.bedrooms}</li>
                          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green" />Санузлов: {duplex.bathrooms}</li>
                          {duplex.features.map((feature, idx) => <li key={idx} className="flex items-center gap-2"><Check className="w-4 h-4 text-green" />{feature}</li>)}
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <LeadForm title="" buttonText={content.ready.leadButtonText} fields={['phone']} variant="light" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-gradient-to-br from-orange/10 to-turquoise/10 rounded-3xl p-8 md:p-12">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-dark mb-4">{content.ready.fallbackTitle}</h3>
            <p className="text-dark-light mb-6">{content.ready.fallbackSubtitle}</p>
            <LeadForm title="" buttonText={content.ready.fallbackButtonText} fields={['name', 'phone']} variant="light" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
