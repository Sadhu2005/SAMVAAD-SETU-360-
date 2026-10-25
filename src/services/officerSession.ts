import type { OfficerRoleKey } from '../utils/ticketLogic';

export interface OfficerSession {
  name: string;
  role: OfficerRoleKey;
  loggedInAt: string;
}

const KEY = 'setu-officer-session';

export function getOfficerSession(): OfficerSession | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as OfficerSession) : null;
  } catch {
    return null;
  }
}

export function setOfficerSession(session: OfficerSession): void {
  sessionStorage.setItem(KEY, JSON.stringify(session));
}

export function clearOfficerSession(): void {
  sessionStorage.removeItem(KEY);
}

export function expectedDeskPin(): string {
  return import.meta.env?.VITE_OFFICER_DESK_PIN?.trim() || 'setu-desk-2026';
}
