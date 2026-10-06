"use strict";


/* =========================================================
   AREA BOYZ ENTERPRISE
   STORE ENGINE
   ========================================================= */


/* =========================================================
   SITE ROOT + IMAGE PATHS
   ========================================================= */

const SITE_ROOT =
  new URL(
    "../",
    document.currentScript.src
  ).href;


const PATHS = {

  hero:
    `${SITE_ROOT}images/hero/`,

  products:
    `${SITE_ROOT}images/products/`,

  categories:
    `${SITE_ROOT}images/categories/`,

  collections:
    `${SITE_ROOT}images/collections/`

};


/* =========================================================
   STORE SETTINGS
   ========================================================= */

const PRODUCT_TOTAL = 109;

const DEFAULT_PRODUCT_PRICE = 45000;

const CURRENCY_SYMBOL = "₦";

const CART_STORAGE_KEY =
  "areaBoyzCart";

const COLLECTION_STORAGE_KEY =
  "areaBoyzCollection";


/* =========================================================
   COLLECTIONS
   ========================================================= */

const CATEGORIES = [

  "all",

  "streetwear",

  "handmade",

  "footwear",

  "accessories"

];


/* =========================================================
   PRODUCT CATALOG OVERRIDES
   ========================================================= */

const PRODUCT_CATALOG_OVERRIDES = {

  "001": {
    name:
      "Black Structured Tailored Long Coat",
    collection:
      "handmade"
  },

  "012": {
    name:
      "White Traditional Tailored Set",
    collection:
      "handmade"
  },

  "013": {
    name:
      "Brown Tailored Suit Set",
    collection:
      "handmade"
  },

  "014": {
    name:
      "Brown Traditional Two-Piece Set",
    collection:
      "handmade"
  },

  "017": {
    name:
      "Red & Brown Tailored Wrap Skirt Set",
    collection:
      "handmade"
  },

  "020": {
    name:
      "Brown Tailored Two-Piece Suit",
    collection:
      "handmade"
  },

  "021": {
    name:
      "Blue Embellished Tailored Dress",
    collection:
      "handmade"
  },

  "022": {
    name:
      "Layered Tailored Statement Pieces",
    collection:
      "handmade"
  },

  "030": {
    name:
      "Black Tailored Formal Suit",
    collection:
      "handmade"
  },

  "054": {
    name:
      "Black Formal Tailored Suit",
    collection:
      "handmade"
  },

  "080": {
    name:
      "Patchwork Striped Tailored Jacket",
    collection:
      "handmade"
  },


  /* CLEARLY IDENTIFIABLE BRANDS */

  "005": {
    name:
      "Kanye West Graphic T-Shirt",
    brand:
      "Kanye West"
  },

  "086": {
    name:
      "Supreme Graphic Hoodie",
    brand:
      "Supreme"
  },


  /* DESCRIPTIVE NAMES */

  "007": {
    name:
      "Blue & White Athletic Sneaker"
  },

  "008": {
    name:
      "Black & White Strap High-Top"
  },

  "016": {
    name:
      "Neutral Cap Collection"
  },

  "028": {
    name:
      "Black Structured Mini Bag"
  },

  "036": {
    name:
      "Decorative Beaded Neckpiece"
  },

  "038": {
    name:
      "Gray Structured Shoulder Bag"
  },

  "039": {
    name:
      "Spider Graphic T-Shirt"
  },

  "041": {
    name:
      "Blue Charm Clogs"
  },

  "043": {
    name:
      "Multicolor Knit Beanie"
  },

  "044": {
    name:
      "Printed Graphic Cap"
  },

  "048": {
    name:
      "Green Graphic Bucket Hat"
  },

  "049": {
    name:
      "Black Graphic Beanie"
  },

  "051": {
    name:
      "Heavy Black Utility Footwear"
  },

  "059": {
    name:
      "Brown Leather-Style Tote Bag"
  },

  "062": {
    name:
      "Brown Rugged Lace-Up Boots"
  },

  "063": {
    name:
      "Red Low-Top Sneakers"
  },

  "064": {
    name:
      "Black Leather-Style Backpack"
  },

  "066": {
    name:
      "Cream Sculptural Footwear"
  },

  "069": {
    name:
      "Red & Black Varsity Jacket"
  },

  "072": {
    name:
      "Black Padded Gloves"
  },

  "074": {
    name:
      "Orange & White Graphic Sneakers"
  },

  "075": {
    name:
      "Red High-Top Sneakers"
  },

  "076": {
    name:
      "Black White & Red High-Top"
  },

  "079": {
    name:
      "Tan Western Graphic Jacket"
  },

  "082": {
    name:
      "Tan Western Graphic Jacket"
  },

  "083": {
    name:
      "Multicolor Graphic Jacket"
  },

  "087": {
    name:
      "Black Embossed Card Wallet"
  },

  "089": {
    name:
      "Black Knit Beanie"
  },

  "092": {
    name:
      "White Utility Wide-Leg Trousers"
  },

  "093": {
    name:
      "Colorful Charm Clogs"
  },

  "095": {
    name:
      "Light Blue Patterned Cap"
  },

  "102": {
    name:
      "Brown Rugged Leather-Style Boot"
  },

  "103": {
    name:
      "Mixed Sneaker Selection"
  },

  "104": {
    name:
      "Mixed Sneaker Display"
  },

  "108": {
    name:
      "White & Blue Running Sneaker"
  },

  "109": {
    name:
      "Brown Leather Dress Shoe"
  }

};


/* =========================================================
   DEFAULT PRODUCT NAMES
   ========================================================= */

