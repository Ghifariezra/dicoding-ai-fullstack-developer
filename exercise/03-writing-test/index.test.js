import { test, describe } from 'node:test';
import assert from 'node:assert';
import { sum } from './index.js';

describe('sum function', () => {
    test('should return the sum of two positive numbers', () => {
        assert.strictEqual(sum(1, 2), 3);
    });

    test('should return the sum of negative and positive numbers', () => {
        assert.strictEqual(sum(-1, 2), 1);
        assert.strictEqual(sum(1, -2), -1);
    });

    test('should return the sum of two negative numbers', () => {
        assert.strictEqual(sum(-1, -2), -3);
    });

    test('should return 0 if both arguments are 0', () => {
        assert.strictEqual(sum(0, 0), 0);
    });

    test('should concatenate when arguments are strings', () => {
        assert.strictEqual(sum('1', 2), '12');
        assert.strictEqual(sum(1, '2'), '12');
        assert.strictEqual(sum('1', '2'), '12');
    });
});