/* ====== DATELE DE CONTACT: completează aici (un singur loc) ====== */
const CONTACT = {
  email: "",      // ex: "nume@domeniu.ro"
  facebook: "",   // URL complet
  instagram: "",  // URL complet
  linkedin: ""    // URL complet
};
/* ================================================================== */

const root = document.documentElement;
root.classList.add("js");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(pointer: fine)").matches;
document.getElementById("yr").textContent = new Date().getFullYear();
document.body.classList.add("loading");

/* ---------- contact links ---------- */
const mailBtn = document.getElementById("mail");
const mailto = s => "mailto:" + CONTACT.email + "?subject=" + encodeURIComponent(s || "Proiect nou");
if (CONTACT.email) {
  mailBtn.href = mailto("Solicitare ofertă");
  document.querySelectorAll("[data-subject]").forEach(a => (a.href = mailto(a.dataset.subject)));
}
const ICONS = {
  facebook: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z",
  instagram: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zM17.2 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1z",
  linkedin: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"
};
const socialUl = document.getElementById("social-links");
Object.keys(ICONS).forEach(k => {
  if (!CONTACT[k]) return;
  const li = document.createElement("li");
  li.innerHTML = '<a href="' + CONTACT[k] + '" target="_blank" rel="noopener" aria-label="' + k +
    '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + ICONS[k] + '"/></svg></a>';
  socialUl.appendChild(li);
});

/* ---------- text splitting ---------- */
let wi = 0;
function splitNode(node) {
  [...node.childNodes].forEach(n => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(p => {
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
        const w = document.createElement("span"); w.className = "w";
        const i = document.createElement("i"); i.textContent = p; i.style.setProperty("--i", wi++);
        w.appendChild(i); frag.appendChild(w);
      });
      n.replaceWith(frag);
    } else if (n.nodeType === 1 && n.tagName !== "BR") splitNode(n);
  });
}
document.querySelectorAll(".split").forEach(el => {
  el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
  wi = 0; splitNode(el);
  el.querySelectorAll(".w").forEach(w => w.setAttribute("aria-hidden", "true"));
});
document.querySelectorAll(".hero__name .lines").forEach(line => {
  const t = line.textContent; line.textContent = ""; let k = 0;
  [...t].forEach(c => { const s = document.createElement("span"); s.className = "ch"; s.textContent = c; s.style.setProperty("--i", k++); line.appendChild(s); });
});

/* ---------- intro curtain ---------- */
const curtain = document.getElementById("curtain");
let started = false;
function start() {
  if (started) return; started = true;
  curtain.classList.add("out");
  document.body.classList.remove("loading");
  setTimeout(() => root.classList.add("is-ready"), 350);
  setTimeout(() => (curtain.style.display = "none"), 1400);
}
if (reduce) { curtain.style.display = "none"; document.body.classList.remove("loading"); root.classList.add("is-ready"); started = true; }
else {
  addEventListener("load", () => setTimeout(start, 700));
  setTimeout(start, 3000); // never leave the visitor on the curtain
}

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); if (e.target.matches("[data-count]")) {} }
}), { threshold: .15, rootMargin: "0px 0px -6% 0px" });
document.querySelectorAll(".reveal,.split").forEach(el => io.observe(el));

/* ---------- counters ---------- */
const co = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; co.unobserve(e.target);
  const el = e.target, to = +el.dataset.count, from = to > 100 ? to - 14 : 0, t0 = performance.now(), d = 1400;
  if (reduce) { el.textContent = to; return; }
  (function tick(t) {
    const p = Math.min(1, (t - t0) / d), v = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
    el.textContent = v; if (p < 1) requestAnimationFrame(tick);
  })(t0);
}), { threshold: .6 });
document.querySelectorAll("[data-count]").forEach(el => co.observe(el));

/* ---------- scroll-driven work ---------- */
const bar = document.getElementById("progress");
const floats = [...document.querySelectorAll(".float")];
const shots = [...document.querySelectorAll(".shot")];
const qList = document.getElementById("questions");
const links = [...document.querySelectorAll(".nav__links a")];
const secs = links.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
let mx = 0, my = 0, ticking = false;

function frame() {
  ticking = false;
  const y = scrollY, vh = innerHeight;
  const max = document.documentElement.scrollHeight - vh;
  bar.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
  if (reduce) return;

  floats.forEach(el => {
    const d = parseFloat(el.dataset.depth), s = parseFloat(el.dataset.spin);
    const rot = Math.sin(y / 700) * 40 * (s > 0 ? 1 : -1) + y * s * .1;
    el.style.transform = "translate3d(" + (mx * 40 * d) + "px," + (-y * d * .6 + my * 30 * d) + "px," + (d * 120) + "px) rotateY(" + rot + "deg) rotateX(" + (rot * .4) + "deg) rotateZ(" + (rot * .25) + "deg)";
  });

  shots.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.bottom < -200 || r.top > vh + 200) return;
    const t = Math.max(-1, Math.min(1, ((r.top + r.height / 2) - vh / 2) / (vh / 2)));
    const col = el.offsetLeft > el.parentElement.clientWidth / 3 ? 1 : -1;
    el.style.setProperty("--rx", (t * 14) + "deg");
    el.style.setProperty("--ry", (col * Math.abs(t) * 7) + "deg");
    el.style.setProperty("--tz", (-Math.abs(t) * 50) + "px");
    el.style.setProperty("--py", (t * 18 * col) + "px");
    el.style.setProperty("--op", (1 - Math.abs(t) * .35).toFixed(2));
  });

  if (qList) {
    const r = qList.getBoundingClientRect();
    qList.style.setProperty("--draw", Math.max(0, Math.min(1, (vh * .75 - r.top) / (r.height + vh * .1))));
  }

  let cur = null;
  secs.forEach((s, i) => { const r = s.getBoundingClientRect(); if (r.top < vh * .4 && r.bottom > vh * .4) cur = i; });
  links.forEach((a, i) => a.classList.toggle("on", i === cur));
}
const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
addEventListener("scroll", req, { passive: true });
addEventListener("resize", req);

