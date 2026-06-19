import { useRef, useState } from "react";
import { gsap } from "gsap";

const NAV_LINKS = ["home.", "features.", "blog.", "careers."];

export default function CornerNav() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const linksRef = useRef([]);
  const socialRef = useRef(null);
  const contactRef = useRef(null);
  const tlRef = useRef(null);

  // Build the GSAP timeline once
  const buildTimeline = () => {
    const tl = gsap.timeline({ paused: true });

    // 1. Panel expands from top-right corner
    tl.to(panelRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.55,
      ease: "power4.inOut",
    });

    // 2. Close button fades in
    tl.to(closeBtnRef.current, {
      opacity: 1,
      duration: 0.2,
      ease: "power2.out",
    }, "-=0.1");

    // 3. Nav links stagger up
    tl.to(linksRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
      stagger: 0.08,
    }, "-=0.15");

    // 4. Social icons + contact button fade in
    tl.to([socialRef.current, contactRef.current], {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
      stagger: 0.05,
    }, "-=0.2");

    return tl;
  };

  const openMenu = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Set initial states before animating
    gsap.set(panelRef.current, { scale: 0, opacity: 0, transformOrigin: "top right" });
    gsap.set(closeBtnRef.current, { opacity: 0 });
    gsap.set(linksRef.current, { opacity: 0, y: 24 });
    gsap.set([socialRef.current, contactRef.current], { opacity: 0 });

    tlRef.current = buildTimeline();
    tlRef.current.play();
  };

  const closeMenu = () => {
    if (!isOpen || !tlRef.current) return;
    tlRef.current.reverse();
    tlRef.current.eventCallback("onReverseComplete", () => {
      setIsOpen(false);
    });
  };

  return (
    <div style={styles.scene}>
      {/* Hint text */}
      {!isOpen && <p style={styles.hint}>Open me ↗</p>}

      {/* Hamburger button */}
      {!isOpen && (
        <button onClick={openMenu} style={styles.menuBtn} aria-label="Open navigation">
          <span style={styles.line} />
          <span style={styles.line} />
          <span style={{ ...styles.line, width: 18 }} />
        </button>
      )}

      {/* Full-screen nav panel */}
      <div
        ref={panelRef}
        style={{
          ...styles.panel,
          pointerEvents: isOpen ? "all" : "none",
          // Initial collapsed state (GSAP overrides during animation)
          transform: isOpen ? undefined : "scale(0)",
          opacity: isOpen ? undefined : 0,
        }}
      >
        {/* Logo */}
        <div style={styles.logo}>
          <svg viewBox="0 0 28 28" width={28} height={28} fill="none">
            <path
              d="M4 22L14 6L24 22H4Z"
              fill="rgba(255,255,255,0.9)"
              transform="rotate(-15 14 14)"
            />
            <path
              d="M4 22L14 6L24 22H4Z"
              fill="rgba(255,255,255,0.45)"
              transform="rotate(15 14 14) translate(2 2)"
            />
          </svg>
        </div>

        {/* Close button */}
        <button
          ref={closeBtnRef}
          onClick={closeMenu}
          style={styles.closeBtn}
          aria-label="Close navigation"
        >
          ×
        </button>

        {/* Nav links */}
        <nav style={styles.navLinks}>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              ref={(el) => (linksRef.current[i] = el)}
              href="#"
              style={styles.navLink}
              onMouseEnter={(e) => (e.target.style.color = "rgba(255,255,255,0.85)")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.35)")}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Social icons */}
        <div ref={socialRef} style={styles.socialIcons}>
          {/* Twitter / X */}
          <svg viewBox="0 0 24 24" width={18} height={18} fill="rgba(255,255,255,0.6)" style={{ cursor: "pointer" }}>
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
          </svg>
          {/* Instagram */}
          <svg viewBox="0 0 24 24" width={18} height={18} fill="rgba(255,255,255,0.6)" style={{ cursor: "pointer" }}>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
          </svg>
          {/* LinkedIn */}
          <svg viewBox="0 0 24 24" width={18} height={18} fill="rgba(255,255,255,0.6)" style={{ cursor: "pointer" }}>
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          {/* GitHub */}
          <svg viewBox="0 0 24 24" width={18} height={18} fill="rgba(255,255,255,0.6)" style={{ cursor: "pointer" }}>
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </div>

        {/* Contact button */}
        <button ref={contactRef} style={styles.contactBtn}>
          CONTACT US →
        </button>
      </div>
    </div>
  );
}

const styles = {
  scene: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    background: "#ede9f7",
  },
  hint: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#7c6fcf",
    fontSize: 14,
    letterSpacing: "0.02em",
    pointerEvents: "none",
    userSelect: "none",
  },
  menuBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 64,
    height: 64,
    background: "#6c5ce7",
    borderRadius: 16,
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 5,
    zIndex: 10,
  },
  line: {
    display: "block",
    width: 26,
    height: 2.5,
    background: "#fff",
    borderRadius: 2,
  },
  panel: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
    background: "#6c5ce7",
    borderRadius: 16,
    transformOrigin: "top right",
    zIndex: 5,
    overflow: "hidden",
  },
  logo: {
    position: "absolute",
    top: 14,
    left: 14,
    width: 52,
    height: 52,
    background: "rgba(255,255,255,0.18)",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 20,
    right: 20,
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#fff",
    fontSize: 32,
    lineHeight: 1,
    fontWeight: 300,
    padding: 4,
  },
  navLinks: {
    position: "absolute",
    top: "50%",
    left: 48,
    transform: "translateY(-42%)",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  navLink: {
    fontSize: 64,
    fontWeight: 700,
    color: "rgba(255,255,255,0.35)",
    letterSpacing: -1,
    cursor: "pointer",
    textDecoration: "none",
    lineHeight: 1.15,
    transition: "color 0.2s",
  },
  socialIcons: {
    position: "absolute",
    bottom: 20,
    left: 20,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  contactBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    background: "rgba(255,255,255,0.12)",
    border: "1.5px solid rgba(255,255,255,0.3)",
    borderRadius: 100,
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.08em",
    padding: "10px 20px",
    cursor: "pointer",
  },
};
