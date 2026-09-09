/* =========================================================
AREA BOYZ ENTERPRISE
Enterprise Commerce Core
Version 2.0
========================================================= */

"use strict";

/* =========================================================
CONFIGURATION
========================================================= */

const CART_KEY = "areaboyz_cart";

const PRODUCTS = [
{
id: "p1",
name: "Emerald Brocade Vest Ensemble",
category: "Formal",
price: 890,
img: "images/formal-green-vest.jpg"
},
{
id: "p2",
name: "Black Mandarin Collar Suit",
category: "Formal",
price: 1250,
img: "images/black-mandarin-suit.jpg"
},
{
id: "p3",
name: "Nike Air Force 1 Blue Patent",
category: "Footwear",
price: 220,
img: "images/nike-blue-af1-1.jpg"
},
{
id: "p4",
name: "Chanel Beige Anorak",
category: "Outerwear",
price: 3200,
img: "images/chanel-beige-jacket.jpg"
},
{
id: "p5",
name: "Polka Dot & Pink Pleated Set",
category: "Contemporary",
price: 480,
img: "images/polka-pink-outfit.jpg"
},
{
id: "p6",
name: "Dior Gray Leather Vest",
category: "Luxury",
price: 2750,
img: "images/dior-gray-vest.jpg"
},
{
id: "p7",
name: "Lace-Trim Wide-Leg Jeans",
category: "Denim",
price: 340,
img: "images/lace-jeans-full.jpg"
},
{
id: "p8",
name: "Marvel Varsity Collection",
category: "Streetwear",
price: 420,
img: "images/marvel-varsity-jackets.jpg"
},
{
id: "p9",
name: "Spider-Man Comic Tee",
category: "Streetwear",
price: 85,
img: "images/spiderman-tshirt.jpg"
},
{
id: "p10",
name: "Red Spider Hoodie",
category: "Streetwear",
price: 195,
img: "images/spiderman-hoodie.jpg"
},
{
id: "p11",
name: "Zipper Utility Cap",
category: "Accessories",
price: 65,
img: "images/zipper-cap.jpg"
},
{
id: "p12",
name: "Black Gold Branch Suit",
category: "Couture",
price: 1850,
img: "images/black-gold-suit.jpg"
},
{
id: "p13",
name: "Ivory Bamboo Suit",
category: "Couture",
price: 1680,
img: "images/white-bamboo-suit.jpg"
},
{
id: "p14",
name: "Gold Mirror Vest Look",
category: "Avant-Garde",
price: 980,
img: "images/gold-vest-outfit.jpg"
},
{
id: "p15",
name: "Cyber Geometric Coat",
category: "Avant-Garde",
price: 1450,
img: "images/blue-patterned-coat.jpg"
},
{
id: "p16",
name: "Charcoal Pleated Trousers",
category: "Bottoms",
price: 290,
img: "images/gray-pleated-pants.jpg"
}
];

/* =========================================================
SAFE HELPERS
========================================================= */

