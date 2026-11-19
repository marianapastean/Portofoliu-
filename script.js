/* ====== DATELE DE CONTACT: completează aici (un singur loc) ====== */
const CONTACT = {
  email: "",      // ex: "nume@domeniu.ro"
  facebook: "",   // URL complet
  instagram: "",  // URL complet
  linkedin: ""    // URL complet
};
/* ================================================================== */

document.documentElement.classList.add("js");
document.getElementById("yr").textContent = new Date().getFullYear();
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* contact links */
const mailBtn = document.getElementById("mail");
function mailto(subject) {
  return "mailto:" + CONTACT.email + "?subject=" + encodeURIComponent(subject || "Proiect nou");
}
if (CONTACT.email) {
  mailBtn.href = mailto("Solicitare ofertă");
  document.querySelectorAll("[data-subject]").forEach(a => {
    a.href = mailto(a.dataset.subject);
  });
}
const ICONS = {
  facebook: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z",
  instagram: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zM17.2 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1z",
  linkedin: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"
};
const social = document.getElementById("social");
Object.keys(ICONS).forEach(k => {
  if (!CONTACT[k]) return;
  const li = document.createElement("li");
  li.innerHTML = '<a href="' + CONTACT[k] + '" target="_blank" rel="noopener" aria-label="' + k +
    '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + ICONS[k] + '"/></svg></a>';
  social.appendChild(li);
});

/* reveal on scroll */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

if (!reduce) {
  /* floating layers: depth parallax + slow 3D spin driven by scroll */
  const floats = [...document.querySelectorAll(".float")];
  let mx = 0, my = 0, ticking = false;
  function frame() {
    ticking = false;
    const y = scrollY;
    floats.forEach((el, i) => {
      const d = parseFloat(el.dataset.depth), s = parseFloat(el.dataset.spin);
      const ty = -y * d;
      const rot = y * s;
      el.style.transform =
        "translate3d(" + (mx * 40 * d) + "px," + (ty + my * 30 * d) + "px," + (d * 120) + "px) " +
        "rotateY(" + rot + "deg) rotateX(" + (rot * .4) + "deg) rotateZ(" + (rot * .25) + "deg)";
    });
  }
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener("scroll", req, { passive: true });
  addEventListener("mousemove", e => {
    mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5;
    req();
    const hero = document.querySelector(".hero__name");
    hero.querySelectorAll("span").forEach(sp => {
      sp.style.setProperty("--ry", (mx * 10) + "deg");
      sp.style.setProperty("--rx", (-my * 8) + "deg");
    });
  }, { passive: true });
  frame();

  /* tilt on photo and cards */
  document.querySelectorAll(".tilt").forEach(el => {
    const max = el.classList.contains("card") ? 8 : 10;
    el.addEventListener("mousemove", e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      el.style.transition = "transform .08s";
      el.style.transform = "perspective(900px) rotateY(" + px * max * 2 + "deg) rotateX(" + (-py * max * 2) + "deg) translateZ(10px)";
    });
    el.addEventListener("mouseleave", () => {
      el.style.transition = "transform .5s";
      el.style.transform = "";
    });
  });
}
