/* =========================================================
   AREA BOYZ ENTERPRISE
   STORE ENGINE
   Matched to the existing Area Boyz HTML/CSS.
   All catalogue prices are USD.
   ========================================================= */

"use strict";

const SCRIPT_URL = document.currentScript
  ? document.currentScript.src
  : "";

const SITE_ROOT = SCRIPT_URL
  ? new URL("../", SCRIPT_URL).href
  : "./";

const PRODUCT_IMAGE_PATH = `${SITE_ROOT}images/products/`;
const HERO_IMAGE_PATH = `${SITE_ROOT}images/hero/`;

const PRODUCT_TOTAL = 109;
const DEFAULT_PRODUCT_PRICE = 450;
const CURRENCY_SYMBOL = "$";

const CART_STORAGE_KEY = "areaBoyzCart";
const COLLECTION_STORAGE_KEY = "areaBoyzCollection";


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
   PRODUCT PRICES — USD
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
   PRODUCT CATALOGUE
   ========================================================= */

function getCollection(id) {
  return PRODUCT_COLLECTION_OVERRIDES[id] || "streetwear";
}

function getCategory(id) {
  if (PRODUCT_CATEGORY_OVERRIDES[id]) {
    return PRODUCT_CATEGORY_OVERRIDES[id];
  }

  return getCollection(id);
}

function getProductImage(id) {
  return `${PRODUCT_IMAGE_PATH}product-${id}.jpg`;
}

function getProductDescription(product) {

  if (product.collection === "handmade") {
    return `${product.name} — a distinctive Area Boyz piece focused on tailored construction, craftsmanship and statement styling.`;
  }

  if (product.collection === "footwear") {
    return `${product.name} — selected footwear built to complete the fit with everyday street presence.`;
  }

  if (product.collection === "accessories") {
    return `${product.name} — a finishing piece selected to complete and elevate your Area Boyz look.`;
  }

  return `${product.name} — a modern Area Boyz streetwear selection made for expressive everyday style.`;
}


const PRODUCTS = [];

for (
  let number = 1;
  number <= PRODUCT_TOTAL;
  number++
) {

  const id =
    String(number).padStart(3, "0");

  const name =
    PRODUCT_NAMES[id] ||
    `Area Boyz Product ${id}`;

  const brand =
    PRODUCT_BRAND_OVERRIDES[id] ||
    "Area Boyz Select";

  const collection =
    getCollection(id);

  const category =
    getCategory(id);

  const price =
    Number(
      PRODUCT_PRICES[id] ||
      DEFAULT_PRODUCT_PRICE
    );

  PRODUCTS.push({

    id,
    number,
    name,
    brand,
    collection,
    category,
    price,

    image:
      getProductImage(id),

    description:
      getProductDescription({
        id,
        name,
        brand,
        collection,
        category,
        price
      })

  });
}


/* =========================================================
   STATE
   ========================================================= */

const state = {

  products:
    [...PRODUCTS],

  filteredProducts:
    [...PRODUCTS],

  collection:
    "all",

  search:
    "",

  sort:
    "featured",

  cart:
    [],

  heroIndex:
    0,

  heroTimer:
    null

};


/* =========================================================
   HELPERS
   ========================================================= */

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return Array.from(
    document.querySelectorAll(selector)
  );
}

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}

function formatMoney(amount) {

  return (
    CURRENCY_SYMBOL +
    (
      Number(amount) || 0
    ).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    )
  );

}

function getProduct(id) {

  return PRODUCTS.find(
    product =>
      String(product.id) ===
      String(id)
  );

}


/* =========================================================
   IMAGE HANDLING
   ========================================================= */

function markImageFailure(image) {

  image.classList.add(
    "img-failed"
  );

  image.alt =
    `${image.alt || "Product"} image unavailable`;

}

function preloadProductImages() {

  PRODUCTS.forEach(product => {

    const image =
      new Image();

    image.src =
      product.image;

  });

}

function preloadHeroImages() {

  for (
    let i = 1;
    i <= 6;
    i++
  ) {

    const image =
      new Image();

    image.src =
      `${HERO_IMAGE_PATH}hero-${i}.jpg`;

  }

}


/* =========================================================
   HERO
   ========================================================= */

