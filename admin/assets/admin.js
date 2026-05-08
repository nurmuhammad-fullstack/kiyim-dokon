// ============================================================
//  NOVUS HOMME — Admin Core
//  Shared state, storage helpers, and UI utilities
// ============================================================

// ---- Storage keys ----
const KEYS = {
  products:   'nh_products',
  orders:     'nh_orders',
  categories: 'nh_categories',
  promos:     'nh_promos',
  settings:   'nh_settings',
  cart:       'nh_cart',
};

// ---- Default categories ----
const DEFAULT_CATEGORIES = [
  { id: 'c1', name: "Ko'ylaklar",    slug: 'shirts',      count: 0 },
  { id: 'c2', name: 'Kurtkalar',     slug: 'jackets',     count: 0 },
  { id: 'c3', name: 'Shimlar',       slug: 'trousers',    count: 0 },
  { id: 'c4', name: 'Aksessuarlar',  slug: 'accessories', count: 0 },
  { id: 'c5', name: 'Trikotaj',      slug: 'knitwear',    count: 0 },
];

// ---- Default products (synced from store) ----
const DEFAULT_PRODUCTS = [
  { id:'1', name:"Tikuvchi Oxford Ko'ylagi",     price:890000,  originalPrice:null,    image:'https://images.unsplash.com/photo-1760128761565-c0d779481070?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600', rating:4.8, reviewCount:124, isNew:true,  isSale:false, category:"Ko'ylaklar",   colors:['#FFFFFF','#1B2D4F','#6B7B8D','#1A1A1A'], stock:45, status:'active' },
  { id:'2', name:'Klassik Jun Blazer',            price:2450000, originalPrice:2900000, image:'https://images.unsplash.com/photo-1754485115876-9221149ccc19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600', rating:4.9, reviewCount:87,  isNew:false, isSale:true,  category:'Kurtkalar',    colors:['#1A1A1A','#6B5A4E','#1B2D4F'],            stock:18, status:'active' },
  { id:'3', name:'Slim-Fit Chino Shimlari',       price:1190000, originalPrice:null,    image:'https://images.unsplash.com/photo-1760433468572-44d1cf0b8641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600', rating:4.6, reviewCount:93,  isNew:false, isSale:false, category:'Shimlar',      colors:['#C9A96E','#1A1A1A','#8B8B8B'],            stock:32, status:'active' },
  { id:'4', name:'Merino Yuqori Yoqali Trikotaj', price:1650000, originalPrice:null,    image:'https://images.unsplash.com/photo-1686704814231-ef0474eea7f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600', rating:4.7, reviewCount:61,  isNew:true,  isSale:false, category:'Trikotaj',     colors:['#C9A96E','#FFFFFF','#1A1A1A','#8B7355'],  stock:27, status:'active' },
  { id:'5', name:"Ko'k Oxford Rasmiy Ko'ylagi",   price:950000,  originalPrice:null,    image:'https://images.unsplash.com/photo-1732605559386-bc59426d1b16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600', rating:4.5, reviewCount:108, isNew:false, isSale:false, category:"Ko'ylaklar",   colors:['#1B2D4F','#FFFFFF','#6B7B8D'],            stock:53, status:'active' },
  { id:'6', name:'Ikki Qatorli Palto',            price:3850000, originalPrice:null,    image:'https://images.unsplash.com/photo-1627906933655-906bde7d79e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600', rating:5.0, reviewCount:42,  isNew:true,  isSale:false, category:'Kurtkalar',    colors:['#1A1A1A','#6B5A4E'],                      stock:12, status:'active' },
  { id:'7', name:'Burmalangan Rasmiy Shimlar',    price:1350000, originalPrice:null,    image:'https://images.unsplash.com/photo-1493357335960-4583bfa6f8d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600', rating:4.4, reviewCount:55,  isNew:false, isSale:false, category:'Shimlar',      colors:['#8B8B8B','#1A1A1A','#1B2D4F'],            stock:21, status:'active' },
  { id:'8', name:'Premium Charm Kamar',           price:580000,  originalPrice:null,    image:'https://images.unsplash.com/photo-1631160246898-58192f971b5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600', rating:4.6, reviewCount:79,  isNew:false, isSale:false, category:'Aksessuarlar', colors:['#1A1A1A','#8B5A2B'],                      stock:64, status:'active' },
];

