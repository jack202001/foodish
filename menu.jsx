/* ───────────────────────────────────────────────────────────
   SIZZLE — the in-phone video menu (shared, interactive)
   ─────────────────────────────────────────────────────────── */
const DISHES = [
  { id: "norma", name: "Norma's Risotto", cat: "Mains", price: "€14", kcal: "Eggplant · ricotta salata · basil", tag: "Chef's pick", icon: "flame", video: "dish-reel.mp4" },
  { id: "tartare", name: "Beef Tartare", cat: "Starters", price: "€18", kcal: "Hand-cut · capers · egg yolk", tag: "Raw", icon: "leaf", video: "how-video.mp4" },
  { id: "burrata", name: "Carbonara", cat: "Mains", price: "€13", kcal: "Guanciale · pecorino · egg · black pepper", tag: "Classic", icon: "flame", video: "dish-c.mp4" },
  { id: "branzino", name: "Whole Sea Bass", cat: "Mains", price: "€26", kcal: "Salt-baked · lemon · herbs", tag: "For two", icon: "flame", video: "dish-d.mp4" },
  { id: "tiramisu", name: "Tiramisu", cat: "Desserts", price: "€9", kcal: "Mascarpone · espresso · cocoa", tag: "Signature", icon: "flame", video: "dish-e.mp4" },
];
const CATS = ["Starters", "Mains", "Desserts"];

