'use client'

export function DiamondButton({
  label,
  onClick,
  variant = "white",
  className = "",
  disabled = false,
}) {
  const finalClassName = `diamond-btn ${variant} ${className}`.trim();
  
  const handleClick = (e) => {
    console.log(`💎 DiamondButton "${label}" clicked!`, { variant, disabled, className: finalClassName })
    if (onClick && !disabled) {
      onClick(e)
    } else {
      console.warn(`⚠️ DiamondButton "${label}" onClick prevented:`, { onClick: !!onClick, disabled })
    }
  }
  
  return (
    <button 
      type="button" 
      onClick={handleClick} 
      className={finalClassName} 
      disabled={disabled}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <span>{label}</span>
    </button>
  );
}

