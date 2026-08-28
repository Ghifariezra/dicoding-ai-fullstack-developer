import { describe, it, expect } from 'vitest';
import { showFormattedDate } from './index.js';

describe('showFormattedDate', () => {
    // ==========================================
    // Positive Cases (Happy Path)
    // ==========================================
    describe('Positive Cases', () => {
        it('should format valid ISO date string correctly in Indonesian locale', () => {
            const formatted = showFormattedDate('2022-04-14T04:27:34.572Z');

            expect(formatted).toContain('14');
            expect(formatted).toContain('April');
            expect(formatted).toContain('2022');
        });

        it('should format valid Date object correctly', () => {
            const dateObj = new Date(2023, 7, 17); // 17 Agustus 2023
            const formatted = showFormattedDate(dateObj);

            expect(formatted).toContain('17');
            expect(formatted).toContain('Agustus');
            expect(formatted).toContain('2023');
        });

        it('should format numeric timestamp correctly', () => {
            const timestamp = 1649910454572; // 14 April 2022
            const formatted = showFormattedDate(timestamp);

            expect(formatted).toContain('2022');
            expect(formatted).toContain('April');
        });
    });

    // ==========================================
    // Negative Cases
    // ==========================================
    describe('Negative Cases', () => {
        it('should return "Invalid Date" when passed an invalid date string', () => {
            const formatted = showFormattedDate('invalid-date-string');
            expect(formatted).toBe('Invalid Date');
        });

        it('should return "Invalid Date" when passed undefined', () => {
            const formatted = showFormattedDate(undefined);
            expect(formatted).toBe('Invalid Date');
        });

        it('should return "Invalid Date" when passed an empty object', () => {
            const formatted = showFormattedDate({});
            expect(formatted).toBe('Invalid Date');
        });
    });

    // ==========================================
    // Edge Cases
    // ==========================================
    describe('Edge Cases', () => {
        it('should handle leap year date correctly (29 Februari)', () => {
            const formatted = showFormattedDate('2024-02-29T00:00:00.000Z');

            expect(formatted).toContain('29');
            expect(formatted).toContain('Februari');
            expect(formatted).toContain('2024');
        });

        it('should handle Unix Epoch start (timestamp 0)', () => {
            const formatted = showFormattedDate(0);

            expect(formatted).toContain('1970');
            expect(formatted).toContain('Januari');
        });

        it('should handle last day of the year (31 Desember)', () => {
            const formatted = showFormattedDate('2025-12-31T12:00:00');

            expect(formatted).toContain('31');
            expect(formatted).toContain('Desember');
            expect(formatted).toContain('2025');
        });

        it('should format date correctly when input is null (evaluates to Epoch 1970)', () => {
            const formatted = showFormattedDate(null);

            expect(formatted).toContain('1970');
            expect(formatted).toContain('Januari');
        });
    });
});