import { describe, it, expect } from 'vitest';
import express from 'express';
import { getNitiDistrictProfile, getNitiIndicesSummary } from '../../services/nitiDemographicsService';

function createNitiApp() {
  const app = express();
  const v1 = express.Router();
  v1.use((_req, res, next) => {
    res.setHeader('X-API-Version', '1.0.0');
    next();
  });
  v1.get('/niti/indices/summary', (_req, res) => {
    res.json({ success: true, ...getNitiIndicesSummary() });
  });
  v1.get('/niti/district', (req, res) => {
    const state = String(req.query.state || '');
    const district = String(req.query.district || '');
    if (!state || !district) {
      return res.status(400).json({ success: false, error: 'state and district query params are required' });
    }
    res.json({ success: true, ...getNitiDistrictProfile(state, district) });
  });
  app.use('/api/v1', v1);
  return app;
}

describe('Integration: GET /api/v1/niti/*', () => {
  it('returns summary and district profile with API version header', async () => {
    const app = createNitiApp();
    const server = app.listen(0);
    const port = (server.address() as { port: number }).port;
    try {
      const summary = await fetch(`http://127.0.0.1:${port}/api/v1/niti/indices/summary`);
      expect(summary.headers.get('X-API-Version')).toBe('1.0.0');
      const summaryJson = await summary.json();
      expect(summaryJson.aspirationalProgramTotal).toBe(112);

      const district = await fetch(
        `http://127.0.0.1:${port}/api/v1/niti/district?state=Chhattisgarh&district=Bastar`
      );
      const districtJson = await district.json();
      expect(districtJson.index.mpiScore).toBeCloseTo(0.43, 2);
    } finally {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });
});
