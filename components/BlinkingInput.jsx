'use client'

import { useEffect, useRef } from "react";

export default function BlinkingInput({ value, onChange, placeholder }) {
  if (typeof window !== 'undefined') {
    window.console.log("🎯🎯🎯 BlinkingInput component rendering - placeholder:", placeholder, "value:", value)
  }
  
  const inputRef = useRef(null);
  const fontSize = "14px";
  
  if (typeof window !== 'undefined') {
    window.console.log("📏 BlinkingInput fontSize constant:", fontSize)
  }

  useEffect(() => {
    console.log("👆 BlinkingInput focus useEffect running")
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log("=== BLINKING INPUT COMPONENT DEBUG ===");
      console.log("1. Component rendered");
      console.log("2. FontSize constant:", fontSize);
      console.log("3. Placeholder:", placeholder);
      console.log("4. Value:", value);
      
      const spanEl = document.querySelector('.blinking-input-text');
      console.log("5. Span element found:", !!spanEl);
      
      if (spanEl) {
        const computed = window.getComputedStyle(spanEl);
        console.log("6. Computed styles:", {
          fontSize: computed.fontSize,
          fontFamily: computed.fontFamily,
          fontWeight: computed.fontWeight,
          color: computed.color,
          display: computed.display
        });
        console.log("7. Inline style attribute:", spanEl.getAttribute('style'));
        console.log("8. All CSS properties that affect font-size:", {
          fontSize: computed.getPropertyValue('font-size'),
          lineHeight: computed.getPropertyValue('line-height'),
          font: computed.getPropertyValue('font')
        });
        
        // Check parent elements
        const parent = spanEl.parentElement;
        if (parent) {
          const parentStyles = window.getComputedStyle(parent);
          console.log("9. Parent element styles:", {
            fontSize: parentStyles.fontSize,
            className: parent.className
          });
        }
      } else {
        console.log("ERROR: .blinking-input-text element not found!");
      }
    }, 150);
  }, [value, placeholder, fontSize]);

  console.log("🔄 BlinkingInput about to return JSX, fontSize:", fontSize)

  return (
    <div className="relative flex justify-center mt-6" style={{ marginTop: 110 }}>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 opacity-0 caret-transparent"
        autoComplete="off"
        spellCheck={false}
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

