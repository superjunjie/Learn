const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

function resolvePromise(promise2, x, resolve, reject) {
    if((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let then = x.then
        if(typeof then === 'function') {
            then.call(x, y => {
                resolvePromise(promise2, y, resolve, reject)
            }, r => {
                reject(r)
            })
        } else {
            resolve(x)
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
        let promise2 = new Promise((resolve, reject) => {
            if(this.status === RESOLVED) {
                setTimeout(() => {
                    try {
                        let x = onfulfilld(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            }
            if(this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onrejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            }
            if(this.status === PENDING) {
                this.onResolvedCallBacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onfulfilld(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0);
                })
                this.onRejectedCallBacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onrejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0);
                })
            }
        })
        return promise2
    }
}


// test
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(100)
    }, 1000);
})
let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(100)
    }, 1000);
})
promise.then((res)=>{
    console.log('sucess1',res)
    return promise2
},error=>{
    console.log('error1', error)
}).then((res)=>{
    console.log('sucess2',res)
},(error)=>{
    console.log('error2', error)
})

module.exports = Promise
