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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 opacity-0 caret-transparent"
        autoComplete="off"
        spellCheck={false}
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

