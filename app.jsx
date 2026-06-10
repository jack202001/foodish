/* ───────────────────────────────────────────────────────────
   SIZZLE / CARTA — App: brand identities, tweaks, render
   ─────────────────────────────────────────────────────────── */

/* accent presets (hex key = swatch in Tweaks → mapped to oklch vars) */
const ACCENTS = {
  "#C8643C": { name: "Terracotta", a: "oklch(0.635 0.142 40)",  deep: "oklch(0.515 0.132 36)",  soft: "oklch(0.93 0.045 60)" },
  "#D89A3A": { name: "Amber",      a: "oklch(0.74 0.13 70)",    deep: "oklch(0.60 0.12 62)",    soft: "oklch(0.94 0.05 82)" },
  "#8E2D3F": { name: "Bordeaux",   a: "oklch(0.475 0.135 14)",  deep: "oklch(0.395 0.12 12)",   soft: "oklch(0.92 0.04 16)" },
  "#B23C55": { name: "Berry",      a: "oklch(0.575 0.155 12)",  deep: "oklch(0.475 0.145 10)",  soft: "oklch(0.93 0.045 18)" },
  "#7E8A3E": { name: "Olive",      a: "oklch(0.605 0.10 128)",  deep: "oklch(0.485 0.092 128)", soft: "oklch(0.93 0.04 120)" },
};
const FONTS = {
  "Grotesque": { stack: '"Bricolage Grotesque", system-ui, sans-serif', mode: "normal" },
  "Serif":     { stack: '"Newsreader", Georgia, serif',                 mode: "serif" },
  "Geometric": { stack: '"Sora", system-ui, sans-serif',                mode: "normal" },
};

