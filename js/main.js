/* =========================================================
AREA BOYZ ENTERPRISE
CORE WEBSITE + COMMERCE ENGINE
========================================================= */

"use strict";

const CART_KEY = "areaboyz_cart";

/* =========================================================
PRODUCT DATABASE
Prices are stored internally in USD.
Currency conversion is display-only on the frontend.
========================================================= */

const PRODUCTS = [
{ id:"p1", name:"Emerald Brocade Vest Ensemble", category:"Formal", price:890, img:"images/formal-green-vest.jpg" },
{ id:"p2", name:"Black Mandarin Collar Suit", category:"Formal", price:1250, img:"images/black-mandarin-suit.jpg" },
{ id:"p3", name:"Nike Air Force 1 Blue Patent", category:"Footwear", price:220, img:"images/nike-blue-af1-1.jpg" },
{ id:"p4", name:"Chanel Beige Anorak", category:"Outerwear", price:3200, img:"images/chanel-beige-jacket.jpg" },
{ id:"p5", name:"Polka Dot & Pink Pleated Set", category:"Contemporary", price:480, img:"images/polka-pink-outfit.jpg" },
{ id:"p6", name:"Dior Gray Leather Vest", category:"Luxury", price:2750, img:"images/dior-gray-vest.jpg" },
{ id:"p7", name:"Lace-Trim Wide-Leg Jeans", category:"Denim", price:340, img:"images/lace-jeans-full.jpg" },
{ id:"p8", name:"Marvel Varsity Collection", category:"Streetwear", price:420, img:"images/marvel-varsity-jackets.jpg" },
{ id:"p9", name:"Spider-Man Comic Tee", category:"Streetwear", price:85, img:"images/spiderman-tshirt.jpg" },
{ id:"p10", name:"Red Spider Hoodie", category:"Streetwear", price:195, img:"images/spiderman-hoodie.jpg" },
{ id:"p11", name:"Zipper Utility Cap", category:"Accessories", price:65, img:"images/zipper-cap.jpg" },
{ id:"p12", name:"Black Gold Branch Suit", category:"Couture", price:1850, img:"images/black-gold-suit.jpg" },
{ id:"p13", name:"Ivory Bamboo Suit", category:"Couture", price:1680, img:"images/white-bamboo-suit.jpg" },
{ id:"p14", name:"Gold Mirror Vest Look", category:"Avant-Garde", price:980, img:"images/gold-vest-outfit.jpg" },
{ id:"p15", name:"Cyber Geometric Coat", category:"Avant-Garde", price:1450, img:"images/blue-patterned-coat.jpg" },
{ id:"p16", name:"Charcoal Pleated Trousers", category:"Bottoms", price:290, img:"images/gray-pleated-pants.jpg" }
];

/* =========================================================
SECURITY / HTML HELPER
========================================================= */

function escapeHTML(value) {
return String(value ?? "")
.replace(/&/g, "&")
.replace(/</g, "<")
.replace(/>/g, ">")
.replace(/"/g, """)
.replace(/'/g, "'");
}

/* =========================================================
CART
========================================================= */

function getCart() {
try {
const saved = localStorage.getItem(CART_KEY);

if (!saved) return [];

const cart = JSON.parse(saved);

if (!Array.isArray(cart)) return [];

return cart.filter(function(item) {
  return (
    item &&
    typeof item.id === "string" &&
    Number.isFinite(Number(item.price)) &&
    Number(item.qty) > 0
  );
});

} catch (error) {
console.warn("Cart could not be loaded:", error);
return [];
}
}

function saveCart(cart) {
localStorage.setItem(
CART_KEY,
JSON.stringify(cart)
);

updateCartUI();
}

function addToCart(product) {
if (!product) return;

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

showToast(
product.name + " added to cart"
);
}

function removeFromCart(id) {
const cart = getCart().filter(function(item) {
return item.id !== id;
});

saveCart(cart);
renderCartPage();
}

function updateQty(id, delta) {
const cart = getCart();

const item = cart.find(function(product) {
return product.id === id;
});

if (!item) return;

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
return total +
Number(item.price || 0) *
Number(item.qty || 0);
}, 0);
}

