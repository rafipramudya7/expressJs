const prisma = require('../prisma/client');

exports.getAll = async (req, res) => {
  const products = await prisma.product.findMany();
  res.status(200).json(products);
};

exports.getById = async (req, res) => {
  const id = Number(req.params.id);
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return res.status(404).json({ message: 'Produk nggak ada' });
  res.status(200).json(product);
};

exports.create = async (req, res) => {
  const { name, price } = req.body;
  if (!name || typeof price !== 'number') {
    return res.status(400).json({ message: 'name dan price wajib di isi' });
  }
  const product = await prisma.product.create({ data: { name, price } });
  res.status(201).json(product);
};

exports.update = async (req, res) => {
  // id bisa dari URL (/products/:id) atau dari body
  const id = Number(req.params.id ?? req.body.id);
  const { name, price } = req.body;
  if (!id || !name || typeof price !== 'number') {
    return res.status(400).json({ message: 'id, name, dan price wajib di isi' });
  }
  try {
    const product = await prisma.product.update({
      where: { id },
      data: { name, price },
    });
    res.status(200).json(product);
  } catch (e) {
    if (e.code === 'P2025') return res.status(404).json({ message: 'Produk nggak ada' });
    throw e;
  }
};

exports.remove = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const product = await prisma.product.delete({ where: { id } });
    res.status(200).json({ message: 'Produk berhasil dihapus', product });
  } catch (e) {
    if (e.code === 'P2025') return res.status(404).json({ message: 'Produk nggak ada' });
    throw e;
  }
};