function VideoMenu({ interactive = false, restaurant = "Osteria Lume", accentName = "" }) {
  const [active, setActive] = useState(null);   // dish id playing fullscreen
  const [cat, setCat] = useState("Starters");
  const [prog, setProg] = useState(0);
  const [cart, setCart] = useState({});         // { dishId: qty }
  const [justAdded, setJustAdded] = useState(null);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    if (!active) return;
    setProg(0);
    const t = setInterval(() => setProg((p) => (p >= 100 ? 0 : p + 1.4)), 55);
    return () => clearInterval(t);
  }, [active]);

  const addToCart = (id) => {
    if (!interactive) return;
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    setJustAdded(id);
    setTimeout(() => setJustAdded((j) => (j === id ? null : j)), 1100);
  };
  const removeFromCart = (id) => {
    setCart((c) => {
      const n = { ...c };
      if (n[id] > 1) n[id] -= 1; else delete n[id];
      return n;
    });
  };
  const eur = (s) => Number(String(s).replace(/[^\d.]/g, "")) || 0;
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = Object.entries(cart).reduce((sum, [id, q]) => {
    const d = DISHES.find((x) => x.id === id); return sum + (d ? eur(d.price) * q : 0);
  }, 0);

  const list = DISHES.filter((d) => d.cat === cat);
  const playing = DISHES.find((d) => d.id === active);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      background: "var(--paper)", fontFamily: "var(--font-body)" }}>

      {/* header */}
      <div style={{ paddingTop: 48, paddingInline: 18, paddingBottom: 12, flex: "none",
        background: "linear-gradient(180deg, var(--cream-2), var(--paper))",
        borderBottom: "1px solid var(--line)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: ".14em",
              textTransform: "uppercase", color: "var(--accent-deep)" }}>Dinner menu</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700,
              color: "var(--ink)", letterSpacing: "-.02em", lineHeight: 1.1 }}>{restaurant}</div>
          </div>
          <button onClick={() => interactive && count > 0 && setShowCart(true)}
            style={{ all: "unset", position: "relative", width: 34, height: 34, borderRadius: "50%",
              background: "var(--accent-soft)", display: "grid", placeItems: "center",
              color: "var(--accent-deep)", cursor: interactive && count > 0 ? "pointer" : "default" }}>
            <Icon name="cart" size={16} color="var(--accent-deep)" />
            {count > 0 && (
              <span style={{ position: "absolute", top: -5, right: -5, minWidth: 18, height: 18,
                padding: "0 5px", borderRadius: 100, background: "var(--accent)", color: "var(--accent-ink)",
                fontSize: 11, fontWeight: 800, display: "grid", placeItems: "center",
                boxShadow: "0 2px 6px oklch(.5 .12 40 / .4)", animation: "popUp .25s ease" }}>{count}</span>
            )}
          </button>
        </div>
        {/* category chips */}
        <div style={{ display: "flex", gap: 7, marginTop: 12, overflowX: "auto", paddingBottom: 2,
          scrollbarWidth: "none" }}>
          {CATS.map((c) => (
            <button key={c} onClick={() => interactive && setCat(c)}
              style={{ flex: "none", border: "none", borderRadius: 100, padding: "6px 12px",
                fontSize: 12, fontWeight: 600, fontFamily: "var(--font-body)",
                cursor: interactive ? "pointer" : "default",
                background: c === cat ? "var(--ink)" : "var(--cream-2)",
                color: c === cat ? "var(--cream)" : "var(--ink-soft)",
                transition: "background .2s, color .2s" }}>{c}</button>
          ))}
        </div>
      </div>

      {/* scrollable dish list */}
      <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column",
        gap: 13, scrollbarWidth: "none" }}>
        {list.map((d, i) => (
          <div key={d.id} style={{ borderRadius: 18, overflow: "hidden", background: "var(--paper)",
            boxShadow: "var(--shadow-sm)", border: "1px solid var(--line)", flexShrink: 0 }}>
            <div onClick={() => interactive && setActive(d.id)}
              style={{ cursor: interactive ? "pointer" : "default" }}>
              <VideoTile src={d.video} ratio="16 / 10" radius={0} tag={d.cat}
                style={{ borderTopLeftRadius: 17, borderTopRightRadius: 17 }} />
            </div>
            <div style={{ padding: "11px 13px 13px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700,
                  color: "var(--ink)", letterSpacing: "-.01em" }}>{d.name}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700,
                  color: "var(--accent-deep)" }}>{d.price}</div>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--ink-mute)", marginTop: 3 }}>{d.kcal}</div>
              <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 5,
                  fontSize: 10.5, fontWeight: 700, color: "var(--accent-deep)",
                  background: "var(--accent-soft)", padding: "4px 9px", borderRadius: 100 }}>
                  <Icon name={d.icon} size={11} color="var(--accent-deep)" /> {d.tag}
                </div>
                {interactive && (
                  <button onClick={() => addToCart(d.id)}
                    style={{ all: "unset", cursor: "pointer", display: "inline-flex", alignItems: "center",
                      gap: 5, fontSize: 12, fontWeight: 700, borderRadius: 100, padding: "6px 12px",
                      background: justAdded === d.id ? "oklch(0.6 0.13 145)" : "var(--ink)",
                      color: "var(--cream)", transition: "background .2s" }}>
                    {justAdded === d.id
                      ? <><Icon name="check" size={13} color="var(--cream)" /> Added</>
                      : <><Icon name="plus" size={13} color="var(--cream)" /> Add</>}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        <div style={{ height: 4 }} />
      </div>

      {interactive && (
        <div style={{ flex: "none", padding: "10px 14px 16px", borderTop: "1px solid var(--line)",
          background: "var(--paper)" }}>
          <button onClick={() => count > 0 && setShowCart(true)}
            style={{ all: "unset", cursor: count > 0 ? "pointer" : "default", boxSizing: "border-box",
              width: "100%", borderRadius: 100, padding: "12px 16px", fontSize: 14, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
              background: count > 0 ? "var(--accent)" : "var(--cream-2)",
              color: count > 0 ? "var(--accent-ink)" : "var(--ink-mute)", transition: "background .2s" }}>
            {count > 0
              ? <><Icon name="cart" size={15} color="var(--accent-ink)" /> View order · {count} {count === 1 ? "item" : "items"} · €{total}</>
              : <>Tap + to add a dish</>}
          </button>
        </div>
      )}

      {/* cart sheet */}
      {showCart && (
        <div onClick={() => setShowCart(false)}
          style={{ position: "absolute", inset: 0, zIndex: 50, background: "oklch(0.16 0.012 50 / .5)",
            backdropFilter: "blur(2px)", display: "flex", flexDirection: "column", justifyContent: "flex-end",
            animation: "popUp .2s ease" }}>
          <div onClick={(e) => e.stopPropagation()}
            style={{ background: "var(--paper)", borderRadius: "22px 22px 0 0", padding: "16px 16px 18px",
              maxHeight: "82%", display: "flex", flexDirection: "column",
              boxShadow: "0 -10px 40px oklch(0.2 0.04 45 / .3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700, color: "var(--ink)" }}>
                Your order
              </div>
              <button onClick={() => setShowCart(false)}
                style={{ all: "unset", cursor: "pointer", width: 28, height: 28, borderRadius: "50%",
                  background: "var(--cream-2)", display: "grid", placeItems: "center",
                  color: "var(--ink-soft)", fontSize: 16 }}>×</button>
            </div>
            <div style={{ overflowY: "auto", display: "flex", flexDirection: "column", gap: 10,
              scrollbarWidth: "none" }}>
              {Object.entries(cart).map(([id, q]) => {
                const d = DISHES.find((x) => x.id === id); if (!d) return null;
                return (
                  <div key={id} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    <VideoTile src={d.video} ratio="1 / 1" radius={11}
                      style={{ width: 48, height: 48, flex: "none" }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14,
                        color: "var(--ink)" }}>{d.name}</div>
                      <div style={{ fontSize: 11.5, color: "var(--ink-mute)" }}>€{eur(d.price)} each</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <button onClick={() => removeFromCart(id)}
                        style={{ all: "unset", cursor: "pointer", width: 24, height: 24, borderRadius: "50%",
                          border: "1.5px solid var(--line-2)", display: "grid", placeItems: "center",
                          color: "var(--ink-soft)", fontSize: 15, lineHeight: 1 }}>−</button>
                      <span style={{ minWidth: 14, textAlign: "center", fontWeight: 700, fontSize: 14 }}>{q}</span>
                      <button onClick={() => addToCart(id)}
                        style={{ all: "unset", cursor: "pointer", width: 24, height: 24, borderRadius: "50%",
                          background: "var(--ink)", display: "grid", placeItems: "center",
                          color: "var(--cream)", fontSize: 15, lineHeight: 1 }}>+</button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline",
                marginBottom: 11 }}>
                <span style={{ color: "var(--ink-soft)", fontSize: 14 }}>Total</span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22,
                  color: "var(--ink)" }}>€{total}</span>
              </div>
              <div className="btn btn-primary" style={{ width: "100%", fontSize: 14, padding: "12px" }}>
                Send order to kitchen
              </div>
            </div>
          </div>
        </div>
      )}

      {/* fullscreen "playing" overlay */}
      {playing && (
        <div onClick={() => setActive(null)}
          style={{ position: "absolute", inset: 0, zIndex: 40, background: "oklch(0.16 0.012 50)",
            display: "flex", flexDirection: "column", animation: "popUp .28s cubic-bezier(.2,.8,.3,1)" }}>
          <video src={playing.video} muted loop playsInline autoPlay
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
          <span style={{ position: "absolute", top: 50, left: 16, zIndex: 3, fontFamily: "var(--font-mono)",
            fontSize: 10, letterSpacing: ".06em", textTransform: "uppercase", color: "#fff",
            background: "oklch(0 0 0 / .4)", backdropFilter: "blur(4px)", padding: "3px 8px", borderRadius: 6 }}>Now playing</span>
          {/* progress */}
          <div style={{ position: "absolute", top: 50, left: 16, right: 16, height: 3, borderRadius: 3,
            background: "oklch(1 0 0 / .25)", zIndex: 3 }}>
            <div style={{ height: "100%", width: `${prog}%`, background: "var(--accent)", borderRadius: 3,
              transition: "width .1s linear" }} />
          </div>
          <button onClick={(e) => { e.stopPropagation(); setActive(null); }}
            style={{ position: "absolute", top: 46, right: 14, zIndex: 4, width: 30, height: 30,
              borderRadius: "50%", border: "none", background: "oklch(0 0 0 / .4)", color: "#fff",
              fontSize: 16, lineHeight: 1, backdropFilter: "blur(4px)" }}>×</button>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 3,
            padding: "26px 18px 22px",
            background: "linear-gradient(180deg, transparent, oklch(0.16 0.012 50 / .92))" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 10 }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700,
                  color: "#fff", letterSpacing: "-.02em" }}>{playing.name}</div>
                <div style={{ fontSize: 12.5, color: "oklch(0.85 0.02 70)", marginTop: 3 }}>{playing.kcal}</div>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700,
                color: "var(--amber)" }}>{playing.price}</div>
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 9 }}>
              <button onClick={(e) => { e.stopPropagation(); addToCart(playing.id); }}
                style={{ all: "unset", cursor: "pointer", flex: 1, textAlign: "center", borderRadius: 100,
                  padding: "12px", boxSizing: "border-box", fontWeight: 700, fontSize: 14,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                  background: justAdded === playing.id ? "oklch(0.6 0.13 145)" : "var(--accent)",
                  color: justAdded === playing.id ? "#fff" : "var(--accent-ink)", transition: "background .2s" }}>
                {justAdded === playing.id
                  ? <><Icon name="check" size={15} color="#fff" /> Added to order</>
                  : <>Add · {playing.price}</>}
              </button>
              <button onClick={(e) => { e.stopPropagation(); setActive(null); }}
                style={{ all: "unset", cursor: "pointer", width: 46, borderRadius: 100, display: "grid",
                  placeItems: "center", background: "oklch(1 0 0 / .14)", color: "#fff" }}>
                <Icon name="arrow" size={18} color="#fff" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { VideoMenu, DISHES });
