import { useEffect, useRef } from "react";

export default function BlinkingInput({ value, onChange, placeholder }) {
  console.log("🎯 BlinkingInput component rendering - placeholder:", placeholder)
  
  const inputRef = useRef(null);
  const fontSize = "clamp(32px, 6vw, 52px)"; // Larger responsive font size
  
  console.log("📏 BlinkingInput fontSize:", fontSize)

  useEffect(() => {
    inputRef.current?.focus();
    
    setTimeout(() => {
      const spanEl = document.querySelector('span[style*="fontSize"]')
      if (spanEl) {
        const computed = window.getComputedStyle(spanEl)
        console.log("=== BLINKING INPUT DEBUG ===")
        console.log("FontSize constant:", fontSize)
        console.log("Computed fontSize:", computed.fontSize)
        console.log("Inline style:", spanEl.getAttribute('style'))
      }
    }, 100)
  }, []);

  return (
    <div className="relative flex justify-center mt-6" style={{ marginTop: 110 }}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          // Allow all standard keyboard input including backspace, delete, arrow keys, etc.
          if (e.key === 'Backspace' || e.key === 'Delete' || e.key.startsWith('Arrow')) {
            e.stopPropagation();
          }
        }}
        className="absolute inset-0 opacity-0 caret-transparent"
        autoComplete="off"
        spellCheck={false}
        style={{ pointerEvents: 'auto' }}
      />

      <div className="relative text-center">
        <span
          className={`font-light blinking-input-text ${value ? "text-black" : ""}`}
          style={{ fontSize: fontSize, color: value ? "#111" : "rgba(0,0,0,0.35)" }}
        >
          {value || placeholder}
        </span>

        {/* centered blinking caret when empty */}
        {!value && <span className="center-caret" style={{ bottom: "0.15em" }} />}
      </div>
    </div>
  );
}