function updateCartUI() {
const quantity = getCartQuantity();

document.querySelectorAll(".cart-count")
.forEach(function(element) {

  element.textContent = quantity;

  element.style.display =
    quantity > 0 ? "grid" : "none";
});

}

/* =========================================================
CURRENCY
========================================================= */

function displayMoney(amount) {

if (typeof formatCurrency === "function") {
return formatCurrency(amount);
}

return "$" + Number(amount).toLocaleString(
"en-US",
{
minimumFractionDigits: 2,
maximumFractionDigits: 2
}
);
}

function refreshPrices() {

document.querySelectorAll(
"[data-price-usd]"
).forEach(function(element) {

const amount =
  Number(element.dataset.priceUsd);

if (!Number.isNaN(amount)) {
  element.textContent =
    displayMoney(amount);
}

});
}

window.addEventListener(
"currencyChanged",
function() {

refreshPrices();
updateCartUI();
renderCartPage();

const checkoutTotal =
  document.getElementById("checkout-total");

if (checkoutTotal) {
  checkoutTotal.textContent =
    displayMoney(getCartTotal());
}

}
);

/* =========================================================
TOAST
========================================================= */

function showToast(message) {

let toast =
document.querySelector(".toast");

if (!toast) {

toast =
  document.createElement("div");

toast.className = "toast";

document.body.appendChild(toast);

}

toast.textContent = message;

toast.classList.remove("show");

void toast.offsetWidth;

toast.classList.add("show");

clearTimeout(
window.areaBoyzToastTimer
);

window.areaBoyzToastTimer =
setTimeout(function() {

  toast.classList.remove("show");

}, 2800);

}

/* =========================================================
HERO SLIDER
IMPORTANT: Compatible with original HTML
========================================================= */

function initSlider() {

const slides =
document.querySelectorAll(".slide");

const dots =
document.querySelectorAll(".dot");

if (!slides.length) {
return;
}

let current = 0;
let timer = null;

/* Make sure the first slide is visible */
slides.forEach(function(slide, index) {

slide.classList.toggle(
  "active",
  index === 0
);

});

dots.forEach(function(dot, index) {

dot.classList.toggle(
  "active",
  index === 0
);

});

function showSlide(index) {

slides[current].classList.remove(
  "active"
);

if (dots[current]) {
  dots[current].classList.remove(
    "active"
  );
}

current =
  (index + slides.length) %
  slides.length;

slides[current].classList.add(
  "active"
);

if (dots[current]) {
  dots[current].classList.add(
    "active"
  );
}

}

function nextSlide() {
showSlide(current + 1);
}

function previousSlide() {
showSlide(current - 1);
}

function restartSlider() {

clearInterval(timer);

if (slides.length > 1) {

  timer =
    setInterval(
      nextSlide,
      5000
    );
}

}

const nextButton =
document.querySelector(
".hero-nav.next"
);

const previousButton =
document.querySelector(
".hero-nav.prev"
);

if (nextButton) {

nextButton.addEventListener(
  "click",
  function(event) {

    event.preventDefault();

    nextSlide();

    restartSlider();
  }
);

}

if (previousButton) {

previousButton.addEventListener(
  "click",
  function(event) {

    event.preventDefault();

    previousSlide();

    restartSlider();
  }
);

}

dots.forEach(function(dot, index) {

dot.addEventListener(
  "click",
  function(event) {

    event.preventDefault();

    showSlide(index);

    restartSlider();
  }
);

});

restartSlider();

/* Pause while user is interacting */
const hero =
document.querySelector(".hero");

if (hero) {

hero.addEventListener(
  "mouseenter",
  function() {
    clearInterval(timer);
  }
);

hero.addEventListener(
  "mouseleave",
  function() {
    restartSlider();
  }
);

}
}

/* =========================================================
MOBILE NAVIGATION
========================================================= */