function escapeHTML(value) {
return String(value ?? "")
.replace(/&/g, "&")
.replace(/</g, "<")
.replace(/>/g, ">")
.replace(/"/g, """)
.replace(/'/g, "'");
}

function getElement(id) {
return document.getElementById(id);
}

/* =========================================================
CART SYSTEM
========================================================= */

function getCart() {
try {
const stored = localStorage.getItem(CART_KEY);

if (!stored) {
  return [];
}

const cart = JSON.parse(stored);

if (!Array.isArray(cart)) {
  return [];
}

return cart.filter(function(item) {
  return (
    item &&
    typeof item.id === "string" &&
    Number.isFinite(Number(item.price)) &&
    Number(item.qty) > 0
  );
});

} catch (error) {
console.warn("Unable to read cart:", error);
return [];
}
}

function saveCart(cart) {
try {
localStorage.setItem(CART_KEY, JSON.stringify(cart));
} catch (error) {
console.error("Unable to save cart:", error);
showToast("Unable to save cart on this device.");
}

updateCartUI();
}

function addToCart(product) {
if (!product || !product.id) {
return;
}

const cart = getCart();

const existing = cart.find(function(item) {
return item.id === product.id;
});

if (existing) {
existing.qty += 1;
} else {
cart.push({
id: product.id,
name: product.name,
category: product.category,
price: Number(product.price),
img: product.img,
qty: 1
});
}

saveCart(cart);

showToast(product.name + " added to cart");

renderCartPage();
}

function removeFromCart(id) {
const cart = getCart().filter(function(item) {
return item.id !== id;
});

saveCart(cart);
renderCartPage();

showToast("Item removed from cart");
}

function updateQty(id, delta) {
const cart = getCart();

const item = cart.find(function(product) {
return product.id === id;
});

if (!item) {
return;
}

item.qty += Number(delta);

if (item.qty <= 0) {
removeFromCart(id);
return;
}

saveCart(cart);
renderCartPage();
}

function getCartQuantity() {
return getCart().reduce(function(total, item) {
return total + Number(item.qty || 0);
}, 0);
}

function getCartTotal() {
return getCart().reduce(function(total, item) {
return total + Number(item.price || 0) * Number(item.qty || 0);
}, 0);
}

function updateCartUI() {
const quantity = getCartQuantity();

document.querySelectorAll(".cart-count").forEach(function(element) {
element.textContent = quantity;
element.style.display = quantity > 0 ? "grid" : "none";
element.setAttribute("aria-label", quantity + " items in cart");
});
}

/* =========================================================
CURRENCY DISPLAY
========================================================= */

/*
currency.js handles:

- selected currency
- conversion
- formatting
- localStorage persistence

This function safely uses it when available.
*/

function formatMoney(amountUSD) {
if (typeof formatCurrency === "function") {
return formatCurrency(Number(amountUSD) || 0);
}

return "$" + Number(amountUSD || 0).toLocaleString("en-US", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}

function getCurrentCurrency() {
if (typeof getSelectedCurrency === "function") {
return getSelectedCurrency();
}

return "USD";
}

function refreshCommerceCurrency() {
updateCartUI();
renderCartPage();

const checkoutTotal = getElement("checkout-total");

if (checkoutTotal) {
checkoutTotal.textContent = formatMoney(getCartTotal());
}

updateCurrencyPrices();
}

function updateCurrencyPrices() {
document.querySelectorAll("[data-price-usd]").forEach(function(element) {
const amount = Number(element.dataset.priceUsd);

if (!Number.isNaN(amount)) {
  element.textContent = formatMoney(amount);
}

});
}

window.addEventListener("currencyChanged", function() {
refreshCommerceCurrency();
});

/* =========================================================
TOAST SYSTEM
========================================================= */

function showToast(message) {
let toast = document.querySelector(".toast");

if (!toast) {
toast = document.createElement("div");
toast.className = "toast";
document.body.appendChild(toast);
}

toast.textContent = message;

toast.classList.remove("show");

void toast.offsetWidth;

toast.classList.add("show");

clearTimeout(window.areaBoyzToastTimer);

window.areaBoyzToastTimer = setTimeout(function() {
toast.classList.remove("show");
}, 2800);
}

/* =========================================================
HERO SLIDER
========================================================= */

function initSlider() {
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

if (!slides.length) {
return;
}

let current = 0;
let timer = null;

function goTo(index) {
slides[current].classList.remove("active");

if (dots[current]) {
  dots[current].classList.remove("active");
}

current = (index + slides.length) % slides.length;

slides[current].classList.add("active");

if (dots[current]) {
  dots[current].classList.add("active");
}

}

function next() {
goTo(current + 1);
}

function previous() {
goTo(current - 1);
}

function resetTimer() {
clearInterval(timer);
timer = setInterval(next, 5500);
}

const nextButton = document.querySelector(".hero-nav.next");
const previousButton = document.querySelector(".hero-nav.prev");

if (nextButton) {
nextButton.addEventListener("click", function() {
next();
resetTimer();
});
}

if (previousButton) {
previousButton.addEventListener("click", function() {
previous();
resetTimer();
});
}

dots.forEach(function(dot, index) {
dot.addEventListener("click", function() {
goTo(index);
resetTimer();
});
});

resetTimer();
}

/* =========================================================
MOBILE NAVIGATION
========================================================= */

function initMobileNav() {
const toggle = document.querySelector(".mobile-toggle");
const links = document.querySelector(".nav-links");

if (!toggle || !links) {
return;
}

function closeMenu() {
links.classList.remove("open");
toggle.setAttribute("aria-expanded", "false");
}

toggle.setAttribute("aria-expanded", "false");

toggle.addEventListener("click", function() {
const open = links.classList.toggle("open");

toggle.setAttribute(
  "aria-expanded",
  open ? "true" : "false"
);

});

links.querySelectorAll("a").forEach(function(link) {
link.addEventListener("click", closeMenu);
});

document.addEventListener("click", function(event) {
if (
links.classList.contains("open") &&
!links.contains(event.target) &&
!toggle.contains(event.target)
) {
closeMenu();
}
});

window.addEventListener("scroll", function() {
if (links.classList.contains("open")) {
closeMenu();
}
});
}

/* =========================================================
PRODUCT UTILITIES
========================================================= */

function findProduct(id) {
return PRODUCTS.find(function(product) {
return product.id === id;
});
}

function getProductCategory(product) {
return String(product.category || "").toLowerCase();
}

/* =========================================================
PRODUCT CARD
========================================================= */

function createProductCard(product) {
const luxuryBadge =
Number(product.price) > 1000
? '<span class="product-badge">Luxury</span>'
: "";

return `
<article class="product-card" data-product-id="${escapeHTML(product.id)}">

  <div class="product-img">

    <img
      src="${escapeHTML(product.img)}"
      alt="${escapeHTML(product.name)}"
      loading="lazy"
      onerror="this.style.opacity='0.2';"
    >

    ${luxuryBadge}

  </div>

  <div class="product-info">

    <div class="product-category">
      ${escapeHTML(product.category)}
    </div>

    <h3 class="product-name">
      ${escapeHTML(product.name)}
    </h3>

    <div class="product-price">

      <span
        class="price"
        data-price-usd="${Number(product.price)}"
      >
        ${formatMoney(product.price)}
      </span>

      <button
        type="button"
        class="add-to-cart"
        data-id="${escapeHTML(product.id)}"
        aria-label="Add ${escapeHTML(product.name)} to cart"
      >
        ＋
      </button>

    </div>

  </div>

</article>

`;
}

/* =========================================================
PRODUCT EVENT BINDING
========================================================= */

function bindProductButtons(container) {
if (!container) {
return;
}

container.querySelectorAll(".add-to-cart").forEach(function(button) {
button.addEventListener("click", function(event) {
event.preventDefault();

  const product = findProduct(
    button.getAttribute("data-id")
  );

  if (!product) {
    showToast("Product unavailable.");
    return;
  }

  addToCart(product);

  button.classList.add("added");

  setTimeout(function() {
    button.classList.remove("added");
  }, 450);
});

});
}

/* =========================================================
BASIC PRODUCT RENDERER
========================================================= */

function renderProducts(containerId, limit) {
const container = getElement(containerId);

if (!container) {
return;
}

let products = PRODUCTS.slice();

if (limit) {
products = products.slice(0, limit);
}

if (!products.length) {
container.innerHTML = "";
return;
}

container.innerHTML = products
.map(createProductCard)
.join("");

bindProductButtons(container);

updateCurrencyPrices();
}

/* =========================================================
ADVANCED SHOP ENGINE
========================================================= */

function initShop() {
const container = getElement("shop-products");

if (!container) {
return;
}

const searchInput = getElement("product-search");
const sortSelect = getElement("product-sort");
const resultCount = getElement("shop-results-count");
const emptyState = getElement("shop-empty");
const clearButton = getElement("clear-shop-filters");

const filterButtons = document.querySelectorAll(".shop-filter");

let activeCategory = "all";
let searchTerm = "";
let sortMode = "featured";

function getFilteredProducts() {
let products = PRODUCTS.slice();

if (activeCategory !== "all") {
  products = products.filter(function(product) {
    return getProductCategory(product) === activeCategory;
  });
}

if (searchTerm) {
  const search = searchTerm.toLowerCase();

  products = products.filter(function(product) {
    return (
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    );
  });
}

switch (sortMode) {
  case "price-low":
    products.sort(function(a, b) {
      return a.price - b.price;
    });
    break;

  case "price-high":
    products.sort(function(a, b) {
      return b.price - a.price;
    });
    break;

  case "name":
    products.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
    break;

  default:
    break;
}

return products;

}

function renderShop() {
const products = getFilteredProducts();

if (resultCount) {
  resultCount.textContent =
    products.length +
    (products.length === 1 ? " product" : " products");
}

if (!products.length) {
  container.innerHTML = "";

  if (emptyState) {
    emptyState.hidden = false;
  }

  return;
}

if (emptyState) {
  emptyState.hidden = true;
}

container.innerHTML = products
  .map(createProductCard)
  .join("");

bindProductButtons(container);

updateCurrencyPrices();

}

filterButtons.forEach(function(button) {
button.addEventListener("click", function() {
filterButtons.forEach(function(item) {
item.classList.remove("active");
});

  button.classList.add("active");

  activeCategory =
    String(button.dataset.category || "all").toLowerCase();

  renderShop();
});

});

if (searchInput) {
searchInput.addEventListener("input", function() {
searchTerm = searchInput.value.trim();
renderShop();
});
}

if (sortSelect) {
sortSelect.addEventListener("change", function() {
sortMode = sortSelect.value;
renderShop();
});
}

if (clearButton) {
clearButton.addEventListener("click", function() {
activeCategory = "all";
searchTerm = "";
sortMode = "featured";

  if (searchInput) {
    searchInput.value = "";
  }

  if (sortSelect) {
    sortSelect.value = "featured";
  }

  filterButtons.forEach(function(button) {
    button.classList.toggle(
      "active",
      String(button.dataset.category).toLowerCase() === "all"
    );
  });

  renderShop();
});

}

renderShop();
}

/* =========================================================
CART PAGE
========================================================= */

function renderCartPage() {
const tbody = getElement("cart-items");
const summary = getElement("cart-summary");

if (!tbody) {
return;
}

const cart = getCart();

if (!cart.length) {
tbody.innerHTML = "<tr> <td colspan="5" style="text-align:center;padding:3rem;color:#a0a0b0;" > Your cart is empty. <a href="shop.html" style="color:#00f0ff;" > Browse the collection </a> </td> </tr>";

if (summary) {
  summary.innerHTML = "";
}

return;

}

tbody.innerHTML = cart.map(function(item) {
const lineTotal =
Number(item.price) * Number(item.qty);

return `
  <tr>

    <td>
      <img
        src="${escapeHTML(item.img)}"
        alt="${escapeHTML(item.name)}"
        class="cart-item-img"
        loading="lazy"
      >
    </td>

    <td>
      <strong>${escapeHTML(item.name)}</strong>
      <br>
      <small style="color:#a0a0b0;">
        ${escapeHTML(item.category)}
      </small>
    </td>

    <td>
      <span data-price-usd="${Number(item.price)}">
        ${formatMoney(item.price)}
      </span>
    </td>

    <td>
      <div class="qty-control">

        <button
          type="button"
          data-id="${escapeHTML(item.id)}"
          data-delta="-1"
          aria-label="Decrease quantity"
        >
          −
        </button>

        <span>${Number(item.qty)}</span>

        <button
          type="button"
          data-id="${escapeHTML(item.id)}"
          data-delta="1"
          aria-label="Increase quantity"
        >
          +
        </button>

      </div>
    </td>

    <td>
      <span data-price-usd="${lineTotal}">
        ${formatMoney(lineTotal)}
      </span>
    </td>

  </tr>
`;

}).join("");

tbody.querySelectorAll(".qty-control button").forEach(function(button) {
button.addEventListener("click", function() {
const id = button.getAttribute("data-id");
const delta = Number(button.getAttribute("data-delta"));

  updateQty(id, delta);
});

});

const total = getCartTotal();

if (summary) {
summary.innerHTML = `
<h3 style="margin-bottom:1.25rem">
Order Summary
</h3>

  <div
    style="
      display:flex;
      justify-content:space-between;
      margin-bottom:0.75rem;
    "
  >
    <span style="color:#a0a0b0">
      Subtotal
    </span>

    <span data-price-usd="${total}">
      ${formatMoney(total)}
    </span>
  </div>

  <div
    style="
      display:flex;
      justify-content:space-between;
      margin-bottom:0.75rem;
    "
  >
    <span style="color:#a0a0b0">
      Shipping
    </span>

    <span>
      Calculated at checkout
    </span>
  </div>

  <div
    style="
      display:flex;
      justify-content:space-between;
      font-size:1.25rem;
      font-weight:700;
      margin:1.25rem 0;
      padding-top:1rem;
      border-top:1px solid rgba(255,255,255,0.08);
    "
  >
    <span>Total</span>

    <span
      style="color:#00f0ff"
      data-price-usd="${total}"
    >
      ${formatMoney(total)}
    </span>
  </div>

  <a
    href="checkout.html"
    class="btn btn-primary"
    style="width:100%;margin-top:0.5rem"
  >
    Proceed to Checkout
  </a>
`;

}

updateCurrencyPrices();
}

/* =========================================================
SHARES CALCULATOR
========================================================= */

function initSharesCalc() {
const input = getElement("share-amount");
const result = getElement("calc-result");

if (!input || !result) {
return;
}

const TOTAL_EQUITY_POOL = 756000;

function calculate() {
const amount = Number.parseFloat(input.value) || 0;

if (amount < 100) {
  result.innerHTML = `
    <p style="color:#a0a0b0">
      Minimum investment: ${formatMoney(100)}
    </p>
  `;
  return;
}

let rate = 0.09;

if (amount >= 50000) {
  rate = 0.18;
} else if (amount >= 20000) {
  rate = 0.15;
} else if (amount >= 5000) {
  rate = 0.12;
}

const annualReturn = amount * rate;

const ownership =
  ((amount / TOTAL_EQUITY_POOL) * 100)
    .toFixed(4);

result.innerHTML = `
  <div
    class="value"
    data-price-usd="${annualReturn}"
  >
    ${formatMoney(annualReturn)}
  </div>

  <p
    style="
      margin:0.5rem 0;
      color:#a0a0b0;
    "
  >
    Projected annual return
    (${rate * 100}%)
  </p>

  <p
    style="
      font-size:0.9rem;
      color:#a0a0b0;
    "
  >
    Ownership:
    ${ownership}%
    of company equity pool
  </p>
`;

updateCurrencyPrices();

}

input.addEventListener("input", calculate);

window.addEventListener("currencyChanged", calculate);

calculate();
}

/* =========================================================
CHECKOUT DISPLAY
========================================================= */

function updateCheckoutTotal() {
const totalElement = getElement("checkout-total");

if (!totalElement) {
return;
}

totalElement.textContent =
formatMoney(getCartTotal());
}

/* =========================================================
CHECKOUT
========================================================= */

function initCheckout() {
const form = getElement("checkout-form");

if (!form) {
return;
}

updateCheckoutTotal();

window.addEventListener(
"currencyChanged",
updateCheckoutTotal
);

form.addEventListener("submit", function(event) {
event.preventDefault();

const cart = getCart();

if (!cart.length) {
  showToast("Your cart is empty.");
  return;
}

/*
  IMPORTANT:
  This is intentionally only the current frontend
  confirmation behavior.

  Production payment processing must:
  1. Send cart/product IDs to the backend.
  2. Recalculate prices server-side.
  3. Validate inventory.
  4. Create the payment session server-side.
  5. Verify payment through the payment provider.
  6. Create the order only after verified payment.
*/

showToast(
  "Checkout submitted. Payment gateway integration required."
);

});
}

/* =========================================================
NAV ACTIVE STATE
========================================================= */

function initActiveNavigation() {
const currentPath =
window.location.pathname.split("/").pop() ||
"index.html";

document.querySelectorAll(".nav-links a").forEach(function(link) {
const href = link.getAttribute("href");

if (!href) {
  return;
}

const targetPath = href.split("/").pop();

if (targetPath === currentPath) {
  link.classList.add("active");
}

});
}

/* =========================================================
CURRENCY SELECTOR FALLBACK
========================================================= */

function initCurrencySelector() {
const selectors =
document.querySelectorAll("[data-currency-selector]");

if (!selectors.length) {
return;
}

const current =
getCurrentCurrency();

selectors.forEach(function(selector) {
selector.value = current;

selector.addEventListener("change", function() {
  if (typeof setSelectedCurrency === "function") {
    setSelectedCurrency(selector.value);
  }
});

});
}

/* =========================================================
GLOBAL PRODUCT QUICK ACCESS
========================================================= */

window.AreaBoyzStore = {
products: PRODUCTS,
getCart: getCart,
addToCart: addToCart,
removeFromCart: removeFromCart,
updateQty: updateQty,
getCartTotal: getCartTotal,
getCartQuantity: getCartQuantity,
findProduct: findProduct
};

/* =========================================================
APPLICATION STARTUP
========================================================= */

document.addEventListener("DOMContentLoaded", function() {

updateCartUI();

initMobileNav();

initSlider();

initSharesCalc();

initCheckout();

initCurrencySelector();

initActiveNavigation();

/*
Homepage featured products
*/
renderProducts(
"featured-products",
8
);

/*
Full shop page
*/
initShop();

/*
Cart page
*/
renderCartPage();

/*
Any existing price elements
*/
updateCurrencyPrices();

console.log(
"Area Boyz Enterprise Commerce Core initialized."
);
});
