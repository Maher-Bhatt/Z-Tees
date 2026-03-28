# Z Tees — Upgraded v2

## Setup

```bash
npm install
npm run dev       # dev server at localhost:5173
npm run build     # production build
```

---

## Project Structure

```
src/
├── assets/              ← product images (JPEG)
├── context/
│   └── CartContext.tsx  ← global cart state (React Context)
├── data/
│   └── products.ts      ← ALL product data lives here
├── components/
│   ├── AppNavbar.tsx    ← shared navbar with cart badge
│   ├── AppFooter.tsx    ← shared footer
│   └── FloatingButtons.tsx  ← sticky WhatsApp + IG bubbles
└── pages/
    ├── Index.tsx        ← shop / home page
    ├── ProductPage.tsx  ← /product/:slug
    ├── CartPage.tsx     ← /cart
    └── NotFound.tsx     ← 404
```

---

## Routes

| Path               | Page           |
|--------------------|----------------|
| `/`                | Shop           |
| `/product/:slug`   | Product Detail |
| `/cart`            | Cart           |

---

## Adding / Editing Products

All products are in `src/data/products.ts`. Each product object:

```ts
{
  id: 'prod_1',
  name: 'Shinchan Vibes',
  slug: 'shinchan-vibes',       // used in URL: /product/shinchan-vibes
  price: 419,
  originalPrice: 699,
  category: 'Graphic',
  color: 'Navy Blue',
  sizes: { S: true, M: true, L: false },   // false = Sold Out
  images: [imgShinchan],
  backImage: imgShinchanBack,   // OPTIONAL — enables front→back flip on hover
  tag: 'Popular',
  stockNote: 'Limited Stock',
  description: '...',
  fabric: '100% Premium Cotton',
  fit: 'Regular Fit',
}
```

### Enabling the front→back flip effect

1. Add the back-view JPEG to `src/assets/` e.g. `shinchan-vibes-back.jpeg`
2. Import it at the top of `products.ts`:
   ```ts
   import imgShinchanBack from '@/assets/shinchan-vibes-back.jpeg';
   ```
3. Add `backImage: imgShinchanBack` to the product object.

Without `backImage`, cards use a subtle zoom on hover. With it, they 3D-flip to reveal the back view.

### Updating size availability

```ts
sizes: { S: true, M: false, L: true }
// M will show "Sold Out" on the card and on the product page.
```

---

## Vercel Deployment

Add a `vercel.json` at the project root to fix client-side routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

Made by Maher Bhatt — maherbhatt.me
