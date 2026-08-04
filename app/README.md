# Duplex Landing (React + Vite)

## Что реализовано
- Редактируемая админка контента через JSON.
- Валидация телефона и email в лид-формах.
- Готовые дуплексы со слайдером изображений в карточке и модальном окне.
- Отправка заявок через `send-lead.php` + SMTP (PHPMailer).
- Общий JSON-контент для всех пользователей хранится на сервере в `storage/site-content.json`.

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
4. В корне сайта выполните:
   ```bash
   composer require phpmailer/phpmailer
   ```
5. Дайте права на запись в папку `storage` (для сохранения JSON из админки).
6. Настройте SMTP переменные окружения на хостинге:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASS`

## Как работает общий JSON
- Загрузка текущего контента: `GET /api/get-content.php`.
- Сохранение из админки: `POST /api/save-content.php`.
- Файл хранения: `storage/site-content.json`.
- Если файл еще не создан, сайт показывает дефолт из кода; после первого сохранения админкой все пользователи видят серверную версию.

## Админка
- Путь задается через `VITE_ADMIN_PATH` (по умолчанию `/admin`).
- Логин: `VITE_ADMIN_LOGIN`.
- Пароль: `VITE_ADMIN_PASSWORD`.
- В админке можно редактировать весь JSON контента (включая `ready.duplexes[].images` и `ready.duplexes[].description`).
