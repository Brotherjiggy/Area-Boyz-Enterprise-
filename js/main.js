/* =========================================================
   AREA BOYZ ENTERPRISE
   SCALABLE PRODUCT + CART ENGINE
   Version 2.1.0
   ========================================================= */

"use strict";

/* =========================================================
   CART
   ========================================================= */

const CART_KEY = "areaboyz_cart";

function getCart() {
  try {
    const saved = localStorage.getItem(CART_KEY);
    const cart = saved ? JSON.parse(saved) : [];
    return Array.isArray(cart) ? cart : [];
  } catch (error) {
    console.error("Cart error:", error);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}

function addToCart(product) {
  if (!product || !product.id) return;

  const cart = getCart();

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty = Number(existing.qty || 1) + 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      price: Number(product.price),
      img: product.img,
      qty: 1
    });
  }

  saveCart(cart);

  showToast(product.name + " added to cart.");
}

function removeFromCart(id) {
  saveCart(
    getCart().filter(item => item.id !== id)
  );
}

function updateQty(id, amount) {
  const cart = getCart();

  const item = cart.find(product => product.id === id);

  if (!item) return;

  item.qty = Number(item.qty || 1) + amount;

  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }

  saveCart(cart);
}

function getCartQuantity() {
  return getCart().reduce(
    (total, item) => total + Number(item.qty || 1),
    0
  );
}

function getCartTotal() {
  return getCart().reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
      Number(item.qty || 1),
    0
  );
}

function updateCartUI() {
  const quantity = getCartQuantity();

  document.querySelectorAll(".cart-count").forEach(counter => {
    counter.textContent = quantity;
  });
}


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function showToast(message) {
  let toast = document.getElementById("area-boyz-toast");

  if (!toast) {
    toast = document.createElement("div");

    toast.id = "area-boyz-toast";

    Object.assign(toast.style, {
      position: "fixed",
      bottom: "24px",
      left: "50%",
      transform: "translateX(-50%) translateY(20px)",
      zIndex: "99999",
      padding: "13px 20px",
      borderRadius: "12px",
      background: "#16161f",
      color: "#f4f4f6",
      border: "1px solid rgba(255,255,255,.12)",
      boxShadow: "0 15px 40px rgba(0,0,0,.4)",
      fontSize: "14px",
      fontWeight: "600",
      opacity: "0",
      transition: "all .25s ease"
    });

    document.body.appendChild(toast);
  }

  toast.textContent = message;

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform =
      "translateX(-50%) translateY(0)";
  });

  clearTimeout(window.areaBoyzToastTimer);

  window.areaBoyzToastTimer = setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform =
      "translateX(-50%) translateY(20px)";
  }, 2500);
}


/* =========================================================
   PRODUCT DATABASE
   =========================================================
   
   This structure is designed to scale to hundreds
   or thousands of products later.
   ========================================================= */

