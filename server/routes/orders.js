import { Router } from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { validate } from '../middleware/validate.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { orderSchema, statusSchema } from '../utils/schemas.js';

const router = Router();

// POST /api/orders — public. Customer places an order from the cart.
// Prices and the total are recomputed from the DB so the client can't tamper with them.
router.post('/', validate(orderSchema), async (req, res, next) => {
  try {
    const { items, customer, paymentMethod } = req.body;

    const priced = [];
    for (const item of items) {
      let { name, price, qty, productId } = item;
      if (productId) {
        const product = await Product.findById(productId);
        if (!product) return res.status(400).json({ error: `Product not found: ${name}` });
        if (!product.inStock) return res.status(409).json({ error: `Out of stock: ${product.name}` });
        name = product.name;
        price = product.price; // trust the server, not the client
      }
      priced.push({ productId: productId || undefined, name, price, qty });
    }

    const total = priced.reduce((sum, i) => sum + i.price * i.qty, 0);
    const order = await Order.create({ items: priced, total, customer, paymentMethod });
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

// ── Admin-only below ──
router.use(requireAuth, requireRole('admin'));

// GET /api/orders — list, newest first. Optional ?status= filter.
router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const orders = await Order.find(filter).sort({ createdAt: -1 }).limit(200);
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/:id
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/orders/:id/status — advance the order through the kitchen pipeline.
router.patch('/:id/status', validate(statusSchema), async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

export default router;
