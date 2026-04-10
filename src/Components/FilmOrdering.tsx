import { useState } from "react";

interface FilmOrderingProps {
  onChange: (data: { email: string; phone: string }) => void;
}

export default function FilmOrdering({ onChange }: FilmOrderingProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function handleEmailChange(value: string) {
    setEmail(value);
    onChange({ email: value, phone });
  }

  function handlePhoneChange(value: string) {
    setPhone(value);
    onChange({ email, phone: value });
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
        Контактные данные
      </p>

      <p
        className="mb-8 leading-relaxed"
        style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}
      >
        Билеты и детали заказа будут отправлены на вашу электронную почту.
      </p>

      <div className="flex flex-col gap-8">
        <div>
          <label
            style={{
              display: "block",
              color: "var(--text-muted)",
              fontSize: "0.58rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="your@email.com"
            className="input-dark"
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              color: "var(--text-muted)",
              fontSize: "0.58rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            Телефон
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="+7 (___) ___-__-__"
            className="input-dark"
          />
        </div>
      </div>
    </div>
  );
}
