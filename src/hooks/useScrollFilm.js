import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Drives a <canvas> from scroll position, painting one frame of an image
 * sequence per scroll offset.
 *
 * Loading happens in two passes: a priority pass grabs every `stride`-th frame
 * so the whole arc is scrubbable almost immediately, then the gaps stream in
 * behind it, nearest-to-playhead first. `nearestLoaded` falls back to the
 * closest decoded frame, so scrubbing never shows a hole.
 */
export function useScrollFilm({
  frameCount = 240,
  sections = 5,
  stride = 6,
  ease = 0.16,
  framePath = (i) => `frames/f_${String(i + 1).padStart(4, '0')}.webp`,
}) {
  const canvasRef = useRef(null);
  const images = useRef(new Array(frameCount));
  const ready = useRef(new Array(frameCount).fill(false));

  const shown = useRef(-1);
  const target = useRef(0);
  const current = useRef(0);
  const raf = useRef(null);
  const revealed = useRef(false);
  const booted = useRef(false);

  const [loadPct, setLoadPct] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [section, setSection] = useState(0);
  const [progress, setProgress] = useState(0);

  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

  const nearestLoaded = useCallback(
    (i) => {
      i = clamp(i, 0, frameCount - 1);
      if (ready.current[i]) return i;
      for (let d = 1; d < frameCount; d++) {
        if (i - d >= 0 && ready.current[i - d]) return i - d;
        if (i + d < frameCount && ready.current[i + d]) return i + d;
      }
      return -1;
    },
    [frameCount]
  );

  const paint = useCallback(
    (f) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const idx = nearestLoaded(Math.round(f));
      if (idx < 0 || idx === shown.current) return;
      const img = images.current[idx];
      if (!img) return;

      const ctx = canvas.getContext('2d', { alpha: false });
      const cw = canvas.width;
      const ch = canvas.height;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;

      // cover-fit
      let dw, dh, dx, dy;
      if (cr > ir) {
        dw = cw;
        dh = cw / ir;
        dx = 0;
        dy = (ch - dh) / 2;
      } else {
        dh = ch;
        dw = ch * ir;
        dy = 0;
        dx = (cw - dw) / 2;
      }

      ctx.drawImage(img, dx, dy, dw, dh);
      shown.current = idx;
    },
    [nearestLoaded]
  );

  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    shown.current = -1; // force repaint at the new size
    paint(current.current);
  }, [paint]);

  const tick = useCallback(() => {
    const diff = target.current - current.current;
    if (Math.abs(diff) < 0.05) {
      current.current = target.current;
      raf.current = null;
    } else {
      current.current += diff * ease;
      raf.current = requestAnimationFrame(tick);
    }
    paint(current.current);
  }, [ease, paint]);

  const onScroll = useCallback(() => {
    if (!revealed.current) return;
    const max = document.body.scrollHeight - window.innerHeight;
    const p = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;

    target.current = p * (frameCount - 1);
    setProgress(p);
    setSection(clamp(Math.floor(p * sections), 0, sections - 1));

    if (!raf.current) raf.current = requestAnimationFrame(tick);
  }, [frameCount, sections, tick]);

  const goTo = useCallback(
    (i) => {
      const max = document.body.scrollHeight - window.innerHeight;
      const p = clamp((i + 0.38) / sections, 0, 1);
      window.scrollTo({ top: max * p, behavior: 'smooth' });
    },
    [sections]
  );

  /* ── boot ── */
  useEffect(() => {
    if (booted.current) return; // survive StrictMode's double-invoke
    booted.current = true;

    const load = (i) =>
      new Promise((res) => {
        if (images.current[i]) return res();
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          images.current[i] = img;
          ready.current[i] = true;
          res();
        };
        img.onerror = () => res();
        img.src = framePath(i);
      });

    const run = async () => {
      const priority = [];
      for (let i = 0; i < frameCount; i += stride) priority.push(i);
      if (priority[priority.length - 1] !== frameCount - 1) priority.push(frameCount - 1);

      let done = 0;
      await Promise.all(
        priority.map((i) =>
          load(i).then(() => {
            done++;
            setLoadPct(Math.round((done / priority.length) * 100));
          })
        )
      );

      revealed.current = true;
      paint(0);
      setIsReady(true);
      onScroll();

      // background pass — fill the gaps, nearest to the playhead first
      const have = new Set(priority);
      const rest = [];
      for (let i = 0; i < frameCount; i++) if (!have.has(i)) rest.push(i);
      rest.sort((a, b) => Math.abs(a - current.current) - Math.abs(b - current.current));

      let cursor = 0;
      await Promise.all(
        Array.from({ length: 6 }, async () => {
          while (cursor < rest.length) await load(rest[cursor++]);
        })
      );
      shown.current = -1;
      paint(current.current);
    };

    run();
  }, [frameCount, stride, framePath, paint, onScroll]);

  /* ── wire up ── */
  useEffect(() => {
    const onResize = () => {
      sizeCanvas();
      onScroll();
    };
    const onOrient = () => setTimeout(sizeCanvas, 260);

    sizeCanvas();
    if (history.scrollRestoration) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onOrient);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onOrient);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [sizeCanvas, onScroll]);

  return { canvasRef, loadPct, isReady, section, progress, goTo };
}
