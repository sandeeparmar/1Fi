const express = require('express');
const cors = require('cors');
const products = require('./data/products.json');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/products', (request, response) => {
  const search = (request.query.search || '').toLowerCase();
  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(search) || product.category.toLowerCase().includes(search);
  });
  response.json(filteredProducts);
});

app.get('/api/products/:id', (request, response) => {
  const product = products.find((item) => item.id === request.params.id);
  if (!product) {
    return response.status(404).json({ message: 'Product not found' });
  }
  response.json(product);
});

app.listen(port, () => {
  console.log(`1Fi API running at http://localhost:${port}`);
});
