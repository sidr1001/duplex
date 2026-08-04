import { useEffect, useMemo, useState } from 'react';
import { useSiteContent } from '@/context/SiteContentContext';
import type { SiteContent } from '@/content/siteContent';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

function stripJsonComments(source: string) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|\s)\/\/.*$/gm, '$1');
}

const JSON_HINT_LINES = [
  '// Подсказка: можно добавлять комментарии через // и блоки /* */',
  '// sections: скрытие/показ любого блока лендинга',
  '// socials: whatsapp, telegram, instagram, max',
  '// footer: описание и реквизиты организации',
  '// ready.duplexes[].images: массив изображений для слайдера',
  '// ready.duplexes[].description: дополнительный текст для карточки/модалки',
  '// construction.duplexes[].description: описание дома в строительстве',
  '// construction.duplexes[].floorPlanImage: картинка схемы/планировки дома',
  ''
].join('\n');

export function AdminPanel() {
  const { content, updateContent, resetContent, loading } = useSiteContent();
  const pretty = useMemo(() => JSON.stringify(content, null, 2), [content]);
  const [jsonDraft, setJsonDraft] = useState('');

  useEffect(() => {
    setJsonDraft(`${JSON_HINT_LINES}${pretty}`);
  }, [pretty]);

  const saveJson = async () => {
    try {
      const cleanJson = stripJsonComments(jsonDraft).trim();
      const parsed = JSON.parse(cleanJson) as SiteContent;
      const ok = await updateContent(parsed);
      if (!ok) {
        toast.error('Не удалось сохранить JSON на сервере');
        return;
      }
      toast.success('Контент обновлен');
    } catch {
      toast.error('Ошибка JSON: проверьте формат');
    }
  };

  const onReset = async () => {
    const ok = await resetContent();
    if (!ok) {
      toast.error('Не удалось сбросить контент на сервере');
      return;
    }
    toast.success('Контент сброшен к дефолтным значениям');
  };

  if (loading) {
    return <div className="max-w-6xl mx-auto p-6">Загрузка сохраненного JSON...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-2">Админ-панель сайта</h1>
      <p className="text-dark-light mb-6">Редактируйте весь контент сайта, цены, SEO, соцсети, видимость секций и данные футера через JSON.</p>

      <div className="mb-4">
        <label className="text-sm font-medium">Полный JSON контента</label>
        <Textarea rows={28} value={jsonDraft} onChange={(e) => setJsonDraft(e.target.value)} className="font-mono text-xs" />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button onClick={saveJson}>Сохранить JSON</Button>
        <Button variant="outline" onClick={() => setJsonDraft(`${JSON_HINT_LINES}${pretty}`)}>Обновить из текущего</Button>
        <Button variant="outline" onClick={() => navigator.clipboard.writeText(pretty)}>Скопировать JSON</Button>
        <Button variant="destructive" onClick={onReset}>Сбросить в дефолт</Button>
      </div>
    </div>
  );
}