const PRODUCTS = [

  /* ===================== CLOTHING ===================== */

  {
    id: "p1",
    name: "Emerald Brocade Vest Ensemble",
    category: "Clothing",
    subcategory: "Formal",
    collection: "Formal",
    price: 890,
    img: "images/formal-green-vest.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Emerald"],
    stock: 18,
    badge: "Featured",
    description:
      "A refined emerald brocade ensemble combining traditional influence with modern tailoring.",
    featured: true
  },

  {
    id: "p2",
    name: "Black Mandarin Collar Suit",
    category: "Clothing",
    subcategory: "Suits",
    collection: "Formal",
    price: 1250,
    img: "images/black-mandarin-suit.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
    stock: 12,
    badge: "Luxury",
    description:
      "A sharp black tailored suit featuring a distinctive Mandarin collar.",
    featured: true
  },

  {
    id: "p5",
    name: "Polka Dot & Pink Pleated Set",
    category: "Clothing",
    subcategory: "Contemporary",
    collection: "Contemporary",
    price: 480,
    img: "images/polka-pink-outfit.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Pink", "White"],
    stock: 22,
    badge: "New",
    description:
      "A contemporary pleated set designed for expressive everyday style.",
    featured: true
  },

  {
    id: "p7",
    name: "Lace-Trim Wide-Leg Jeans",
    category: "Clothing",
    subcategory: "Jeans",
    collection: "Denim",
    price: 340,
    img: "images/lace-jeans-full.jpg",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Denim"],
    stock: 30,
    badge: "Trending",
    description:
      "Wide-leg denim with distinctive lace detailing and a contemporary silhouette.",
    featured: true
  },

  {
    id: "p9",
    name: "Spider-Man Comic Tee",
    category: "Clothing",
    subcategory: "T-Shirts",
    collection: "Streetwear",
    price: 85,
    img: "images/spiderman-tshirt.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Red"],
    stock: 60,
    badge: "Street",
    description:
      "Graphic streetwear tee inspired by comic-book culture.",
    featured: true
  },

  {
    id: "p10",
    name: "Red Spider Hoodie",
    category: "Clothing",
    subcategory: "Hoodies",
    collection: "Streetwear",
    price: 195,
    img: "images/spiderman-hoodie.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Red"],
    stock: 40,
    badge: "Limited Drop",
    description:
      "A bold graphic hoodie built for modern streetwear wardrobes.",
    featured: true
  },

  {
    id: "p12",
    name: "Black Gold Branch Suit",
    category: "Clothing",
    subcategory: "Couture",
    collection: "Couture",
    price: 1850,
    img: "images/black-gold-suit.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gold"],
    stock: 8,
    badge: "Couture",
    description:
      "A statement couture suit combining black tailoring with gold botanical detailing.",
    featured: true
  },

  {
    id: "p13",
    name: "Ivory Bamboo Suit",
    category: "Clothing",
    subcategory: "Couture",
    collection: "Eastern Modern",
    price: 1680,
    img: "images/white-bamboo-suit.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ivory"],
    stock: 7,
    badge: "Couture",
    description:
      "Fluid ivory tailoring featuring an elegant bamboo-inspired print.",
    featured: true
  },

  {
    id: "p14",
    name: "Gold Mirror Vest Look",
    category: "Clothing",
    subcategory: "Avant-Garde",
    collection: "Future Form",
    price: 980,
    img: "images/gold-vest-outfit.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gold"],
    stock: 10,
    badge: "Avant-Garde",
    description:
      "A reflective statement vest designed for high-impact evening looks.",
    featured: true
  },

  {
    id: "p16",
    name: "Charcoal Pleated Trousers",
    category: "Clothing",
    subcategory: "Trousers",
    collection: "Formal",
    price: 290,
    img: "images/gray-pleated-pants.jpg",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Charcoal"],
    stock: 35,
    badge: "Essential",
    description:
      "Clean charcoal pleated trousers with a modern relaxed silhouette.",
    featured: false
  },


  /* ===================== JACKETS ===================== */

  {
    id: "p4",
    name: "Chanel Beige Anorak",
    category: "Jackets",
    subcategory: "Anoraks",
    collection: "Luxury Outerwear",
    price: 3200,
    img: "images/chanel-beige-jacket.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige"],
    stock: 5,
    badge: "Luxury",
    description:
      "A premium beige anorak-inspired outerwear statement.",
    featured: true
  },

  {
    id: "p8",
    name: "Marvel Varsity Collection",
    category: "Jackets",
    subcategory: "Varsity",
    collection: "Streetwear",
    price: 420,
    img: "images/marvel-varsity-jackets.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Red"],
    stock: 25,
    badge: "Street",
    description:
      "Varsity-inspired outerwear blending comic culture with modern street style.",
    featured: true
  },

  {
    id: "p15",
    name: "Cyber Geometric Coat",
    category: "Jackets",
    subcategory: "Coats",
    collection: "Future Form",
    price: 1450,
    img: "images/blue-patterned-coat.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue"],
    stock: 9,
    badge: "Future",
    description:
      "A futuristic geometric coat created for bold architectural styling.",
    featured: true
  },


  /* ===================== FOOTWEAR ===================== */

  {
    id: "p3",
    name: "Nike Air Force 1 Blue Patent",
    category: "Footwear",
    subcategory: "Sneakers",
    collection: "Footwear",
    price: 220,
    img: "images/nike-blue-af1-1.jpg",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: ["Patent Blue"],
    stock: 20,
    badge: "Featured",
    description:
      "Classic sneaker styling with a bold blue patent finish.",
    featured: true
  },


  /* ===================== ACCESSORIES ===================== */

  {
    id: "p11",
    name: "Zipper Utility Cap",
    category: "Accessories",
    subcategory: "Caps",
    collection: "Accessories",
    price: 65,
    img: "images/zipper-cap.jpg",
    sizes: ["One Size"],
    colors: ["Black"],
    stock: 50,
    badge: "Essential",
    description:
      "Utility-inspired cap with functional zipper detailing.",
    featured: false
  },


  /* ===================== FUTURE PRODUCT PLACEHOLDERS ===================== */

  {
    id: "p17",
    name: "Area Boyz Signature Hoodie",
    category: "Clothing",
    subcategory: "Hoodies",
    collection: "Area Boyz Originals",
    price: 150,
    img: "images/signature-hoodie.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Yellow"],
    stock: 50,
    badge: "AB Original",
    description:
      "The signature Area Boyz hoodie designed for everyday movement.",
    featured: false
  },

  {
    id: "p18",
    name: "Area Boyz Street Runner",
    category: "Footwear",
    subcategory: "Sneakers",
    collection: "Area Boyz Originals",
    price: 180,
    img: "images/street-runner.jpg",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: ["Black", "White"],
    stock: 35,
    badge: "New",
    description:
      "A modern street sneaker concept from the Area Boyz Originals collection.",
    featured: false
  },

  {
    id: "p19",
    name: "Area Boyz Crossbody Bag",
    category: "Accessories",
    subcategory: "Bags",
    collection: "Area Boyz Originals",
    price: 95,
    img: "images/crossbody-bag.jpg",
    sizes: ["One Size"],
    colors: ["Black"],
    stock: 45,
    badge: "New",
    description:
      "Compact crossbody bag built for everyday street movement.",
    featured: false
  },

  {
    id: "p20",
    name: "Area Boyz Statement Jacket",
    category: "Jackets",
    subcategory: "Bomber",
    collection: "Area Boyz Originals",
    price: 350,
    img: "images/statement-jacket.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Yellow"],
    stock: 20,
    badge: "AB Original",
    description:
      "A signature bomber jacket combining utility construction with Area Boyz identity.",
    featured: false
  }

];


