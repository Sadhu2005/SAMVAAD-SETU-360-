import { GoogleGenAI } from '@google/genai';

const DEFAULT_MODEL = 'gemini-2.5-flash';
const DEFAULT_TIMEOUT_MS = 25_000;

export function geminiConfig() {
  return {
    apiKey: (process.env.GEMINI_API_KEY || '').trim(),
    model: (process.env.GEMINI_MODEL || DEFAULT_MODEL).trim() || DEFAULT_MODEL,
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
      cachedClient = new GoogleGenAI({ apiKey: geminiConfig().apiKey });
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
  } catch (err) {
    console.error('Gemini generateGeminiText error:', err);
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
  } catch (err) {
    console.error('Gemini generateGeminiJson error:', err);
    return null;
  }
}
