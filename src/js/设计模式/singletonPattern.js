//单例模式
/**
 * 1.每次访问者来访问，返回同一个实例
 * 2.如果一开始实例没有创建，那么特定类型需要自行创建这个实例
 */
 
function ManageGame() {
    if (ManageGame._schedule) {
        return ManageGame._schedule
    }
    ManageGame._schedule = this
}
ManageGame.getInstance = function () {
    if (ManageGame._schedule) {
        return ManageGame._schedule
    }
    return ManageGame._schedule = new ManageGame()
}

/** 
//ES6单例模式
class ManageGame {
    static _schedule = null

    static getInstance() {
        if (ManageGame._schedule) {
            return ManageGame._schedule
        }
        return ManageGame._schedule = new ManageGame()
    }
    constructor() {
        if (ManageGame._schedule) {
            return ManageGame._schedule
        }
        ManageGame._schedule = this
    }
}
*/

/**
 * 上面两种实现中，缺点是实例会暴露，可以使用闭包将函数隐藏
 const Singleton = (function () {
     let _instance = null
 
     const Singleton = function () {
         if (_instance) return _instance
         _instance = this
         this.init()
         return _instance
     }
 
     Singleton.prototype.init = function () {
         this.foo = 'Singleton Pattern'
     }
 
     Singleton.getInstance = function(){
         if(_instance) return _instance
         _instance = new Singleton()
         return _instance
     }
 
     return Singleton
 
 })()
 */


/**
 * 块级作用域方式创建单例
 let getInstance
 {
    let _instance = null 
    const Singleton = function(){
        if(_instance) return _instance
        _instance = this
        this.init()
        return _instance
    }

    Singleton.prototype.init = function(){
        this.foo = 'Singleton Pattern'
    }

    getInstance = function(){
        if(_instance) return _instance
        _instance = new Singleton()
        return _instance
    }
 }
 */

/**
 * 单例模式赋能
 * 将单例模式的创建逻辑与特定类功能逻辑拆开
 class FuncClass {
     constructor(bar) {
         this.bar = bar
         this.init()
     }
     init() {
         this.foo = 'Singleton Pattern'
     }
 }
 
 const Singleton = (function () {
     let _instance = null
 
     const ProxySingleton = function (bar) {
         if (_instance) return _instance
         _instance = new FuncClass(bar)
         return _instance
     }
 
     ProxySingleton.getInstance = function(bar){
         if(_instance) return _instance
         _instance = new Singleton(bar)
         return _instance
     }
 })
 */


/**
 * 配合ES6 Proxy 来拦截默认的new方式 
 class Person{
     constructor(name, age){
         this.name = name
         this.age = age
     }
 }
 
 function Singleton(FuncClass){
     let _instance
     return new Proxy(FuncClass, {
         construct(target, args){
             return _instance || (_instance = Reflect.construct(FuncClass, args))
         }
     })
 }
 
 const PersonInstance = Singleton(Person)
 
 const person1 = new PersonInstance('张三', 15)
 const person2 = new PersonInstance('李四', 18)
 
 console.log(person1 === person2) //true
 */


/**
 * 懒汉式单例是在启动时才实例化
 * 饿汉式是程序启动时或单例模式类一加载是才创建
 class FuncClass{
     constructor(){
         this.bar = 'bar'
     }
 }
 
 //饿汉式
 const HungrySingleton = (function(){
     const _instance = new FuncClass()
 
     return function(){
         return _instance
     }
 })()
 //懒汉式
 const LazySingleton = (function(){
     let _instance = null
 
     return function(){
         return _instance || (_instance = new FuncClass())
     }
 })()
 */


const schedule1 = new ManageGame()
const schedule2 = new ManageGame.getInstance()

console.log(schedule1 === schedule2)

/**
 * 单例模式的优点
 * 1.节约内存开支，与实例化的性能开支
 * 2.解决资源多重占用
 * 3.减少垃圾回收的压力
 * 单例模式的缺点
 * 1.扩展不友好
 * 2.与单一原则冲突
 * 使用场景
 * 1.实例化过程消耗过多的资源
 * 2.项目需要处于一个公共状态
 */
