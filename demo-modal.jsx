/* ───────────────────────────────────────────────────────────
   FOODISH — Request-a-demo modal (mailto submission)
   Static-site friendly: opens the user's mail app with a
   prefilled message to the business inbox.
   ─────────────────────────────────────────────────────────── */
const DEMO_EMAIL = "jacopotallini2@gmail.com";
// Formspree endpoint — create a free form at https://formspree.io (use the
// inbox jacopotallini2@gmail.com) and paste its ID below, e.g. "xayzwlqr".
// While left as "", the form gracefully falls back to opening the mail app.
const FORMSPREE_ID = "xykadbkg";
const FORMSPREE_URL = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : "";

const DemoContext = React.createContext(() => {});
function useOpenDemo() { return React.useContext(DemoContext); }

function DemoModal({ open, onClose }) {
  const tr = useI18n();
  const D = tr.demo;
  const [f, setF] = useState({ first: "", last: "", email: "", restaurant: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState(false);
  const firstRef = useRef(null);

  useEffect(() => {
    if (open) {
      setSent(false); setErr(false); setSending(false);
      setF({ first: "", last: "", email: "", restaurant: "" });
      setTimeout(() => firstRef.current && firstRef.current.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const valid = f.first.trim() && f.last.trim() && /\S+@\S+\.\S+/.test(f.email);

  const mailtoFallback = () => {
    const body =
      `${D.first}: ${f.first}\n` +
      `${D.last}: ${f.last}\n` +
      `${D.email}: ${f.email}\n` +
      `${D.restaurant}: ${f.restaurant || "-"}`;
    window.location.href = `mailto:${DEMO_EMAIL}?subject=${encodeURIComponent(D.mailSubject)}` +
      `&body=${encodeURIComponent(body)}`;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!valid || sending) return;
    // No Formspree configured yet → open the user's mail app (graceful fallback).
    if (!FORMSPREE_URL) { mailtoFallback(); setSent(true); return; }
    setSending(true); setErr(false);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: (() => {
          const fd = new FormData();
          fd.append("name", `${f.first} ${f.last}`);
          fd.append("email", f.email);
          fd.append("restaurant", f.restaurant || "-");
          fd.append("_subject", D.mailSubject);
          return fd;
        })(),
      });
      if (res.ok) { setSent(true); }
      else { setErr(true); }
    } catch (_) { setErr(true); }
    finally { setSending(false); }
  };

  const field = (key, label, ph, type = "text") => (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-soft)" }}>{label}</span>
      <input ref={key === "first" ? firstRef : null}
        type={type} value={f[key]} placeholder={ph}
        onChange={(e) => setF((s) => ({ ...s, [key]: e.target.value }))}
        style={{ font: "inherit", fontSize: 15, color: "var(--ink)", background: "var(--cream)",
          border: "1.5px solid var(--line-2)", borderRadius: 12, padding: "11px 13px", outline: "none",
          transition: "border-color .15s" }}
        onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
        onBlur={(e) => e.target.style.borderColor = "var(--line-2)"} />
    </label>
  );

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 2000, display: "grid", placeItems: "center",
        padding: 20, background: "oklch(0.2 0.03 45 / 0.5)", backdropFilter: "blur(4px)",
        animation: "demoFade .2s ease" }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ width: "100%", maxWidth: 440, background: "var(--paper)", borderRadius: "var(--r-lg)",
          boxShadow: "var(--shadow-lg)", padding: "28px 28px 26px", position: "relative",
          animation: "demoPop .26s cubic-bezier(.2,.8,.3,1)" }}>
        <button onClick={onClose} aria-label="Close"
          style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: "50%",
            border: "none", background: "var(--cream-2)", color: "var(--ink-soft)", fontSize: 18,
            lineHeight: 1, cursor: "pointer" }}>×</button>

        <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 6 }}>
          <span style={{ width: 38, height: 38, borderRadius: 11, background: "var(--accent-soft)",
            display: "grid", placeItems: "center", color: "var(--accent-deep)" }}>
            <Icon name="play" size={18} color="var(--accent-deep)" />
          </span>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 23, fontWeight: 700,
            color: "var(--ink)", letterSpacing: "-.02em" }}>{D.title}</h3>
        </div>

        {sent ? (
          <div style={{ padding: "18px 0 6px", display: "flex", flexDirection: "column", alignItems: "center",
            textAlign: "center", gap: 14 }}>
            <span style={{ width: 52, height: 52, borderRadius: "50%", background: "oklch(0.6 0.13 145)",
              display: "grid", placeItems: "center" }}>
              <Icon name="check" size={26} color="#fff" stroke={2.6} />
            </span>
            <p style={{ fontSize: 15.5, color: "var(--ink-soft)", maxWidth: 320 }}>{FORMSPREE_URL ? D.thanksSent : D.thanks}</p>
            <button onClick={onClose} className="btn btn-dark" style={{ marginTop: 4 }}>{D.cancel}</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p style={{ fontSize: 14.5, color: "var(--ink-soft)", margin: "2px 0 18px" }}>{D.subtitle}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {field("first", D.first, D.firstPh)}
              {field("last", D.last, D.lastPh)}
            </div>
            <div style={{ marginTop: 12 }}>{field("email", D.email, D.emailPh, "email")}</div>
            <div style={{ marginTop: 12 }}>{field("restaurant", D.restaurant, D.restaurantPh)}</div>
            {err && (
              <p style={{ marginTop: 12, fontSize: 13.5, color: "oklch(0.55 0.18 25)", fontWeight: 600 }}>{D.error}</p>
            )}
            <button type="submit" disabled={!valid || sending} className="btn btn-primary"
              style={{ width: "100%", marginTop: 20, opacity: (valid && !sending) ? 1 : 0.5,
                cursor: (valid && !sending) ? "pointer" : "not-allowed" }}>
              {sending ? D.sending : <>{D.send} <Icon name="arrow" size={18} color="currentColor" /></>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { DemoContext, useOpenDemo, DemoModal, DEMO_EMAIL });
