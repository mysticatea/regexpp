export function assert(condition: boolean, message?: string): void {
    if (!condition) {
        throw new Error(message || "AssertionError")
    }
}

export function last<T>(xs: T[]): T | undefined {
    return xs.length === 0 ? undefined : xs[xs.length - 1]
}
