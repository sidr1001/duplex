import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Send, Phone, User, Mail } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';

interface LeadFormProps {
  title: string;
  buttonText: string;
  fields: Array<'name' | 'phone' | 'email'>;
  variant?: 'light' | 'dark' | 'gradient';
}

const PHONE_REGEX = /^(\+7|8)\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').replace(/^8/, '7').replace(/^7?/, '7').slice(0, 11);
  const p = digits.slice(1);
  if (!digits) return '';
  if (p.length <= 3) return `+7 (${p}`;
  if (p.length <= 6) return `+7 (${p.slice(0, 3)}) ${p.slice(3)}`;
  if (p.length <= 8) return `+7 (${p.slice(0, 3)}) ${p.slice(3, 6)}-${p.slice(6)}`;
  return `+7 (${p.slice(0, 3)}) ${p.slice(3, 6)}-${p.slice(6, 8)}-${p.slice(8, 10)}`;
}

export function LeadForm({ title, buttonText, fields, variant = 'light' }: LeadFormProps) {
  const { content } = useSiteContent();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fields.includes('phone') && !PHONE_REGEX.test(formData.phone)) {
      toast.error('Проверьте формат телефона. Пример: +7 (999) 999-99-99');
      return;
    }

    const normalizedEmail = formData.email.trim();
    if (fields.includes('email') && !EMAIL_REGEX.test(normalizedEmail)) {
      toast.error('Проверьте формат email. Пример: user@example.com');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 600));

    const body = `Имя: ${formData.name || '-'}%0AТелефон: ${formData.phone || '-'}%0AEmail: ${normalizedEmail || '-'}%0AИсточник: сайт`;
    window.location.href = `mailto:${content.contacts.leadRecipientEmail}?subject=Новая заявка с сайта&body=${body}`;

    toast.success(`Заявка сформирована. Письмо будет отправлено на ${content.contacts.leadRecipientEmail}`);
    setFormData({ name: '', phone: '', email: '' });
    setIsSubmitting(false);
  };

  const bgClass = { light: 'bg-white', dark: 'bg-dark/90', gradient: 'bg-gradient-to-br from-orange/90 to-turquoise/90' }[variant];
  const textClass = variant === 'light' ? 'text-dark' : 'text-white';
  const inputClass = variant === 'light' ? 'bg-white border-gray-200 text-dark placeholder:text-gray-400' : 'bg-white/10 border-white/20 text-white placeholder:text-white/60';

  return (
    <form onSubmit={handleSubmit} className={`${bgClass} p-6 md:p-8 rounded-2xl shadow-card-hover`}>
      {!!title && <h3 className={`text-xl font-bold mb-6 ${textClass}`}>{title}</h3>}
      <div className="space-y-4">
        {fields.includes('name') && (
          <div className="relative">
            <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${variant === 'light' ? 'text-gray-400' : 'text-white/60'}`} />
            <Input type="text" placeholder="Ваше имя" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`pl-12 py-6 rounded-xl ${inputClass}`} required />
          </div>
        )}

        {fields.includes('phone') && (
          <div className="relative">
            <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${variant === 'light' ? 'text-gray-400' : 'text-white/60'}`} />
            <Input
              type="tel"
              inputMode="tel"
              placeholder="+7 (999) 999-99-99"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
              pattern="(\\+7|8)\\s?\\(?\\d{3}\\)?[\\s-]?\\d{3}[\\s-]?\\d{2}[\\s-]?\\d{2}"
              title="Введите телефон в формате +7 (999) 999-99-99"
              className={`pl-12 py-6 rounded-xl ${inputClass}`}
              required
            />
          </div>
        )}

        {fields.includes('email') && (
          <div className="relative">
            <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${variant === 'light' ? 'text-gray-400' : 'text-white/60'}`} />
            <Input type="email" placeholder="Ваш email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} pattern="[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}" title="Введите email в формате user@example.com" className={`pl-12 py-6 rounded-xl ${inputClass}`} required />
          </div>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full py-6 bg-orange hover:bg-orange-dark text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50">
          {isSubmitting ? 'Отправка...' : <>{buttonText}<Send className="w-5 h-5 ml-2" /></>}
        </Button>
      </div>
      <p className={`text-xs mt-4 text-center ${variant === 'light' ? 'text-gray-500' : 'text-white/70'}`}>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
    </form>
  );
}