function setupHero() {

  const container =
    $("#heroSlides");

  const dots =
    $("#heroDots");

  if (!container) {
    return;
  }

  const heroImages = [

    "hero-1.jpg",
    "hero-2.jpg",
    "hero-3.jpg",
    "hero-4.jpg",
    "hero-5.jpg",
    "hero-6.jpg"

  ];

  container.innerHTML =
    heroImages
      .map(
        (
          filename,
          index
        ) => `

          <div
            class="hero-slide ${
              index === 0
                ? "active"
                : ""
            }"
          >

            <img
              src="${HERO_IMAGE_PATH}${filename}"
              alt="Area Boyz Enterprise collection ${index + 1}"
              onerror="markImageFailure(this)"
            >

            <div
              class="hero-slide-shade">
            </div>

          </div>

        `
      )
      .join("");

  if (dots) {

    dots.innerHTML =
      heroImages
        .map(
          (_, index) => `

            <button
              type="button"
              class="hero-dot ${
                index === 0
                  ? "active"
                  : ""
              }"
              data-hero-dot="${index}"
              aria-label="Show slide ${
                index + 1
              }"
            ></button>

          `
        )
        .join("");

  }

  const prev =
    $("[data-hero-prev]");

  const next =
    $("[data-hero-next]");

  if (prev) {

    prev.addEventListener(
      "click",
      () => changeHero(-1)
    );

  }

  if (next) {

    next.addEventListener(
      "click",
      () => changeHero(1)
    );

  }

  $all("[data-hero-dot]")
    .forEach(dot => {

      dot.addEventListener(
        "click",
        () => {

          state.heroIndex =
            Number(
              dot.dataset.heroDot
            );

          renderHero();
          restartHeroTimer();

        }
      );

    });

  startHeroTimer();

}


function renderHero() {

  const slides =
    $all(".hero-slide");

  const dots =
    $all(".hero-dot");

  if (!slides.length) {
    return;
  }

  slides.forEach(
    (
      slide,
      index
    ) => {

      slide.classList.toggle(
        "active",
        index ===
        state.heroIndex
      );

    }
  );

  dots.forEach(
    (
      dot,
      index
    ) => {

      dot.classList.toggle(
        "active",
        index ===
        state.heroIndex
      );

    }
  );

}


function changeHero(direction) {

  const slides =
    $all(".hero-slide");

  if (!slides.length) {
    return;
  }

  state.heroIndex =
    (
      state.heroIndex +
      direction +
      slides.length
    ) %
    slides.length;

  renderHero();
  restartHeroTimer();

}


function startHeroTimer() {

  if (state.heroTimer) {

    clearInterval(
      state.heroTimer
    );

  }

  state.heroTimer =
    setInterval(
      () => {
        changeHero(1);
      },
      5000
    );

}


function restartHeroTimer() {

  if (state.heroTimer) {

    clearInterval(
      state.heroTimer
    );

  }

  startHeroTimer();

}


/* =========================================================
   FILTERS
   ========================================================= */

function buildFilters() {

  const filters =
    $("#filters");

  if (!filters) {
    return;
  }

  const options = [

    ["all", "All"],
    ["streetwear", "Streetwear"],
    ["handmade", "Handmade"],
    ["footwear", "Footwear"],
    ["accessories", "Accessories"]

  ];

  filters.innerHTML =
    options
      .map(
        (
          [
            value,
            label
          ]
        ) => `

          <button
            type="button"
            class="filter ${
              state.collection === value
                ? "active"
                : ""
            }"
            data-collection="${value}"
          >
            ${label}
          </button>

        `
      )
      .join("");

  $all("[data-collection]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          state.collection =
            button.dataset.collection;

          saveCollection();

          updateFilterButtons();

          applyFilters();

        }
      );

    });

}


function updateFilterButtons() {

  $all("[data-collection]")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.collection ===
        state.collection
      );

    });

}


function applyFilters() {

  let products =
    [...PRODUCTS];

  const query =
    state.search
      .trim()
      .toLowerCase();

  if (query) {

    products =
      products.filter(
        product => {

          const text = [

            product.id,
            product.name,
            product.brand,
            product.collection,
            product.category

          ]
            .join(" ")
            .toLowerCase();

          return text.includes(
            query
          );

        }
      );

  }

  if (
    state.collection !==
    "all"
  ) {

    products =
      products.filter(
        product =>
          product.collection ===
          state.collection
      );

  }

  switch (
    state.sort
  ) {

    case "low":
    case "price-low":

      products.sort(
        (
          a,
          b
        ) =>
          a.price -
          b.price
      );

      break;

    case "high":
    case "price-high":

      products.sort(
        (
          a,
          b
        ) =>
          b.price -
          a.price
      );

      break;

    case "name":

      products.sort(
        (
          a,
          b
        ) =>
          a.name.localeCompare(
            b.name
          )
      );

      break;

    default:

      products.sort(
        (
          a,
          b
        ) =>
          a.number -
          b.number
      );

      break;

  }

  state.filteredProducts =
    products;

  renderProducts();
  updateResultsMeta();
  updateEmptyState();

}


