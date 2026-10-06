"use strict";

/* =========================================================
   AREA BOYZ ENTERPRISE
   STORE ENGINE
   ========================================================= */

const SITE_ROOT = new URL("../", document.currentScript.src).href;

const PATHS = {
  hero: `${SITE_ROOT}images/hero/`,
  products: `${SITE_ROOT}images/products/`,
  categories: `${SITE_ROOT}images/categories/`,
  collections: `${SITE_ROOT}images/collections/`
};

const PRODUCT_TOTAL = 109;
const DEFAULT_PRODUCT_PRICE = 450;
const CURRENCY_SYMBOL = "$";

const CART_STORAGE_KEY = "areaBoyzCart";
const COLLECTION_STORAGE_KEY = "areaBoyzCollection";

const CATEGORIES = [
  "all",
  "streetwear",
  "handmade",
  "footwear",
  "accessories"
];


/* =========================================================
   PRODUCT NAMES
   ========================================================= */

const PRODUCT_NAMES = {

  "001": "Black Structured Tailored Long Coat",
  "002": "Just Found Out Graphic Tee",
  "003": "LO Windbreaker Shirt",
  "004": "Pink Pop Cartoon Jacket",
  "005": "Kanye West Graphic T-Shirt",
  "006": "Skater Bear Graphic Tee",

  "007": "Aero Frost Runner",
  "008": "Shadow Wrap High-Top",

  "009": "Sheer Mesh Snake-Print Top",
  "010": "Crimson Lace-Up Sneaker Pants",
  "011": "Shadow Grid Hooded Jacket",

  "012": "White Traditional Tailored Set",
  "013": "Brown Tailored Suit Set",
  "014": "Brown Traditional Two-Piece Set",

  "015": "Mixed Layer Streetwear Set",
  "016": "Neutral Cap Collection",

  "017": "Red & Brown Tailored Wrap Skirt Set",
  "018": "Silver Stitch Denim",
  "019": "Vintage 99 Patch Denim",

  "020": "Brown Tailored Two-Piece Suit",
  "021": "Blue Embellished Tailored Dress",
  "022": "Layered Tailored Statement Pieces",

  "023": "Teal Curve-Tail Blazer",
  "024": "Relaxed Gray Utility Trousers",
  "025": "Black Draped Statement Set",
  "026": "Abstract Camo Print Shirt",
  "027": "Red Patchwork Utility Denim",

  "028": "Black Structured Mini Bag",
  "029": "Golden Cropped Utility Shirt",

  "030": "Black Tailored Formal Suit",
  "031": "Indigo Utility Denim Vest",
  "032": "Distressed Fringe Knit Top",
  "033": "Cream Contrast Knit Cardigan",
  "034": "Blue Studded Utility Tote",
  "035": "Retro Racing Bomber Jacket",

  "036": "Decorative Beaded Neckpiece",
  "037": "Ivory Sculpted Hooded Jacket",
  "038": "Gray Structured Shoulder Bag",
  "039": "Spider Graphic T-Shirt",
  "040": "Flared White Street Denim",

  "041": "Blue Mosaic Charm Clogs",
  "042": "Vintage Varsity Letter Jacket",
  "043": "Multicolor Knit Beanie",
  "044": "Printed Graphic Cap",
  "045": "Olive Flight Bomber Jacket",
  "046": "Midnight Floral Bomber",
  "047": "Crimson Racing Bomber",
  "048": "Green Graphic Bucket Hat",
  "049": "Black Graphic Beanie",
  "050": "Shadow Graphic Zip Hoodie",

  "051": "Ironclad Utility Boots",
  "052": "After Hours Graphic Long Sleeve",
  "053": "Turtle Graphic Sweatshirt",

  "054": "Black Formal Tailored Suit",
  "055": "Electric Blue Quilted Jacket",
  "056": "Navy Military Collar Jacket",
  "057": "Burgundy Racing Jacket",
  "058": "Olive Puffer Hoodie",

  "059": "Brown Leather-Style Tote Bag",
  "060": "Golden Crop Utility Shirt",
  "061": "Black Tactical Hooded Jacket",

  "062": "Rugged Terrain Lace-Up Boots",
  "063": "Spider Strike Clogs",
  "064": "Black Leather-Style Backpack",
  "065": "Stone Panel Puffer Jacket",

  "066": "Silver Forge Utility Boots",
  "067": "Archive Graphic Hoodie Set",
  "068": "Distressed Statement Denim",
  "069": "Redline Varsity Jacket",
  "070": "Black Sculpted Puffer Jacket",

  "071": "Area Boyz Utility Accessory",
  "072": "Black Padded Gloves",
  "073": "Vintage Leather Rider Jacket",

  "074": "Frostbite Orange-White Slides",
  "075": "Crimson Lace High-Tops",
  "076": "Tri-Color Flight High-Tops",

  "077": "Indigo Leather-Trim Jacket",
  "078": "Blue Textured Knit Sweater",
  "079": "Western Rider Graphic Jacket",

  "080": "Patchwork Striped Tailored Jacket",
  "081": "Abstract Fur-Collar Statement Jacket",
  "082": "Western Horseman Jacket",
  "083": "Paint-Splatter Art Jacket",
  "084": "Mixed Layer Casual Set",
  "085": "Western Horseman Detail Jacket",

  "086": "Supreme Graphic Hoodie",
  "087": "Black Embossed Card Wallet",
  "088": "Black Patchwork Utility Hoodie",
  "089": "Black Knit Beanie",
  "090": "White Layered Street Set",
  "091": "Clean White Essential Long Sleeve",

  "092": "White Utility Wide-Leg Trousers",
  "093": "Simpsons Graphic Slides",
  "094": "Area Boyz Everyday Accessory",
  "095": "Light Blue Patterned Cap",

  "096": "Blue Hooded Rider Jacket",
  "097": "Burgundy Varsity Zip Jacket",
  "098": "Blue Moto Leather Jacket",
  "099": "Vintage Distressed Leather Jacket",
  "100": "Black Cropped Rider Jacket",

  "101": "Polka Dot Shirt & Pink Trousers",
  "102": "Cedar Ridge Leather Boot",
  "103": "Sneaker Vault Selection",
  "104": "Street Runner Sneaker Selection",
  "105": "Red Stripe Tracksuit Set",
  "106": "Brown Heritage Leather Jacket",
  "107": "Utility Pocket Jacket",
  "108": "Icewave Runner",
  "109": "Heritage Leather Loafer"
};


