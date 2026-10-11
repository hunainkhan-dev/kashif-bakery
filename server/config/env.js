import { z } from 'zod';

/**
 * Validate and normalise environment variables at boot.
 * Fails fast with a clear message so a misconfigured or insecure deploy
 * never starts (e.g. a weak JWT secret in production).
 */
const schema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().positive().default(5000),
    MONGO_URI: z.string().min(1, 'MONGO_URI is required'),
    JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
    JWT_EXPIRES_IN: z.string().default('7d'),
    CLIENT_URL: z.string().default('http://localhost:5173'),
    ADMIN_EMAIL: z.string().email().optional(),
    ADMIN_PASSWORD: z.string().min(8).optional(),
  })
  .superRefine((env, ctx) => {
    // In production, refuse to boot with an obviously placeholder secret.
    if (env.NODE_ENV === 'production' && /change[-_ ]?me|secret|password|123456/i.test(env.JWT_SECRET)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['JWT_SECRET'], message: 'JWT_SECRET looks like a placeholder — set a strong random value' });
    }
  });

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error('✖ Invalid environment configuration:');
  for (const issue of parsed.error.issues) {
    console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
  }
  console.error('  Copy .env.example → .env and fill in the values.');
  process.exit(1);
}

export const env = parsed.data;
