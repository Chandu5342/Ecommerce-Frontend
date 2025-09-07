# 🛍️ E-Commerce Frontend (MERN Assignment)

This is the **frontend** for the e-commerce web application built with **React (Vite) and Bootstrap**.

---

## 🚀 Features
- Signup & Login pages (JWT-based auth)
- Products listing page with filters (category, price)
- Cart page (add, remove, update quantity, persists after logout/login)
- Admin dashboard for managing products (CRUD)
- Role-based navigation (admin/user)

---

## 📂 Folder Structure
frontend/
│── src/
│   ├── api/          # API helper files
│   │   ├── authApi.js
│   │   ├── productApi.js
│   │   └── cartApi.js
│   ├── components/   # Shared UI (Navbar, ProductCard)
│   ├── pages/        # Pages (Login, Signup, Products, Cart, AdminProducts)
│   ├── App.jsx       # App routes
│   └── main.jsx      # Entry point

---

## 🛠️ Tech Stack
- **React (Vite)**
- **React Router**
- **Bootstrap 5**
- **Axios** (API calls)

---
Live Link: https://ecommerce-frontend-black-theta.vercel.app/
## ⚡ Run Locally
```bash
git clone <frontend-repo-url>
cd frontend
npm install
npm run dev
