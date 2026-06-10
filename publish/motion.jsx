/* ───────────────────────────────────────────────────────────
   SIZZLE — MotionClip: real motion-design loops for How-it-works
   kinds: "upload" | "transform" | "qr"
   ─────────────────────────────────────────────────────────── */

// 7×7 QR-ish pattern (1 = dark module, 2 = finder eye)
const QR_PATTERN = [
  2,2,0,1,0,2,2,
  2,2,0,0,1,2,2,
  0,0,1,0,1,0,0,
  1,0,0,1,0,0,1,
  0,1,1,0,0,1,0,
  2,2,0,1,0,1,1,
  2,2,1,0,1,0,0,
];

function MotionClip({ kind, caption, radius = 14, style = {} }) {
  return (
    <div className="vslot-frame" style={{ position: "relative", aspectRatio: "16 / 10",
      borderRadius: radius, overflow: "hidden", border: "1px solid var(--line)", ...style }}>
      <div className="mc">
        <div className="mc-grain" />
        <div className="mc-stage">
          {kind === "upload" && (
            <div className="mc-zone">
              <div className="mc-photo ghost" />
              <div className="mc-photo live" />
              <div className="mc-updot">
                <Icon name="upload" size={15} color="var(--accent-ink)" stroke={2.1} />
              </div>
            </div>
          )}

          {kind === "transform" && (
            <div style={{ position: "relative", width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
              <div className="mc-steamwrap">
                <span className="mc-steam" /><span className="mc-steam" /><span className="mc-steam" />
              </div>
              <div className="mc-plate">
                <div className="mc-orbit"><i /></div>
                <div className="mc-yolk" />
              </div>
            </div>
          )}

          {kind === "qr" && (
            <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
              <div className="mc-qr">
                {QR_PATTERN.map((v, i) => (
                  <span key={i} className={v === 2 ? "eye" : v === 1 ? "on" : ""}
                    style={{ animationDelay: `${(i % 7) * 70 + Math.floor(i / 7) * 40}ms` }} />
                ))}
                <div className="mc-scan" />
                <div className="mc-check">
                  <Icon name="check" size={14} color="#fff" stroke={2.6} />
                </div>
              </div>
            </div>
          )}
        </div>
        <span className="mc-kicker">Motion</span>
        <span className="mc-loop"><i />loop</span>
        {caption && <span className="mc-cap">{caption}</span>}
      </div>
    </div>
  );
}

Object.assign(window, { MotionClip });
