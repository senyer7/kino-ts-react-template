import { Kino } from "../Types/data";

interface FilmDescriptionProps {
  film: Kino;
  popupClick: (film: Kino) => void;
}

export default function FilmDescription({
  film,
  popupClick,
}: FilmDescriptionProps) {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--rounded-md)",
      }}
    >
      {/* Постер */}
      <div
        className="relative overflow-hidden"
        style={{ height: "280px", backgroundColor: "var(--bg-deep)" }}
      >
        <img
          src={film.image}
          alt={film.title}
          className="w-full h-full object-cover"
          style={{ opacity: 0.65 }}
        />
        {/* Градиент снизу */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--bg-card) 0%, transparent 50%)",
          }}
        />
        {/* Теги поверх постера */}
        <div className="absolute bottom-5 left-6 flex flex-wrap gap-2">
          <span className="tag-dark">{film.genre}</span>
          <span className="tag-dark">{film.duration} мин</span>
          <span
            className="tag-dark"
            style={{ borderColor: "var(--gold-border)", color: "var(--gold)" }}
          >
            ★ {film.rating}
          </span>
        </div>
      </div>

      {/* Контент */}
      <div className="px-8 py-7">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div className="flex-1">
            <p
              className="mb-1 uppercase tracking-widest"
              style={{
                color: "var(--text-muted)",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
              }}
            >
              {film.author}
            </p>
            <h1
              className="mb-4 leading-tight"
              style={{
                color: "var(--text-primary)",
                fontFamily: "Unbounded, sans-serif",
                fontSize: "1.5rem",
                fontWeight: 500,
              }}
            >
              {film.title}
            </h1>
            <p
              className="leading-relaxed"
              style={{
                color: "var(--text-muted)",
                fontSize: "0.82rem",
                lineHeight: "1.8",
                maxWidth: "560px",
              }}
            >
              {film.description}
            </p>
          </div>

          {/* Цена и кнопка */}
          <div
            className="flex-shrink-0 flex flex-col items-end gap-4"
            style={{ minWidth: "160px" }}
          >
            <div className="text-right">
              <p
                className="uppercase tracking-widest"
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                }}
              >
                Цена билета
              </p>
              <p
                className="mt-1"
                style={{
                  color: "var(--gold)",
                  fontFamily: "Unbounded, sans-serif",
                  fontSize: "1.4rem",
                  fontWeight: 500,
                }}
              >
                {film.price}₽
              </p>
            </div>
            <button onClick={() => popupClick(film)} className="btn-gold">
              Купить билет
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
