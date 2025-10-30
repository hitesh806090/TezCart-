const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function handleResponse(response: Response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
}

export const api = {
  // Auth
  register: async (data: { name: string; email: string; password: string }) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  login: async (data: { email: string; password: string }) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  logout: async () => {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return handleResponse(res);
  },

  getMe: async () => {
    const res = await fetch(`${API_URL}/auth/me`, {
      credentials: 'include',
    });
    return handleResponse(res);
  },

  updateEmail: async (email: string) => {
    const res = await fetch(`${API_URL}/auth/email`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email }),
    });
    return handleResponse(res);
  },

  updatePassword: async (data: { currentPassword: string; newPassword: string }) => {
    const res = await fetch(`${API_URL}/auth/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  updateTheme: async (theme: string) => {
    const res = await fetch(`${API_URL}/auth/theme`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ theme }),
    });
    return handleResponse(res);
  },

  // Products
  getProducts: async (params?: { category?: string; search?: string; featured?: boolean }) => {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.featured !== undefined) query.append('featured', String(params.featured));

    const res = await fetch(`${API_URL}/products?${query.toString()}`);
    return handleResponse(res);
  },

  getProductBySlug: async (slug: string) => {
    const res = await fetch(`${API_URL}/products/${slug}`);
    return handleResponse(res);
  },

  // Categories
  getCategories: async () => {
    const res = await fetch(`${API_URL}/categories`);
    return handleResponse(res);
  },

  // Orders
  createOrder: async (data: any) => {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  getMyOrders: async () => {
    const res = await fetch(`${API_URL}/orders/my-orders`, {
      credentials: 'include',
    });
    return handleResponse(res);
  },

  getOrderById: async (id: string) => {
    const res = await fetch(`${API_URL}/orders/${id}`, {
      credentials: 'include',
    });
    return handleResponse(res);
  },

  // Coupons
  validateCoupon: async (code: string) => {
    const res = await fetch(`${API_URL}/coupons/validate/${code}`);
    return handleResponse(res);
  },
};
