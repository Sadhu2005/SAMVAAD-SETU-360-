import { generateGeminiJson, geminiModelId, isGeminiReady } from './geminiClient';
import type { DeskAssistCaseLike } from '../utils/deskAssistSanitize';
import {
  assertPromptHasNoPii,
  formatDeskAssistPrompt,
  toSafeDeskAssistInput,
} from '../utils/deskAssistSanitize';
import {
  buildRulesDeskAssist,
  normalizeDeskAssistPayload,
  type DeskAssistPayload,
} from '../utils/deskAssistRules';
import { OFFICER_DEPARTMENTS } from '../utils/ticketLogic';

export type DeskAssistSource = 'gemini' | 'rules';

export interface DeskAssistResult {
  source: DeskAssistSource;
  assist: DeskAssistPayload;
  model?: string;
}

export async function computeDeskAssist(caseLike: DeskAssistCaseLike): Promise<DeskAssistResult> {
  const input = toSafeDeskAssistInput(caseLike);
  const rulesFallback = buildRulesDeskAssist(input);

  if (!isGeminiReady()) {
    return { source: 'rules', assist: rulesFallback };
  }

  const prompt = formatDeskAssistPrompt(input, OFFICER_DEPARTMENTS);
  assertPromptHasNoPii(prompt);

  type GeminiAssist = Partial<DeskAssistPayload>;
  const parsed = await generateGeminiJson<GeminiAssist>(prompt);
  if (!parsed) {
    return { source: 'rules', assist: rulesFallback };
  }

  return {
    source: 'gemini',
    model: geminiModelId(),
    assist: normalizeDeskAssistPayload(parsed, input),
  };
}
