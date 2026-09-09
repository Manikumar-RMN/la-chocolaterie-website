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
  whatsapp.className = "text-button whatsapp-button";
  whatsapp.href = `https://wa.me/${number}`;
  whatsapp.target = "_blank";
  whatsapp.rel = "noopener";
  whatsapp.textContent = "WhatsApp →";
  links.appendChild(whatsapp);
});

// Normalize any remaining emoji-style arrows to clean text arrows.
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
let node;
while ((node = walker.nextNode())) {
  if (node.nodeValue.includes("↗")) {
    node.nodeValue = node.nodeValue.replaceAll("↗", "→");
  }
}

// Remove decorative numbering from all relevant sections.
document.querySelectorAll(".story-number, .feature-meta > span, .store-index").forEach((el) => el.remove());

// Large image viewer: click/tap gallery, feature, store or opening photography.
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeButton = lightbox?.querySelector(".lightbox-close");
const zoomImages = document.querySelectorAll(".mini-gallery img, .feature-card img, .store-art img, .opening-image img");

if (lightbox && lightboxImage && zoomImages.length) {
  const openLightbox = (image) => {
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || "La Chocolaterie dessert";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImage.src = "";
  };

  zoomImages.forEach((image) => {
    image.setAttribute("tabindex", "0");
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `View larger image: ${image.alt}`);
    image.addEventListener("click", () => openLightbox(image));
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox || event.target === closeButton) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}

// La Chocolaterie site build refresh — 2026
