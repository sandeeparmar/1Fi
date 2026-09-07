## Features

- Shop navigation with `Top Brands`, `Nearby Stores`, and `1Fi Marketplace` tabs.
- The first two tabs intentionally show blank placeholder states.
- Marketplace product cards with images, title, category, and price.
- Loading skeletons and an API error state.
- Product details modal with variant selection.
- Dynamic product pricing when a variant changes.
- Interactive 3, 6, and 12 month EMI plan selection.
- Responsive layout for desktop, tablet, and mobile screens.

## Project Structure

```text
assignment/
|-- client/                 React + Vite frontend
|   |-- src/App.jsx         Main UI and simple React state
|   `-- src/index.css       Responsive styles
|-- server/
|   |-- data/products.json  Centralized mock product data
|   |-- models/Product.js   MongoDB/Mongoose product model
|   `-- server.js           Express API
|-- package.json
`-- README.md
```

## Run Locally

Install the server dependencies from the project root:

```bash
npm install
```

Start the API in one terminal:

```bash
npm run server
```

Install the client dependencies and start the React app in another terminal:

```bash
cd client
npm install
npm run dev
```

Open the URL shown by Vite, usually `http://localhost:5173`.

## API Endpoints

- `GET /api/products` returns all products.
- `GET /api/products?search=phone` filters products by title or category.
- `GET /api/products/:id` returns one product with variants and EMI plans.

## MongoDB Note

The application runs immediately using `server/data/products.json`, so no database setup is needed for the assignment demo. `server/models/Product.js` defines the Mongoose schema needed to move the same data to MongoDB later. A production version could add a MongoDB connection and replace the JSON reads with `Product.find()`.

## Build Check

```bash
npm run build
```
