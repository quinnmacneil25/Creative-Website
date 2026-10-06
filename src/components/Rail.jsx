export default function Rail({ chapters, active, progress, onGo }) {
  return (
    <aside className="rail">
      {chapters.map((c, i) => (
        <button
          key={c.n}
          className={`rail__num${i === active ? ' rail__num--on' : ''}`}
          onClick={() => onGo(i)}
          aria-label={`Chapter ${c.n}`}
        >
          {c.n}
        </button>
      ))}
      <span className="rail__track">
        <i style={{ height: `${progress * 100}%` }} />
      </span>
    </aside>
  );
}
