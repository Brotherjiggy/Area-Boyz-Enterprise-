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
   │
   └── collections/
   ========================================================= */


/* =========================================================
   CONFIG
   ========================================================= */

const CONFIG = {

  currency: "USD",

  storageKey: "areaBoyzCartV3",

  /*
    Put your Supabase project URL here after
    your Edge Functions are deployed.

    Example:

    supabaseUrl:
    "https://xxxxxxxx.supabase.co"
  */

  supabaseUrl: "",

  paymentFunction: "create-payment",

  verifyFunction: "verify-payment",

  shopName: "Area Boyz Enterprise"

};


/* =========================================================
   IMAGE PATHS
   ========================================================= */

const PATHS = {

  hero: "images/hero/",

  products: "images/products/",

  categories: "images/categories/",

  collections: "images/collections/"

};


const PRODUCT_TOTAL = 109;


/* =========================================================
   HERO IMAGES
   ========================================================= */

const HEROES = [

  "hero-1.jpg",
  "hero-2.jpg",
  "hero-3.jpg",
  "hero-4.jpg",
  "hero-5.jpg",
  "hero-6.jpg"

];


/* =========================================================
   PRODUCT INFORMATION
   =========================================================

   The first 80 products preserve the previous catalogue
   names/categories/prices.

   They now use:

   product-001.jpg
   product-002.jpg
   ...
   product-080.jpg

   Products 081-109 are automatically included.
   ========================================================= */

