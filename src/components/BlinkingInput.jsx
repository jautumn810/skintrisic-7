import { useEffect, useRef } from "react";

export default function BlinkingInput({ value, onChange, placeholder }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
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
          className={`font-light ${value ? "text-black" : ""}`}
          style={{ fontSize: "clamp(46px, 9vw, 84px)", color: value ? "#111" : "rgba(0,0,0,0.35)" }}
        >
          {value || placeholder}
        </span>

        {/* centered blinking caret when empty */}
        {!value && <span className="center-caret" style={{ bottom: "0.15em" }} />}
      </div>
    </div>
  );
}

