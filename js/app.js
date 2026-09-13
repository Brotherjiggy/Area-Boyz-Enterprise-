"use strict";

/* =========================================================
   AREA BOYZ ENTERPRISE
   PREMIUM COMMERCE FRONTEND
   VERSION 3.0

   FEATURES
   - 120+ named products
   - Product/image mapping
   - Multi-image product galleries
   - Product variants
   - Sizes
   - Colors
   - Stock status
   - Search
   - Category filtering
   - Sorting
   - Cart persistence
   - Variant-aware cart
   - Product quick view
   - Mobile navigation
   - Auto-hide navbar
   - Dark/light mode
   - Investment calculator
   - SPA navigation
   ========================================================= */

(() => {
  "use strict";

  /* =========================================================
     CONFIGURATION
     ========================================================= */

  const CONFIG = {
    brand: "Area Boyz Enterprise",
    totalEquity: 758000,
    currency: "USD",
    storageKey: "areaBoyzCart",
    themeKey: "areaBoyzTheme",
    defaultPage: "home",
    preloaderDuration: 1100
  };

  /* =========================================================
     STATE
     ========================================================= */

  const state = {
    currentPage: CONFIG.defaultPage,
    currentCategory: "all",
    currentSearch: "",
    currentSort: "featured",
    cart: loadCart(),
    products: [],
    selectedProduct: null,
    selectedImageIndex: 0,
    selectedSize: "",
    selectedColor: "",
    selectedQuantity: 1
  };

  /* =========================================================
     PRODUCT CATALOGUE
     ========================================================= */

  const catalogue = [

    /* -------------------------------------------------------
       001 - 010
       STREETWEAR / TEES
       ------------------------------------------------------- */

    {
      name: "AB Essential Oversized Tee",
      category: "streetwear",
      price: 55,
      badge: "Essential",
      description: "A relaxed everyday tee built around the Area Boyz identity. Clean, comfortable and designed for effortless street style.",
      colors: ["Black", "White", "Gold"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 28
    },

    {
      name: "Area Motion Graphic Tee",
      category: "streetwear",
      price: 65,
      badge: "New",
      description: "A graphic-driven streetwear piece inspired by movement, confidence and the Area Boyz evolution.",
      colors: ["Black", "Cream"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 22
    },

    {
      name: "Evolution Heavyweight Tee",
      category: "streetwear",
      price: 75,
      badge: "Premium",
      description: "Heavyweight construction with a structured silhouette for a stronger premium streetwear look.",
      colors: ["Black", "Washed Black", "Stone"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 18
    },

    {
      name: "Area Boyz Signature Tee",
      category: "streetwear",
      price: 70,
      badge: "Signature",
      description: "The signature everyday Area Boyz tee combining minimal branding with a confident modern fit.",
      colors: ["Black", "White"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 31
    },

    {
      name: "Street Philosophy Tee",
      category: "streetwear",
      price: 68,
      badge: "Popular",
      description: "A statement streetwear tee inspired by individuality, ambition and everyday city culture.",
      colors: ["Black", "Grey"],
      sizes: ["S", "M", "L", "XL"],
      stock: 24
    },

    {
      name: "Move Different Tee",
      category: "streetwear",
      price: 62,
      badge: "Move Different",
      description: "Relaxed streetwear built for people who choose their own lane and move with intention.",
      colors: ["Black", "Cream", "Olive"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 20
    },

    {
      name: "Everyday Energy Tee",
      category: "streetwear",
      price: 52,
      badge: "Everyday",
      description: "Simple, versatile and easy to wear from casual days to late-night city movement.",
      colors: ["White", "Black", "Grey"],
      sizes: ["S", "M", "L", "XL"],
      stock: 35
    },

    {
      name: "AB Core Cotton Tee",
      category: "streetwear",
      price: 48,
      badge: "Core",
      description: "A clean cotton essential designed to become one of the most reliable pieces in your wardrobe.",
      colors: ["Black", "White", "Navy"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 40
    },

    {
      name: "Area Boyz Archive Tee",
      category: "streetwear",
      price: 78,
      badge: "Archive",
      description: "An archive-inspired piece combining classic Area Boyz attitude with a contemporary silhouette.",
      colors: ["Washed Black", "Vintage Grey"],
      sizes: ["S", "M", "L", "XL"],
      stock: 15
    },

    {
      name: "The Evolution Tee",
      category: "streetwear",
      price: 72,
      badge: "Evolution",
      description: "A premium statement tee representing the continual evolution of the Area Boyz platform.",
      colors: ["Black", "Sand"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 19
    },

    /* -------------------------------------------------------
       011 - 020
       HOODIES / SWEATSHIRTS
       ------------------------------------------------------- */

    {
      name: "Evolution Heavyweight Hoodie",
      category: "hoodies",
      price: 125,
      badge: "Premium",
      description: "Heavyweight fleece hoodie with a structured fit and elevated Area Boyz streetwear character.",
      colors: ["Black", "Grey", "Cream"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 17
    },

    {
      name: "AB Essential Pullover Hoodie",
      category: "hoodies",
      price: 110,
      badge: "Essential",
      description: "A dependable everyday hoodie with a clean silhouette and soft interior.",
      colors: ["Black", "Grey"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 26
    },

    {
      name: "Move Different Hoodie",
      category: "hoodies",
      price: 135,
      badge: "New",
      description: "A statement hoodie designed around individuality, movement and modern street culture.",
      colors: ["Black", "Olive"],
      sizes: ["S", "M", "L", "XL"],
      stock: 14
    },

    {
      name: "Area Boyz Studio Hoodie",
      category: "hoodies",
      price: 145,
      badge: "Studio",
      description: "Premium studio-inspired hoodie with a refined oversized silhouette.",
      colors: ["Black", "Stone"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 13
    },

    {
      name: "Tranquility Heavy Hoodie",
      category: "hoodies",
      price: 130,
      badge: "Tranquility",
      description: "A calm, heavyweight layer inspired by comfort, balance and quiet confidence.",
      colors: ["Cream", "Brown", "Black"],
      sizes: ["S", "M", "L", "XL"],
      stock: 16
    },

    {
      name: "AB Zip-Up Hoodie",
      category: "hoodies",
      price: 120,
      badge: "Core",
      description: "Versatile zip hoodie designed for easy layering throughout the day.",
      colors: ["Black", "Grey"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 21
    },

    {
      name: "Street Culture Hoodie",
      category: "hoodies",
      price: 128,
      badge: "Street",
      description: "Graphic-led hoodie inspired by city energy and independent street culture.",
      colors: ["Black", "Washed Black"],
      sizes: ["S", "M", "L", "XL"],
      stock: 12
    },

    {
      name: "Crafted Soul Hoodie",
      category: "hoodies",
      price: 155,
      badge: "Crafted",
      description: "A more artistic hoodie combining relaxed comfort with handcrafted visual details.",
      colors: ["Brown", "Cream"],
      sizes: ["S", "M", "L", "XL"],
      stock: 10
    },

    {
      name: "Area Motion Crewneck",
      category: "hoodies",
      price: 105,
      badge: "Motion",
      description: "Classic crewneck sweatshirt made for everyday movement and easy styling.",
      colors: ["Black", "Grey", "Navy"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 27
    },

    {
      name: "AB Signature Crewneck",
      category: "hoodies",
      price: 115,
      badge: "Signature",
      description: "Minimal premium crewneck carrying the signature Area Boyz identity.",
      colors: ["Black", "Cream"],
      sizes: ["S", "M", "L", "XL"],
      stock: 20
    },

    /* -------------------------------------------------------
       021 - 030
       SHIRTS
       ------------------------------------------------------- */

    {
      name: "Crafted Tranquility Shirt",
      category: "shirts",
      price: 115,
      badge: "Crafted",
      description: "Relaxed shirt inspired by tranquility, craftsmanship and intentional everyday dressing.",
      colors: ["Cream", "Brown"],
      sizes: ["S", "M", "L", "XL"],
      stock: 16
    },

    {
      name: "AB Artisan Overshirt",
      category: "shirts",
      price: 135,
      badge: "Artisan",
      description: "Layerable overshirt with an elevated crafted finish.",
      colors: ["Black", "Olive", "Sand"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 14
    },

    {
      name: "Area Utility Shirt",
      category: "shirts",
      price: 105,
      badge: "Utility",
      description: "Functional everyday shirt featuring a practical modern silhouette.",
      colors: ["Black", "Olive", "Khaki"],
      sizes: ["S", "M", "L", "XL"],
      stock: 23
    },

    {
      name: "Intention Patchwork Shirt",
      category: "shirts",
      price: 165,
      badge: "Limited",
      description: "Patchwork-inspired statement shirt created around the idea of handmade intention.",
      colors: ["Multi", "Brown"],
      sizes: ["S", "M", "L", "XL"],
      stock: 8
    },

    {
      name: "Area Boyz Resort Shirt",
      category: "shirts",
      price: 95,
      badge: "New",
      description: "Relaxed short-sleeve shirt designed for warm-weather style and easy movement.",
      colors: ["Cream", "Black", "Green"],
      sizes: ["S", "M", "L", "XL"],
      stock: 19
    },

    {
      name: "AB Classic Oxford",
      category: "shirts",
      price: 100,
      badge: "Classic",
      description: "Clean Oxford-inspired shirt balancing classic structure with modern Area Boyz styling.",
      colors: ["White", "Black", "Blue"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 25
    },

    {
      name: "Streetline Button Shirt",
      category: "shirts",
      price: 108,
      badge: "Street",
      description: "Modern button shirt designed to transition between relaxed and polished looks.",
      colors: ["Black", "Grey"],
      sizes: ["S", "M", "L", "XL"],
      stock: 18
    },

    {
      name: "Craft Culture Shirt",
      category: "shirts",
      price: 145,
      badge: "Craft",
      description: "A creative shirt combining artistic details with wearable everyday structure.",
      colors: ["Brown", "Cream", "Black"],
      sizes: ["S", "M", "L", "XL"],
      stock: 11
    },

    {
      name: "Area Signature Linen Shirt",
      category: "shirts",
      price: 125,
      badge: "Premium",
      description: "Lightweight premium shirt designed for relaxed luxury and warm-weather dressing.",
      colors: ["White", "Cream", "Black"],
      sizes: ["S", "M", "L", "XL"],
      stock: 17
    },

    {
      name: "AB Night Shift Shirt",
      category: "shirts",
      price: 118,
      badge: "Night",
      description: "Dark-toned statement shirt created for evening looks and city nights.",
      colors: ["Black", "Charcoal"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 15
    },

    /* -------------------------------------------------------
       031 - 040
       JACKETS / OUTERWEAR
       ------------------------------------------------------- */

    {
      name: "Handmade Intention Jacket",
      category: "outerwear",
      price: 210,
      badge: "Limited",
      description: "Statement jacket inspired by handmade construction and intentional design.",
      colors: ["Black", "Brown"],
      sizes: ["S", "M", "L", "XL"],
      stock: 7
    },

    {
      name: "Area Boyz Utility Jacket",
      category: "outerwear",
      price: 185,
      badge: "Utility",
      description: "Functional outer layer built for everyday city movement.",
      colors: ["Black", "Olive"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 12
    },

    {
      name: "AB Evolution Bomber",
      category: "outerwear",
      price: 195,
      badge: "Evolution",
      description: "Contemporary bomber jacket with a premium streetwear silhouette.",
      colors: ["Black", "Olive"],
      sizes: ["S", "M", "L", "XL"],
      stock: 9
    },

    {
      name: "Area Motion Coach Jacket",
      category: "outerwear",
      price: 155,
      badge: "Motion",
      description: "Lightweight coach jacket made for layering and movement.",
      colors: ["Black", "Navy"],
      sizes: ["S", "M", "L", "XL"],
      stock: 14
    },

    {
      name: "Crafted Everyday Jacket",
      category: "outerwear",
      price: 220,
      badge: "Crafted",
      description: "Premium everyday jacket with handcrafted visual character.",
      colors: ["Brown", "Cream"],
      sizes: ["S", "M", "L", "XL"],
      stock: 6
    },

    {
      name: "AB Denim Trucker Jacket",
      category: "outerwear",
      price: 175,
      badge: "Denim",
      description: "Classic denim trucker silhouette updated with Area Boyz attitude.",
      colors: ["Blue", "Black"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 18
    },

    {
      name: "Street Armor Overshirt",
      category: "outerwear",
      price: 160,
      badge: "Street",
      description: "Structured overshirt designed to add depth to everyday streetwear outfits.",
      colors: ["Black", "Grey"],
      sizes: ["S", "M", "L", "XL"],
      stock: 10
    },

    {
      name: "Tranquility Work Jacket",
      category: "outerwear",
      price: 180,
      badge: "Tranquility",
      description: "Relaxed workwear-inspired jacket with a softer premium finish.",
      colors: ["Cream", "Brown"],
      sizes: ["S", "M", "L", "XL"],
      stock: 8
    },

    {
      name: "AB City Rain Shell",
      category: "outerwear",
      price: 170,
      badge: "City",
      description: "Lightweight protective outer layer for changing city conditions.",
      colors: ["Black", "Grey"],
      sizes: ["S", "M", "L", "XL"],
      stock: 13
    },

    {
      name: "Area Boyz Varsity Jacket",
      category: "outerwear",
      price: 240,
      badge: "Premium",
      description: "Statement varsity jacket blending classic athletic heritage with Area Boyz identity.",
      colors: ["Black", "Cream"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 5
    },

    /* -------------------------------------------------------
       041 - 050
       TROUSERS / CARGO
       ------------------------------------------------------- */

    {
      name: "AB Utility Cargo Pants",
      category: "bottoms",
      price: 135,
      badge: "Utility",
      description: "Relaxed cargo trousers with functional pockets and a modern streetwear fit.",
      colors: ["Black", "Olive", "Khaki"],
      sizes: ["28", "30", "32", "34", "36", "38"],
      stock: 22
    },

    {
      name: "Area Motion Cargo",
      category: "bottoms",
      price: 145,
      badge: "Motion",
      description: "Comfortable cargo trousers designed for movement and everyday city wear.",
      colors: ["Black", "Grey"],
      sizes: ["28", "30", "32", "34", "36"],
      stock: 18
    },

    {
      name: "Evolution Relaxed Trousers",
      category: "bottoms",
      price: 125,
      badge: "Evolution",
      description: "Relaxed trousers balancing comfort, structure and modern proportions.",
      colors: ["Black", "Cream", "Brown"],
      sizes: ["28", "30", "32", "34", "36"],
      stock: 16
    },

    {
      name: "AB Wide Leg Utility Pant",
      category: "bottoms",
      price: 140,
      badge: "New",
      description: "Wide-leg utility trousers with a contemporary streetwear silhouette.",
      colors: ["Black", "Olive"],
      sizes: ["28", "30", "32", "34", "36"],
      stock: 13
    },

    {
      name: "Streetline Parachute Pant",
      category: "bottoms",
      price: 150,
      badge: "Street",
      description: "Relaxed parachute-style pants designed for bold contemporary styling.",
      colors: ["Black", "Grey"],
      sizes: ["28", "30", "32", "34", "36"],
      stock: 11
    },

    {
      name: "AB Everyday Tailored Pant",
      category: "bottoms",
      price: 120,
      badge: "Essential",
      description: "A cleaner trouser option designed for smart-casual Area Boyz styling.",
      colors: ["Black", "Charcoal", "Cream"],
      sizes: ["28", "30", "32", "34", "36"],
      stock: 20
    },

    {
      name: "Crafted Patch Pocket Pant",
      category: "bottoms",
      price: 165,
      badge: "Crafted",
      description: "Artisan-inspired trousers with distinctive utility pocket detailing.",
      colors: ["Brown", "Cream"],
      sizes: ["28", "30", "32", "34"],
      stock: 8
    },

    {
      name: "AB Tech Utility Pant",
      category: "bottoms",
      price: 155,
      badge: "Tech",
      description: "Modern technical trousers built around utility and clean urban styling.",
      colors: ["Black", "Grey"],
      sizes: ["28", "30", "32", "34", "36"],
      stock: 14
    },

    {
      name: "Area Boyz Straight Pant",
      category: "bottoms",
      price: 110,
      badge: "Core",
      description: "Straight-leg everyday trousers with a versatile clean finish.",
      colors: ["Black", "Navy", "Cream"],
      sizes: ["28", "30", "32", "34", "36", "38"],
      stock: 26
    },

    {
      name: "Move Different Track Pant",
      category: "bottoms",
      price: 115,
      badge: "Move",
      description: "Comfort-focused track pants created for relaxed days and active movement.",
      colors: ["Black", "Grey"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 24
    },

    /* -------------------------------------------------------
       051 - 060
       DENIM / SHORTS
       ------------------------------------------------------- */

    {
      name: "AB Classic Straight Jeans",
      category: "denim",
      price: 130,
      badge: "Classic",
      description: "Straight-leg denim designed as an everyday Area Boyz staple.",
      colors: ["Indigo", "Black"],
      sizes: ["28", "30", "32", "34", "36", "38"],
      stock: 21
    },

    {
      name: "Evolution Baggy Jeans",
      category: "denim",
      price: 150,
      badge: "Popular",
      description: "Relaxed baggy jeans built for modern streetwear silhouettes.",
      colors: ["Washed Blue", "Black"],
      sizes: ["28", "30", "32", "34", "36"],
      stock: 17
    },

    {
      name: "Area Washed Black Jeans",
      category: "denim",
      price: 145,
      badge: "Washed",
      description: "Washed black denim with a worn-in finish and contemporary shape.",
      colors: ["Washed Black"],
      sizes: ["28", "30", "32", "34", "36"],
      stock: 19
    },

    {
      name: "AB Carpenter Denim",
      category: "denim",
      price: 155,
      badge: "Utility",
      description: "Workwear-inspired carpenter denim with a relaxed fit.",
      colors: ["Blue", "Black"],
      sizes: ["28", "30", "32", "34", "36"],
      stock: 12
    },

    {
      name: "Street Archive Denim",
      category: "denim",
      price: 165,
      badge: "Archive",
      description: "Vintage-inspired denim with an archival streetwear character.",
      colors: ["Vintage Blue", "Black"],
      sizes: ["28", "30", "32", "34"],
      stock: 9
    },

    {
      name: "AB Denim Shorts",
      category: "denim",
      price: 85,
      badge: "Summer",
      description: "Relaxed denim shorts designed for casual warm-weather styling.",
      colors: ["Blue", "Black"],
      sizes: ["28", "30", "32", "34", "36"],
      stock: 25
    },

    {
      name: "Area Utility Shorts",
      category: "bottoms",
      price: 80,
      badge: "Utility",
      description: "Everyday utility shorts with practical pocket space.",
      colors: ["Black", "Olive", "Khaki"],
      sizes: ["28", "30", "32", "34", "36"],
      stock: 29
    },

    {
      name: "Move Different Shorts",
      category: "bottoms",
      price: 72,
      badge: "Move",
      description: "Relaxed shorts built for comfort and easy everyday movement.",
      colors: ["Black", "Grey", "Cream"],
      sizes: ["S", "M", "L", "XL"],
      stock: 30
    },

    {
      name: "AB Studio Shorts",
      category: "bottoms",
      price: 78,
      badge: "Studio",
      description: "Minimal premium shorts with a clean contemporary silhouette.",
      colors: ["Black", "Stone"],
      sizes: ["S", "M", "L", "XL"],
      stock: 16
    },

    {
      name: "Crafted Lounge Shorts",
      category: "bottoms",
      price: 75,
      badge: "Crafted",
      description: "Soft relaxed shorts inspired by comfort and intentional design.",
      colors: ["Cream", "Brown"],
      sizes: ["S", "M", "L", "XL"],
      stock: 18
    },

    /* -------------------------------------------------------
       061 - 070
       FOOTWEAR
       ------------------------------------------------------- */

    {
      name: "AB Motion Runner",
      category: "footwear",
      price: 145,
      badge: "New",
      description: "Lightweight everyday runner combining comfort with modern Area Boyz styling.",
      colors: ["Black", "White"],
      sizes: ["40", "41", "42", "43", "44", "45"],
      stock: 16
    },

    {
      name: "Area Street Trainer",
      category: "footwear",
      price: 155,
      badge: "Popular",
      description: "Versatile street trainer designed for everyday city wear.",
      colors: ["Black", "Cream"],
      sizes: ["40", "41", "42", "43", "44", "45"],
      stock: 20
    },

    {
      name: "Evolution High Top",
      category: "footwear",
      price: 185,
      badge: "Evolution",
      description: "High-top silhouette inspired by classic street culture with a modern Area Boyz identity.",
      colors: ["Black", "White"],
      sizes: ["40", "41", "42", "43", "44", "45"],
      stock: 11
    },

    {
      name: "Craft Runner",
      category: "footwear",
      price: 175,
      badge: "Crafted",
      description: "Artistic runner combining handcrafted visual details with everyday comfort.",
      colors: ["Cream", "Brown"],
      sizes: ["40", "41", "42", "43", "44"],
      stock: 9
    },

    {
      name: "AB Daily Sneaker",
      category: "footwear",
      price: 135,
      badge: "Everyday",
      description: "Clean everyday sneaker designed to work with almost every Area Boyz look.",
      colors: ["White", "Black", "Grey"],
      sizes: ["40", "41", "42", "43", "44", "45"],
      stock: 27
    },

    {
      name: "Area Boyz Court Shoe",
      category: "footwear",
      price: 165,
      badge: "Court",
      description: "Classic court-inspired sneaker with a refined modern profile.",
      colors: ["White", "Black"],
      sizes: ["40", "41", "42", "43", "44", "45"],
      stock: 18
    },

    {
      name: "Tranquility Slide",
      category: "footwear",
      price: 65,
      badge: "Comfort",
      description: "Easy everyday slide focused on comfort and relaxed Area Boyz style.",
      colors: ["Black", "Cream", "Brown"],
      sizes: ["40", "41", "42", "43", "44", "45"],
      stock: 34
    },

    {
      name: "AB Utility Boot",
      category: "footwear",
      price: 220,
      badge: "Premium",
      description: "Durable utility boot designed to add strength to streetwear outfits.",
      colors: ["Black", "Brown"],
      sizes: ["40", "41", "42", "43", "44", "45"],
      stock: 8
    },

    {
      name: "Evolution Street Runner",
      category: "footwear",
      price: 195,
      badge: "Evolution",
      description: "Performance-inspired street runner with a bold contemporary silhouette.",
      colors: ["Black", "Grey"],
      sizes: ["40", "41", "42", "43", "44"],
      stock: 12
    },

    {
      name: "Area Classic Trainer",
      category: "footwear",
      price: 150,
      badge: "Classic",
      description: "Timeless trainer designed for everyday Area Boyz styling.",
      colors: ["White", "Black"],
      sizes: ["40", "41", "42", "43", "44", "45"],
      stock: 22
    },

    /* -------------------------------------------------------
       071 - 080
       BAGS
       ------------------------------------------------------- */

    {
      name: "Area Boyz Crossbody Bag",
      category: "bags",
      price: 85,
      badge: "Popular",
      description: "Compact crossbody bag designed for everyday essentials and city movement.",
      colors: ["Black", "Brown"],
      sizes: ["One Size"],
      stock: 26
    },

    {
      name: "Evolution Mini Bag",
      category: "bags",
      price: 70,
      badge: "New",
      description: "Compact statement bag with a clean Area Boyz profile.",
      colors: ["Black", "Cream"],
      sizes: ["One Size"],
      stock: 18
    },

    {
      name: "AB Utility Tote",
      category: "bags",
      price: 75,
      badge: "Utility",
      description: "Large everyday tote designed to carry your essentials in style.",
      colors: ["Black", "Cream"],
      sizes: ["One Size"],
      stock: 30
    },

    {
      name: "Crafted Canvas Bag",
      category: "bags",
      price: 95,
      badge: "Crafted",
      description: "Canvas carry bag inspired by handmade craftsmanship and practical design.",
      colors: ["Natural", "Black"],
      sizes: ["One Size"],
      stock: 15
    },

    {
      name: "AB Travel Duffel",
      category: "bags",
      price: 135,
      badge: "Travel",
      description: "Spacious duffel designed for weekends, travel and active lifestyles.",
      colors: ["Black", "Grey"],
      sizes: ["One Size"],
      stock: 12
    },

    {
      name: "Area Studio Backpack",
      category: "bags",
      price: 125,
      badge: "Studio",
      description: "Clean modern backpack designed for daily city and creative work.",
      colors: ["Black", "Olive"],
      sizes: ["One Size"],
      stock: 17
    },

    {
      name: "AB Everyday Backpack",
      category: "bags",
      price: 105,
      badge: "Everyday",
      description: "Practical everyday backpack with a minimal Area Boyz aesthetic.",
      colors: ["Black", "Grey"],
      sizes: ["One Size"],
      stock: 23
    },

    {
      name: "Street Archive Shoulder Bag",
      category: "bags",
      price: 90,
      badge: "Archive",
      description: "Streetwear-inspired shoulder bag built around an archival utility aesthetic.",
      colors: ["Black", "Brown"],
      sizes: ["One Size"],
      stock: 14
    },

    {
      name: "AB Premium Leather Tote",
      category: "bags",
      price: 180,
      badge: "Premium",
      description: "Elevated tote designed for a more refined Area Boyz look.",
      colors: ["Black", "Brown"],
      sizes: ["One Size"],
      stock: 7
    },

    {
      name: "Area Mini Utility Pouch",
      category: "bags",
      price: 45,
      badge: "Essential",
      description: "Small utility pouch for carrying compact daily essentials.",
      colors: ["Black", "Olive", "Cream"],
      sizes: ["One Size"],
      stock: 38
    },

    /* -------------------------------------------------------
       081 - 090
       CAPS / HEADWEAR
       ------------------------------------------------------- */

    {
      name: "AB Signature Cap",
      category: "headwear",
      price: 45,
      badge: "Signature",
      description: "Classic Area Boyz cap featuring clean signature branding.",
      colors: ["Black", "Cream"],
      sizes: ["One Size"],
      stock: 40
    },

    {
      name: "Area Boyz Script Cap",
      category: "headwear",
      price: 48,
      badge: "New",
      description: "Everyday cap featuring a refined Area Boyz script identity.",
      colors: ["Black", "Grey"],
      sizes: ["One Size"],
      stock: 31
    },

    {
      name: "Evolution 6-Panel Cap",
      category: "headwear",
      price: 52,
      badge: "Evolution",
      description: "Structured six-panel cap inspired by the evolution of the brand.",
      colors: ["Black", "Olive"],
      sizes: ["One Size"],
      stock: 24
    },

    {
      name: "AB Washed Denim Cap",
      category: "headwear",
      price: 50,
      badge: "Denim",
      description: "Washed denim cap with a relaxed vintage finish.",
      colors: ["Blue", "Black"],
      sizes: ["One Size"],
      stock: 20
    },

    {
      name: "Crafted Patch Cap",
      category: "headwear",
      price: 58,
      badge: "Crafted",
      description: "Casual cap featuring a handcrafted-inspired patch detail.",
      colors: ["Brown", "Cream"],
      sizes: ["One Size"],
      stock: 16
    },

    {
      name: "Move Different Cap",
      category: "headwear",
      price: 47,
      badge: "Move",
      description: "Minimal cap carrying the Move Different attitude.",
      colors: ["Black", "White"],
      sizes: ["One Size"],
      stock: 28
    },

    {
      name: "AB Tranquility Beanie",
      category: "headwear",
      price: 42,
      badge: "Tranquility",
      description: "Soft knit beanie designed for relaxed everyday styling.",
      colors: ["Black", "Cream", "Brown"],
      sizes: ["One Size"],
      stock: 25
    },

    {
      name: "Area Boyz Everyday Beanie",
      category: "headwear",
      price: 38,
      badge: "Everyday",
      description: "Simple comfortable beanie designed for everyday wear.",
      colors: ["Black", "Grey"],
      sizes: ["One Size"],
      stock: 34
    },

    {
      name: "AB Archive Bucket Hat",
      category: "headwear",
      price: 55,
      badge: "Archive",
      description: "Bucket hat inspired by relaxed archival streetwear.",
      colors: ["Black", "Cream"],
      sizes: ["One Size"],
      stock: 19
    },

    {
      name: "Area Utility Bucket Hat",
      category: "headwear",
      price: 60,
      badge: "Utility",
      description: "Functional bucket hat with a modern Area Boyz identity.",
      colors: ["Black", "Olive"],
      sizes: ["One Size"],
      stock: 22
    },

    /* -------------------------------------------------------
       091 - 100
       ACCESSORIES
       ------------------------------------------------------- */

    {
      name: "Area Signature Belt",
      category: "accessories",
      price: 55,
      badge: "Signature",
      description: "Clean everyday belt designed to finish an Area Boyz outfit.",
      colors: ["Black", "Brown"],
      sizes: ["S", "M", "L", "XL"],
      stock: 25
    },

    {
      name: "AB Statement Sunglasses",
      category: "accessories",
      price: 65,
      badge: "Statement",
      description: "Bold sunglasses designed to add attitude to everyday looks.",
      colors: ["Black", "Brown"],
      sizes: ["One Size"],
      stock: 22
    },

    {
      name: "Area Boyz Wallet",
      category: "accessories",
      price: 48,
      badge: "Essential",
      description: "Compact everyday wallet designed around clean functionality.",
      colors: ["Black", "Brown"],
      sizes: ["One Size"],
      stock: 30
    },

    {
      name: "Evolution Card Holder",
      category: "accessories",
      price: 35,
      badge: "Minimal",
      description: "Slim card holder designed for simple everyday carry.",
      colors: ["Black", "Brown"],
      sizes: ["One Size"],
      stock: 36
    },

    {
      name: "AB Everyday Keychain",
      category: "accessories",
      price: 25,
      badge: "Everyday",
      description: "Compact branded keychain designed as an easy Area Boyz accessory.",
      colors: ["Black", "Gold"],
      sizes: ["One Size"],
      stock: 50
    },

    {
      name: "Area Utility Bracelet",
      category: "accessories",
      price: 32,
      badge: "Utility",
      description: "Minimal bracelet designed for everyday styling.",
      colors: ["Black", "Silver"],
      sizes: ["S", "M", "L"],
      stock: 29
    },

    {
      name: "AB Canvas Belt",
      category: "accessories",
      price: 40,
      badge: "Street",
      description: "Casual canvas belt inspired by utility streetwear.",
      colors: ["Black", "Olive"],
      sizes: ["S", "M", "L", "XL"],
      stock: 32
    },

    {
      name: "Area Boyz Phone Pouch",
      category: "accessories",
      price: 42,
      badge: "Utility",
      description: "Compact phone pouch designed for hands-free movement.",
      colors: ["Black", "Brown"],
      sizes: ["One Size"],
      stock: 21
    },

    {
      name: "AB Metal Key Ring",
      category: "accessories",
      price: 28,
      badge: "New",
      description: "Minimal metal key ring carrying a subtle Area Boyz identity.",
      colors: ["Silver", "Gold"],
      sizes: ["One Size"],
      stock: 45
    },

    {
      name: "Area Premium Sunglasses",
      category: "accessories",
      price: 90,
      badge: "Premium",
      description: "Premium statement eyewear designed for a stronger fashion silhouette.",
      colors: ["Black", "Brown"],
      sizes: ["One Size"],
      stock: 13
    },

    /* -------------------------------------------------------
       101 - 110
       JEWELRY
       ------------------------------------------------------- */

    {
      name: "Evolution Chain",
      category: "jewelry",
      price: 75,
      badge: "Evolution",
      description: "Statement chain designed to complement contemporary Area Boyz outfits.",
      colors: ["Silver", "Gold"],
      sizes: ["One Size"],
      stock: 18
    },

    {
      name: "AB Signature Chain",
      category: "jewelry",
      price: 85,
      badge: "Signature",
      description: "Signature chain designed around the Area Boyz identity.",
      colors: ["Silver", "Gold"],
      sizes: ["One Size"],
      stock: 16
    },

    {
      name: "Area Boyz Pendant",
      category: "jewelry",
      price: 70,
      badge: "New",
      description: "Minimal pendant designed as a subtle statement piece.",
      colors: ["Silver", "Gold"],
      sizes: ["One Size"],
      stock: 19
    },

    {
      name: "AB Studio Ring",
      category: "jewelry",
      price: 45,
      badge: "Studio",
      description: "Clean contemporary ring designed for everyday styling.",
      colors: ["Silver", "Gold"],
      sizes: ["7", "8", "9", "10", "11", "12"],
      stock: 24
    },

    {
      name: "Evolution Signet Ring",
      category: "jewelry",
      price: 55,
      badge: "Archive",
      description: "Bold signet-inspired ring representing confidence and evolution.",
      colors: ["Silver", "Gold"],
      sizes: ["7", "8", "9", "10", "11", "12"],
      stock: 15
    },

    {
      name: "AB Minimal Bracelet",
      category: "jewelry",
      price: 48,
      badge: "Minimal",
      description: "Simple bracelet designed to layer effortlessly with other accessories.",
      colors: ["Silver", "Gold"],
      sizes: ["S", "M", "L"],
      stock: 26
    },

    {
      name: "Area Chain Bracelet",
      category: "jewelry",
      price: 62,
      badge: "Popular",
      description: "Classic chain bracelet with a modern fashion profile.",
      colors: ["Silver", "Gold"],
      sizes: ["S", "M", "L"],
      stock: 20
    },

    {
      name: "AB Layer Necklace",
      category: "jewelry",
      price: 68,
      badge: "Layered",
      description: "Layered necklace designed for a stronger contemporary look.",
      colors: ["Silver", "Gold"],
      sizes: ["One Size"],
      stock: 14
    },

    {
      name: "Crafted Metal Pendant",
      category: "jewelry",
      price: 58,
      badge: "Crafted",
      description: "Artisan-inspired pendant with a raw contemporary character.",
      colors: ["Silver", "Black"],
      sizes: ["One Size"],
      stock: 12
    },

    {
      name: "Area Statement Ring",
      category: "jewelry",
      price: 50,
      badge: "Statement",
      description: "Bold statement ring designed to finish a confident outfit.",
      colors: ["Silver", "Gold", "Black"],
      sizes: ["7", "8", "9", "10", "11", "12"],
      stock: 17
    },

    /* -------------------------------------------------------
       111 - 120
       PREMIUM / LIFESTYLE
       ------------------------------------------------------- */

    {
      name: "AB Premium Lounge Set",
      category: "sets",
      price: 175,
      badge: "Premium",
      description: "Coordinated lounge set designed around comfort, simplicity and elevated everyday style.",
      colors: ["Black", "Cream", "Grey"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 12
    },

    {
      name: "Area Evolution Tracksuit",
      category: "sets",
      price: 195,
      badge: "Evolution",
      description: "Full coordinated tracksuit designed for relaxed movement and statement styling.",
      colors: ["Black", "Grey"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 9
    },

    {
      name: "AB Studio Co-Ord Set",
      category: "sets",
      price: 185,
      badge: "Studio",
      description: "Premium coordinated set with a clean contemporary silhouette.",
      colors: ["Black", "Cream"],
      sizes: ["S", "M", "L", "XL"],
      stock: 8
    },

    {
      name: "Tranquility Knit Set",
      category: "sets",
      price: 170,
      badge: "Tranquility",
      description: "Soft coordinated knit set designed around comfort and relaxed luxury.",
      colors: ["Cream", "Brown"],
      sizes: ["S", "M", "L", "XL"],
      stock: 10
    },

    {
      name: "Area Weekend Set",
      category: "sets",
      price: 155,
      badge: "Weekend",
      description: "Relaxed matching set designed for weekends, travel and casual movement.",
      colors: ["Black", "Grey", "Olive"],
      sizes: ["S", "M", "L", "XL"],
      stock: 15
    },

    {
      name: "AB Movement Tracksuit",
      category: "sets",
      price: 180,
      badge: "Movement",
      description: "Athletic-inspired set designed for active everyday lifestyles.",
      colors: ["Black", "Grey"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 11
    },

    {
      name: "Crafted Everyday Set",
      category: "sets",
      price: 190,
      badge: "Crafted",
      description: "Artisan-inspired coordinated outfit combining comfort and intentional design.",
      colors: ["Brown", "Cream"],
      sizes: ["S", "M", "L", "XL"],
      stock: 7
    },

    {
      name: "AB Essential Travel Set",
      category: "sets",
      price: 165,
      badge: "Travel",
      description: "Comfortable coordinated set created for travel days and relaxed movement.",
      colors: ["Black", "Grey"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: 13
    },

    {
      name: "Area Boyz Signature Set",
      category: "sets",
      price: 210,
      badge: "Signature",
      description: "Premium matching set representing the core Area Boyz visual identity.",
      colors: ["Black", "Cream"],
      sizes: ["S", "M", "L", "XL"],
      stock: 6
    },

    {
      name: "Area Boyz Archive Set",
      category: "sets",
      price: 225,
      badge: "Archive",
      description: "Limited archive-inspired coordinated set designed for collectors and dedicated Area Boyz supporters.",
      colors: ["Washed Black", "Brown"],
      sizes: ["S", "M", "L", "XL"],
      stock: 4
    }

  ];

  /* =========================================================
     CREATE PRODUCT OBJECTS
     ========================================================= */

  function generateProducts() {
    return catalogue.map((item, index) => {
      const number = index + 1;
      const padded = String(number).padStart(3, "0");

      return {
        id: `AB-${padded}`,
        number,
        image: `images/products/product-${padded}.jpg`,
        images: [
          `images/products/product-${padded}.jpg`,
          `images/products/product-${padded}-2.jpg`,
          `images/products/product-${padded}-3.jpg`,
          `images/products/product-${padded}-4.jpg`
        ],
        rating: 4 + ((index % 10) / 10),
        reviews: 8 + (index * 7) % 140,
        ...item
      };
    });
  }

  state.products = generateProducts();

  /* =========================================================
     DOM REFERENCES
     ========================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const dom = {
    preloader: $(".preloader"),
    siteHeader: $(".site-header"),
    siteWrapper: $(".site-wrapper"),
    app: $("#app"),

    menuToggle: $("#menu-toggle"),
    mobileMenu: $("#mobile-menu"),
    mobileOverlay: $(".mobile-overlay"),

    searchInput: $("#search-input"),
    searchForm: $("#search-form"),

    cartButton: $("#cart-button"),
    cartDrawer: $("#cart-drawer"),
    cartOverlay: $(".cart-overlay"),
    cartItems: $("#cart-items"),
    cartCount: $("#cart-count"),
    cartTotal: $("#cart-total"),

    featuredProducts: $("#featured-products"),
    shopProducts: $("#shop-products"),
    productGrid: $(".product-grid"),

    shopSearch: $("#shop-search"),
    sortSelect: $("#sort-products"),

    equityValue: $("#equity-value"),
    investmentAmount: $("#investment-amount"),
    shareOutput: $("#share-output"),
    equityOutput: $("#equity-output"),

    announcement: $(".announcement-bar"),
    announcementClose: $("#announcement-close"),

    year: $("#year")
  };

  /* =========================================================
     STORAGE
     ========================================================= */

  function loadCart() {
    try {
      const saved = localStorage.getItem(CONFIG.storageKey);

      if (!saved) {
        return [];
      }

      const parsed = JSON.parse(saved);

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed.map(item => ({
        id: item.id,
        quantity: Number(item.quantity) || 1,
        size: item.size || "",
        color: item.color || ""
      }));

    } catch (error) {
      console.warn("Unable to load cart:", error);
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem(
      CONFIG.storageKey,
      JSON.stringify(state.cart)
    );
  }

  /* =========================================================
     UTILITIES
     ========================================================= */

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: CONFIG.currency,
      maximumFractionDigits: 0
    }).format(value);
  }

  function slugify(value) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function findProduct(id) {
    return state.products.find(product => product.id === id);
  }

  function getCategoryLabel(category) {
    const labels = {
      streetwear: "Streetwear",
      hoodies: "Hoodies",
      shirts: "Shirts",
      outerwear: "Outerwear",
      bottoms: "Trousers",
      denim: "Denim",
      footwear: "Footwear",
      bags: "Bags",
      headwear: "Headwear",
      accessories: "Accessories",
      jewelry: "Jewelry",
      sets: "Sets"
    };

    return labels[category] || category;
  }

  function showToast(message) {
    let toast = $("#ab-toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "ab-toast";

      toast.style.cssText = `
        position:fixed;
        left:50%;
        bottom:24px;
        transform:translate(-50%,20px);
        background:#080808;
        color:#fff;
        border:1px solid rgba(255,212,0,.45);
        padding:13px 20px;
        border-radius:999px;
        z-index:100000;
        opacity:0;
        pointer-events:none;
        transition:.3s ease;
        font-size:14px;
        box-shadow:0 15px 40px rgba(0,0,0,.3);
      `;

      document.body.appendChild(toast);
    }

    toast.textContent = message;

    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translate(-50%,0)";
    });

    clearTimeout(toast._timer);

    toast._timer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translate(-50%,20px)";
    }, 2200);
  }

  /* =========================================================
     PRODUCT IMAGE FALLBACK
     ========================================================= */

  function imageFallback(image) {
    if (!image.dataset.fallbackApplied) {
      image.dataset.fallbackApplied = "true";
      image.src = "images/hero/hero-main.jpg";
    }
  }

  /* =========================================================
     PRODUCT CARDS
     ========================================================= */

  function productCard(product) {
    return `
      <article
        class="product-card"
        data-product-id="${product.id}"
        data-category="${product.category}"
      >

        <div class="product-card-image">

          <button
            class="product-image-button"
            type="button"
            data-product="${product.id}"
            aria-label="View ${escapeHTML(product.name)}"
          >
            <img
              src="${product.image}"
              alt="${escapeHTML(product.name)}"
              loading="lazy"
              onerror="imageFallback(this)"
            >
          </button>

          ${
            product.badge
              ? `<span class="product-badge">${escapeHTML(product.badge)}</span>`
              : ""
          }

          <button
            class="quick-view-button"
            type="button"
            data-product="${product.id}"
          >
            Quick view
          </button>

        </div>

        <div class="product-card-body">

          <p class="product-category">
            ${escapeHTML(getCategoryLabel(product.category))}
          </p>

          <h3 class="product-name">
            ${escapeHTML(product.name)}
          </h3>

          <div class="product-rating">
            <span>★</span>
            <span>${product.rating.toFixed(1)}</span>
            <small>(${product.reviews})</small>
          </div>

          <div class="product-card-bottom">

            <strong class="product-price">
              ${formatCurrency(product.price)}
            </strong>

            <button
              class="add-to-cart"
              type="button"
              data-add-product="${product.id}"
            >
              Add to bag
            </button>

          </div>

        </div>

      </article>
    `;
  }

  /* =========================================================
     RENDER FEATURED
     ========================================================= */

  function renderFeaturedProducts() {
    if (!dom.featuredProducts) {
      return;
    }

    const featured = state.products
      .filter(product =>
        ["Premium", "Signature", "New", "Popular", "Evolution"]
          .includes(product.badge)
      )
      .slice(0, 12);

    dom.featuredProducts.innerHTML =
      featured.map(productCard).join("");

    bindProductActions(dom.featuredProducts);
  }

  /* =========================================================
     SHOP FILTERING
     ========================================================= */

  function getFilteredProducts() {
    let products = [...state.products];

    if (state.currentCategory !== "all") {
      products = products.filter(product =>
        product.category === state.currentCategory
      );
    }

    const search = state.currentSearch.trim().toLowerCase();

    if (search) {
      products = products.filter(product => {
        const searchable = [
          product.name,
          product.category,
          product.description,
          ...(product.colors || [])
        ]
          .join(" ")
          .toLowerCase();

        return searchable.includes(search);
      });
    }

    switch (state.currentSort) {
      case "price-low":
        products.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        products.sort((a, b) => b.price - a.price);
        break;

      case "name":
        products.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "rating":
        products.sort((a, b) =>
          b.rating - a.rating
        );
        break;

      default:
        break;
    }

    return products;
  }

  function renderShopProducts() {
    if (!dom.shopProducts) {
      return;
    }

    const products = getFilteredProducts();

    if (!products.length) {
      dom.shopProducts.innerHTML = `
        <div class="empty-products">
          <h3>No products found</h3>
          <p>
            Try another search term or choose another category.
          </p>
        </div>
      `;

      return;
    }

    dom.shopProducts.innerHTML =
      products.map(productCard).join("");

    bindProductActions(dom.shopProducts);
  }

  /* =========================================================
     PRODUCT ACTION BINDING
     ========================================================= */

  function bindProductActions(parent = document) {

    $$("[data-product]", parent).forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();

        const id = button.dataset.product;

        openProductModal(id);
      });
    });

    $$("[data-add-product]", parent).forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        const id = button.dataset.addProduct;
        const product = findProduct(id);

        if (!product) {
          return;
        }

        addToCart(
          product.id,
          product.sizes?.[0] || "",
          product.colors?.[0] || "",
          1
        );
      });
    });
  }

  /* =========================================================
     PRODUCT MODAL
     ========================================================= */

  function injectProductModalStyles() {
    if ($("#ab-product-modal-styles")) {
      return;
    }

    const style = document.createElement("style");

    style.id = "ab-product-modal-styles";

    style.textContent = `
      .ab-product-modal {
        position:fixed;
        inset:0;
        z-index:90000;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:20px;
        opacity:0;
        visibility:hidden;
        pointer-events:none;
        transition:.25s ease;
      }

      .ab-product-modal.open {
        opacity:1;
        visibility:visible;
        pointer-events:auto;
      }

      .ab-product-modal-backdrop {
        position:absolute;
        inset:0;
        background:rgba(0,0,0,.78);
        backdrop-filter:blur(8px);
      }

      .ab-product-modal-panel {
        position:relative;
        width:min(1100px,100%);
        max-height:92vh;
        overflow:auto;
        background:#fff;
        color:#111;
        border-radius:22px;
        box-shadow:0 30px 100px rgba(0,0,0,.5);
        display:grid;
        grid-template-columns:1.05fr .95fr;
        z-index:1;
      }

      .ab-product-gallery {
        padding:22px;
        background:#f4f4f4;
      }

      .ab-product-main-image {
        position:relative;
        aspect-ratio:1 / 1;
        background:#eaeaea;
        border-radius:16px;
        overflow:hidden;
      }

      .ab-product-main-image img {
        width:100%;
        height:100%;
        object-fit:cover;
        display:block;
      }

      .ab-gallery-arrow {
        position:absolute;
        top:50%;
        transform:translateY(-50%);
        width:42px;
        height:42px;
        border:0;
        border-radius:50%;
        background:rgba(0,0,0,.75);
        color:#fff;
        cursor:pointer;
        font-size:20px;
        z-index:3;
      }

      .ab-gallery-prev {
        left:12px;
      }

      .ab-gallery-next {
        right:12px;
      }

      .ab-thumbnails {
        display:flex;
        gap:10px;
        overflow:auto;
        margin-top:14px;
        padding-bottom:3px;
      }

      .ab-thumbnail {
        flex:0 0 72px;
        width:72px;
        height:72px;
        padding:0;
        border:2px solid transparent;
        border-radius:10px;
        overflow:hidden;
        background:#ddd;
        cursor:pointer;
      }

      .ab-thumbnail.active {
        border-color:#ffd400;
      }

      .ab-thumbnail img {
        width:100%;
        height:100%;
        object-fit:cover;
      }

      .ab-product-info {
        padding:34px;
      }

      .ab-modal-close {
        position:absolute;
        right:15px;
        top:15px;
        width:42px;
        height:42px;
        border:0;
        border-radius:50%;
        background:#111;
        color:#fff;
        cursor:pointer;
        font-size:22px;
        z-index:4;
      }

      .ab-product-badge {
        display:inline-flex;
        background:#ffd400;
        color:#111;
        font-size:11px;
        font-weight:800;
        text-transform:uppercase;
        padding:7px 11px;
        border-radius:999px;
        letter-spacing:.08em;
      }

      .ab-product-category {
        margin:18px 0 7px;
        font-size:12px;
        text-transform:uppercase;
        letter-spacing:.12em;
        color:#777;
      }

      .ab-product-title {
        margin:0;
        font-size:clamp(26px,4vw,42px);
        line-height:1.05;
      }

      .ab-product-price {
        margin:18px 0;
        font-size:25px;
        font-weight:800;
      }

      .ab-product-description {
        color:#555;
        line-height:1.7;
        font-size:14px;
      }

      .ab-option-group {
        margin-top:22px;
      }

      .ab-option-label {
        display:flex;
        justify-content:space-between;
        font-size:13px;
        font-weight:800;
        margin-bottom:10px;
      }

      .ab-option-buttons {
        display:flex;
        flex-wrap:wrap;
        gap:8px;
      }

      .ab-option-button {
        min-width:48px;
        padding:10px 13px;
        background:#fff;
        border:1px solid #ccc;
        border-radius:8px;
        cursor:pointer;
        font-size:13px;
      }

      .ab-option-button.selected {
        background:#111;
        color:#fff;
        border-color:#111;
      }

      .ab-stock {
        margin-top:18px;
        font-size:13px;
        font-weight:700;
      }

      .ab-stock.low {
        color:#b45b00;
      }

      .ab-stock.out {
        color:#c62828;
      }

      .ab-purchase-row {
        display:flex;
        gap:10px;
        margin-top:24px;
      }

      .ab-quantity {
        display:flex;
        align-items:center;
        border:1px solid #ccc;
        border-radius:10px;
        overflow:hidden;
      }

      .ab-quantity button {
        width:40px;
        height:48px;
        border:0;
        background:#f4f4f4;
        cursor:pointer;
        font-size:18px;
      }

      .ab-quantity span {
        width:42px;
        text-align:center;
        font-weight:800;
      }

      .ab-add-main {
        flex:1;
        border:0;
        border-radius:10px;
        background:#ffd400;
        color:#111;
        font-weight:900;
        cursor:pointer;
        padding:0 20px;
        min-height:48px;
      }

      @media(max-width:800px) {
        .ab-product-modal {
          padding:8px;
          align-items:flex-end;
        }

        .ab-product-modal-panel {
          max-height:96vh;
          grid-template-columns:1fr;
          border-radius:20px 20px 0 0;
        }

        .ab-product-gallery {
          padding:12px;
        }

        .ab-product-info {
          padding:24px 18px 30px;
        }

        .ab-product-main-image {
          max-height:52vh;
        }

        .ab-product-main-image img {
          object-fit:contain;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function openProductModal(id) {
    const product = findProduct(id);

    if (!product) {
      return;
    }

    state.selectedProduct = product;
    state.selectedImageIndex = 0;
    state.selectedSize = product.sizes?.[0] || "";
    state.selectedColor = product.colors?.[0] || "";
    state.selectedQuantity = 1;

    injectProductModalStyles();

    let modal = $("#ab-product-modal");

    if (!modal) {
      modal = document.createElement("div");

      modal.id = "ab-product-modal";
      modal.className = "ab-product-modal";

      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="ab-product-modal-backdrop" data-close-product></div>

      <div
        class="ab-product-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label="${escapeHTML(product.name)}"
      >

        <button
          class="ab-modal-close"
          type="button"
          data-close-product
          aria-label="Close"
        >
          ×
        </button>

        <section class="ab-product-gallery">

          <div class="ab-product-main-image">

            <button
              class="ab-gallery-arrow ab-gallery-prev"
              type="button"
              data-gallery-prev
              aria-label="Previous image"
            >
              ‹
            </button>

            <img
              id="ab-main-product-image"
              src="${product.images[0]}"
              alt="${escapeHTML(product.name)}"
              onerror="this.style.display='none'"
            >

            <button
              class="ab-gallery-arrow ab-gallery-next"
              type="button"
              data-gallery-next
              aria-label="Next image"
            >
              ›
            </button>

          </div>

          <div class="ab-thumbnails">
            ${product.images.map((image, index) => `
              <button
                type="button"
                class="ab-thumbnail ${index === 0 ? "active" : ""}"
                data-thumbnail="${index}"
              >
                <img
                  src="${image}"
                  alt="${escapeHTML(product.name)} view ${index + 1}"
                  onerror="this.parentElement.style.display='none'"
                >
              </button>
            `).join("")}
          </div>

        </section>

        <section class="ab-product-info">

          ${
            product.badge
              ? `<span class="ab-product-badge">${escapeHTML(product.badge)}</span>`
              : ""
          }

          <p class="ab-product-category">
            ${escapeHTML(getCategoryLabel(product.category))}
          </p>

          <h2 class="ab-product-title">
            ${escapeHTML(product.name)}
          </h2>

          <div class="ab-product-price">
            ${formatCurrency(product.price)}
          </div>

          <p class="ab-product-description">
            ${escapeHTML(product.description)}
          </p>

          <div class="ab-option-group">

            <div class="ab-option-label">
              <span>Color</span>
              <span id="ab-selected-color">
                ${escapeHTML(state.selectedColor)}
              </span>
            </div>

            <div class="ab-option-buttons">
              ${product.colors.map(color => `
                <button
                  type="button"
                  class="ab-option-button ${
                    color === state.selectedColor ? "selected" : ""
                  }"
                  data-color="${escapeHTML(color)}"
                >
                  ${escapeHTML(color)}
                </button>
              `).join("")}
            </div>

          </div>

          <div class="ab-option-group">

            <div class="ab-option-label">
              <span>Size</span>
              <span id="ab-selected-size">
                ${escapeHTML(state.selectedSize)}
              </span>
            </div>

            <div class="ab-option-buttons">
              ${product.sizes.map(size => `
                <button
                  type="button"
                  class="ab-option-button ${
                    size === state.selectedSize ? "selected" : ""
                  }"
                  data-size="${escapeHTML(size)}"
                >
                  ${escapeHTML(size)}
                </button>
              `).join("")}
            </div>

          </div>

          <div
            class="ab-stock ${
              product.stock <= 5
                ? "low"
                : ""
            }"
          >
            ${
              product.stock > 0
                ? `${product.stock} available`
                : "Out of stock"
            }
          </div>

          <div class="ab-purchase-row">

            <div class="ab-quantity">

              <button
                type="button"
                data-quantity-minus
              >
                −
              </button>

              <span id="ab-selected-quantity">
                1
              </span>

              <button
                type="button"
                data-quantity-plus
              >
                +
              </button>

            </div>

            <button
              type="button"
              class="ab-add-main"
              data-modal-add
              ${product.stock <= 0 ? "disabled" : ""}
            >
              Add to bag
            </button>

          </div>

        </section>

      </div>
    `;

    modal.classList.add("open");

    document.body.style.overflow = "hidden";

    bindModalEvents(modal);
  }

  function bindModalEvents(modal) {

    $$("[data-close-product]", modal).forEach(button => {
      button.addEventListener("click", closeProductModal);
    });

    const prev = $("[data-gallery-prev]", modal);

    if (prev) {
      prev.addEventListener("click", () => {
        changeProductImage(-1);
      });
    }

    const next = $("[data-gallery-next]", modal);

    if (next) {
      next.addEventListener("click", () => {
        changeProductImage(1);
      });
    }

    $$("[data-thumbnail]", modal).forEach(button => {
      button.addEventListener("click", () => {
        state.selectedImageIndex =
          Number(button.dataset.thumbnail);

        updateProductImage(modal);
      });
    });

    $$("[data-color]", modal).forEach(button => {
      button.addEventListener("click", () => {
        state.selectedColor = button.dataset.color;

        $$("[data-color]", modal).forEach(item =>
          item.classList.remove("selected")
        );

        button.classList.add("selected");

        const output = $("#ab-selected-color", modal);

        if (output) {
          output.textContent = state.selectedColor;
        }
      });
    });

    $$("[data-size]", modal).forEach(button => {
      button.addEventListener("click", () => {
        state.selectedSize = button.dataset.size;

        $$("[data-size]", modal).forEach(item =>
          item.classList.remove("selected")
        );

        button.classList.add("selected");

        const output = $("#ab-selected-size", modal);

        if (output) {
          output.textContent = state.selectedSize;
        }
      });
    });

    const minus = $("[data-quantity-minus]", modal);

    if (minus) {
      minus.addEventListener("click", () => {
        state.selectedQuantity =
          Math.max(1, state.selectedQuantity - 1);

        updateQuantityDisplay(modal);
      });
    }

    const plus = $("[data-quantity-plus]", modal);

    if (plus) {
      plus.addEventListener("click", () => {
        const stock = state.selectedProduct?.stock || 1;

        state.selectedQuantity =
          Math.min(stock, state.selectedQuantity + 1);

        updateQuantityDisplay(modal);
      });
    }

    const addButton = $("[data-modal-add]", modal);

    if (addButton) {
      addButton.addEventListener("click", () => {

        if (!state.selectedProduct) {
          return;
        }

        addToCart(
          state.selectedProduct.id,
          state.selectedSize,
          state.selectedColor,
          state.selectedQuantity
        );

        closeProductModal();
      });
    }
  }

  function updateQuantityDisplay(modal) {
    const display = $("#ab-selected-quantity", modal);

    if (display) {
      display.textContent = state.selectedQuantity;
    }
  }

  function changeProductImage(direction) {
    const product = state.selectedProduct;

    if (!product) {
      return;
    }

    state.selectedImageIndex += direction;

    if (state.selectedImageIndex < 0) {
      state.selectedImageIndex =
        product.images.length - 1;
    }

    if (state.selectedImageIndex >= product.images.length) {
      state.selectedImageIndex = 0;
    }

    const modal = $("#ab-product-modal");

    if (modal) {
      updateProductImage(modal);
    }
  }

  function updateProductImage(modal) {
    const product = state.selectedProduct;

    if (!product) {
      return;
    }

    const image = $("#ab-main-product-image", modal);

    if (image) {
      image.style.display = "block";
      image.src = product.images[state.selectedImageIndex];
    }

    $$("[data-thumbnail]", modal).forEach((button, index) => {
      button.classList.toggle(
        "active",
        index === state.selectedImageIndex
      );
    });
  }

  function closeProductModal() {
    const modal = $("#ab-product-modal");

    if (!modal) {
      return;
    }

    modal.classList.remove("open");

    document.body.style.overflow = "";
  }

  /* =========================================================
     CART
     ========================================================= */

  function addToCart(id, size = "", color = "", quantity = 1) {
    const product = findProduct(id);

    if (!product) {
      return;
    }

    if (product.stock <= 0) {
      showToast("This product is currently out of stock.");
      return;
    }

    const existing = state.cart.find(item =>
      item.id === id &&
      item.size === size &&
      item.color === color
    );

    if (existing) {
      existing.quantity = Math.min(
        product.stock,
        existing.quantity + quantity
      );
    } else {
      state.cart.push({
        id,
        size,
        color,
        quantity: Math.min(product.stock, quantity)
      });
    }

    saveCart();

    renderCart();

    showToast(`${product.name} added to your bag.`);
  }

  function removeFromCart(index) {
    state.cart.splice(index, 1);

    saveCart();

    renderCart();
  }

  function changeCartQuantity(index, change) {
    const item = state.cart[index];

    if (!item) {
      return;
    }

    const product = findProduct(item.id);

    if (!product) {
      return;
    }

    item.quantity += change;

    if (item.quantity <= 0) {
      removeFromCart(index);
      return;
    }

    item.quantity =
      Math.min(product.stock, item.quantity);

    saveCart();

    renderCart();
  }

  function getCartDetails() {
    return state.cart
      .map((item, index) => {
        const product = findProduct(item.id);

        if (!product) {
          return null;
        }

        return {
          ...item,
          index,
          product,
          subtotal: product.price * item.quantity
        };
      })
      .filter(Boolean);
  }

  function getCartTotal() {
    return getCartDetails()
      .reduce(
        (total, item) => total + item.subtotal,
        0
      );
  }

  function getCartCount() {
    return state.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  function renderCart() {
    const details = getCartDetails();

    if (dom.cartCount) {
      dom.cartCount.textContent = getCartCount();
    }

    if (dom.cartTotal) {
      dom.cartTotal.textContent =
        formatCurrency(getCartTotal());
    }

    if (!dom.cartItems) {
      return;
    }

    if (!details.length) {
      dom.cartItems.innerHTML = `
        <div class="empty-cart">
          <h3>Your bag is empty</h3>
          <p>
            Add something from the collection and it will appear here.
          </p>
        </div>
      `;

      return;
    }

    dom.cartItems.innerHTML = details.map(item => `
      <div class="cart-item">

        <div class="cart-item-image">
          <img
            src="${item.product.image}"
            alt="${escapeHTML(item.product.name)}"
            onerror="imageFallback(this)"
          >
        </div>

        <div class="cart-item-info">

          <h4>
            ${escapeHTML(item.product.name)}
          </h4>

          <p>
            ${formatCurrency(item.product.price)}
          </p>

          ${
            item.color
              ? `<small>Color: ${escapeHTML(item.color)}</small>`
              : ""
          }

          ${
            item.size
              ? `<small>Size: ${escapeHTML(item.size)}</small>`
              : ""
          }

          <div class="cart-item-controls">

            <button
              type="button"
              data-cart-minus="${item.index}"
            >
              −
            </button>

            <span>${item.quantity}</span>

            <button
              type="button"
              data-cart-plus="${item.index}"
            >
              +
            </button>

            <button
              type="button"
              data-cart-remove="${item.index}"
              class="cart-remove"
            >
              Remove
            </button>

          </div>

        </div>

      </div>
    `).join("");

    $$("[data-cart-minus]", dom.cartItems).forEach(button => {
      button.addEventListener("click", () => {
        changeCartQuantity(
          Number(button.dataset.cartMinus),
          -1
        );
      });
    });

    $$("[data-cart-plus]", dom.cartItems).forEach(button => {
      button.addEventListener("click", () => {
        changeCartQuantity(
          Number(button.dataset.cartPlus),
          1
        );
      });
    });

    $$("[data-cart-remove]", dom.cartItems).forEach(button => {
      button.addEventListener("click", () => {
        removeFromCart(
          Number(button.dataset.cartRemove)
        );
      });
    });
  }

  function openCart() {
    if (dom.cartDrawer) {
      dom.cartDrawer.classList.add("open");
    }

    if (dom.cartOverlay) {
      dom.cartOverlay.classList.add("open");
    }

    document.body.classList.add("cart-open");
  }

  function closeCart() {
    if (dom.cartDrawer) {
      dom.cartDrawer.classList.remove("open");
    }

    if (dom.cartOverlay) {
      dom.cartOverlay.classList.remove("open");
    }

    document.body.classList.remove("cart-open");
  }

  /* =========================================================
     NAVIGATION
     ========================================================= */

  function normalizePage(page) {
    const validPages = [
      "home",
      "shop",
      "collections",
      "investment",
      "about",
      "contact"
    ];

    return validPages.includes(page)
      ? page
      : CONFIG.defaultPage;
  }

  function navigate(page, updateHistory = true) {
    page = normalizePage(page);

    state.currentPage = page;

    document.body.dataset.page = page;

    if (updateHistory) {
      history.pushState(
        { page },
        "",
        `#${page}`
      );
    }

    renderPageState();

    closeMobileMenu();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function renderPageState() {

    $$("[data-page-link]").forEach(link => {
      link.classList.toggle(
        "active",
        link.dataset.pageLink === state.currentPage
      );
    });

    $$("[data-page-section]").forEach(section => {
      section.classList.toggle(
        "active",
        section.dataset.pageSection === state.currentPage
      );
    });
  }

  function setupNavigation() {

    $$("[data-page-link]").forEach(link => {
      link.addEventListener("click", event => {
        event.preventDefault();

        navigate(
          link.dataset.pageLink
        );
      });
    });

    window.addEventListener("popstate", () => {
      const page =
        location.hash.replace("#", "") ||
        CONFIG.defaultPage;

      navigate(page, false);
    });

    const initialPage =
      location.hash.replace("#", "") ||
      CONFIG.defaultPage;

    state.currentPage =
      normalizePage(initialPage);

    renderPageState();
  }

  /* =========================================================
     CATEGORY FILTERS
     ========================================================= */

  function setupCategoryFilters() {

    $$(".filter-btn").forEach(button => {
      button.addEventListener("click", () => {

        $$(".filter-btn").forEach(item =>
          item.classList.remove("active")
        );

        button.classList.add("active");

        state.currentCategory =
          button.dataset.filter || "all";

        renderShopProducts();
      });
    });

    $$(".category-card").forEach(card => {
      card.addEventListener("click", () => {

        const category =
          card.dataset.category || "all";

        state.currentCategory = category;

        $$(".filter-btn").forEach(button => {
          button.classList.toggle(
            "active",
            button.dataset.filter === category
          );
        });

        navigate("shop");
        renderShopProducts();
      });
    });
  }

  /* =========================================================
     SEARCH
     ========================================================= */

  function setupSearch() {

    if (dom.searchForm) {
      dom.searchForm.addEventListener(
        "submit",
        event => {
          event.preventDefault();

          const input =
            dom.searchInput?.value || "";

          state.currentSearch = input;

          navigate("shop");

          renderShopProducts();
        }
      );
    }

    if (dom.searchInput) {
      dom.searchInput.addEventListener(
        "input",
        () => {
          state.currentSearch =
            dom.searchInput.value;

          if (state.currentPage === "shop") {
            renderShopProducts();
          }
        }
      );
    }

    if (dom.shopSearch) {
      dom.shopSearch.addEventListener(
        "input",
        () => {
          state.currentSearch =
            dom.shopSearch.value;

          renderShopProducts();
        }
      );
    }
  }

  /* =========================================================
     SORT
     ========================================================= */

  function setupSorting() {

    if (!dom.sortSelect) {
      return;
    }

    dom.sortSelect.addEventListener(
      "change",
      () => {

        state.currentSort =
          dom.sortSelect.value;

        renderShopProducts();
      }
    );
  }

  /* =========================================================
     MOBILE MENU
     ========================================================= */

  function openMobileMenu() {

    if (dom.mobileMenu) {
      dom.mobileMenu.classList.add("open");
    }

    if (dom.mobileOverlay) {
      dom.mobileOverlay.classList.add("open");
    }

    document.body.classList.add("menu-open");
  }

  function closeMobileMenu() {

    if (dom.mobileMenu) {
      dom.mobileMenu.classList.remove("open");
    }

    if (dom.mobileOverlay) {
      dom.mobileOverlay.classList.remove("open");
    }

    document.body.classList.remove("menu-open");
  }

  function setupMobileMenu() {

    if (dom.menuToggle) {
      dom.menuToggle.addEventListener(
        "click",
        () => {

          const open =
            dom.mobileMenu?.classList.contains("open");

          if (open) {
            closeMobileMenu();
          } else {
            openMobileMenu();
          }
        }
      );
    }

    if (dom.mobileOverlay) {
      dom.mobileOverlay.addEventListener(
        "click",
        closeMobileMenu
      );
    }

    $$(".mobile-menu a").forEach(link => {
      link.addEventListener(
        "click",
        closeMobileMenu
      );
    });
  }

  /* =========================================================
     CART EVENTS
     ========================================================= */

  function setupCart() {

    if (dom.cartButton) {
      dom.cartButton.addEventListener(
        "click",
        openCart
      );
    }

    if (dom.cartOverlay) {
      dom.cartOverlay.addEventListener(
        "click",
        closeCart
      );
    }

    $$("[data-close-cart]").forEach(button => {
      button.addEventListener(
        "click",
        closeCart
      );
    });
  }

  /* =========================================================
     HEADER AUTO HIDE
     ========================================================= */

  function setupHeaderAutoHide() {

    if (!dom.siteHeader) {
      return;
    }

    let lastScroll = window.scrollY;

    window.addEventListener(
      "scroll",
      () => {

        const currentScroll =
          window.scrollY;

        if (
          currentScroll > lastScroll &&
          currentScroll > 120
        ) {
          dom.siteHeader.classList.add(
            "header-hidden"
          );
        } else {
          dom.siteHeader.classList.remove(
            "header-hidden"
          );
        }

        lastScroll = currentScroll;
      },
      { passive: true }
    );
  }

  /* =========================================================
     THEME
     ========================================================= */

  function setupTheme() {

    const savedTheme =
      localStorage.getItem(CONFIG.themeKey);

    if (savedTheme) {
      document.documentElement.dataset.theme =
        savedTheme;
    }

    $$("[data-theme-toggle]").forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const current =
            document.documentElement.dataset.theme;

          const next =
            current === "dark"
              ? "light"
              : "dark";

          document.documentElement.dataset.theme =
            next;

          localStorage.setItem(
            CONFIG.themeKey,
            next
          );
        }
      );

    });
  }

  /* =========================================================
     INVESTMENT CALCULATOR
     ========================================================= */

  function calculateInvestment() {

    if (!dom.investmentAmount) {
      return;
    }

    const amount =
      Number(dom.investmentAmount.value) || 0;

    const percentage =
      amount > 0
        ? (amount / CONFIG.totalEquity) * 100
        : 0;

    if (dom.shareOutput) {
      dom.shareOutput.textContent =
        `${percentage.toFixed(2)}%`;
    }

    if (dom.equityOutput) {
      dom.equityOutput.textContent =
        formatCurrency(
          CONFIG.totalEquity
        );
    }

    if (dom.equityValue) {
      dom.equityValue.textContent =
        formatCurrency(
          CONFIG.totalEquity
        );
    }
  }

  function setupInvestment() {

    if (dom.investmentAmount) {
      dom.investmentAmount.addEventListener(
        "input",
        calculateInvestment
      );

      calculateInvestment();
    }
  }

  /* =========================================================
     ANNOUNCEMENT BAR
     ========================================================= */

  function setupAnnouncement() {

    if (!dom.announcementClose) {
      return;
    }

    dom.announcementClose.addEventListener(
      "click",
      () => {

        if (dom.announcement) {
          dom.announcement.style.display =
            "none";
        }
      }
    );
  }

  /* =========================================================
     KEYBOARD EVENTS
     ========================================================= */

  function setupKeyboard() {

    document.addEventListener(
      "keydown",
      event => {

        if (event.key === "Escape") {
          closeProductModal();
          closeCart();
          closeMobileMenu();
        }

        const modal =
          $("#ab-product-modal");

        if (
          modal &&
          modal.classList.contains("open")
        ) {

          if (event.key === "ArrowLeft") {
            changeProductImage(-1);
          }

          if (event.key === "ArrowRight") {
            changeProductImage(1);
          }
        }
      }
    );
  }

  /* =========================================================
     PRELOADER
     ========================================================= */

  function finishPreloader() {

    if (!dom.preloader) {
      return;
    }

    dom.preloader.classList.add("loaded");

    setTimeout(() => {
      if (dom.preloader) {
        dom.preloader.style.display = "none";
      }
    }, 500);
  }

  /* =========================================================
     YEAR
     ========================================================= */

  function setYear() {

    if (dom.year) {
      dom.year.textContent =
        new Date().getFullYear();
    }
  }

  /* =========================================================
     DEBUG INFO
     ========================================================= */

  function developmentInfo() {

    console.log(
      `%c AREA BOYZ ENTERPRISE `,
      "background:#ffd400;color:#080808;font-weight:900;padding:6px 10px;"
    );

    console.log(
      `Catalogue loaded: ${state.products.length} products`
    );

    console.log(
      "Product image format: images/products/product-001.jpg"
    );

    console.log(
      "Additional gallery images: product-001-2.jpg, product-001-3.jpg, product-001-4.jpg"
    );
  }

  /* =========================================================
     INITIALIZATION
     ========================================================= */

  function init() {

    state.products =
      generateProducts();

    renderFeaturedProducts();

    renderShopProducts();

    renderCart();

    setupNavigation();

    setupCategoryFilters();

    setupSearch();

    setupSorting();

    setupMobileMenu();

    setupCart();

    setupHeaderAutoHide();

    setupTheme();

    setupInvestment();

    setupAnnouncement();

    setupKeyboard();

    setYear();

    developmentInfo();

    setTimeout(
      finishPreloader,
      CONFIG.preloaderDuration
    );
  }

  /* =========================================================
     START
     ========================================================= */

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init
    );
  } else {
    init();
  }

})();
