/* =========================================================
   AREA BOYZ ENTERPRISE
   CORE WEBSITE ENGINE
   Version 2.0.0
   Vanilla JavaScript
   ========================================================= */

"use strict";

/* =========================================================
   CART SYSTEM
   ========================================================= */

const CART_KEY = "areaboyz_cart";

function getCart() {
  try {
    const saved = localStorage.getItem(CART_KEY);
    const cart = saved ? JSON.parse(saved) : [];
    return Array.isArray(cart) ? cart : [];
  } catch (error) {
    console.error("Unable to read cart:", error);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Unable to save cart:", error);
  }

  updateCartUI();
}

function addToCart(product) {
  if (!product || !product.id) return;

  const cart = getCart();

  const existing = cart.find(function (item) {
    return item.id === product.id;
  });

  if (existing) {
    existing.qty = Number(existing.qty || 1) + 1;
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

  showToast(product.name + " added to cart.");
}

function removeFromCart(id) {
  const cart = getCart().filter(function (item) {
    return item.id !== id;
  });

  saveCart(cart);
}

function updateQty(id, delta) {
  const cart = getCart();

  const item = cart.find(function (product) {
    return product.id === id;
  });

  if (!item) return;

  item.qty = Number(item.qty || 1) + delta;

  if (item.qty <= 0) {
    const updated = cart.filter(function (product) {
      return product.id !== id;
    });

    saveCart(updated);
    return;
  }

  saveCart(cart);
}

function getCartTotal() {
  return getCart().reduce(function (total, item) {
    return total + Number(item.price || 0) * Number(item.qty || 1);
  }, 0);
}

function getCartQuantity() {
  return getCart().reduce(function (total, item) {
    return total + Number(item.qty || 1);
  }, 0);
}

function updateCartUI() {
  const quantity = getCartQuantity();

  document.querySelectorAll(".cart-count").forEach(function (counter) {
    counter.textContent = quantity;
  });
}


/* =========================================================
   TOAST NOTIFICATION
   ========================================================= */

function showToast(message) {
  let toast = document.getElementById("area-boyz-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "area-boyz-toast";

    toast.style.position = "fixed";
    toast.style.bottom = "24px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%) translateY(20px)";
    toast.style.zIndex = "99999";
    toast.style.padding = "12px 18px";
    toast.style.borderRadius = "10px";
    toast.style.background = "#16161f";
    toast.style.color = "#f4f4f6";
    toast.style.border = "1px solid rgba(255,255,255,.12)";
    toast.style.boxShadow = "0 12px 35px rgba(0,0,0,.35)";
    toast.style.fontSize = "14px";
    toast.style.fontWeight = "600";
    toast.style.opacity = "0";
    toast.style.transition = "all .25s ease";

    document.body.appendChild(toast);
  }

  toast.textContent = message;

  requestAnimationFrame(function () {
    toast.style.opacity = "1";
    toast.style.transform =
      "translateX(-50%) translateY(0)";
  });

  clearTimeout(window.areaBoyzToastTimer);

  window.areaBoyzToastTimer = setTimeout(function () {
    toast.style.opacity = "0";
    toast.style.transform =
      "translateX(-50%) translateY(20px)";
  }, 2500);
}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function initMobileNav() {
  const toggle = document.querySelector(".mobile-toggle");
  const links = document.querySelector(".nav-links");

  if (!toggle || !links) {
    console.warn("Mobile navigation elements not found.");
    return;
  }

  /*
   * Prevent duplicate event listeners if this function
   * is accidentally called more than once.
   */

  if (toggle.dataset.navReady === "true") {
    return;
  }

  toggle.dataset.navReady = "true";

  toggle.setAttribute("aria-expanded", "false");

  toggle.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const isOpen = links.classList.toggle("open");

    toggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    toggle.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );
  });

  /*
   * Close menu after selecting a page.
   */

  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      links.classList.remove("open");

      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    });
  });

  /*
   * Close menu when clicking outside navigation.
   */

  document.addEventListener("click", function (event) {
    if (
      !links.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      links.classList.remove("open");

      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
  });

  /*
   * Close menu when screen becomes desktop size.
   */

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) {
      links.classList.remove("open");

      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
  });
}


/* =========================================================
   HERO SLIDER
   ========================================================= */

