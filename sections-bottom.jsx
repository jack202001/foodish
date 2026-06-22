/* ───────────────────────────────────────────────────────────
   SIZZLE — sections (bottom): Showcase, Testimonials, FAQ, CTA, Footer
   ─────────────────────────────────────────────────────────── */

/* ── VIDEO GALLERY STRIP ────────────────────────────────── */
function VideoGallery() {
  const tr = useI18n();
  const videos = ["dish-b.mp4", "dish-c.mp4", "dish-d.mp4", "dish-e.mp4", "dish-reel.mp4"];
  const items = [...videos, ...videos]; // clone per loop seamless
  const trackRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const paused = React.useRef(false);
  const resumeTimer = React.useRef(null);
  const programmatic = React.useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.6;

    function tick() {
      const half = track.scrollWidth / 2;

      if (!paused.current) track.scrollLeft += speed;

      // teleport seamless — ignoriamo l'evento scroll che ne deriva
      if (track.scrollLeft >= half) {
        programmatic.current = true;
        track.scrollLeft -= half;
      } else if (track.scrollLeft <= 0 && paused.current) {
        programmatic.current = true;
        track.scrollLeft += half;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    // inizia a metà così si può scorrere anche all'indietro
    track.scrollLeft = track.scrollWidth / 4;
    rafRef.current = requestAnimationFrame(tick);

    const onScroll = () => {
      if (programmatic.current) { programmatic.current = false; return; }
      paused.current = true;
      clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(() => { paused.current = false; }, 1500);
    };

    track.addEventListener("mouseenter", () => { paused.current = true; });
    track.addEventListener("mouseleave", () => { paused.current = false; });
    track.addEventListener("touchstart", () => { paused.current = true; }, { passive: true });
    track.addEventListener("touchend", () => {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(() => { paused.current = false; }, 1500);
    });
    track.addEventListener("scroll", onScroll, { passive: true });

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section style={{ background: "var(--cream-2)", padding: "72px 0" }}>
      <div className="wrap" style={{ marginBottom: 40 }}>
        <Reveal>
          <span className="eyebrow">{tr.gallery.eyebrow}</span>
          <h2 style={{ marginTop: 18, fontSize: "clamp(30px, 4.4vw, 50px)" }}>
            {tr.gallery.title}
          </h2>
        </Reveal>
      </div>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: 16,
          overflowX: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingInline: 28,
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          cursor: "grab",
        }}
      >
        {items.map((src, i) => (
          <div key={i} style={{
            flex: "none",
            width: 200,
            aspectRatio: "9 / 16",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "var(--shadow-lg)",
            background: "var(--ink)",
          }}>
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── INTERACTIVE SHOWCASE ───────────────────────────────── */
function Showcase() {
  const tr = useI18n();
  const icons = ["play", "layout", "cart"];
  const points = tr.showcase.points.map((p, i) => ({ ...p, icon: icons[i] }));
  return (
    <section id="menu" className="section" style={{ position: "relative", overflow: "hidden",
      background: "var(--wine)", color: "var(--cream)" }}>
      <div style={{ position: "absolute", inset: 0, opacity: .5,
        background: "radial-gradient(80% 60% at 15% 10%, oklch(0.45 0.1 36 / 0.6) 0%, transparent 50%)" }} />
      <div className="wrap show-grid" style={{ position: "relative", display: "grid",
        gridTemplateColumns: "0.85fr 1fr", gap: 50, alignItems: "center" }}>
        <div style={{ order: 2 }}>
          <span className="eyebrow" style={{ color: "var(--amber)" }}>{tr.showcase.eyebrow}</span>
          <h2 style={{ marginTop: 18, fontSize: "clamp(32px, 4.6vw, 56px)", color: "var(--cream)" }}>
            {tr.showcase.title}
          </h2>
          <p style={{ marginTop: 18, fontSize: 18.5, color: "oklch(0.86 0.03 70)", maxWidth: 460 }}>
            {tr.showcase.sub}
          </p>
          <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 16 }}>
            {points.map((p) => (
              <div key={p.t} style={{ display: "flex", gap: 15, alignItems: "flex-start" }}>
                <span style={{ width: 42, height: 42, flex: "none", borderRadius: 12,
                  background: "oklch(1 0 0 / 0.1)", display: "grid", placeItems: "center", color: "var(--amber)" }}>
                  <Icon name={p.icon} size={20} color="var(--amber)" />
                </span>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--cream)" }}>{p.t}</div>
                  <div style={{ fontSize: 15, color: "oklch(0.82 0.03 70)", marginTop: 2 }}>{p.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 30, display: "inline-flex", alignItems: "center", gap: 10,
            fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--amber)",
            border: "1px dashed oklch(1 0 0 / 0.25)", borderRadius: 100, padding: "8px 16px" }}>
            <Icon name="qr" size={15} color="var(--amber)" /> {tr.showcase.livePreview}
          </div>
        </div>
        <Reveal style={{ order: 1, display: "flex", justifyContent: "center", position: "relative" }}>
          <div style={{ position: "absolute", inset: "-8%", background:
            "radial-gradient(circle at 50% 50%, oklch(0.55 0.13 40 / 0.5) 0%, transparent 60%)", zIndex: 0 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Phone width={306}><VideoMenu interactive restaurant="Osteria Lume" /></Phone>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ───────────────────────────────────────── */
function Testimonials() {
  const tr = useI18n();
  const icons = ["flame", "globe", "bolt"];
  const quotes = tr.testimonials.quotes.map((q, i) => ({ ...q, icon: icons[i] }));
  return (
    <section id="stories" className="section" style={{ background: "var(--cream)" }}>
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24,
          flexWrap: "wrap" }}>
          <Reveal style={{ maxWidth: 560 }}>
            <span className="eyebrow">{tr.testimonials.eyebrow}</span>
            <h2 style={{ marginTop: 18, fontSize: "clamp(30px, 4.4vw, 50px)" }}>
              {tr.testimonials.title}
            </h2>
          </Reveal>
          <Reveal delay={80} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", gap: 2 }}>
              {[0,1,2,3,4].map((i) => <Icon key={i} name="star" size={20} color="var(--amber)" />)}
            </div>
            <span style={{ fontWeight: 600 }}>{tr.testimonials.rating}</span>
          </Reveal>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginTop: 46 }}
          className="grid-3">
          {quotes.map((t, i) => (
            <Reveal key={t.n} delay={i * 90}>
              <figure style={{ margin: 0, background: "var(--paper)", border: "1px solid var(--line)",
                borderRadius: "var(--r-lg)", padding: 28, height: "100%", display: "flex",
                flexDirection: "column", boxShadow: "var(--shadow-sm)" }}>
                <Icon name="quote" size={26} color="var(--accent)" />
                <blockquote style={{ margin: "16px 0 0", fontSize: 18.5, lineHeight: 1.45,
                  fontFamily: "var(--font-display)", fontWeight: 500, letterSpacing: "-.01em", flex: 1 }}>
                  “{t.q}”
                </blockquote>
                <figcaption style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 42, height: 42, borderRadius: "50%", background: "var(--accent-soft)",
                    display: "grid", placeItems: "center", color: "var(--accent-deep)", flex: "none" }}>
                    <Icon name="user" size={20} color="var(--accent-deep)" />
                  </span>
                  <div style={{ lineHeight: 1.25 }}>
                    <div style={{ fontWeight: 700 }}>{t.n}</div>
                    <div style={{ fontSize: 13, color: "var(--ink-mute)" }}>{t.r}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ────────────────────────────────────────────────── */
function FAQitem({ q, a, open, onClick }) {
  return (
    <div style={{ borderBottom: "1px solid var(--line)" }}>
      <button onClick={onClick} style={{ all: "unset", cursor: "pointer", display: "flex",
        justifyContent: "space-between", alignItems: "center", gap: 18, width: "100%", padding: "22px 4px" }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20,
          letterSpacing: "-.01em", color: "var(--ink)" }}>{q}</span>
        <span style={{ flex: "none", width: 32, height: 32, borderRadius: "50%",
          border: "1.5px solid var(--line-2)", display: "grid", placeItems: "center",
          transition: "transform .25s, background .25s, border-color .25s",
          transform: open ? "rotate(45deg)" : "none",
          background: open ? "var(--accent)" : "transparent",
          borderColor: open ? "var(--accent)" : "var(--line-2)" }}>
          <Icon name="plus" size={16} color={open ? "var(--accent-ink)" : "var(--ink-soft)"} />
        </span>
      </button>
      <div style={{ overflow: "hidden", maxHeight: open ? 240 : 0, transition: "max-height .3s ease" }}>
        <p style={{ padding: "0 4px 24px", color: "var(--ink-soft)", fontSize: 16.5, maxWidth: 720 }}>{a}</p>
      </div>
    </div>
  );
}

function FAQ() {
  const tr = useI18n();
  const [open, setOpen] = useState(0);
  const items = tr.faq.items;
  return (
    <section id="faq" className="section" style={{ background: "var(--cream-2)" }}>
      <div className="wrap faq-grid" style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 44,
        alignItems: "start" }}>
        <Reveal>
          <span className="eyebrow">{tr.faq.eyebrow}</span>
          <h2 style={{ marginTop: 18, fontSize: "clamp(30px, 4.2vw, 48px)" }}>{tr.faq.title}</h2>
          <p style={{ marginTop: 16, color: "var(--ink-soft)", fontSize: 17 }}>
            {tr.faq.stillCurious} <a href="#cta" style={{ color: "var(--accent-deep)", fontWeight: 600,
              textDecoration: "underline", textUnderlineOffset: 3 }}>{tr.faq.talk}</a>
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div>
            {items.map((it, i) => (
              <FAQitemWrap key={i} {...it} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
const FAQitemWrap = FAQitem;

/* ── FINAL CTA ──────────────────────────────────────────── */
function FinalCTA({ copy }) {
  const tr = useI18n();
  const openDemo = useOpenDemo();
  return (
    <section id="cta" className="section" style={{ background: "var(--cream)" }}>
      <div className="wrap">
        <div style={{ position: "relative", overflow: "hidden", borderRadius: "var(--r-xl)",
          background: "linear-gradient(135deg, var(--accent-deep), var(--accent))",
          color: "var(--accent-ink)", padding: "clamp(40px, 6vw, 80px)" }}>
          <div style={{ position: "absolute", right: "-6%", top: "-30%", width: 360, height: 360,
            borderRadius: "50%", background: "oklch(1 0 0 / 0.12)" }} />
          <div style={{ position: "absolute", right: "16%", bottom: "-40%", width: 240, height: 240,
            borderRadius: "50%", background: "oklch(1 0 0 / 0.10)" }} />
          <div style={{ position: "relative", maxWidth: 620 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, letterSpacing: ".16em",
              textTransform: "uppercase", opacity: .85 }}>{tr.cta.ready}</span>
            <h2 style={{ marginTop: 18, fontSize: "clamp(34px, 5vw, 62px)", color: "var(--accent-ink)" }}>
              {copy.ctaHeadline}
            </h2>
            <p style={{ marginTop: 18, fontSize: 19, opacity: .92, maxWidth: 500 }}>{copy.ctaSub}</p>
            <div style={{ marginTop: 30, display: "flex", gap: 13, flexWrap: "wrap" }}>
              <button onClick={openDemo} className="btn" style={{ background: "var(--ink)", color: "var(--cream)" }}>
                {copy.ctaPrimary} <Icon name="arrow" size={18} color="currentColor" />
              </button>
              <a href="#menu" className="btn" style={{ background: "oklch(1 0 0 / 0.16)", color: "var(--accent-ink)" }}>
                {copy.ctaSecondary}
              </a>
            </div>
            <div style={{ marginTop: 22, display: "flex", gap: 20, flexWrap: "wrap", fontSize: 14.5, opacity: .9 }}>
              {tr.cta.badges.map((x) => (
                <span key={x} style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                  <Icon name="check" size={16} color="currentColor" /> {x}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ─────────────────────────────────────────────── */
function Footer({ copy, lang, onLang }) {
  const tr = useI18n();
  const cols = tr.footer.cols;
  return (
    <footer style={{ background: "var(--ink)", color: "oklch(0.82 0.02 70)", paddingTop: 64 }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(3, 1fr)", gap: 30 }}
          className="foot-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Logo glyph={copy.glyph} round={copy.logoRound} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700,
                color: "var(--cream)", letterSpacing: "-.03em" }}>{copy.brandName}</span>
            </div>
            <p style={{ marginTop: 16, fontSize: 15, maxWidth: 280, color: "oklch(0.72 0.02 70)" }}>
              {copy.tagline}
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: ".12em",
                textTransform: "uppercase", color: "oklch(0.62 0.02 70)" }}>{c.h}</div>
              <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                {c.l.map((x) => (
                  <a key={x} href="#top" style={{ fontSize: 15, color: "oklch(0.82 0.02 70)", transition: "color .2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--cream)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "oklch(0.82 0.02 70)"}>{x}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, paddingTop: 22, paddingBottom: 28,
          borderTop: "1px solid oklch(1 0 0 / 0.1)", display: "flex", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12, fontSize: 13.5, color: "oklch(0.62 0.02 70)" }}>
          <span>© 2026 {copy.brandName}. {tr.footer.madeFor}</span>
          <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
            {tr.footer.legal.map((x) => <a key={x} href="#top">{x}</a>)}
            <LangToggle lang={lang} onChange={onLang} dark />
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { VideoGallery, Showcase, Testimonials, FAQ, FinalCTA, Footer });