/* ── full brand identities ──────────────────────────────── */
const BRANDS = {
  sizzle: {
    name: "Foodish", glyph: "play", logoRound: false,
    accent: "#C8643C", font: "Grotesque",
    eyebrow: "Video menus for restaurants",
    tagline: "Menus that move. Turn your dishes into video and let hungry eyes do the ordering.",
    headline: "Your menu, but every dish is a", headlineAccent: "video.",
    sub: "Foodish turns your dishes into short, mouth-watering videos — so guests order with their eyes before the waiter even reaches the table.",
    ctaPrimary: "Request a demo", ctaSecondary: "See a live menu",
    surfaces: {
      "--cream": "oklch(0.976 0.012 78)", "--cream-2": "oklch(0.958 0.017 74)",
      "--paper": "oklch(0.992 0.006 86)", "--line": "oklch(0.886 0.014 74)",
      "--line-2": "oklch(0.828 0.018 70)", "--ink": "oklch(0.245 0.018 48)",
      "--wine": "oklch(0.305 0.062 30)", "--nav-bg": "oklch(0.976 0.012 78 / 0.82)",
    },
  },
  carta: {
    name: "Carta", glyph: "play", logoRound: true,
    accent: "#8E2D3F", font: "Serif",
    eyebrow: "The video menu, reimagined",
    tagline: "Carta lets every plate speak — a quiet, editorial menu where the food does the talking.",
    headline: "Let the plate speak before a", headlineAccent: "word.",
    sub: "Carta turns each dish into a slow, cinematic clip — an elegant menu guests scan, watch, and order from, in any language.",
    ctaPrimary: "Book a tasting", ctaSecondary: "Preview a menu",
    surfaces: {
      "--cream": "oklch(0.965 0.008 92)", "--cream-2": "oklch(0.94 0.01 90)",
      "--paper": "oklch(0.992 0.005 96)", "--line": "oklch(0.876 0.01 90)",
      "--line-2": "oklch(0.80 0.013 88)", "--ink": "oklch(0.205 0.012 38)",
      "--wine": "oklch(0.225 0.035 24)", "--nav-bg": "oklch(0.965 0.008 92 / 0.82)",
    },
  },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "brand": "sizzle",
  "heroLayout": "spotlight",
  "accent": "#C8643C",
  "displayFont": "Grotesque",
  "headline": "Your menu, but every dish is a",
  "headlineAccent": "video.",
  "sub": "Foodish turns your dishes into short, mouth-watering videos — so guests order with their eyes before the waiter even reaches the table.",
  "ctaPrimary": "Request a demo",
  "ctaSecondary": "See a live menu"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const brand = BRANDS[t.brand] || BRANDS.sizzle;

  /* apply surfaces (brand) + accent + font to :root */
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(brand.surfaces).forEach(([k, v]) => root.style.setProperty(k, v));
    const ac = ACCENTS[t.accent] || ACCENTS["#C8643C"];
    root.style.setProperty("--accent", ac.a);
    root.style.setProperty("--accent-deep", ac.deep);
    root.style.setProperty("--accent-soft", ac.soft);
    const f = FONTS[t.displayFont] || FONTS["Grotesque"];
    root.style.setProperty("--font-display", f.stack);
    root.setAttribute("data-display", f.mode);
  }, [t.brand, t.accent, t.displayFont]);

  /* switching brand pushes its identity into the dependent controls + copy */
  const pickBrand = (id) => {
    const b = BRANDS[id]; if (!b) return;
    setTweak("brand", id);
    setTweak("accent", b.accent);
    setTweak("displayFont", b.font);
    setTweak("headline", b.headline);
    setTweak("headlineAccent", b.headlineAccent);
    setTweak("sub", b.sub);
    setTweak("ctaPrimary", b.ctaPrimary);
    setTweak("ctaSecondary", b.ctaSecondary);
  };

  const copy = {
    brandName: brand.name, glyph: brand.glyph, logoRound: brand.logoRound,
    tagline: brand.tagline, eyebrow: brand.eyebrow,
    headline: t.headline, headlineAccent: t.headlineAccent, sub: t.sub,
    ctaPrimary: t.ctaPrimary, ctaSecondary: t.ctaSecondary,
    ctaHeadline: t.brand === "carta" ? "Turn your menu into a quiet maître d'." : "Turn your menu into your best waiter.",
    ctaSub: "Book a 20-minute demo and watch one of your own dishes come to life — before you decide.",
  };

  return (
    <React.Fragment>
      <Nav copy={copy} />
      <main>
        <Hero layout={t.heroLayout} copy={copy} />
        <HowItWorks />
        <Features />
        <Showcase />
        <Testimonials />
        <FAQ />
        <FinalCTA copy={copy} />
      </main>
      <Footer copy={copy} />

      <TweaksPanel>
        <TweakSection label="Brand identity" />
        <TweakRadio label="Brand" value={t.brand}
          options={[{ value: "sizzle", label: "Foodish" }, { value: "carta", label: "Carta" }]}
          onChange={pickBrand} />

        <TweakSection label="Hero" />
        <TweakRadio label="Layout" value={t.heroLayout}
          options={["split", "spotlight", "editorial"]}
          onChange={(v) => setTweak("heroLayout", v)} />

        <TweakSection label="Style" />
        <TweakColor label="Accent" value={t.accent}
          options={Object.keys(ACCENTS)}
          onChange={(v) => setTweak("accent", v)} />
        <TweakSelect label="Display font" value={t.displayFont}
          options={Object.keys(FONTS)}
          onChange={(v) => setTweak("displayFont", v)} />

        <TweakSection label="Hero copy" />
        <TweakText label="Headline" value={t.headline} multiline
          onChange={(v) => setTweak("headline", v)} />
        <TweakText label="Accent word" value={t.headlineAccent}
          onChange={(v) => setTweak("headlineAccent", v)} />
        <TweakText label="Subheading" value={t.sub} multiline
          onChange={(v) => setTweak("sub", v)} />
        <TweakText label="Primary button" value={t.ctaPrimary}
          onChange={(v) => setTweak("ctaPrimary", v)} />
        <TweakText label="Secondary button" value={t.ctaSecondary}
          onChange={(v) => setTweak("ctaSecondary", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
