import Divider from './Divider.jsx';

/** A chapter of copy, pinned to the left or right half of the frame. */
export default function Chapter({ data, active }) {
  const { side, eyebrow, title, body, scroll } = data;
  return (
    <section className={`ch ch--${side}${active ? ' ch--in' : ''}`}>
      <div className="ch__inner">
        <p className="ch__eyebrow">{eyebrow}</p>
        <h2 className="ch__title">
          {title.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </h2>
        <Divider />
        <p className="ch__body">{body}</p>
      </div>
      {scroll && <p className="ch__scroll">{scroll}</p>}
    </section>
  );
}