const DEFAULT_PRODUCT_NAMES = {

  "001": "Area Boyz Statement Piece",
  "002": "Urban Graphic Tee",
  "003": "Classic Street Tee",
  "004": "Everyday Graphic Tee",
  "005": "Kanye West Graphic T-Shirt",
  "006": "Urban Casual Tee",
  "007": "Blue & White Athletic Sneaker",
  "008": "Black & White Strap High-Top",
  "009": "Classic Streetwear Piece",
  "010": "Urban Essential",
  "011": "Modern Casual Piece",
  "012": "White Traditional Tailored Set",
  "013": "Brown Tailored Suit Set",
  "014": "Brown Traditional Two-Piece Set",
  "015": "Modern Streetwear Piece",
  "016": "Neutral Cap Collection",
  "017": "Red & Brown Tailored Wrap Skirt Set",
  "018": "Urban Statement Piece",
  "019": "Everyday Streetwear",
  "020": "Brown Tailored Two-Piece Suit",
  "021": "Blue Embellished Tailored Dress",
  "022": "Layered Tailored Statement Pieces",
  "023": "Urban Essential",
  "024": "Graphic Streetwear Tee",
  "025": "Modern Casual Wear",
  "026": "Street Style Essential",
  "027": "Urban Statement Wear",
  "028": "Black Structured Mini Bag",
  "029": "Modern Streetwear",
  "030": "Black Tailored Formal Suit",
  "031": "Urban Graphic Piece",
  "032": "Streetwear Essential",
  "033": "Modern Casual Piece",
  "034": "Urban Statement Piece",
  "035": "Area Boyz Select Piece",
  "036": "Decorative Beaded Neckpiece",
  "037": "Urban Streetwear Piece",
  "038": "Gray Structured Shoulder Bag",
  "039": "Spider Graphic T-Shirt",
  "040": "Graphic Streetwear Piece",
  "041": "Blue Charm Clogs",
  "042": "Urban Accessory",
  "043": "Multicolor Knit Beanie",
  "044": "Printed Graphic Cap",
  "045": "Streetwear Accessory",
  "046": "Urban Essential",
  "047": "Graphic Streetwear",
  "048": "Green Graphic Bucket Hat",
  "049": "Black Graphic Beanie",
  "050": "Urban Statement Piece",
  "051": "Heavy Black Utility Footwear",
  "052": "Streetwear Essential",
  "053": "Urban Casual Piece",
  "054": "Black Formal Tailored Suit",
  "055": "Modern Streetwear",
  "056": "Urban Essential",
  "057": "Graphic Streetwear",
  "058": "Casual Streetwear Piece",
  "059": "Brown Leather-Style Tote Bag",
  "060": "Urban Accessory",
  "061": "Streetwear Essential",
  "062": "Brown Rugged Lace-Up Boots",
  "063": "Red Low-Top Sneakers",
  "064": "Black Leather-Style Backpack",
  "065": "Urban Streetwear",
  "066": "Cream Sculptural Footwear",
  "067": "Modern Casual Piece",
  "068": "Urban Essential",
  "069": "Red & Black Varsity Jacket",
  "070": "Streetwear Essential",
  "071": "Urban Accessory",
  "072": "Black Padded Gloves",
  "073": "Modern Streetwear",
  "074": "Orange & White Graphic Sneakers",
  "075": "Red High-Top Sneakers",
  "076": "Black White & Red High-Top",
  "077": "Urban Streetwear",
  "078": "Modern Casual Piece",
  "079": "Tan Western Graphic Jacket",
  "080": "Patchwork Striped Tailored Jacket",
  "081": "Urban Statement Jacket",
  "082": "Tan Western Graphic Jacket",
  "083": "Multicolor Graphic Jacket",
  "084": "Streetwear Essential",
  "085": "Urban Graphic Piece",
  "086": "Supreme Graphic Hoodie",
  "087": "Black Embossed Card Wallet",
  "088": "Urban Accessory",
  "089": "Black Knit Beanie",
  "090": "Streetwear Essential",
  "091": "Urban Casual Piece",
  "092": "White Utility Wide-Leg Trousers",
  "093": "Colorful Charm Clogs",
  "094": "Urban Accessory",
  "095": "Light Blue Patterned Cap",
  "096": "Modern Streetwear",
  "097": "Urban Essential",
  "098": "Streetwear Statement Piece",
  "099": "Modern Casual Wear",
  "100": "Urban Essential",
  "101": "Streetwear Footwear",
  "102": "Brown Rugged Leather-Style Boot",
  "103": "Mixed Sneaker Selection",
  "104": "Mixed Sneaker Display",
  "105": "Urban Footwear",
  "106": "Streetwear Essential",
  "107": "Modern Casual Piece",
  "108": "White & Blue Running Sneaker",
  "109": "Brown Leather Dress Shoe"

};


/* =========================================================
   CATEGORY OVERRIDES
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
  "072": "accessories",
  "087": "accessories",
  "089": "accessories",
  "095": "accessories",

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
  "080": "handmade"

};


/* =========================================================
   COLLECTION OVERRIDES
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
  "080": "handmade"

};


/* =========================================================
   BRAND OVERRIDES
   ========================================================= */

const PRODUCT_BRAND_OVERRIDES = {

  "005": "Kanye West",

  "086": "Supreme"

};


/* =========================================================
   EXISTING VISUAL PRODUCT DATA
   ========================================================= */

