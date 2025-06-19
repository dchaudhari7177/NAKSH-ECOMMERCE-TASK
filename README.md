# Naksh-Jewels-assignment

## Tech Stack
- **Frontend & Backend:** Next.js (React, TypeScript, Tailwind CSS, API Routes)

## How to Run the Project

1. **Install dependencies:**
   ```
   cd frontend
   npm install
   ```
2. **Start the app:**
   ```
   npm run dev
   ```
   - The app runs on [http://localhost:3000](http://localhost:3000) (or another port if 3000 is in use).

## API Endpoints (via Next.js API Routes)
- `GET /api/products` - List all products (JSON)
- `POST /api/products` - Add a new product (JSON: name, price, imageUrl)
- `DELETE /api/products?id=ID` - Delete a product by ID (only user-added products)

## Features
- Modern, mobile-first, and dark-mode enabled UI
- `/products` page: clean product listing (image, name, price)
- `/products/[id]` page: single product details (image, name, price, category, description)
- Home page: advanced e-commerce experience (search, filter, add/edit/delete, cart, toasts, modals, etc.)
- Fully responsive and interactive (Flipkart/Amazon-style navbar, animated cards, etc.)
- Product data fetched from a public API and in-memory for user-added products

## Notes & Assumptions
- Product data is in-memory for user-added products (resets on server restart)
- All backend logic is handled via Next.js API routes (no separate Express server)
- Reviewer can test all assignment requirements at `/products` and `/products/[id]`
- Bonus features and advanced UI/UX are on the homepage (`/`)

---

**Assignment by Dipak Chaudhari** 