const META = [

  ["Blue Spiked Low-Top Sneaker","footwear","footwear",165],

  ["Brown Pointed Leather Shoe","footwear","footwear",190],

  ["Light Blue Hooded Shell Jacket","outerwear","streetwear",180],

  ["White Cropped Puffer Jacket","outerwear","streetwear",155],

  ["Spider-Man Graphic T-Shirt","shirts","streetwear",55],

  ["Red Spider Graphic Hoodie","hoodies","streetwear",120],

  ["White Polka-Dot Shirt with Pink Trousers","sets","streetwear",110],

  ["Black Leather Zip Jacket","outerwear","streetwear",210],

  ["Patchwork Multicolour Jacket","outerwear","handmade",240],

  ["Red and Black Racing Jacket","outerwear","streetwear",220],

  ["Brown High-Collar Patch Jacket","outerwear","streetwear",235],

  ["White Graphic Pullover Hoodie","hoodies","streetwear",125],

  ["Blue Quilted Cropped Jacket","outerwear","streetwear",150],

  ["Brown Oversized Goggles","accessories","accessories",90],

  ["Pink and Cream Hand-Knitted Piece","handmade","handmade",85],

  ["Denim Face-Cover Hood","accessories","accessories",75],

  ["Pink Ribbed Beanie","headwear","accessories",45],

  ["Black Hooded Graphic Jacket","hoodies","streetwear",145],

  ["Black Leopard Graphic T-Shirt","shirts","streetwear",60],

  ["Black Logo Bucket Hat","headwear","accessories",45],

  ["Camouflage Baseball Caps","headwear","accessories",40],

  ["Long Mesh Knit Top","shirts","handmade",95],

  ["Sheer Open-Knit Top","shirts","handmade",90],

  ["Wave Sole Running Sneaker","footwear","footwear",170],

  ["Brown Knit Zip Beanie","headwear","accessories",42],

  ["Olive Bomber Jacket","outerwear","streetwear",150],

  ["Brown Suiting Street Look","sets","streetwear",260],

  ["Blue Shearling-Style Jacket","outerwear","streetwear",190],

  ["Grey Shearling-Style Jacket","outerwear","streetwear",195],

  ["Graphic Bucket Hat","headwear","accessories",50],

  ["Green Graphic Face Cover","accessories","accessories",65],

  ["Cream and Blue Knit Textile","handmade","handmade",80],

  ["Dark Printed Bomber Jacket","outerwear","streetwear",210],

  ["Comic Face Long-Sleeve Shirt","shirts","streetwear",100],

  ["Printed Baseball Cap","headwear","accessories",48],

  ["Brown Embroidered Bomber","outerwear","streetwear",180],

  ["Wide-Leg Blue Denim","denim","streetwear",120],

  ["Monogram Flip-Flop Slides","footwear","footwear",65],

  ["Blue and White Rugby Shirt","shirts","streetwear",95],

  ["Colour-Block Track Jacket","outerwear","streetwear",145],

  ["Brown Embroidered Work Jacket","outerwear","handmade",215],

  ["Pink Cartoon Graphic Jacket","outerwear","streetwear",185],

  ["Black Graphic Denim Jacket","outerwear","streetwear",175],

  ["Blue Utility Denim Trousers","denim","streetwear",125],

  ["Green Painted Face Cap","headwear","accessories",50],

  ["Comic Graphic Shirt","shirts","streetwear",105],

  ["Leopard Print Bomber","outerwear","streetwear",190],

  ["Red Cropped Bomber with Fur Collar","outerwear","streetwear",175],

  ["Oversized Brown Cap","headwear","accessories",55],

  ["Floral Black Bomber","outerwear","streetwear",175],

  ["Black Graphic Tee with Eye Artwork","shirts","streetwear",60],

  ["Red Distressed Graphic Trousers","bottoms","streetwear",115],

  ["Black and White Air Graphic Jacket","outerwear","streetwear",200],

  ["Blue Denim Cargo Shorts","denim","streetwear",95],

  ["White Platform Sneaker","footwear","footwear",180],

  ["Brown Lug-Sole Shoe","footwear","footwear",185],

  ["Blue Low-Top Sneaker Pair","footwear","footwear",155],

  ["Black-and-White Platform Boots","footwear","footwear",210],

  ["Blue and Brown Leather Sneaker","footwear","footwear",195],

  ["Printed Floral Shirt","shirts","streetwear",95],

  ["Embroidered Beige Utility Jacket","outerwear","handmade",205],

  ["White Graphic Cartoon Tee","shirts","streetwear",55],

  ["Yellow Statement Text Tee","shirts","streetwear",58],

  ["Patchwork Camo Windbreaker","outerwear","streetwear",170],

  ["Purple Hooded Jacket","outerwear","streetwear",145],

  ["Blue Graphic Camo Jacket","outerwear","streetwear",180],

  ["Cream and Brown Knit Layer","handmade","handmade",90],

  ["Distressed Zip-Up Hoodie","hoodies","streetwear",135],

  ["Red Patchwork Cargo Trousers","bottoms","streetwear",125],

  ["Grey Embellished Knit Top","shirts","handmade",130],

  ["Long Embellished Scarf","accessories","accessories",80],

  ["Grey Distressed Knit Top","shirts","handmade",120],

  ["Tan Fringe Hat","headwear","handmade",75],

  ["Patchwork Tattered Cape","outerwear","handmade",190],

  ["Blue Ribbed Beanie","headwear","accessories",42],

  ["White Kanye West Graphic Tee","shirts","streetwear",60],

  ["Red Graphic Stripe Tee","shirts","streetwear",60],

  ["White Graphic Air Tee","shirts","streetwear",58],

  ["Black Eye Graphic Tee","shirts","streetwear",60],

  ["Red and Black Styled Set","sets","streetwear",240]

];


/* =========================================================
   CATEGORY FILTERS
   ========================================================= */

const CATEGORIES = [

  "all",
  "streetwear",
  "handmade",
  "footwear",
  "accessories"

];


/* =========================================================
   BUILD PRODUCTS
   ========================================================= */

const PRODUCTS = Array.from(

  { length: PRODUCT_TOTAL },

  (_, index) => {

    const number = index + 1;

    const padded = String(number).padStart(3, "0");

    const meta = META[index];

    const name =
      meta?.[0] ||
      `Area Boyz Product ${padded}`;

    const category =
      meta?.[1] ||
      "streetwear";

    const collection =
      meta?.[2] ||
      "streetwear";

    const price =
      meta?.[3] ??
      100;

    return {

      id: `ab-${padded}`,

      number,

      name,

      category,

      collection,

      price,

      image: `product-${padded}.jpg`,

      description:
        `${name}. View the product photograph for the exact visible design, colour and construction.`,

      details: [

        `Catalogue image: product-${padded}.jpg`,

        `Category: ${category}`,

        `Collection: ${collection}`

      ]

    };

  }

);


/* =========================================================
   STATE
   ========================================================= */

const state = {

  collection: "all",

  query: "",

  sort: "featured",

  cart: []

};


/* =========================================================
   DOM HELPER
   ========================================================= */

