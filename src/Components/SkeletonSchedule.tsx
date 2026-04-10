export function SkeletonSchedule() {
  return (
    <div className="animate-pulse">
      {/* Заглушка лейбла "Выберите сеанс" */}
      <div
        style={{
          height: "10px",
          width: "110px",
          backgroundColor: "var(--bg-raised)",
          marginBottom: "16px",
        }}
      />

      {/* Карточки дат с временами */}
      <div className="flex flex-wrap gap-4">
        {[3, 2, 3].map((slots, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "var(--bg-raised)",
              border: "1px solid var(--border-subtle)",
              padding: "1rem 1.25rem",
              minWidth: "130px",
            }}
          >
            {/* Дата */}
            <div
              style={{
                height: "11px",
                width: "55px",
                backgroundColor: "var(--bg-hover)",
                margin: "0 auto 12px",
              }}
            />
            {/* Слоты времени */}
            <div className="flex flex-col gap-2">
              {Array.from({ length: slots }).map((_, j) => (
                <div
                  key={j}
                  style={{
                    height: "32px",
                    backgroundColor: "var(--bg-hover)",
                    border: "1px solid var(--border-subtle)",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