/* =========================================================
   PRODUCT CATEGORIES
   ========================================================= */

const PRODUCT_CATEGORY_OVERRIDES = {

  "007": "footwear",
  "008": "footwear",
  "041": "footwear",
  "051": "footwear",
  "062": "footwear",
  "063": "footwear",
  "066": "footwear",
  "074": "footwear",
  "075": "footwear",
  "076": "footwear",
  "093": "footwear",
  "102": "footwear",
  "103": "footwear",
  "104": "footwear",
  "108": "footwear",
  "109": "footwear",

  "016": "accessories",
  "028": "accessories",
  "036": "accessories",
  "038": "accessories",
  "043": "accessories",
  "044": "accessories",
  "048": "accessories",
  "049": "accessories",
  "059": "accessories",
  "064": "accessories",
  "071": "accessories",
  "072": "accessories",
  "087": "accessories",
  "089": "accessories",
  "094": "accessories",
  "095": "accessories",

  "101": "sets",
  "105": "sets",
  "107": "bottoms"
};


/* =========================================================
   COLLECTIONS
   ========================================================= */

const PRODUCT_COLLECTION_OVERRIDES = {

  "001": "handmade",
  "012": "handmade",
  "013": "handmade",
  "014": "handmade",
  "017": "handmade",
  "020": "handmade",
  "021": "handmade",
  "022": "handmade",
  "030": "handmade",
  "054": "handmade",
  "080": "handmade",

  "007": "footwear",
  "008": "footwear",
  "041": "footwear",
  "051": "footwear",
  "062": "footwear",
  "063": "footwear",
  "066": "footwear",
  "074": "footwear",
  "075": "footwear",
  "076": "footwear",
  "093": "footwear",
  "102": "footwear",
  "103": "footwear",
  "104": "footwear",
  "108": "footwear",
  "109": "footwear",

  "016": "accessories",
  "028": "accessories",
  "036": "accessories",
  "038": "accessories",
  "043": "accessories",
  "044": "accessories",
  "048": "accessories",
  "049": "accessories",
  "059": "accessories",
  "064": "accessories",
  "071": "accessories",
  "072": "accessories",
  "087": "accessories",
  "089": "accessories",
  "094": "accessories",
  "095": "accessories"
};


/* =========================================================
   BRAND OVERRIDES
   ========================================================= */

const PRODUCT_BRAND_OVERRIDES = {
  "005": "Kanye West",
  "086": "Supreme"
};


/* =========================================================
   PRODUCT PRICES — ALL USD
   ========================================================= */

const PRODUCT_PRICES = {

  "001": 850,
  "002": 420,
  "003": 380,
  "004": 450,
  "005": 480,
  "006": 400,
  "007": 650,
  "008": 720,
  "009": 450,
  "010": 420,
  "011": 460,
  "012": 780,
  "013": 950,
  "014": 880,
  "015": 450,
  "016": 250,
  "017": 820,
  "018": 450,
  "019": 400,
  "020": 920,
  "021": 880,
  "022": 900,
  "023": 430,
  "024": 440,
  "025": 420,
  "026": 400,
  "027": 470,
  "028": 550,
  "029": 430,
  "030": 980,
  "031": 440,
  "032": 420,
  "033": 450,
  "034": 480,
  "035": 450,
  "036": 300,
  "037": 450,
  "038": 580,
  "039": 460,
  "040": 430,
  "041": 620,
  "042": 440,
  "043": 220,
  "044": 240,
  "045": 440,
  "046": 420,
  "047": 450,
  "048": 280,
  "049": 220,
  "050": 450,
  "051": 760,
  "052": 430,
  "053": 420,
  "054": 980,
  "055": 440,
  "056": 420,
  "057": 450,
  "058": 420,
  "059": 580,
  "060": 420,
  "061": 450,
  "062": 780,
  "063": 650,
  "064": 520,
  "065": 450,
  "066": 680,
  "067": 430,
  "068": 420,
  "069": 720,
  "070": 440,
  "071": 260,
  "072": 220,
  "073": 430,
  "074": 650,
  "075": 680,
  "076": 720,
  "077": 450,
  "078": 430,
  "079": 700,
  "080": 760,
  "081": 650,
  "082": 700,
  "083": 720,
  "084": 440,
  "085": 460,
  "086": 680,
  "087": 300,
  "088": 260,
  "089": 220,
  "090": 440,
  "091": 420,
  "092": 550,
  "093": 620,
  "094": 260,
  "095": 240,
  "096": 430,
  "097": 420,
  "098": 460,
  "099": 430,
  "100": 450,
  "101": 620,
  "102": 780,
  "103": 650,
  "104": 650,
  "105": 620,
  "106": 430,
  "107": 420,
  "108": 650,
  "109": 700
};


