import { describe, it, expect } from 'vitest';
import { isValidIndianMobile } from '../../utils/ticketLogic';
import { submitCitizenCase } from '../../services/caseService';

describe('Regression: invalid mobiles cannot open a ticket', () => {
  it('rejects the long typed number seen on the citizen form', async () => {
    expect(isValidIndianMobile('2337132156748210')).toBe(false);
    await expect(
      submitCitizenCase({
        title: 'Washed culvert',
        description: 'Road cut',
        category: 'Bridges & Culverts',
        district: 'Bengaluru (Bangalore) Rural',
        state: 'Karnataka',
        contactNumber: '2337132156748210',
      })
    ).rejects.toThrow(/Valid 10-digit Indian mobile/);
  });
});
