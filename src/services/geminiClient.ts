import { GoogleGenAI } from '@google/genai';

const DEFAULT_MODEL = 'gemini-3.8-flash';
const DEFAULT_TIMEOUT_MS = 25_000;

/**
 * Sanitizes model names to ensure compliance with @google/genai valid model identifiers.
 * Maps deprecated or prohibited legacy aliases (e.g. gemini-2.5-flash, gemini-1.5-flash)
 * to gemini-3.8-flash.
 */
export function sanitizeModelName(modelName?: string): string {
  if (!modelName) return DEFAULT_MODEL;
  const name = modelName.trim();
  if (
    name.includes('gemini-1.5') ||
    name.includes('gemini-2.0') ||
    name.includes('gemini-2.5') ||
    name === 'gemini-pro' ||
    name === 'gemini-flash'
  ) {
    return 'gemini-3.8-flash';
  }
  return name;
}

export function geminiConfig() {
  const rawModel = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  return {
    apiKey: (process.env.GEMINI_API_KEY || '').trim(),
    model: sanitizeModelName(rawModel),
    enabled: process.env.GEMINI_ENABLED !== 'false',
  };
}

export function isGeminiReady(): boolean {
  const { apiKey, enabled } = geminiConfig();
  return enabled && Boolean(apiKey);
}

export function geminiModelId(): string {
  return geminiConfig().model;
}

let cachedClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  if (!isGeminiReady()) return null;
  if (!cachedClient) {
    try {
      cachedClient = new GoogleGenAI({
        apiKey: geminiConfig().apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    } catch (err) {
      console.warn('Failed to initialize GoogleGenAI:', err);
      return null;
    }
  }
  return cachedClient;
}

/** Test hook: reset singleton client between tests. */
export function resetGeminiClientForTests(): void {
  cachedClient = null;
}

function withTimeout<T>(promise: Promise<T>, ms = DEFAULT_TIMEOUT_MS): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Gemini request timed out')), ms);
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

export async function generateGeminiText(prompt: string): Promise<string | null> {
  const client = getGeminiClient();
  if (!client) return null;
  const model = geminiModelId();
  try {
    const response = await withTimeout(
      client.models.generateContent({
        model,
        contents: prompt,
      })
    );
    const text = response.text?.trim();
    return text || null;
  } catch (err: any) {
    console.error(`Gemini generateGeminiText error (model: ${model}):`, err?.message || err);
    return null;
  }
}

export async function generateGeminiJson<T>(prompt: string): Promise<T | null> {
  const client = getGeminiClient();
  if (!client) return null;
  const model = geminiModelId();
  try {
    const response = await withTimeout(
      client.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      })
    );
    const raw = response.text?.trim();
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (err: any) {
    console.error(`Gemini generateGeminiJson error (model: ${model}):`, err?.message || err);
    return null;
  }
}

/**
 * Diagnostic helper to test Gemini connectivity and return error details if failing.
 */
export async function testGeminiConnection(): Promise<{
  ready: boolean;
  configured: boolean;
  model: string;
  error?: string;
  latencyMs?: number;
}> {
  const cfg = geminiConfig();
  if (!cfg.apiKey) {
    return {
      ready: false,
      configured: false,
      model: cfg.model,
      error: 'GEMINI_API_KEY environment variable is not configured',
    };
  }
  if (!cfg.enabled) {
    return {
      ready: false,
      configured: true,
      model: cfg.model,
      error: 'GEMINI_ENABLED is set to false',
    };
  }

  const client = getGeminiClient();
  if (!client) {
    return {
      ready: false,
      configured: true,
      model: cfg.model,
      error: 'Failed to initialize GoogleGenAI client',
    };
  }

  const startTime = Date.now();
  try {
    const response = await withTimeout(
      client.models.generateContent({
        model: cfg.model,
        contents: 'Respond with the word "OK"',
      }),
      10_000
    );
    const text = response.text?.trim();
    return {
      ready: true,
      configured: true,
      model: cfg.model,
      latencyMs: Date.now() - startTime,
    };
  } catch (err: any) {
    return {
      ready: false,
      configured: true,
      model: cfg.model,
      error: err?.message || String(err),
    };
  }
}
