// ---- Default product catalog (used as fallback if localStorage is empty) ----
const DEFAULT_PRODUCTS = [
  {
    id: "1",
    name: "Tikuvchi Oxford Ko'ylagi",
    price: 890000,
    image: "https://images.unsplash.com/photo-1760128761565-c0d779481070?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    isSale: false,
    category: "Ko'ylaklar",
    colors: ["#FFFFFF", "#1B2D4F", "#6B7B8D", "#1A1A1A"],
    stock: 45,
    status: "active",
  },
  {
    id: "2",
    name: "Klassik Jun Blazer",
    price: 2450000,
    originalPrice: 2900000,
    image: "https://images.unsplash.com/photo-1754485115876-9221149ccc19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    rating: 4.9,
    reviewCount: 87,
    isNew: false,
    isSale: true,
    category: "Kurtkalar",
    colors: ["#1A1A1A", "#6B5A4E", "#1B2D4F"],
    stock: 18,
    status: "active",
  },
  {
    id: "3",
    name: "Slim-Fit Chino Shimlari",
    price: 1190000,
    image: "https://images.unsplash.com/photo-1760433468572-44d1cf0b8641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    rating: 4.6,
    reviewCount: 93,
    isNew: false,
    isSale: false,
    category: "Shimlar",
    colors: ["#C9A96E", "#1A1A1A", "#8B8B8B"],
    stock: 32,
    status: "active",
  },
  {
    id: "4",
    name: "Merino Yuqori Yoqali Trikotaj",
    price: 1650000,
    image: "https://images.unsplash.com/photo-1686704814231-ef0474eea7f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    rating: 4.7,
    reviewCount: 61,
    isNew: true,
    isSale: false,
    category: "Trikotaj",
    colors: ["#C9A96E", "#FFFFFF", "#1A1A1A", "#8B7355"],
    stock: 27,
    status: "active",
  },
  {
    id: "5",
    name: "Ko'k Oxford Rasmiy Ko'ylagi",
    price: 950000,
    image: "https://images.unsplash.com/photo-1732605559386-bc59426d1b16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    rating: 4.5,
    reviewCount: 108,
    isNew: false,
    isSale: false,
    category: "Ko'ylaklar",
    colors: ["#1B2D4F", "#FFFFFF", "#6B7B8D"],
    stock: 53,
    status: "active",
  },
  {
    id: "6",
    name: "Ikki Qatorli Palto",
    price: 3850000,
    image: "https://images.unsplash.com/photo-1627906933655-906bde7d79e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    rating: 5.0,
    reviewCount: 42,
    isNew: true,
    isSale: false,
    category: "Kurtkalar",
    colors: ["#1A1A1A", "#6B5A4E"],
    stock: 12,
    status: "active",
  },
  {
    id: "7",
    name: "Burmalangan Rasmiy Shimlar",
    price: 1350000,
    image: "https://images.unsplash.com/photo-1493357335960-4583bfa6f8d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    rating: 4.4,
    reviewCount: 55,
    isNew: false,
    isSale: false,
    category: "Shimlar",
    colors: ["#8B8B8B", "#1A1A1A", "#1B2D4F"],
    stock: 21,
    status: "active",
  },
  {
    id: "8",
    name: "Premium Charm Kamar",
    price: 580000,
    image: "https://images.unsplash.com/photo-1631160246898-58192f971b5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    rating: 4.6,
    reviewCount: 79,
    isNew: false,
    isSale: false,
    category: "Aksessuarlar",
    colors: ["#1A1A1A", "#8B5A2B"],
    stock: 64,
    status: "active",
  },
];

// ---- Load products: localStorage first, fallback to defaults ----
function loadProducts() {
  const raw = localStorage.getItem('nh_products');
  if (raw) {
    try {
      const stored = JSON.parse(raw);
      if (Array.isArray(stored) && stored.length > 0) return stored;
    } catch (e) {}
  }
  // seed localStorage with defaults on first visit
  localStorage.setItem('nh_products', JSON.stringify(DEFAULT_PRODUCTS));
  return DEFAULT_PRODUCTS;
}

// Active products visible to shoppers (admin may mark some inactive)
const products = loadProducts().filter(p => p.status !== 'inactive');

