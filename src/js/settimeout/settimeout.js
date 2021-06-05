// 使用settimeout实现setinterval
function mySetInterval(fn, t) {
    let timer = null
    function interval() {
        fn()
        timer = setTimeout(interval, t)
    }
    interval()
    return {
        cancel: () => {
            clearTimeout(timer)
        }
    }
}

//Test
let foo = mySetInterval(() => {
    console.log('abc')
}, 1000)
setTimeout(() => {
    foo.cancel()
}, 5000);