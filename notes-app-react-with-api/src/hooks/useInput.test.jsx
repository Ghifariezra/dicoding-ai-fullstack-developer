import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useInput from './useInput.js';

describe('useInput custom hook', () => {
    // ==========================================
    // Positive Cases
    // ==========================================
    describe('Positive Cases', () => {
        it('should initialize with default empty string when no argument is passed', () => {
            const { result } = renderHook(() => useInput());
            expect(result.current[0]).toBe('');
        });

        it('should initialize with provided string defaultValue', () => {
            const { result } = renderHook(() => useInput('initial value'));
            expect(result.current[0]).toBe('initial value');
        });

        it('should update state value when onValueChangeHandler is triggered', () => {
            const { result } = renderHook(() => useInput(''));

            act(() => {
                result.current[1]({ target: { value: 'john@example.com' } });
            });

            expect(result.current[0]).toBe('john@example.com');
        });

        it('should update value directly using returned setter function (setValue)', () => {
            const { result } = renderHook(() => useInput('hello'));

            act(() => {
                result.current[2]('world');
            });

            expect(result.current[0]).toBe('world');
        });
    });

    // ==========================================
    // Negative Cases
    // ==========================================
    describe('Negative Cases', () => {
        it('should throw TypeError when defaultValue is not a string (number, boolean, object)', () => {
            // Panggil useInput secara langsung tanpa renderHook
            expect(() => useInput(100)).toThrow(TypeError);
            expect(() => useInput(100)).toThrow('defaultValue harus berupa string');
            expect(() => useInput(true)).toThrow(TypeError);
            expect(() => useInput({})).toThrow(TypeError);
        });

        it('should throw TypeError when defaultValue is null', () => {
            expect(() => useInput(null)).toThrow(TypeError);
        });

        it('should throw TypeError when onValueChangeHandler is called without event object', () => {
            const { result } = renderHook(() => useInput(''));

            expect(() => {
                act(() => {
                    result.current[1]();
                });
            }).toThrow(TypeError);
        });

        it('should throw TypeError when event object is missing target property', () => {
            const { result } = renderHook(() => useInput(''));

            expect(() => {
                act(() => {
                    result.current[1]({});
                });
            }).toThrow(TypeError);
        });

        it('should set value to undefined if target object does not contain value key', () => {
            const { result } = renderHook(() => useInput('initial'));

            act(() => {
                result.current[1]({ target: {} });
            });

            expect(result.current[0]).toBeUndefined();
        });
    });

    // ==========================================
    // Edge Cases
    // ==========================================
    describe('Edge Cases', () => {
        it('should handle clearing value back to empty string', () => {
            const { result } = renderHook(() => useInput('filled content'));

            act(() => {
                result.current[1]({ target: { value: '' } });
            });

            expect(result.current[0]).toBe('');
        });

        it('should preserve whitespace-only string input', () => {
            const { result } = renderHook(() => useInput(''));

            act(() => {
                result.current[1]({ target: { value: '   ' } });
            });

            expect(result.current[0]).toBe('   ');
        });

        it('should handle multiline strings and HTML/special characters', () => {
            const { result } = renderHook(() => useInput('line1\nline2'));
            expect(result.current[0]).toBe('line1\nline2');

            act(() => {
                result.current[1]({ target: { value: '<script>alert("xss")</script>' } });
            });

            expect(result.current[0]).toBe('<script>alert("xss")</script>');
        });

        it('should handle rapid sequential state updates accurately', () => {
            const { result } = renderHook(() => useInput(''));

            act(() => {
                result.current[1]({ target: { value: 'a' } });
                result.current[1]({ target: { value: 'ab' } });
                result.current[1]({ target: { value: 'abc' } });
            });

            expect(result.current[0]).toBe('abc');
        });
    });
});