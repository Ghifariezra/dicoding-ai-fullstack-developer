import { test, describe } from 'node:test';
import assert from 'node:assert';
import sum from './index.js';

describe('sum function', () => {
    test('should return 0 if either argument is not a number', () => {
        assert.strictEqual(sum('1', 2), 0);
        assert.strictEqual(sum(1, '2'), 0);
        assert.strictEqual(sum('1', '2'), 0);
    });

    test('should return 0 if either number is negative', () => {
        assert.strictEqual(sum(-1, 2), 0);
        assert.strictEqual(sum(1, -2), 0);
        assert.strictEqual(sum(-1, -2), 0);
    });

    test('should return the sum of two positive numbers', () => {
        assert.strictEqual(sum(1, 2), 3);
        assert.strictEqual(sum(5, 10), 15);
    });
});