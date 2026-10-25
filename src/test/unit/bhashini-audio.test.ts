import { describe, it, expect } from 'vitest';
import {
  audioFormatFromMime,
  parseDataUrlAudio,
  resolveBhashiniSourceLanguage,
} from '../../utils/bhashiniAudio';

describe('Unit: Bhashini audio helpers', () => {
  it('maps mime types to ULCA audioFormat', () => {
    expect(audioFormatFromMime('audio/webm')).toBe('webm');
    expect(audioFormatFromMime('audio/wav')).toBe('wav');
  });

  it('parses a data URL into base64 audio', () => {
    const parsed = parseDataUrlAudio('data:audio/webm;base64,QUJD');
    expect(parsed?.audioFormat).toBe('webm');
    expect(parsed?.base64).toBe('QUJD');
  });

  it('resolves portal dialect labels to ISO codes', () => {
    expect(resolveBhashiniSourceLanguage('Hindi / Vernacular')).toBe('hi');
    expect(resolveBhashiniSourceLanguage('Tamil')).toBe('ta');
    expect(resolveBhashiniSourceLanguage('')).toBe('hi');
  });
});
