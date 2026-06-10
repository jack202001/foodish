/* ───────────────────────────────────────────────────────────
   SIZZLE — sections (top): Nav, Hero ×3, HowItWorks, Features
   ─────────────────────────────────────────────────────────── */

/* brand logo mark — shape adapts to identity (rounded square vs circle) */
function Logo({ glyph = "play", size = 30, round = false }) {
  return (
    <span style={{ width: size, height: size, borderRadius: round ? "50%" : 9,
      background: round ? "transparent" : "var(--accent)",
      border: round ? "2px solid var(--accent)" : "none",
      display: "grid", placeItems: "center",
      boxShadow: round ? "none" : "0 4px 12px oklch(0.5 0.1 40 / .28)" }}>
      <Icon name={glyph} size={Math.round(size * 0.5)}
        color={round ? "var(--accent)" : "var(--accent-ink)"} />
    </span>
  );
}

function Nav({ copy }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = ["How it works", "Features", "Menu", "Stories", "FAQ"];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "var(--nav-bg)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      transition: "background .3s, border-color .3s" }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 72 }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800 }}>
          <Logo glyph={copy.glyph} round={copy.logoRound} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-.03em",
            fontWeight: 700 }}>{copy.brandName}</span>
        </a>
        <nav style={{ display: "flex", gap: 30 }} className="nav-links">
          {links.map((l) => (
            <a key={l} href={`#${l.split(" ")[0].toLowerCase()}`}
              style={{ fontSize: 15, fontWeight: 500, color: "var(--ink-soft)", transition: "color .2s" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--ink)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--ink-soft)"}>{l}</a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <a href="#cta" style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }} className="nav-login">Sign in</a>
          <a href="#cta" className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 15 }}>
            {copy.ctaPrimary}
          </a>
        </div>
      </div>
    </header>
  );
}

/* small floating stat card used in heroes */
function StatPill({ icon, big, small, style }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11, background: "var(--paper)",
      border: "1px solid var(--line)", borderRadius: 100, padding: "9px 16px 9px 10px",
      boxShadow: "var(--shadow-md)", ...style }}>
      <span style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--accent-soft)",
        display: "grid", placeItems: "center", color: "var(--accent-deep)", flex: "none" }}>
        <Icon name={icon} size={17} color="var(--accent-deep)" />
      </span>
      <div style={{ lineHeight: 1.1 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>{big}</div>
        <div style={{ fontSize: 11.5, color: "var(--ink-mute)" }}>{small}</div>
      </div>
    </div>
  );
}

function HeroHeading({ copy, size = "clamp(38px, 6vw, 74px)" }) {
  return (
    <h1 style={{ fontSize: size, lineHeight: 0.98 }}>
      {copy.headline}{" "}
      <span style={{ position: "relative", color: "var(--accent-deep)", whiteSpace: "nowrap" }}>
        {copy.headlineAccent}
        <svg viewBox="0 0 220 14" preserveAspectRatio="none" aria-hidden="true"
          style={{ position: "absolute", left: 0, right: 0, bottom: "-0.12em", width: "100%", height: "0.28em" }}>
          <path d="M2 9 C 60 2, 160 2, 218 8" stroke="var(--accent)" strokeWidth="4"
            fill="none" strokeLinecap="round" />
        </svg>
      </span>
    </h1>
  );
}

function HeroCTAs({ copy }) {
  return (
    <div style={{ display: "flex", gap: 13, flexWrap: "wrap", alignItems: "center" }}>
      <a href="#cta" className="btn btn-primary">{copy.ctaPrimary} <Icon name="arrow" size={18} color="currentColor" /></a>
      <a href="#menu" className="btn btn-ghost"><Icon name="play" size={15} color="currentColor" /> {copy.ctaSecondary}</a>
    </div>
  );
}

function TrustStrip() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap",
      marginTop: 6, color: "var(--ink-mute)", fontSize: 13.5 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: ".1em",
        textTransform: "uppercase" }}>Loved by 1,200+ kitchens</span>
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        {["Osteria Lume", "Bocca", "Fuoco", "Verde"].map((n) => (
          <span key={n} style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15,
            color: "var(--ink-soft)", opacity: .75 }}>{n}</span>
        ))}
      </div>
    </div>
  );
}