/* =========================================================
   FIND PRODUCT
   ========================================================= */

function getProductById(id) {
  return PRODUCTS.find(product => product.id === id);
}


/* =========================================================
   PRODUCT CARD
   ========================================================= */

function createProductCard(product) {

  const article = document.createElement("article");

  article.className = "product-card";

  /*
   * Entire card becomes clickable.
   */

  article.setAttribute(
    "data-product-id",
    product.id
  );

  article.setAttribute(
    "tabindex",
    "0"
  );

  article.setAttribute(
    "role",
    "link"
  );

  const imageWrapper =
    document.createElement("div");

  imageWrapper.className =
    "product-img";

  const image =
    document.createElement("img");

  image.src = product.img;

  image.alt = product.name;

  image.loading = "lazy";

  imageWrapper.appendChild(image);


  /*
   * Badge
   */

  if (product.badge) {

    const badge =
      document.createElement("span");

    badge.className =
      "product-badge";

    badge.textContent =
      product.badge;

    imageWrapper.appendChild(badge);
  }


  /*
   * Product information
   */

  const info =
    document.createElement("div");

  info.className =
    "product-info";


  const category =
    document.createElement("div");

  category.className =
    "product-category";

  category.textContent =
    product.subcategory ||
    product.category;


  const name =
    document.createElement("h3");

  name.className =
    "product-name";

  name.textContent =
    product.name;


  const priceRow =
    document.createElement("div");

  priceRow.className =
    "product-price";


  const price =
    document.createElement("span");

  price.className =
    "price";

  price.dataset.priceUsd =
    product.price;

  price.textContent =
    formatPriceSafe(product.price);


  /*
   * Add button
   */

  const button =
    document.createElement("button");

  button.type = "button";

  button.className =
    "add-to-cart";

  button.textContent =
    "＋";

  button.setAttribute(
    "aria-label",
    "Add " +
    product.name +
    " to cart"
  );


  /*
   * Prevent button click from opening
   * product page.
   */

  button.addEventListener(
    "click",
    function (event) {

      event.preventDefault();
      event.stopPropagation();

      addToCart(product);
    }
  );


  priceRow.appendChild(price);

  priceRow.appendChild(button);

  info.appendChild(category);

  info.appendChild(name);

  info.appendChild(priceRow);

  article.appendChild(imageWrapper);

  article.appendChild(info);


  /*
   * Open product detail page.
   */

  function openProduct() {

    window.location.href =
      "product.html?id=" +
      encodeURIComponent(product.id);
  }


  article.addEventListener(
    "click",
    function (event) {

      if (
        event.target.closest(
          ".add-to-cart"
        )
      ) {
        return;
      }

      openProduct();
    }
  );


  article.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        openProduct();
      }
    }
  );


  return article;
}