/* =========================================================
   PRODUCT CREATION
   ========================================================= */

function getDefaultCollection(category, id) {

  if (PRODUCT_COLLECTION_OVERRIDES[id]) {
    return PRODUCT_COLLECTION_OVERRIDES[id];
  }

  if (category === "footwear") {
    return "footwear";
  }

  if (category === "accessories") {
    return "accessories";
  }

  return "streetwear";
}


function createDescription(name, collection) {

  if (collection === "handmade") {
    return `${name} — a structured Area Boyz selection focused on tailored construction, distinctive silhouette and statement styling.`;
  }

  if (collection === "footwear") {
    return `${name} — a footwear selection chosen for everyday styling, street presence and comfort.`;
  }

  if (collection === "accessories") {
    return `${name} — a versatile Area Boyz accessory selected to complete and elevate your look.`;
  }

  return `${name} — a modern Area Boyz streetwear selection built for expressive everyday style.`;
}


const PRODUCTS = [];

for (let number = 1; number <= PRODUCT_TOTAL; number++) {

  const id = String(number).padStart(3, "0");

  const category =
    PRODUCT_CATEGORY_OVERRIDES[id] ||
    "men";

  const collection =
    PRODUCT_COLLECTION_OVERRIDES[id] ||
    getDefaultCollection(category, id);

  const name =
    PRODUCT_NAMES[id] ||
    `Area Boyz Product ${id}`;

  const brand =
    PRODUCT_BRAND_OVERRIDES[id] ||
    "Area Boyz Select";

  const price =
    PRODUCT_PRICES[id] ||
    DEFAULT_PRODUCT_PRICE;

  PRODUCTS.push({
    id,
    number,
    name,
    brand,
    category,
    collection,
    price,
    image: `${PATHS.products}product-${id}.jpg`,
    description: createDescription(name, collection),
    details: [
      {
        label: "Brand",
        value: brand
      },
      {
        label: "Category",
        value: category
      },
      {
        label: "Collection",
        value: collection
      },
      {
        label: "Style",
        value: name
      }
    ]
  });
}


/* =========================================================
   STATE
   ========================================================= */

let state = {
  products: [...PRODUCTS],
  filteredProducts: [...PRODUCTS],
  category: "all",
  collection: "all",
  search: "",
  sort: "featured",
  cart: [],
  currentProduct: null
};


/* =========================================================
   DOM HELPERS
   ========================================================= */

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return Array.from(document.querySelectorAll(selector));
}


/* =========================================================
   SECURITY / HTML ESCAPING
   ========================================================= */

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* =========================================================
   MONEY
   ========================================================= */

function formatMoney(amount) {

  const numericAmount =
    Number(amount) || 0;

  return (
    CURRENCY_SYMBOL +
    numericAmount.toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    )
  );
}


/* =========================================================
   PRODUCT LOOKUP
   ========================================================= */

function getProduct(id) {

  return PRODUCTS.find(
    product =>
      String(product.id) === String(id)
  );
}


/* =========================================================
   CART STORAGE
   ========================================================= */

function saveCart() {

  try {

    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(state.cart)
    );

  } catch (error) {

    console.warn(
      "Unable to save cart:",
      error
    );

  }
}


function loadCart() {

  try {

    const saved =
      localStorage.getItem(
        CART_STORAGE_KEY
      );

    if (!saved) {
      state.cart = [];
      return;
    }

    const parsed =
      JSON.parse(saved);

    if (Array.isArray(parsed)) {

      state.cart =
        parsed.filter(
          item =>
            item &&
            item.id &&
            Number(item.quantity) > 0
        );

    } else {

      state.cart = [];

    }

  } catch (error) {

    console.warn(
      "Unable to load cart:",
      error
    );

    state.cart = [];
  }
}


/* =========================================================
   CART TOTALS
   ========================================================= */

function getCartCount() {

  return state.cart.reduce(
    (total, item) =>
      total +
      Number(item.quantity),
    0
  );
}


function getCartTotal() {

  return state.cart.reduce(
    (total, item) =>
      total +
      (
        Number(item.price) *
        Number(item.quantity)
      ),
    0
  );
}


function updateCartBadges() {

  const count =
    getCartCount();

  $all("[data-cart-count]")
    .forEach(element => {

      element.textContent = count;

      element.classList.toggle(
        "has-items",
        count > 0
      );

    });

  const cartCount =
    $("#cart-count");

  if (cartCount) {
    cartCount.textContent = count;
  }
}


/* =========================================================
   FILTERING
   ========================================================= */

