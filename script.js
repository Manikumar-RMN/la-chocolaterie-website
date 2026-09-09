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

// Tap/click any gallery image to open a large, mobile-friendly lightbox.
const galleryImages = document.querySelectorAll(".mini-gallery img");
if (galleryImages.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Close image">×</button>
    <img class="lightbox-image" alt="">
    <div class="lightbox-hint">Tap outside to close</div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  };

  galleryImages.forEach((image) => {
    image.setAttribute("tabindex", "0");
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `View larger image: ${image.alt}`);
    const openLightbox = () => {
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
    };
    image.addEventListener("click", openLightbox);
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox();
      }
    });
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox || event.target.classList.contains("lightbox-close")) {
      closeLightbox();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}

// La Chocolaterie site build refresh — 2026
