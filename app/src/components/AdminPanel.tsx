import { useMemo, useState } from 'react';
import { useSiteContent } from '@/context/SiteContentContext';
import type { SiteContent } from '@/content/siteContent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export function AdminPanel() {
  const { content, updateContent, resetContent } = useSiteContent();
  const [isOpen, setIsOpen] = useState(false);
  const [jsonDraft, setJsonDraft] = useState(() => JSON.stringify(content.map.objects, null, 2));

  const formattedJson = useMemo(() => JSON.stringify(content, null, 2), [content]);

  const onMapObjectsSave = () => {
    try {
      const objects = JSON.parse(jsonDraft) as SiteContent['map']['objects'];
      updateContent({
        ...content,
        map: {
          ...content.map,
          objects
        }
      });
      toast.success('Объекты карты обновлены');
    } catch {
      toast.error('Невалидный JSON для объектов карты');
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-6 bottom-6 z-[60] rounded-full bg-dark text-white px-4 py-2 text-sm shadow-lg"
      >
        Админка
      </button>
    );
  }

  return (
    <aside className="fixed right-0 top-0 z-[70] h-screen w-full max-w-xl overflow-y-auto border-l bg-white p-4 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Админка контента</h3>
        <Button variant="outline" onClick={() => setIsOpen(false)}>Закрыть</Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Название компании</label>
          <Input value={content.contacts.companyName} onChange={(e) => updateContent({ ...content, contacts: { ...content.contacts, companyName: e.target.value } })} />
        </div>
        <div>
          <label className="text-sm font-medium">Телефон (отображение)</label>
          <Input value={content.contacts.phoneDisplay} onChange={(e) => updateContent({ ...content, contacts: { ...content.contacts, phoneDisplay: e.target.value } })} />
        </div>
        <div>
          <label className="text-sm font-medium">Телефон (href)</label>
          <Input value={content.contacts.phoneHref} onChange={(e) => updateContent({ ...content, contacts: { ...content.contacts, phoneHref: e.target.value } })} />
        </div>
        <div>
          <label className="text-sm font-medium">Контактный email</label>
          <Input type="email" value={content.contacts.email} onChange={(e) => updateContent({ ...content, contacts: { ...content.contacts, email: e.target.value } })} />
        </div>
        <div>
          <label className="text-sm font-medium">Куда отправлять заявки</label>
          <Input type="email" value={content.contacts.leadRecipientEmail} onChange={(e) => updateContent({ ...content, contacts: { ...content.contacts, leadRecipientEmail: e.target.value } })} />
        </div>
        <div>
          <label className="text-sm font-medium">Путь до логотипа</label>
          <Input value={content.contacts.logoPath} onChange={(e) => updateContent({ ...content, contacts: { ...content.contacts, logoPath: e.target.value } })} />
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-2">SEO / Meta</h4>
          <Input className="mb-2" value={content.seo.title} onChange={(e) => updateContent({ ...content, seo: { ...content.seo, title: e.target.value } })} placeholder="Title" />
          <Textarea className="mb-2" value={content.seo.description} onChange={(e) => updateContent({ ...content, seo: { ...content.seo, description: e.target.value } })} placeholder="Description" />
          <Input className="mb-2" value={content.seo.keywords} onChange={(e) => updateContent({ ...content, seo: { ...content.seo, keywords: e.target.value } })} placeholder="Keywords" />
          <Input className="mb-2" value={content.seo.ogTitle} onChange={(e) => updateContent({ ...content, seo: { ...content.seo, ogTitle: e.target.value } })} placeholder="OG Title" />
          <Textarea className="mb-2" value={content.seo.ogDescription} onChange={(e) => updateContent({ ...content, seo: { ...content.seo, ogDescription: e.target.value } })} placeholder="OG Description" />
          <Input value={content.seo.ogImage} onChange={(e) => updateContent({ ...content, seo: { ...content.seo, ogImage: e.target.value } })} placeholder="OG image" />
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-2">Yandex карта: объекты (JSON)</h4>
          <Textarea rows={10} value={jsonDraft} onChange={(e) => setJsonDraft(e.target.value)} />
          <Button className="mt-2" onClick={onMapObjectsSave}>Сохранить объекты</Button>
        </div>

        <div className="border-t pt-4 space-x-2">
          <Button variant="destructive" onClick={resetContent}>Сбросить дефолт</Button>
          <Button variant="outline" onClick={() => navigator.clipboard.writeText(formattedJson)}>Скопировать JSON</Button>
        </div>
      </div>
    </aside>
  );
}
