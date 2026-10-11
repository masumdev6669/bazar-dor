# 🛒 বাজার দর (BazarDor)

প্রয়োজনীয় পণ্যের দাম এক নজরে — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের বাজার দর।

চলতি বাজারদর, দামের পরিবর্তন, বাজারভিত্তিক বিশ্লেষণ — সব এক জায়গায়, বাংলায়।

---

## 🔧 Technologies Used

| Technology                              | Purpose                               |
| --------------------------------------- | ------------------------------------- |
| **Next.js 16** (App Router + Turbopack) | Framework, routing, server components |
| **TypeScript**                          | Type safety                           |
| **Tailwind CSS v4**                     | Styling, responsiveness               |
| **BetterAuth**                          | Email + Google + GitHub OAuth         |
| **better-sqlite3**                      | Session / user storage                |
| **react-hot-toast**                     | Toast notifications                   |
| **Font Awesome**                        | Brand icons (Google, GitHub)          |
| **Noto Sans Bengali**                   | Bangla typography                     |
| **Vercel**                              | Deployment                            |

---

## ✨ Key Features

1. **🔝 Navbar with live price ticker** — Bangla date + infinite scrolling marquee showing today's prices and change %
2. **🎯 8 product categories** — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা with active highlighting
3. **📊 Three home sections** — top 6 risers (▲ আজ দাম বেড়েছে), top 6 fallers (▼ আজ দাম কমেছে), and all products
4. **🔎 Product detail page** — market-by-market min/max/average prices with a full comparison table across 12 markets
5. **🔐 Full authentication** — email/password + Google + GitHub OAuth, profile page, and update-name (Challenge C3)
6. **🛡️ Protected routes** — middleware guards `/profile` and `/product/[slug]`; unauthenticated visitors are redirected to sign in
7. **🌐 Bangla everywhere** — every price, count, and date rendered in Bangla numerals (৪৮ টাকা, ২.১%)
8. **📱 Fully responsive** — mobile, tablet, and desktop, with skeleton loaders on every fetch

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/masumdev6669/bazar-dor.git
cd bazar-dor

# Install dependencies
npm install

# Run dev server
npm run dev
```
