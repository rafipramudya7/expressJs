const express = require('express');
const productRoutes = require('./routes/product');

const app = express();
app.use(express.json());

app.get('/hello', (req, res) => res.json({ message: 'Hello, Express!' }));
app.use('/products', productRoutes);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Terjadi kesalahan di server' });
});

app.listen(3000, () => console.log('Server jalan http://localhost:3000'));
