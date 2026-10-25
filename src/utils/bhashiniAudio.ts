export interface ParsedAudioDataUrl {
  mime: string;
  base64: string;
  audioFormat: string;
}

const MIME_TO_FORMAT: Record<string, string> = {
  'audio/wav': 'wav',
  'audio/x-wav': 'wav',
  'audio/wave': 'wav',
  'audio/mpeg': 'mp3',
  'audio/mp3': 'mp3',
  'audio/webm': 'webm',
  'audio/ogg': 'ogg',
  'audio/flac': 'flac',
};

export function audioFormatFromMime(mime: string): string {
  const clean = mime.split(';')[0].trim().toLowerCase();
  return MIME_TO_FORMAT[clean] || 'wav';
}

export function parseDataUrlAudio(dataUrl: string): ParsedAudioDataUrl | null {
  const match = /^data:([^;]+);base64,(.+)$/i.exec(dataUrl.trim());
  if (!match) return null;
  const mime = match[1].trim().toLowerCase();
  const base64 = match[2].replace(/\s/g, '');
  return {
    mime,
    base64,
    audioFormat: audioFormatFromMime(mime),
  };
}

export async function loadAudioBase64FromVoiceUrl(voiceUrl: string): Promise<ParsedAudioDataUrl> {
  const trimmed = voiceUrl.trim();
  if (trimmed.startsWith('data:')) {
    const parsed = parseDataUrlAudio(trimmed);
    if (!parsed) throw new Error('Voice note is not a valid audio data URL');
    return parsed;
  }
  if (!/^https?:\/\//i.test(trimmed)) {
    throw new Error('Voice note must be a data URL or http(s) URL');
  }
  const res = await fetch(trimmed);
  if (!res.ok) throw new Error(`Failed to download voice note (${res.status})`);
  const mime = (res.headers.get('content-type') || 'audio/webm').split(';')[0].trim().toLowerCase();
  const buffer = Buffer.from(await res.arrayBuffer());
  return {
    mime,
    base64: buffer.toString('base64'),
    audioFormat: audioFormatFromMime(mime),
  };
}

/** Map citizen portal dialect labels to Bhashini ISO-639 source codes. */
export function resolveBhashiniSourceLanguage(input?: string): string {
  const raw = (input || '').toLowerCase();
  if (raw.includes('english') || raw === 'en') return 'en';
  if (raw.includes('tamil') || raw.includes('ta')) return 'ta';
  if (raw.includes('telugu') || raw.includes('te')) return 'te';
  if (raw.includes('bengali') || raw.includes('bn')) return 'bn';
  if (raw.includes('marathi') || raw.includes('mr')) return 'mr';
  if (raw.includes('gujarati') || raw.includes('gu')) return 'gu';
  if (raw.includes('kannada') || raw.includes('kn')) return 'kn';
  if (raw.includes('malayalam') || raw.includes('ml')) return 'ml';
  if (raw.includes('punjabi') || raw.includes('pa')) return 'pa';
  if (raw.includes('odia') || raw.includes('or')) return 'or';
  if (raw.includes('assamese') || raw.includes('as')) return 'as';
  return 'hi';
}
