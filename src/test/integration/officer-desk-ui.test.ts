import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { OFFICER_DESK_CATALOG } from '../../utils/ticketLogic';

describe('Integration: Officer Command Desk action panel', () => {
  const government = fs.readFileSync(
    path.resolve(__dirname, '../../components/GovernmentWorkSurface.tsx'),
    'utf-8'
  );

  it('renders a next-step card with labeled fields and the live officer APIs', () => {
    expect(government).toContain('nextOfficerStep');
    expect(government).toContain('listOfficerDeskSteps');
    expect(government).toContain('Next step');
    expect(government).toContain('Ticket progress');
    expect(government).toContain('{nextStep.label}');
    expect(OFFICER_DESK_CATALOG.submitted[0].label).toBe('Accept ticket');
    expect(government).toContain('Department');
    expect(government).toContain('Assigned officer');
    expect(government).toContain('Remarks');
    expect(government).toContain('Proof photo');
    expect(government).toContain('apiAssignTicket');
    expect(government).toContain('apiOfficerUpdate');
    expect(government).toContain('apiProofTicket');
    expect(government).toContain('AI assist (optional)');
    expect(government).toContain('apiDeskAssist');
    expect(government).toContain('Get suggestion');
  });

  it('blocks double submit and does not dump the old equal action row', () => {
    expect(government).toContain('aria-busy={busy}');
    expect(government).toContain("busy ? 'Saving…'");
    expect(government).toContain('Other actions');
    expect(government).not.toContain('Accept / triage');
    expect(government).not.toContain('Request more info');
  });
});
