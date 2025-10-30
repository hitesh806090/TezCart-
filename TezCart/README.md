# TezCart E-Commerce System

A complete full-stack e-commerce platform with separate client storefront and admin panel.

## 🏗️ Architecture

**Monorepo structure with 3 independent apps:**

```
TezCart/
├── backend/     → Express.js REST API (Port 5000)
├── client/      → Next.js Customer Storefront (Port 3000)
└── admin/       → Next.js Admin Panel (Port 3001)
```

## ✅ What's Been Generated

### ✅ Backend (Complete)
- **Framework:** Express.js + TypeScript + MongoDB (Mongoose)
- **Features:**
  - JWT Authentication with HTTP-only cookies
  - Role-based access control (owner, admin, staff, user)
  - Complete REST API for all e-commerce operations
  
**Models:**
- User (with themes, roles, banned status)
- Product (with categories, stock, featured flag)
- Category
- Order (with order items, shipping address)
- Coupon (percentage & fixed discounts)

**API Routes:**
- `/api/auth` - Authentication (register, login, logout, profile updates)
- `/api/products` - Product CRUD
- `/api/categories` - Category CRUD
- `/api/orders` - Order management
- `/api/coupons` - Coupon management
- `/api/users` - User management (admin)

### ⚠️ Client & Admin (Configuration Only)
Due to file size constraints, the client and admin apps have configuration files only.

**What exists:**
- `package.json` with all required dependencies
- `tsconfig.json` TypeScript configuration
- `tailwind.config.ts` with Shadcn UI theming
- `next.config.js` Next.js configuration
- `.env.local.example` environment template
- `globals.css` with theme variables

**What's needed:**
- App pages and components
- API integration utilities
- Cart store (Zustand)
- Shadcn UI components

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

Backend runs on **http://localhost:5000**

### 2. Client Setup (To Complete)

```bash
cd client
npm install
# Add missing package to package.json:
npm install tailwindcss-animate
cp .env.local.example .env.local
```

**Required files to create:**
- `app/layout.tsx` - Root layout
- `app/page.tsx` - Homepage
- `lib/api.ts` - API client utilities
- `lib/cart-store.ts` - Zustand cart store
- `lib/utils.ts` - Utility functions (cn helper)
- `components/ui/button.tsx` - Shadcn button component
- Additional pages: login, register, products, cart, checkout, profile, orders

### 3. Admin Setup (To Complete)

```bash
cd admin
npm install
# Add missing package to package.json:
npm install tailwindcss-animate
cp .env.local.example .env.local
```

**Required files to create:**
- `app/layout.tsx` - Admin layout with dark theme
- `app/page.tsx` - Dashboard
- `lib/api.ts` - API client
- Admin pages: products, categories, orders, users, coupons, settings
- Admin components for tables, forms, charts

## 📝 Implementation Guide

### Client Pages to Create

1. **Homepage** (`app/page.tsx`)
   - Featured products grid
   - Category cards
   - Hero section

2. **Products** (`app/products/page.tsx`)
   - Product listing with filters
   - Search functionality
   - Category filtering

3. **Product Detail** (`app/products/[slug]/page.tsx`)
   - Product images
   - Add to cart button
   - Stock display

4. **Cart** (`app/cart/page.tsx`)
   - Cart items list
   - Quantity controls
   - Coupon input
   - Checkout button

5. **Checkout** (`app/checkout/page.tsx`)
   - Shipping form
   - Order summary
   - Place order button

6. **Orders** (`app/orders/page.tsx`)
   - Order history list
   - Order status badges

7. **Profile** (`app/profile/page.tsx`)
   - Update email/password
   - Theme toggle
   - Profile information

8. **Auth Pages**
   - `app/login/page.tsx`
   - `app/register/page.tsx`

### Admin Pages to Create

1. **Dashboard** (`app/page.tsx`)
   - Revenue stats
   - Order count
   - Product count
   - User count

2. **Products** (`app/products/page.tsx`)
   - Product table
   - Add/Edit/Delete products
   - Image upload

3. **Categories** (`app/categories/page.tsx`)
   - Category management
   - Add/Edit/Delete

4. **Orders** (`app/orders/page.tsx`)
   - Order table
   - Status updates
   - Order details

5. **Users** (`app/users/page.tsx`)
   - User table
   - Ban/Unban functionality
   - Role management

6. **Coupons** (`app/coupons/page.tsx`)
   - Coupon table
   - Create coupons
   - Set expiration dates

### Key Utilities to Create

**`lib/api.ts`** (Both client & admin):
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  get: async (endpoint: string) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      credentials: 'include',
    });
    return res.json();
  },
  post: async (endpoint: string, data: any) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return res.json();
  },
  // Add put, delete methods similarly
};
```

**`lib/cart-store.ts`** (Client only):
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        // Implementation
      },
      removeItem: (id) => {
        // Implementation
      },
      updateQuantity: (id, quantity) => {
        // Implementation
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        // Calculate total
      },
    }),
    { name: 'cart-storage' }
  )
);
```

**`lib/utils.ts`** (Both):
```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## 🎨 UI Guidelines

### Client Storefront
- Clean, modern, friendly design
- Light theme by default
- Product cards with hover effects
- Smooth transitions
- Mobile-responsive grid layouts

### Admin Panel
- Dark, futuristic theme
- Data tables with search and filters
- Form modals for CRUD operations
- Charts for dashboard analytics
- Sidebar navigation

## 🔐 Authentication Flow

1. User registers via `/api/auth/register`
2. JWT token stored in HTTP-only cookie
3. Client/Admin reads user from `/api/auth/me`
4. Protected routes check authentication
5. Admin routes check user role

## 📦 Dependencies Reference

### Backend
- express, mongoose, bcryptjs, jsonwebtoken
- cors, cookie-parser, dotenv
- TypeScript, nodemon, ts-node

### Client/Admin
- next, react, react-dom
- @radix-ui components (for Shadcn UI)
- zustand (state management)
- lucide-react (icons)
- tailwindcss, class-variance-authority, clsx, tailwind-merge

## 🐛 Expected Lint Errors

All "Cannot find module" errors are normal before running `npm install` in each folder.

## 📚 Additional Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Shadcn UI](https://ui.shadcn.com/)
- [Zustand](https://docs.pmnd.rs/zustand)
- [Mongoose](https://mongoosejs.com/)

## 🎯 Next Steps

1. **Complete Client App:**
   - Create all page files listed above
   - Implement API integration
   - Build cart functionality
   - Add authentication UI

2. **Complete Admin App:**
   - Create dashboard with stats
   - Build CRUD interfaces
   - Implement data tables
   - Add role-based UI controls

3. **Test Workflow:**
   - Add products in admin
   - View products on client storefront
   - Complete a purchase flow
   - Manage orders in admin

## ✅ Current Status

**Ready to use:**
- ✅ Complete backend API
- ✅ All database models
- ✅ Authentication system
- ✅ RBAC middleware
- ✅ Configuration for client & admin

**To complete:**
- ⏳ Client UI pages and components
- ⏳ Admin UI pages and components
- ⏳ Cart state management
- ⏳ API integration utilities

---

**See INSTALLATION.md for detailed setup instructions.**