/* =========================================================
   RESULTS
   ========================================================= */

function updateResultsMeta() {

  const meta =
    $("#resultsMeta");

  if (!meta) {
    return;
  }

  const count =
    state.filteredProducts.length;

  meta.textContent =
    `${count} ${
      count === 1
        ? "product"
        : "products"
    } shown`;

}


/* =========================================================
   EMPTY STATE
   ========================================================= */

function updateEmptyState() {

  const empty =
    $("#emptyState");

  const grid =
    $("#productGrid");

  if (
    !empty ||
    !grid
  ) {
    return;
  }

  const hasProducts =
    state.filteredProducts.length >
    0;

  empty.classList.toggle(
    "hidden",
    hasProducts
  );

  grid.style.display =
    hasProducts
      ? ""
      : "none";

}


/* =========================================================
   PRODUCT CARDS
   ========================================================= */

function createProductCard(
  product
) {

  const collectionLabel =
    product.collection
      .charAt(0)
      .toUpperCase() +
    product.collection.slice(1);

  return `

    <article
      class="product-card"
    >

      <button
        type="button"
        class="product-media"
        data-product-view="${product.id}"
        aria-label="View ${
          escapeHTML(
            product.name
          )
        }"
      >

        <img
          src="${escapeHTML(
            product.image
          )}"
          alt="${escapeHTML(
            product.name
          )}"
          loading="lazy"
          onerror="markImageFailure(this)"
        >

        <span>
          ${escapeHTML(
            collectionLabel
          )}
        </span>

      </button>


      <div
        class="product-body"
      >

        <p
          class="product-number"
        >
          ${escapeHTML(
            product.brand
          )}
          ·
          ${product.id}
        </p>


        <h3>
          ${escapeHTML(
            product.name
          )}
        </h3>


        <p>
          ${escapeHTML(
            product.description
          )}
        </p>


        <div
          class="product-row"
        >

          <strong>
            ${formatMoney(
              product.price
            )}
          </strong>


          <button
            type="button"
            class="mini-btn"
            data-add-to-cart="${product.id}"
          >
            Add to bag
          </button>

        </div>

      </div>

    </article>

  `;

}


function renderProducts() {

  const grid =
    $("#productGrid");

  if (!grid) {
    return;
  }

  grid.innerHTML =
    state.filteredProducts
      .map(
        createProductCard
      )
      .join("");

  updateEmptyState();

}


/* =========================================================
   SEARCH
   ========================================================= */

function setupSearch() {

  const button =
    $("#searchBtn");

  const panel =
    $("#searchPanel");

  const input =
    $("#searchInput");

  const close =
    $("#searchClose");

  if (
    button &&
    panel
  ) {

    button.addEventListener(
      "click",
      () => {

        panel.classList.toggle(
          "open"
        );

        if (
          panel.classList.contains(
            "open"
          ) &&
          input
        ) {

          input.focus();

        }

      }
    );

  }

  if (
    close &&
    panel
  ) {

    close.addEventListener(
      "click",
      () => {

        panel.classList.remove(
          "open"
        );

      }
    );

  }

  if (input) {

    input.addEventListener(
      "input",
      event => {

        state.search =
          event.target.value;

        applyFilters();

      }
    );

  }

}


/* =========================================================
   SORT
   ========================================================= */

function setupSort() {

  const sort =
    $("#sort");

  if (!sort) {
    return;
  }

  sort.addEventListener(
    "change",
    event => {

      state.sort =
        event.target.value;

      applyFilters();

    }
  );

}


/* =========================================================
   CLEAR FILTERS
   ========================================================= */

function setupClearFilters() {

  const button =
    $("#clearFilters");

  if (!button) {
    return;
  }

  button.addEventListener(
    "click",
    () => {

      state.collection =
        "all";

      state.search =
        "";

      state.sort =
        "featured";

      const input =
        $("#searchInput");

      const sort =
        $("#sort");

      if (input) {
        input.value = "";
      }

      if (sort) {
        sort.value =
          "featured";
      }

      saveCollection();

      updateFilterButtons();

      applyFilters();

    }
  );

}


