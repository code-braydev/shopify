# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Catalogo Externo Para Scraping

La tienda carga productos desde `public/data/products.json` al iniciar.

Esto permite que luego puedas generar o actualizar ese archivo desde un script de web scraping en Python.

Formato esperado por item:

```json
{
  "id": 1,
  "name": "Laptop BZ Pro 14",
  "price": 4599000,
  "category": "Laptops",
  "brand": "BZTech",
  "image": "https://...",
  "rating": 4.8,
  "ratingCount": 132,
  "stock": 7
}
```

Notas:

- `id` debe ser unico.
- `price` debe ser numerico (sin simbolos).
- Si el archivo tiene formato invalido, la app usa un catalogo fallback.
