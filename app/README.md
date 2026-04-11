# Duplex Landing (React + Vite)

## Что реализовано
- Редактируемая админка контента через JSON.
- Валидация телефона и email в лид-формах.
- Готовые дуплексы со слайдером изображений в карточке и модальном окне.
- Отправка заявок через собственный API endpoint `/api/send-lead` (SMTP), без сторонних сервисов.

## Запуск локально
1) Установить зависимости:
```bash
npm install
```

2) Создать `.env` на основе `.env.example` и заполнить SMTP параметры.

3) Запустить API:
```bash
npm run api
```

4) В отдельном терминале запустить фронтенд:
```bash
npm run dev
```

## Сборка
```bash
npm run build
```

## Админка
- Путь задается через `VITE_ADMIN_PATH` (по умолчанию `/admin`).
- Логин: `VITE_ADMIN_LOGIN`.
- Пароль: `VITE_ADMIN_PASSWORD`.
- В админке можно редактировать весь JSON контента (включая `ready.duplexes[].images` и `ready.duplexes[].description`).

## SMTP / API
Используются переменные окружения:
- `API_PORT`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`

Endpoint: `POST /api/send-lead`
