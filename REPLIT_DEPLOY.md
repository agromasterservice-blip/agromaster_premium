# START PRO SERVICE: Replit Demo Deploy

Инструкция для публикации демо-версии на Replit, чтобы получить публичную ссылку без запуска проекта на локальном компьютере.

## Что остается в демо

- Next.js как Node.js server.
- SQLite через Prisma.
- Локальные uploads в `public/uploads`.
- Без WhatsApp API, Cargus API, SmartBill, Gincore API.
- Без PostgreSQL.

## 1. Загрузка проекта на Replit

Вариант через GitHub:

1. Загрузите проект в GitHub repository.
2. В Replit нажмите **Create Repl**.
3. Выберите **Import from GitHub**.
4. Укажите repository проекта.
5. Дождитесь импорта файлов.

Вариант через ZIP:

1. Создайте новый Repl с шаблоном **Node.js**.
2. Загрузите файлы проекта в корень Repl.
3. Убедитесь, что `package.json`, `prisma/`, `src/` находятся в корне.

## 2. Secrets / Environment Variables

В Replit откройте **Tools -> Secrets** и добавьте:

```txt
DATABASE_URL=file:./dev.db
ADMIN_EMAIL=admin@startproservice.ro
ADMIN_PASSWORD=StartPro2026!
ADMIN_SESSION_SECRET=replace-with-long-random-secret
```

Для демо можно оставить SQLite. Перед показом начальству лучше заменить `ADMIN_PASSWORD` и `ADMIN_SESSION_SECRET` на свои значения.

## 3. Команды установки

В Replit Shell выполните:

```bash
npm install
npm run prisma:generate
npx prisma migrate deploy
npm run prisma:seed
npm run build
```

Что делает каждая команда:

- `npm install` устанавливает зависимости.
- `npm run prisma:generate` генерирует Prisma Client.
- `npx prisma migrate deploy` применяет готовые миграции к SQLite базе.
- `npm run prisma:seed` создает или обновляет администратора из Secrets.
- `npm run build` собирает production Next.js приложение.

## 4. Запуск

Для проверки в Replit Shell:

```bash
npm run start
```

Скрипт `start` запускает Next.js production server:

```bash
node node_modules/next/dist/bin/next start -H 0.0.0.0
```

Replit сам подставит порт через переменную `PORT`, если это нужно платформе.

## 5. Страницы для демо

После запуска откройте публичный URL Replit:

- Клиентская форма: `/` или `/garantie`
- WhatsApp demo: `/whatsapp-demo`
- Админка: `/admin/login`

Демо-логин администратора создается командой `npm run prisma:seed`:

```txt
Email: admin@startproservice.ro
Password: StartPro2026!
```

Если в Secrets указаны другие `ADMIN_EMAIL` и `ADMIN_PASSWORD`, используйте их.

## 6. Deploy / Publish на Replit

1. Откройте вкладку **Deployments** или кнопку **Deploy**.
2. Выберите deployment для Node.js app.
3. Build command:

```bash
npm install && npm run prisma:generate && npx prisma migrate deploy && npm run prisma:seed && npm run build
```

4. Run command:

```bash
npm run start
```

5. Нажмите **Deploy** / **Publish**.
6. После публикации Replit покажет публичный URL.

## 7. Важные ограничения демо

- SQLite и `public/uploads` подходят для демонстрации, но не для долгосрочного production-хранения.
- При пересоздании Replit environment локальная SQLite база и uploads могут быть потеряны.
- Для production позже нужно перейти на PostgreSQL и object storage, но для текущего демо это намеренно не делается.
