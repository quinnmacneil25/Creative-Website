export default function Preloader({ pct, done }) {
  return (
    <div className={`preloader${done ? ' preloader--done' : ''}`}>
      <div className="preloader__inner">
        <svg className="preloader__arch" viewBox="0 0 120 160" aria-hidden="true">
          <defs>
            <clipPath id="archClip">
              <rect x="0" y={160 - (160 * pct) / 100} width="120" height="160" />
            </clipPath>
          </defs>
          <path
            className="preloader__arch-outline"
            d="M60 4 C86 4 110 26 110 56 L110 156 L10 156 L10 56 C10 26 34 4 60 4 Z"
          />
          <path
            className="preloader__arch-solid"
            clipPath="url(#archClip)"
            d="M60 4 C86 4 110 26 110 56 L110 156 L10 156 L10 56 C10 26 34 4 60 4 Z"
          />
        </svg>
        <div className="preloader__mark">Rann Mahal</div>
        <div className="preloader__pct">
          {pct}
          <i>%</i>
        </div>
        <div className="preloader__note">Lighting the lanterns</div>
      </div>
    </div>
  );
}