const VISUAL_PRODUCT_DATA = {

  "001": { category: "men", price: 85000 },
  "002": { category: "men", price: 42000 },
  "003": { category: "men", price: 38000 },
  "004": { category: "men", price: 45000 },
  "005": { category: "men", price: 48000 },
  "006": { category: "men", price: 40000 },
  "007": { category: "footwear", price: 65000 },
  "008": { category: "footwear", price: 72000 },
  "009": { category: "men", price: 45000 },
  "010": { category: "men", price: 42000 },
  "011": { category: "men", price: 46000 },
  "012": { category: "women", price: 78000 },
  "013": { category: "men", price: 95000 },
  "014": { category: "men", price: 88000 },
  "015": { category: "men", price: 45000 },
  "016": { category: "accessories", price: 25000 },
  "017": { category: "women", price: 82000 },
  "018": { category: "men", price: 45000 },
  "019": { category: "men", price: 40000 },
  "020": { category: "men", price: 92000 },
  "021": { category: "women", price: 88000 },
  "022": { category: "women", price: 90000 },
  "023": { category: "men", price: 43000 },
  "024": { category: "men", price: 44000 },
  "025": { category: "men", price: 42000 },
  "026": { category: "men", price: 40000 },
  "027": { category: "men", price: 47000 },
  "028": { category: "accessories", price: 55000 },
  "029": { category: "men", price: 43000 },
  "030": { category: "men", price: 98000 },
  "031": { category: "men", price: 44000 },
  "032": { category: "men", price: 42000 },
  "033": { category: "men", price: 45000 },
  "034": { category: "men", price: 48000 },
  "035": { category: "men", price: 45000 },
  "036": { category: "accessories", price: 30000 },
  "037": { category: "men", price: 45000 },
  "038": { category: "accessories", price: 58000 },
  "039": { category: "men", price: 46000 },
  "040": { category: "men", price: 43000 },
  "041": { category: "footwear", price: 62000 },
  "042": { category: "accessories", price: 28000 },
  "043": { category: "accessories", price: 22000 },
  "044": { category: "accessories", price: 24000 },
  "045": { category: "accessories", price: 26000 },
  "046": { category: "men", price: 42000 },
  "047": { category: "men", price: 44000 },
  "048": { category: "accessories", price: 28000 },
  "049": { category: "accessories", price: 22000 },
  "050": { category: "men", price: 45000 },
  "051": { category: "footwear", price: 76000 },
  "052": { category: "men", price: 43000 },
  "053": { category: "men", price: 42000 },
  "054": { category: "men", price: 98000 },
  "055": { category: "men", price: 44000 },
  "056": { category: "men", price: 42000 },
  "057": { category: "men", price: 45000 },
  "058": { category: "men", price: 42000 },
  "059": { category: "accessories", price: 58000 },
  "060": { category: "accessories", price: 26000 },
  "061": { category: "men", price: 43000 },
  "062": { category: "footwear", price: 78000 },
  "063": { category: "footwear", price: 65000 },
  "064": { category: "accessories", price: 52000 },
  "065": { category: "men", price: 45000 },
  "066": { category: "footwear", price: 68000 },
  "067": { category: "men", price: 43000 },
  "068": { category: "men", price: 42000 },
  "069": { category: "men", price: 72000 },
  "070": { category: "men", price: 44000 },
  "071": { category: "accessories", price: 26000 },
  "072": { category: "accessories", price: 22000 },
  "073": { category: "men", price: 43000 },
  "074": { category: "footwear", price: 65000 },
  "075": { category: "footwear", price: 68000 },
  "076": { category: "footwear", price: 72000 },
  "077": { category: "men", price: 45000 },
  "078": { category: "men", price: 43000 },
  "079": { category: "men", price: 70000 },
  "080": { category: "men", price: 76000 },
  "081": { category: "men", price: 65000 },
  "082": { category: "men", price: 70000 },
  "083": { category: "men", price: 72000 },
  "084": { category: "men", price: 44000 },
  "085": { category: "men", price: 46000 },
  "086": { category: "men", price: 68000 },
  "087": { category: "accessories", price: 30000 },
  "088": { category: "accessories", price: 26000 },
  "089": { category: "accessories", price: 22000 },
  "090": { category: "men", price: 44000 },
  "091": { category: "men", price: 42000 },
  "092": { category: "men", price: 55000 },
  "093": { category: "footwear", price: 62000 },
  "094": { category: "accessories", price: 26000 },
  "095": { category: "accessories", price: 24000 },
  "096": { category: "men", price: 43000 },
  "097": { category: "men", price: 42000 },
  "098": { category: "men", price: 46000 },
  "099": { category: "men", price: 43000 },
  "100": { category: "men", price: 45000 },
  "101": { category: "footwear", price: 62000 },
  "102": { category: "footwear", price: 78000 },
  "103": { category: "footwear", price: 65000 },
  "104": { category: "footwear", price: 65000 },
  "105": { category: "footwear", price: 62000 },
  "106": { category: "men", price: 43000 },
  "107": { category: "men", price: 42000 },
  "108": { category: "footwear", price: 65000 },
  "109": { category: "footwear", price: 70000 }

};


/* =========================================================
   COLLECTION DETECTION
   ========================================================= */

function getDefaultCollection(
  category,
  number
){

  const id =
    String(number).padStart(
      3,
      "0"
    );


  if(
    PRODUCT_COLLECTION_OVERRIDES[id]
  ){

    return PRODUCT_COLLECTION_OVERRIDES[id];

  }


  if(
    PRODUCT_CATEGORY_OVERRIDES[id]
  ){

    return PRODUCT_CATEGORY_OVERRIDES[id];

  }


  if(
    category === "footwear"
  ){

    return "footwear";

  }


  if(
    category === "accessories"
  ){

    return "accessories";

  }


  return "streetwear";

}


/* =========================================================
   DESCRIPTIONS
   ========================================================= */

