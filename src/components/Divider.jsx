/** The cusped-arch rule that sits under every chapter title. */
export default function Divider() {
  return (
    <div className="divider">
      <svg viewBox="0 0 80 22" aria-hidden="true">
        <path d="M40 2 C52 2 62 9 62 20 M40 2 C28 2 18 9 18 20 M2 20 H78" />
      </svg>
    </div>
  );
}
