// ===== Current year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Scroll state + progress =====
const progress = document.getElementById("scrollProgress");
function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + "%";
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ===== Mobile menu =====
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.classList.toggle("open", open);
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.classList.remove("open");
  })
);

// ===== Reveal on scroll =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===== Typed command loop in hero =====
const commands = [
  "kubectl get pods -n onesoc --field-selector=status.phase=Running",
  "systemctl status backend.service   # active (running) ✓",
  "curl -s /api/experience | jq '.[].role'",
  "grep -R 'reliability' ./services --count",
  "docker build -t likhitha/portfolio:latest .",
];
const el = document.getElementById("typedCmd");
let ci = 0, chi = 0, deleting = false;

function typeCmd() {
  const cur = commands[ci];
  chi += deleting ? -1 : 1;
  el.textContent = cur.slice(0, chi);
  let delay = deleting ? 30 : 55;
  if (!deleting && chi === cur.length) { delay = 1900; deleting = true; }
  else if (deleting && chi === 0) { deleting = false; ci = (ci + 1) % commands.length; delay = 300; }
  setTimeout(typeCmd, delay);
}
typeCmd();
