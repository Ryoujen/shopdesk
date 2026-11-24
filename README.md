# ShopDesk - Product Catalog & Inventory Dashboard

## 🌐 Live Demo
- **Frontend (Vercel):** https://shopdesk-navy-three.vercel.app
- **Backend API (Render):** https://shopdesk-api-know.onrender.com

*(Note: The backend uses Render's free tier, so the first request might take 30-50 seconds to wake up).*
A frontend React application built to manage a shop's product inventory. Built for the React Frontend Intern Project.

## 📸 Screenshots
*(Add a screenshot of your Dashboard and Products page here! Just drag and drop images into the GitHub editor when you push)*

## 🛠 Tech Stack
- **Framework:** React (Vite)
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **Mock Backend:** json-server (v0.17.4)
- **State Management:** Context API (Auth & Toasts), useState, useMemo, useCallback
- **Custom Hooks:** `useFetch`, `useDebounce`

## 🚀 Getting Started

You need **two** terminals open to run this project.

**1. Start the Mock Database (Terminal 1):**
```bash
npx json-server@0.17.4 --watch db.json --port 3001