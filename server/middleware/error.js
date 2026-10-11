/** 404 handler for unmatched routes. */
export function notFound(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

/** Centralised error handler. */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error('✖', err.message);

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid id format' });
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: 'Duplicate value', fields: Object.keys(err.keyPattern || {}) });
  }

  const status = err.status || 500;
  res.status(status).json({
    error: status === 500 ? 'Internal server error' : err.message,
  });
}