// ---- Cart helpers (shared across all pages) ----
function getCart() { return JSON.parse(localStorage.getItem('nh_cart') || '[]'); }
function saveCart(c) { localStorage.setItem('nh_cart', JSON.stringify(c)); }

function addToCart(productId) {
  const cart = getCart();
  const p = products.find(x => x.id === productId);
  if (!p) return;
  const existing = cart.find(i => i.productId === productId && !i.size && !i.color);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ productId, color: p.colors ? p.colors[0] : '', size: '', qty: 1 });
  }
  saveCart(cart);
  updateAllCartCounts();
}

function updateAllCartCounts() {
  const total = getCart().reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = total || 0;
  });
}

// ---- Helpers ----
function formatPrice(price) {
  return new Intl.NumberFormat("uz-UZ").format(price) + " UZS";
}

function renderStars(rating) {
  let html = '';
  for (let i = 0; i < 5; i++) {
    const filled = i < Math.floor(rating);
    html += `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="${filled ? '#C9A96E' : '#e5e7eb'}" stroke="${filled ? '#C9A96E' : '#d1d5db'}" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  }
  return html;
}

function renderProductCard(p) {
  const badge = p.isNew
    ? `<span class="bg-[#1A1A1A] text-white px-2.5 py-1 text-[9px] tracking-widest uppercase font-semibold">Yangi</span>`
    : p.isSale
    ? `<span class="bg-[#C9A96E] text-white px-2.5 py-1 text-[9px] tracking-widest uppercase font-semibold">Chegirma</span>`
    : '';

  const colors = (p.colors || []).map(c =>
    `<div class="w-3 h-3 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform" style="background-color:${c}"></div>`
  ).join('');

  const originalPrice = p.originalPrice
    ? `<span class="text-gray-400 line-through text-xs">${formatPrice(p.originalPrice)}</span>`
    : '';

  return `
    <div class="product-card group relative flex flex-col">
      <div class="relative overflow-hidden bg-[#F5F5F3] aspect-[3/4]">
        <a href="product.html?id=${p.id}">
          <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </a>
        <div class="absolute top-3 left-3 flex flex-col gap-2">${badge}</div>
        <button class="wishlist-btn absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm transition-all duration-200" onclick="toggleWishlist(this,'${p.id}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <button class="quick-add absolute bottom-0 left-0 right-0 bg-[#1A1A1A] py-3 flex items-center justify-center gap-2 w-full border-0" onclick="quickAdd(this,'${p.id}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span class="text-white text-[10px] tracking-widest uppercase font-semibold">Tez Qo'shish</span>
        </button>
      </div>
      <div class="pt-4 pb-1 flex-1 flex flex-col">
        <div class="flex items-center gap-1.5 mb-2.5">${colors}</div>
        <a href="product.html?id=${p.id}">
          <p class="text-[#6B6B6B] text-[10px] tracking-widest uppercase mb-1 font-medium">${p.category}</p>
          <h3 class="text-[#1A1A1A] hover:text-[#C9A96E] transition-colors leading-snug mb-2 text-sm font-medium">${p.name}</h3>
        </a>
        <div class="flex items-center gap-1.5 mb-2.5">
          <div class="flex">${renderStars(p.rating)}</div>
          <span class="text-gray-400 text-[10px]">(${p.reviewCount})</span>
        </div>
        <div class="flex items-center gap-2 mt-auto">
          <span class="text-[#1A1A1A] text-sm font-semibold">${formatPrice(p.price)}</span>
          ${originalPrice}
        </div>
      </div>
    </div>
  `;
}

function quickAdd(btn, productId) {
  addToCart(productId);
  const span = btn.querySelector('span');
  const origText = span.textContent;
  span.textContent = 'Qo\'shildi!';
  btn.style.background = '#C9A96E';
  setTimeout(() => {
    span.textContent = origText;
    btn.style.background = '#1A1A1A';
  }, 1500);
}

function toggleWishlist(btn, productId) {
  const svg = btn.querySelector('svg');
  const isWishlisted = svg.getAttribute('fill') !== 'none';
  svg.setAttribute('fill', isWishlisted ? 'none' : '#C9A96E');
  svg.setAttribute('stroke', isWishlisted ? '#1A1A1A' : '#C9A96E');
}

// Run on DOM ready to set initial cart count
document.addEventListener('DOMContentLoaded', () => updateAllCartCounts());
