// 实现一个方法使多维数组变成一维数组

function flatter(arr) {
    if(!arr.length) return
    return arr.reduce((pre, cur) => 
        Array.isArray(cur) ? [...pre, ...flatter(cur)] : [...pre, cur],
        []
    )
}

let result = flatter([1,2,3,[4,5,[6,7]],8])
console.log(result)                                           