/* =========================================================
   PRODUCT MODAL
   ========================================================= */

function openProductModal(id) {

  const product =
    getProduct(id);

  const modal =
    $("#productModal");

  const content =
    $("#modalContent");

  if (
    !product ||
    !modal ||
    !content
  ) {
    return;
  }

  content.innerHTML = `

    <div
      class="modal-product"
    >

      <div
        class="modal-product-image"
      >

        <img
          src="${escapeHTML(
            product.image
          )}"
          alt="${escapeHTML(
            product.name
          )}"
          onerror="markImageFailure(this)"
        >

      </div>


      <div
        class="modal-product-info"
      >

        <p
          class="eyebrow"
        >
          ${escapeHTML(
            product.brand
          )}
        </p>


        <h2>
          ${escapeHTML(
            product.name
          )}
        </h2>


        <strong
          class="modal-price"
        >
          ${formatMoney(
            product.price
          )}
        </strong>


        <p>
          ${escapeHTML(
            product.description
          )}
        </p>


        <div
          class="modal-meta"
        >

          <span>
            Collection:
            <b>
              ${escapeHTML(
                product.collection
              )}
            </b>
          </span>


          <span>
            Product:
            <b>
              #${escapeHTML(
                product.id
              )}
            </b>
          </span>

        </div>


        <button
          type="button"
          class="btn dark"
          data-add-to-cart="${product.id}"
        >
          Add to bag
        </button>

      </div>

    </div>

  `;

  modal.classList.add(
    "open"
  );

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "modal-open"
  );

}


function closeProductModal() {

  const modal =
    $("#productModal");

  if (!modal) {
    return;
  }

  modal.classList.remove(
    "open"
  );

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "modal-open"
  );

}


function setupProductActions() {

  document.addEventListener(
    "click",
    event => {

      const view =
        event.target.closest(
          "[data-product-view]"
        );

      if (view) {

        openProductModal(
          view.dataset.productView
        );

        return;
      }

      if (
        event.target.closest(
          "[data-close-modal]"
        )
      ) {

        closeProductModal();

        return;
      }

      const add =
        event.target.closest(
          "[data-add-to-cart]"
        );

      if (add) {

        addToCart(
          add.dataset.addToCart
        );

      }

    }
  );

}


/* =========================================================
   CART
   ========================================================= */

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

    if (
      !Array.isArray(parsed)
    ) {

      state.cart = [];

      return;

    }

    state.cart =
      parsed.filter(
        item =>
          item &&
          item.id &&
          Number(
            item.quantity
          ) > 0
      );

  } catch (error) {

    console.warn(
      "Could not load cart:",
      error
    );

    state.cart = [];

  }

}


function saveCart() {

  try {

    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(
        state.cart
      )
    );

  } catch (error) {

    console.warn(
      "Could not save cart:",
      error
    );

  }

}


function addToCart(id) {

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
      1;

  } else {

    state.cart.push({

      id:
        product.id,

      name:
        product.name,

      price:
        product.price,

      image:
        product.image,

      quantity:
        1

    });

  }

  saveCart();

  renderCart();

  updateCartCount();

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

  renderCart();

  updateCartCount();

}


function changeQuantity(
  id,
  amount
) {

  const item =
    state.cart.find(
      cartItem =>
        String(
          cartItem.id
        ) ===
        String(id)
    );

  if (!item) {
    return;
  }

  item.quantity +=
    amount;

  if (
    item.quantity <= 0
  ) {

    removeFromCart(id);

    return;

  }

  saveCart();

  renderCart();

  updateCartCount();

}


function getCartCount() {

  return state.cart.reduce(
    (
      total,
      item
    ) =>
      total +
      Number(
        item.quantity
      ),
    0
  );

}


function getCartTotal() {

  return state.cart.reduce(
    (
      total,
      item
    ) =>
      total +
      (
        Number(
          item.price
        ) *
        Number(
          item.quantity
        )
      ),
    0
  );

}


function updateCartCount() {

  const count =
    $("#cartCount");

  if (count) {

    count.textContent =
      getCartCount();

  }

}


