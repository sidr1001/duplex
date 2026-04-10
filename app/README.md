# Duplex Landing (React + Vite)

## Что реализовано
- Редактируемая мини-админка контента (кнопка **«Админка»** на странице):
  - контакты, телефоны, email;
  - email получателя заявок из форм;
  - SEO/meta (title, description, keywords, OG);
  - точки объектов для Яндекс.Карты (JSON).
- Валидация телефона во всех формах (`+7 (999) 999-99-99` / `8XXXXXXXXXX`).
- Карта Яндекс с локализацией объектов.
- Добавлен лаконичный `logo.svg` и встроен в сайт.
- Добавлен дополнительный шаблон `template/` (HTML+CSS+JS).

## Запуск локально
```bash
npm install
npm run dev
```

## Сборка
```bash
npm run build
```
Готовый продакшен-бандл появится в `dist/`.

## Проверка сборки локально
```bash
npm run preview
```

## Как выложить на хостинг

### Вариант 1: обычный статический хостинг (Nginx, Apache, Timeweb, Beget и т.д.)
1. Выполнить `npm run build`.
2. Загрузить содержимое папки `dist/` в корень сайта (`public_html`/`www`).
3. Для SPA добавить правило fallback на `index.html`.

Пример для **Nginx**:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Вариант 2: Vercel / Netlify
- Build command: `npm run build`
- Publish directory: `dist`

## Админка
- Кнопка **«Админка»** закреплена на сайте.
- Все изменения сохраняются в `localStorage` браузера.
- Кнопка «Сбросить дефолт» возвращает стартовые значения.

## Доп. шаблон
- Файлы: `template/index.html`, `template/styles.css`, `template/script.js`.
- Можно открыть напрямую в браузере как отдельный мини-лендинг.
