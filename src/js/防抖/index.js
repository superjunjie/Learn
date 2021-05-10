// 触发高频时间后n秒内函数只会执行一次,如果n秒内高频时间再次触发,则重新计算时间。
const debounce = (fn, delay) => {
    let timer = null
    return function() {
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, delay);
    }
}