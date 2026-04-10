interface FilmProps {
  image: string;
  title: string;
  toClick: () => void;
  isSelected?: boolean;
}

export default function Film({ image, title, toClick, isSelected }: FilmProps) {
  return (
    <div
      onClick={toClick}
      className="flex items-center overflow-hidden cursor-pointer transition-all duration-200 "
      style={{
        backgroundColor: isSelected ? "var(--bg-raised)" : "var(--bg-card)",
        borderLeft: isSelected
          ? "2px solid var(--gold)"
          : "2px solid transparent",
        borderTop: "1px solid var(--border-subtle)",
        borderRight: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        borderRadius: "var(--rounded-md)",
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          (e.currentTarget as HTMLDivElement).style.borderLeftColor =
            "var(--gold-border)";
          (e.currentTarget as HTMLDivElement).style.backgroundColor =
            "var(--bg-raised)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          (e.currentTarget as HTMLDivElement).style.borderLeftColor =
            "transparent";
          (e.currentTarget as HTMLDivElement).style.backgroundColor =
            "var(--bg-card)";
        }
      }}
    >
      <img
        src={image}
        alt={title}
        className="flex-shrink-0 object-cover"
        style={{ width: "3.5rem", height: "4rem" }}
      />
      <div className="flex-1 px-4 py-3">
        <h3
          className="text-sm font-medium leading-snug"
          style={{
            color: isSelected ? "var(--gold-light)" : "var(--text-primary)",
            fontFamily: "Unbounded, sans-serif",
            fontWeight: 400,
            fontSize: "0.72rem",
          }}
        >
          {title}
        </h3>
      </div>
    </div>
  );
}
