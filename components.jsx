/* ───────────────────────────────────────────────────────────
   SIZZLE — shared components & helpers
   Exposes to window at the bottom for cross-file use.
   ─────────────────────────────────────────────────────────── */
const { useState, useEffect, useLayoutEffect, useRef, useCallback } = React;

/* ── entrance hook ──────────────────────────────────────────
   Resting state is VISIBLE. We only attach a (non-filling) entrance
   animation to elements that are within the viewport at mount, so
   content is never left invisible even if the animation engine is
   throttled. Below-the-fold elements simply render visible.        */
function useEntrance() {
  const ref = useRef(null);
  const [play, setPlay] = useState(false);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top < vh && r.bottom > -40) setPlay(true);   // in initial viewport → animate
  }, []);
  return [ref, play];
}

function Reveal({ children, delay = 0, as: Tag = "div", className = "", style = {} }) {
  const [ref, play] = useEntrance();
  return (
    <Tag ref={ref} className={`fade-up ${play ? "play" : ""} ${className}`}
         style={{ animationDelay: `${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
}

/* ── minimal stroke icons (no decorative SVG illustration) ── */
function Icon({ name, size = 22, stroke = 1.7, color = "currentColor" }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: color, strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    play: <><path d="M7 5.5v13l11-6.5z" fill={color} stroke="none" /></>,
    upload: <><path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M5 20h14" /></>,
    layout: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 9v12" /></>,
    qr: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3M20 14v.01M14 20v.01M20 20v.01M17 17v3" /></>,
    sparkle: <><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /></>,
    chart: <><path d="M4 20V4M4 20h16" /><path d="M8 16v-3M12 16V8M16 16v-6" /></>,
    bolt: <><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" /></>,
    phone: <><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" /></>,
    check: <><path d="m4 12 5 5L20 6" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    star: <><path d="m12 3 2.6 5.6L21 9.3l-4.5 4.3 1.1 6.1L12 17l-5.6 2.7 1.1-6.1L3 9.3l6.4-.7z" fill={color} stroke="none" /></>,
    quote: <><path d="M10 7H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v3H6m12-9h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v3h-2" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    cart: <><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h2l2.4 12.5a1 1 0 0 0 1 .8h9.3a1 1 0 0 0 1-.8L20 7H6" /></>,
    leaf: <><path d="M11 20A7 7 0 0 1 4 13c0-6 7-9 16-9 0 9-3 16-9 16z" /><path d="M11 20c0-4 2-7 6-9" /></>,
    flame: <><path d="M12 3c1 3 4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 1-3 0 1 1 2 2 2 0-3-1-5 1-7z" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>,
  };
  return <svg {...common} aria-hidden="true">{paths[name] || null}</svg>;
}

/* ── video placeholder slot ─────────────────────────────── */
function VideoSlot({ label, tag, ratio = "4 / 3", radius = 14, style = {}, playing = false, kicker }) {
  return (
    <div className="vslot" style={{ aspectRatio: ratio, borderRadius: radius, ...style }}>
      {kicker && (
        <div style={{ position: "absolute", top: 10, left: 10, zIndex: 3, fontFamily: "var(--font-mono)",
          fontSize: 10, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-soft)",
          background: "oklch(1 0 0 / .7)", padding: "3px 7px", borderRadius: 6 }}>{kicker}</div>
      )}
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", zIndex: 1 }}>
        <div style={{
          width: 54, height: 54, borderRadius: "50%",
          background: "oklch(1 0 0 / .82)", boxShadow: "0 8px 20px oklch(.3 .04 50 / .22)",
          display: "grid", placeItems: "center",
          transform: playing ? "scale(.86)" : "scale(1)", transition: "transform .3s",
        }}>
          <span style={{ marginLeft: playing ? 0 : 3, color: "var(--accent-deep)", display: "grid", placeItems: "center" }}>
            {playing
              ? <span style={{ display: "flex", gap: 3 }}>
                  <i style={{ width: 4, height: 16, background: "currentColor", borderRadius: 2 }} />
                  <i style={{ width: 4, height: 16, background: "currentColor", borderRadius: 2 }} />
                </span>
              : <Icon name="play" size={22} color="var(--accent-deep)" />}
          </span>
        </div>
      </div>
      {label && <div className="vslot-tag">{label}</div>}
      {tag && (
        <div style={{ position: "absolute", right: 10, bottom: 10, zIndex: 3, fontFamily: "var(--font-mono)",
          fontSize: 10.5, color: "var(--accent-ink)", background: "var(--accent-deep)",
          padding: "4px 8px", borderRadius: 7 }}>{tag}</div>
      )}
    </div>
  );
}

/* ── phone shell ─────────────────────────────────────────── */
function Phone({ children, width = 300, glow = true }) {
  const h = Math.round(width * 2.06);
  return (
    <div style={{ position: "relative", width, filter: glow ? "none" : "none" }}>
      <div style={{
        width, height: h, borderRadius: 46, background: "oklch(0.16 0.012 50)",
        padding: 11, boxShadow: "var(--shadow-phone)", position: "relative",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: -3, width: 3, height: 64,
          transform: "translateY(-130%)", background: "oklch(0.26 0.012 50)", borderRadius: 3,
        }} />
        <div style={{
          width: "100%", height: "100%", borderRadius: 36, overflow: "hidden",
          background: "var(--paper)", position: "relative",
        }}>
          {/* dynamic island */}
          <div style={{ position: "absolute", top: 11, left: "50%", transform: "translateX(-50%)",
            width: 92, height: 26, background: "oklch(0.16 0.012 50)", borderRadius: 20, zIndex: 30 }} />
          {children}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { useEntrance, Reveal, Icon, VideoSlot, Phone, React });
