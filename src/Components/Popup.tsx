import { Kino } from "../Types/data";
import { useEffect, useState } from "react";
import FilmOrderInfo from "./FilmOrderInfo";
import FilmOrdering from "./FilmOrdering";
import FilmSeats from "./FilmSeats";
import FilmShedule from "./FilmShedule";
import FilmSuccess from "./FilmSuccess";
import { supabase } from "../supabase";

interface PopupProps {
  film: Kino | null;
  handleClose: () => void;
}

interface Schedule {
  id: string;
  film: string;
  day: string;
  time: string;
}

interface Seat {
  row: number;
  seat: number;
  isFree: boolean;
}

interface Contacts {
  email: string;
  phone: string;
}

const STEP_LABELS = ["Сеанс", "Места", "Заказ", "Контакты", "Итог"];

export default function Popup({ film, handleClose }: PopupProps) {
  const [step, setStep] = useState<number>(1);
  const [rasp, setRasp] = useState<Schedule | null>(null);
  const [contacts, setContacts] = useState<Contacts>({ email: "", phone: "" });
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  async function sendOrder() {
    const orderData = {
      email: contacts.email,
      phone: contacts.phone,
      filmName: film?.title,
      filmPrice: film?.price,
      filmRow: selectedSeats[0]?.row,
      filmColumn: selectedSeats[0]?.seat,
      date: rasp?.day,
      time: rasp?.time,
    };
    const { error } = await supabase.from("KINO-order").insert(orderData);
    if (error) {
      setError("Не удалось отправить заказ :(");
      return;
    }
    handleClose();
  }

  function canProceed(): boolean {
    switch (step) {
      case 1:
        return rasp !== null;
      case 2:
        return selectedSeats.length > 0;
      case 4:
        return contacts.email.trim() !== "" && contacts.phone.trim() !== "";
      default:
        return true;
    }
  }

  const STEP_HINTS: Record<number, string> = {
    1: "Выберите сеанс",
    2: "Выберите хотя бы одно место",
    4: "Заполните email и телефон",
  };

  function nextStep() {
    if (!canProceed()) return;
    setStep((prev) => Math.min(prev + 1, 5));
  }

  function prevStep() {
    setStep((prev) => Math.max(prev - 1, 1));
  }

  function showPopupContent() {
    switch (step) {
      case 1:
        return <FilmShedule film={film!} handleClick={setRasp} />;
      case 2:
        return <FilmSeats handleSeatsChanged={setSelectedSeats} />;
      case 3:
        return (
          <FilmOrderInfo
            film={film!}
            selectedDate={rasp!}
            seats={selectedSeats}
          />
        );
      case 4:
        return <FilmOrdering onChange={(data) => setContacts(data)} />;
      case 5:
        return (
          <FilmSuccess
            film={film!}
            selectedDate={rasp!}
            selectedSeats={selectedSeats}
            contacts={contacts}
          />
        );
      default:
        return null;
    }
  }

  return (
    /* Overlay */
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(4px)",
        zIndex: 50,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Модальное окно */}
      <div
        className="flex flex-col w-full mx-4"
        style={{
          maxWidth: "520px",
          maxHeight: "90vh",
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-mid)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          overflow: "hidden",
        }}
      >
        {/* Верхняя золотая линия */}
        <div
          style={{
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, var(--gold), transparent)",
          }}
        />

        {/* Шапка модалки */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid var(--border-subtle)" }}
        >
          {/* Назад / Закрыть */}
          <button
            onClick={step > 1 ? prevStep : handleClose}
            className="btn-ghost"
          >
            {step > 1 ? "← назад" : "× закрыть"}
          </button>

          {/* Индикатор шагов */}
          <div className="flex items-center gap-1.5">
            {STEP_LABELS.map((label, i) => {
              const stepNum = i + 1;
              const isActive = stepNum === step;
              const isDone = stepNum < step;
              return (
                <div key={i} className="flex items-center gap-1.5">
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: isActive
                        ? "var(--gold)"
                        : isDone
                          ? "var(--gold-border)"
                          : "var(--border-mid)",
                      transition: "background-color 0.2s ease",
                    }}
                  />
                  {i < STEP_LABELS.length - 1 && (
                    <div
                      style={{
                        width: "16px",
                        height: "1px",
                        backgroundColor: isDone
                          ? "var(--gold-border)"
                          : "var(--border-mid)",
                        transition: "background-color 0.2s ease",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Название шага */}
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              minWidth: "56px",
              textAlign: "right",
            }}
          >
            {STEP_LABELS[step - 1]}
          </p>
        </div>

        {/* Контент шага */}
        <div
          className="flex-1 overflow-y-auto px-6 py-6"
          style={{ minHeight: 0 }}
        >
          {showPopupContent()}
        </div>

        {/* Кнопка действия */}
        <div
          className="px-6 py-5 flex items-center justify-between"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          {/* Подсказка валидации */}
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.65rem",
              opacity: !canProceed() ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
          >
            {STEP_HINTS[step] ?? ""}
          </p>

          {step === 5 ? (
            <button onClick={sendOrder} className="btn-gold">
              Подтвердить заказ
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="btn-gold"
              disabled={!canProceed()}
              style={{
                opacity: canProceed() ? 1 : 0.35,
                cursor: canProceed() ? "pointer" : "not-allowed",
                filter: "none",
              }}
            >
              Далее
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
