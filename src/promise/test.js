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
}).catch(e => {console.log('error catch', e)}) 

let promise3 = Promise.resolve(123)
promise3.then((res) => {
    console.log(res)
})