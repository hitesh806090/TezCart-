# TezCart Installation Guide

Complete setup guide for the TezCart E-Commerce System

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v5.0 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

## 🚀 Quick Start

### 1. Install Node.js

Download and install from https://nodejs.org/

Verify installation:
```bash
node --version
npm --version
```

### 2. Install MongoDB

**Windows:**
- Download MongoDB Community Server from https://www.mongodb.com/try/download/community
- Run the installer and follow the setup wizard
- MongoDB will start automatically as a Windows service

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install mongodb
sudo systemctl start mongod
sudo systemctl enable mongod
```

Verify MongoDB is running:
```bash
mongosh
# or
mongo
```

### 3. Clone/Navigate to Project

```bash
cd C:\Users\RDP\Desktop\TezCart
```

## ⚙️ Backend Setup

### 1. Navigate to backend folder:
```bash
cd backend
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Configure environment variables:

Create a `.env` file in the `backend/` folder:
```bash
copy .env.example .env
```

Edit `.env` and configure:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tezcart
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development

CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
```

**Important:** Change `JWT_SECRET` to a secure random string in production.

### 4. Start the backend server:
```bash
npm run dev
```

Backend will run on **http://localhost:5000**

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

### 5. Create first admin user (optional):

While backend is running, use a tool like **Postman** or **curl** to register an owner account:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Admin User\",\"email\":\"admin@tezcart.com\",\"password\":\"Admin@123\"}"
```

Then manually update the user's role in MongoDB to `owner`:
```bash
mongosh tezcart
db.users.updateOne({email: "admin@tezcart.com"}, {$set: {role: "owner"}})
```

## 🛍️ Client Setup (Storefront)

### 1. Open a NEW terminal and navigate to client:
```bash
cd C:\Users\RDP\Desktop\TezCart\client
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Configure environment:

Create `.env.local` file:
```bash
copy .env.local.example .env.local
```

Content:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Start the client:
```bash
npm run dev
```

Client will run on **http://localhost:3000**

## 🛠️ Admin Panel Setup

### 1. Open ANOTHER NEW terminal and navigate to admin:
```bash
cd C:\Users\RDP\Desktop\TezCart\admin
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Configure environment:

Create `.env.local` file:
```bash
copy .env.local.example .env.local
```

Content:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Start the admin panel:
```bash
npm run dev -- -p 3001
```

Admin panel will run on **http://localhost:3001**

## ✅ Verification

You should now have THREE terminals running:

1. **Backend** - http://localhost:5000
2. **Client** - http://localhost:3000
3. **Admin** - http://localhost:3001

### Test the workflow:

