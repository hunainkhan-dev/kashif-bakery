import { connectDB } from '../config/db.js';
import Product from '../models/Product.js';
import { seedData } from '../seed.js';
import app from '../app.js';

// Vercel serverless entry point. Vercel calls this handler for every request
// (routed here by vercel.json) and reuses the process between invocations.
//
// We ensure the DB is connected before handing the request to Express, and
// seed an empty database once per cold start so a fresh Atlas cluster comes
// up fully populated without any shell access.
let seedChecked = false;

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch {
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Database unavailable — try again shortly.' }));
  }

  if (!seedChecked && process.env.SEED_ON_START !== 'false') {
    seedChecked = true;
    try {
      const count = await Product.countDocuments();
      if (count === 0) {
        console.log('• Empty database detected — seeding products + admin…');
        await seedData();
      }
    } catch (err) {
      console.error('✖ Seed check failed:', err.message);
    }
  }

  return app(req, res);
}
