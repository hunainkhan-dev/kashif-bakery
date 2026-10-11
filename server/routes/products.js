import { Router } from 'express';
import Product, { CATEGORIES } from '../models/Product.js';
import { validate } from '../middleware/validate.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { productSchema, productUpdateSchema } from '../utils/schemas.js';

const router = Router();

// GET /api/products — public menu. Optional ?category= filter.
router.get('/', async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category && CATEGORIES.includes(category)) filter.category = category;
    const products = await Product.find(filter).sort({ category: 1, createdAt: 1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id — single product.
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// ── Admin-only below ──
router.use(requireAuth, requireRole('admin'));

// POST /api/products — create.
router.post('/', validate(productSchema), async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id — update.
router.put('/:id', validate(productUpdateSchema), async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id — remove.
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ ok: true, id: req.params.id });
  } catch (err) {
    next(err);
  }
});

export default router;
