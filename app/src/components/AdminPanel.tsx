import { useMemo, useState } from 'react';
import { useSiteContent } from '@/context/SiteContentContext';
import type { SiteContent } from '@/content/siteContent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export function AdminPanel() {
  const { content, updateContent, resetContent } = useSiteContent();
  const [jsonDraft, setJsonDraft] = useState(() => JSON.stringify(content, null, 2));

  const pretty = useMemo(() => JSON.stringify(content, null, 2), [content]);

  const saveJson = () => {
    try {
      const parsed = JSON.parse(jsonDraft) as SiteContent;
      updateContent(parsed);
      toast.success('Контент обновлен');
    } catch {
      toast.error('Ошибка JSON: проверьте формат');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-2">Админ-панель сайта</h1>
      <p className="text-dark-light mb-6">Здесь можно редактировать контакты, SEO, все тексты/цены в блоках и точки на карте.</p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium">Телефон (отображение)</label>
          <Input value={content.contacts.phoneDisplay} onChange={(e) => updateContent({ ...content, contacts: { ...content.contacts, phoneDisplay: e.target.value } })} />
        </div>
        <div>
          <label className="text-sm font-medium">Email для заявок</label>
          <Input value={content.contacts.leadRecipientEmail} onChange={(e) => updateContent({ ...content, contacts: { ...content.contacts, leadRecipientEmail: e.target.value } })} />
        </div>
        <div>
          <label className="text-sm font-medium">SEO Title</label>
          <Input value={content.seo.title} onChange={(e) => updateContent({ ...content, seo: { ...content.seo, title: e.target.value } })} />
        </div>
        <div>
          <label className="text-sm font-medium">Hero заголовок</label>
          <Input value={content.hero.title} onChange={(e) => updateContent({ ...content, hero: { ...content.hero, title: e.target.value } })} />
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium">Полный JSON контента (включая цены и всю текстовку)</label>
        <Textarea rows={24} value={jsonDraft} onChange={(e) => setJsonDraft(e.target.value)} className="font-mono text-xs" />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button onClick={saveJson}>Сохранить JSON</Button>
        <Button variant="outline" onClick={() => setJsonDraft(pretty)}>Обновить из текущего</Button>
        <Button variant="outline" onClick={() => navigator.clipboard.writeText(pretty)}>Скопировать JSON</Button>
        <Button variant="destructive" onClick={resetContent}>Сбросить в дефолт</Button>
      </div>
    </div>
  );
}
