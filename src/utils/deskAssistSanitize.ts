import type { CaseStatus } from './ticketLogic';
import { CITIZEN_STATUS_LABEL } from './ticketLogic';

export interface SafeDeskAssistInput {
  title: string;
  description: string;
  category: string;
  district: string;
  state: string;
  urgency: string;
  status: CaseStatus;
  statusLabel: string;
  suggestedScheme: string;
  hasVoice: boolean;
  hasPhoto: boolean;
}

export interface DeskAssistCaseLike {
  title?: string;
  description?: string;
  category?: string;
  district?: string;
  state?: string;
  urgency?: string;
  status?: CaseStatus;
  suggestedScheme?: string;
  voiceUrl?: string;
  photoUrl?: string;
  contactNumber?: string;
  phoneLast4?: string;
  citizenToken?: string;
  citizenPhoneMasked?: string;
  officerPhone?: string;
}

const PHONE_IN_TEXT =
  /\b(?:\+91[\s-]?)?[6-9]\d{9}\b|\b0[6-9]\d{9}\b/g;
const PHONE_COMPACT = /^(?:\+91|0)?[6-9]\d{9}$/;

export function redactLikelyPhones(text: string): string {
  let out = text.replace(PHONE_IN_TEXT, '[redacted-phone]');
  out = out.replace(/(?:\+91[\s-]?)?(?:\d[\s-]?){10,12}/g, (match) => {
    const digits = match.replace(/\D/g, '');
    if (digits.length === 10 && /^[6-9]/.test(digits)) return '[redacted-phone]';
    if (digits.length === 12 && digits.startsWith('91') && /^91[6-9]/.test(digits)) return '[redacted-phone]';
    if (digits.length === 11 && digits.startsWith('0') && /^0[6-9]/.test(digits)) return '[redacted-phone]';
    return match;
  });
  return out;
}

export function containsLikelyPhone(text: string): boolean {
  const compact = text.replace(/[\s-]/g, '');
  if (PHONE_COMPACT.test(compact)) return true;
  return /\b(?:\+91)?[6-9]\d{9}\b/.test(text);
}

export function toSafeDeskAssistInput(raw: DeskAssistCaseLike): SafeDeskAssistInput {
  const status = raw.status || 'submitted';
  return {
    title: redactLikelyPhones((raw.title || '').trim()),
    description: redactLikelyPhones((raw.description || '').trim()),
    category: (raw.category || '').trim(),
    district: (raw.district || '').trim(),
    state: (raw.state || '').trim(),
    urgency: (raw.urgency || 'Medium').trim(),
    status,
    statusLabel: CITIZEN_STATUS_LABEL[status],
    suggestedScheme: (raw.suggestedScheme || '').trim(),
    hasVoice: Boolean(raw.voiceUrl),
    hasPhoto: Boolean(raw.photoUrl),
  };
}

export function formatDeskAssistPrompt(input: SafeDeskAssistInput, departmentOptions: readonly string[]): string {
  return `You assist Indian district officers triaging citizen infrastructure tickets (Samvaad-Setu 360).
Use only the facts below. Do not invent phone numbers or citizen identity.

Ticket:
- Title: ${input.title}
- Description: ${input.description}
- Category: ${input.category}
- Location: ${input.district}, ${input.state}
- Urgency: ${input.urgency}
- Status: ${input.statusLabel}
- Scheme hint: ${input.suggestedScheme || 'none'}
- Citizen attached voice: ${input.hasVoice ? 'yes' : 'no'}
- Citizen attached photo: ${input.hasPhoto ? 'yes' : 'no'}

Choose suggestedDepartment from this exact list only:
${departmentOptions.map((d) => `- ${d}`).join('\n')}

Respond with JSON only:
{
  "summary": "2-3 short sentences in plain English for the officer",
  "suggestedDepartment": "one value from the list",
  "suggestedUrgency": "Critical|High|Medium|Low",
  "remarksDraft": "one polite sentence the officer may send to citizen or assignee"
}`;
}

export function assertPromptHasNoPii(prompt: string): void {
  if (containsLikelyPhone(prompt)) {
    throw new Error('Desk assist prompt must not contain phone numbers');
  }
  if (/citizenToken|phoneLast4|0x[0-9a-f]{8,}/i.test(prompt)) {
    throw new Error('Desk assist prompt must not contain tokens or hashes');
  }
}
