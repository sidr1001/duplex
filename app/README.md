# Duplex Landing (React + Vite)

## Что реализовано
- Редактируемая админка контента через JSON.
- Валидация телефона и email в лид-формах.
- Готовые дуплексы со слайдером изображений в карточке и модальном окне.
- Отправка заявок через `send-lead.php` + SMTP (PHPMailer), без отдельного Node API.

## Локальная разработка фронтенда
```bash
npm install
npm run dev
```

## Сборка
```bash
npm run build
```

## Запуск на обычном PHP-хостинге
1. Выполните `npm run build`.
2. Загрузите **содержимое** папки `dist/` в корень сайта.
3. Убедитесь, что на хостинге есть PHP и Composer.
4. В папке `public/` (или в корне сайта после деплоя) выполните:
   ```bash
   composer require phpmailer/phpmailer
   ```
5. Настройте SMTP переменные окружения на хостинге:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASS`
6. Проверьте, что файл `send-lead.php` доступен по адресу `https://ваш-домен/send-lead.php`.

> Отдельно `npm run api` запускать **не нужно** — отправка идет через PHP endpoint.

## Админка
- Путь задается через `VITE_ADMIN_PATH` (по умолчанию `/admin`).
- Логин: `VITE_ADMIN_LOGIN`.
- Пароль: `VITE_ADMIN_PASSWORD`.
- В админке можно редактировать весь JSON контента (включая `ready.duplexes[].images` и `ready.duplexes[].description`).