const $ = selector =>
  document.querySelector(selector);


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value){

  return String(value ?? "").replace(

    /[&<>"']/g,

    character => ({

      "&":"&amp;",

      "<":"&lt;",

      ">":"&gt;",

      "\"":"&quot;",

      "'":"&#039;"

    }[character])

  );

}


/* =========================================================
   MONEY
   ========================================================= */

function money(number){

  return new Intl.NumberFormat(

    "en-US",

    {

      style:"currency",

      currency:CONFIG.currency

    }

  ).format(Number(number) || 0);

}


/* =========================================================
   PRODUCT LOOKUP
   ========================================================= */

function product(id){

  return PRODUCTS.find(
    item => item.id === id
  );

}


/* =========================================================
   ASSET URL
   ========================================================= */

function asset(folder,file){

  return new URL(

    `${folder}${encodeURIComponent(file)}`,

    document.baseURI

  ).href;

}


/* =========================================================
   PRODUCT IMAGE
   ========================================================= */

function productImage(file){

  return asset(
    PATHS.products,
    file
  );

}


/* =========================================================
   HERO IMAGE
   ========================================================= */

function heroImage(file){

  return asset(
    PATHS.hero,
    file
  );

}


/* =========================================================
   SAFE IMAGE
   =========================================================

   If an image cannot load, the user won't see a broken
   image icon. A clean Area Boyz placeholder is shown.
   ========================================================= */

function safeImg(
  src,
  alt = "",
  className = ""
){

  const fallback =
    "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 800%22%3E%3Crect width=%22800%22 height=%22800%22 fill=%22%23f0eee8%22/%3E%3Ctext x=%22400%22 y=%22400%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-family=%22Arial%22 font-size=%2238%22 fill=%22%23111111%22%3EAREA BOYZ%3C/text%3E%3C/svg%3E";

  return `

    <img

      class="${className}"

      src="${src}"

      alt="${escapeHTML(alt)}"

      loading="lazy"

      decoding="async"

      onerror="this.onerror=null;this.classList.add('img-failed');this.src='${fallback}'"

    >

  `;

}


/* =========================================================
   CART
   ========================================================= */

function loadCart(){

  try{

    const saved =
      JSON.parse(
        localStorage.getItem(CONFIG.storageKey) || "[]"
      );

    return saved.filter(

      item =>
        productSafe(item.id) &&
        Number(item.qty) > 0

    );

  }catch{

    return [];

  }

}


function productSafe(id){

  return (

    /^ab-\d{3}$/.test(String(id)) &&

    Number(id.slice(3)) >= 1 &&

    Number(id.slice(3)) <= PRODUCT_TOTAL

  );

}


function saveCart(){

  localStorage.setItem(

    CONFIG.storageKey,

    JSON.stringify(state.cart)

  );

}


/* =========================================================
   TOAST
   ========================================================= */

function toast(message){

  const element = $("#toast");

  if(!element) return;

  element.textContent = message;

  element.classList.add("show");

  clearTimeout(toast.timer);

  toast.timer = setTimeout(

    () => element.classList.remove("show"),

    3200

  );

}


/* =========================================================
   FILTER PRODUCTS
   ========================================================= */

function filtered(){

  let list = PRODUCTS.filter(

    item =>

      state.collection === "all" ||

      item.collection === state.collection ||

      item.category === state.collection

  );


  if(state.query){

    const query =
      state.query.toLowerCase();

    list = list.filter(

      item =>

        `${item.name} ${item.category} ${item.collection}`

          .toLowerCase()

          .includes(query)

    );

  }


  if(state.sort === "low"){

    list.sort(
      (a,b) => a.price - b.price
    );

  }


  if(state.sort === "high"){

    list.sort(
      (a,b) => b.price - a.price
    );

  }


  if(state.sort === "name"){

    list.sort(
      (a,b) =>
        a.name.localeCompare(b.name)
    );

  }


  return list;

}


/* =========================================================
   FILTER BUTTONS
   ========================================================= */

function renderFilters(){

  const wrapper =
    $("#filters");

  if(!wrapper) return;

  wrapper.innerHTML =
    CATEGORIES.map(

      category => `

        <button

          class="filter ${
            state.collection === category
              ? "active"
              : ""
          }"

          data-filter="${category}"

        >

          ${
            category.charAt(0).toUpperCase() +
            category.slice(1)
          }

        </button>

      `

    ).join("");

}


/* =========================================================
   PRODUCTS
   ========================================================= */

function renderProducts(){

  const list = filtered();

  $("#resultsMeta").textContent =

    `${list.length} product${
      list.length === 1 ? "" : "s"
    } shown`;


  $("#productGrid").innerHTML =

    list.map(

      item => `

        <article class="product-card">

          <button

            class="product-media"

            data-open="${item.id}"

            aria-label="View ${escapeHTML(item.name)}"

          >

            ${safeImg(

              productImage(item.image),

              item.name

            )}

            <span>
              ${escapeHTML(item.category)}
            </span>

          </button>


          <div class="product-body">

            <p class="product-number">

              PRODUCT
              ${String(item.number).padStart(3,"0")}

            </p>


            <h3>
              ${escapeHTML(item.name)}
            </h3>


            <p>
              ${escapeHTML(item.description)}
            </p>


            <div class="product-row">

              <strong>
                ${money(item.price)}
              </strong>


              <button

                class="mini-btn"

                data-add="${item.id}"

              >

                Add

              </button>

            </div>

          </div>

        </article>

      `

    ).join("");


  $("#emptyState")
    .classList
    .toggle(
      "hidden",
      list.length > 0
    );

}


/* =========================================================
   HERO SLIDER
   ========================================================= */

let heroIndex = 0;

let heroTimer;


/* Render slides */

function renderHero(){

  const stage =
    $("#heroSlides");

  if(!stage) return;


  stage.innerHTML =

    HEROES.map(

      (file,index) => `

        <div

          class="hero-slide ${
            index === 0
              ? "active"
              : ""
          }"

          data-slide="${index}"

        >

          ${safeImg(

            heroImage(file),

            `Area Boyz hero ${index + 1}`

          )}

          <div class="hero-slide-shade"></div>

        </div>

      `

    ).join("");


  $("#heroDots").innerHTML =

    HEROES.map(

      (_,index) => `

        <button

          class="hero-dot ${
            index === 0
              ? "active"
              : ""
          }"

          data-hero="${index}"

          aria-label="Show hero ${index + 1}"

        ></button>

      `

    ).join("");


  startHero();

}


/* Change slide */

function showHero(index){

  const slides =
    [...document.querySelectorAll(".hero-slide")];

  const dots =
    [...document.querySelectorAll(".hero-dot")];


  if(!slides.length) return;


  heroIndex =
    (index + slides.length) %
    slides.length;


  slides.forEach(

    (slide,number) => {

      slide.classList.toggle(

        "active",

        number === heroIndex

      );

    }

  );


  dots.forEach(

    (dot,number) => {

      dot.classList.toggle(

        "active",

        number === heroIndex

      );

    }

  );

}


/* Start automatic slideshow */

function startHero(){

  clearInterval(heroTimer);

  heroTimer = setInterval(

    () => showHero(heroIndex + 1),

    5000

  );

}


/* =========================================================
   PRODUCT MODAL
   ========================================================= */

function openModal(id){

  const item =
    product(id);

  if(!item) return;


  $("#modalContent").innerHTML = `

    <div class="modal-product">


      <div class="modal-product-main">

        ${safeImg(

          productImage(item.image),

          item.name

        )}

      </div>


      <div class="modal-info">

        <p class="eyebrow">

          ${escapeHTML(
            item.collection.toUpperCase()
          )}

        </p>


        <p class="product-number">

          PRODUCT
          ${String(item.number).padStart(3,"0")}

        </p>


        <h2>
          ${escapeHTML(item.name)}
        </h2>


        <div class="modal-price">

          ${money(item.price)}

        </div>


        <p>
          ${escapeHTML(item.description)}
        </p>


        <ul>

          ${item.details.map(

            detail => `

              <li>
                ${escapeHTML(detail)}
              </li>

            `

          ).join("")}

        </ul>


        <button

          class="btn dark full"

          data-add="${item.id}"

        >

          Add to bag

        </button>

      </div>

    </div>

  `;


  $("#productModal")
    .classList
    .add("open");


  $("#productModal")
    .setAttribute(
      "aria-hidden",
      "false"
    );


  document.body.classList.add("lock");

}


function closeModal(){

  $("#productModal")
    .classList
    .remove("open");


  $("#productModal")
    .setAttribute(
      "aria-hidden",
      "true"
    );


  document.body.classList.remove("lock");

}


/* =========================================================
   ADD TO CART
   ========================================================= */

function add(id){

  const item =
    product(id);

  if(!item) return;


  const line =
    state.cart.find(
      entry => entry.id === id
    );


  if(line){

    line.qty++;

  }else{

    state.cart.push({

      id,

      qty:1

    });

  }


  saveCart();

  renderCart();

  toast(
    `${item.name} added to your bag.`
  );

}


/* =========================================================
   CHANGE CART QUANTITY
   ========================================================= */

function change(id,delta){

  const line =
    state.cart.find(
      entry => entry.id === id
    );

  if(!line) return;


  line.qty += delta;


  if(line.qty <= 0){

    state.cart =
      state.cart.filter(
        entry => entry.id !== id
      );

  }


  saveCart();

  renderCart();

}


/* =========================================================
   SUBTOTAL
   ========================================================= */

function subtotal(){

  return state.cart.reduce(

    (total,line) =>

      total +

      (
        product(line.id)?.price || 0
      ) *

      line.qty,

    0

  );

}


/* =========================================================
   RENDER CART
   ========================================================= */

function renderCart(){

  const wrapper =
    $("#cartItems");


  if(!state.cart.length){

    wrapper.innerHTML = `

      <div class="empty">

        <i class="fa-solid fa-bag-shopping"></i>

        <h3>
          Your bag is empty
        </h3>

        <p>
          Add something from the catalogue.
        </p>

      </div>

    `;


    $("#cartTotal").textContent =
      money(0);

    $("#cartCount").textContent =
      "0";

    return;

  }


  wrapper.innerHTML =

    state.cart.map(

      line => {

        const item =
          product(line.id);


        return `

          <div class="cart-line">


            ${safeImg(

              productImage(item.image),

              item.name

            )}


            <div class="cart-info">

              <h4>
                ${escapeHTML(item.name)}
              </h4>


              <small>
                ${money(item.price)} each
              </small>


              <div class="qty">

                <button

                  data-qty="${item.id}"

                  data-delta="-1"

                >

                  −

                </button>


                <b>
                  ${line.qty}
                </b>


                <button

                  data-qty="${item.id}"

                  data-delta="1"

                >

                  +

                </button>

              </div>


              <button

                class="remove"

                data-remove="${item.id}"

              >

                Remove

              </button>

            </div>


            <strong>

              ${money(
                item.price * line.qty
              )}

            </strong>


          </div>

        `;

      }

    ).join("");


  $("#cartTotal").textContent =
    money(subtotal());


  $("#cartCount").textContent =
    state.cart.reduce(
      (total,line) =>
        total + line.qty,
      0
    );

}


/* =========================================================
   CART OPEN/CLOSE
   ========================================================= */

function openCart(){

  $("#cartDrawer")
    .classList
    .add("open");

  $("#drawerBackdrop")
    .classList
    .add("show");

  document.body.classList.add("lock");

}


function closeCart(){

  $("#cartDrawer")
    .classList
    .remove("open");

  $("#drawerBackdrop")
    .classList
    .remove("show");

  document.body.classList.remove("lock");

}


/* =========================================================
   CHECKOUT FORM
   ========================================================= */

function checkoutForm(){

  if(!state.cart.length){

    toast("Your bag is empty.");

    return;

  }


  $("#cartItems").innerHTML = `

    <form
      class="checkout-form"
      id="checkoutForm"
    >

      <h3>
        Checkout
      </h3>


      <p class="notice">

        Order total:

        <strong>
          ${money(subtotal())}
        </strong>

      </p>


      <label>

        Full name

        <input
          name="name"
          required
          autocomplete="name"
        >

      </label>


      <label>

        Email

        <input
          name="email"
          type="email"
          required
          autocomplete="email"
        >

      </label>


      <label>

        Phone

        <input
          name="phone"
          required
          autocomplete="tel"
        >

      </label>


      <button
        class="btn dark full"
        type="submit"
      >

        Continue to Flutterwave

      </button>


      <div
        id="checkoutError"
        class="error"
        role="alert">
      </div>


      <button
        type="button"
        class="text-btn"
        id="backToCart">

        ← Back to bag

      </button>

    </form>

  `;


  $("#checkoutForm")
    .addEventListener(
      "submit",
      startPayment
    );


  $("#backToCart")
    .addEventListener(
      "click",
      renderCart
    );

}


/* =========================================================
   START FLUTTERWAVE PAYMENT
   ========================================================= */

async function startPayment(event){

  event.preventDefault();


  const form =
    new FormData(
      event.currentTarget
    );


  const customer = {

    name:
      String(
        form.get("name") || ""
      ).trim(),

    email:
      String(
        form.get("email") || ""
      ).trim(),

    phone:
      String(
        form.get("phone") || ""
      ).trim()

  };


  const error =
    $("#checkoutError");


  if(
    !customer.name ||
    !customer.email ||
    !customer.phone
  ){

    error.textContent =
      "Please complete all fields.";

    return;

  }


  if(!CONFIG.supabaseUrl){

    error.textContent =
      "Checkout is not connected yet. Add your Supabase project URL in js/app.js.";

    return;

  }


  const button =
    event.currentTarget.querySelector(
      'button[type="submit"]'
    );


  button.disabled = true;

  button.textContent =
    "Creating secure checkout…";


  try{

    const response =
      await fetch(

        `${CONFIG.supabaseUrl.replace(
          /\/$/,
          ""
        )}/functions/v1/${CONFIG.paymentFunction}`,

        {

          method:"POST",

          headers:{
            "Content-Type":
              "application/json"
          },

          body:JSON.stringify({

            customer,

            items:
              state.cart.map(
                line => ({
                  id:line.id,
                  qty:line.qty
                })
              ),

            redirect_url:
              location.href.split("?")[0]

          })

        }

      );


    const data =
      await response
        .json()
        .catch(
          () => ({})
        );


    if(
      !response.ok ||
      !data.link
    ){

      throw new Error(

        data.error ||
        "Unable to create the payment link."

      );

    }


    localStorage.setItem(

      "areaBoyzPendingTx",

      data.tx_ref || ""

    );


    location.href =
      data.link;


  }catch(errorObject){

    error.textContent =
      errorObject.message ||
      "Unable to start checkout.";


    button.disabled = false;

    button.textContent =
      "Continue to Flutterwave";

  }

}


/* =========================================================
   PAYMENT RETURN
   ========================================================= */

async function handlePaymentReturn(){

  const query =
    new URLSearchParams(
      location.search
    );


  const status =
    query.get("status");


  const transactionId =
    query.get("transaction_id");


  const txRef =
    query.get("tx_ref") ||

    localStorage.getItem(
      "areaBoyzPendingTx"
    ) ||

    "";


  if(
    !status &&
    !transactionId
  ){

    return;

  }


  if(status === "cancelled"){

    toast(
      "Payment was cancelled. Your bag is still here."
    );

  }


  else if(status === "failed"){

    toast(
      "Payment was not completed. Your bag is still here."
    );

  }


  else if(

    status === "successful" &&

    transactionId &&

    txRef

  ){

    if(!CONFIG.supabaseUrl){

      toast(
        "Payment returned, but verification is not connected yet."
      );

    }

    else{

      toast(
        "Verifying your payment…"
      );


      try{

        const response =
          await fetch(

            `${CONFIG.supabaseUrl.replace(
              /\/$/,
              ""
            )}/functions/v1/${CONFIG.verifyFunction}`,

            {

              method:"POST",

              headers:{
                "Content-Type":
                  "application/json"
              },

              body:JSON.stringify({

                transaction_id:
                  transactionId,

                tx_ref:
                  txRef

              })

            }

          );


        const data =
          await response
            .json()
            .catch(
              () => ({})
            );


        if(
          !response.ok ||
          !data.verified
        ){

          throw new Error(

            data.error ||
            "Payment verification failed. Your bag is safe."

          );

        }


        state.cart = [];

        saveCart();


        localStorage.removeItem(
          "areaBoyzPendingTx"
        );


        localStorage.setItem(
          "areaBoyzLastTx",
          txRef
        );


        toast(
          "Payment verified successfully. Thank you for your order!"
        );


      }catch(errorObject){

        toast(

          errorObject.message ||
          "We could not verify the payment yet."

        );

      }

    }

  }


  history.replaceState(

    {},

    document.title,

    location.pathname +
    location.hash

  );

}


/* =========================================================
   EVENT BINDING
   ========================================================= */

function bind(){

  document.addEventListener(

    "click",

    event => {

      const filter =
        event.target.closest(
          "[data-filter]"
        );


      if(filter){

        state.collection =
          filter.dataset.filter;

        renderFilters();

        renderProducts();

        document
          .querySelector("#shop")
          ?.scrollIntoView({
            behavior:"smooth"
          });

      }


      const addButton =
        event.target.closest(
          "[data-add]"
        );


      if(addButton){

        add(
          addButton.dataset.add
        );


        if(
          $("#productModal")
            .classList
            .contains("open")
        ){

          closeModal();

        }

      }


      const openButton =
        event.target.closest(
          "[data-open]"
        );


      if(openButton){

        openModal(
          openButton.dataset.open
        );

      }


      const quantityButton =
        event.target.closest(
          "[data-qty]"
        );


      if(quantityButton){

        change(

          quantityButton.dataset.qty,

          Number(
            quantityButton.dataset.delta
          )

        );

      }


      const removeButton =
        event.target.closest(
          "[data-remove]"
        );


      if(removeButton){

        change(
          removeButton.dataset.remove,
          -999
        );

      }


      if(
        event.target.closest(
          "[data-close-modal]"
        )
      ){

        closeModal();

      }


      const collection =
        event.target.closest(
          "[data-collection]"
        );


      if(collection){

        state.collection =
          collection.dataset.collection;

        renderFilters();

        renderProducts();

        location.hash =
          "shop";

      }


      const heroDot =
        event.target.closest(
          "[data-hero]"
        );


      if(heroDot){

        showHero(
          Number(
            heroDot.dataset.hero
          )
        );

        startHero();

      }


      const previous =
        event.target.closest(
          "[data-hero-prev]"
        );


      if(previous){

        showHero(
          heroIndex - 1
        );

        startHero();

      }


      const next =
        event.target.closest(
          "[data-hero-next]"
        );


      if(next){

        showHero(
          heroIndex + 1
        );

        startHero();

      }

    }

  );


  $("#sort")
    .addEventListener(

      "change",

      event => {

        state.sort =
          event.target.value;

        renderProducts();

      }

    );


  $("#clearFilters")
    .addEventListener(

      "click",

      () => {

        state.collection =
          "all";

        state.query =
          "";

        $("#searchInput").value =
          "";

        renderFilters();

        renderProducts();

      }

    );


  $("#searchBtn")
    .addEventListener(

      "click",

      () => {

        $("#searchPanel")
          .classList
          .toggle("open");


        if(
          $("#searchPanel")
            .classList
            .contains("open")
        ){

          $("#searchInput").focus();

        }

      }

    );


  $("#searchClose")
    .addEventListener(

      "click",

      () => {

        $("#searchPanel")
          .classList
          .remove("open");

      }

    );


  $("#searchInput")
    .addEventListener(

      "input",

      event => {

        state.query =
          event.target.value.trim();

        renderProducts();

      }

    );


  $("#cartBtn")
    .addEventListener(
      "click",
      openCart
    );


  $("#cartClose")
    .addEventListener(
      "click",
      closeCart
    );


  $("#drawerBackdrop")
    .addEventListener(
      "click",
      closeCart
    );


  $("#checkoutBtn")
    .addEventListener(
      "click",
      checkoutForm
    );


  $("#menuBtn")
    .addEventListener(

      "click",

      () => {

        const open =
          $("#mobileNav")
            .classList
            .toggle("open");


        $("#menuBtn")
          .setAttribute(
            "aria-expanded",
            String(open)
          );

      }

    );


  $("#mobileNav")
    .addEventListener(

      "click",

      event => {

        if(
          event.target.matches("a")
        ){

          $("#mobileNav")
            .classList
            .remove("open");

        }

      }

    );


  window.addEventListener(

    "keydown",

    event => {

      if(event.key === "Escape"){

        closeModal();

        closeCart();

      }

    }

  );

}


/* =========================================================
   INIT
   ========================================================= */

function init(){

  state.cart =
    loadCart();


  $("#year").textContent =
    new Date().getFullYear();


  renderHero();

  renderFilters();

  renderProducts();

  renderCart();

  handlePaymentReturn();

  bind();


  setTimeout(

    () => {

      $("#preloader")
        ?.classList
        .add("hide");

    },

    450

  );

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
