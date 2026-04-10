-- =============================================
-- KinoVEB — Схема базы данных Supabase
-- =============================================

-- Таблица фильмов
CREATE TABLE "KINO-film" (
  id          uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text          NOT NULL,
  description text          NOT NULL DEFAULT '',
  "descriptionShort" text  NOT NULL DEFAULT '',
  rating      numeric(3,1)  NOT NULL DEFAULT 0,
  author      text          NOT NULL DEFAULT '',
  genre       text          NOT NULL DEFAULT '',
  price       numeric(10,2) NOT NULL DEFAULT 0,
  image       text          NOT NULL DEFAULT '',
  duration    integer       NOT NULL DEFAULT 0
);

-- Таблица расписания
CREATE TABLE "KINO-shedule" (
  id      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "filmId" uuid NOT NULL REFERENCES "KINO-film"(id) ON DELETE CASCADE,
  day     date NOT NULL,
  time1   text,
  time2   text,
  time3   text
);

CREATE INDEX ON "KINO-shedule" ("filmId");

-- Таблица заказов
CREATE TABLE "KINO-order" (
  id          uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  timestamptz   NOT NULL DEFAULT now(),
  email       text          NOT NULL DEFAULT '',
  phone       text          NOT NULL DEFAULT '',
  "filmName"  text          NOT NULL DEFAULT '',
  "filmPrice" numeric(10,2) NOT NULL DEFAULT 0,
  "filmRow"   integer       NOT NULL DEFAULT 0,
  "filmColumn" integer      NOT NULL DEFAULT 0,
  date        date,
  time        text
);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

ALTER TABLE "KINO-film"    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "KINO-shedule" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "KINO-order"   ENABLE ROW LEVEL SECURITY;

-- Фильмы и расписание — публичное чтение
CREATE POLICY "public read films"
  ON "KINO-film" FOR SELECT
  USING (true);

CREATE POLICY "public read shedule"
  ON "KINO-shedule" FOR SELECT
  USING (true);

-- Заказы — только вставка (анонимные пользователи)
CREATE POLICY "public insert orders"
  ON "KINO-order" FOR INSERT
  WITH CHECK (true);

-- =============================================
-- Тестовые данные — Фильмы
-- =============================================

INSERT INTO "KINO-film" (title, description, "descriptionShort", rating, author, genre, price, image, duration)
VALUES
  (
    'Начало',
    'Кобб — искусный вор, лучший в опасном искусстве извлечения: он крадёт ценные секреты из глубин подсознания во время сна, когда человеческий разум наиболее уязвим. Редкие способности Кобба сделали его ценным игроком в мире корпоративного шпионажа, но они же превратили его в вечного беглеца.',
    'Вор, проникающий в сны, получает задание внедрить идею в разум жертвы.',
    8.8,
    'Кристофер Нолан',
    'Фантастика',
    450,
    'https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg',
    148
  ),
  (
    'Интерстеллар',
    'Когда засуха, пыльные бури и вымирание растений приводят человечество к продовольственному кризису, коллектив исследователей и учёных отправляется сквозь червоточину в путешествие, преодолевающее прежние ограничения для космических путешествий человека.',
    'Группа астронавтов отправляется сквозь червоточину в поисках новой планеты для человечества.',
    8.6,
    'Кристофер Нолан',
    'Фантастика',
    500,
    'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    169
  ),
  (
    'Бойцовский клуб',
    'Рассказчик — офисный работник, страдающий бессонницей. Он знакомится с харизматичным торговцем мылом Тайлером Дёрденом и вместе с ним создаёт подпольный бойцовский клуб, который превращается во что-то куда более опасное.',
    'Измотанный офисный работник создаёт подпольный бойцовский клуб с непредсказуемыми последствиями.',
    8.8,
    'Дэвид Финчер',
    'Триллер',
    400,
    'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    139
  ),
  (
    'Побег из Шоушенка',
    'Банкир Энди Дюфрейн приговорён к пожизненному заключению в тюрьме Шоушенк за убийство жены и её любовника. Здесь он знакомится с контрабандистом Эллисом Бойдом Рэддингом и постепенно завоёвывает уважение сокамерников.',
    'Несправедливо осуждённый банкир ищет способ выбраться на свободу из суровой тюрьмы.',
    9.3,
    'Фрэнк Дарабонт',
    'Драма',
    350,
    'https://image.tmdb.org/t/p/w500/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg',
    142
  ),
  (
    'Матрица',
    'Томас Андерсон — программист, ведущий двойную жизнь под ником Нео. Таинственный Морфеус раскрывает ему правду: реальный мир — это симуляция, созданная машинами, а всё человечество погружено в искусственный сон.',
    'Хакер узнаёт, что реальность — это иллюзия, и становится избранным в войне с машинами.',
    8.7,
    'Вачовски',
    'Фантастика',
    420,
    'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    136
  ),
  (
    'Тёмный рыцарь',
    'Бэтмен поднимает ставки в войне с преступностью. При помощи лейтенанта Джима Гордона и прокурора Харви Дента он намерен избавить Готэм-Сити от преступности. Но вскоре троица окажется во власти хаоса, который сеет анархист-преступник, известный как Джокер.',
    'Бэтмен противостоит Джокеру, несущему в Готэм хаос и разрушение.',
    9.0,
    'Кристофер Нолан',
    'Боевик',
    480,
    'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    152
  );

-- =============================================
-- Тестовые данные — Расписание
-- =============================================

-- Получаем id фильмов через подзапросы
INSERT INTO "KINO-shedule" ("filmId", day, time1, time2, time3)
VALUES
  ((SELECT id FROM "KINO-film" WHERE title = 'Начало'),        '2026-04-01', '10:00', '14:30', '19:00'),
  ((SELECT id FROM "KINO-film" WHERE title = 'Начало'),        '2026-04-02', '11:00', '15:30', '20:00'),
  ((SELECT id FROM "KINO-film" WHERE title = 'Интерстеллар'), '2026-04-01', '12:00', '16:00', NULL),
  ((SELECT id FROM "KINO-film" WHERE title = 'Интерстеллар'), '2026-04-03', '13:00', '17:30', '21:00'),
  ((SELECT id FROM "KINO-film" WHERE title = 'Бойцовский клуб'), '2026-04-02', '18:00', '21:30', NULL),
  ((SELECT id FROM "KINO-film" WHERE title = 'Побег из Шоушенка'), '2026-04-04', '10:30', '14:00', '18:30'),
  ((SELECT id FROM "KINO-film" WHERE title = 'Матрица'),       '2026-04-01', '09:30', '13:00', '17:00'),
  ((SELECT id FROM "KINO-film" WHERE title = 'Матрица'),       '2026-04-05', '11:30', '15:00', '20:30'),
  ((SELECT id FROM "KINO-film" WHERE title = 'Тёмный рыцарь'), '2026-04-03', '10:00', '14:00', '19:30'),
  ((SELECT id FROM "KINO-film" WHERE title = 'Тёмный рыцарь'), '2026-04-06', '12:30', '17:00', '21:00');
