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

/**
 * 数组去重
 */
function getArrFn(arr) {
    if(!arr.length) return
    return arr.reduce((pre, cur) => 
        pre.includes(cur) ? pre : [...pre, cur],
        []
    )
}
const res = getArrFn([1,1,[1,3],3,3])
console.log(res)


const arr = [1,[[2,3],4],[5,6]]
/**
 * 
 * @param {*} arr 数组
 */
function *flatByGenerator(arr) {
    const length = arr.length
    for(let i = 0; i < length; i++) {
        if(Array.isArray(arr[i])) {
            yield* flatByGenerator(arr[i])
        } else {
            yield arr[i]
        }
    }
}
console.log([...flatByGenerator(arr)])