function Hero({ layout, copy }) {
  /* ── A · SPLIT ──────────────────────────────────────────── */
  if (layout === "split") {
    return (
      <section id="top" style={{ position: "relative", overflow: "hidden",
        background: "radial-gradient(120% 90% at 90% -10%, var(--accent-soft) 0%, transparent 45%), var(--cream)" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 40,
          alignItems: "center", padding: "60px 28px 90px", minHeight: "calc(100vh - 72px)" }}
          className="hero-split">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Reveal><span className="eyebrow">{copy.eyebrow}</span></Reveal>
            <Reveal delay={60}><div style={{ marginTop: 22 }}><HeroHeading copy={copy} /></div></Reveal>
            <Reveal delay={120}>
              <p style={{ marginTop: 24, fontSize: 19, color: "var(--ink-soft)", maxWidth: 480 }}>{copy.sub}</p>
            </Reveal>
            <Reveal delay={180}><div style={{ marginTop: 30 }}><HeroCTAs copy={copy} /></div></Reveal>
            <Reveal delay={240}><div style={{ marginTop: 34 }}><TrustStrip /></div></Reveal>
          </div>
          <Reveal delay={120} style={{ justifySelf: "center", position: "relative" }}>
            <div style={{ position: "absolute", inset: "-6% -10%", background:
              "radial-gradient(circle at 50% 40%, var(--amber-2) 0%, transparent 62%)", opacity: .5, zIndex: 0 }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <Phone width={310}><HeroReel brandName={copy.brandName} /></Phone>
            </div>
            <StatPill icon="chart" big="+23%" small="avg. order value"
              style={{ position: "absolute", top: "12%", left: "-16%", zIndex: 2 }} />
            <StatPill icon="clock" big="4 min" small="to build a menu"
              style={{ position: "absolute", bottom: "14%", right: "-14%", zIndex: 2 }} />
          </Reveal>
        </div>
      </section>
    );
  }

  /* ── B · SPOTLIGHT (centered) ───────────────────────────── */
  if (layout === "spotlight") {
    return (
      <section id="top" style={{ position: "relative", overflow: "hidden",
        background: "radial-gradient(90% 70% at 50% 0%, var(--accent-soft) 0%, transparent 55%), var(--cream)" }}>
        <div className="wrap" style={{ textAlign: "center", padding: "56px 28px 0" }}>
          <Reveal><span className="eyebrow">{copy.eyebrow}</span></Reveal>
          <Reveal delay={60}>
            <div style={{ marginTop: 22, maxWidth: 920, marginInline: "auto" }}>
              <HeroHeading copy={copy} size="clamp(40px, 7vw, 84px)" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ marginTop: 22, fontSize: 19.5, color: "var(--ink-soft)", maxWidth: 560, marginInline: "auto" }}>{copy.sub}</p>
          </Reveal>
          <Reveal delay={180}>
            <div style={{ marginTop: 28, display: "flex", justifyContent: "center" }}><HeroCTAs copy={copy} /></div>
          </Reveal>
        </div>
        <div style={{ position: "relative", marginTop: 44, paddingBottom: 70 }}>
          <Reveal delay={140} style={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 2 }}>
            <Phone width={300}><HeroReel brandName={copy.brandName} /></Phone>
          </Reveal>
          {/* flanking floating video tiles */}
          <div className="hero-flank" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
            <div style={{ position: "absolute", left: "11%", top: "12%", width: 210, transform: "rotate(-5deg)" }}>
              <div style={{ boxShadow: "var(--shadow-lg)", borderRadius: 18, overflow: "hidden", background: "var(--paper)", padding: 8 }}>
                <VideoTile src="dish-reel.mp4" ratio="4 / 5" radius={12} tag="Starters" />
              </div>
            </div>
            <div style={{ position: "absolute", right: "11%", top: "20%", width: 200, transform: "rotate(5deg)" }}>
              <div style={{ boxShadow: "var(--shadow-lg)", borderRadius: 18, overflow: "hidden", background: "var(--paper)", padding: 8 }}>
                <VideoTile src="dish-c.mp4" ratio="4 / 5" radius={12} tag="Desserts" />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 36, flexWrap: "wrap",
            position: "relative", zIndex: 3 }}>
            <StatPill icon="chart" big="+23%" small="avg. order value" />
            <StatPill icon="globe" big="0" small="app downloads — just a QR" />
            <StatPill icon="bolt" big="4 min" small="to publish" />
          </div>
        </div>
      </section>
    );
  }

  /* ── C · EDITORIAL ──────────────────────────────────────── */
  return (
    <section id="top" style={{ position: "relative", overflow: "hidden", background: "var(--cream)" }}>
      <div className="wrap" style={{ paddingTop: 48 }}>
        <Reveal><span className="eyebrow">{copy.eyebrow}</span></Reveal>
        <Reveal delay={60}>
          <h1 style={{ marginTop: 20, fontSize: "clamp(44px, 9vw, 124px)", lineHeight: 0.92, maxWidth: 1100 }}>
            {copy.headline} <span style={{ color: "var(--accent-deep)" }}>{copy.headlineAccent}</span>
          </h1>
        </Reveal>
      </div>
      <div className="wrap hero-editorial" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr",
        gap: 36, alignItems: "end", marginTop: 36, paddingBottom: 80 }}>
        <div style={{ paddingBottom: 24 }}>
          <Reveal delay={120}>
            <p style={{ fontSize: 19, color: "var(--ink-soft)", maxWidth: 420 }}>{copy.sub}</p>
          </Reveal>
          <Reveal delay={180}><div style={{ marginTop: 26 }}><HeroCTAs copy={copy} /></div></Reveal>
          <Reveal delay={240}>
            <div style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 12,
              fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink-soft)" }}>
              {[["01", "Upload a photo of the dish"], ["02", "We turn it into a 6-second video"], ["03", "Guests scan, watch, order"]].map(([n, t]) => (
                <div key={n} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <span style={{ color: "var(--accent-deep)", fontWeight: 700 }}>{n}</span>
                  <span style={{ width: 26, height: 1, background: "var(--line-2)" }} />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={140} style={{ position: "relative", justifySelf: "end" }}>
          <div style={{ position: "absolute", right: "-4%", top: "6%", bottom: "10%", width: "72%",
            background: "var(--wine)", borderRadius: "var(--r-xl)", zIndex: 0 }} />
          <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "center",
            paddingTop: 24 }}>
            <Phone width={300}><HeroReel brandName={copy.brandName} /></Phone>
          </div>
          <StatPill icon="chart" big="+23%" small="avg. order value"
            style={{ position: "absolute", left: "-10%", bottom: "18%", zIndex: 2 }} />
        </Reveal>
      </div>
    </section>
  );
}

