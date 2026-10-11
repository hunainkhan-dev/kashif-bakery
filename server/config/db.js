import mongoose from 'mongoose';
import { env } from './env.js';

/**
 * Connect to MongoDB (Atlas or any instance via MONGO_URI).
 * Fails fast with a clear message so misconfigured deploys are obvious.
 */
export async function connectDB() {
  mongoose.set('strictQuery', true);

  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      autoIndex: env.NODE_ENV !== 'production', // build indexes in dev; manage explicitly in prod
    });
    console.log(`✔ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    console.error('✖ MongoDB connection error:', err.message);
    process.exit(1);
  }

  mongoose.connection.on('disconnected', () => console.warn('⚠ MongoDB disconnected'));
}