const DEFAULT_ORDERS = [
  { id:'ORD-001', customer:'Timur Bozorboyev',  email:'timur@example.com', phone:'+998901234567', items:[{productId:'2',qty:1,color:'#1A1A1A',size:'L'},{productId:'3',qty:2,color:'#C9A96E',size:'M'}], total:4790000, status:'delivered',  date:'2026-05-01', address:'Toshkent, Chilonzor, 12-uy' },
  { id:'ORD-002', customer:'Sardor Raximov',    email:'sardor@example.com', phone:'+998901112233', items:[{productId:'1',qty:1,color:'#FFFFFF',size:'M'}],                                              total:890000,  status:'processing', date:'2026-05-06', address:'Samarqand, Registon ko\'chasi, 5-uy' },
  { id:'ORD-003', customer:'Dilnoza Yusupova',  email:'dilnoza@example.com',phone:'+998907654321', items:[{productId:'6',qty:1,color:'#1A1A1A',size:'XL'},{productId:'8',qty:1,color:'#1A1A1A',size:''}], total:4430000, status:'pending',    date:'2026-05-07', address:'Toshkent, Yunusobod, 34-uy' },
  { id:'ORD-004', customer:'Jasur Mirzayev',    email:'jasur@example.com',  phone:'+998905556677', items:[{productId:'4',qty:2,color:'#C9A96E',size:'L'}],                                             total:3300000, status:'shipped',    date:'2026-05-05', address:'Buxoro, Navoi ko\'chasi, 8-uy' },
  { id:'ORD-005', customer:'Malika Toshmatova', email:'malika@example.com', phone:'+998909988776', items:[{productId:'5',qty:1,color:'#1B2D4F',size:'S'},{productId:'7',qty:1,color:'#8B8B8B',size:'S'}],total:2300000, status:'cancelled',  date:'2026-05-03', address:'Namangan, Mustaqillik ko\'chasi, 2-uy' },
];

const DEFAULT_PROMOS = [
  { id:'p1', code:'NOVUS10', type:'percent', discount:10,    minOrder:0,       usedCount:34, maxUses:0,   active:true,  expires:null,         createdAt:'2026-01-01T00:00:00.000Z' },
  { id:'p2', code:'YANGI20', type:'percent', discount:20,    minOrder:500000,  usedCount:12, maxUses:50,  active:true,  expires:'2026-06-01', createdAt:'2026-02-01T00:00:00.000Z' },
  { id:'p3', code:'BEPUL',   type:'fixed',   discount:50000, minOrder:300000,  usedCount:8,  maxUses:100, active:false, expires:'2026-05-31', createdAt:'2026-03-01T00:00:00.000Z' },
];

const DEFAULT_SETTINGS = {
  storeName: 'Novus Homme',
  storeTagline: 'HOMME',
  email: 'hello@novushomme.uz',
  phone: '+998 90 123 45 67',
  address: 'Toshkent, O\'zbekiston',
  currency: 'UZS',
  lang: 'uz',
  freeShippingThreshold: 500000,
  shippingCost: 50000,
  instagramUrl: '',
  telegramUrl: '',
  adminPassword: 'admin123',
};

// ---- Storage helpers ----
function getData(key, defaults) {
  const raw = localStorage.getItem(key);
  if (!raw) {
    localStorage.setItem(key, JSON.stringify(defaults));
    return JSON.parse(JSON.stringify(defaults));
  }
  return JSON.parse(raw);
}
function setData(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

function getProducts()   { return getData(KEYS.products,   DEFAULT_PRODUCTS);   }
function getOrders()     { return getData(KEYS.orders,     DEFAULT_ORDERS);     }
function getCategories() { return getData(KEYS.categories, DEFAULT_CATEGORIES); }
function getPromos()     { return getData(KEYS.promos,     DEFAULT_PROMOS);     }
function getSettings()   { return getData(KEYS.settings,   DEFAULT_SETTINGS);   }

function saveProducts(d)   { setData(KEYS.products,   d); syncStoreProducts(d); }
function saveOrders(d)     { setData(KEYS.orders,     d); }
function saveCategories(d) { setData(KEYS.categories, d); }
function savePromos(d)     { setData(KEYS.promos,     d); }
function saveSettings(d)   { setData(KEYS.settings,   d); }

// Sync products to the store's key so the main site picks them up
function syncStoreProducts(products) {
  // main site reads from KEYS.products directly — already in sync
  // If needed, update category counts
  const cats = getCategories();
  cats.forEach(c => { c.count = products.filter(p => p.category.toLowerCase() === c.name.toLowerCase() && p.status === 'active').length; });
  setData(KEYS.categories, cats);
}

// ---- Format helpers ----
function fmt(n) { return new Intl.NumberFormat('uz-UZ').format(n) + ' UZS'; }
function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('uz-UZ', { day:'2-digit', month:'2-digit', year:'numeric' });
}
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

