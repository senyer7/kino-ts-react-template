import { Kino } from "../Types/data";

interface FilmSuccessProps {
  film: Kino;
  selectedDate: { day: string; time: string } | null;
  selectedSeats: Array<{ row: number; seat: number }>;
  contacts: { email: string; phone: string };
}

export default function FilmSuccess({
  film,
  selectedDate,
  selectedSeats,
  contacts,
}: FilmSuccessProps) {
  const dateStr =
    selectedDate?.day
      ? new Date(selectedDate.day).toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "—";

  return (
    <div>
      {/* Иконка подтверждения */}
      <div className="flex flex-col items-center mb-8">
        <div
          style={{
            width: "56px",
            height: "56px",
            border: "1px solid var(--gold-border)",
            backgroundColor: "var(--gold-dim)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.25rem",
          }}
        >
          <span style={{ color: "var(--gold)", fontSize: "1.4rem" }}>✓</span>
        </div>
        <h2
          className="text-center leading-tight"
          style={{
            color: "var(--text-primary)",
            fontFamily: "Unbounded, sans-serif",
            fontSize: "0.95rem",
            fontWeight: 500,
          }}
        >
          Подтвердите заказ
        </h2>
        <p
          className="mt-2 text-center"
          style={{ color: "var(--text-muted)", fontSize: "0.72rem" }}
        >
          Билеты будут отправлены на вашу почту
        </p>
      </div>

      {/* Детали */}
      <div
        style={{
          backgroundColor: "var(--bg-raised)",
          border: "1px solid var(--border-mid)",
        }}
      >
        {[
          { label: "Фильм", value: film.title },
          { label: "Дата", value: dateStr },
          { label: "Время", value: selectedDate?.time ?? "—" },
          {
            label: "Места",
            value:
              selectedSeats.length > 0
                ? selectedSeats
                    .map((s) => `Р${s.row + 1} М${s.seat + 1}`)
                    .join(", ")
                : "—",
          },
          { label: "Email", value: contacts?.email || "—" },
          { label: "Телефон", value: contacts?.phone || "—" },
        ].map(({ label, value }, i) => (
          <div
            key={i}
            className="flex justify-between items-center px-5 py-3"
            style={{
              borderBottom:
                i < 5 ? "1px solid var(--border-subtle)" : "none",
            }}
          >
            <span
              style={{
                color: "var(--text-muted)",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {label}
            </span>
            <span
              style={{
                color: "var(--text-primary)",
                fontSize: "0.78rem",
                fontWeight: 500,
                textAlign: "right",
                maxWidth: "60%",
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      <p
        className="mt-5 text-center"
        style={{ color: "var(--text-dim)", fontSize: "0.65rem" }}
      >
        Бронь действительна 10 минут после подтверждения
      </p>
    </div>
  );
}
