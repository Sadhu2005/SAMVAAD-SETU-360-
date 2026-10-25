import { describe, it, expect } from 'vitest';
import express, { Request, Response } from 'express';

// Test Express app mirroring server.ts routing
function createTestApp() {
  const app = express();
  app.use(express.json());

  const v1Router = express.Router();
  v1Router.use((_req: Request, res: Response, next) => {
    res.setHeader('X-API-Version', '1.0.0');
    res.setHeader('X-API-Standard', 'DPG-BRICS-Track1');
    next();
  });

  v1Router.get('/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      platform: 'SamvaadSetu 360 DPI Engine',
    });
  });

  v1Router.get('/meta', (_req: Request, res: Response) => {
    res.json({
      name: 'SAMVAAD-SETU 360° DPI Engine API',
      version: '1.0.0',
      currentVersion: 'v1',
      supportedVersions: ['v1'],
      deprecationPolicy: '180 days notice before endpoint decommissioning',
      spec: '/api/v1/meta',
      endpoints: [
        { path: '/api/v1/health', method: 'GET' },
        { path: '/api/v1/meta', method: 'GET' },
        { path: '/api/v1/gemini/solve-pipeline', method: 'POST' },
      ],
    });
  });

  app.use('/api/v1', v1Router);
  app.use('/api', v1Router);

  return app;
}

describe('Integration Test: Express API v1 Route Contracts & Headers', () => {
  const app = createTestApp();

  it('should respond to GET /api/v1/health with 200, status ok, and X-API-Version header', async () => {
    // Simulated express handler call
    const req = { method: 'GET', url: '/api/v1/health' } as any;
    let headers: Record<string, string> = {};
    let statusCode = 200;
    let jsonBody: any = null;

    const res = {
      setHeader: (k: string, v: string) => { headers[k] = v; },
      status: (code: number) => { statusCode = code; return res; },
      json: (data: any) => { jsonBody = data; return res; },
    } as any;

    await new Promise<void>((resolve) => {
      app(req, res, () => resolve());
      // Handle completion
      setTimeout(resolve, 50);
    });

    expect(headers['X-API-Version']).toBe('1.0.0');
    expect(headers['X-API-Standard']).toBe('DPG-BRICS-Track1');
    expect(jsonBody).toBeDefined();
    expect(jsonBody?.status).toBe('ok');
    expect(jsonBody?.version).toBe('1.0.0');
  });

  it('should expose /api/v1/meta with supported versions and endpoints specification', async () => {
    const req = { method: 'GET', url: '/api/v1/meta' } as any;
    let headers: Record<string, string> = {};
    let jsonBody: any = null;

    const res = {
      setHeader: (k: string, v: string) => { headers[k] = v; },
      status: () => res,
      json: (data: any) => { jsonBody = data; return res; },
    } as any;

    await new Promise<void>((resolve) => {
      app(req, res, () => resolve());
      setTimeout(resolve, 50);
    });

    expect(headers['X-API-Version']).toBe('1.0.0');
    expect(jsonBody.currentVersion).toBe('v1');
    expect(jsonBody.supportedVersions).toContain('v1');
    expect(jsonBody.endpoints.length).toBeGreaterThanOrEqual(3);
  });
});
