// Google Analytics with consent. Loads GA only after the visitor accepts.
(function () {
  var GA_ID = ""; // e.g. "G-XXXXXXXXXX"
  if (!GA_ID) return;
  var KEY = "hp-analytics";
  var lang = (document.documentElement.lang || "no").slice(0, 2);
  var T = {
    no: { text: "Vi bruker Google Analytics for å se hvor mange som besøker siden. Ingenting lagres før du godtar.", yes: "Godta", no: "Avslå" },
    en: { text: "We use Google Analytics to see how many people visit the site. Nothing is stored until you accept.", yes: "Accept", no: "Decline" },
    da: { text: "Vi bruger Google Analytics til at se, hvor mange der besøger siden. Intet gemmes, før du accepterer.", yes: "Accepter", no: "Afvis" }
  }[lang] || null;

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function load() {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });
  }

  function banner() {
    var st = document.createElement("style");
    st.textContent = ".hp-cc{position:fixed;z-index:60;left:max(16px,env(safe-area-inset-left,0px));right:max(16px,env(safe-area-inset-right,0px));bottom:calc(env(safe-area-inset-bottom,0px) + 16px);max-width:560px;margin:0 auto;background:#201c16;color:#ece5d8;border:1px solid #3a3328;border-radius:10px;padding:16px 18px;display:flex;gap:14px;align-items:center;flex-wrap:wrap;font:15px/1.45 Karla,system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.4)}.hp-cc p{margin:0;flex:1 1 260px}.hp-cc div{display:flex;gap:8px}.hp-cc button{font:inherit;font-weight:700;border-radius:999px;padding:9px 16px;cursor:pointer;border:1px solid #d2a65a}.hp-cc .y{background:#d2a65a;color:#1b150c}.hp-cc .n{background:none;color:#ece5d8}";
    document.head.appendChild(st);
    var b = document.createElement("div");
    b.className = "hp-cc"; b.setAttribute("role", "dialog"); b.setAttribute("aria-live", "polite");
    var p = document.createElement("p"); p.textContent = T.text;
    var w = document.createElement("div");
    var n = document.createElement("button"); n.className = "n"; n.type = "button"; n.textContent = T.no;
    var y = document.createElement("button"); y.className = "y"; y.type = "button"; y.textContent = T.yes;
    w.append(n, y); b.append(p, w); document.body.appendChild(b);
    y.onclick = function () { set("yes"); b.remove(); load(); };
    n.onclick = function () { set("no"); b.remove(); };
  }

  var c = get();
  if (c === "yes") load();
  else if (c !== "no" && T) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", banner); else banner();
  }
})();
