import mongoose from 'mongoose';
import { env } from './env.js';

/**
 * Connect to MongoDB (Atlas or any instance via MONGO_URI).
 *
 * Serverless-safe: on Vercel the same Node process is reused across many
 * requests, so we cache the connection (and the in-flight promise) on the
 * global object. Without this, every invocation would open a new pool and
 * quickly exhaust the Atlas free-tier connection limit.
 *
 * Never calls process.exit here — in a serverless function that would kill
 * the whole runtime. On failure it throws (and clears the cached promise so
 * the next request can retry); the local dev entry (server.js) decides how
 * to react.
 */
let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.set('strictQuery', true);
    cached.promise = mongoose
      .connect(env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
        autoIndex: env.NODE_ENV !== 'production', // build indexes in dev; manage explicitly in prod
        maxPoolSize: 5, // keep the pool small — free Atlas tiers cap connections
      })
      .then((m) => {
        console.log(`✔ MongoDB connected: ${m.connection.host}/${m.connection.name}`);
        m.connection.on('disconnected', () => console.warn('⚠ MongoDB disconnected'));
        return m;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null; // let the next request try again
    console.error('✖ MongoDB connection error:', err.message);
    throw err;
  }

  return cached.conn;
}
