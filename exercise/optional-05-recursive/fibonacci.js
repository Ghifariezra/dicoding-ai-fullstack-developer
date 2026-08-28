function fibonacci(n) {
    if (n === 0) {
        return [0];
    }

    if (n === 1) {
        return [0, 1];
    }

    const sequence = fibonacci(n - 1);

    const nextElement = sequence[sequence.length - 1] + sequence[sequence.length - 2];
    sequence.push(nextElement);

    return sequence;
}

// Jangan hapus kode di bawah ini!
export default fibonacci;