const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

function resolvePromise(promise2, x, resolve, reject) {
    if(promise2 === x) {
        return reject(new TypeError('[TypeError: Chaining cycle detected for promise #<Promise>----]'))
    }
    let called
    if((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let then = x.then
        try {
            if(typeof then === 'function') {
                then.call(x, y => {
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
            reject(r)
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
        this.onResolvedCallBacks = []
        this.onRejectedCallBacks = []
        let resolve = value => {
            if(value instanceof Promise) {
                value.then(resolve, reject)
                return
            }
            if(this.status === PENDING) {
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
            reject(e)
        }
    }
    then(onfulfilld, onrejected) {
        onfulfilld = typeof onfulfilld === 'function' ? onfulfilld : v => v
        onrejected = typeof onrejected === 'function' ? onrejected : error => { throw error}
        let promise2 = new Promise((resolve, reject) => {
            if(this.status === RESOLVED) {
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
                handleData(data, i)
            }).catch(err => {
                reject(err)
            }))
        }
    })
}

Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
      let len = promises.length;
      if(len === 0) return;
      for(let i = 0; i < len; i++) {
        Promise.resolve(promises[i]).then(data => {
          resolve(data);
          return;
        }).catch(err => {
          reject(err);
          return;
        })
      }
    })
  }

  Promise.prototype.finally = function(callback) {
    this.then(value => {
      return Promise.resolve(callback()).then(() => {
        return value;
      });
    }, error => {
      return Promise.resolve(callback()).then(() => {
        throw error;
      });
    });
  }

// Test
// const p = Promise.resolve('hello world')
// p.then(val => {
//     console.log(val)
// })

// Test all
// const p1 = Promise.resolve('hello world')
// const p2 = Promise.resolve('hello world')
// const p3 = Promise.resolve('hello world')

// const pa = Promise.all([p1, p2, p3])
// pa.then(val => {
//     console.log(val)
// }).catch(e => {
//     console.log(e)
// })


// Test race  ===>sucess
// const p1 = Promise.resolve('hello world-1')
// const p2 = Promise.resolve('hello world-2')
// const p3 = Promise.resolve('hello world-3')

// const pa = Promise.race([p1, p2, p3])
// pa.then(val => {
//     console.log(val)
// }).catch(e => {
//     console.log(e)
// })

// Test finally
// const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject(1000)
//     }, 1000);
// })
// promise.then(value => {
//     console.log('resolved', value)
// }).catch(e => {
//     console.log('error', e)
// }).finally(() => {
//     console.log('finally')
// })
