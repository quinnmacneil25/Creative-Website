import { useState } from 'react';

export default function Nav({ onGo, chapters, stuck }) {
  const [open, setOpen] = useState(false);

  const jump = (i) => {
    onGo(i);
    setOpen(false);
  };

  return (
    <>
      <header className={`nav${stuck ? ' nav--stuck' : ''}`}>
        <nav className="nav__links nav__links--l">
          <button onClick={() => jump(0)}>The Palace</button>
          <button onClick={() => jump(1)}>The Gate</button>
        </nav>

        <button className="nav__mark" onClick={() => jump(0)}>
          <span className="nav__rule" />
          <span className="nav__name">Rann&nbsp;Mahal</span>
          <span className="nav__rule" />
        </button>

        <nav className="nav__links nav__links--r">
          <button onClick={() => jump(2)}>The Court</button>
          <button className="nav__cta" onClick={() => jump(4)}>
            Reserve
          </button>
        </nav>

        <button
          className={`nav__burger${open ? ' nav__burger--open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <i />
          <i />
        </button>
      </header>

      <div className={`drawer${open ? ' drawer--open' : ''}`}>
        {chapters.map((c, i) => (
          <button key={c.n} onClick={() => jump(i)}>
            {c.eyebrow.split('·').pop().trim()}
          </button>
        ))}
      </div>
    </>
  );
}
