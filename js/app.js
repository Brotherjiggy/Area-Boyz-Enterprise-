"use strict";


/* =========================================================
   AREA BOYZ ENTERPRISE
   IMAGE + STORE SYSTEM
   =========================================================

   REQUIRED IMAGE STRUCTURE:

   images/
   ├── hero/
   │   ├── hero-1.jpg
   │   ├── hero-2.jpg
   │   ├── hero-3.jpg
   │   ├── hero-4.jpg
   │   ├── hero-5.jpg
   │   └── hero-6.jpg
   │
   ├── products/
   │   ├── product-001.jpg
   │   ├── product-002.jpg
   │   ├── ...
   │   └── product-109.jpg
   │
   ├── categories/
   └── collections/

   This file is designed to work from:
   - index.html
   - pages/shop.html
   - pages/collections.html
   - pages/our-story.html
   - pages/contact.html
   - investment/*
   - account/*
   - admin/*

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
   CATEGORIES
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
   =========================================================

   These override generic product names and classifications
   where the visual catalogue gives us enough confidence.

   IMPORTANT:
   We only identify a brand when the branding is visibly
   supported by the product image.

   ========================================================= */

const PRODUCT_CATALOG_OVERRIDES = {

  /* -------------------------------------------------------
     HANDMADE / TAILORED / STRUCTURED
     ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     CLEARLY IDENTIFIABLE BRANDS
     ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     BETTER DESCRIPTIVE PRODUCT NAMES
     ------------------------------------------------------- */

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
   PRODUCT CATEGORY MAP
   ========================================================= */

const PRODUCT_CATEGORY_OVERRIDES = {

  /* -------------------------------------------------------
     FOOTWEAR
     ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     ACCESSORIES
     ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     HANDMADE
     ------------------------------------------------------- */

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
   VISUAL PRODUCT DATA
   =========================================================

   Existing visual product metadata.

   The product engine below combines this information with
   the catalogue overrides above.

   ========================================================= */

const VISUAL_PRODUCT_DATA = {

  "001": {
    category: "men",
    price: 85000
  },

  "002": {
    category: "men",
    price: 42000
  },

  "003": {
    category: "men",
    price: 38000
  },

  "004": {
    category: "men",
    price: 45000
  },

  "005": {
    category: "men",
    price: 48000
  },

  "006": {
    category: "men",
    price: 40000
  },

  "007": {
    category: "footwear",
    price: 65000
  },

  "008": {
    category: "footwear",
    price: 72000
  },

  "009": {
    category: "men",
    price: 45000
  },

  "010": {
    category: "men",
    price: 42000
  },

  "011": {
    category: "men",
    price: 46000
  },

  "012": {
    category: "women",
    price: 78000
  },

  "013": {
    category: "men",
    price: 95000
  },

  "014": {
    category: "men",
    price: 88000
  },

  "015": {
    category: "men",
    price: 45000
  },

  "016": {
    category: "accessories",
    price: 25000
  },

  "017": {
    category: "women",
    price: 82000
  },

  "018": {
    category: "men",
    price: 45000
  },

  "019": {
    category: "men",
    price: 40000
  },

  "020": {
    category: "men",
    price: 92000
  },

  "021": {
    category: "women",
    price: 88000
  },

  "022": {
    category: "women",
    price: 90000
  },

  "023": {
    category: "men",
    price: 43000
  },

  "024": {
    category: "men",
    price: 44000
  },

  "025": {
    category: "men",
    price: 42000
  },

  "026": {
    category: "men",
    price: 40000
  },

  "027": {
    category: "men",
    price: 47000
  },

  "028": {
    category: "accessories",
    price: 55000
  },

  "029": {
    category: "men",
    price: 43000
  },

  "030": {
    category: "men",
    price: 98000
  },

  "031": {
    category: "men",
    price: 44000
  },

  "032": {
    category: "men",
    price: 42000
  },

  "033": {
    category: "men",
    price: 45000
  },

  "034": {
    category: "men",
    price: 48000
  },

  "035": {
    category: "men",
    price: 45000
  },

  "036": {
    category: "accessories",
    price: 30000
  },

  "037": {
    category: "men",
    price: 45000
  },

  "038": {
    category: "accessories",
    price: 58000
  },

  "039": {
    category: "men",
    price: 46000
  },

  "040": {
    category: "men",
    price: 43000
  },

  "041": {
    category: "footwear",
    price: 62000
  },

  "042": {
    category: "accessories",
    price: 28000
  },

  "043": {
    category: "accessories",
    price: 22000
  },

  "044": {
    category: "accessories",
    price: 24000
  },

  "045": {
    category: "accessories",
    price: 26000
  },

  "046": {
    category: "men",
    price: 42000
  },

  "047": {
    category: "men",
    price: 44000
  },

  "048": {
    category: "accessories",
    price: 28000
  },

  "049": {
    category: "accessories",
    price: 22000
  },

  "050": {
    category: "men",
    price: 45000
  },

  "051": {
    category: "footwear",
    price: 76000
  },

  "052": {
    category: "men",
    price: 43000
  },

  "053": {
    category: "men",
    price: 42000
  },

  "054": {
    category: "men",
    price: 98000
  },

  "055": {
    category: "men",
    price: 44000
  },

  "056": {
    category: "men",
    price: 42000
  },

  "057": {
    category: "men",
    price: 45000
  },

  "058": {
    category: "men",
    price: 42000
  },

  "059": {
    category: "accessories",
    price: 58000
  },

  "060": {
    category: "accessories",
    price: 26000
  },

  "061": {
    category: "men",
    price: 43000
  },

  "062": {
    category: "footwear",
    price: 78000
  },

  "063": {
    category: "footwear",
    price: 65000
  },

  "064": {
    category: "accessories",
    price: 52000
  },

  "065": {
    category: "men",
    price: 45000
  },

  "066": {
    category: "footwear",
    price: 68000
  },

  "067": {
    category: "men",
    price: 43000
  },

  "068": {
    category: "men",
    price: 42000
  },

  "069": {
    category: "men",
    price: 72000
  },

  "070": {
    category: "men",
    price: 44000
  },

  "071": {
    category: "accessories",
    price: 26000
  },

  "072": {
    category: "accessories",
    price: 22000
  },

  "073": {
    category: "men",
    price: 43000
  },

  "074": {
    category: "footwear",
    price: 65000
  },

  "075": {
    category: "footwear",
    price: 68000
  },

  "076": {
    category: "footwear",
    price: 72000
  },

  "077": {
    category: "men",
    price: 45000
  },

  "078": {
    category: "men",
    price: 43000
  },

  "079": {
    category: "men",
    price: 70000
  },

  "080": {
    category: "men",
    price: 76000
  },

  "081": {
    category: "men",
    price: 65000
  },

  "082": {
    category: "men",
    price: 70000
  },

  "083": {
    category: "men",
    price: 72000
  },

  "084": {
    category: "men",
    price: 44000
  },

  "085": {
    category: "men",
    price: 46000
  },

  "086": {
    category: "men",
    price: 68000
  },

  "087": {
    category: "accessories",
    price: 30000
  },

  "088": {
    category: "accessories",
    price: 26000
  },

  "089": {
    category: "accessories",
    price: 22000
  },

  "090": {
    category: "men",
    price: 44000
  },

  "091": {
    category: "men",
    price: 42000
  },

  "092": {
    category: "men",
    price: 55000
  },

  "093": {
    category: "footwear",
    price: 62000
  },

  "094": {
    category: "accessories",
    price: 26000
  },

  "095": {
    category: "accessories",
    price: 24000
  },

  "096": {
    category: "men",
    price: 43000
  },

  "097": {
    category: "men",
    price: 42000
  },

  "098": {
    category: "men",
    price: 46000
  },

  "099": {
    category: "men",
    price: 43000
  },

  "100": {
    category: "men",
    price: 45000
  },

  "101": {
    category: "footwear",
    price: 62000
  },

  "102": {
    category: "footwear",
    price: 78000
  },

  "103": {
    category: "footwear",
    price: 65000
  },

  "104": {
    category: "footwear",
    price: 65000
  },

  "105": {
    category: "footwear",
    price: 62000
  },

  "106": {
    category: "men",
    price: 43000
  },

  "107": {
    category: "men",
    price: 42000
  },

  "108": {
    category: "footwear",
    price: 65000
  },

  "109": {
    category: "footwear",
    price: 70000
  }

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
   PRODUCT DESCRIPTION
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
      `focused on tailored construction, statement ` +
      `silhouette and distinctive styling.`
    );

  }


  if(
    collection === "footwear"
  ){

    return (
      `${name} — a footwear selection chosen for ` +
      `everyday styling, street presence and comfort.`
    );

  }


  if(
    collection === "accessories"
  ){

    return (
      `${name} — a versatile Area Boyz accessory ` +
      `selected to complete and elevate your look.`
    );

  }


  return (
    `${name} — a modern Area Boyz streetwear selection ` +
    `built for expressive everyday style.`
  );

}