if (!reduce) {
  const names = document.querySelectorAll(".hero__name .lines");
  addEventListener("mousemove", e => {
    mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; req();
    names.forEach(sp => { sp.style.transform = "perspective(800px) rotateY(" + mx * 8 + "deg) rotateX(" + (-my * 6) + "deg)"; });
  }, { passive: true });

  /* tilt + glare */
  document.querySelectorAll(".tilt").forEach(el => {
    const card = el.classList.contains("card"), m = card ? 7 : 10;
    el.addEventListener("mousemove", e => {
      const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      el.style.transition = "transform .08s, opacity .8s";
      el.style.transform = "perspective(900px) rotateY(" + px * m * 2 + "deg) rotateX(" + (-py * m * 2) + "deg) translateZ(10px)";
      el.style.setProperty("--gx", (px + .5) * 100 + "%"); el.style.setProperty("--gy", (py + .5) * 100 + "%");
    });
    el.addEventListener("mouseleave", () => { el.style.transition = "transform .5s, opacity .8s"; el.style.transform = ""; });
  });

  /* magnetic buttons */
  if (fine) document.querySelectorAll(".magnetic").forEach(b => {
    b.addEventListener("mousemove", e => {
      const r = b.getBoundingClientRect();
      b.style.transform = "translate(" + (e.clientX - r.left - r.width / 2) * .25 + "px," + (e.clientY - r.top - r.height / 2) * .35 + "px)";
    });
    b.addEventListener("mouseleave", () => (b.style.transform = ""));
  });
}
frame();

/* ---------- custom cursor ---------- */
if (fine && !reduce) {
  root.classList.add("cur");
  const c = document.getElementById("cursor"); let cx = 0, cy = 0, tx = 0, ty = 0;
  addEventListener("mousemove", e => { tx = e.clientX; ty = e.clientY; c.classList.add("on"); });
  document.addEventListener("mouseleave", () => c.classList.remove("on"));
  (function loop() { cx += (tx - cx) * .2; cy += (ty - cy) * .2; c.style.transform = "translate(" + cx + "px," + cy + "px)"; requestAnimationFrame(loop); })();
  document.addEventListener("mouseover", e => c.classList.toggle("big", !!e.target.closest("a,button,.shot")));
}

/* ---------- lightbox ---------- */
const lb = document.getElementById("lb"), lbimg = document.getElementById("lbimg"), lbc = document.getElementById("lbcount");
let group = [], idx = 0, lastFocus = null;
function show(i, instant) {
  idx = (i + group.length) % group.length;
  const src = group[idx].querySelector("img").src;
  const set = () => { lbimg.src = src; lbimg.alt = group[idx].querySelector("img").alt; lbimg.classList.remove("swap"); };
  lbc.textContent = (idx + 1) + " / " + group.length;
  if (instant) set(); else { lbimg.classList.add("swap"); setTimeout(set, 200); }
}
function open(btn) {
  group = [...document.querySelectorAll('.shot[data-group="' + btn.dataset.group + '"]')];
  lastFocus = btn; lb.hidden = false; document.body.style.overflow = "hidden";
  show(group.indexOf(btn), true);
  requestAnimationFrame(() => lb.classList.add("open")); lb.querySelector(".lb__x").focus();
}
function close() {
  lb.classList.remove("open"); document.body.style.overflow = "";
  setTimeout(() => { lb.hidden = true; lbimg.removeAttribute("src"); }, 300); if (lastFocus) lastFocus.focus();
}
shots.forEach(b => b.addEventListener("click", () => open(b)));
lb.querySelector(".lb__x").addEventListener("click", close);
lb.querySelector(".lb__prev").addEventListener("click", () => show(idx - 1));
lb.querySelector(".lb__next").addEventListener("click", () => show(idx + 1));
lb.addEventListener("click", e => { if (e.target === lb) close(); });
addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") close(); if (e.key === "ArrowLeft") show(idx - 1); if (e.key === "ArrowRight") show(idx + 1);
});
let sx = 0;
lb.addEventListener("touchstart", e => (sx = e.touches[0].clientX), { passive: true });
lb.addEventListener("touchend", e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) show(idx + (d < 0 ? 1 : -1)); });