function initMobileNav() {

const toggle =
document.querySelector(
".mobile-toggle"
);

const links =
document.querySelector(
".nav-links"
);

if (!toggle || !links) {
return;
}

function closeMenu() {

links.classList.remove("open");

toggle.setAttribute(
  "aria-expanded",
  "false"
);

}

toggle.setAttribute(
"aria-expanded",
"false"
);

toggle.addEventListener(
"click",
function(event) {

  event.preventDefault();

  event.stopPropagation();

  const isOpen =
    links.classList.toggle("open");

  toggle.setAttribute(
    "aria-expanded",
    isOpen ? "true" : "false"
  );
}

);

links.querySelectorAll("a")
.forEach(function(link) {

  link.addEventListener(
    "click",
    closeMenu
  );
});

document.addEventListener(
"click",
function(event) {

  if (
    links.classList.contains("open") &&
    !links.contains(event.target) &&
    !toggle.contains(event.target)
  ) {
    closeMenu();
  }
}

);
}

/* =========================================================
PRODUCT CARD
========================================================= */

function createProductCard(product) {

const badge =
product.price > 1000
? '<span class="product-badge">Luxury</span>'
: "";

return `
<article
class="product-card"
data-product-id="${escapeHTML(product.id)}"
>

  <div class="product-img">

    <img
      src="${escapeHTML(product.img)}"
      alt="${escapeHTML(product.name)}"
      loading="lazy"
    >

    ${badge}

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
        data-price-usd="${product.price}"
      >
        ${displayMoney(product.price)}
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

function bindCartButtons(container) {

if (!container) return;

container.querySelectorAll(
".add-to-cart"
).forEach(function(button) {

button.addEventListener(
  "click",
  function(event) {

    event.preventDefault();

    const product =
      PRODUCTS.find(function(item) {

        return item.id ===
          button.dataset.id;
      });

    if (!product) {
      showToast(
        "Product unavailable"
      );
      return;
    }

    addToCart(product);
  }
);

});
}

/* =========================================================
STANDARD PRODUCT RENDER
========================================================= */

function renderProducts(
containerId,
limit
) {

const container =
document.getElementById(
containerId
);

if (!container) return;

let products =
PRODUCTS.slice();

if (limit) {
products =
products.slice(0, limit);
}

container.innerHTML =
products
.map(createProductCard)
.join("");

bindCartButtons(container);

refreshPrices();
}

/* =========================================================
ADVANCED SHOP
========================================================= */

function initShop() {

const container =
document.getElementById(
"shop-products"
);

if (!container) return;

const searchInput =
document.getElementById(
"product-search"
);

const sortSelect =
document.getElementById(
"product-sort"
);

const resultCount =
document.getElementById(
"shop-results-count"
);

const emptyState =
document.getElementById(
"shop-empty"
);

const clearButton =
document.getElementById(
"clear-shop-filters"
);

const filters =
document.querySelectorAll(
".shop-filter"
);

let category = "all";
let search = "";
let sort = "featured";

function render() {

let products =
  PRODUCTS.slice();


if (category !== "all") {

  products =
    products.filter(
      function(product) {

        return product.category
          .toLowerCase() ===
          category;
      }
    );
}


if (search) {

  const term =
    search.toLowerCase();

  products =
    products.filter(
      function(product) {

        return (
          product.name
            .toLowerCase()
            .includes(term) ||

          product.category
            .toLowerCase()
            .includes(term)
        );
      }
    );
}


if (sort === "price-low") {

  products.sort(
    function(a, b) {
      return a.price - b.price;
    }
  );

} else if (sort === "price-high") {

  products.sort(
    function(a, b) {
      return b.price - a.price;
    }
  );

} else if (sort === "name") {

  products.sort(
    function(a, b) {
      return a.name.localeCompare(
        b.name
      );
    }
  );
}


if (resultCount) {

  resultCount.textContent =
    products.length +
    (
      products.length === 1
        ? " product"
        : " products"
    );
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


container.innerHTML =
  products
    .map(createProductCard)
    .join("");

bindCartButtons(container);

refreshPrices();

}

filters.forEach(
function(button) {

  button.addEventListener(
    "click",
    function() {

      filters.forEach(
        function(item) {
          item.classList.remove(
            "active"
          );
        }
      );

      button.classList.add(
        "active"
      );

      category =
        (
          button.dataset.category ||
          "all"
        ).toLowerCase();

      render();
    }
  );
}

);

if (searchInput) {

searchInput.addEventListener(
  "input",
  function() {

    search =
      searchInput.value
        .trim();

    render();
  }
);

}

if (sortSelect) {

sortSelect.addEventListener(
  "change",
  function() {

    sort =
      sortSelect.value;

    render();
  }
);

}

if (clearButton) {

clearButton.addEventListener(
  "click",
  function() {

    category = "all";
    search = "";
    sort = "featured";


    if (searchInput) {
      searchInput.value = "";
    }


    if (sortSelect) {
      sortSelect.value =
        "featured";
    }


    filters.forEach(
      function(button) {

        button.classList.toggle(
          "active",
          (
            button.dataset.category ||
            "all"
          ).toLowerCase() ===
          "all"
        );
      }
    );


    render();
  }
);

}

render();
}

/* =========================================================
CART PAGE
========================================================= */

function renderCartPage() {

const tbody =
document.getElementById(
"cart-items"
);

const summary =
document.getElementById(
"cart-summary"
);

if (!tbody) return;

const cart =
getCart();

if (!cart.length) {

tbody.innerHTML = `
  <tr>
    <td
      colspan="5"
      style="text-align:center;padding:3rem;color:#a0a0b0;"
    >
      Your cart is empty.
      <a
        href="shop.html"
        style="color:#00f0ff;"
      >
        Browse the collection
      </a>
    </td>
  </tr>
`;

if (summary) {
  summary.innerHTML = "";
}

return;

}

tbody.innerHTML =
cart.map(function(item) {

  const lineTotal =
    item.price * item.qty;

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
        <strong>
          ${escapeHTML(item.name)}
        </strong>
        <br>
        <small style="color:#a0a0b0;">
          ${escapeHTML(item.category)}
        </small>
      </td>

      <td
        data-price-usd="${item.price}"
      >
        ${displayMoney(item.price)}
      </td>

      <td>

        <div class="qty-control">

          <button
            type="button"
            data-id="${escapeHTML(item.id)}"
            data-delta="-1"
          >
            −
          </button>

          <span>
            ${item.qty}
          </span>

          <button
            type="button"
            data-id="${escapeHTML(item.id)}"
            data-delta="1"
          >
            +
          </button>

        </div>

      </td>

      <td
        data-price-usd="${lineTotal}"
      >
        ${displayMoney(lineTotal)}
      </td>

    </tr>
  `;

}).join("");

