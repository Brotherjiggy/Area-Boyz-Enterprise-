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
   SITE PATHS
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
const VISUAL_PRODUCT_DATA = {
  "001": ["Black tailored long-coat look","outerwear","A black floor-length tailored outer layer shown on a model, with a structured silhouette and a dramatic elongated hem."],
  "002": ["Yellow graphic slogan T-shirt","shirts","Yellow short-sleeve T-shirt with a bold black printed slogan across the chest."],
  "003": ["Blue lightweight logo jacket","outerwear","Blue lightweight zip-front jacket with a small contrasting chest mark and a relaxed everyday shape."],
  "004": ["Pink cartoon graphic jacket","outerwear","Bright pink jacket covered with colorful cartoon-style graphics and large front artwork."],
  "005": ["White cartoon graphic T-shirt","shirts","White T-shirt featuring a colorful cartoon-style character graphic and printed text across the front."],
  "006": ["White illustrated graphic T-shirt","shirts","White T-shirt with a large illustrated character graphic printed across the front."],
  "007": ["Blue-and-white athletic sneaker","footwear","Low-top sneaker with a white upper, blue detailing and a chunky cushioned sole."],
  "008": ["Black-and-white high-top footwear","footwear","Black-and-white high-top footwear with wrapped contrasting straps and a chunky sole."],
  "009": ["Sheer mesh tank top","shirts","Sleeveless sheer mesh top with an open textured pattern and a fitted, elongated silhouette."],
  "010": ["Black streetwear jacket with red sneakers","outerwear","Black hooded streetwear jacket shown with bright red sneakers; the garment has a relaxed, layered silhouette."],
  "011": ["Black hooded utility jacket","outerwear","Black hooded jacket with a technical, panelled construction and relaxed outerwear proportions."],
  "012": ["White layered formal outfit","sets","White long coat and coordinated layered trousers shown as a complete formal outfit."],
  "013": ["Brown long tailored coat","outerwear","Long brown tailored coat with a clean front and elongated formal silhouette."],
  "014": ["Brown long-sleeve relaxed outfit","sets","Monochrome brown long-sleeve top and matching trousers styled as a coordinated relaxed outfit."],
  "015": ["Mixed streetwear outfit collage","sets","A collage of layered streetwear pieces including graphic outerwear, hoodies and dark bottoms."],
  "016": ["Neutral cap collection","headwear","Selection of neutral-toned caps in several shapes and shades, displayed as a small headwear collection."],
  "017": ["Plaid wrap skirt outfit","sets","Model wearing a light top with a long red-and-brown plaid wrap-style skirt."],
  "018": ["Blue denim detail piece","denim","Close-up of blue denim with a contrasting stitched decorative motif near the pocket area."],
  "019": ["Distressed neutral graphic top","shirts","Neutral-toned top with a worn, distressed finish and large printed numerals/graphics."],
  "020": ["Brown relaxed two-piece outfit","sets","Brown coordinated outfit consisting of a relaxed top and matching wide-leg trousers."],
  "021": ["Blue embellished long dress","sets","Long blue dress with prominent decorative embellishment and a flowing silhouette."],
  "022": ["Layered tailored clothing display","sets","A coordinated display of layered tailored garments in neutral and muted tones."],
  "023": ["Teal fitted long-sleeve top","shirts","Teal long-sleeve top with a close, streamlined silhouette and high neckline."],
  "024": ["Gray relaxed trousers and bag","bottoms","Gray wide-leg trousers paired with a dark handbag, presented as a polished casual look."],
  "025": ["Black leather fashion look","outerwear","Black leather-focused outfit shown on a model, with a fitted jacket and layered dark styling."],
  "026": ["Multicolor illustrated bomber jacket","outerwear","Colorful bomber-style jacket covered in bold illustrated graphics and contrasting artwork."],
  "027": ["Red graphic distressed trousers","bottoms","Red trousers featuring printed graphics, distressed details and a relaxed streetwear cut."],
  "028": ["Black structured mini bag","bags","Compact black structured bag with a short handle and rectangular silhouette."],
  "029": ["Mustard cropped polo shirt","shirts","Mustard-yellow cropped short-sleeve shirt with a pointed collar and small embroidered chest detail."],
  "030": ["Black tailored long coat","outerwear","Black tailored coat with a long, flowing silhouette and sharp formal proportions."],
  "031": ["Blue denim vest","denim","Sleeveless blue denim vest with a simple V-neck front and fitted arm openings."],
  "032": ["Fringe detail long-sleeve top","shirts","Light gray long-sleeve top with hanging fringe or tassel-like detailing throughout the front."],
  "033": ["Cream layered knit look","sets","Cream and tan layered knit styling with a soft oversized wrap-like upper layer."],
  "034": ["Pale blue patterned puffer jacket","outerwear","Light blue padded jacket with an all-over decorative pattern and high collar."],

  "036": ["Decorative beaded neck accessory","accessories","Long decorative neck piece with beads, metallic-looking accents and layered ornamentation."],
  "037": ["White cropped jacket","outerwear","White cropped jacket with a high collar, gathered cuffs and a compact structured silhouette."],
  "038": ["Gray compact shoulder bag","bags","Small gray shoulder or crossbody bag with a rounded rectangular body and dark strap details."],
  "039": ["Spider graphic T-shirt","shirts","White T-shirt with a large red-and-blue superhero-style spider graphic across the front."],
  "040": ["White casual top and blue jeans outfit","sets","Casual outfit combining a white long-sleeve top with relaxed blue jeans."],
  "041": ["Blue patterned slide sandals","footwear","Open slide sandals with blue decorative straps and a flat everyday sole."],

  "043": ["Multicolor knitted beanie","headwear","Chunky knitted beanie with alternating blue, cream and neutral textured bands."],
  "044": ["Printed cap worn outdoors","headwear","Patterned baseball-style cap shown worn, featuring a multicolor illustrated print."],
  "045": ["Olive padded jacket","outerwear","Olive green padded jacket with a high collar and warm-looking quilted construction."],
  "046": ["Black floral bomber jacket","outerwear","Black bomber-style jacket decorated with large pink and red floral graphics."],
  "047": ["Red cropped jacket with multicolor styling","outerwear","Bright red cropped jacket styled with contrasting multicolor neck and scarf-like details."],
  "048": ["Green illustrated bucket hat","headwear","Green bucket hat covered with black-and-white illustrated graphics."],
  "049": ["Black graphic beanie","headwear","Black knit beanie featuring a small contrasting graphic emblem on the front."],
  "050": ["Black-and-purple graphic hoodie","hoodies","Dark hooded jacket or hoodie with purple accents and a red graphic printed on the chest."],
  "051": ["Heavy black utility footwear","footwear","Chunky black footwear with rugged soles and multiple straps or hardware details."],
  "052": ["Black graphic sweatshirt","shirts","Black long-sleeve sweatshirt with a small centered printed graphic across the chest."],
  "053": ["Black sculptural accessory","accessories","Black rounded sculptural accessory displayed in close-up, with a hard textured surface."],

  "055": ["Pink-and-blue hooded jacket","outerwear","Color-block hooded jacket combining a bright pink hood with blue textured body panels."],
  "056": ["Dark blue cropped jacket","outerwear","Dark blue cropped jacket with contrasting trim and a clean zip-front construction."],
  "057": ["Burgundy graphic varsity jacket","outerwear","Burgundy varsity-style jacket with cream sleeves, graphic lettering and decorative patches."],
  "058": ["Olive hooded jacket","outerwear","Olive green hooded jacket with a compact cropped shape and utility-inspired styling."],
  "059": ["Brown leather tote bag","bags","Brown leather-look tote with two handles and a simple open-top rectangular silhouette."],
  "060": ["Mustard cropped polo jacket","outerwear","Mustard cropped collared jacket with a small embroidered chest detail and short boxy cut."],
  "061": ["Black padded utility jacket","outerwear","Black padded jacket with multiple utility pockets and a high protective collar."],
  "062": ["Brown rugged boots","footwear","Pair of brown rugged lace-up boots with substantial soles and a worn outdoor character."],
  "063": ["Red low-top sneakers","footwear","Red low-top sneakers with contrasting white detailing and a casual athletic silhouette."],
  "064": ["Black leather backpack","bags","Compact black leather-look backpack with a rounded top and front pocket."],
  "065": ["Color-block hooded jacket","outerwear","Relaxed hooded jacket combining muted lavender, tan and olive panels with a layered color-block design."],
  "066": ["Cream sculptural footwear detail","footwear","Close-up of light neutral footwear with sculptural layered construction and rounded forms."],
  "067": ["Colorful outerwear collection","outerwear","Display of several colorful outerwear pieces in different graphic and utility styles."],
  "068": ["Black-and-denim layered streetwear","sets","Dark streetwear look combining a black upper layer with blue denim bottoms and chain-like details."],
  "069": ["Red-and-black varsity jacket","outerwear","Red-and-black varsity-style jacket with contrasting lettering and athletic-inspired paneling."],
  "070": ["Black textured statement jacket","outerwear","Black statement jacket with a heavily textured, sculptural surface and voluminous silhouette."],
  "071": ["Multicolor patchwork hooded jacket","outerwear","Patchwork-style hooded jacket covered in colorful illustrated fabric sections."],
  "072": ["Black padded gloves","accessories","Pair of black padded gloves with a quilted or segmented construction."],
  "073": ["Vintage leather jacket rack","outerwear","Several vintage-style leather jackets displayed together, showing dark worn finishes and varied cuts."],
  "074": ["Orange-and-white graphic sneakers","footwear","Low-top sneakers with orange and white contrast panels and a sporty sole."],
  "075": ["Red high-top sneakers","footwear","Red high-top sneakers with white laces and contrasting trim."],
  "076": ["Black-white-red high-top sneaker","footwear","High-top sneaker combining black, white and red panels with a chunky athletic sole."],
  "077": ["Blue leather jacket","outerwear","Blue-gray leather-style jacket with a front zip, chest pockets and a classic biker-inspired cut."],
  "078": ["Blue ribbed knit top","shirts","Blue ribbed long-sleeve knit top with a simple fitted silhouette."],
  "079": ["Tan western graphic jacket","outerwear","Tan jacket with a large western-style graphic across the back and a structured collar."],
  "080": ["Patchwork striped jacket","outerwear","Jacket assembled from horizontal strips of contrasting fabrics and muted colors."],

  "081": ["Abstract printed fitted top","shirts","Fitted long-sleeve top with a large abstract portrait-style print in dark neutral tones."],
  "082": ["Tan graphic western jacket","outerwear","Tan western-inspired jacket with large illustrated artwork and decorative chest details."],
  "083": ["Colorful illustrated jacket","outerwear","Bright multicolor jacket covered with dense abstract and illustrated graphics."],
  "084": ["Mixed shirt and jacket collection","sets","A mixed clothing display featuring a light jacket, red plaid shirt and neutral knit pieces."],
  "085": ["Tan zip-up graphic jacket","outerwear","Tan jacket with a high collar, zip front and bold graphic detailing around the chest and shoulders."],
  "086": ["Gray graphic hooded sweatshirt","hoodies","Gray hooded sweatshirt with large collegiate-style lettering and numerals across the front."],
  "087": ["Black embossed card wallet","accessories","Compact black leather-look card wallet with embossed detailing and multiple card slots."],
  "088": ["Black graphic jacket","outerwear","Black jacket with a large contrasting graphic panel and structured zip-front construction."],
  "089": ["Black knit beanie","headwear","Simple black knit beanie with a small decorative emblem on the front."],
  "090": ["White relaxed outfit","sets","White short-sleeve top and matching relaxed trousers styled as a clean monochrome outfit."],
  "091": ["Plain white T-shirt","shirts","Clean white short-sleeve T-shirt with a minimal front and no visible large graphic."],
  "092": ["White utility trousers","bottoms","White wide-leg trousers with visible pocket and panel details for a utility-inspired look."],
  "093": ["Colorful graphic slides","footwear","Open slide sandals with colorful printed straps and a flat casual sole."],
  "094": ["Black padded gloves","accessories","Pair of black padded gloves with segmented construction and a rugged appearance."],
  "095": ["Light blue patterned cap","headwear","Light blue cap featuring an all-over newspaper-style printed pattern."],
  "096": ["Blue hooded leather-style jacket","outerwear","Blue jacket with a bright pink hood, front zip and compact hooded silhouette."],
  "097": ["Burgundy graphic varsity jacket","outerwear","Burgundy varsity-style jacket with cream sleeves, bold front artwork and decorative trim."],
  "098": ["Blue hooded leather-style jacket","outerwear","Blue jacket with a bright pink hood and front zip, shown as a clean product view."],
  "099": ["Vintage dark leather jacket","outerwear","Dark vintage-style leather jacket with a worn finish, broad shoulders and classic utility details."],
  "100": ["Black padded gloves","accessories","Pair of black padded gloves with a quilted texture and protective-looking construction."],
  "101": ["White patterned shirt with pink trousers","sets","White button-front shirt with small dark patterning paired with loose pink trousers."],
  "102": ["Brown rugged leather boot","footwear","Brown rugged boot with a thick treaded sole and raised ankle construction."],
  "103": ["Sneaker display collage","footwear","Collage showing several sneaker styles and colorways, including red, blue, black and white pairs."],
  "104": ["Mixed sneaker display","footwear","Display of multiple sneaker silhouettes and colorways arranged together as a footwear selection."],
  "105": ["Red-and-black travel outfit","sets","Person wearing a coordinated red-and-black outfit with a matching bag in a retail setting."],
  "106": ["Brown leather jacket detail","outerwear","Close-up of a brown leather-style jacket showing the collar, zipper and interior label area."],
  "107": ["Khaki utility trouser detail","bottoms","Close-up of khaki utility trousers showing pocket construction and contrasting yellow detail."],
  "108": ["White-and-blue running sneaker","footwear","White athletic sneaker with pale blue accents and a lightweight rounded sole."],
  "109": ["Brown leather dress shoe","footwear","Brown leather-style lace-up dress shoe with a pointed toe and decorative stitched detailing."]
};

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

    const visual = VISUAL_PRODUCT_DATA[padded];

    const name =
      visual?.[0] ||
      `Area Boyz Product ${padded}`;

    const category =
      visual?.[1] ||
      "streetwear";

    const description =
      visual?.[2] ||
      `${name}. View the product photograph for the exact visible design, colour and construction.`;

    let collection = "streetwear";

    if (category === "footwear") {
      collection = "footwear";
    }

    if (
      [
        "bags",
        "headwear",
        "accessories",
        "jewelry"
      ].includes(category)
    ) {
      collection = "accessories";
    }

    return {

      id: `ab-${padded}`,

      number,

      name,

      category,

      collection,

      /*
       * Prices are kept separate from visual identification.
       * We are NOT guessing a product's price from its photograph.
       */
      price:
        category === "footwear" ? 165 :
        category === "outerwear" ? 180 :
        category === "hoodies" ? 125 :
        category === "sets" ? 160 :
        category === "bags" ? 90 :
        category === "headwear" ? 50 :
        category === "accessories" ? 65 :
        category === "bottoms" ||
        category === "denim" ? 120 :
        70,

      image:
        `product-${padded}.jpg`,

      description,

      details: [

        `Catalogue image: product-${padded}.jpg`,

        `Category: ${category}`,

        `Collection: ${collection}`,

        "Product identity and description are based on the visible catalogue photograph."

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


  /*
   * Read a collection from the URL.
   *
   * Example:
   * shop.html?collection=footwear
   *
   * This allows the Collections page
   * to send customers directly into
   * the correct catalogue collection.
   */

  const params =
    new URLSearchParams(
      window.location.search
    );


  const requestedCollection =
    (
      params.get("collection") || ""
    )
      .trim()
      .toLowerCase();


  if(
    CATEGORIES.includes(
      requestedCollection
    )
  ){

    state.collection =
      requestedCollection;

  }


  const year =
    $("#year");

  if(year){

    year.textContent =
      new Date().getFullYear();

  }


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
