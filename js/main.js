/* Area Boyz Enterprise - Core Interactions */

// ========== CART SYSTEM ==========
const CART_KEY = 'areaboyz_cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  showToast(`${product.name} added to cart`);
}

function removeFromCart(id) {
  let cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
}

function updateQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(id);
      return;
    }
    saveCart(cart);
  }
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function updateCartUI() {
  const countEls = document.querySelectorAll('.cart-count');
  const total = getCart().reduce((s, i) => s + i.qty, 0);
  countEls.forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'grid' : 'none';
  });
}

// ========== TOAST ==========
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ========== HERO SLIDER ==========
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  document.querySelector('.hero-nav.next')?.addEventListener('click', () => { next(); resetTimer(); });
  document.querySelector('.hero-nav.prev')?.addEventListener('click', () => { prev(); resetTimer(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); resetTimer(); });
  });

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, 5500);
  }

  resetTimer();
}

// ========== MOBILE NAV ==========
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const links = document.querySelector('.nav-links');
  toggle?.addEventListener('click', () => {
    links.classList.toggle('open');
  });
}

// ========== PRODUCT DATA ==========
const PRODUCTS = [
  {
    id: 'p1',
    name: 'Emerald Brocade Vest Ensemble',
    category: 'Formal',
    price: 890,
    img: 'images/formal-green-vest.jpg',
    desc: 'Luxurious emerald green brocade vest with intricate gold patterns, paired with white ruffled shirt and wide-leg trousers. Statement formalwear for the modern gentleman.'
  },
  {
    id: 'p2',
    name: 'Black Mandarin Collar Suit',
    category: 'Formal',
    price: 1250,
    img: 'images/black-mandarin-suit.jpg',
    desc: 'Sleek all-black ribbed suit with high mandarin collar and single-button closure. Minimalist power dressing redefined.'
  },
  {
    id: 'p3',
    name: 'Nike Air Force 1 Blue Patent',
    category: 'Footwear',
    price: 220,
    img: 'images/nike-blue-af1-1.jpg',
    desc: 'Limited-edition metallic blue patent leather Air Force 1s with gum sole. Iconic silhouette meets futuristic shine.'
  },
  {
    id: 'p4',
    name: 'Chanel Beige Anorak',
    category: 'Outerwear',
    price: 3200,
    img: 'images/chanel-beige-jacket.jpg',
    desc: 'Authentic Chanel beige and soft blue anorak with shearling lining and signature CC logos. Luxury streetwear essential.'
  },
  {
    id: 'p5',
    name: 'Polka Dot & Pink Pleated Set',
    category: 'Contemporary',
    price: 480,
    img: 'images/polka-pink-outfit.jpg',
    desc: 'Crisp white shirt with green polka dots paired with soft pink pleated trousers. Playful yet refined contemporary menswear.'
  },
  {
    id: 'p6',
    name: 'Dior Gray Leather Vest',
    category: 'Luxury',
    price: 2750,
    img: 'images/dior-gray-vest.jpg',
    desc: 'Gray leather biker-inspired vest with multiple zippers, high collar and adjustable belt. Pure luxury edge.'
  },
  {
    id: 'p7',
    name: 'Lace-Trim Wide-Leg Jeans',
    category: 'Denim',
    price: 340,
    img: 'images/lace-jeans-full.jpg',
    desc: 'Light-wash wide-leg jeans elevated with delicate white lace inserts at the hem. Feminine detail meets relaxed denim.'
  },
  {
    id: 'p8',
    name: 'Marvel Varsity Collection',
    category: 'Streetwear',
    price: 420,
    img: 'images/marvel-varsity-jackets.jpg',
    desc: 'Premium embroidered varsity jackets featuring Spider-Man, Venom and exclusive Civil Regime x Marvel collaboration graphics.'
  },
  {
    id: 'p9',
    name: 'Spider-Man Comic Tee',
    category: 'Streetwear',
    price: 85,
    img: 'images/spiderman-tshirt.jpg',
    desc: 'Vintage-inspired Spider-Man graphic tee with full-front comic panel print. Soft cotton, bold statement.'
  },
  {
    id: 'p10',
    name: 'Red Spider Hoodie',
    category: 'Streetwear',
    price: 195,
    img: 'images/spiderman-hoodie.jpg',
    desc: 'Vibrant red zip-up hoodie with large embroidered spider emblem and Civil Regime sleeve lettering.'
  },
  {
    id: 'p11',
    name: 'Zipper Utility Cap',
    category: 'Accessories',
    price: 65,
    img: 'images/zipper-cap.jpg',
    desc: 'Innovative dual-zipper utility baseball cap in two-tone suede. Functional storage meets street style.'
  },
  {
    id: 'p12',
    name: 'Black Gold Branch Suit',
    category: 'Couture',
    price: 1850,
    img: 'images/black-gold-suit.jpg',
    desc: 'Dramatic black suit with gold branch embroidery and asymmetric draped sash. High-fashion runway energy.'
  },
  {
    id: 'p13',
    name: 'Ivory Bamboo Suit',
    category: 'Couture',
    price: 1680,
    img: 'images/white-bamboo-suit.jpg',
    desc: 'Elegant ivory suit with delicate black bamboo ink-style prints and flowing side panels. Eastern-inspired modern tailoring.'
  },
  {
    id: 'p14',
    name: 'Gold Mirror Vest Look',
    category: 'Avant-Garde',
    price: 980,
    img: 'images/gold-vest-outfit.jpg',
    desc: 'Liquid-gold metallic asymmetric vest over black base layers with chain detail. Pure futuristic statement.'
  },
  {
    id: 'p15',
    name: 'Cyber Geometric Coat',
    category: 'Avant-Garde',
    price: 1450,
    img: 'images/blue-patterned-coat.jpg',
    desc: 'Deep blue geometric-patterned asymmetrical coat with metal clasps and circuit-inspired embroidery. Tech-wear meets couture.'
  },
  {
    id: 'p16',
    name: 'Charcoal Pleated Trousers',
    category: 'Bottoms',
    price: 290,
    img: 'images/gray-pleated-pants.jpg',
    desc: 'Heavyweight charcoal wool-blend trousers with deep pleats, integrated belt and wide leg. Elevated essentials.'
  }
];