function applyFilters() {

  let products =
    [...PRODUCTS];

  const search =
    state.search
      .trim()
      .toLowerCase();

  if (search) {

    products =
      products.filter(item => {

        const searchable =
          `${item.name} ${item.brand} ${item.category} ${item.collection}`;

        return searchable
          .toLowerCase()
          .includes(search);

      });
  }

  if (
    state.category &&
    state.category !== "all"
  ) {

    products =
      products.filter(
        item =>
          item.category ===
          state.category
      );
  }

  if (
    state.collection &&
    state.collection !== "all"
  ) {

    products =
      products.filter(
        item =>
          item.collection ===
          state.collection
      );
  }

  switch (state.sort) {

    case "price-low":

      products.sort(
        (a, b) =>
          a.price - b.price
      );

      break;

    case "price-high":

      products.sort(
        (a, b) =>
          b.price - a.price
      );

      break;

    case "name":

      products.sort(
        (a, b) =>
          a.name.localeCompare(
            b.name
          )
      );

      break;

    case "newest":

      products.sort(
        (a, b) =>
          b.number - a.number
      );

      break;

    default:

      products.sort(
        (a, b) =>
          a.number - b.number
      );

      break;
  }

  state.filteredProducts =
    products;

  renderProducts();
  updateFilterButtons();
}


/* =========================================================
   PRODUCT CARD
   ========================================================= */

function createProductCard(item) {

  const name =
    escapeHTML(item.name);

  const brand =
    escapeHTML(item.brand);

  const collection =
    escapeHTML(item.collection);

  return `

    <article
      class="product-card"
      data-product-id="${item.id}"
    >

      <button
        class="product-image-button"
        type="button"
        data-product-view="${item.id}"
        aria-label="View ${name}"
      >

        <div class="product-image-wrap">

          <img
            src="${escapeHTML(item.image)}"
            alt="${name}"
            class="product-image"
            loading="lazy"
            onerror="this.style.opacity='0.35';"
          >

          <span class="product-number">
            ${brand} · ${collection}
          </span>

        </div>

      </button>

      <div class="product-info">

        <div class="product-brand">
          ${brand}
        </div>

        <h3 class="product-name">
          ${name}
        </h3>

        <div class="product-bottom">

          <span class="product-price">
            ${formatMoney(item.price)}
          </span>

          <button
            type="button"
            class="add-to-cart"
            data-add-to-cart="${item.id}"
          >
            Add to Bag
          </button>

        </div>

      </div>

    </article>

  `;
}


/* =========================================================
   RENDER PRODUCTS
   ========================================================= */

function renderProducts() {

  const containers =
    $all("[data-products]");

  if (!containers.length) {
    return;
  }

  const products =
    state.filteredProducts;

  containers.forEach(container => {

    if (!products.length) {

      container.innerHTML = `

        <div class="empty-products">

          <h3>No products found</h3>

          <p>
            Try another search,
            category or collection.
          </p>

        </div>

      `;

      return;
    }

    container.innerHTML =
      products
        .map(createProductCard)
        .join("");

  });

  $all("[data-result-count]")
    .forEach(element => {

      element.textContent =
        products.length;

    });
}


/* =========================================================
   PRODUCT MODAL
   ========================================================= */

function createProductModal() {

  if ($("#product-modal")) {
    return;
  }

  const modal =
    document.createElement("div");

  modal.id =
    "product-modal";

  modal.className =
    "product-modal";

  modal.innerHTML = `

    <div
      class="product-modal-overlay"
      data-close-product
    ></div>

    <div
      class="product-modal-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >

      <button
        type="button"
        class="product-modal-close"
        data-close-product
        aria-label="Close product"
      >
        ×
      </button>

      <div
        class="product-modal-content"
        id="product-modal-content"
      ></div>

    </div>

  `;

  document.body.appendChild(modal);
}


function openProductModal(id) {

  const product =
    getProduct(id);

  if (!product) {
    return;
  }

  state.currentProduct =
    product;

  createProductModal();

  const modal =
    $("#product-modal");

  const content =
    $("#product-modal-content");

  if (!modal || !content) {
    return;
  }

  const details =
    product.details
      .map(detail => `

        <div class="product-detail-row">

          <span>
            ${escapeHTML(detail.label)}
          </span>

          <strong>
            ${escapeHTML(detail.value)}
          </strong>

        </div>

      `)
      .join("");

  content.innerHTML = `

    <div class="product-modal-image">

      <img
        src="${escapeHTML(product.image)}"
        alt="${escapeHTML(product.name)}"
      >

    </div>

    <div class="product-modal-info">

      <span class="product-modal-number">

        ${escapeHTML(product.brand)}
        ·
        ${escapeHTML(product.category)}

      </span>

      <h2 id="product-modal-title">
        ${escapeHTML(product.name)}
      </h2>

      <div class="product-modal-price">
        ${formatMoney(product.price)}
      </div>

      <p class="product-modal-description">
        ${escapeHTML(product.description)}
      </p>

      <div class="product-details">
        ${details}
      </div>

      <button
        type="button"
        class="page-btn product-modal-add"
        data-add-to-cart="${product.id}"
      >
        Add to Bag
      </button>

    </div>

  `;

  modal.classList.add("open");

  document.body.classList.add(
    "modal-open"
  );
}


function closeProductModal() {

  const modal =
    $("#product-modal");

  if (!modal) {
    return;
  }

  modal.classList.remove("open");

  document.body.classList.remove(
    "modal-open"
  );

  state.currentProduct = null;
}


/* =========================================================
   CART
   ========================================================= */