/* =========================================================
   PRODUCT DETAILS
   ========================================================= */

function createProductDetails(
  name,
  brand,
  category,
  collection
){

  const details = [

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

  ];


  return details;

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


  const defaultName =
    DEFAULT_PRODUCT_NAMES[id] ||
    `Area Boyz Product ${id}`;


  const name =
    override.name ||
    defaultName;


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


  const image =
    `${PATHS.products}product-${id}.jpg`;


  const description =
    createProductDescription(
      name,
      collection,
      category
    );


  const details =
    createProductDetails(
      name,
      brand,
      category,
      collection
    );


  PRODUCTS.push({

    id,

    number,

    name,

    brand,

    category,

    collection,

    price,

    image,

    description,

    details

  });

}


/* =========================================================
   STATE
   ========================================================= */

let state = {

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
   DOM HELPERS
   ========================================================= */

function $(selector){

  return document.querySelector(
    selector
  );

}


function $all(selector){

  return Array.from(
    document.querySelectorAll(
      selector
    )
  );

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value){

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


/* =========================================================
   FORMAT MONEY
   ========================================================= */

function formatMoney(
  amount
){

  const numericAmount =
    Number(amount) || 0;


  return (
    CURRENCY_SYMBOL +
    numericAmount.toLocaleString(
      "en-NG"
    )
  );

}


/* =========================================================
   GET PRODUCT
   ========================================================= */

function getProduct(
  id
){

  return PRODUCTS.find(
    product =>
      String(product.id) ===
      String(id)
  );

}


/* =========================================================
   SAVE CART
   ========================================================= */

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
   LOAD CART
   ========================================================= */

function loadCart(){

  try{

    const saved =
      localStorage.getItem(
        CART_STORAGE_KEY
      );


    if(!saved){

      state.cart = [];

      return;

    }


    const parsed =
      JSON.parse(
        saved
      );


    if(
      Array.isArray(parsed)
    ){

      state.cart =
        parsed.filter(
          item =>
            item &&
            item.id &&
            Number(item.quantity) > 0
        );

    }else{

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
        item.quantity
      ),
    0
  );

}


/* =========================================================
   CART TOTAL
   ========================================================= */

function getCartTotal(){

  return state.cart.reduce(
    (
      total,
      item
    ) =>
      total +
      (
        Number(item.price) *
        Number(item.quantity)
      ),
    0
  );

}


/* =========================================================
   UPDATE CART BADGES
   ========================================================= */

function updateCartBadges(){

  const count =
    getCartCount();


  $all(
    "[data-cart-count]"
  ).forEach(
    element => {

      element.textContent =
        count;

      element.classList.toggle(
        "has-items",
        count > 0
      );

    }
  );


  const cartCount =
    $("#cart-count");


  if(cartCount){

    cartCount.textContent =
      count;

  }

}


/* =========================================================
   APPLY FILTERS
   ========================================================= */

function applyFilters(){

  let products =
    [...PRODUCTS];


  /* SEARCH */

  const search =
    state.search
      .trim()
      .toLowerCase();


  if(search){

    products =
      products.filter(
        item => {

          const searchable =
            `${item.name} ${item.brand} ${item.category} ${item.collection}`;

          return searchable
            .toLowerCase()
            .includes(
              search
            );

        }
      );

  }


  /* CATEGORY */

  if(
    state.category &&
    state.category !== "all"
  ){

    products =
      products.filter(
        item =>
          item.category ===
          state.category
      );

  }


  /* COLLECTION */

  if(
    state.collection &&
    state.collection !== "all"
  ){

    products =
      products.filter(
        item =>
          item.collection ===
          state.collection
      );

  }


  /* SORT */

  switch(
    state.sort
  ){

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


    case "newest":

      products.sort(
        (
          a,
          b
        ) =>
          b.number -
          a.number
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

}


/* =========================================================
   PRODUCT CARD
   ========================================================= */

function createProductCard(
  item
){

  const image =
    escapeHTML(
      item.image
    );


  const name =
    escapeHTML(
      item.name
    );


  const brand =
    escapeHTML(
      item.brand
    );


  const collection =
    escapeHTML(
      item.collection
    );


  const price =
    formatMoney(
      item.price
    );


  return `

    <article
      class="product-card"
      data-product-id="${escapeHTML(item.id)}"
    >

      <button
        class="product-image-button"
        type="button"
        data-product-view="${escapeHTML(item.id)}"
        aria-label="View ${name}"
      >

        <div class="product-image-wrap">

          <img
            src="${image}"
            alt="${name}"
            class="product-image"
            loading="lazy"
            onerror="this.style.opacity='0.35';"
          >

          <span class="product-number">
            ${brand}
            ·
            ${collection}
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
            ${price}
          </span>


          <button
            type="button"
            class="add-to-cart"
            data-add-to-cart="${escapeHTML(item.id)}"
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

function renderProducts(){

  const containers =
    $all(
      "[data-products]"
    );


  if(
    !containers.length
  ){

    return;

  }


  const products =
    state.filteredProducts;


  containers.forEach(
    container => {

      if(
        !products.length
      ){

        container.innerHTML = `

          <div class="empty-products">

            <h3>
              No products found
            </h3>

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
          .map(
            createProductCard
          )
          .join("");

    }
  );


  const resultCount =
    $all(
      "[data-result-count]"
    );


  resultCount.forEach(
    element => {

      element.textContent =
        products.length;

    }
  );

}


/* =========================================================
   PRODUCT MODAL HTML
   ========================================================= */

function createProductModal(){

  if(
    $("#product-modal")
  ){

    return;

  }


  const modal =
    document.createElement(
      "div"
    );


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


  document.body.appendChild(
    modal
  );

}


/* =========================================================
   OPEN PRODUCT MODAL
   ========================================================= */

function openProductModal(
  id
){

  const product =
    getProduct(id);


  if(!product){

    return;

  }


  state.currentProduct =
    product;


  createProductModal();


  const modal =
    $("#product-modal");


  const content =
    $("#product-modal-content");


  if(
    !modal ||
    !content
  ){

    return;

  }


  const details =
    product.details
      .map(
        detail => `

          <div class="product-detail-row">

            <span>
              ${escapeHTML(
                detail.label
              )}
            </span>

            <strong>
              ${escapeHTML(
                detail.value
              )}
            </strong>

          </div>

        `
      )
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


      <h2
        id="product-modal-title"
      >
        ${escapeHTML(product.name)}
      </h2>


      <div class="product-modal-price">

        ${formatMoney(
          product.price
        )}

      </div>


      <p class="product-modal-description">

        ${escapeHTML(
          product.description
        )}

      </p>


      <div class="product-details">

        ${details}

      </div>


      <button
        type="button"
        class="page-btn product-modal-add"
        data-add-to-cart="${escapeHTML(product.id)}"
      >
        Add to Bag
      </button>

    </div>

  `;


  modal.classList.add(
    "open"
  );


  document.body.classList.add(
    "modal-open"
  );


  setTimeout(
    () => {

      const close =
        modal.querySelector(
          "[data-close-product]"
        );


      if(close){

        close.focus();

      }

    },
    50
  );

}


/* =========================================================
   CLOSE PRODUCT MODAL
   ========================================================= */

function closeProductModal(){

  const modal =
    $("#product-modal");


  if(!modal){

    return;

  }


  modal.classList.remove(
    "open"
  );


  document.body.classList.remove(
    "modal-open"
  );


  state.currentProduct =
    null;

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
        String(item.id) ===
        String(id)
    );


  if(existing){

    existing.quantity =
      Number(existing.quantity) +
      Number(quantity);

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
        Number(quantity)

    });

  }


  saveCart();

  updateCartBadges();

  renderCart();


  showToast(
    `${product.name} added to your bag.`
  );

}


/* =========================================================
   REMOVE FROM CART
   ========================================================= */

function removeFromCart(
  id
){

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


/* =========================================================
   CHANGE CART QUANTITY
   ========================================================= */

function changeCartQuantity(
  id,
  change
){

  const item =
    state.cart.find(
      cartItem =>
        String(cartItem.id) ===
        String(id)
    );


  if(!item){

    return;

  }


  item.quantity =
    Number(item.quantity) +
    Number(change);


  if(
    item.quantity <= 0
  ){

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

function createCartDrawer(){

  if(
    $("#cart-drawer")
  ){

    return;

  }


  const drawer =
    document.createElement(
      "aside"
    );


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

          <span>
            Total
          </span>

          <strong
            id="cart-total"
          >
            ₦0
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


  document.body.appendChild(
    drawer
  );

}


/* =========================================================
   OPEN CART
   ========================================================= */

function openCart(){

  createCartDrawer();

  renderCart();


  const drawer =
    $("#cart-drawer");


  if(drawer){

    drawer.classList.add(
      "open"
    );

  }


  document.body.classList.add(
    "cart-open"
  );

}


/* =========================================================
   CLOSE CART
   ========================================================= */

function closeCart(){

  const drawer =
    $("#cart-drawer");


  if(drawer){

    drawer.classList.remove(
      "open"
    );

  }


  document.body.classList.remove(
    "cart-open"
  );

}


/* =========================================================
   RENDER CART
   ========================================================= */

function renderCart(){

  const container =
    $("#cart-items");


  if(!container){

    return;

  }


  if(
    !state.cart.length
  ){

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


    if(total){

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
                  data-cart-minus="${escapeHTML(item.id)}"
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span>
                  ${Number(item.quantity)}
                </span>

                <button
                  type="button"
                  data-cart-plus="${escapeHTML(item.id)}"
                  aria-label="Increase quantity"
                >
                  +
                </button>

              </div>

            </div>


            <button
              type="button"
              class="cart-item-remove"
              data-cart-remove="${escapeHTML(item.id)}"
              aria-label="Remove item"
            >
              ×
            </button>

          </div>

        `
      )
      .join("");


  const total =
    $("#cart-total");


  if(total){

    total.textContent =
      formatMoney(
        getCartTotal()
      );

  }

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(
  message
){

  let toast =
    $("#area-boyz-toast");


  if(!toast){

    toast =
      document.createElement(
        "div"
      );


    toast.id =
      "area-boyz-toast";


    toast.className =
      "area-boyz-toast";


    document.body.appendChild(
      toast
    );

  }


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    toast._timeout
  );


  toast._timeout =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2600
    );

}


