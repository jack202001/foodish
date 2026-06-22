/* ───────────────────────────────────────────────────────────
   FOODISH — i18n: EN / IT dictionary + language context
   ─────────────────────────────────────────────────────────── */

const I18N = {
  en: {
    langName: "EN",
    nav: {
      links: [
        { label: "How it works", href: "#how" },
        { label: "Features", href: "#features" },
        { label: "Menu", href: "#menu" },
        { label: "Stories", href: "#stories" },
        { label: "FAQ", href: "#faq" },
      ],
      signin: "Sign in",
    },
    hero: {
      eyebrow: "Video menus for restaurants",
      headline: "Your menu, but every dish is a",
      headlineAccent: "video.",
      sub: "Foodish turns your dishes into short, mouth-watering videos — so guests order with their eyes before the waiter even reaches the table.",
      ctaPrimary: "Request a demo",
      ctaSecondary: "See a live menu",
      trust: "Loved by 1,200+ kitchens",
    },
    stats: {
      aov: "avg. order value",
      buildMenu: "to build a menu",
      publish: "to publish",
      appDownloads: "app downloads — just a QR",
    },
    heroSteps: [
      ["01", "Upload a photo of the dish"],
      ["02", "We turn it into a 6-second video"],
      ["03", "Guests scan, watch, order"],
    ],
    how: {
      eyebrow: "A done-for-you service",
      title: "You send the photos. We build the menu. You share it.",
      yourPhoto: "Your photo",
      steps: [
        { t: "Send us your pics", d: "Email or upload photos of your dishes — whatever you already have. No shoot, no studio, no special gear on your side.", clip: "your photo, in" },
        { t: "We create the menu", d: "Our team turns your photos into short, mouth-watering video dishes and builds your whole menu for you — done for you, end to end.", clip: "we make it move" },
        { t: "Share your menu", d: "Get it as a QR code for the tables or a link for your website. Share it anywhere — and send us changes anytime.", clip: "qr + website" },
      ],
    },
    features: {
      eyebrow: "Why restaurants switch",
      title: "Everything a paper menu can't do.",
      items: [
        { t: "Sell the dish, not the text", d: "Diners spend 30% longer on a video item. Hungry eyes mean bigger orders and fewer “what's that?” questions." },
        { t: "Works in any language", d: "Auto-translate every item for tourists. One menu, read in the guest's own language at the tap of a flag." },
        { t: "Allergens & diet filters", d: "Tag vegan, gluten-free, spicy. Guests filter the menu to exactly what they can eat — fewer mistakes for staff." },
        { t: "No app, just a scan", d: "Guests point their camera at the QR and the menu opens. Nothing to download, works on every phone." },
      ],
    },
    showcase: {
      eyebrow: "Try it yourself",
      title: "This is a real menu. Go on, tap a dish.",
      sub: "It's exactly what your guests see after scanning the QR at the table. Try it. This is just an example.",
      livePreview: "Live preview — fully interactive",
      points: [
        { t: "Tap any dish", d: "Each item plays a short video right where the photo would be." },
        { t: "Filter by course", d: "Starters, mains, desserts — guests jump straight to what they want." },
        { t: "Add to the order", d: "Build the order from the table, ready for the waiter or the kitchen." },
      ],
    },
    testimonials: {
      eyebrow: "From the pass",
      title: "Restaurateurs who let the food do the talking.",
      rating: "4.9/5 · 1,200+ kitchens",
      quotes: [
        { q: "We added videos to our antipasti and they started flying out of the kitchen. Average check is up nearly a quarter.", n: "Marco Bellini", r: "Owner · Osteria Lume, Bologna" },
        { q: "Tourists used to point and guess. Now they watch, read it in their language, and order exactly what they want.", n: "Sofia Greco", r: "Manager · Bocca, Rome" },
        { q: "Changing the menu used to mean a trip to the printer. Now I update tonight's specials from my phone in the car.", n: "Luca Ferraro", r: "Chef · Fuoco, Milan" },
      ],
    },
    gallery: {
      eyebrow: "In action",
      title: "Dishes that speak for themselves",
    },
    faq: {
      eyebrow: "Good to know",
      title: "Questions, answered.",
      stillCurious: "Still curious?",
      talk: "Talk to our team →",
      items: [
        { q: "Do I need a videographer or special equipment?", a: "No. Just send us a normal photo of the dish from any phone and we create a short, appetising looping video for you. If you already have video clips, we can use those too." },
        { q: "How do guests see the menu?", a: "They point their phone camera at the QR code on the table and the video menu opens instantly in the browser — no app to download, on any modern phone." },
        { q: "Can I update prices and dishes?", a: "Yes — just send us the change. A new price, a sold-out dish, tonight's special: tell us and your menu updates, usually the same day." },
        { q: "Does it work for tourists who don't speak English?", a: "Every item can auto-translate, so each guest reads the menu in their own language while watching the same mouth-watering video." },
      ],
    },
    cta: {
      ready: "Ready when you are",
      headline: "Turn your menu into your best waiter.",
      sub: "Book a 20-minute demo and watch one of your own dishes come to life — before you decide.",
      badges: ["Free 14-day trial", "No card required", "Live in an afternoon"],
    },
    demo: {
      title: "Request a demo",
      subtitle: "Leave your details and we'll get back to you within one working day.",
      first: "First name", last: "Last name", email: "Email",
      restaurant: "Restaurant (optional)",
      send: "Send request", cancel: "Cancel",
      firstPh: "Jane", lastPh: "Doe", emailPh: "jane@restaurant.com", restaurantPh: "Your restaurant",
      mailSubject: "Foodish demo request",
      thanks: "Thanks! Your email app will open with the request ready to send.",
      thanksSent: "Thanks! Your request has been sent — we'll be in touch soon.",
      sending: "Sending…",
      error: "Something went wrong. Please try again or email us directly.",
    },
    footer: {
      tagline: "Menus that move. Turn your dishes into video and let hungry eyes do the ordering.",
      madeFor: "Made for restaurants.",
      cols: [
        { h: "Product", l: ["Features", "Video menus", "QR ordering", "Analytics", "Pricing"] },
        { h: "Company", l: ["About", "Stories", "Careers", "Contact"] },
        { h: "Resources", l: ["Help center", "Guides", "Status", "API"] },
      ],
      legal: ["Privacy", "Terms", "Cookies"],
    },
    phone: {
      dinnerMenu: "Dinner menu",
      cats: { Starters: "Starters", Mains: "Mains", Desserts: "Desserts" },
      add: "Add", added: "Added",
      viewOrder: "View order", item: "item", items: "items",
      tapToAdd: "Tap + to add a dish",
      yourOrder: "Your order", each: "each", total: "Total",
      sendOrder: "Send order to kitchen",
      nowPlaying: "Now playing", addedToOrder: "Added to order",
      scroll: "Scroll for more dishes",
    },
    dishes: {
      norma:    { name: "Norma's Risotto", kcal: "Eggplant · ricotta salata · basil", tag: "Chef's pick" },
      tartare:  { name: "Beef Tartare", kcal: "Hand-cut · capers · egg yolk", tag: "Raw" },
      burrata:  { name: "Carbonara", kcal: "Guanciale · pecorino · egg · black pepper", tag: "Classic" },
      branzino: { name: "Whole Sea Bass", kcal: "Salt-baked · lemon · herbs", tag: "For two" },
      tiramisu: { name: "Tiramisu", kcal: "Mascarpone · espresso · cocoa", tag: "Signature" },
    },
    reel: { tag: "Starters", name: "Beef Tartare", kcal: "Hand-cut · capers · egg yolk", price: "€18", nextName: "Whole Sea Bass", nextDesc: "Salt-baked · lemon · herbs", nextVideo: "dish-d.mp4" },
  },

  it: {
    langName: "IT",
    nav: {
      links: [
        { label: "Come funziona", href: "#how" },
        { label: "Funzioni", href: "#features" },
        { label: "Menu", href: "#menu" },
        { label: "Storie", href: "#stories" },
        { label: "FAQ", href: "#faq" },
      ],
      signin: "Accedi",
    },
    hero: {
      eyebrow: "Menu video per ristoranti",
      headline: "Il tuo menu, ma ogni piatto è un",
      headlineAccent: "video.",
      sub: "Foodish trasforma i tuoi piatti in brevi video irresistibili — così gli ospiti ordinano con gli occhi ancora prima che il cameriere arrivi al tavolo.",
      ctaPrimary: "Richiedi una demo",
      ctaSecondary: "Guarda un menu dal vivo",
      trust: "Scelto da oltre 1.200 cucine",
    },
    stats: {
      aov: "scontrino medio",
      buildMenu: "per creare un menu",
      publish: "per pubblicare",
      appDownloads: "app da scaricare — solo un QR",
    },
    heroSteps: [
      ["01", "Carica una foto del piatto"],
      ["02", "La trasformiamo in un video di 6 secondi"],
      ["03", "Gli ospiti scansionano, guardano, ordinano"],
    ],
    how: {
      eyebrow: "Un servizio chiavi in mano",
      title: "Tu mandi le foto. Noi creiamo il menu. Tu lo condividi.",
      yourPhoto: "La tua foto",
      steps: [
        { t: "Mandaci le foto", d: "Inviaci via email o carica le foto dei tuoi piatti — quelle che hai già. Niente shooting, niente studio, nessuna attrezzatura particolare.", clip: "le tue foto" },
        { t: "Creiamo il menu", d: "Il nostro team trasforma le tue foto in brevi video appetitosi e costruisce tutto il menu per te — dall'inizio alla fine.", clip: "lo facciamo noi" },
        { t: "Condividi il menu", d: "Lo ricevi come QR code per i tavoli o come link per il tuo sito. Condividilo ovunque — e mandaci le modifiche quando vuoi.", clip: "qr + sito" },
      ],
    },
    features: {
      eyebrow: "Perché i ristoranti scelgono noi",
      title: "Tutto quello che un menu di carta non può fare.",
      items: [
        { t: "Vendi il piatto, non il testo", d: "Gli ospiti guardano un piatto in video il 30% più a lungo. Occhi affamati significano ordini più grandi e meno domande del tipo «cos'è?»." },
        { t: "Funziona in ogni lingua", d: "Traduci ogni piatto in automatico per i turisti. Un solo menu, letto nella lingua dell'ospite con un tocco sulla bandierina." },
        { t: "Allergeni e filtri dietetici", d: "Etichetta vegano, senza glutine, piccante. Gli ospiti filtrano il menu in base a ciò che possono mangiare — meno errori per il personale." },
        { t: "Nessuna app, solo una scansione", d: "Gli ospiti inquadrano il QR con la fotocamera e il menu si apre. Niente da scaricare, funziona su ogni telefono." },
      ],
    },
    showcase: {
      eyebrow: "Provalo tu stesso",
      title: "Questo è un menu vero. Forza, tocca un piatto.",
      sub: "È esattamente ciò che vedono i tuoi ospiti dopo aver scansionato il QR al tavolo. Provalo. Questo è solo un esempio.",
      livePreview: "Anteprima dal vivo — completamente interattiva",
      points: [
        { t: "Tocca un piatto", d: "Ogni piatto mostra un breve video proprio dove ci sarebbe la foto." },
        { t: "Filtra per portata", d: "Antipasti, principali, dolci — gli ospiti vanno dritti a ciò che vogliono." },
        { t: "Aggiungi all'ordine", d: "Componi l'ordine dal tavolo, pronto per il cameriere o la cucina." },
      ],
    },
    testimonials: {
      eyebrow: "Dalla cucina",
      title: "Ristoratori che lasciano parlare il cibo.",
      rating: "4,9/5 · oltre 1.200 cucine",
      quotes: [
        { q: "Abbiamo aggiunto i video ai nostri antipasti e hanno iniziato a volare via dalla cucina. Lo scontrino medio è cresciuto di quasi un quarto.", n: "James Carter", r: "Titolare · Lumen, New York" },
        { q: "Prima i clienti indicavano e tiravano a indovinare. Ora guardano, leggono nella loro lingua e ordinano esattamente ciò che vogliono.", n: "Olivia Bennett", r: "Manager · Saffron, San Francisco" },
        { q: "Cambiare il menu voleva dire una corsa in tipografia. Ora aggiorno i piatti del giorno dal telefono, in macchina.", n: "Daniel Cooper", r: "Chef · Ember, Chicago" },
      ],
    },
    gallery: {
      eyebrow: "Dal vivo",
      title: "Piatti che parlano da soli",
    },
    faq: {
      eyebrow: "Buono a sapersi",
      title: "Domande, con risposta.",
      stillCurious: "Ancora curioso?",
      talk: "Parla con il nostro team →",
      items: [
        { q: "Mi serve un videomaker o attrezzatura speciale?", a: "No. Mandaci una normale foto del piatto da qualsiasi telefono e creiamo noi un breve video in loop appetitoso. Se hai già delle clip, possiamo usare anche quelle." },
        { q: "Come vedono il menu gli ospiti?", a: "Inquadrano con la fotocamera il QR code sul tavolo e il menu video si apre subito nel browser — nessuna app da scaricare, su qualsiasi telefono moderno." },
        { q: "Posso aggiornare prezzi e piatti?", a: "Sì — basta mandarci la modifica. Un nuovo prezzo, un piatto esaurito, lo speciale della sera: ce lo dici e il tuo menu si aggiorna, di solito in giornata." },
        { q: "Funziona per i turisti che non parlano inglese?", a: "Ogni piatto può tradursi in automatico, cosí ogni ospite legge il menu nella propria lingua guardando lo stesso video irresistibile." },
      ],
    },
    cta: {
      ready: "Quando vuoi tu",
      headline: "Trasforma il tuo menu nel tuo miglior cameriere.",
      sub: "Prenota una demo di 20 minuti e guarda uno dei tuoi piatti prendere vita — prima di decidere.",
      badges: ["Prova gratuita di 14 giorni", "Nessuna carta richiesta", "Online in un pomeriggio"],
    },
    demo: {
      title: "Richiedi una demo",
      subtitle: "Lascia i tuoi dati e ti ricontatteremo entro un giorno lavorativo.",
      first: "Nome", last: "Cognome", email: "Email",
      restaurant: "Ristorante (facoltativo)",
      send: "Invia richiesta", cancel: "Annulla",
      firstPh: "Mario", lastPh: "Rossi", emailPh: "mario@ristorante.com", restaurantPh: "Il tuo ristorante",
      mailSubject: "Richiesta demo Foodish",
      thanks: "Grazie! Si aprirà la tua app di posta con la richiesta pronta da inviare.",
      thanksSent: "Grazie! La tua richiesta è stata inviata — ti contatteremo presto.",
      sending: "Invio in corso…",
      error: "Qualcosa è andato storto. Riprova o scrivici direttamente.",
    },
    footer: {
      tagline: "Menu che si muovono. Trasforma i tuoi piatti in video e lascia che siano gli occhi affamati a ordinare.",
      madeFor: "Fatto per i ristoranti.",
      cols: [
        { h: "Prodotto", l: ["Funzioni", "Menu video", "Ordini con QR", "Statistiche", "Prezzi"] },
        { h: "Azienda", l: ["Chi siamo", "Storie", "Lavora con noi", "Contatti"] },
        { h: "Risorse", l: ["Centro assistenza", "Guide", "Stato del servizio", "API"] },
      ],
      legal: ["Privacy", "Termini", "Cookie"],
    },
    phone: {
      dinnerMenu: "Menu cena",
      cats: { Starters: "Antipasti", Mains: "Principali", Desserts: "Dolci" },
      add: "Aggiungi", added: "Aggiunto",
      viewOrder: "Vedi ordine", item: "piatto", items: "piatti",
      tapToAdd: "Tocca + per aggiungere un piatto",
      yourOrder: "Il tuo ordine", each: "cad.", total: "Totale",
      sendOrder: "Invia l'ordine in cucina",
      nowPlaying: "In riproduzione", addedToOrder: "Aggiunto all'ordine",
      scroll: "Scorri per altri piatti",
    },
    dishes: {
      norma:    { name: "Risotto alla Norma", kcal: "Melanzane · ricotta salata · basilico", tag: "Scelta dello chef" },
      tartare:  { name: "Tartare di manzo", kcal: "Tagliata a coltello · capperi · tuorlo", tag: "Crudo" },
      burrata:  { name: "Carbonara", kcal: "Guanciale · pecorino · uovo · pepe nero", tag: "Classico" },
      branzino: { name: "Branzino intero", kcal: "Al sale · limone · erbe", tag: "Per due" },
      tiramisu: { name: "Tiramisù", kcal: "Mascarpone · espresso · cacao", tag: "Specialità" },
    },
    reel: { tag: "Antipasti", name: "Beef Tartare", kcal: "Tagliata a coltello · capperi · tuorlo", price: "€18", nextName: "Branzino intero", nextDesc: "Al sale · limone · erbe", nextVideo: "dish-d.mp4" },
  },
};

