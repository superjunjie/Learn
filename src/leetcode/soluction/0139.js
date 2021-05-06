const wordBreakDFS = (s, wordDict) => {
    const len = s.length
    const wordSet = new Set(wordDict)
    const memo = new Array(len)

    const canBeak = (start) => {
        if(start === len) {
            return true
        }
        if(memo[start] !== undefined) return memo[start]
        for(let i = start + 1; i <= len; i++) {
            const prefix = s.slice(start, i)
            if(wordSet.has(prefix) && canBeak(i)) {
                memo[start] = true
                return true
            }
        }
        memo[start] = false
        return false
    }
    return canBeak(0)
}

const wordBreakBFS = (s, wordDict) => {
    const len = s.length
    const wordSet = new Set(wordDict)
    const visited = new Array(len)

    const queue = []
    queue.push(0)

    while (queue.length) {
        const start = queue.shift()
        if(visited[start]) continue
        visited[start] = true

        for(let i = start + 1; i <= len; i++) {
            const prefix = s.slice(start, i)
            if(wordSet.has(prefix)) {
                if(i < len) {
                    queue.push(i)
                } else {
                    return true
                }
            }
        }
    }
    return false
}
