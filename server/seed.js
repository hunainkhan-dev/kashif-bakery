import 'dotenv/config';
import { pathToFileURL } from 'url';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import Product from './models/Product.js';
import User from './models/User.js';

// The original menu — mirrors the launch catalogue, prices in PKR.
export const PRODUCTS = [
  { name: 'Chocolate Fudge Cake', category: 'cakes', price: 1800, desc: 'Rich, gooey, 1lb', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80&auto=format&fit=crop' },
  { name: 'Red Velvet Cake', category: 'cakes', price: 2000, desc: 'Classic, cream cheese', image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=400&q=80&auto=format&fit=crop' },
  { name: 'Vanilla Birthday Cake', category: 'cakes', price: 1600, desc: 'Sprinkles galore', image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&q=80&auto=format&fit=crop' },
  { name: 'Choco Cupcakes (6)', category: 'cupcakes', price: 600, desc: 'Box of 6, soft', image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&q=80&auto=format&fit=crop' },
  { name: 'Vanilla Cupcakes (6)', category: 'cupcakes', price: 550, desc: 'Buttercream swirl', image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=400&q=80&auto=format&fit=crop' },
  { name: 'Choco Chip Cookies', category: 'cookies', price: 450, desc: 'Pack of 12, chewy', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80&auto=format&fit=crop' },
  { name: 'Brownie Box', category: 'cookies', price: 700, desc: 'Fudgy, 9 pcs', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80&auto=format&fit=crop' },
  { name: 'Fresh Milk Bread', category: 'breads', price: 250, desc: 'Soft, daily baked', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80&auto=format&fit=crop' },
];

/**
 * Seed products + the admin user. Assumes an active Mongoose connection.
 * Reusable from the CLI and from tests / in-memory dev.
 */
export async function seedData() {
  // Products: reset to the seed catalogue.
  await Product.deleteMany({});
  await Product.insertMany(PRODUCTS);
  console.log(`✔ Seeded ${PRODUCTS.length} products`);

  // Admin: create once from env, idempotent.
  const email = (process.env.ADMIN_EMAIL || 'admin@kashifbakery.com').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'Admin@12345';
  let admin = await User.findOne({ email });
  if (admin) {
    console.log(`• Admin already exists: ${email}`);
  } else {
    admin = new User({ email, role: 'admin' });
    await admin.setPassword(password);
    await admin.save();
    console.log(`✔ Created admin: ${email}  (password from ADMIN_PASSWORD)`);
  }
}

// Run as a CLI (`npm run seed`): connect, seed, disconnect.
// Guard argv[1] — it is undefined when this module is imported (e.g. by the
// serverless entry) rather than executed directly, and pathToFileURL would throw.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  connectDB()
    .then(seedData)
    .then(() => mongoose.disconnect())
    .then(() => {
      console.log('✔ Seed complete');
      process.exit(0);
    })
    .catch((err) => {
      console.error('✖ Seed failed:', err);
      process.exit(1);
    });
}
