// 使用setInterval实现setTimeout

function mySetTimeout(fn, t) {
    const timer = setInterval(() => {
        clearInterval(timer)
        fn()
    }, t)
}

mySetTimeout(() => {
    console.log('a--b--c')
}, 1000)