function initSlider() {
  const slider = document.querySelector(".hero-slider");
  const slides = document.querySelectorAll(".hero-slider .slide");
  const dots = document.querySelectorAll(".hero-controls .dot");
  const nextButton = document.querySelector(".hero-nav.next");
  const prevButton = document.querySelector(".hero-nav.prev");

  if (!slider || !slides.length) {
    console.warn("Hero slider elements not found.");
    return;
  }

  let current = 0;
  let timer = null;

  function showSlide(index) {
    /*
     * Keep index inside the valid range.
     */

    if (index >= slides.length) {
      index = 0;
    }

    if (index < 0) {
      index = slides.length - 1;
    }

    current = index;

    slides.forEach(function (slide, i) {
      slide.classList.toggle("active", i === current);
    });

    dots.forEach(function (dot, i) {
      dot.classList.toggle("active", i === current);
    });
  }

  function nextSlide() {
    showSlide(current + 1);
  }

  function previousSlide() {
    showSlide(current - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();

    timer = setInterval(function () {
      nextSlide();
    }, 5500);
  }

  function stopAutoPlay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function restartAutoPlay() {
    startAutoPlay();
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      nextSlide();
      restartAutoPlay();
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      previousSlide();
      restartAutoPlay();
    });
  }

  dots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
      showSlide(index);
      restartAutoPlay();
    });
  });

  /*
   * Pause while the user is interacting with the slider.
   */

  slider.addEventListener("mouseenter", stopAutoPlay);

  slider.addEventListener("mouseleave", startAutoPlay);

  /*
   * Touch/swipe support for phones.
   */

  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener(
    "touchstart",
    function (event) {
      touchStartX = event.changedTouches[0].screenX;
      stopAutoPlay();
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchend",
    function (event) {
      touchEndX = event.changedTouches[0].screenX;

      const distance = touchEndX - touchStartX;

      if (Math.abs(distance) > 50) {
        if (distance < 0) {
          nextSlide();
        } else {
          previousSlide();
        }
      }

      startAutoPlay();
    },
    { passive: true }
  );

  /*
   * Keyboard controls.
   */

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      nextSlide();
      restartAutoPlay();
    }

    if (event.key === "ArrowLeft") {
      previousSlide();
      restartAutoPlay();
    }
  });

  /*
   * Always make sure first slide is active.
   */

  showSlide(0);

  /*
   * Start automatic movement.
   */

  startAutoPlay();
}


/* =========================================================
   PRODUCT DATABASE
   ========================================================= */

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
   PRODUCT CARD
   ========================================================= */

function createProductCard(product) {
  const article = document.createElement("article");
  article.className = "product-card";

  const imageWrapper = document.createElement("div");
  imageWrapper.className = "product-img";

  const image = document.createElement("img");
  image.src = product.img;
  image.alt = product.name;
  image.loading = "lazy";

  image.onerror = function () {
    this.style.opacity = "0.35";
  };

  imageWrapper.appendChild(image);

  if (Number(product.price) > 1000) {
    const badge = document.createElement("span");
    badge.className = "product-badge";
    badge.textContent = "Luxury";
    imageWrapper.appendChild(badge);
  }

  const info = document.createElement("div");
  info.className = "product-info";

  const category = document.createElement("div");
  category.className = "product-category";
  category.textContent = product.category;

  const name = document.createElement("h3");
  name.className = "product-name";
  name.textContent = product.name;

  const priceRow = document.createElement("div");
  priceRow.className = "product-price";

  const price = document.createElement("span");
  price.className = "price";

  /*
   * Currency engine will replace this when available.
   */

  price.dataset.priceUsd = product.price;

  if (
    typeof window.formatCurrency === "function"
  ) {
    price.textContent =
      window.formatCurrency(product.price);
  } else {
    price.textContent =
      "$" + Number(product.price).toLocaleString();
  }

  const button = document.createElement("button");

  button.type = "button";
  button.className = "add-to-cart";
  button.dataset.id = product.id;
  button.setAttribute(
    "aria-label",
    "Add " + product.name + " to cart"
  );
  button.textContent = "＋";

  button.addEventListener("click", function () {
    addToCart(product);
  });

  priceRow.appendChild(price);
  priceRow.appendChild(button);

  info.appendChild(category);
  info.appendChild(name);
  info.appendChild(priceRow);

  article.appendChild(imageWrapper);
  article.appendChild(info);

  return article;
}


/* =========================================================
   PRODUCT RENDERER
   ========================================================= */

function renderProducts(containerId, limit) {
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  container.innerHTML = "";

  let products = PRODUCTS.slice();

  if (typeof limit === "number") {
    products = products.slice(0, limit);
  }

  products.forEach(function (product) {
    container.appendChild(
      createProductCard(product)
    );
  });
}


/* =========================================================
   CART PAGE
   ========================================================= */