// ========== RENDER PRODUCTS ==========
function renderProducts(containerId, limit = null, category = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let list = PRODUCTS;
  if (category) list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
  if (limit) list = list.slice(0, limit);

  container.innerHTML = list.map(p => `
    <article class="product-card">
      <div class="product-img">
        <img src="\( {p.img}" alt=" \){p.name}" loading="lazy">
        ${p.price > 1000 ? '<span class="product-badge">Luxury</span>' : ''}
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-price">
          <span class="price">\[ {p.price.toLocaleString()}</span>
          <button class="add-to-cart" data-id="${p.id}" aria-label="Add to cart">＋</button>
        </div>
      </div>
    </article>
  `).join('');

  container.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const id = btn.dataset.id;
      const product = PRODUCTS.find(p => p.id === id);
      if (product) addToCart(product);
    });
  });
}

// ========== CART PAGE ==========
function renderCartPage() {
  const tbody = document.getElementById('cart-items');
  const summary = document.getElementById('cart-summary');
  if (!tbody) return;

  const cart = getCart();
  if (cart.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:3rem;color:var(--text-secondary)">Your cart is empty. <a href="shop.html" style="color:var(--accent)">Browse the collection</a></td></tr>`;
    if (summary) summary.innerHTML = '';
    return;
  }

  tbody.innerHTML = cart.map(item => `
    <tr>
      <td><img src="\( {item.img}" alt=" \){item.name}" class="cart-item-img"></td>
      <td>
        <strong>${item.name}</strong><br>
        <small style="color:var(--text-secondary)">${item.category}</small>
      </td>
      <td> \]{item.price.toLocaleString()}</td>
      <td>
        <div class="qty-control">
          <button data-id="${item.id}" data-delta="-1">−</button>
          <span>${item.qty}</span>
          <button data-id="${item.id}" data-delta="1">+</button>
        </div>
      </td>
      <td>\[ {(item.price * item.qty).toLocaleString()}</td>
    </tr>
  `).join('');

  tbody.querySelectorAll('.qty-control button').forEach(btn => {
    btn.addEventListener('click', () => {
      updateQty(btn.dataset.id, parseInt(btn.dataset.delta));
      renderCartPage();
    });
  });

  const total = getCartTotal();
  if (summary) {
    summary.innerHTML = `
      <h3 style="margin-bottom:1.25rem">Order Summary</h3>
      <div style="display:flex;justify-content:space-between;margin-bottom:0.75rem">
        <span style="color:var(--text-secondary)">Subtotal</span>
        <span> \]{total.toLocaleString()}</span>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:0.75rem">
        <span style="color:var(--text-secondary)">Shipping</span>
        <span>Calculated at checkout</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:1.25rem;font-weight:700;margin:1.25rem 0;padding-top:1rem;border-top:1px solid var(--border)">
        <span>Total</span>
        <span style="color:var(--accent)">\[ {total.toLocaleString()}</span>
      </div>
      <a href="checkout.html" class="btn btn-primary" style="width:100%;margin-top:0.5rem">Proceed to Checkout</a>
    `;
  }
}

// ========== SHARES CALCULATOR ==========
function initSharesCalc() {
  const input = document.getElementById('share-amount');
  const result = document.getElementById('calc-result');
  if (!input || !result) return;

  const TOTAL_SHARES_VALUE = 756000;
  // Example return model: higher investment = better projected annual return rate
  function calculate() {
    const amount = parseFloat(input.value) || 0;
    if (amount < 100) {
      result.innerHTML = `<p style="color:var(--text-secondary)">Minimum investment: $100</p>`;
      return;
    }
    let rate;
    if (amount >= 50000) rate = 0.18;
    else if (amount >= 20000) rate = 0.15;
    else if (amount >= 5000) rate = 0.12;
    else rate = 0.09;

    const annual = amount * rate;
    const ownership = ((amount / TOTAL_SHARES_VALUE) * 100).toFixed(4);

    result.innerHTML = `
      <div class="value"> \]{annual.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
      <p style="margin:0.5rem 0;color:var(--text-secondary)">Projected annual return (${(rate*100).toFixed(0)}%)</p>
      <p style="font-size:0.9rem;color:var(--text-secondary)">Ownership: ${ownership}% of company equity pool</p>
    `;
  }

  input.addEventListener('input', calculate);
  calculate();
}

// ========== CHECKOUT ==========
function initCheckout() {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  const totalEl = document.getElementById('checkout-total');
  if (totalEl) {
    totalEl.textContent = '$' + getCartTotal().toLocaleString();
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const cart = getCart();
    if (cart.length === 0) {
      showToast('Your cart is empty');
      return;
    }
    // Simulate payment
    showToast('Payment successful! Order confirmed.');
    localStorage.removeItem(CART_KEY);
    updateCartUI();
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1800);
  });
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  initSlider();
  initMobileNav();
  initSharesCalc();
  initCheckout();

  // Featured on homepage
  renderProducts('featured-products', 8);

  // Full shop
  renderProducts('shop-products');

  // Cart page
  renderCartPage();

  // Active nav
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
});
