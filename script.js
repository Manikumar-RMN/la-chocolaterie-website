const nav = document.getElementById("nav");
const year = document.getElementById("year");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
}, { passive: true });

year.textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// WhatsApp contacts by La Chocolaterie branch
const whatsappNumbers = [
  "91884899202",   // T. Nagar
  "918111068899",  // Mylapore
  "919600773385"   // Tondiarpet
];

document.querySelectorAll(".store").forEach((store, index) => {
  const links = store.querySelector(".store-links");
  const number = whatsappNumbers[index];
  if (!links || !number) return;

  const whatsapp = document.createElement("a");
  whatsapp.className = "text-button";
  whatsapp.href = `https://wa.me/${number}`;
  whatsapp.target = "_blank";
  whatsapp.rel = "noopener";
  whatsapp.textContent = "WhatsApp →";
  links.appendChild(whatsapp);
});

// Use clean text arrows instead of emoji-style diagonal arrows on iPhone.
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
let node;
while ((node = walker.nextNode())) {
  if (node.nodeValue.includes("↗")) {
    node.nodeValue = node.nodeValue.replaceAll("↗", "→");
  }
}

// Remove decorative 01 / 02 / 03 numbering from feature cards and store rows.
document.querySelectorAll(".feature-meta > span, .store-index").forEach((el) => el.remove());

// La Chocolaterie site build refresh — 2026
