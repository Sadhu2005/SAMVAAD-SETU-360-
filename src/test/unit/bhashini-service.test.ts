import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  clearBhashiniConfigCache,
  extractAsrTranscript,
  isBhashiniConfigured,
} from '../../services/bhashiniService';

describe('Unit: Bhashini service helpers', () => {
  const env = { ...process.env };

  beforeEach(() => {
    clearBhashiniConfigCache();
    delete process.env.BHASHINI_USER_ID;
    delete process.env.BHASHINI_ULCA_API_KEY;
    delete process.env.BHASHINI_PIPELINE_ID;
  });

  afterEach(() => {
    process.env = { ...env };
    clearBhashiniConfigCache();
  });

  it('reports not configured when env is missing', () => {
    expect(isBhashiniConfigured()).toBe(false);
  });

  it('reports configured when all three env vars are set', () => {
    process.env.BHASHINI_USER_ID = 'user-1';
    process.env.BHASHINI_ULCA_API_KEY = 'key-1';
    process.env.BHASHINI_PIPELINE_ID = 'pipe-1';
    expect(isBhashiniConfigured()).toBe(true);
  });

  it('extracts ASR text from pipeline compute JSON', () => {
    const text = extractAsrTranscript({
      pipelineResponse: [
        {
          taskType: 'asr',
          output: [{ source: 'नाली में पानी भरा है' }],
        },
      ],
    });
    expect(text).toContain('नाली');
  });
});