function addToCart(
  id,
  quantity = 1
) {

  const product =
    getProduct(id);

  if (!product) {
    return;
  }

  const existing =
    state.cart.find(
      item =>
        String(item.id) ===
        String(id)
    );

  if (existing) {

    existing.quantity +=
      Number(quantity);

  } else {

    state.cart.push({

      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      quantity: Number(quantity)

    });

  }

  saveCart();
  updateCartBadges();
  renderCart();

  showToast(
    `${product.name} added to your bag.`
  );
}


function removeFromCart(id) {

  state.cart =
    state.cart.filter(
      item =>
        String(item.id) !==
        String(id)
    );

  saveCart();
  updateCartBadges();
  renderCart();
}


function changeCartQuantity(
  id,
  change
) {

  const item =
    state.cart.find(
      cartItem =>
        String(cartItem.id) ===
        String(id)
    );

  if (!item) {
    return;
  }

  item.quantity +=
    Number(change);

  if (item.quantity <= 0) {

    removeFromCart(id);
    return;

  }

  saveCart();
  updateCartBadges();
  renderCart();
}


/* =========================================================
   CART DRAWER
   ========================================================= */

function createCartDrawer() {

  if ($("#cart-drawer")) {
    return;
  }

  const drawer =
    document.createElement("aside");

  drawer.id =
    "cart-drawer";

  drawer.className =
    "cart-drawer";

  drawer.innerHTML = `

    <div
      class="cart-overlay"
      data-close-cart
    ></div>

    <div class="cart-panel">

      <div class="cart-header">

        <div>

          <span class="cart-eyebrow">
            YOUR BAG
          </span>

          <h2>
            Shopping Bag
          </h2>

        </div>

        <button
          type="button"
          class="cart-close"
          data-close-cart
          aria-label="Close cart"
        >
          ×
        </button>

      </div>

      <div
        class="cart-items"
        id="cart-items"
      ></div>

      <div class="cart-footer">

        <div class="cart-total-row">

          <span>Total</span>

          <strong id="cart-total">
            $0.00
          </strong>

        </div>

        <button
          type="button"
          class="checkout-button"
          id="checkout-button"
        >
          Proceed to Checkout
        </button>

      </div>

    </div>

  `;

  document.body.appendChild(drawer);
}


function openCart() {

  createCartDrawer();
  renderCart();

  const drawer =
    $("#cart-drawer");

  if (drawer) {
    drawer.classList.add("open");
  }

  document.body.classList.add(
    "cart-open"
  );
}


function closeCart() {

  const drawer =
    $("#cart-drawer");

  if (drawer) {
    drawer.classList.remove("open");
  }

  document.body.classList.remove(
    "cart-open"
  );
}


function renderCart() {

  const container =
    $("#cart-items");

  if (!container) {
    return;
  }

  if (!state.cart.length) {

    container.innerHTML = `

      <div class="cart-empty">

        <div class="cart-empty-icon">
          🛍️
        </div>

        <h3>
          Your bag is empty
        </h3>

        <p>
          Add something you love
          and it will appear here.
        </p>

      </div>

    `;

    const total =
      $("#cart-total");

    if (total) {
      total.textContent =
        formatMoney(0);
    }

    return;
  }

  container.innerHTML =
    state.cart
      .map(item => `

        <div
          class="cart-item"
          data-cart-item="${escapeHTML(item.id)}"
        >

          <img
            src="${escapeHTML(item.image)}"
            alt="${escapeHTML(item.name)}"
          >

          <div class="cart-item-info">

            <strong>
              ${escapeHTML(item.name)}
            </strong>

            <span>
              ${formatMoney(item.price)}
            </span>

            <div class="cart-item-controls">

              <button
                type="button"
                data-cart-minus="${item.id}"
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>
                ${Number(item.quantity)}
              </span>

              <button
                type="button"
                data-cart-plus="${item.id}"
                aria-label="Increase quantity"
              >
                +
              </button>

            </div>

          </div>

          <button
            type="button"
            class="cart-item-remove"
            data-cart-remove="${item.id}"
            aria-label="Remove item"
          >
            ×
          </button>

        </div>

      `)
      .join("");

  const total =
    $("#cart-total");

  if (total) {

    total.textContent =
      formatMoney(
        getCartTotal()
      );

  }
}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

  let toast =
    $("#area-boyz-toast");

  if (!toast) {

    toast =
      document.createElement("div");

    toast.id =
      "area-boyz-toast";

    toast.className =
      "area-boyz-toast";

    document.body.appendChild(toast);
  }

  toast.textContent =
    message;

  toast.classList.add("show");

  clearTimeout(
    toast._timeout
  );

  toast._timeout =
    setTimeout(
      () =>
        toast.classList.remove("show"),
      2600
    );
}


/* =========================================================
   FILTER UI
   ========================================================= */

function updateFilterButtons() {

  $all("[data-collection]")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.collection ===
        state.collection
      );

    });

  $all("[data-category]")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.category ===
        state.category
      );

    });
}


function syncSearchInputs() {

  $all("[data-product-search]")
    .forEach(input => {

      if (
        input.value !==
        state.search
      ) {

        input.value =
          state.search;

      }

    });
}


function syncSortSelect() {

  $all("[data-product-sort]")
    .forEach(select => {

      select.value =
        state.sort;

    });
}


/* =========================================================
   HERO
   ========================================================= */

let heroTimer = null;
let heroIndex = 0;


function getHeroSlides() {

  return $all(
    "[data-hero-slide]"
  );
}