function createProductDescription(
  name,
  collection,
  category
){

  if(
    collection === "handmade"
  ){

    return (
      `${name} — a structured Area Boyz selection ` +
      `focused on tailored construction, distinctive ` +
      `silhouette and statement styling.`
    );

  }


  if(
    collection === "footwear"
  ){

    return (
      `${name} — footwear selected for everyday ` +
      `styling, movement and street presence.`
    );

  }


  if(
    collection === "accessories"
  ){

    return (
      `${name} — a versatile accessory selected to ` +
      `complete and elevate your Area Boyz look.`
    );

  }


  return (
    `${name} — a modern Area Boyz streetwear selection ` +
    `built for expressive everyday style.`
  );

}


/* =========================================================
   DETAILS
   ========================================================= */

function createProductDetails(
  name,
  brand,
  category,
  collection
){

  return [

    {
      label:
        "Brand",

      value:
        brand
    },

    {
      label:
        "Category",

      value:
        category
    },

    {
      label:
        "Collection",

      value:
        collection
    },

    {
      label:
        "Style",

      value:
        name
    }

  ];

}


/* =========================================================
   BUILD PRODUCTS
   ========================================================= */

const PRODUCTS = [];


for(
  let number = 1;
  number <= PRODUCT_TOTAL;
  number++
){

  const id =
    String(number).padStart(
      3,
      "0"
    );


  const visual =
    VISUAL_PRODUCT_DATA[id] ||
    {};


  const override =
    PRODUCT_CATALOG_OVERRIDES[id] ||
    {};


  const name =
    override.name ||
    DEFAULT_PRODUCT_NAMES[id] ||
    `Area Boyz Product ${id}`;


  const brand =
    override.brand ||
    PRODUCT_BRAND_OVERRIDES[id] ||
    "Area Boyz Select";


  const category =
    override.category ||
    PRODUCT_CATEGORY_OVERRIDES[id] ||
    visual.category ||
    "men";


  const collection =
    override.collection ||
    PRODUCT_COLLECTION_OVERRIDES[id] ||
    getDefaultCollection(
      category,
      number
    );


  const price =
    override.price ||
    visual.price ||
    DEFAULT_PRODUCT_PRICE;


  PRODUCTS.push({

    id,

    number,

    name,

    brand,

    category,

    collection,

    price,

    image:
      `${PATHS.products}product-${id}.jpg`,

    description:
      createProductDescription(
        name,
        collection,
        category
      ),

    details:
      createProductDetails(
        name,
        brand,
        category,
        collection
      )

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

  category:
    "all",

  collection:
    "all",

  search:
    "",

  sort:
    "featured",

  cart:
    [],

  currentProduct:
    null

};


/* =========================================================
   HELPERS
   ========================================================= */

function $(
  selector
){

  return document.querySelector(
    selector
  );

}


function $all(
  selector
){

  return Array.from(
    document.querySelectorAll(
      selector
    )
  );

}


function escapeHTML(
  value
){

  return String(
    value ?? ""
  )

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}


function formatMoney(
  amount
){

  return (
    CURRENCY_SYMBOL +
    Number(
      amount || 0
    ).toLocaleString(
      "en-NG"
    )
  );

}


function getProduct(
  id
){

  return PRODUCTS.find(
    product =>
      String(
        product.id
      ) ===
      String(
        id
      )
  );

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(
  message
){

  const toast =
    $("#toast");


  if(!toast){

    return;

  }


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    showToast.timer
  );


  showToast.timer =
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
   YEAR
   ========================================================= */

function updateYear(){

  const year =
    $("#year");


  if(year){

    year.textContent =
      new Date()
        .getFullYear();

  }

}


/* =========================================================
   PRELOADER
   ========================================================= */

function hidePreloader(){

  const preloader =
    $("#preloader");


  if(!preloader){

    return;

  }


  setTimeout(
    () => {

      preloader.classList.add(
        "hide"
      );

    },
    450
  );

}


/* =========================================================
   CART STORAGE
   ========================================================= */

function loadCart(){

  try{

    const saved =
      localStorage.getItem(
        CART_STORAGE_KEY
      );


    state.cart =
      saved
        ? JSON.parse(saved)
        : [];


    if(
      !Array.isArray(
        state.cart
      )
    ){

      state.cart = [];

    }

  }catch(error){

    console.warn(
      "Unable to load cart:",
      error
    );

    state.cart = [];

  }

}


function saveCart(){

  try{

    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(
        state.cart
      )
    );

  }catch(error){

    console.warn(
      "Unable to save cart:",
      error
    );

  }

}


/* =========================================================
   CART COUNT
   ========================================================= */

function getCartCount(){

  return state.cart.reduce(
    (
      total,
      item
    ) =>
      total +
      Number(
        item.quantity || 0
      ),
    0
  );

}


function getCartTotal(){

  return state.cart.reduce(
    (
      total,
      item
    ) =>
      total +
      Number(
        item.price || 0
      ) *
      Number(
        item.quantity || 0
      ),
    0
  );

}


function updateCartCount(){

  const badge =
    $("#cartCount");


  if(badge){

    badge.textContent =
      getCartCount();

  }

}


/* =========================================================
   ADD TO CART
   ========================================================= */

function addToCart(
  id,
  quantity = 1
){

  const product =
    getProduct(id);


  if(!product){

    return;

  }


  const existing =
    state.cart.find(
      item =>
        String(
          item.id
        ) ===
        String(
          id
        )
    );


  if(existing){

    existing.quantity +=
      Number(
        quantity
      );

  }else{

    state.cart.push({

      id:
        product.id,

      name:
        product.name,

      brand:
        product.brand,

      price:
        product.price,

      image:
        product.image,

      quantity:
        Number(
          quantity
        )

    });

  }


  saveCart();

  updateCartCount();

  renderCart();


  showToast(
    `${product.name} added to your bag.`
  );

}


/* =========================================================
   REMOVE CART ITEM
   ========================================================= */

function removeFromCart(
  id
){

  state.cart =
    state.cart.filter(
      item =>
        String(
          item.id
        ) !==
        String(
          id
        )
    );


  saveCart();

  updateCartCount();

  renderCart();

}


/* =========================================================
   CHANGE QUANTITY
   ========================================================= */

function changeQuantity(
  id,
  amount
){

  const item =
    state.cart.find(
      cartItem =>
        String(
          cartItem.id
        ) ===
        String(
          id
        )
    );


  if(!item){

    return;

  }


  item.quantity +=
    amount;


  if(
    item.quantity <= 0
  ){

    removeFromCart(
      id
    );

    return;

  }


  saveCart();

  updateCartCount();

  renderCart();

}


/* =========================================================
   OPEN CART
   ========================================================= */

function openCart(){

  const drawer =
    $("#cartDrawer");


  const backdrop =
    $("#drawerBackdrop");


  if(!drawer){

    return;

  }


  drawer.classList.add(
    "open"
  );


  drawer.setAttribute(
    "aria-hidden",
    "false"
  );


  if(backdrop){

    backdrop.classList.add(
      "show"
    );

  }


  document.body.classList.add(
    "lock"
  );


  renderCart();

}


/* =========================================================
   CLOSE CART
   ========================================================= */

function closeCart(){

  const drawer =
    $("#cartDrawer");


  const backdrop =
    $("#drawerBackdrop");


  if(drawer){

    drawer.classList.remove(
      "open"
    );


    drawer.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  if(backdrop){

    backdrop.classList.remove(
      "show"
    );

  }


  document.body.classList.remove(
    "lock"
  );

}


/* =========================================================
   RENDER CART
   ========================================================= */

function renderCart(){

  const container =
    $("#cartItems");


  const total =
    $("#cartTotal");


  if(!container){

    return;

  }


  if(
    !state.cart.length
  ){

    container.innerHTML = `

      <div class="empty">

        <i class="fa-solid fa-bag-shopping"></i>

        <h3>
          Your bag is empty
        </h3>

        <p>
          Add something you love
          and it will appear here.
        </p>

      </div>

    `;


    if(total){

      total.textContent =
        formatMoney(
          0
        );

    }


    return;

  }


  container.innerHTML =
    state.cart.map(
      item => `

        <div class="cart-line">

          <img
            src="${escapeHTML(item.image)}"
            alt="${escapeHTML(item.name)}"
          >

          <div class="cart-info">

            <h4>
              ${escapeHTML(item.name)}
            </h4>

            <small>
              ${formatMoney(item.price)}
            </small>


            <div class="qty">

              <button
                type="button"
                data-cart-minus="${escapeHTML(item.id)}"
              >
                −
              </button>

              <span>
                ${item.quantity}
              </span>

              <button
                type="button"
                data-cart-plus="${escapeHTML(item.id)}"
              >
                +
              </button>

            </div>


            <button
              class="remove"
              type="button"
              data-cart-remove="${escapeHTML(item.id)}"
            >
              Remove
            </button>

          </div>


          <strong>
            ${formatMoney(
              Number(item.price) *
              Number(item.quantity)
            )}
          </strong>

        </div>

      `
    ).join("");


  if(total){

    total.textContent =
      formatMoney(
        getCartTotal()
      );

  }

}


/* =========================================================
   HERO SLIDESHOW
   ========================================================= */

const HERO_IMAGES = [

  "hero-1.jpg",

  "hero-2.jpg",

  "hero-3.jpg",

  "hero-4.jpg",

  "hero-5.jpg",

  "hero-6.jpg"

];


let heroIndex =
  0;


let heroTimer =
  null;


/* =========================================================
   RENDER HERO
   ========================================================= */

function renderHero(){

  const container =
    $("#heroSlides");


  const dots =
    $("#heroDots");


  if(!container){

    return;

  }


  container.innerHTML =
    HERO_IMAGES.map(
      (
        image,
        index
      ) => `

        <div
          class="hero-slide${index === 0 ? " active" : ""}"
          data-hero-slide="${index}"
        >

          <img
            src="${PATHS.hero}${image}"
            alt="Area Boyz Enterprise fashion collection ${index + 1}"
          >

          <div
            class="hero-slide-shade"
          ></div>

        </div>

      `
    ).join("");


  if(dots){

    dots.innerHTML =
      HERO_IMAGES.map(
        (
          image,
          index
        ) => `

          <button
            class="hero-dot${index === 0 ? " active" : ""}"
            type="button"
            data-hero-dot="${index}"
            aria-label="Go to slide ${index + 1}"
          ></button>

        `
      ).join("");

  }


  startHeroTimer();

}


/* =========================================================
   SHOW HERO SLIDE
   ========================================================= */

function showHeroSlide(
  index
){

  const slides =
    $all(
      "[data-hero-slide]"
    );


  const dots =
    $all(
      "[data-hero-dot]"
    );


  if(
    !slides.length
  ){

    return;

  }


  heroIndex =
    (
      index +
      slides.length
    ) %
    slides.length;


  slides.forEach(
    (
      slide,
      i
    ) => {

      slide.classList.toggle(
        "active",
        i === heroIndex
      );

    }
  );


  dots.forEach(
    (
      dot,
      i
    ) => {

      dot.classList.toggle(
        "active",
        i === heroIndex
      );

    }
  );

}


/* =========================================================
   HERO TIMER
   ========================================================= */

function startHeroTimer(){

  if(heroTimer){

    clearInterval(
      heroTimer
    );

  }


  const slides =
    $all(
      "[data-hero-slide]"
    );


  if(
    slides.length < 2
  ){

    return;

  }


  heroTimer =
    setInterval(
      () => {

        showHeroSlide(
          heroIndex + 1
        );

      },
      5000
    );

}


/* =========================================================
   BUILD SHOP FILTERS
   ========================================================= */

function buildFilters(){

  const filters =
    $("#filters");


  if(!filters){

    return;

  }


  filters.innerHTML =
    CATEGORIES.map(
      category => `

        <button
          class="filter${state.collection === category ? " active" : ""}"
          type="button"
          data-collection="${category}"
        >

          ${
            category === "all"
              ? "All"
              : category
                .charAt(0)
                .toUpperCase() +
                category.slice(1)
          }

        </button>

      `
    ).join("");

}


/* =========================================================
   UPDATE FILTER BUTTONS
   ========================================================= */

function updateFilterButtons(){

  $all(
    "[data-collection]"
  ).forEach(
    button => {

      button.classList.toggle(
        "active",
        button.dataset.collection ===
        state.collection
      );

    }
  );

}


/* =========================================================
   APPLY FILTERS
   ========================================================= */

function applyFilters(){

  let products =
    [...PRODUCTS];


  const search =
    state.search
      .trim()
      .toLowerCase();


  if(search){

    products =
      products.filter(
        product => {

          const searchable =
            `${product.name} ${product.brand} ${product.category} ${product.collection}`
              .toLowerCase();


          return searchable.includes(
            search
          );

        }
      );

  }


  if(
    state.collection !==
    "all"
  ){

    products =
      products.filter(
        product =>
          product.collection ===
          state.collection
      );

  }


  switch(
    state.sort
  ){

    case "low":

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

  }


  state.filteredProducts =
    products;


  renderProducts();

  updateFilterButtons();

}


/* =========================================================
   RENDER PRODUCTS
   ========================================================= */

function renderProducts(){

  const grid =
    $("#productGrid");


  const empty =
    $("#emptyState");


  const meta =
    $("#resultsMeta");


  if(!grid){

    return;

  }


  grid.innerHTML =
    state.filteredProducts
      .map(
        product => `

          <article
            class="product-card"
          >

            <button
              class="product-media"
              type="button"
              data-product-view="${escapeHTML(product.id)}"
              aria-label="View ${escapeHTML(product.name)}"
            >

              <img
                src="${escapeHTML(product.image)}"
                alt="${escapeHTML(product.name)}"
                loading="lazy"
                onerror="this.classList.add('img-failed')"
              >

              <span>
                ${escapeHTML(product.brand)}
                ·
                ${escapeHTML(product.collection)}
              </span>

            </button>


            <div class="product-body">

              <p class="product-number">

                ${escapeHTML(product.brand)}
                ·
                ${escapeHTML(product.category)}

              </p>


              <h3>
                ${escapeHTML(product.name)}
              </h3>


              <p>
                ${escapeHTML(product.description)}
              </p>


              <div class="product-row">

                <strong>
                  ${formatMoney(product.price)}
                </strong>


                <button
                  class="mini-btn"
                  type="button"
                  data-add-to-cart="${escapeHTML(product.id)}"
                >
                  Add to Bag
                </button>

              </div>

            </div>

          </article>

        `
      )
      .join("");


  if(meta){

    meta.textContent =
      `${state.filteredProducts.length} product${
        state.filteredProducts.length === 1
          ? ""
          : "s"
      }`;

  }


  if(empty){

    empty.classList.toggle(
      "hidden",
      state.filteredProducts.length !== 0
    );


    grid.classList.toggle(
      "hidden",
      state.filteredProducts.length === 0
    );

  }

}


/* =========================================================
   READ COLLECTION FROM URL
   ========================================================= */

function readCollectionFromURL(){

  const params =
    new URLSearchParams(
      window.location.search
    );


  const collection =
    params.get(
      "collection"
    );


  if(
    collection &&
    CATEGORIES.includes(
      collection
    )
  ){

    state.collection =
      collection;

  }

}


/* =========================================================
   PRODUCT MODAL
   ========================================================= */

function openProductModal(
  id
){

  const product =
    getProduct(id);


  const modal =
    $("#productModal");


  const content =
    $("#modalContent");


  if(
    !product ||
    !modal ||
    !content
  ){

    return;

  }


  state.currentProduct =
    product;


  content.innerHTML = `

    <div
      class="modal-product"
    >

      <div
        class="modal-product-main"
      >

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
        >

      </div>


      <div
        class="modal-info"
      >

        <p class="eyebrow">

          ${escapeHTML(product.brand)}
          ·
          ${escapeHTML(product.collection)}

        </p>


        <p class="product-number">

          PRODUCT
          ${escapeHTML(product.id)}

        </p>


        <h2>

          ${escapeHTML(product.name)}

        </h2>


        <div
          class="modal-price"
        >

          ${formatMoney(product.price)}

        </div>


        <p>

          ${escapeHTML(product.description)}

        </p>


        <ul>

          ${
            product.details
              .map(
                detail => `

                  <li>

                    <strong>
                      ${escapeHTML(detail.label)}:
                    </strong>

                    ${escapeHTML(detail.value)}

                  </li>

                `
              )
              .join("")
          }

        </ul>


        <button
          class="btn dark"
          type="button"
          data-add-to-cart="${escapeHTML(product.id)}"
        >

          Add to Bag

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
    "lock"
  );

}


/* =========================================================
   CLOSE PRODUCT MODAL
   ========================================================= */

function closeProductModal(){

  const modal =
    $("#productModal");


  if(!modal){

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
    "lock"
  );


  state.currentProduct =
    null;

}


/* =========================================================
   MOBILE NAV
   ========================================================= */

function closeMobileNav(){

  const nav =
    $("#mobileNav");


  const button =
    $("#menuBtn");


  if(nav){

    nav.classList.remove(
      "open"
    );

  }


  if(button){

    button.setAttribute(
      "aria-expanded",
      "false"
    );


    button.setAttribute(
      "aria-label",
      "Open menu"
    );

  }

}


function toggleMobileNav(){

  const nav =
    $("#mobileNav");


  const button =
    $("#menuBtn");


  if(!nav){

    return;

  }


  const open =
    nav.classList.toggle(
      "open"
    );


  if(button){

    button.setAttribute(
      "aria-expanded",
      String(
        open
      )
    );


    button.setAttribute(
      "aria-label",
      open
        ? "Close menu"
        : "Open menu"
    );

  }

}


/* =========================================================
   SEARCH
   ========================================================= */

function openSearch(){

  const panel =
    $("#searchPanel");


  const input =
    $("#searchInput");


  if(!panel){

    return;

  }


  panel.classList.add(
    "open"
  );


  if(input){

    setTimeout(
      () => input.focus(),
      50
    );

  }

}


function closeSearch(){

  const panel =
    $("#searchPanel");


  if(panel){

    panel.classList.remove(
      "open"
    );

  }

}


/* =========================================================
   NAVIGATION EVENTS
   ========================================================= */

function bindNavigation(){

  const menuButton =
    $("#menuBtn");


  if(menuButton){

    menuButton.addEventListener(
      "click",
      toggleMobileNav
    );

  }


  $all(
    "#mobileNav a"
  ).forEach(
    link => {

      link.addEventListener(
        "click",
        closeMobileNav
      );

    }
  );

}


/* =========================================================
   SEARCH EVENTS
   ========================================================= */

function bindSearch(){

  const searchButton =
    $("#searchBtn");


  const searchClose =
    $("#searchClose");


  const input =
    $("#searchInput");


  if(searchButton){

    searchButton.addEventListener(
      "click",
      openSearch
    );

  }


  if(searchClose){

    searchClose.addEventListener(
      "click",
      closeSearch
    );

  }


  if(input){

    input.addEventListener(
      "input",
      event => {

        state.search =
          event.target.value;


        if(
          $("#productGrid")
        ){

          applyFilters();

        }

      }
    );

  }

}


/* =========================================================
   COLLECTION BUTTONS
   ========================================================= */

function bindCollectionButtons(){

  $all(
    "[data-collection]"
  ).forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const collection =
            button.dataset.collection;


          if(
            !CATEGORIES.includes(
              collection
            )
          ){

            return;

          }


          state.collection =
            collection;


          localStorage.setItem(
            COLLECTION_STORAGE_KEY,
            collection
          );


          if(
            $("#productGrid")
          ){

            applyFilters();


            const shop =
              $("#shop");


            if(shop){

              shop.scrollIntoView({

                behavior:
                  "smooth",

                block:
                  "start"

              });

            }

          }else{

            window.location.href =
              `${SITE_ROOT}pages/shop.html?collection=${encodeURIComponent(collection)}`;

          }

        }
      );

    }
  );

}


/* =========================================================
   SHOP CONTROLS
   ========================================================= */

function bindShopControls(){

  const sort =
    $("#sort");


  const clear =
    $("#clearFilters");


  if(sort){

    sort.addEventListener(
      "change",
      event => {

        state.sort =
          event.target.value;


        applyFilters();

      }
    );

  }


  if(clear){

    clear.addEventListener(
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


        if(input){

          input.value =
            "";

        }


        if(sort){

          sort.value =
            "featured";

        }


        localStorage.removeItem(
          COLLECTION_STORAGE_KEY
        );


        applyFilters();

      }
    );

  }

}


/* =========================================================
   HERO CONTROLS
   ========================================================= */

function bindHeroControls(){

  const previous =
    $(
      "[data-hero-prev]"
    );


  const next =
    $(
      "[data-hero-next]"
    );


  if(previous){

    previous.addEventListener(
      "click",
      () => {

        showHeroSlide(
          heroIndex - 1
        );


        startHeroTimer();

      }
    );

  }


  if(next){

    next.addEventListener(
      "click",
      () => {

        showHeroSlide(
          heroIndex + 1
        );


        startHeroTimer();

      }
    );

  }


  document.addEventListener(
    "click",
    event => {

      const dot =
        event.target.closest(
          "[data-hero-dot]"
        );


      if(!dot){

        return;

      }


      showHeroSlide(
        Number(
          dot.dataset.heroDot
        )
      );


      startHeroTimer();

    }
  );

}


/* =========================================================
   GLOBAL EVENTS
   ========================================================= */

function bindGlobalEvents(){

  document.addEventListener(
    "click",
    event => {

      const addButton =
        event.target.closest(
          "[data-add-to-cart]"
        );


      if(addButton){

        addToCart(
          addButton.dataset.addToCart
        );


        return;

      }


      const productButton =
        event.target.closest(
          "[data-product-view]"
        );


      if(productButton){

        openProductModal(
          productButton.dataset.productView
        );


        return;

      }


      const cartButton =
        event.target.closest(
          "#cartBtn"
        );


      if(cartButton){

        openCart();

        return;

      }


      const cartClose =
        event.target.closest(
          "#cartClose, #drawerBackdrop"
        );


      if(cartClose){

        closeCart();

        return;

      }


      const cartPlus =
        event.target.closest(
          "[data-cart-plus]"
        );


      if(cartPlus){

        changeQuantity(
          cartPlus.dataset.cartPlus,
          1
        );


        return;

      }


      const cartMinus =
        event.target.closest(
          "[data-cart-minus]"
        );


      if(cartMinus){

        changeQuantity(
          cartMinus.dataset.cartMinus,
          -1
        );


        return;

      }


      const cartRemove =
        event.target.closest(
          "[data-cart-remove]"
        );


      if(cartRemove){

        removeFromCart(
          cartRemove.dataset.cartRemove
        );


        return;

      }


      const modalClose =
        event.target.closest(
          "[data-close-modal]"
        );


      if(modalClose){

        closeProductModal();

      }

    }
  );


  const checkout =
    $("#checkoutBtn");


  if(checkout){

    checkout.addEventListener(
      "click",
      handleCheckout
    );

  }

}


/* =========================================================
   FLUTTERWAVE
   ========================================================= */

const FLUTTERWAVE_PUBLIC_KEY =
  "FLWPUBK_TEST-REPLACE_WITH_YOUR_PUBLIC_KEY";


function loadFlutterwave(){

  return new Promise(
    (
      resolve,
      reject
    ) => {

      if(
        window.FlutterwaveCheckout
      ){

        resolve();

        return;

      }


      const existing =
        document.querySelector(
          'script[src*="flutterwave"]'
        );


      if(existing){

        existing.addEventListener(
          "load",
          resolve,
          {
            once:
              true
          }
        );


        existing.addEventListener(
          "error",
          reject,
          {
            once:
              true
          }
        );


        return;

      }


      const script =
        document.createElement(
          "script"
        );


      script.src =
        "https://checkout.flutterwave.com/v3.js";


      script.async =
        true;


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


function getCustomerDetails(){

  const savedName =
    localStorage.getItem(
      "areaBoyzCustomerName"
    ) ||
    "";


  const savedEmail =
    localStorage.getItem(
      "areaBoyzCustomerEmail"
    ) ||
    "";


  const name =
    window.prompt(
      "Enter your full name:",
      savedName
    );


  if(
    !name ||
    !name.trim()
  ){

    return null;

  }


  const email =
    window.prompt(
      "Enter your email address:",
      savedEmail
    );


  if(
    !email ||
    !email.trim()
  ){

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

    name:
      name.trim(),

    email:
      email.trim()

  };

}


async function handleCheckout(){

  if(
    !state.cart.length
  ){

    showToast(
      "Your bag is empty."
    );

    return;

  }


  if(
    FLUTTERWAVE_PUBLIC_KEY.includes(
      "REPLACE_WITH"
    )
  ){

    showToast(
      "Flutterwave public key has not been configured yet."
    );

    return;

  }


  const customer =
    getCustomerDetails();


  if(!customer){

    return;

  }


  try{

    await loadFlutterwave();


    const reference =
      `ABZ-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2,8)
        .toUpperCase()}`;


    window.FlutterwaveCheckout({

      public_key:
        FLUTTERWAVE_PUBLIC_KEY,

      tx_ref:
        reference,

      amount:
        getCartTotal(),

      currency:
        "NGN",

      payment_options:
        "card,banktransfer,ussd",

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
          "Area Boyz Enterprise purchase"

      },

      callback:
        payment => {

          if(
            payment &&
            (
              payment.status ===
                "successful" ||
              payment.status ===
                "completed"
            )
          ){

            showToast(
              "Payment successful. Thank you for shopping with Area Boyz."
            );


            state.cart = [];

            saveCart();

            updateCartCount();

            renderCart();

            closeCart();

          }else{

            showToast(
              "Payment was not completed."
            );

          }

        },

      onclose:
        () => {

          showToast(
            "Checkout window closed."
          );

        }

    });

  }catch(error){

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
   KEYBOARD
   ========================================================= */

function bindKeyboard(){

  document.addEventListener(
    "keydown",
    event => {

      if(
        event.key !==
        "Escape"
      ){

        return;

      }


      closeMobileNav();

      closeSearch();

      closeProductModal();

      closeCart();

    }
  );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

function init(){

  try{

    loadCart();

    updateYear();

    renderHero();

    buildFilters();

    readCollectionFromURL();


    const savedCollection =
      localStorage.getItem(
        COLLECTION_STORAGE_KEY
      );


    if(
      state.collection ===
        "all" &&
      savedCollection &&
      CATEGORIES.includes(
        savedCollection
      )
    ){

      state.collection =
        savedCollection;

    }


    const params =
      new URLSearchParams(
        window.location.search
      );


    const urlSearch =
      params.get(
        "search"
      );


    if(urlSearch){

      state.search =
        urlSearch;


      const input =
        $("#searchInput");


      if(input){

        input.value =
          urlSearch;

      }

    }


    if(
      $("#productGrid")
    ){

      applyFilters();

    }


    updateCartCount();

    renderCart();

    bindNavigation();

    bindSearch();

    bindCollectionButtons();

    bindShopControls();

    bindHeroControls();

    bindGlobalEvents();

    bindKeyboard();

    hidePreloader();

  }catch(error){

    console.error(
      "Area Boyz initialization error:",
      error
    );


    hidePreloader();

  }

}


/* =========================================================
   PUBLIC STORE OBJECT
   ========================================================= */

window.AreaBoyzStore = {

  products:
    PRODUCTS,

  getProduct,

  addToCart,

  removeFromCart,

  changeQuantity,

  openCart,

  closeCart,

  getCartCount,

  getCartTotal,

  formatMoney

};


/* =========================================================
   START
   ========================================================= */

if(
  document.readyState ===
  "loading"
){

  document.addEventListener(
    "DOMContentLoaded",
    init,
    {
      once:
        true
    }
  );

}else{

  init();

          }