const LangContext = React.createContext("en");
function useLang() { return React.useContext(LangContext); }
function useI18n() { return I18N[React.useContext(LangContext)] || I18N.en; }

/* segmented EN | IT control */
function LangToggle({ lang, onChange, dark = false }) {
  const langs = ["en", "it"];
  return (
    <div style={{ display: "inline-flex", padding: 3, borderRadius: 100,
      background: dark ? "oklch(1 0 0 / .12)" : "var(--cream-2)",
      border: `1px solid ${dark ? "oklch(1 0 0 / .18)" : "var(--line)"}` }}>
      {langs.map((l) => (
        <button key={l} onClick={() => onChange(l)}
          style={{ all: "unset", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 11.5,
            fontWeight: 700, letterSpacing: ".04em", padding: "5px 11px", borderRadius: 100,
            transition: "background .2s, color .2s",
            background: lang === l ? "var(--accent)" : "transparent",
            color: lang === l ? "var(--accent-ink)" : (dark ? "oklch(0.9 0.01 80)" : "var(--ink-soft)") }}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/* resolve initial language: ?lang= → localStorage → browser → en */
function detectLang() {
  try {
    const url = new URLSearchParams(window.location.search).get("lang");
    if (url === "it" || url === "en") return url;
    const saved = localStorage.getItem("foodish_lang");
    if (saved === "it" || saved === "en") return saved;
    if ((navigator.language || "").toLowerCase().startsWith("it")) return "it";
  } catch (e) {}
  return "en";
}

Object.assign(window, { I18N, LangContext, useLang, useI18n, LangToggle, detectLang });