/* =========================================================
   FILTER BUTTONS
   ========================================================= */

function updateFilterButtons(){

  $all(
    "[data-collection]"
  ).forEach(
    button => {

      const value =
        button.dataset.collection;


      button.classList.toggle(
        "active",
        value ===
        state.collection
      );

    }
  );


  $all(
    "[data-category]"
  ).forEach(
    button => {

      const value =
        button.dataset.category;


      button.classList.toggle(
        "active",
        value ===
        state.category
      );

    }
  );

}


/* =========================================================
   SEARCH INPUTS
   ========================================================= */

function syncSearchInputs(){

  $all(
    "[data-product-search]"
  ).forEach(
    input => {

      if(
        input.value !==
        state.search
      ){

        input.value =
          state.search;

      }

    }
  );

}


/* =========================================================
   SORT SELECT
   ========================================================= */

function syncSortSelect(){

  $all(
    "[data-product-sort]"
  ).forEach(
    select => {

      select.value =
        state.sort;

    }
  );

}


/* =========================================================
   HERO SLIDER
   ========================================================= */

let heroTimer =
  null;


let heroIndex =
  0;


function getHeroSlides(){

  return $all(
    "[data-hero-slide]"
  );

}


/* =========================================================
   RENDER HERO
   ========================================================= */

