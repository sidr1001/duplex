import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Send, Phone, User, Mail } from 'lucide-react';

interface LeadFormProps {
  title: string;
  buttonText: string;
  fields: Array<'name' | 'phone' | 'email'>;
  variant?: 'light' | 'dark' | 'gradient';
}

export function LeadForm({ title, buttonText, fields, variant = 'light' }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', phone: '', email: '' });
    setIsSubmitting(false);
  };

  const bgClass = {
    light: 'bg-white',
    dark: 'bg-dark/90',
    gradient: 'bg-gradient-to-br from-orange/90 to-turquoise/90'
  }[variant];

  const textClass = variant === 'light' ? 'text-dark' : 'text-white';
  const inputClass = variant === 'light' 
    ? 'bg-white border-gray-200 text-dark placeholder:text-gray-400' 
    : 'bg-white/10 border-white/20 text-white placeholder:text-white/60';

  return (
    <form onSubmit={handleSubmit} className={`${bgClass} p-6 md:p-8 rounded-2xl shadow-card-hover`}>
      <h3 className={`text-xl font-bold mb-6 ${textClass}`}>{title}</h3>
      
      <div className="space-y-4">
        {fields.includes('name') && (
          <div className="relative">
            <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${variant === 'light' ? 'text-gray-400' : 'text-white/60'}`} />
            <Input
              type="text"
              placeholder="Ваше имя"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`pl-12 py-6 rounded-xl ${inputClass}`}
              required
            />
          </div>
        )}
        
        {fields.includes('phone') && (
          <div className="relative">
            <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${variant === 'light' ? 'text-gray-400' : 'text-white/60'}`} />
            <Input
              type="tel"
              placeholder="+7 (999) 999-99-99"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`pl-12 py-6 rounded-xl ${inputClass}`}
              required
            />
          </div>
        )}
        
        {fields.includes('email') && (
          <div className="relative">
            <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${variant === 'light' ? 'text-gray-400' : 'text-white/60'}`} />
            <Input
              type="email"
              placeholder="Ваш email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`pl-12 py-6 rounded-xl ${inputClass}`}
              required
            />
          </div>
        )}
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-6 bg-orange hover:bg-orange-dark text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
        >
          {isSubmitting ? (
            'Отправка...'
          ) : (
            <>
              {buttonText}
              <Send className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>
      
      <p className={`text-xs mt-4 text-center ${variant === 'light' ? 'text-gray-500' : 'text-white/70'}`}>
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
    </form>
  );
}
