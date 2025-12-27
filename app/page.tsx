"use client";

import SiteHeader from "@/components/SiteHeader";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HomePage() {
  const router = useRouter();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Animate heading opacity on mount
    if (headingRef.current) {
      headingRef.current.style.opacity = "0";
      const timer = setTimeout(() => {
        if (headingRef.current) {
          headingRef.current.style.transition = "opacity 1s ease-out";
          headingRef.current.style.opacity = "1";
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <SiteHeader section="INTRO" />
      <div style={{ 
        transform: "scale(0.75)",
        transformOrigin: "center",
        padding: "24px"
      }} className="max-sm-scale">
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "71dvh",
          position: "relative"
        }} className="md-fixed-center">
          {/* Mobile diamond outlines */}
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }} className="lg-hidden">
            <div style={{
              width: "350px",
              height: "350px",
              border: "1px dotted #A0A4AB",
              transform: "rotate(45deg) translate(-52%, -50%)",
              position: "absolute",
              top: "50%",
              left: "50%"
            }}></div>
          </div>
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }} className="lg-hidden">
            <div style={{
              width: "420px",
              height: "420px",
              border: "1px dotted #A0A4AB",
              transform: "rotate(45deg) translate(-52%, -50%)",
              position: "absolute",
              top: "50%",
              left: "50%"
            }}></div>
          </div>

          {/* Main heading */}
          <div id="main-heading" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
            <h1 ref={headingRef} style={{
              fontSize: "60px",
              color: "#1A1B1C",
              fontWeight: 400,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              margin: 0,
              opacity: 0
            }} className="home-heading-responsive">
              Sophisticated<br />
              <span style={{ display: "block", color: "#1A1B1C" }}>skincare</span>
            </h1>
          </div>

          {/* Mobile description and button */}
          <p style={{
            zIndex: 10,
            display: "block",
            width: "30ch",
            marginTop: "16px",
            fontSize: "16px",
            fontWeight: 600,
            textAlign: "center",
            color: "#1a1b1c83"
          }} className="lg-hidden">
            Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.
          </p>
          <div style={{ zIndex: 10, marginTop: "16px" }} className="lg-hidden">
            <Link href="/analysis/introduce">
              <button style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                background: "transparent",
                border: "none",
                cursor: "pointer"
              }}>
                <span style={{ fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>ENTER EXPERIENCE</span>
                <div style={{
                  width: "24px",
                  height: "24px",
                  border: "1px solid black",
                  transform: "rotate(45deg)",
                  cursor: "pointer"
                }}></div>
                <span style={{
                  position: "absolute",
                  left: "129px",
                  transform: "scale(0.5)"
                }}>
                  <svg viewBox="0 0 24 24" width="24" height="24" style={{ fill: "currentColor", color: "black" }}>
                    <path d="M8 5v14l11-7z"></path>
                  </svg>
                </span>
              </button>
            </Link>
          </div>

          {/* Desktop: Left side text */}
          <div style={{
            display: "none",
            position: "fixed",
            bottom: "-7vh",
            left: "-20vw",
            fontSize: "14px",
            fontWeight: 400,
            color: "#1A1B1C",
            textTransform: "uppercase"
          }} className="lg-block">
            <p style={{ marginBottom: "12px" }}>Skinstric developed an A.I. that creates a<br />highly-personalized routine tailored to<br />what your skin needs.</p>
          </div>

          {/* Desktop: Left section with DISCOVER A.I. */}
          <div id="left-section" style={{
            display: "none",
            position: "fixed",
            left: "-53vw",
            top: "50%",
            transform: "translateY(-50%)",
            width: "500px",
            height: "500px"
          }} className="lg-block">
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <div style={{
                width: "100%",
                height: "100%",
                border: "1px dotted #A0A4AB",
                transform: "rotate(45deg)",
                position: "fixed",
                inset: 0
              }}></div>
              <button 
                id="discover-button" 
                onClick={() => router.push("/analysis/introduce")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#1A1B1C",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  height: "36px",
                  position: "absolute",
                  top: "50%",
                  right: 0,
                  transform: "translateY(-50%) translateX(20%)",
                  padding: "4px 12px"
                }}
              >
                <div style={{
                  width: "30px",
                  height: "30px",
                  border: "1px solid black",
                  transform: "rotate(45deg)",
                  cursor: "pointer"
                }}></div>
                <span style={{
                  position: "absolute",
                  left: "18px",
                  top: "8px",
                  transform: "scale(0.9) rotate(180deg)"
                }}>▶</span>
                <span>DISCOVER A.I.</span>
              </button>
            </div>
          </div>

          {/* Desktop: Right section with TAKE TEST */}
          <div id="right-section" style={{
            display: "none",
            position: "fixed",
            top: "50%",
            right: "-53vw",
            transform: "translateY(-50%)",
            width: "500px",
            height: "500px"
          }} className="lg-block">
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <div style={{
                width: "100%",
                height: "100%",
                border: "1px dotted #A0A4AB",
                transform: "rotate(45deg)",
                position: "absolute",
                inset: 0
              }}></div>
              <Link href="/analysis/introduce">
                <button 
                  id="take-test-button" 
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#1A1B1C",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    height: "36px",
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    transform: "translateY(-50%) translateX(-20%)",
                    padding: "4px 12px"
                  }}
                >
                  TAKE TEST
                  <div style={{
                    width: "30px",
                    height: "30px",
                    border: "1px solid black",
                    transform: "rotate(45deg)"
                  }}></div>
                  <span style={{
                    position: "absolute",
                    left: "107px",
                    top: "9px",
                    transform: "scale(0.9)",
                    cursor: "pointer"
                  }}>▶</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
