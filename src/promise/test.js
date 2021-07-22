// let promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(100)
//     }, 1000);
// })
// let promise2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject(100)
//     }, 1000);
// })
// promise.then((res)=>{
//     console.log('sucess1',res)
//     return promise2
// },error=>{
//     console.log('error1', error)
// }).then((res)=>{
//     console.log('sucess2',res)
// }).catch(e => {console.log('error catch', e)}) 

// let promise3 = Promise.resolve(123)
// promise3.then((res) => {
//     console.log(res)
// })
// Yanjunjie&19980929
// Test all
const p1 = Promise.resolve('hello world-1')
const p2 = Promise.reject('hello world-2')
const p3 = Promise.resolve('hello world-3')

const pa = Promise.all([p1, p2, p3])
pa.then(val => {
    console.log(val)
}).catch(e => {
    console.log(e)
})
