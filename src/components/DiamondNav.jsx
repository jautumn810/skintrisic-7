export function DiamondButton({
  label,
  onClick,
  variant = "white",
  className = "",
  disabled = false,
}) {
  const isBack = (label || "").toUpperCase().includes("BACK")
  const finalClassName = `${className}`.trim()

  const handleClick = (e) => {
    console.log("🟢 DiamondButton clicked!", { label, disabled, hasOnClick: !!onClick })
    
    if (disabled) {
      console.log("🟢 DiamondButton is disabled, returning early")
      return
    }
    
    if (onClick) {
      console.log("🟢 DiamondButton calling onClick handler...")
      onClick(e)
      console.log("🟢 DiamondButton onClick handler completed")
    } else {
      console.log("🟢 DiamondButton has no onClick handler!")
    }
  }

  return (
    <button type="button" onClick={handleClick} aria-label={label} className={finalClassName} disabled={disabled}>
      {/* Desktop/tablet: match home-page diamond + arrow + label layout */}
      <div className="group hidden sm:flex flex-row relative justify-center items-center">
        <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
        <span
          className={`absolute ${isBack ? 'left-[15px] bottom-[13px] rotate-180' : 'left-[15px] top-[9px]'} scale-[0.9] hidden sm:block group-hover:scale-[0.92] ease duration-300`}
        >
          ▶
        </span>
        <span className="text-sm font-semibold hidden sm:block ml-6">{label}</span>
      </div>
      {/* Mobile: compact diamond with label inside */}
      <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
        <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">{label}</span>
      </div>
    </button>
  )
}

