const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

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
        if(this.status === RESOLVED) {
            onfulfilld(this.value)
        }
        if(this.status === REJECTED) {
            onrejected(this.reason)
        }
        if(this.status === PENDING) {
            this.onResolvedCallBacks.push(() => {
                // 添加自己的逻辑
                console.log('haha')
                onfulfilld(this.value)
            })
            this.onRejectedCallBacks.push(() => {
                onrejected(this.reason)
            })
        }
    }
}


// test
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(100)
    }, 1000);
})
promise.then((res)=>{
    console.log('sucess1',res)
},error=>{
    console.log('error1', error)
})

promise.then((res)=>{
    console.log('sucess2',res)
},error=>{
    console.log('error2', error)
})

module.exports = Promise