function renderHero(){

  const hero =
    $(
      "[data-hero]"
    );


  if(!hero){

    return;

  }


  const slides =
    getHeroSlides();


  if(
    slides.length
  ){

    startHeroSlider();

    return;

  }


  const imageList = [

    "hero-1.jpg",
    "hero-2.jpg",
    "hero-3.jpg",
    "hero-4.jpg",
    "hero-5.jpg",
    "hero-6.jpg"

  ];


  hero.innerHTML =
    imageList
      .map(
        (
          image,
          index
        ) => `

          <div
            class="hero-slide ${index === 0 ? "active" : ""}"
            data-hero-slide
          >

            <img
              src="${PATHS.hero}${image}"
              alt="Area Boyz Enterprise fashion collection ${index + 1}"
            >

          </div>

        `
      )
      .join("");


  startHeroSlider();

}


/* =========================================================
   START HERO SLIDER
   ========================================================= */

function startHeroSlider(){

  const slides =
    getHeroSlides();


  if(
    slides.length <= 1
  ){

    return;

  }


  if(heroTimer){

    clearInterval(
      heroTimer
    );

  }


  heroIndex =
    0;


  heroTimer =
    setInterval(
      () => {

        slides[
          heroIndex
        ].classList.remove(
          "active"
        );


        heroIndex =
          (
            heroIndex + 1
          ) %
          slides.length;


        slides[
          heroIndex
        ].classList.add(
          "active"
        );

      },
      5000
    );

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function setupMobileMenu(){

  const toggle =
    document.querySelector(
      "#menu-toggle"
    );


  const nav =
    document.querySelector(
      "#nav-links"
    );


  if(
    !toggle ||
    !nav
  ){

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


  $all(
    "#nav-links a"
  ).forEach(
    link => {

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

    }
  );

}


/* =========================================================
   HEADER SCROLL
   ========================================================= */

function setupHeaderScroll(){

  const header =
    document.querySelector(
      "header"
    );


  if(!header){

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
   REVEAL ANIMATIONS
   ========================================================= */

function setupRevealAnimations(){

  const elements =
    $all(
      ".hidden"
    );


  if(
    !elements.length
  ){

    return;

  }


  if(
    !("IntersectionObserver" in window)
  ){

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

        entries.forEach(
          entry => {

            if(
              entry.isIntersecting
            ){

              entry.target.classList.add(
                "active"
              );


              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.12
      }
    );


  elements.forEach(
    element =>
      observer.observe(
        element
      )
  );

}


/* =========================================================
   YEAR
   ========================================================= */

function updateYear(){

  const year =
    document.querySelector(
      "#year"
    );


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
    document.querySelector(
      "#preloader"
    );


  if(!preloader){

    return;

  }


  window.setTimeout(
    () => {

      preloader.classList.add(
        "hide"
      );

    },
    450
  );

}


/* =========================================================
   URL COLLECTION FILTER
   ========================================================= */

function loadCollectionFromURL(){

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

    localStorage.setItem(
      COLLECTION_STORAGE_KEY,
      collection
    );

  }


  updateFilterButtons();

}


/* =========================================================
   RESTORE COLLECTION
   ========================================================= */

function restoreCollection(){

  if(
    state.collection !==
    "all"
  ){

    return;

  }


  try{

    const saved =
      localStorage.getItem(
        COLLECTION_STORAGE_KEY
      );


    if(
      saved &&
      CATEGORIES.includes(
        saved
      )
    ){

      state.collection =
        saved;

    }

  }catch(error){

    console.warn(
      "Unable to restore collection:",
      error
    );

  }

}


/* =========================================================
   BIND SEARCH
   ========================================================= */

function bindSearch(){

  $all(
    "[data-product-search]"
  ).forEach(
    input => {

      input.addEventListener(
        "input",
        event => {

          state.search =
            event.target.value;


          syncSearchInputs();

          applyFilters();

        }
      );

    }
  );

}


/* =========================================================
   BIND SORT
   ========================================================= */

function bindSort(){

  $all(
    "[data-product-sort]"
  ).forEach(
    select => {

      select.addEventListener(
        "change",
        event => {

          state.sort =
            event.target.value;


          syncSortSelect();

          applyFilters();

        }
      );

    }
  );

}


/* =========================================================
   BIND FILTERS
   ========================================================= */

function bindFilters(){

  document.addEventListener(
    "click",
    event => {

      const collectionButton =
        event.target.closest(
          "[data-collection]"
        );


      if(
        collectionButton
      ){

        const collection =
          collectionButton.dataset.collection;


        if(
          CATEGORIES.includes(
            collection
          )
        ){

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


      if(
        categoryButton
      ){

        const category =
          categoryButton.dataset.category;


        if(
          CATEGORIES.includes(
            category
          )
        ){

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
   BIND PRODUCT ACTIONS
   ========================================================= */

function bindProductActions(){

  document.addEventListener(
    "click",
    event => {

      const viewButton =
        event.target.closest(
          "[data-product-view]"
        );


      if(
        viewButton
      ){

        openProductModal(
          viewButton.dataset.productView
        );

        return;

      }


      const addButton =
        event.target.closest(
          "[data-add-to-cart]"
        );


      if(
        addButton
      ){

        addToCart(
          addButton.dataset.addToCart
        );


        return;

      }

    }
  );

}


/* =========================================================
   BIND CART ACTIONS
   ========================================================= */

function bindCartActions(){

  document.addEventListener(
    "click",
    event => {

      const plus =
        event.target.closest(
          "[data-cart-plus]"
        );


      if(plus){

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


      if(minus){

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


      if(remove){

        removeFromCart(
          remove.dataset.cartRemove
        );

        return;

      }


      const closeCartButton =
        event.target.closest(
          "[data-close-cart]"
        );


      if(
        closeCartButton
      ){

        closeCart();

        return;

      }


      const openCartButton =
        event.target.closest(
          "[data-open-cart]"
        );


      if(
        openCartButton
      ){

        openCart();

        return;

      }


      if(
        event.target.closest(
          "#cart-button"
        )
      ){

        openCart();

        return;

      }


      if(
        event.target.closest(
          "#checkout-button"
        )
      ){

        handleCheckout();

        return;

      }

    }
  );

}


/* =========================================================
   MODAL ACTIONS
   ========================================================= */

function bindModalActions(){

  document.addEventListener(
    "click",
    event => {

      if(
        event.target.closest(
          "[data-close-product]"
        )
      ){

        closeProductModal();

      }

    }
  );


  document.addEventListener(
    "keydown",
    event => {

      if(
        event.key ===
        "Escape"
      ){

        closeProductModal();

        closeCart();

      }

    }
  );

}


/* =========================================================
   FLUTTERWAVE CONFIGURATION
   =========================================================

   IMPORTANT:
   The public key may exist in the frontend.

   NEVER put a Flutterwave secret key here.

   ========================================================= */

const FLUTTERWAVE_PUBLIC_KEY =
  "FLWPUBK_TEST-REPLACE_WITH_YOUR_PUBLIC_KEY";


/* =========================================================
   FLUTTERWAVE SCRIPT
   ========================================================= */

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


/* =========================================================
   CUSTOMER DETAILS
   ========================================================= */

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


/* =========================================================
   CHECKOUT
   ========================================================= */

async function handleCheckout(){

  if(
    !state.cart.length
  ){

    showToast(
      "Your bag is empty."
    );

    return;

  }


  const customer =
    getCustomerDetails();


  if(!customer){

    showToast(
      "Checkout cancelled."
    );

    return;

  }


  const amount =
    getCartTotal();


  try{

    showToast(
      "Preparing secure checkout..."
    );


    await loadFlutterwave();


    if(
      typeof window.FlutterwaveCheckout !==
      "function"
    ){

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
          "Fashion & lifestyle purchase",

        logo:
          `${SITE_ROOT}images/logo.png`

      },

      callback:
        function(payment){

          handleFlutterwaveResponse(
            payment,
            transactionReference
          );

        },

      onclose:
        function(){

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
   FLUTTERWAVE RESPONSE
   ========================================================= */

function handleFlutterwaveResponse(
  payment,
  reference
){

  console.log(
    "Flutterwave payment response:",
    payment
  );


  if(
    payment &&
    (
      payment.status === "successful" ||
      payment.status === "completed"
    )
  ){

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
      () => {

        closeCart();

      },
      1000
    );


    return;

  }


  showToast(
    "Payment was not completed."
  );

}


/* =========================================================
   PAYMENT RETURN CHECK
   ========================================================= */

function handlePaymentReturn(){

  const params =
    new URLSearchParams(
      window.location.search
    );


  const status =
    params.get(
      "status"
    );


  const transactionId =
    params.get(
      "transaction_id"
    );


  if(
    status
  ){

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
   SHOP PAGE DETECTION
   ========================================================= */

function isShopPage(){

  const path =
    window.location.pathname
      .toLowerCase();


  return (
    path.endsWith(
      "/shop.html"
    ) ||
    path.endsWith(
      "/shop"
    ) ||
    document.querySelector(
      "[data-products]"
    )
  );

}


/* =========================================================
   INITIALIZE STORE CONTROLS
   ========================================================= */

function initializeStore(){

  if(
    !isShopPage()
  ){

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
   GLOBAL LINK HANDLING
   ========================================================= */

function setupSmoothScroll(){

  $all(
    'a[href^="#"]'
  ).forEach(
    link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute(
              "href"
            );


          if(
            !targetId ||
            targetId === "#"
          ){

            return;

          }


          const target =
            document.querySelector(
              targetId
            );


          if(!target){

            return;

          }


          event.preventDefault();


          target.scrollIntoView({

            behavior:
              "smooth",

            block:
              "start"

          });

        }
      );

    }
  );

}


/* =========================================================
   IMAGE ERROR HANDLING
   ========================================================= */

function setupImageFallback(){

  document.addEventListener(
    "error",
    event => {

      const image =
        event.target;


      if(
        image &&
        image.tagName ===
        "IMG"
      ){

        image.classList.add(
          "image-error"
        );

      }

    },
    true
  );

}


/* =========================================================
   CART BUTTON AUTO-DETECTION
   ========================================================= */

function setupCartButtons(){

  $all(
    "[data-open-cart]"
  ).forEach(
    button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();

          openCart();

        }
      );

    }
  );


  const cartButton =
    document.querySelector(
      "#cart-button"
    );


  if(cartButton){

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
   PRODUCT COLLECTION LINKS
   ========================================================= */

function setupCollectionLinks(){

  $all(
    'a[href*="shop.html?collection="]'
  ).forEach(
    link => {

      link.addEventListener(
        "click",
        () => {

          const href =
            link.getAttribute(
              "href"
            );


          if(!href){

            return;

          }


          const match =
            href.match(
              /collection=([^&]+)/i
            );


          if(
            match &&
            match[1]
          ){

            const collection =
              decodeURIComponent(
                match[1]
              );


            if(
              CATEGORIES.includes(
                collection
              )
            ){

              localStorage.setItem(
                COLLECTION_STORAGE_KEY,
                collection
              );

            }

          }

        }
      );

    }
  );

}


/* =========================================================
   PRODUCT IMAGE PRELOAD
   ========================================================= */

function preloadHeroImages(){

  const heroImages = [

    "hero-1.jpg",
    "hero-2.jpg",
    "hero-3.jpg",
    "hero-4.jpg",
    "hero-5.jpg",
    "hero-6.jpg"

  ];


  heroImages.forEach(
    filename => {

      const image =
        new Image();


      image.src =
        `${PATHS.hero}${filename}`;

    }
  );

}


/* =========================================================
   STORE DATA ACCESS
   ========================================================= */

window.AreaBoyzStore = {

  products:
    PRODUCTS,

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
   INITIALIZATION
   ========================================================= */

function init(){

  try{

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


    /*
      Re-render once after all listeners are ready.
    */

    applyFilters();


  }catch(error){

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

if(
  document.readyState === "loading"
){

  document.addEventListener(
    "DOMContentLoaded",
    init
  );

}else{

  init();

          }
