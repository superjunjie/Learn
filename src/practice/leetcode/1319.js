var makeConnected = function (n, connections) {
    if(connections.length < n - 1) {
        return -1
    }
    let groupNum = n
    let parent = new Array(n).fill(1).map((val,index) => index)
    const findRoot = x => {
        if(x == parent[x]) {
            return x
        }
        parent[x] = findRoot(parent[x])
        return parent[x]
    }
    for(let i = 0; i < connections.length; i++) {
        const aRoot = findRoot(connections[i][0])
        const bRoot = findRoot(connections[i][1])
        if(aRoot != bRoot) {
            groupNum--
            parent[aRoot] = bRoot
        }
    }
    return groupNum - 1
}

console.log(makeConnected(4,[[0,1],[0,2],[1,2]]))
