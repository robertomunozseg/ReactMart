# ReactMart

ReactMart is a small, modern e-commerce demo built with **Next.js** and **TypeScript**. It showcases a product catalog and category sidebar, client-side search and filtering for products and categories, and server-backed data fetching via `ProductsService`. The app is intended as a concise, practical example of building a performant, well-structured storefront UI.

## Technologies

- **TypeScript** — typed React code for safety and DX
- **Next.js** (App Router) — familiar server-side and client-side rendering
- **React** — UI library
- **Tailwind CSS** — utility-first styling (used everywhere in the UI)
- **Redux Toolkit** — state management for products and selection
- **axios-hooks** — lightweight hooks for data fetching
- **Vercel-friendly build** — simple deploy experience

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
