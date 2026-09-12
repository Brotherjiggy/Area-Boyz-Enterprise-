/* =====================================================
   Area Boyz Enterprise – Vanilla JS SPA
   ===================================================== */

const PRODUCTS = [
  { id: 1, title: "Classic Indigo Denim Jacket", price: 89.99, old: 120, cat: "denim", badge: "Bestseller", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop" },
  { id: 2, title: "Handmade Crafty Cargo Pants", price: 74.50, old: null, cat: "handmade", badge: "New", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop" },
  { id: 3, title: "Street Swag Oversized Tee", price: 39.00, old: 55, cat: "street", badge: null, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop" },
  { id: 4, title: "Tranquility Linen Shirt", price: 68.00, old: null, cat: "handmade", badge: "Limited", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop" },
  { id: 5, title: "Luxury Gold Accent Hoodie", price: 129.00, old: 160, cat: "luxury", badge: "40% off", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop" },
  { id: 6, title: "Area Boyz Signature Denim", price: 95.00, old: null, cat: "denim", badge: null, img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop" },
  { id: 7, title: "Evolutionary Platform Cap", price: 32.00, old: null, cat: "street", badge: "New Drop", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop" },
  { id: 8, title: "Handmade Beaded Crossbody", price: 58.00, old: 75, cat: "handmade", badge: null, img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop" },
  { id: 9, title: "Black & Yellow Track Set", price: 110.00, old: null, cat: "street", badge: "Exclusive", img: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=400&fit=crop" },
  { id: 10, title: "Crafty Distressed Jeans", price: 82.00, old: 99, cat: "denim", badge: null, img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop" },
  { id: 11, title: "Swag Utility Vest", price: 72.00, old: null, cat: "street", badge: "Hot", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop" },
  { id: 12, title: "Intention Embroidered Bomber", price: 145.00, old: 180, cat: "luxury", badge: "Premium", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop" },
  { id: 13, title: "Relaxed Fit Denim Shirt", price: 64.00, old: null, cat: "denim", badge: null, img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop" },
  { id: 14, title: "Tranquil Earth Tone Pants", price: 79.00, old: null, cat: "handmade", badge: "New", img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop" },
  { id: 15, title: "Yellow Accent Sneakers", price: 98.00, old: 130, cat: "street", badge: "Sale", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop" },
  { id: 16, title: "Luxury Silk Blend Scarf", price: 45.00, old: null, cat: "luxury", badge: null, img: "https://images.unsplash.com/photo-1601924994987-69e26a50ea40?w=400&h=400&fit=crop" },
];

let cart = JSON.parse(localStorage.getItem('ab_cart') || '[]');
let currentFilter = 'all';

/* ---------- START APP ---------- */
document.addEventListener("DOMContentLoaded", function() {
  handleRoute();
});
window.addEventListener("load", function() {
  handleRoute();
});

/* ---------- ROUTING ---------- */
function handleRoute() {
  const hash = window.location.hash.slice(1) || 'home';
  showPage(hash);
}

window.addEventListener('hashchange', handleRoute);

function showPage(pageId) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === pageId);
  });

  closeSideMenu();

  const main = document.getElementById('mainContent');
  if (!main) return;

  let html = '';

  switch (pageId) {
    case 'home': html = renderHome(); break;
    case 'shop': html = renderShop(); break;
    case 'invest': html = renderInvest(); break;
    case 'about': html = renderAbout(); break;
    case 'account': html = renderAccount(); break;
    case 'cart': html = renderCart(); break;
    case 'collections': html = renderCollections(); break;
    case 'contact': html = renderContact(); break;
    default: html = renderHome();
  }

  main.innerHTML = `<div class="page active">${html}</div>`;
  updateCartCount();
  bindProductEvents();
}

/* ---------- RENDER FUNCTIONS ---------- */
function renderHome() {
  const featured = PRODUCTS.slice(0, 6);
  return `
    <section class="hero">
      <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=500&fit=crop" alt="Area Boyz Styles that fit your life">
      <div class="hero-overlay">
        <span class="hero-tag">Styles that fit your life</span>
        <h1>The Denim Shop</h1>
        <p>An Area Boy evolutionary platform — swag, tranquility & handmade crafty outfits with intention.</p>
        <a href="#shop" class="btn-primary">Shop now</a>
      </div>
    </section>

    <div class="promo-row px-12">
      <div class="promo-card">
        <div>
          <h3>Mums & more from $7.97</h3>
          <p>Fresh seasonal drops</p>
        </div>
        <a href="#shop" class="shop-link">Shop now</a>
      </div>
      <div class="promo-card">
        <div>
          <h3>Nike sneakers & more</h3>
          <p>Street essentials</p>
        </div>
        <a href="#shop" class="shop-link">Shop now</a>
      </div>
    </div>

    <div class="big-promo">
      <h3>Up to 40% off</h3>
      <p>Selected designer wears & handmade pieces</p>
      <a href="#shop" class="btn-primary" style="background:#0A0A0A;color:#FFD100;">Shop now</a>
    </div>

    <section class="section">
      <div class="section-header">
        <h2>Featured Designer Wears</h2>
        <a href="#shop" class="see-all">See all</a>
      </div>
      <div class="product-grid">
        ${featured.map(p => productCard(p)).join('')}
      </div>
    </section>

    <div class="app-promo">
      <div class="icon">AB</div>
      <div>
        <h4>Area Boyz – Shopping & Style</h4>
        <p>The easiest way to shop, checkout & track your orders – anywhere you are.</p>
        <div class="stars">★★★★★</div>
      </div>
    </div>
    <a href="#shop" class="btn-get-app">Get the experience</a>
  `;
}

function renderShop() {
  const filtered = currentFilter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === currentFilter);
  return `
    <section class="section" style="padding-top:16px;">
      <div class="section-header">
        <h2>All Designer Wears</h2>
        <span style="font-size:13px;color:var(--gray-500);">${filtered.length} items</span>
      </div>
      <div class="product-grid">
        ${filtered.map(p => productCard(p)).join('')}
      </div>
      <p style="text-align:center;margin-top:24px;font-size:13px;color:var(--gray-500);">
        Showing sample of 100+ designer pieces. Full catalog coming soon.
      </p>
    </section>
  `;
}

function renderInvest() {
  return `
    <div class="invest-hero">
      <p class="equity-label">Total Equity</p>
      <div class="equity-value">\~$758,000</div>
      <p class="equity-sub">Investment Return Share • Area Boyz Enterprise</p>
      <div class="stats-row">
        <div class="stat"><div class="num">42%</div><div class="label">YOY Growth</div></div>
        <div class="stat"><div class="num">18%</div><div class="label">Target ROI</div></div>
        <div class="stat"><div class="num">2024</div><div class="label">Founded</div></div>
      </div>
      <a href="#contact" class="btn-primary" style="width:100%;justify-content:center;">Request Investment Deck</a>
    </div>
    <section class="section">
      <h2 style="margin-bottom:12px;">Why Invest in Area Boyz?</h2>
      <div class="promo-card" style="margin-bottom:12px;">
        <h3>Evolutionary Fashion Platform</h3>
        <p>Combining street swag with intentional handmade craft. A unique cultural brand with growing demand across Africa & diaspora.</p>
      </div>
      <div class="promo-card" style="margin-bottom:12px;">
        <h3>Multiple Revenue Streams</h3>
        <p>Direct-to-consumer designer wears, limited drops, wholesale partnerships, and brand collaborations.</p>
      </div>
      <div class="promo-card">
        <h3>Transparent Equity Structure</h3>
        <p>Clear share of returns tied to performance. Current total equity valued at approximately $758,000.</p>
      </div>
    </section>
  `;
}

function renderAbout() {
  return `
    <div class="story-block">
      <h2>Our Story</h2>
      <div class="tagline-box">
        “Styles that fit your life — it’s an Area Boy evolutionary platform where you see swag, tranquility, handmade crafty outfits with intention.”
      </div>
      <p>Area Boyz Enterprise was born from the streets and refined by intention. We create designer wears that speak to the modern African youth — bold, authentic, and crafted with purpose.</p>
      <p>From premium denim to handmade pieces, every drop is designed to fit real life: the hustle, the chill, the celebration. We believe fashion should elevate without pretension.</p>
      <p>Today the brand stands on a foundation of approximately <strong class="text-yellow">$758,000</strong> in total equity, with a clear path for community and investor participation through our return-share model.</p>
      <a href="#shop" class="btn-primary mt-12">Explore the collection</a>
    </div>
  `;
}

function renderAccount() {
  return `
    <section class="section" style="padding-top:24px;">
      <h2 style="margin-bottom:20px;">Your Account</h2>
      <div class="form-group"><label>Email</label><input type="email" placeholder="you@example.com"></div>
      <div class="form-group"><label>Password</label><input type="password" placeholder="••••••••"></div>
      <button class="btn-primary" style="width:100%;justify-content:center;margin-top:8px;">Sign In</button>
      <p style="text-align:center;margin-top:16px;font-size:13px;color:var(--gray-500);">
        New here? <a href="#contact" class="text-yellow">Create account</a>
      </p>
    </section>
  `;
}

function renderCart() {
  if (cart.length === 0) {
    return `
      <div class="empty-state">
        <h3>Your cart is empty</h3>
        <p>Add some designer wears to get started.</p>
        <a href="#shop" class="btn-primary mt-12">Browse Shop</a>
      </div>
    `;
  }
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return `
    <section class="section" style="padding-top:16px;">
      <h2 style="margin-bottom:16px;">Your Cart (${cart.length})</h2>
      ${cart.map(item => `
        <div class="promo-card" style="flex-direction:row;gap:12px;align-items:center;margin-bottom:10px;">
          <img src="${item.img}" alt="" style="width:70px;height:70px;object-fit:cover;border-radius:8px;">
          <div style="flex:1;">
            <div style="font-weight:600;font-size:14px;">${item.title}</div>
            <div class="text-yellow" style="font-weight:700;">\[ {item.price.toFixed(2)}</div>
            <div style="font-size:12px;color:var(--gray-500);">Qty: ${item.qty}</div>
          </div>
        </div>
      `).join('')}
      <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--gray-800);">
        <div style="display:flex;justify-content:space-between;font-size:18px;font-weight:700;margin-bottom:16px;">
          <span>Total</span>
          <span class="text-yellow"> \]{total.toFixed(2)}</span>
        </div>
        <button class="btn-primary" style="width:100%;justify-content:center;">Checkout</button>
      </div>
    </section>
  `;
}

function renderCollections() {
  return `
    <section class="section" style="padding-top:16px;">
      <h2 style="margin-bottom:16px;">Collections</h2>
      <div class="promo-card" style="margin-bottom:12px;"><h3>The Denim Shop</h3><p>Core indigo, black, and washed pieces built for everyday swag.</p><a href="#shop" class="shop-link">Explore</a></div>
      <div class="promo-card" style="margin-bottom:12px;"><h3>Handmade & Crafty</h3><p>Intentionally made pieces with artisan details and limited runs.</p><a href="#shop" class="shop-link">Explore</a></div>
      <div class="promo-card" style="margin-bottom:12px;"><h3>Street Evolution</h3><p>Oversized silhouettes, utility, and Area Boyz signature graphics.</p><a href="#shop" class="shop-link">Explore</a></div>
      <div class="promo-card"><h3>Luxury Capsule</h3><p>Premium fabrics and refined details for elevated moments.</p><a href="#shop" class="shop-link">Explore</a></div>
    </section>
  `;
}

function renderContact() {
  return `
    <section class="section" style="padding-top:16px;">
      <h2 style="margin-bottom:16px;">Contact & Invest</h2>
      <p style="font-size:14px;color:var(--gray-300);margin-bottom:20px;">Interested in partnership, wholesale, or investment return share? Reach out.</p>
      <div class="form-group"><label>Full Name</label><input type="text" placeholder="Your name"></div>
      <div class="form-group"><label>Email</label><input type="email" placeholder="you@example.com"></div>
      <div class="form-group"><label>Interest</label>
        <select>
          <option>Investment / Equity</option>
          <option>Wholesale</option>
          <option>Collaboration</option>
          <option>General Inquiry</option>
        </select>
      </div>
      <div class="form-group"><label>Message</label><textarea rows="4" placeholder="Tell us more..."></textarea></div>
      <button class="btn-primary" style="width:100%;justify-content:center;">Send Message</button>
    </section>
  `;
}

function productCard(p) {
  return `
    <article class="product-card">
      <div class="product-img">
        \( {p.badge ? `<span class="badge"> \){p.badge}</span>` : ''}
        <img src="\( {p.img}" alt=" \){p.title}" loading="lazy">
      </div>
      <div class="product-info">
        <h3 class="product-title">${p.title}</h3>
        <div>
          <span class="product-price">\[ {p.price.toFixed(2)}</span>
          ${p.old ? `<span class="product-old"> \]{p.old.toFixed(2)}</span>` : ''}
        </div>
        <button class="add-btn" data-add="${p.id}">Add to cart</button>
      </div>
    </article>
  `;
}

function bindProductEvents() {
  document.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      addToCart(parseInt(btn.dataset.add));
    });
  });
}

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ ...product, qty: 1 });
  localStorage.setItem('ab_cart', JSON.stringify(cart));
  updateCartCount();
  const btn = document.querySelector(`[data-add="${id}"]`);
  if (btn) {
    btn.textContent = 'Added ✓';
    btn.style.background = '#22C55E';
    setTimeout(() => {
      btn.textContent = 'Add to cart';
      btn.style.background = '';
    }, 900);
  }
}

function updateCartCount() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cartCount');
  if (el) el.textContent = count;
}

/* ---------- SIDE MENU ---------- */
const menuToggle = document.getElementById('menuToggle');
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('overlay');
const closeMenu = document.getElementById('closeMenu');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    sideMenu.classList.add('open');
    overlay.classList.add('show');
  });
}

function closeSideMenu() {
  if (sideMenu) {
    sideMenu.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
  }
}

if (closeMenu) closeMenu.addEventListener('click', closeSideMenu);
if (overlay) overlay.addEventListener('click', closeSideMenu);

document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    currentFilter = pill.dataset.filter;
    if (window.location.hash.slice(1) === 'shop') showPage('shop');
  });
});

const searchToggle = document.getElementById('searchToggle');
if (searchToggle) {
  searchToggle.addEventListener('click', () => {
    const input = document.getElementById('searchInput');
    if (input) input.focus();
  });
}

updateCartCount();