1. **Login to Admin Panel** (http://localhost:3001)
   - Use your admin credentials

2. **Add a Category:**
   - Go to Categories section
   - Add "Electronics", slug: "electronics"

3. **Add a Product:**
   - Go to Products section
   - Name: "Laptop", Price: 999, Category: Electronics, Stock: 10
   - Click Save

4. **View on Storefront** (http://localhost:3000)
   - The product should now appear on the homepage
   - Click on it to view details
   - Add to cart and proceed to checkout

## 📁 Project Structure

```
TezCart/
├── backend/           # Express.js API (Port 5000)
│   ├── src/
│   │   ├── models/    # Mongoose models
│   │   ├── controllers/ # Route controllers
│   │   ├── routes/    # API routes
│   │   ├── middleware/ # Auth & role middleware
│   │   ├── utils/     # JWT utilities
│   │   └── server.ts  # Main server file
│   └── package.json
│
├── client/            # Next.js Storefront (Port 3000)
│   ├── app/          # Next.js 14 App Router
│   ├── components/   # React components
│   ├── lib/          # Utilities & stores
│   └── package.json
│
└── admin/             # Next.js Admin Panel (Port 3001)
    ├── app/          # Admin pages
    ├── components/   # Admin components
    └── package.json
```

## 🔧 Troubleshooting

### MongoDB Connection Error

**Error:** `MongoServerError: connect ECONNREFUSED`

**Solution:**
- Ensure MongoDB is running:
  - Windows: Check Services for "MongoDB Server"
  - macOS: `brew services list`
  - Linux: `sudo systemctl status mongod`

### Port Already in Use

**Error:** `EADDRINUSE: address already in use`

**Solution:**
Kill the process using the port or change ports:
```bash
# Backend
PORT=5001 npm run dev

# Client
npm run dev -- -p 3002

# Admin
npm run dev -- -p 3003
```

### CORS Errors

Ensure backend `.env` has correct URLs:
```env
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
```

### Module Not Found Errors

Delete `node_modules` and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Next Steps

After setup:

1. **Create sample data:**
   - Add categories (Electronics, Accessories, Clothing, etc.)
   - Add products with images and descriptions
   - Create discount coupons

2. **Test user flows:**
   - Register as a customer on the storefront
   - Browse products and add to cart
   - Complete a checkout
   - View order history

3. **Test admin features:**
   - Update product stock
   - Change order statuses
   - Create percentage and fixed discount coupons
   - Ban/unban users

## 📚 API Endpoints

### Auth
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login
- POST `/api/auth/logout` - Logout
- GET `/api/auth/me` - Get current user
- PUT `/api/auth/email` - Update email
- PUT `/api/auth/password` - Update password
- PUT `/api/auth/theme` - Update theme preference

### Products
- GET `/api/products` - List all products
- GET `/api/products/:slug` - Get product by slug
- POST `/api/products` - Create product (admin)
- PUT `/api/products/:id` - Update product (admin)
- DELETE `/api/products/:id` - Delete product (admin)

### Categories
- GET `/api/categories` - List all categories
- POST `/api/categories` - Create category (admin)
- PUT `/api/categories/:id` - Update category (admin)
- DELETE `/api/categories/:id` - Delete category (admin)

### Orders
- POST `/api/orders` - Create order
- GET `/api/orders/my-orders` - Get user's orders
- GET `/api/orders` - Get all orders (admin/staff)
- GET `/api/orders/:id` - Get order by ID
- PUT `/api/orders/:id/status` - Update order status (admin/staff)

### Coupons
- GET `/api/coupons` - List coupons (admin)
- GET `/api/coupons/validate/:code` - Validate coupon
- POST `/api/coupons` - Create coupon (admin)
- PUT `/api/coupons/:id` - Update coupon (admin)
- DELETE `/api/coupons/:id` - Delete coupon (admin)

### Users (Admin)
- GET `/api/users` - List all users
- PUT `/api/users/:id/ban` - Toggle ban user
- GET `/api/users/stats` - Get user statistics

## 🔐 User Roles

- **owner** - Full access to everything
- **admin** - Manage products, orders, users, coupons
- **staff** - Manage orders only
- **user** - Regular customer (default)

## 📝 Notes

- All API requests that modify data require authentication
- Passwords are hashed using bcrypt
- JWT tokens are stored in HTTP-only cookies
- Theme preference (light/dark) is stored in user profile
- Cart state is managed with Zustand and persisted to localStorage
- All prices are stored in cents/smallest currency unit

## 🎨 Theme System

Users can toggle between light and dark themes:
- Setting is saved in the database
- Applies across all sessions
- Accessible from profile page in both client and admin

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT authentication with HTTP-only cookies
- Role-based access control (RBAC)
- CORS configured for specific origins
- Input validation on all endpoints
- Banned users cannot access the system

## 💡 Tips

- Use realistic product data with descriptions and images
- Set reasonable stock quantities
- Create various coupon types for testing
- Test both percentage and fixed discount coupons
- Try placing orders with and without coupons
- Test the ban/unban user functionality

---

**TezCart E-Commerce System - Ready to Run Locally! 🚀**

For issues, check the troubleshooting section above.