/* =========================================================
   RENDER PRODUCTS
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

  container.innerHTML = "";

  let products =
    PRODUCTS.slice();

  if (
    typeof limit === "number"
  ) {

    products =
      products.slice(0, limit);
  }

  products.forEach(product => {

    container.appendChild(
      createProductCard(product)
    );

  });
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

  if (!toggle || !links) return;

  if (
    toggle.dataset.navReady === "true"
  ) {
    return;
  }

  toggle.dataset.navReady =
    "true";

  toggle.setAttribute(
    "aria-expanded",
    "false"
  );

  toggle.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      event.stopPropagation();

      const open =
        links.classList.toggle(
          "open"
        );

      toggle.setAttribute(
        "aria-expanded",
        open ? "true" : "false"
      );

      toggle.setAttribute(
        "aria-label",
        open
          ? "Close menu"
          : "Open menu"
      );
    }
  );


  links.querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        function () {

          links.classList.remove(
            "open"
          );

          toggle.setAttribute(
            "aria-expanded",
            "false"
          );
        }
      );

    });


  document.addEventListener(
    "click",
    function (event) {

      if (
        !links.contains(
          event.target
        ) &&
        !toggle.contains(
          event.target
        )
      ) {

        links.classList.remove(
          "open"
        );

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    }
  );
}


/* =========================================================
   HERO SLIDER
   ========================================================= */

function initSlider() {

  const slider =
    document.querySelector(
      ".hero-slider"
    );

  const slides =
    document.querySelectorAll(
      ".hero-slider .slide"
    );

  const dots =
    document.querySelectorAll(
      ".hero-controls .dot"
    );

  const next =
    document.querySelector(
      ".hero-nav.next"
    );

  const previous =
    document.querySelector(
      ".hero-nav.prev"
    );

  if (
    !slider ||
    !slides.length
  ) {
    return;
  }

  let current = 0;

  let timer = null;


  function showSlide(index) {

    if (
      index >= slides.length
    ) {
      index = 0;
    }

    if (index < 0) {
      index =
        slides.length - 1;
    }

    current = index;

    slides.forEach(
      (slide, i) => {

        slide.classList.toggle(
          "active",
          i === current
        );

      }
    );


    dots.forEach(
      (dot, i) => {

        dot.classList.toggle(
          "active",
          i === current
        );

      }
    );
  }


  function start() {

    clearInterval(timer);

    timer =
      setInterval(
        () => {

          showSlide(
            current + 1
          );

        },
        5500
      );
  }


  if (next) {

    next.addEventListener(
      "click",
      function () {

        showSlide(
          current + 1
        );

        start();
      }
    );
  }


  if (previous) {

    previous.addEventListener(
      "click",
      function () {

        showSlide(
          current - 1
        );

        start();
      }
    );
  }


  dots.forEach(
    (dot, index) => {

      dot.addEventListener(
        "click",
        function () {

          showSlide(index);

          start();
        }
      );

    }
  );


  showSlide(0);

  start();
}


/* =========================================================
   ACTIVE NAV
   ========================================================= */

