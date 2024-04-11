// from https://www.assemblyscript.org/introduction.html#from-a-webassembly-perspective

export function fib(n: number): number {
    var a = 0, b = 1
    if (n > 0) {
        while (--n) {
            let t = a + b
            a = b
            b = t
        }
        return b
    }
    return a
}