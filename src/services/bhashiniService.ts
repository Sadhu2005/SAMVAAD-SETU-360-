import { loadAudioBase64FromVoiceUrl, resolveBhashiniSourceLanguage } from '../utils/bhashiniAudio';

const DEFAULT_CONFIG_URL = 'https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline';

export interface BhashiniConfig {
  userId: string;
  ulcaApiKey: string;
  pipelineId: string;
  configUrl: string;
  sourceLanguage: string;
  samplingRate: number;
}

export function bhashiniConfig(): BhashiniConfig | null {
  const userId = (process.env.BHASHINI_USER_ID || '').trim();
  const ulcaApiKey = (process.env.BHASHINI_ULCA_API_KEY || '').trim();
  const pipelineId = (process.env.BHASHINI_PIPELINE_ID || '').trim();
  if (!userId || !ulcaApiKey || !pipelineId) return null;
  return {
    userId,
    ulcaApiKey,
    pipelineId,
    configUrl: (process.env.BHASHINI_CONFIG_URL || DEFAULT_CONFIG_URL).trim(),
    sourceLanguage: (process.env.BHASHINI_SOURCE_LANGUAGE || 'hi').trim() || 'hi',
    samplingRate: Number(process.env.BHASHINI_SAMPLING_RATE || 16000) || 16000,
  };
}

export function isBhashiniConfigured(): boolean {
  return bhashiniConfig() !== null;
}

type PipelineConfigCache = {
  expiresAt: number;
  serviceId: string;
  callbackUrl: string;
  authHeaderName: string;
  authHeaderValue: string;
};

let configCache: PipelineConfigCache | null = null;

function pickAsrServiceId(configJson: any, sourceLanguage: string): string {
  const blocks = configJson?.pipelineResponseConfig || [];
  const asrBlock = blocks.find((b: any) => b?.taskType === 'asr');
  const configs = asrBlock?.config || [];
  const langMatch = configs.find(
    (c: any) => c?.language?.sourceLanguage === sourceLanguage && c?.serviceId
  );
  if (langMatch?.serviceId) return String(langMatch.serviceId);
  const first = configs.find((c: any) => c?.serviceId);
  if (first?.serviceId) return String(first.serviceId);
  throw new Error(`No ASR serviceId in Bhashini config for language ${sourceLanguage}`);
}

async function fetchPipelineConfig(cfg: BhashiniConfig, sourceLanguage: string): Promise<PipelineConfigCache> {
  const now = Date.now();
  if (configCache && configCache.expiresAt > now) return configCache;

  const res = await fetch(cfg.configUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      userID: cfg.userId,
      ulcaApiKey: cfg.ulcaApiKey,
    },
    body: JSON.stringify({
      pipelineTasks: [
        {
          taskType: 'asr',
          config: {
            language: { sourceLanguage },
          },
        },
      ],
      pipelineRequestConfig: { pipelineId: cfg.pipelineId },
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Bhashini config call failed (${res.status}): ${text.slice(0, 200)}`);
  }
  const json = await res.json();
  const endpoint = json?.pipelineInferenceAPIEndPoint;
  const callbackUrl = String(endpoint?.callbackUrl || endpoint?.callbackURL || '').trim();
  const authHeaderName = String(endpoint?.inferenceApiKey?.name || 'Authorization').trim();
  const authHeaderValue = String(endpoint?.inferenceApiKey?.value || '').trim();
  if (!callbackUrl || !authHeaderValue) {
    throw new Error('Bhashini config response missing inference endpoint or API key');
  }
  const serviceId = pickAsrServiceId(json, sourceLanguage);
  configCache = {
    expiresAt: now + 5 * 60 * 1000,
    serviceId,
    callbackUrl,
    authHeaderName,
    authHeaderValue,
  };
  return configCache;
}

export function extractAsrTranscript(computeJson: any): string {
  const blocks = computeJson?.pipelineResponse || (computeJson?.taskType ? [computeJson] : []);
  const asr = blocks.find((b: any) => b?.taskType === 'asr');
  const text = asr?.output?.[0]?.source;
  if (typeof text === 'string' && text.trim()) return text.trim();
  throw new Error('Bhashini ASR returned empty transcript');
}

export async function transcribeVoiceUrl(params: {
  voiceUrl: string;
  languageHint?: string;
}): Promise<{ transcript: string; sourceLanguage: string; serviceId: string }> {
  const cfg = bhashiniConfig();
  if (!cfg) {
    throw new Error(
      'Bhashini is not configured. Set BHASHINI_USER_ID, BHASHINI_ULCA_API_KEY, and BHASHINI_PIPELINE_ID in server env.'
    );
  }
  const sourceLanguage = resolveBhashiniSourceLanguage(params.languageHint || cfg.sourceLanguage);
  const audio = await loadAudioBase64FromVoiceUrl(params.voiceUrl);
  const pipeline = await fetchPipelineConfig(cfg, sourceLanguage);

  const computeRes = await fetch(pipeline.callbackUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      [pipeline.authHeaderName]: pipeline.authHeaderValue,
    },
    body: JSON.stringify({
      pipelineTasks: [
        {
          taskType: 'asr',
          config: {
            language: { sourceLanguage },
            serviceId: pipeline.serviceId,
            audioFormat: audio.audioFormat,
            samplingRate: cfg.samplingRate,
          },
        },
      ],
      inputData: {
        audio: [{ audioContent: audio.base64 }],
      },
    }),
  });
  if (!computeRes.ok) {
    const text = await computeRes.text();
    throw new Error(`Bhashini ASR compute failed (${computeRes.status}): ${text.slice(0, 200)}`);
  }
  const computeJson = await computeRes.json();
  const transcript = extractAsrTranscript(computeJson);
  return { transcript, sourceLanguage, serviceId: pipeline.serviceId };
}

/** Test hook */
export function clearBhashiniConfigCache(): void {
  configCache = null;
}
