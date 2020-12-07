function partial(fn) {
    let args = [].slice.call(arguments, 1)
    return function() {
        const newArgs = args.concat([].slice.call(arguments))
        return fn.apply(this, newArgs)
    }
}
try {
    
} catch (e) {
    this.message.error(e.msg || '网络开小差了，请稍后再试')
}