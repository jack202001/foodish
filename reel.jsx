/* ───────────────────────────────────────────────────────────
   SIZZLE — HeroReel: the dish video inside a card (box) in the phone,
   with a peeking next-dish box (clipped by the bottom) to show it scrolls.
   ─────────────────────────────────────────────────────────── */

function HeroReel({ brandName = "Foodish" }) {
  const tr = useI18n();
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { e.isIntersecting ? tryPlay() : v.pause(); });
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--cream-2)",
      padding: "44px 13px 0", display: "flex", flexDirection: "column", gap: 11,
      fontFamily: "var(--font-body)", overflow: "hidden" }}>

      {/* ── main dish card: the box holding the video ── */}
      <div style={{ flex: "none", background: "var(--paper)", borderRadius: 22,
        border: "1px solid var(--line)", boxShadow: "var(--shadow-md)", overflow: "hidden" }}>
        <div style={{ position: "relative", aspectRatio: "4 / 5", background: "#0c0a09" }}>
          <video ref={videoRef} src="dish-b.mp4" muted loop playsInline autoPlay
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <span style={{ position: "absolute", left: 11, top: 11, fontFamily: "var(--font-mono)",
            fontSize: 10, letterSpacing: ".06em", textTransform: "uppercase", color: "#fff",
            background: "oklch(0 0 0 / .4)", backdropFilter: "blur(4px)", padding: "3px 8px",
            borderRadius: 6 }}>{tr.reel.tag}</span>
        </div>
        <div style={{ padding: "13px 15px 15px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20,
              color: "var(--ink)", letterSpacing: "-.01em" }}>{tr.reel.name}</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17,
              color: "var(--accent-deep)" }}>{tr.reel.price}</div>
          </div>
          <div style={{ fontSize: 12.5, color: "var(--ink-mute)", marginTop: 4 }}>{tr.reel.kcal}</div>
          <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 5,
            fontSize: 10.5, fontWeight: 700, color: "var(--accent-deep)",
            background: "var(--accent-soft)", padding: "4px 9px", borderRadius: 100 }}>
            <Icon name="leaf" size={11} color="var(--accent-deep)" /> {tr.reel.tag}
          </div>
        </div>
      </div>

      {/* ── peeking next box: clipped by the phone bottom → shows it scrolls ── */}
      <div style={{ flex: "none", background: "var(--paper)", borderRadius: 22,
        border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)", padding: 12,
        display: "flex", gap: 11, alignItems: "center" }}>
        <VideoTile src={tr.reel.nextVideo} ratio="1 / 1" radius={13}
          style={{ width: 60, height: 60, flex: "none" }} />
        <div style={{ lineHeight: 1.25 }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17,
            color: "var(--ink)" }}>{tr.reel.nextName}</div>
          <div style={{ fontSize: 12, color: "var(--ink-mute)" }}>{tr.reel.nextDesc}</div>
        </div>
      </div>

      {/* scroll affordance — small chip pinned to the bottom edge */}
      <div style={{ position: "absolute", left: "50%", bottom: 13, transform: "translateX(-50%)",
        zIndex: 6, display: "inline-flex", alignItems: "center", gap: 7,
        background: "oklch(0.16 0.012 50 / .92)", backdropFilter: "blur(6px)", color: "#fff",
        borderRadius: 100, padding: "7px 14px", fontSize: 11.5, fontWeight: 700,
        whiteSpace: "nowrap", boxShadow: "var(--shadow-md)" }}>
        <span className="reel-chev" style={{ display: "grid", placeItems: "center" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff"
            strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m6 15 6-6 6 6" />
          </svg>
        </span>
        {tr.phone.scroll}
      </div>

      {/* fade the clipped box into the phone bottom */}
      <div style={{ position: "absolute", insetInline: 0, bottom: 0, height: 64, zIndex: 5,
        pointerEvents: "none",
        background: "linear-gradient(0deg, var(--cream-2) 18%, transparent)" }} />
    </div>
  );
}

Object.assign(window, { HeroReel });

/* ── VideoTile: a real looping video inside a framed tile (side frames) ── */
function VideoTile({ src, ratio = "4 / 5", radius = 12, label, tag, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { e.isIntersecting ? tryPlay() : v.pause(); });
    }, { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: ratio, borderRadius: radius,
      overflow: "hidden", background: "#0c0a09", ...style }}>
      <video ref={ref} src={src} muted loop playsInline autoPlay
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      {tag && (
        <span style={{ position: "absolute", right: 9, bottom: 9, zIndex: 3, fontFamily: "var(--font-mono)",
          fontSize: 10, color: "var(--accent-ink)", background: "var(--accent-deep)",
          padding: "3px 8px", borderRadius: 7 }}>{tag}</span>
      )}
      {label && (
        <span style={{ position: "absolute", left: 9, bottom: 9, zIndex: 3, fontFamily: "var(--font-mono)",
          fontSize: 10, color: "#fff", background: "oklch(0 0 0 / .4)", backdropFilter: "blur(4px)",
          padding: "3px 8px", borderRadius: 7 }}>{label}</span>
      )}
    </div>
  );
}

Object.assign(window, { HeroReel, VideoTile });
