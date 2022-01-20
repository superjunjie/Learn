const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
var iterableToArray = function (iterable) {
    if (typeof Array.from === 'function') {
      // ES2015+, iterables exist
        iterableToArray = Array.from;
        return Array.from(iterable);
    }

    // ES5, only arrays and array-likes exist
    iterableToArray = function (x) { return Array.prototype.slice.call(x); };
    return Array.prototype.slice.call(iterable);
}

function resolvePromise(promise2, x ,resolve, reject) {
    if(x === promise2) {
        return reject(new TypeError('[TypeError Promise循环引用]'))
    }
    let called
    if((typeof x === 'object' && typeof x !== null) || typeof x === 'function') {
        try {
            let then = x.then
            if(typeof then === 'function') {
                then.call(x, y => {
                    if(called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if(called) return 
                    called = true
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if(called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}
class Promise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
        let resolve = value => {
            if(value instanceof Promise) {
                value.then(resolve, reject)
                return
            }
            if(this.status === PENDING) {
                this.status = RESOLVED
                this.value = value
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        let reject = reason => {
            if(reason instanceof Promise) {
                console.log('Error Promise')
                reason.then(resolve, reject)
                return
            }
            if(this.status === PENDING) {
                this.status = REJECTED
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    then(onfilfulled, onrejected) {
        onfilfulled = typeof onfilfulled === 'function' ? onfilfulled : v => v
        onrejected = typeof onrejected === 'function' ? onrejected : e => { throw e}
        let promise2 = new Promise((resolve, reject) => {
            if(this.status === RESOLVED) {
                // 使用微任务是因为then方法实现了延时绑定回调机制
                queueMicrotask(() => {
                    try {
                        let x = onfilfulled(this.value) || this.value
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            if(this.status === REJECTED) {
                queueMicrotask(() => {
                    try {
                        let x = onrejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            if(this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            let x = onfilfulled(this.value) || this.value
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
                this.onRejectedCallbacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            let x = onrejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
            }
        })
        return promise2
    }
    catch(errCallback) {
        return this.then(null, errCallback)
    }
    finally (f) {
        return this.then(value =>{
            return Promise.resolve(f()).then(() => {
                return value
            })
            },  err => {
            return Promise.resolve(f()).then(() => {
                throw err
            })
        })
    }
}

// Promise 周边实现
Promise.resolve = function(value) {
    return new Promise((resolve, reject) => {
        resolve(value)
    })
}
Promise.reject = function(reason) {
    return new Promise((resolve, reject) => {
        reject(reason)
    })
}

Promise.all = function(promises) {
    return new Promise((resolve, reject) => {
        let result = []
        let len = promises.length
        if(len === 0) {
            resolve(result)
            return
        }
        const handleData = (data, index) => {
            result[index] = data
            if(index === len - 1) resolve(result)
        }
        for(let i = 0; i < len; i++) {
            Promise.resolve(promises[i]).then(data => {
                handleData(data, i)
            }).catch(e => {
                reject(e)
            })
        }
    })
}

Promise.race = function (promises) {
    return new Promise(function (resolve, reject) {
        let len = promises.length 
        if(len === 0) return
        iterableToArray(promises).forEach(function(value){
            Promise.resolve(value).then(resolve, reject)
        })
    })
}

/**
 * 使用微任务队列
 * race 测试
 * 预测结果：输出 hello world-1
 * 实际结果：实际结果 hello world-3 hello world-3 hello world-3
 */
let count = 0
const p1 = Promise.resolve('hello world-1')
const p2 = Promise.resolve('hello world-2')
const p3 = Promise.resolve('hello world-3')

const pa = Promise.race([p1, p2, p3])
pa.then(val => {
    count++
    console.log(val + '---' + count)
}).catch(e => {
    console.log(e)
})

// Test all
// const p1 = Promise.resolve('hello world')
// const p2 = Promise.reject('hello world')
// const p3 = Promise.resolve('hello world')

// const pa = Promise.all([p1, p2, p3])
// pa.then(val => {
//     console.log(val)
// }).catch(e => {
//     console.log(e)
// })

/**
 * 1.Promise中为什么要引入微任务？
 * 2.Promise中是如何实现回调函数返回值穿透的？
 * 3.Promise出错后，是怎么通过"冒泡"传递给那个捕获异常的函数？
 */