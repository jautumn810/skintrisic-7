export function DiamondButton({
  label,
  onClick,
  variant = "white",
}) {
  return (
    <button type="button" onClick={onClick} className={`diamond-btn ${variant}`}>
      <span>{label}</span>
    </button>
  );
}