/* ── HOW IT WORKS ───────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { n: "01", icon: "upload", t: "Send us your pics", d: "Email or upload photos of your dishes — whatever you already have. No shoot, no studio, no special gear on your side.", kind: "upload", clip: "your photo, in", photo: "how-photo.jpg", photoPos: "center 42%" },
    { n: "02", icon: "sparkle", t: "We create the menu", d: "Our team turns your photos into short, mouth-watering video dishes and builds your whole menu for you — done for you, end to end.", kind: "transform", clip: "we make it move", video: "how-video.mp4" },
    { n: "03", icon: "qr", t: "Share your menu", d: "Get it as a QR code for the tables or a link for your website. Share it anywhere — and send us changes anytime.", kind: "qr", clip: "qr + website" },
  ];
  return (
    <section id="how" className="section" style={{ background: "var(--cream)" }}>
      <div className="wrap">
        <Reveal style={{ maxWidth: 660 }}>
          <span className="eyebrow">A done-for-you service</span>
          <h2 style={{ marginTop: 18, fontSize: "clamp(30px, 4.4vw, 50px)" }}>
            You send the photos. We build the menu. You share it.
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22, marginTop: 50 }}
          className="grid-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div style={{ background: "var(--paper)", border: "1px solid var(--line)",
                borderRadius: "var(--r-lg)", padding: 28, height: "100%", boxShadow: "var(--shadow-sm)",
                display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ width: 52, height: 52, borderRadius: 16, background: "var(--accent-soft)",
                    display: "grid", placeItems: "center", color: "var(--accent-deep)" }}>
                    <Icon name={s.icon} size={24} color="var(--accent-deep)" />
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 30, fontWeight: 700,
                    color: "var(--line-2)" }}>{s.n}</span>
                </div>
                <h3 style={{ marginTop: 22, fontSize: 23 }}>{s.t}</h3>
                <p style={{ marginTop: 10, color: "var(--ink-soft)", fontSize: 16 }}>
                  {s.d.replace("Sizzle turns", "We turn")}
                </p>
                <div style={{ marginTop: 20, flex: 1, display: "flex", alignItems: "flex-end" }}>
                  {s.video ? (
                    <VideoTile src={s.video} ratio="16 / 10" radius={14} label={s.clip} />
                  ) : s.photo ? (
                    <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 10",
                      borderRadius: 14, overflow: "hidden", border: "1px solid var(--line)" }}>
                      <img src={s.photo} alt={s.t}
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
                          objectFit: "cover", objectPosition: s.photoPos || "center 38%" }} />
                      <span style={{ position: "absolute", left: 10, top: 10, fontFamily: "var(--font-mono)",
                        fontSize: 10, letterSpacing: ".06em", textTransform: "uppercase", color: "#fff",
                        background: "oklch(0 0 0 / .4)", backdropFilter: "blur(4px)", padding: "3px 8px",
                        borderRadius: 6 }}>Your photo</span>
                    </div>
                  ) : (
                    <MotionClip kind={s.kind} caption={s.clip} style={{ width: "100%" }} />
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FEATURES ───────────────────────────────────────────── */
function Features() {
  const feats = [
    { icon: "chart", t: "Sell the dish, not the text", d: "Diners spend 30% longer on a video item. Hungry eyes mean bigger orders and fewer “what's that?” questions." },
    { icon: "bolt", t: "Change anything instantly", d: "86'd the branzino? Toggle it off. New price? Type it. The menu updates live — no reprinting, ever." },
    { icon: "globe", t: "Works in any language", d: "Auto-translate every item for tourists. One menu, read in the guest's own language at the tap of a flag." },
    { icon: "leaf", t: "Allergens & diet filters", d: "Tag vegan, gluten-free, spicy. Guests filter the menu to exactly what they can eat — fewer mistakes for staff." },
    { icon: "qr", t: "No app, just a scan", d: "Guests point their camera at the QR and the menu opens. Nothing to download, works on every phone." },
    { icon: "star", t: "See what sells", d: "Know which videos get watched, which dishes get added, and what your tables are really craving." },
  ];
  return (
    <section id="features" className="section" style={{ background: "var(--cream-2)" }}>
      <div className="wrap">
        <Reveal style={{ maxWidth: 660 }}>
          <span className="eyebrow">Why restaurants switch</span>
          <h2 style={{ marginTop: 18, fontSize: "clamp(30px, 4.4vw, 50px)" }}>
            Everything a paper menu can't do.
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginTop: 50 }}
          className="grid-3">
          {feats.map((f, i) => (
            <Reveal key={f.t} delay={(i % 3) * 80}>
              <div className="feat-card" style={{ background: "var(--paper)", border: "1px solid var(--line)",
                borderRadius: "var(--r-md)", padding: 26, height: "100%", transition: "transform .2s, box-shadow .2s" }}>
                <span style={{ width: 46, height: 46, borderRadius: 13, background: "var(--accent-soft)",
                  display: "grid", placeItems: "center", color: "var(--accent-deep)" }}>
                  <Icon name={f.icon} size={22} color="var(--accent-deep)" />
                </span>
                <h3 style={{ marginTop: 18, fontSize: 20 }}>{f.t}</h3>
                <p style={{ marginTop: 9, color: "var(--ink-soft)", fontSize: 15.5 }}>{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, HowItWorks, Features, Logo });
