import { useState, useEffect } from "react";
import Film from "./Components/Film";
import { supabase } from "./supabase";
import { Kino } from "./Types/data";
import FilmDescription from "./Components/FilmDescription";
import Popup from "./Components/Popup";
import { SkeletonFilmCard } from "./Components/SkeletonFilmCard";

export default function App() {
  const [films, setFilms] = useState<Kino[]>([]);
  const [selectedFilm, setSelectedFilm] = useState<Kino | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [buyFilm, setBuyFilm] = useState<Kino | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function LoadFilms() {
      setLoading(true); // Пока не дошли данные, показываем скелетоны
      console.log("[App.tsx]: Загрузка фильмов...");
      const { data, error } = await supabase.from("KINO-film").select("*");
      if (data) setFilms(data);
      if (error) {
        setError("Не удалось загрузить фильмы :(");
        console.error("[App.tsx]: Ошибка загрузки фильмов", error);
        setLoading(false); // Ошибка загрузки файлов
      }
      setLoading(false); // Когда данные загрузились, скрываем скелетоны
      console.log("[App.tsx]: Фильмы загружены", data);
    }
    LoadFilms();
  }, []);

  function handleClick(film: Kino): void {
    setSelectedFilm(film);
    console.log("[App.tsx]: рендерим фильм —", film.title);
  }

  function handlePopup(film: Kino): void {
    setBuyFilm(film);
    setIsPopupOpen(true);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-deep)" }}>
      {isPopupOpen && (
        <Popup handleClose={() => setIsPopupOpen(false)} film={buyFilm} />
      )}

      {/* Шапка */}
      <header style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div
          className="mx-auto px-8 py-5 flex items-center justify-between"
          style={{ maxWidth: "1400px" }}
        >
          <div className="flex items-center gap-4">
            <div
              style={{
                width: "3px",
                height: "2.2rem",
                background:
                  "linear-gradient(180deg, var(--gold-light), var(--gold))",
                flexShrink: 0,
              }}
            />
            <div>
              <h1
                className="font-medium tracking-widest text-base"
                style={{
                  color: "var(--text-primary)",
                  letterSpacing: "0.25em",
                  fontFamily: "Unbounded, sans-serif",
                }}
              >
                СИНЕМА
              </h1>
              <p
                className="text-xs tracking-widest"
                style={{
                  color: "var(--gold)",
                  letterSpacing: "0.18em",
                  fontSize: "0.6rem",
                }}
              >
                PREMIER HALL
              </p>
            </div>
          </div>

          <p
            className="tracking-widest uppercase hidden sm:block"
            style={{
              color: "var(--text-muted)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
            }}
          >
            Сейчас в прокате
          </p>
        </div>
      </header>

      {/* Основной контент */}
      <div className="mx-auto px-8 py-10" style={{ maxWidth: "1400px" }}>
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Боковая панель — список фильмов */}
          <aside className="lg:w-72 flex-shrink-0">
            <p
              className="mb-5 tracking-widest uppercase"
              style={{
                color: "var(--text-muted)",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
              }}
            >
              В прокате
            </p>
            <ul className="space-y-1.5">
              {error ? (
                <p
                  style={{
                    color: "var(--text-error)",
                    fontSize: "0.8rem",
                    textDecoration: "underline",
                  }}
                >
                  {error}
                </p>
              ) : loading ? (
                <>
                  <SkeletonFilmCard />
                  <SkeletonFilmCard />
                  <SkeletonFilmCard />
                  <SkeletonFilmCard />
                  <SkeletonFilmCard />
                </>
              ) : (
                films.map((film) => (
                  <li key={film.id}>
                    <Film
                      title={film.title}
                      image={film.image}
                      toClick={() => handleClick(film)}
                      isSelected={selectedFilm?.id === film.id}
                    />
                  </li>
                ))
              )}
            </ul>
          </aside>

          {/* Основная зона — описание фильма */}
          <main className="flex-1">
            {selectedFilm ? (
              <FilmDescription film={selectedFilm} popupClick={handlePopup} />
            ) : (
              <div
                className="flex flex-col items-center justify-center"
                style={{
                  minHeight: "480px",
                  border: "1px solid var(--border-subtle)",
                  backgroundColor: "var(--bg-card)",
                }}
              >
                <div className="text-center">
                  <div
                    className="mx-auto mb-5"
                    style={{
                      width: "48px",
                      height: "48px",
                      border: "1px solid var(--border-mid)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{ color: "var(--text-dim)", fontSize: "1.2rem" }}
                    >
                      ▶
                    </span>
                  </div>
                  <p
                    className="text-sm"
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "Unbounded, sans-serif",
                      fontWeight: 300,
                      letterSpacing: "0.05em",
                    }}
                  >
                    Выберите фильм
                  </p>
                  <p
                    className="mt-2"
                    style={{ color: "var(--text-dim)", fontSize: "0.7rem" }}
                  >
                    из списка слева
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
