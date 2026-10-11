import { ZodError } from 'zod';

/**
 * Validate req.body against a Zod schema. On success replaces req.body
 * with the parsed (and coerced) data; on failure returns 400 with details.
 */
export function validate(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: err.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
        });
      }
      next(err);
    }
  };
}