function renderCart() {

  const container =
    $("#cartItems");

  const total =
    $("#cartTotal");

  if (!container) {
    return;
  }

  if (
    !state.cart.length
  ) {

    container.innerHTML = `

      <div
        class="cart-empty"
      >

        <i
          class="fa-solid fa-bag-shopping"
        ></i>

        <h3>
          Your bag is empty.
        </h3>

        <p>
          Add something from
          the catalogue.
        </p>

      </div>

    `;

    if (total) {

      total.textContent =
        formatMoney(0);

    }

    return;

  }

  container.innerHTML =
    state.cart
      .map(
        item => `

          <div
            class="cart-item"
          >

            <img
              src="${escapeHTML(
                item.image
              )}"
              alt="${escapeHTML(
                item.name
              )}"
              onerror="markImageFailure(this)"
            >


            <div
              class="cart-item-info"
            >

              <strong>
                ${escapeHTML(
                  item.name
                )}
              </strong>

              <span>
                ${formatMoney(
                  item.price
                )}
              </span>


              <div
                class="cart-qty"
              >

                <button
                  type="button"
                  data-cart-minus="${item.id}"
                >
                  −
                </button>


                <span>
                  ${item.quantity}
                </span>


                <button
                  type="button"
                  data-cart-plus="${item.id}"
                >
                  +
                </button>

              </div>

            </div>


            <button
              type="button"
              data-cart-remove="${item.id}"
              aria-label="Remove item"
            >

              <i
                class="fa-solid fa-trash"
              ></i>

            </button>

          </div>

        `
      )
      .join("");

  if (total) {

    total.textContent =
      formatMoney(
        getCartTotal()
      );

  }

}


function openCart() {

  const drawer =
    $("#cartDrawer");

  const backdrop =
    $("#drawerBackdrop");

  if (drawer) {

    drawer.classList.add(
      "open"
    );

    drawer.setAttribute(
      "aria-hidden",
      "false"
    );

  }

  if (backdrop) {

    backdrop.classList.add(
      "open"
    );

  }

  document.body.classList.add(
    "drawer-open"
  );

}


function closeCart() {

  const drawer =
    $("#cartDrawer");

  const backdrop =
    $("#drawerBackdrop");

  if (drawer) {

    drawer.classList.remove(
      "open"
    );

    drawer.setAttribute(
      "aria-hidden",
      "true"
    );

  }

  if (backdrop) {

    backdrop.classList.remove(
      "open"
    );

  }

  document.body.classList.remove(
    "drawer-open"
  );

}


function setupCart() {

  const cartButton =
    $("#cartBtn");

  const cartClose =
    $("#cartClose");

  const backdrop =
    $("#drawerBackdrop");

  if (cartButton) {

    cartButton.addEventListener(
      "click",
      openCart
    );

  }

  if (cartClose) {

    cartClose.addEventListener(
      "click",
      closeCart
    );

  }

  if (backdrop) {

    backdrop.addEventListener(
      "click",
      closeCart
    );

  }

  document.addEventListener(
    "click",
    event => {

      const plus =
        event.target.closest(
          "[data-cart-plus]"
        );

      const minus =
        event.target.closest(
          "[data-cart-minus]"
        );

      const remove =
        event.target.closest(
          "[data-cart-remove]"
        );

      if (plus) {

        changeQuantity(
          plus.dataset.cartPlus,
          1
        );

        return;

      }

      if (minus) {

        changeQuantity(
          minus.dataset.cartMinus,
          -1
        );

        return;

      }

      if (remove) {

        removeFromCart(
          remove.dataset.cartRemove
        );

      }

    }
  );

}


/* =========================================================
   MOBILE NAV
   ========================================================= */

function setupMobileNav() {

  const button =
    $("#menuBtn");

  const nav =
    $("#mobileNav");

  if (
    !button ||
    !nav
  ) {
    return;
  }

  button.addEventListener(
    "click",
    () => {

      const open =
        nav.classList.toggle(
          "open"
        );

      button.setAttribute(
        "aria-expanded",
        String(open)
      );

    }
  );

  $all(
    "#mobileNav a"
  ).forEach(
    link => {

      link.addEventListener(
        "click",
        () => {

          nav.classList.remove(
            "open"
          );

          button.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    }
  );

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
    () => {

      preloader.classList.add(
        "hide"
      );

    },
    350
  );

}


/* =========================================================
   YEAR
   ========================================================= */

function setupYear() {

  $all("#year")
    .forEach(
      element => {

        element.textContent =
          new Date()
            .getFullYear();

      }
    );

}


/* =========================================================
   COLLECTION STORAGE
   ========================================================= */

function saveCollection() {

  try {

    localStorage.setItem(
      COLLECTION_STORAGE_KEY,
      state.collection
    );

  } catch (error) {

    console.warn(
      "Could not save collection:",
      error
    );

  }

}


function loadCollection() {

  try {

    const saved =
      localStorage.getItem(
        COLLECTION_STORAGE_KEY
      );

    if (

      saved ===
        "streetwear" ||

      saved ===
        "handmade" ||

      saved ===
        "footwear" ||

      saved ===
        "accessories"

    ) {

      state.collection =
        saved;

    }

  } catch (error) {

    console.warn(
      "Could not load collection:",
      error
    );

  }

  const params =
    new URLSearchParams(
      window.location.search
    );

  const collection =
    params.get(
      "collection"
    );

  if (

    collection ===
      "streetwear" ||

    collection ===
      "handmade" ||

    collection ===
      "footwear" ||

    collection ===
      "accessories"

  ) {

    state.collection =
      collection;

  }

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

  const toast =
    $("#toast");

  if (!toast) {
    return;
  }

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    toast._timer
  );

  toast._timer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2500
    );

}