function renderHero() {

  const hero =
    $("[data-hero]");

  if (!hero) {
    return;
  }

  const slides =
    getHeroSlides();

  if (slides.length) {

    startHeroSlider();
    return;

  }

  const images = [
    "hero-1.jpg",
    "hero-2.jpg",
    "hero-3.jpg",
    "hero-4.jpg",
    "hero-5.jpg",
    "hero-6.jpg"
  ];

  hero.innerHTML =
    images
      .map(
        (image, index) => `

          <div
            class="hero-slide ${
              index === 0
                ? "active"
                : ""
            }"
            data-hero-slide
          >

            <img
              src="${PATHS.hero}${image}"
              alt="Area Boyz Enterprise fashion collection ${
                index + 1
              }"
            >

          </div>

        `
      )
      .join("");

  startHeroSlider();
}


function startHeroSlider() {

  const slides =
    getHeroSlides();

  if (slides.length <= 1) {
    return;
  }

  if (heroTimer) {
    clearInterval(heroTimer);
  }

  heroIndex = 0;

  heroTimer =
    setInterval(() => {

      slides[
        heroIndex
      ].classList.remove("active");

      heroIndex =
        (heroIndex + 1) %
        slides.length;

      slides[
        heroIndex
      ].classList.add("active");

    }, 5000);
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function setupMobileMenu() {

  const toggle =
    $("#menu-toggle");

  const nav =
    $("#nav-links");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener(
    "click",
    () => {

      const isOpen =
        nav.classList.toggle(
          "open"
        );

      toggle.classList.toggle(
        "active",
        isOpen
      );

      toggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    }
  );

  $all("#nav-links a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          nav.classList.remove(
            "open"
          );

          toggle.classList.remove(
            "active"
          );

          toggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });
}


/* =========================================================
   HEADER
   ========================================================= */

function setupHeaderScroll() {

  const header =
    document.querySelector("header");

  if (!header) {
    return;
  }

  const update = () => {

    header.classList.toggle(
      "scrolled",
      window.scrollY > 20
    );

  };

  update();

  window.addEventListener(
    "scroll",
    update,
    {
      passive: true
    }
  );
}


/* =========================================================
   REVEAL ANIMATION
   ========================================================= */

function setupRevealAnimations() {

  const elements =
    $all(".hidden");

  if (!elements.length) {
    return;
  }

  if (
    !("IntersectionObserver" in window)
  ) {

    elements.forEach(
      element =>
        element.classList.add(
          "active"
        )
    );

    return;
  }

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "active"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );

  elements.forEach(
    element =>
      observer.observe(element)
  );
}


/* =========================================================
   YEAR
   ========================================================= */

function updateYear() {

  const year =
    $("#year");

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }
}


/* =========================================================
   PRELOADER
   ========================================================= */

function hidePreloader() {

  const preloader =
    $("#preloader");

  if (!preloader) {
    return;
  }

  setTimeout(
    () =>
      preloader.classList.add(
        "hide"
      ),
    450
  );
}


/* =========================================================
   COLLECTION URL
   ========================================================= */

function loadCollectionFromURL() {

  const params =
    new URLSearchParams(
      window.location.search
    );

  const collection =
    params.get("collection");

  if (
    collection &&
    CATEGORIES.includes(collection)
  ) {

    state.collection =
      collection;

    localStorage.setItem(
      COLLECTION_STORAGE_KEY,
      collection
    );
  }

  updateFilterButtons();
}


function restoreCollection() {

  if (
    state.collection !==
    "all"
  ) {
    return;
  }

  try {

    const saved =
      localStorage.getItem(
        COLLECTION_STORAGE_KEY
      );

    if (
      saved &&
      CATEGORIES.includes(saved)
    ) {

      state.collection =
        saved;

    }

  } catch (error) {

    console.warn(
      "Unable to restore collection:",
      error
    );

  }
}


/* =========================================================
   SEARCH
   ========================================================= */

function bindSearch() {

  $all("[data-product-search]")
    .forEach(input => {

      input.addEventListener(
        "input",
        event => {

          state.search =
            event.target.value;

          syncSearchInputs();
          applyFilters();

        }
      );

    });
}


/* =========================================================
   SORT
   ========================================================= */

function bindSort() {

  $all("[data-product-sort]")
    .forEach(select => {

      select.addEventListener(
        "change",
        event => {

          state.sort =
            event.target.value;

          syncSortSelect();
          applyFilters();

        }
      );

    });
}


/* =========================================================
   FILTERS
   ========================================================= */

function bindFilters() {

  document.addEventListener(
    "click",
    event => {

      const collectionButton =
        event.target.closest(
          "[data-collection]"
        );

      if (collectionButton) {

        const collection =
          collectionButton.dataset.collection;

        if (
          CATEGORIES.includes(collection)
        ) {

          state.collection =
            collection;

          localStorage.setItem(
            COLLECTION_STORAGE_KEY,
            collection
          );

          updateFilterButtons();
          applyFilters();

        }

        return;
      }

      const categoryButton =
        event.target.closest(
          "[data-category]"
        );

      if (categoryButton) {

        const category =
          categoryButton.dataset.category;

        if (
          CATEGORIES.includes(category)
        ) {

          state.category =
            category;

          updateFilterButtons();
          applyFilters();

        }

      }

    }
  );
}


/* =========================================================
   PRODUCT ACTIONS
   ========================================================= */

