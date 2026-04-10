import { useState } from "react";
import { Kino } from "../Types/data";

interface FilmSeatsProps {
  film?: Kino | null;
  handleSeatsChanged: (seats: Seat[]) => void;
}

interface Seat {
  row: number;
  seat: number;
  isFree: boolean;
}

const SEATS_PLAN = [
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
];

export default function FilmSeats({ handleSeatsChanged }: FilmSeatsProps) {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  function isSelected(row: number, seat: number): boolean {
    return selectedSeats.some((s) => s.row === row && s.seat === seat);
  }

  function toggleSeat(row: number, seat: number, isTaken: boolean) {
    if (isTaken) return;

    setSelectedSeats((prev) => {
      const found = prev.find((s) => s.row === row && s.seat === seat);
      const updated: Seat[] = found
        ? prev.filter((s) => !(s.row === row && s.seat === seat))
        : [...prev, { row, seat, isFree: true }];
      handleSeatsChanged(updated);
      return updated;
    });
  }

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
        Выберите место
      </p>

      {/* Экран */}
      <div className="mb-8 text-center">
        <div className="gold-line mb-2" />
        <span
          style={{
            color: "var(--text-muted)",
            fontSize: "0.55rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Экран
        </span>
      </div>

      {/* Зал */}
      <div className="flex flex-col gap-2">
        {SEATS_PLAN.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center gap-2 justify-center">
            {/* Номер ряда */}
            <span
              style={{
                color: "var(--text-dim)",
                fontSize: "0.55rem",
                width: "14px",
                textAlign: "right",
                flexShrink: 0,
              }}
            >
              {rowIndex + 1}
            </span>

            {/* Места */}
            {row.map((isTaken, seatIndex) => {
              const selected = isSelected(rowIndex, seatIndex);
              return (
                <button
                  key={seatIndex}
                  onClick={() => toggleSeat(rowIndex, seatIndex, isTaken)}
                  disabled={isTaken}
                  className={
                    isTaken
                      ? "seat-taken"
                      : selected
                        ? "seat-selected"
                        : "seat-free"
                  }
                >
                  {seatIndex + 1}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Легенда */}
      <div className="flex gap-6 justify-center mt-8">
        <div className="flex items-center gap-2">
          <div
            style={{
              width: "14px",
              height: "12px",
              backgroundColor: "var(--bg-raised)",
              border: "1px solid var(--border-mid)",
            }}
          />
          <span style={{ color: "var(--text-muted)", fontSize: "0.62rem" }}>
            Свободно
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            style={{
              width: "14px",
              height: "12px",
              backgroundColor: "var(--gold-dim)",
              border: "1px solid var(--gold)",
            }}
          />
          <span style={{ color: "var(--text-muted)", fontSize: "0.62rem" }}>
            Выбрано
          </span>
        </div>
      </div>

      {/* Выбранные места */}
      {selectedSeats.length > 0 && (
        <div
          className="mt-6 pt-5"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <p
            className="mb-2 uppercase tracking-widest"
            style={{
              color: "var(--text-muted)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
            }}
          >
            Выбрано
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map((s, i) => (
              <span
                key={i}
                style={{
                  backgroundColor: "var(--gold-dim)",
                  border: "1px solid var(--gold-border)",
                  color: "var(--gold)",
                  fontSize: "0.65rem",
                  padding: "0.25rem 0.6rem",
                }}
              >
                Ряд {s.row + 1}, место {s.seat + 1}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
