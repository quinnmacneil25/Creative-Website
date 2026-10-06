import { useScrollFilm } from './hooks/useScrollFilm.js';
import { CHAPTERS } from './data/chapters.js';
import Preloader from './components/Preloader.jsx';
import FilmCanvas from './components/FilmCanvas.jsx';
import Nav from './components/Nav.jsx';
import Rail from './components/Rail.jsx';
import Chapter from './components/Chapter.jsx';
import FooterPanel from './components/FooterPanel.jsx';

const FRAMES = 240;
const SECTIONS = 5;

export default function App() {
  const { canvasRef, loadPct, isReady, section, progress, goTo } = useScrollFilm({
    frameCount: FRAMES,
    sections: SECTIONS,
    stride: 6,
    ease: 0.16,
    framePath: (i) => `${import.meta.env.BASE_URL}frames/f_${String(i + 1).padStart(4, '0')}.webp`,
  });

  /* The scrim follows the copy, so the palace stays unobstructed on the
     opposite side of the frame. */
  const side = CHAPTERS[section]?.side ?? 'left';

  return (
    <>
      <Preloader pct={loadPct} done={isReady} />
      <FilmCanvas ref={canvasRef} side={side} />
      <Nav onGo={goTo} chapters={CHAPTERS} stuck={progress > 0.008} />
      <Rail chapters={CHAPTERS} active={section} progress={progress} onGo={goTo} />

      <main className="copy">
        {CHAPTERS.map((c, i) =>
          c.side === 'footer' ? (
            <FooterPanel key={c.n} data={c} active={section === i} onGo={goTo} />
          ) : (
            <Chapter key={c.n} data={c} active={section === i} />
          )
        )}
      </main>
    </>
  );
}
