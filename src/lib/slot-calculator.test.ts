import { describe, it, expect } from 'vitest';
import { calculateAvailableSlots, calculateEndTime } from './slot-calculator';
import { SendjaBooking } from './validations';

describe('Slot Calculator Rules', () => {
  const MOCK_DATE = '2026-10-15';

  it('calculates end time correctly with 15 minute buffer', () => {
    expect(calculateEndTime('10:00', 60)).toBe('11:15');
    expect(calculateEndTime('14:30', 90)).toBe('16:15');
  });

  it('rejects slots that exceed closing time 22:00', () => {
    // 60 min treatment + 15 min buffer = 75 mins.
    // 20:30 + 75 = 21:45 (OK)
    // 21:00 + 75 = 22:15 (PAST_CLOSING)
    const slots = calculateAvailableSlots(MOCK_DATE, 60, 'T1', 'R1', []);
    const slot2030 = slots.find(s => s.time === '20:30');
    const slot2100 = slots.find(s => s.time === '21:00');
    
    expect(slot2030?.available).toBe(true);
    expect(slot2100?.available).toBe(false);
    expect(slot2100?.reason).toBe('PAST_CLOSING');
  });

  it('detects booking conflicts accurately', () => {
    const existing: SendjaBooking[] = [
      {
        id: '1',
        createdAt: new Date().toISOString(),
        date: MOCK_DATE,
        startTime: '10:00',
        endTime: '11:15', // 60 min + 15 min buffer
        treatmentId: 'TR1',
        treatmentName: 'Reflexology',
        durationMinutes: 60,
        therapistId: 'T1',
        roomId: 'R1',
        status: 'CONFIRMED',
        totalPriceIdr: 100000,
        guest: { name: 'Test', phone: '08123456789' }
      }
    ];

    const slots = calculateAvailableSlots(MOCK_DATE, 60, 'T1', 'R1', existing);
    
    // 10:00 to 11:15 is blocked
    expect(slots.find(s => s.time === '10:00')?.available).toBe(false);
    expect(slots.find(s => s.time === '10:30')?.available).toBe(false);
    expect(slots.find(s => s.time === '11:00')?.available).toBe(false); // overlapping 11:00 to 12:15, conflict!

    // 11:30 should be open
    expect(slots.find(s => s.time === '11:30')?.available).toBe(true);
  });

  it('ignores cancelled bookings', () => {
    const existing: SendjaBooking[] = [
      {
        id: '1',
        createdAt: new Date().toISOString(),
        date: MOCK_DATE,
        startTime: '10:00',
        endTime: '11:15',
        treatmentId: 'TR1',
        treatmentName: 'Reflexology',
        durationMinutes: 60,
        therapistId: 'T1',
        roomId: 'R1',
        status: 'CANCELLED', // Cancelled!
        totalPriceIdr: 100000,
        guest: { name: 'Test', phone: '08123456789' }
      }
    ];

    const slots = calculateAvailableSlots(MOCK_DATE, 60, 'T1', 'R1', existing);
    
    // 10:00 should be open because it's cancelled
    expect(slots.find(s => s.time === '10:00')?.available).toBe(true);
  });
});
