function sum(a, b) {
  if ((typeof a === null || typeof b === null) || (typeof a === undefined || typeof b === undefined)) {
    throw new Error('Invalid input: Both arguments must be numbers.');
  }

  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Invalid input: Both arguments must be numbers.');
  }

  if (a < 0 || b < 0) {
    return 0;
  }

  return a + b;
}

export { sum };
