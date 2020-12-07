// 高频时间触发,但n秒内只会执行一次,所以节流会稀释函数的执行频率。
const throttle = (fn, delay) => {
    let flag = true
    return function() {
        if(!flag) return
        flag = false
        setTimeout(() => {
            fn.apply(this,arguments)
            flag = true
        }, delay);
    }
}
