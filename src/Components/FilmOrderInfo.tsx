import { Kino } from "../Types/data";

interface Seat {
  row: number;
  seat: number;
  isFree: boolean;
}

interface FilmOrderInfoProps {
  film: Kino;
  selectedDate: { day: string; time: string };
  seats: Seat[];
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div
      className="flex justify-between items-start py-3"
      style={{ borderBottom: "1px solid var(--border-subtle)" }}
    >
      <span
        className="uppercase tracking-widest"
        style={{
          color: "var(--text-muted)",
          fontSize: "0.58rem",
          letterSpacing: "0.14em",
          paddingTop: "1px",
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: "var(--text-primary)",
          fontSize: "0.8rem",
          fontWeight: 500,
          textAlign: "right",
          maxWidth: "60%",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default function FilmOrderInfo({
  film,
  selectedDate,
  seats,
}: FilmOrderInfoProps) {
  const totalPrice = film.price * seats.length;

  const dateStr = selectedDate?.day
    ? new Date(selectedDate.day).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
      })
    : "—";

  return (
    <div>
      <p
        className="mb-6 uppercase tracking-widest"
        style={{
          color: "var(--text-muted)",
          fontSize: "0.6rem",
          letterSpacing: "0.18em",
        }}
      >
        Информация о заказе
      </p>

      <div
        style={{
          backgroundColor: "var(--bg-raised)",
          border: "1px solid var(--border-mid)",
          padding: "0 1.25rem",
        }}
      >
        <Row label="Фильм" value={film.title} />
        <Row label="Дата" value={`${dateStr}`} />
        <Row label="Время" value={selectedDate?.time ?? "—"} />
        <Row
          label="Места"
          value={
            seats.length > 0 ? (
              <div className="flex flex-col gap-1 items-end">
                {seats.map((s, i) => (
                  <span key={i}>
                    Ряд {s.row + 1}, место {s.seat + 1}
                  </span>
                ))}
              </div>
            ) : (
              "—"
            )
          }
        />
        <Row
          label="Цена"
          value={`${film.price}₽ × ${seats.length} билет${seats.length !== 1 ? "а" : ""}`}
        />
      </div>

      {/* Итог */}
      <div
        className="flex justify-between items-center mt-4 px-5 py-4"
        style={{
          backgroundColor: "var(--gold-dim)",
          border: "1px solid var(--gold-border)",
        }}
      >
        <span
          className="uppercase tracking-widest"
          style={{
            color: "var(--gold)",
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
          }}
        >
          Итого
        </span>
        <span
          style={{
            color: "var(--gold)",
            fontFamily: "Unbounded, sans-serif",
            fontSize: "1.2rem",
            fontWeight: 500,
          }}
        >
          {totalPrice}₽
        </span>
      </div>
    </div>
  );
}
