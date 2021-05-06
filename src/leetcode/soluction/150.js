var evalRPN = function(tokens) {
    return h = {'+' : (a, b)=>a + b, '-': (a, b)=>a - b, '*': (a, b)=>a * b, '/': (a, b)=>a / b | 0},
        tokens.reduce((s, v) => (s.push(h[v] ? h[v](...s.splice(-2, 2)) : Number(v)), s), [])[0]
}
