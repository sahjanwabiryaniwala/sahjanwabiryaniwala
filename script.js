/* Central configuration: update these values before publishing. */
const WHATSAPP_NUMBER = "8081531642"; // International format: digits only, no +, spaces, or hyphens.
const SHOP_NAME = "Sahjanwa Biriyani Wala";
const SHOP_ADDRESS = "Near HDFC Bank Sahjanwa Main Road, Sahjanwa, Gorakhpur";
const GOOGLE_MAPS_DIRECTIONS_URL = "https://maps.app.goo.gl/ZkMgerM3EbvKhETSA";

/* Keep ordering messages in one place so every button stays consistent. */
const ORDER_MESSAGES = {
  general: "Hello Sahjanwa Biriyani Wala! I would like to place an order. Please share the available options and ordering details.",
  biryani: "Hello Sahjanwa Biriyani Wala! I would like to order Chicken Biryani. Please confirm the price and ordering details.",
  fry: "Hello Sahjanwa Biriyani Wala! I would like to order Chicken fry. Please confirm the price and ordering details."
};

function openWhatsApp(orderType = "general") {
  const message = ORDER_MESSAGES[orderType] || ORDER_MESSAGES.general;
  const phone = WHATSAPP_NUMBER.replace(/\D/g, "");
  if (!phone || phone.length < 10) {
    alert("Please configure a valid WhatsApp number in script.js before publishing.");
    return;
  }
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/* WhatsApp ordering buttons share the same handler and configured number. */
document.querySelectorAll("[data-order]").forEach((button) => {
  button.addEventListener("click", () => openWhatsApp(button.dataset.order));
});

/* Responsive mobile navigation. */
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

function closeMobileMenu() {
  if (!menuToggle || !primaryNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  primaryNav.classList.remove("is-open");
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    primaryNav.classList.toggle("is-open", !isOpen);
  });

  primaryNav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 761px)").matches) closeMobileMenu();
  });
}

/* Keep the year current without manual edits. */
const yearNode = document.querySelector("#copyright-year");
if (yearNode) yearNode.textContent = new Date().getFullYear();

/* The address and map link are configurable in this file. */
const directionsLink = document.querySelector("#directions-link");
if (directionsLink) directionsLink.href = GOOGLE_MAPS_DIRECTIONS_URL;

const mapEmbed = document.querySelector("#map-embed");
if (mapEmbed) {
  const query = encodeURIComponent(`${SHOP_NAME}, ${SHOP_ADDRESS}`);
  mapEmbed.src = `https://maps.google.com/maps?q=${query}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
}
