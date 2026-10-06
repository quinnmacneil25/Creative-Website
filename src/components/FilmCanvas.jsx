import { forwardRef } from 'react';

/** The film plate plus its grading stack. `side` steers the scrim toward
 *  whichever edge the current chapter's copy occupies. */
const FilmCanvas = forwardRef(function FilmCanvas({ side }, ref) {
  return (
    <div className="stage">
      <canvas ref={ref} className="stage__canvas" />
      <div className={`stage__scrim stage__scrim--${side}`} />
      <div className="stage__grade" />
      <div className="stage__vignette" />
      <div className="stage__grain" />
    </div>
  );
});

export default FilmCanvas;
