import { FOOTER } from '../data/chapters.js';
import Divider from './Divider.jsx';

/** Chapter V. The copy resolves into a footer that rises over the terrace. */
export default function FooterPanel({ data, active, onGo }) {
  return (
    <section className={`ch ch--footer${active ? ' ch--in' : ''}`}>
      <div className="ch__inner">
        <p className="ch__eyebrow">{data.eyebrow}</p>
        <h2 className="ch__title">
          {data.title.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </h2>
        <Divider />
        <p className="ch__body">{FOOTER.note}</p>
      </div>

      <div className="foot">
        <div className="foot__cols">
          {FOOTER.columns.map((col) => (
            <div key={col.h} className="foot__col">
              <h3>{col.h}</h3>
              {col.items.map((it) => (
                <p key={it}>{it}</p>
              ))}
            </div>
          ))}
          <div className="foot__col foot__col--cta">
            <button className="btn btn--gold">{FOOTER.cta}</button>
            <button className="btn btn--ghost" onClick={() => onGo(0)}>
              Return to the Gate
            </button>
          </div>
        </div>
        <div className="foot__base">
          <span>Rann Mahal</span>
          <span>Est. 1884 · Restored 2019</span>
        </div>
      </div>
    </section>
  );
}