function initActiveNavigation() {

  const currentPage =
    window.location.pathname
      .split("/")
      .pop()
      .toLowerCase() ||
    "index.html";

  document
    .querySelectorAll(
      ".nav-links a"
    )
    .forEach(link => {

      const href =
        (
          link.getAttribute(
            "href"
          ) || ""
        )
          .split("#")[0]
          .split("?")[0]
          .toLowerCase();

      link.classList.remove(
        "active"
      );

      if (
        href === currentPage
      ) {

        link.classList.add(
          "active"
        );
      }
    });
}


/* =========================================================
   CURRENCY
   ========================================================= */

function formatPriceSafe(amount) {

  if (
    typeof window.formatCurrency ===
    "function"
  ) {

    return window.formatCurrency(
      amount
    );
  }

  return (
    "$" +
    Number(amount).toLocaleString(
      undefined,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    )
  );
}


function refreshProductCurrency() {

  document
    .querySelectorAll(
      "[data-price-usd]"
    )
    .forEach(element => {

      const amount =
        Number(
          element.dataset.priceUsd
        );

      if (
        !Number.isNaN(amount)
      ) {

        element.textContent =
          formatPriceSafe(
            amount
          );
      }
    });


  /*
   * Re-rendering isn't necessary because
   * every price has data-price-usd.
   */

  updateCartUI();
}


window.addEventListener(
  "currencyChanged",
  refreshProductCurrency
);


/* =========================================================
   CART PAGE
   ========================================================= */

function renderCartPage() {

  const container =
    document.getElementById(
      "cart-items"
    );

  const empty =
    document.getElementById(
      "cart-empty"
    );

  const summary =
    document.getElementById(
      "cart-summary"
    );

  if (!container) return;

  const cart =
    getCart();

  container.innerHTML = "";


  if (!cart.length) {

    if (empty) {
      empty.style.display =
        "block";
    }

    if (summary) {
      summary.style.display =
        "none";
    }

    return;
  }


  if (empty) {
    empty.style.display =
      "none";
  }

  if (summary) {
    summary.style.display =
      "";
  }


  cart.forEach(item => {

    const row =
      document.createElement(
        "article"
      );

    row.className =
      "cart-item";

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
          ${item.subcategory || item.category || ""}
        </div>

        <h3>${item.name}</h3>

        <div
          class="cart-item-price"
          data-price-usd="${Number(item.price)}"
        >
          ${formatPriceSafe(
            Number(item.price)
          )}
        </div>

        <div class="cart-quantity">

          <button
            type="button"
            data-cart-minus="${item.id}"
          >
            −
          </button>

          <span>
            ${Number(item.qty || 1)}
          </span>

          <button
            type="button"
            data-cart-plus="${item.id}"
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


  container
    .querySelectorAll(
      "[data-cart-minus]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        function () {

          updateQty(
            button.dataset.cartMinus,
            -1
          );

          renderCartPage();
        }
      );
    });


  container
    .querySelectorAll(
      "[data-cart-plus]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        function () {

          updateQty(
            button.dataset.cartPlus,
            1
          );

          renderCartPage();
        }
      );
    });


  container
    .querySelectorAll(
      "[data-cart-remove]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        function () {

          removeFromCart(
            button.dataset.cartRemove
          );

          renderCartPage();

          showToast(
            "Item removed from cart."
          );
        }
      );
    });


  updateCartTotals();
}


function updateCartTotals() {

  const total =
    getCartTotal();

  document
    .querySelectorAll(
      "[data-cart-total]"
    )
    .forEach(element => {

      element.textContent =
        formatPriceSafe(total);
    });
}


/* =========================================================
   APPLICATION START
   ========================================================= */

function initAreaBoyz() {

  updateCartUI();

  initMobileNav();

  initSlider();

  initActiveNavigation();


  /*
   * Homepage
   */

  renderProducts(
    "featured-products",
    8
  );


  /*
   * Shop page
   */

  renderProducts(
    "shop-products"
  );


  /*
   * Cart
   */

  renderCartPage();


  /*
   * Currency
   */

  if (
    typeof window.updateCurrencyDisplay ===
    "function"
  ) {

    window.updateCurrencyDisplay();
  }


  updateCartUI();


  console.log(
    "Area Boyz Enterprise 2.1.0 initialized."
  );
}


/* =========================================================
   DOM READY
   ========================================================= */

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initAreaBoyz
  );

} else {

  initAreaBoyz();

     }
