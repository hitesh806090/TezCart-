# 🚀 TezCart Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- MongoDB installed and running (or MongoDB Atlas account)
- npm or yarn

## 1️⃣ Install Dependencies (5 minutes)

```bash
# Backend
cd backend
npm install

# Client
cd ../client
npm install
npm install tailwindcss-animate

# Admin
cd ../admin
npm install
npm install tailwindcss-animate
```

## 2️⃣ Configure Environment (2 minutes)

### Backend (.env)
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tezcart
JWT_SECRET=your-super-secret-jwt-key-change-this
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
```

### Client (.env.local)
```bash
cd ../client
cp .env.local.example .env.local
```

Content is already correct:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Admin (.env.local)
```bash
cd ../admin
cp .env.local.example .env.local
```

Content is already correct:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 3️⃣ Start Services (Open 3 terminals)

### Terminal 1: Backend
```bash
cd backend
npm run dev
```
✅ Backend running on http://localhost:5000

### Terminal 2: Client
```bash
cd client
npm run dev
```
✅ Client running on http://localhost:3000

### Terminal 3: Admin
```bash
cd admin
npm run dev
```
✅ Admin running on http://localhost:3001

## 4️⃣ Create First Admin User

### Option A: Via API (Recommended)
```bash
# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@tezcart.com",
    "password": "admin123"
  }'
```

Then update the user role in MongoDB:
```javascript
// In MongoDB shell or Compass
use tezcart
db.users.updateOne(
  { email: "admin@tezcart.com" },
  { $set: { role: "owner" } }
)
```

### Option B: Via Client UI
1. Go to http://localhost:3000/register
2. Create an account
3. Manually update role in MongoDB to "owner"

## 5️⃣ Test the System

### Client Storefront (http://localhost:3000)
- ✅ Browse homepage
- ✅ View products
- ✅ Add to cart
- ✅ Checkout process
- ✅ User profile

### Admin Panel (http://localhost:3001)
- ✅ Login with admin credentials
- ✅ View dashboard
- ✅ Manage products
- ✅ Manage categories
- ✅ View orders
- ✅ Manage users
- ✅ Create coupons

## 📋 Quick Test Workflow

1. **Login to Admin** (http://localhost:3001)
   - Email: admin@tezcart.com
   - Password: admin123

2. **Create a Category**
   - Categories → Add Category
   - Name: "Electronics"

3. **Create a Product**
   - Products → Add Product
   - Fill in details, select category

4. **Create a Coupon**
   - Coupons → Add Coupon
   - Code: SAVE20
   - Type: Percentage, Value: 20

5. **Test Client Storefront** (http://localhost:3000)
   - Browse products
   - Add to cart
   - Apply coupon at checkout
   - Complete order

6. **View Order in Admin**
   - Orders → See the new order
   - Update order status

## 🔧 Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
# Windows:
net start MongoDB

# Mac:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
```

### "Port already in use"
```bash
# Kill process on port (Windows PowerShell)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port (Mac/Linux)
lsof -ti:5000 | xargs kill -9
```

### "Module not found" errors
```bash
# Re-install dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📚 API Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login
- POST `/api/auth/logout` - Logout
- GET `/api/auth/me` - Get current user

### Products
- GET `/api/products` - List all products
- GET `/api/products/:slug` - Get product by slug
- POST `/api/products` - Create product (admin)
- PUT `/api/products/:id` - Update product (admin)
- DELETE `/api/products/:id` - Delete product (admin)

### Categories
- GET `/api/categories` - List all categories
- POST `/api/categories` - Create category (admin)
- DELETE `/api/categories/:id` - Delete category (admin)

### Orders
- POST `/api/orders` - Create order
- GET `/api/orders` - List orders (admin/own)
- PUT `/api/orders/:id/status` - Update status (admin)

### Coupons
- POST `/api/coupons/validate` - Validate coupon
- GET `/api/coupons` - List coupons (admin)
- POST `/api/coupons` - Create coupon (admin)

### Users
- GET `/api/users` - List users (admin)
- PUT `/api/users/:id/ban` - Ban/unban user (admin)

## 🎯 Default Roles

- **owner**: Full access to everything
- **admin**: Can manage products, orders, users
- **staff**: Can manage orders
- **user**: Regular customer

## 📝 Notes

- All passwords are hashed with bcrypt
- JWT tokens stored in HTTP-only cookies
- Cart persists in localStorage
- Theme preference stored in database
- All API requests require authentication except public routes

## ✨ You're Ready!

Your TezCart e-commerce system is now fully operational! 🎉
