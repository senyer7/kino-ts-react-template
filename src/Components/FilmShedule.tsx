import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Schedule, FilmScheduleProps } from "../Types/data";
import { SkeletonSchedule } from "./SkeletonSchedule";

export default function FilmSchedule({ film, handleClick }: FilmScheduleProps) {
  const [filmSchedule, setFilmSchedule] = useState<Schedule[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFilm() {
      setLoading(true);
      console.log(
        `[FilmShedule.tsx]: Загрузка расписания для фильма ${film.title}...`,
      );
      setError(null);
      const { data, error } = await supabase
        .from("KINO-shedule")
        .select("*")
        .eq("filmId", film.id);
      if (error) {
        setError("Не удалось загрузить расписание :(");
        setLoading(false);
        return;
      }
      setFilmSchedule(data || []);
      setLoading(false);
      console.log(
        `[FilmShedule.tsx]: Расписание для фильма ${film.title} загружено`,
        data,
      );
    }
    loadFilm();
  }, [film.id]);

  function handleSelect(schedule: Schedule, time: string) {
    const key = `${schedule.id}-${time}`;
    setSelectedId(key);
    handleClick(schedule);
  }

  return (
    <div>
      {/* Инфо о фильме — всегда из props, скелетон не нужен */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="tag-dark">★ {film.rating}</span>
          <span className="tag-dark">{film.genre}</span>
          <span className="tag-dark">{film.duration} мин</span>
        </div>
        <h2
          className="mb-1 leading-tight"
          style={{
            color: "var(--text-primary)",
            fontFamily: "Unbounded, sans-serif",
            fontSize: "1.1rem",
            fontWeight: 500,
          }}
        >
          {film.title}
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.72rem" }}>
          {film.author}
        </p>
      </div>

      <div className="gold-line mb-6" />

      {/* Расписание — только здесь async, только здесь скелетон */}
      {error ? (
        <p style={{ color: "var(--text-error)", fontSize: "0.8rem" }}>
          {error}
        </p>
      ) : loading ? (
        <SkeletonSchedule />
      ) : (
        <div>
          <p
            className="mb-4 uppercase tracking-widest"
            style={{
              color: "var(--text-muted)",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
            }}
          >
            Выберите сеанс
          </p>

          {filmSchedule.length === 0 ? (
            <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
              Сеансов не найдено
            </p>
          ) : (
            <div className="flex flex-wrap gap-4">
              {filmSchedule.map((schedule, index) => (
                <div
                  key={schedule.id || index}
                  style={{
                    backgroundColor: "var(--bg-raised)",
                    border: "1px solid var(--border-mid)",
                    padding: "1rem 1.25rem",
                    minWidth: "130px",
                  }}
                >
                  <p
                    className="mb-3 text-center"
                    style={{
                      color: "var(--text-primary)",
                      fontFamily: "Unbounded, sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 400,
                    }}
                  >
                    {new Date(schedule.day).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                  <div className="flex flex-col gap-2">
                    {[schedule.time1, schedule.time2, schedule.time3]
                      .filter(Boolean)
                      .map((time, ti) => {
                        const key = `${schedule.id}-${time}`;
                        const isActive = selectedId === key;
                        return (
                          <button
                            key={ti}
                            onClick={() => handleSelect(schedule, time!)}
                            style={{
                              backgroundColor: isActive
                                ? "var(--gold-dim)"
                                : "transparent",
                              border: isActive
                                ? "1px solid var(--gold)"
                                : "1px solid var(--border-mid)",
                              color: isActive
                                ? "var(--gold)"
                                : "var(--text-muted)",
                              fontFamily: "Montserrat, sans-serif",
                              fontSize: "0.78rem",
                              fontWeight: 500,
                              padding: "0.45rem 0.75rem",
                              cursor: "pointer",
                              transition: "all 0.15s ease",
                              width: "100%",
                              textAlign: "center",
                            }}
                            onMouseEnter={(e) => {
                              if (!isActive) {
                                (
                                  e.currentTarget as HTMLButtonElement
                                ).style.borderColor = "var(--gold-border)";
                                (
                                  e.currentTarget as HTMLButtonElement
                                ).style.color = "var(--text-primary)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isActive) {
                                (
                                  e.currentTarget as HTMLButtonElement
                                ).style.borderColor = "var(--border-mid)";
                                (
                                  e.currentTarget as HTMLButtonElement
                                ).style.color = "var(--text-muted)";
                              }
                            }}
                          >
                            {time}
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