// ---- Status config ----
const ORDER_STATUSES = {
  pending:    { label: 'Kutilmoqda',   color: 'bg-yellow-100 text-yellow-800' },
  processing: { label: 'Jarayonda',    color: 'bg-blue-100 text-blue-800'   },
  shipped:    { label: 'Yuborildi',    color: 'bg-purple-100 text-purple-800'},
  delivered:  { label: 'Yetkazildi',  color: 'bg-green-100 text-green-800'  },
  cancelled:  { label: 'Bekor qilindi', color: 'bg-red-100 text-red-800'   },
};

const COLOR_NAMES = {
  '#FFFFFF':'Oq','#1A1A1A':'Qora','#1B2D4F':"To'q ko'k",
  '#8B8B8B':'Kulrang','#C9A96E':'Tuya rangi','#6B7B8D':"Po'lat ko'k",
  '#6B5A4E':'Jigarrang','#8B7355':'Xaki','#8B5A2B':'Ochiq jigarrang',
};

function statusBadge(s) {
  const st = ORDER_STATUSES[s] || { label: s, color: 'bg-gray-100 text-gray-700' };
  return `<span class="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide ${st.color}">${st.label}</span>`;
}

function stockBadge(n) {
  if (n === 0)  return `<span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-red-100 text-red-700">Tugadi</span>`;
  if (n <= 10)  return `<span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-orange-100 text-orange-700">Kam: ${n}</span>`;
  return `<span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-green-100 text-green-700">${n} ta</span>`;
}

// ---- Auth ----
function isLoggedIn() { return sessionStorage.getItem('nh_admin_auth') === '1'; }
function requireAuth() {
  if (!isLoggedIn()) { window.location.href = 'login.html'; }
}
function logout() { sessionStorage.removeItem('nh_admin_auth'); window.location.href = 'login.html'; }

// ---- Toast ----
function toast(msg, type='success') {
  const existing = document.getElementById('nh-toast');
  if (existing) existing.remove();
  const colors = { success:'bg-green-600', error:'bg-red-600', info:'bg-[#1A1A1A]' };
  const el = document.createElement('div');
  el.id = 'nh-toast';
  el.className = `fixed bottom-6 right-6 z-[9999] ${colors[type]||colors.info} text-white px-5 py-3 rounded shadow-lg text-sm font-medium flex items-center gap-3 transition-all`;
  el.innerHTML = `<span>${msg}</span>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// ---- Confirm modal ----
function confirmModal(msg, onConfirm) {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 z-[9998] bg-black/40 flex items-center justify-center p-4';
  overlay.innerHTML = `
    <div class="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
      <p class="text-[#1A1A1A] text-sm font-medium mb-6">${msg}</p>
      <div class="flex gap-3 justify-end">
        <button id="cm-cancel" class="px-5 py-2 border border-gray-200 text-[#6B6B6B] rounded text-xs font-semibold hover:bg-gray-50">Bekor</button>
        <button id="cm-ok" class="px-5 py-2 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700">O'chirish</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  document.getElementById('cm-cancel').onclick = () => overlay.remove();
  document.getElementById('cm-ok').onclick = () => { overlay.remove(); onConfirm(); };
}

// ---- Sidebar active link ----
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('[data-nav]');
  const page = location.pathname.split('/').pop();
  links.forEach(l => {
    if (l.getAttribute('href') === page || (page === '' && l.getAttribute('href') === 'index.html')) {
      l.classList.add('bg-[#C9A96E]/10','text-[#C9A96E]','border-r-2','border-[#C9A96E]');
      l.classList.remove('text-[#6B6B6B]','hover:bg-gray-50','hover:text-[#1A1A1A]');
    }
  });
  // update order count badge
  const orders = getOrders();
  const pending = orders.filter(o => o.status === 'pending').length;
  const badge = document.getElementById('order-badge');
  if (badge && pending > 0) { badge.textContent = pending; badge.classList.remove('hidden'); }
});