tbody.querySelectorAll(
".qty-control button"
).forEach(function(button) {

button.addEventListener(
  "click",
  function() {

    updateQty(
      button.dataset.id,
      Number(button.dataset.delta)
    );
  }
);

});

const total =
getCartTotal();

if (summary) {

summary.innerHTML = `

  <h3 style="margin-bottom:1.25rem">
    Order Summary
  </h3>

  <div
    style="
      display:flex;
      justify-content:space-between;
      margin-bottom:.75rem;
    "
  >
    <span style="color:#a0a0b0">
      Subtotal
    </span>

    <span data-price-usd="${total}">
      ${displayMoney(total)}
    </span>
  </div>

  <div
    style="
      display:flex;
      justify-content:space-between;
      margin-bottom:.75rem;
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
      border-top:1px solid rgba(255,255,255,.08);
    "
  >

    <span>Total</span>

    <span
      style="color:#00f0ff"
      data-price-usd="${total}"
    >
      ${displayMoney(total)}
    </span>

  </div>

  <a
    href="checkout.html"
    class="btn btn-primary"
    style="width:100%;margin-top:.5rem"
  >
    Proceed to Checkout
  </a>
`;

}

refreshPrices();
}

/* =========================================================
SHARES CALCULATOR
========================================================= */

function initSharesCalc() {

const input =
document.getElementById(
"share-amount"
);

const result =
document.getElementById(
"calc-result"
);

if (!input || !result) return;

const TOTAL_EQUITY_POOL =
756000;

function calculate() {

const amount =
  Number.parseFloat(
    input.value
  ) || 0;


if (amount < 100) {

  result.innerHTML = `
    <p style="color:#a0a0b0">
      Minimum investment:
      ${displayMoney(100)}
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


const annual =
  amount * rate;


const ownership =
  (
    (amount / TOTAL_EQUITY_POOL) *
    100
  ).toFixed(4);


result.innerHTML = `

  <div
    class="value"
    data-price-usd="${annual}"
  >
    ${displayMoney(annual)}
  </div>

  <p
    style="
      margin:.5rem 0;
      color:#a0a0b0;
    "
  >
    Projected annual return
    (${rate * 100}%)
  </p>

  <p
    style="
      font-size:.9rem;
      color:#a0a0b0;
    "
  >
    Ownership:
    ${ownership}%
    of company equity pool
  </p>
`;

refreshPrices();

}

input.addEventListener(
"input",
calculate
);

window.addEventListener(
"currencyChanged",
calculate
);

calculate();
}

/* =========================================================
CHECKOUT DISPLAY
========================================================= */

function updateCheckoutTotal() {

const total =
document.getElementById(
"checkout-total"
);

if (!total) return;

total.textContent =
displayMoney(
getCartTotal()
);
}

/* =========================================================
CHECKOUT
========================================================= */

function initCheckout() {

const form =
document.getElementById(
"checkout-form"
);

if (!form) return;

updateCheckoutTotal();

window.addEventListener(
"currencyChanged",
updateCheckoutTotal
);

form.addEventListener(
"submit",
function(event) {

  event.preventDefault();


  if (!getCart().length) {

    showToast(
      "Your cart is empty."
    );

    return;
  }


  /*
    IMPORTANT:

    This is NOT a real payment confirmation.

    Production flow:

    Browser
      ↓
    Secure backend
      ↓
    Server validates product IDs
      ↓
    Server calculates USD/base amount
      ↓
    Payment provider
      ↓
    Webhook verification
      ↓
    Order created
  */

  showToast(
    "Checkout ready for secure payment."
  );
}

);
}

/* =========================================================
CURRENCY SELECTOR
========================================================= */

function initCurrencySelector() {

const selectors =
document.querySelectorAll(
"[data-currency-selector]"
);

if (!selectors.length) return;

if (
typeof getSelectedCurrency ===
"function"
) {

const selected =
  getSelectedCurrency();

selectors.forEach(
  function(selector) {
    selector.value = selected;
  }
);

}

selectors.forEach(
function(selector) {

  selector.addEventListener(
    "change",
    function() {

      if (
        typeof setSelectedCurrency ===
        "function"
      ) {

        setSelectedCurrency(
          selector.value
        );
      }
    }
  );
}

);
}

/* =========================================================
ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

const current =
window.location.pathname
.split("/")
.pop() ||
"index.html";

document.querySelectorAll(
".nav-links a"
).forEach(function(link) {

const href =
  link.getAttribute("href");

if (!href) return;

const page =
  href.split("/").pop();

if (page === current) {
  link.classList.add("active");
}

});
}

/* =========================================================
GLOBAL STORE API
========================================================= */

window.AreaBoyzStore = {

products: PRODUCTS,

getCart: getCart,

addToCart: addToCart,

removeFromCart: removeFromCart,

updateQty: updateQty,

getCartTotal: getCartTotal,

getCartQuantity: getCartQuantity

};

/* =========================================================
START APPLICATION
========================================================= */

document.addEventListener(
"DOMContentLoaded",
function() {

updateCartUI();

initMobileNav();

initSlider();

initSharesCalc();

initCheckout();

initCurrencySelector();

initActiveNavigation();

renderProducts(
  "featured-products",
  8
);

initShop();

renderCartPage();

updateCheckoutTotal();

refreshPrices();

console.log(
  "Area Boyz Enterprise initialized successfully."
);

}
);
