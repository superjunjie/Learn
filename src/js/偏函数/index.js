function partial(fn) {
    let args = [].slice.call(arguments, 1)
    return function() {
        const newArgs = args.concat([].slice.call(arguments))
        return fn.apply(this, newArgs)
    }
}
