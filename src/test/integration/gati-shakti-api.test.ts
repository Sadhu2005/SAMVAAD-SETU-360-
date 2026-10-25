import { describe, it, expect } from 'vitest';
import express from 'express';
import {
  getGatiShaktiCatalogSummary,
  queryGatiShaktiCatalog,
} from '../../services/gatiShaktiService';

function createGatiApp() {
  const app = express();
  app.use(express.json());
  const v1 = express.Router();
  v1.use((_req, res, next) => {
    res.setHeader('X-API-Version', '1.0.0');
    next();
  });
  v1.get('/gati-shakti/catalog/summary', (_req, res) => {
    res.json({ success: true, ...getGatiShaktiCatalogSummary() });
  });
  v1.get('/gati-shakti/catalog', (req, res) => {
    const result = queryGatiShaktiCatalog({
      q: req.query.q ? String(req.query.q) : undefined,
      limit: 5,
    });
    res.json({ success: true, ...result });
  });
  app.use('/api/v1', v1);
  return app;
}

describe('Integration: GET /api/v1/gati-shakti/catalog', () => {
  it('returns NMMP summary with 1,400+ layers and version header', async () => {
    const app = createGatiApp();
    const server = app.listen(0);
    const port = (server.address() as { port: number }).port;
    try {
      const res = await fetch(`http://127.0.0.1:${port}/api/v1/gati-shakti/catalog/summary`);
      expect(res.headers.get('X-API-Version')).toBe('1.0.0');
      const data = await res.json();
      expect(data.totalLayers).toBeGreaterThanOrEqual(1400);
      expect(data.layerGroups).toBeGreaterThan(10);
    } finally {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });
});
