/**
 * 一个人追求的目标越高，他的才力就发展的越快，对社会越有益
 *                                                                  --高尔基
 */

var MyForEach = function (arr, cb) {
    for (var i = 0; i < arr.length; i++) {
        cb.call(arr[i], arr[i], i)
    }
}

MyForEach(['yan', 'jun', 'jie'], function (currValue, idx) {
    console.log(`当前值 ${currValue} 索引为 ${idx}`)
})

var bar = {
    a: 1,
    [Symbol.iterator]: function () {
        var altArr = [
            { value: 'hello', done: false },
            { value: 'yan', done: false },
            { value: 'junjie', done: false },
            { value: undefined, done: true }
        ]
        return {
            next: function () {
                return altArr.shift()
            }
        }
    }
}

for (var key of bar) {
    console.log(key)
}
