// ---- Markaziy API ulanish moduli ----
const IS_DEV = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
const API = IS_DEV ? 'http://localhost:3001/api' : 'https://novus-homme-api.fly.dev/api';

function getToken() { return sessionStorage.getItem('nh_token'); }

async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(API + path, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Server xatosi');
  return data;
}

// ---- Auth ----
async function apiLogin(email, password) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  sessionStorage.setItem('nh_token', data.token);
  return data;
}

function apiLogout() {
  sessionStorage.removeItem('nh_token');
  sessionStorage.removeItem('nh_admin_auth');
}

function apiIsLoggedIn() { return !!getToken(); }

// ---- Products ----
const apiProducts = {
  getAll:    ()       => apiFetch('/products'),
  getAdmin:  ()       => apiFetch('/products/all'),
  getById:   (id)     => apiFetch(`/products/${id}`),
  create:    (data)   => apiFetch('/products', { method: 'POST', body: JSON.stringify(data) }),
  update:    (id, d)  => apiFetch(`/products/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
  remove:    (id)     => apiFetch(`/products/${id}`, { method: 'DELETE' }),
};

// ---- Categories ----
const apiCategories = {
  getAll:  ()       => apiFetch('/categories'),
  create:  (data)   => apiFetch('/categories', { method: 'POST', body: JSON.stringify(data) }),
  update:  (id, d)  => apiFetch(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
  remove:  (id)     => apiFetch(`/categories/${id}`, { method: 'DELETE' }),
};

// ---- Orders ----
const apiOrders = {
  getAll:       (status)   => apiFetch('/orders' + (status ? `?status=${status}` : '')),
  getById:      (id)       => apiFetch(`/orders/${id}`),
  create:       (data)     => apiFetch('/orders', { method: 'POST', body: JSON.stringify(data) }),
  setStatus:    (id, status) => apiFetch(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
};

// ---- Promos ----
const apiPromos = {
  getAll:  ()             => apiFetch('/promos'),
  check:   (code, total)  => apiFetch('/promos/check', { method: 'POST', body: JSON.stringify({ code, orderTotal: total }) }),
  create:  (data)         => apiFetch('/promos', { method: 'POST', body: JSON.stringify(data) }),
  update:  (id, d)        => apiFetch(`/promos/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
  remove:  (id)           => apiFetch(`/promos/${id}`, { method: 'DELETE' }),
};
