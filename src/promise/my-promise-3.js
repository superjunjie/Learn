const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

function resolvePromise(promise2, x, resolve, reject) {
    // 不是同一个对象，可能造成死循环
    if(promise2 === x) {
        return reject(new TypeError('[TypeError: Chaining cycle detected for promise #<Promise>----]'))
    }
    let called
    if((typeof x === 'object' && x !== null) || typeof x === 'function') {  // 有可能是promise
        let then = x.then  // 进一步判断是不是promise
        try {
            if(typeof then === 'function') {    // promise
                then.call(x, y => {
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if(called) return
                    called = true
                    reject(r)
                })
            } else {
                resolve(x) // 处理{a:1, then: 1}
            }
        } catch (e) {
            if(called) return
            called = true
            reject(r)
        }
    } else {
        resolve(x)
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING           // 宏变量,默认是等待状态
        this.value = undefined          // then要访问所以放到this上
        this.reason = undefined         
        this.onResolvedCallBacks = []   // 存放成功的回调函数
        this.onRejectedCallBacks = []   // 存放失败的回调函数
        let resolve = value => {
            if(value instanceof Promise) {
                value.then(resolve, reject)
                return
            }
            if(this.status === PENDING) {   // 保证只有状态是等待的时候再能更新状态
                this.value = value                
                this.status = RESOLVED
                this.onResolvedCallBacks.forEach(fn => fn())
            }
        }
        let reject = value => {
            if(this.status === PENDING) {
                this.reason = value
                this.status = REJECTED
                this.onRejectedCallBacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject)
        } catch (e) {
            console.log('catch错误', e)
            reject(e)         // 如果内部出错 直接将error手动调用reject向下专递
        }
    }
    then(onfulfilld, onrejected) {
        onfulfilld = typeof onfulfilld === 'function' ? onfulfilld : v => v
        onrejected = typeof onrejected === 'function' ? onrejected : error => { throw error}
        let promise2 = new Promise((resolve, reject) => {
            if(this.status === RESOLVED) {
                // 执行then中的方法，可能返回值是一个普通值，或者是一个promise，如果是promise，需要执行这个promise
                // 使用宏任务把代码放在下一次执行，这样就可以取到promise2
                queueMicrotask(() => {
                    try {
                        let x = onfulfilld(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                });
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
                this.onResolvedCallBacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            let x = onfulfilld(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
                this.onRejectedCallBacks.push(() => {
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
    catch(errCalBack) {
        return this.then(null, errCalBack)
    }
}
Promise.catch = (errCalBack) => {
    return this.then(null, errCalBack)
}
Promise.resolve = (value) => {
    return new Promise((resolve, reject) => {
        resolve(value)
    })
}

Promise.reject = (value) => {
    return new Promise((resolve, reject) => {
        reject(value)
    })
}

Promise.all = (promises) => {
    return new Promise((resolve, reject) => {
        let result = []
        let len = promises.length
        if(len === 0) {
            resolve(result)
            return
        }
        const handleData = (data, index) => {
            result[index] = data
            if(index === len - 1) {
                resolve(result)
            }
        }
        for(let i = 0; i < len; i++) {
            Promise.resolve(promises[i].then(data => {
                handleData(data, index)
            }).catch(err => {
                reject(err)
            }))
        }
    })
}

Promise.race = (promises) =>{
    return new Promise((resolve, reject) => {
        promises.forEach(promise => promise.then(resolve, reject))
    })
}

setTimeout(() => {
    console.log('timeout')
}, 0);

// test
let p1 = Promise.resolve('hello world-1')
let p2 = Promise.resolve('hello world-1')

const p = Promise.race([p1, p2])

p.then(val => {
    console.log(val)
}).catch(err => {
    console.log(err)
})

console.log('aaa')