function bindProductActions() {

  document.addEventListener(
    "click",
    event => {

      const viewButton =
        event.target.closest(
          "[data-product-view]"
        );

      if (viewButton) {

        openProductModal(
          viewButton.dataset.productView
        );

        return;
      }

      const addButton =
        event.target.closest(
          "[data-add-to-cart]"
        );

      if (addButton) {

        addToCart(
          addButton.dataset.addToCart
        );

      }

    }
  );
}


/* =========================================================
   CART ACTIONS
   ========================================================= */

function bindCartActions() {

  document.addEventListener(
    "click",
    event => {

      const plus =
        event.target.closest(
          "[data-cart-plus]"
        );

      if (plus) {

        changeCartQuantity(
          plus.dataset.cartPlus,
          1
        );

        return;
      }

      const minus =
        event.target.closest(
          "[data-cart-minus]"
        );

      if (minus) {

        changeCartQuantity(
          minus.dataset.cartMinus,
          -1
        );

        return;
      }

      const remove =
        event.target.closest(
          "[data-cart-remove]"
        );

      if (remove) {

        removeFromCart(
          remove.dataset.cartRemove
        );

        return;
      }

      const closeButton =
        event.target.closest(
          "[data-close-cart]"
        );

      if (closeButton) {

        closeCart();
        return;
      }

      const openButton =
        event.target.closest(
          "[data-open-cart]"
        );

      if (openButton) {

        event.preventDefault();
        openCart();
        return;
      }

      if (
        event.target.closest(
          "#cart-button"
        )
      ) {

        event.preventDefault();
        openCart();
        return;
      }

      if (
        event.target.closest(
          "#checkout-button"
        )
      ) {

        handleCheckout();

      }

    }
  );
}


/* =========================================================
   MODAL ACTIONS
   ========================================================= */

function bindModalActions() {

  document.addEventListener(
    "click",
    event => {

      if (
        event.target.closest(
          "[data-close-product]"
        )
      ) {

        closeProductModal();

      }

    }
  );

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key ===
        "Escape"
      ) {

        closeProductModal();
        closeCart();

      }

    }
  );
}


/* =========================================================
   FLUTTERWAVE
   =========================================================

   Replace only the PUBLIC key when you are ready.
   NEVER place the secret key in this file.

   ========================================================= */

const FLUTTERWAVE_PUBLIC_KEY =
  "FLWPUBK_TEST-REPLACE_WITH_YOUR_PUBLIC_KEY";


function loadFlutterwave() {

  return new Promise(
    (resolve, reject) => {

      if (
        window.FlutterwaveCheckout
      ) {

        resolve();
        return;
      }

      const existing =
        document.querySelector(
          'script[src*="flutterwave"]'
        );

      if (existing) {

        existing.addEventListener(
          "load",
          resolve
        );

        existing.addEventListener(
          "error",
          reject
        );

        return;
      }

      const script =
        document.createElement(
          "script"
        );

      script.src =
        "https://checkout.flutterwave.com/v3.js";

      script.async = true;

      script.onload =
        resolve;

      script.onerror =
        reject;

      document.head.appendChild(
        script
      );

    }
  );
}


/* =========================================================
   CUSTOMER DETAILS
   ========================================================= */

function getCustomerDetails() {

  const savedName =
    localStorage.getItem(
      "areaBoyzCustomerName"
    ) || "";

  const savedEmail =
    localStorage.getItem(
      "areaBoyzCustomerEmail"
    ) || "";

  const name =
    window.prompt(
      "Enter your full name:",
      savedName
    );

  if (
    !name ||
    !name.trim()
  ) {

    return null;
  }

  const email =
    window.prompt(
      "Enter your email address:",
      savedEmail
    );

  if (
    !email ||
    !email.trim()
  ) {

    return null;
  }

  localStorage.setItem(
    "areaBoyzCustomerName",
    name.trim()
  );

  localStorage.setItem(
    "areaBoyzCustomerEmail",
    email.trim()
  );

  return {
    name: name.trim(),
    email: email.trim()
  };
}


/* =========================================================
   CHECKOUT
   ========================================================= */

async function handleCheckout() {

  if (!state.cart.length) {

    showToast(
      "Your bag is empty."
    );

    return;
  }

  const customer =
    getCustomerDetails();

  if (!customer) {

    showToast(
      "Checkout cancelled."
    );

    return;
  }

  const amount =
    getCartTotal();

  try {

    showToast(
      "Preparing secure checkout..."
    );

    await loadFlutterwave();

    if (
      typeof window.FlutterwaveCheckout !==
      "function"
    ) {

      throw new Error(
        "Flutterwave checkout is unavailable."
      );
    }

    const transactionReference =
      `ABZ-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 9)
        .toUpperCase()}`;

    window.FlutterwaveCheckout({

      public_key:
        FLUTTERWAVE_PUBLIC_KEY,

      tx_ref:
        transactionReference,

      amount:
        amount,

      /* ALL STORE PURCHASES ARE USD */
      currency:
        "USD",

      payment_options:
        "card",

      customer: {

        email:
          customer.email,

        name:
          customer.name

      },

      customizations: {

        title:
          "Area Boyz Enterprise",

        description:
          "Fashion & lifestyle purchase",

        logo:
          `${SITE_ROOT}images/logo.png`

      },

      callback:
        function(payment) {

          handleFlutterwaveResponse(
            payment,
            transactionReference
          );

        },

      onclose:
        function() {

          showToast(
            "Checkout window closed."
          );

        }

    });

  } catch (error) {

    console.error(
      "Checkout error:",
      error
    );

    showToast(
      "Unable to initialize payment."
    );

  }
}