/* =========================================================
   FLUTTERWAVE
   ========================================================= */

const FLUTTERWAVE_PUBLIC_KEY =
  "FLWPUBK_TEST-REPLACE_WITH_YOUR_PUBLIC_KEY";


function setupCheckout() {

  const button =
    $("#checkoutBtn");

  if (!button) {
    return;
  }

  button.addEventListener(
    "click",
    async () => {

      if (
        !state.cart.length
      ) {

        showToast(
          "Your bag is empty."
        );

        return;

      }

      showToast(
        "Checkout is ready for Flutterwave configuration."
      );

      /*
        IMPORTANT:

        All store purchases are USD.

        Flutterwave transaction currency:
        currency: "USD"

        NEVER put the Flutterwave secret key
        inside this frontend JavaScript file.

        Server-side verification remains required.
      */

    }
  );

}


/* =========================================================
   KEYBOARD CONTROLS
   ========================================================= */

function setupKeyboardControls() {

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key !==
        "Escape"
      ) {
        return;
      }

      closeProductModal();

      closeCart();

      const panel =
        $("#searchPanel");

      if (panel) {

        panel.classList.remove(
          "open"
        );

      }

    }
  );

}


/* =========================================================
   REVEAL ANIMATIONS
   ========================================================= */

function setupReveal() {

  const elements =
    $all(".hidden");

  if (!elements.length) {
    return;
  }

  if (
    !(
      "IntersectionObserver"
      in window
    )
  ) {

    elements.forEach(
      element => {

        element.classList.add(
          "active"
        );

      }
    );

    return;

  }

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }

            entry.target.classList.add(
              "active"
            );

            observer.unobserve(
              entry.target
            );

          }
        );

      },
      {
        threshold:
          0.12
      }
    );

  elements.forEach(
    element => {

      observer.observe(
        element
      );

    }
  );

}


/* =========================================================
   HEADER SCROLL
   ========================================================= */

function setupHeaderScroll() {

  const header =
    $(".header");

  if (!header) {
    return;
  }

  const update =
    () => {

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
   GLOBAL IMAGE ERROR HANDLER
   ========================================================= */

function setupGlobalImageErrors() {

  document.addEventListener(
    "error",
    event => {

      if (

        event.target &&
        event.target.tagName ===
          "IMG"

      ) {

        markImageFailure(
          event.target
        );

      }

    },
    true
  );

}


/* =========================================================
   PUBLIC STORE API
   ========================================================= */

window.AreaBoyzStore = {

  products:
    PRODUCTS,

  getProduct:
    getProduct,

  addToCart:
    addToCart,

  removeFromCart:
    removeFromCart,

  changeQuantity:
    changeQuantity,

  openCart:
    openCart,

  closeCart:
    closeCart,

  getCartCount:
    getCartCount,

  getCartTotal:
    getCartTotal,

  formatMoney:
    formatMoney

};


/* =========================================================
   INITIALIZATION
   ========================================================= */

function init() {

  loadCart();

  loadCollection();

  setupYear();

  setupHero();

  buildFilters();

  setupSearch();

  setupSort();

  setupClearFilters();

  setupProductActions();

  setupCart();

  setupCheckout();

  setupMobileNav();

  setupKeyboardControls();

  setupHeaderScroll();

  setupReveal();

  setupGlobalImageErrors();

  updateCartCount();

  renderCart();

  updateFilterButtons();

  applyFilters();

  preloadHeroImages();

  preloadProductImages();

  hidePreloader();

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
