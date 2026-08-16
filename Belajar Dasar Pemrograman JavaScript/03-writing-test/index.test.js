import { test, describe } from 'node:test';
import assert from 'node:assert';
import { sum } from './index.js';

describe('sum function', () => {
    test('should return the sum of two positive numbers', () => {
        assert.strictEqual(sum(1, 2), 3);
    });

    test('should return 0 if either number is negative', () => {
        assert.strictEqual(sum(-1, 2), 0);
        assert.strictEqual(sum(1, -2), 0);
    });

    test('should throw an error if either argument is not a number', () => {
        assert.throws(() => sum('1', 2), /Invalid input: Both arguments must be numbers./);
        assert.throws(() => sum(1, '2'), /Invalid input: Both arguments must be numbers./);
    });

    test('should throw an error if both arguments are not numbers', () => {
        assert.throws(() => sum('1', '2'), /Invalid input: Both arguments must be numbers./);
    });

    test('should return 0 if both arguments are negative', () => {
        assert.strictEqual(sum(-1, -2), 0);
    });

    test('should return 0 if both arguments are 0', () => {
        assert.strictEqual(sum(0, 0), 0);
    });
});