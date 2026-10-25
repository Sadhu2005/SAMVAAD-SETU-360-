import { OFFICER_DEPARTMENTS, suggestedSchemeForCategory } from './ticketLogic';
import type { SafeDeskAssistInput } from './deskAssistSanitize';

export interface DeskAssistPayload {
  summary: string;
  suggestedDepartment: string;
  suggestedUrgency: 'Critical' | 'High' | 'Medium' | 'Low';
  remarksDraft: string;
}

const CATEGORY_DEPARTMENT: Record<string, string> = {
  'Bridges & Culverts': 'State PWD',
  'Piped Drinking Water': 'PHED / Jal Jeevan Mission',
  'Rural Roads & Connectivity': 'Rural Development',
  'Healthcare Sub-Center': 'Public Health',
  'Power & Electrification': 'Electricity / DISCOM',
  'Sanitation & Drainage': 'Sanitation & SBM',
};

export function normalizeSuggestedDepartment(raw: string | undefined): string {
  const value = (raw || '').trim();
  if (!value) return 'State PWD';
  const exact = OFFICER_DEPARTMENTS.find((d) => d.toLowerCase() === value.toLowerCase());
  if (exact) return exact;
  const partial = OFFICER_DEPARTMENTS.find(
    (d) => value.toLowerCase().includes(d.toLowerCase()) || d.toLowerCase().includes(value.toLowerCase())
  );
  if (partial) return partial;
  if (/water|phed|jal/i.test(value)) return 'PHED / Jal Jeevan Mission';
  if (/sanit|drain|sbm/i.test(value)) return 'Sanitation & SBM';
  if (/power|electric|discom/i.test(value)) return 'Electricity / DISCOM';
  if (/health|hospital/i.test(value)) return 'Public Health';
  if (/road|rural|pmgsy/i.test(value)) return 'Rural Development';
  if (/forest/i.test(value)) return 'Forest';
  if (/school|education/i.test(value)) return 'Education';
  return 'Other';
}

function normalizeUrgency(raw: string | undefined, fallback: string): 'Critical' | 'High' | 'Medium' | 'Low' {
  const u = (raw || fallback || 'Medium').trim();
  if (u === 'Critical' || u === 'High' || u === 'Medium' || u === 'Low') return u;
  return 'Medium';
}

export function buildRulesDeskAssist(input: SafeDeskAssistInput): DeskAssistPayload {
  const dept =
    CATEGORY_DEPARTMENT[input.category] ||
    normalizeSuggestedDepartment(input.suggestedScheme.split('/')[0]);
  const scheme = input.suggestedScheme || suggestedSchemeForCategory(input.category);
  const urgency = normalizeUrgency(input.urgency, 'Medium');

  const summary = [
    `${input.title} in ${input.district}, ${input.state}.`,
    `Category: ${input.category}. Current status: ${input.statusLabel}.`,
    scheme ? `Scheme alignment: ${scheme}.` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const remarksDraft =
    input.status === 'submitted' || input.status === 'triaged'
      ? `Please confirm landmark access for "${input.title}" in ${input.district} so the field team can visit.`
      : `Field team: proceed on "${input.title}" per ${normalizeSuggestedDepartment(dept)} assignment.`;

  return {
    summary,
    suggestedDepartment: normalizeSuggestedDepartment(dept),
    suggestedUrgency: urgency,
    remarksDraft,
  };
}

export function normalizeDeskAssistPayload(raw: Partial<DeskAssistPayload>, input: SafeDeskAssistInput): DeskAssistPayload {
  const rules = buildRulesDeskAssist(input);
  return {
    summary: (raw.summary || '').trim() || rules.summary,
    suggestedDepartment: normalizeSuggestedDepartment(raw.suggestedDepartment || rules.suggestedDepartment),
    suggestedUrgency: normalizeUrgency(raw.suggestedUrgency, rules.suggestedUrgency),
    remarksDraft: (raw.remarksDraft || '').trim() || rules.remarksDraft,
  };
}
