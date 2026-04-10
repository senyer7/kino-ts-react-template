export function SkeletonFilmCard() {
  return (
    <div
      className="animate-pulse flex items-center gap-0"
      style={{ border: "1px solid var(--border-subtle)", height: "4rem" }}
    >
      <div
        style={{
          width: "3.5rem",
          height: "100%",
          backgroundColor: "var(--bg-raised)",
        }}
      />
      <div className="flex-1 px-4">
        <div
          style={{
            height: "10px",
            width: "70%",
            backgroundColor: "var(--bg-raised)",
          }}
        />
      </div>
    </div>
  );
}