function renderCartPage() {
  const container = document.getElementById("cart-items");
  const empty = document.getElementById("cart-empty");
  const summary = document.getElementById("cart-summary");

  if (!container) {
    return;
  }

  const cart = getCart();

  container.innerHTML = "";

  if (!cart.length) {
    if (empty) {
      empty.style.display = "block";
    }

    if (summary) {
      summary.style.display = "none";
    }

    return;
  }

  if (empty) {
    empty.style.display = "none";
  }

  if (summary) {
    summary.style.display = "";
  }

  cart.forEach(function (item) {
    const row = document.createElement("article");
    row.className = "cart-item";

    row.innerHTML = `
      <div class="cart-item-image">
        <img
          src="${item.img}"
          alt="${item.name}"
          loading="lazy"
        >
      </div>

      <div class="cart-item-info">
        <div class="product-category">
          ${item.category || ""}
        </div>

        <h3>${item.name}</h3>

        <div class="cart-item-price"
             data-price-usd="${Number(item.price)}">
          ${formatPriceSafe(Number(item.price))}
        </div>

        <div class="cart-quantity">
          <button
            type="button"
            data-cart-minus="${item.id}"
            aria-label="Decrease quantity"
          >
            −
          </button>

          <span>${Number(item.qty || 1)}</span>

          <button
            type="button"
            data-cart-plus="${item.id}"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          type="button"
          class="remove-cart-item"
          data-cart-remove="${item.id}"
        >
          Remove
        </button>
      </div>
    `;

    container.appendChild(row);
  });

  container.querySelectorAll("[data-cart-minus]").forEach(function (button) {
    button.addEventListener("click", function () {
      updateQty(button.dataset.cartMinus, -1);
      renderCartPage();
    });
  });

  container.querySelectorAll("[data-cart-plus]").forEach(function (button) {
    button.addEventListener("click", function () {
      updateQty(button.dataset.cartPlus, 1);
      renderCartPage();
    });
  });

  container.querySelectorAll("[data-cart-remove]").forEach(function (button) {
    button.addEventListener("click", function () {
      removeFromCart(button.dataset.cartRemove);
      renderCartPage();
      showToast("Item removed from cart.");
    });
  });

  updateCartTotals();
}

function updateCartTotals() {
  const total = getCartTotal();

  document.querySelectorAll("[data-cart-total]").forEach(function (element) {
    element.textContent = formatPriceSafe(total);
  });
}

function formatPriceSafe(amount) {
  if (typeof window.formatCurrency === "function") {
    return window.formatCurrency(amount);
  }

  return "$" + Number(amount).toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  );
}


/* =========================================================
   SHARE CALCULATOR
   ========================================================= */

function initSharesCalc() {
  const amountInput = document.getElementById("investment-amount");
  const result = document.getElementById("investment-result");

  if (!amountInput || !result) {
    return;
  }

  function calculate() {
    const amount = Number(amountInput.value);

    if (!amount || amount < 100) {
      result.textContent =
        "Minimum investment: $100";
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

    result.textContent =
      "Estimated annual return: " +
      formatPriceSafe(annualReturn);
  }

  amountInput.addEventListener("input", calculate);

  calculate();
}


/* =========================================================
   CHECKOUT
   ========================================================= */

function initCheckout() {
  const form = document.getElementById("checkout-form");

  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    /*
     * Prevent accidental fake payment submission.
     *
     * Real payment processing should happen through
     * your secure backend/payment provider.
     */

    event.preventDefault();

    showToast(
      "Checkout is ready for secure payment processing."
    );
  });
}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function initActiveNavigation() {
  const currentPage =
    window.location.pathname
      .split("/")
      .pop()
      .toLowerCase() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(function (link) {
    const href =
      link.getAttribute("href") || "";

    const cleanHref =
      href.split("#")[0]
        .split("?")[0]
        .toLowerCase();

    link.classList.remove("active");

    if (
      cleanHref === currentPage ||
      (
        currentPage === "" &&
        cleanHref === "index.html"
      )
    ) {
      link.classList.add("active");
    }
  });
}


/* =========================================================
   CURRENCY UPDATE HOOK
   ========================================================= */

function refreshProductCurrency() {
  document.querySelectorAll(
    "[data-price-usd]"
  ).forEach(function (element) {
    const amount =
      Number(element.dataset.priceUsd);

    if (
      !Number.isNaN(amount) &&
      typeof window.formatCurrency === "function"
    ) {
      element.textContent =
        window.formatCurrency(amount);
    }
  });

  updateCartTotals();
}


/* =========================================================
   GLOBAL CURRENCY EVENT
   ========================================================= */

window.addEventListener(
  "currencyChanged",
  function () {
    refreshProductCurrency();
  }
);


/* =========================================================
   APPLICATION STARTUP
   ========================================================= */

function initAreaBoyz() {
  console.log(
    "Area Boyz Enterprise — website engine initialized."
  );

  /*
   * Core UI
   */

  updateCartUI();
  initMobileNav();
  initSlider();
  initActiveNavigation();

  /*
   * Homepage collection
   */

  renderProducts(
    "featured-products",
    8
  );

  /*
   * Shop collection
   */

  renderProducts(
    "shop-products"
  );

  /*
   * Other pages
   */

  renderCartPage();
  initSharesCalc();
  initCheckout();

  /*
   * Currency display refresh.
   */

  if (
    typeof window.updateCurrencyDisplay === "function"
  ) {
    window.updateCurrencyDisplay();
  }

  /*
   * Make sure the cart UI is correct
   * after everything loads.
   */

  updateCartUI();
}


/* =========================================================
   DOM READY
   ========================================================= */

if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    initAreaBoyz
  );

} else {

  initAreaBoyz();

}