/* =========================================================
   FLUTTERWAVE RESPONSE
   ========================================================= */

function handleFlutterwaveResponse(
  payment,
  reference
) {

  console.log(
    "Flutterwave payment response:",
    payment
  );

  if (
    payment &&
    (
      payment.status === "successful" ||
      payment.status === "completed"
    )
  ) {

    showToast(
      "Payment successful. Thank you for shopping with Area Boyz."
    );

    localStorage.setItem(
      "areaBoyzLastTransaction",
      JSON.stringify({

        reference:
          reference,

        payment:
          payment,

        total:
          getCartTotal(),

        cart:
          state.cart,

        date:
          new Date().toISOString()

      })
    );

    state.cart = [];

    saveCart();
    updateCartBadges();
    renderCart();

    setTimeout(
      () => closeCart(),
      1000
    );

    return;
  }

  showToast(
    "Payment was not completed."
  );
}


/* =========================================================
   PAYMENT RETURN
   ========================================================= */

function handlePaymentReturn() {

  const params =
    new URLSearchParams(
      window.location.search
    );

  const status =
    params.get("status");

  const transactionId =
    params.get("transaction_id");

  if (status) {

    console.log(
      "Payment return:",
      {
        status,
        transactionId
      }
    );

  }
}


/* =========================================================
   SHOP DETECTION
   ========================================================= */

function isShopPage() {

  const path =
    window.location.pathname
      .toLowerCase();

  return (
    path.endsWith("/shop.html") ||
    path.endsWith("/shop") ||
    !!document.querySelector(
      "[data-products]"
    )
  );
}


/* =========================================================
   STORE INITIALIZATION
   ========================================================= */

function initializeStore() {

  if (!isShopPage()) {
    return;
  }

  createCartDrawer();
  renderProducts();
  renderCart();
  updateCartBadges();
  updateFilterButtons();
  syncSearchInputs();
  syncSortSelect();
}


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

function setupSmoothScroll() {

  $all(
    'a[href^="#"]'
  ).forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(
            targetId
          );

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });
}


/* =========================================================
   IMAGE FALLBACK
   ========================================================= */

function setupImageFallback() {

  document.addEventListener(
    "error",
    event => {

      const image =
        event.target;

      if (
        image &&
        image.tagName === "IMG"
      ) {

        image.classList.add(
          "image-error"
        );

      }

    },
    true
  );
}


/* =========================================================
   CART BUTTONS
   ========================================================= */

function setupCartButtons() {

  $all("[data-open-cart]")
    .forEach(button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();
          openCart();

        }
      );

    });

  const cartButton =
    $("#cart-button");

  if (cartButton) {

    cartButton.addEventListener(
      "click",
      event => {

        event.preventDefault();
        openCart();

      }
    );

  }
}


/* =========================================================
   COLLECTION LINKS
   ========================================================= */

function setupCollectionLinks() {

  $all(
    'a[href*="shop.html?collection="]'
  ).forEach(link => {

    link.addEventListener(
      "click",
      () => {

        const href =
          link.getAttribute("href");

        if (!href) {
          return;
        }

        const match =
          href.match(
            /collection=([^&]+)/i
          );

        if (
          match &&
          match[1]
        ) {

          const collection =
            decodeURIComponent(
              match[1]
            );

          if (
            CATEGORIES.includes(
              collection
            )
          ) {

            localStorage.setItem(
              COLLECTION_STORAGE_KEY,
              collection
            );

          }

        }

      }
    );

  });
}


/* =========================================================
   HERO PRELOAD
   ========================================================= */

function preloadHeroImages() {

  [
    "hero-1.jpg",
    "hero-2.jpg",
    "hero-3.jpg",
    "hero-4.jpg",
    "hero-5.jpg",
    "hero-6.jpg"
  ].forEach(filename => {

    const image =
      new Image();

    image.src =
      `${PATHS.hero}${filename}`;

  });
}


/* =========================================================
   PUBLIC STORE API
   ========================================================= */

window.AreaBoyzStore = {

  products: PRODUCTS,

  getProduct,
  addToCart,
  removeFromCart,
  changeCartQuantity,
  openCart,
  closeCart,
  getCartCount,
  getCartTotal,
  formatMoney

};


/* =========================================================
   INIT
   ========================================================= */

function init() {

  try {

    loadCart();

    loadCollectionFromURL();

    restoreCollection();

    updateYear();

    renderHero();

    initializeStore();

    bindSearch();

    bindSort();

    bindFilters();

    bindProductActions();

    bindCartActions();

    bindModalActions();

    setupMobileMenu();

    setupHeaderScroll();

    setupRevealAnimations();

    setupSmoothScroll();

    setupImageFallback();

    setupCartButtons();

    setupCollectionLinks();

    preloadHeroImages();

    handlePaymentReturn();

    hidePreloader();

    applyFilters();

  } catch (error) {

    console.error(
      "Area Boyz initialization error:",
      error
    );

    hidePreloader();

  }
}


/* =========================================================
   START
   ========================================================= */

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    init
  );

} else {

  init();

     }
