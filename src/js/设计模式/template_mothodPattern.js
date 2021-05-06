/**
 * 智慧，不是生的默念，而是死的沉思
 *                                                                            --斯宾诺莎
 * 模板方法模式的特点
 * 1、有一个基本的操作流层，并且可以抽象出来
 * 2、一些共用的流程，就可以使用通用的公共步骤
 */


// var Beverage = function () {
//     if (new.target === Beverage) {
//         throw new Error('抽象类不能直接实例化')
//     }
// }

// Beverage.prototype.boilWater = function () {
//     console.log('水已经煮沸')
// }

// Beverage.prototype.brewDrink = function () {
//     throw new Error('抽象方法不能被调用')
// }

// Beverage.prototype.pourCup = function () {
//     console.log('倒进杯子里')
// }

// Beverage.prototype.addCondiment = function () {
//     throw new Error('抽象方法不能被调用')
// }

// Beverage.prototype.init = function () {
//     this.boilWater()
//     this.brewDrink()
//     this.pourCup()
//     this.addCondiment()
// }

// var Coffee = function () { }

// Coffee.prototype = Beverage.prototype

// Coffee.prototype.brewDrink = function () {
//     console.log('冲泡咖啡')
// }

// Coffee.prototype.addCondiment = function () {
//     console.log('加点咖啡伴侣')
// }


//ES6方法
class Beverage {
    constructor() {
        if (new.target === Beverage) {
            throw new Error('抽象类不能直接实例化!')
        }
    }

    boilWater() {
        console.log('水已经煮沸')
    }

    brewDrink() {
        throw new Error('抽象方法不能被调用')
    }
    pourCup() {
        console.log('倒进杯子里')
    }
    addCondiment() {
        throw new Error('抽象方法不能被调用')
    }
    init() {
        this.boilWater()
        this.brewDrink()
        this.pourCup()
        this.addCondiment()
    }
}

class Coffee extends Beverage {
    constructor() { super() }

    brewDrink() {
        console.log('冲泡咖啡')
    }

    addCondiment() {
        console.log('加点咖啡伴侣')
    }
}

var coffee = new Coffee()
coffee.init()


/* 虚拟方法 */
// const abstractFunc = function() { throw new Error('抽象方法不能调用!') }

// /* 饮料方法 */
// class Beverage {
//     constructor({ 
//                   brewDrink = abstractFunc,    // 冲泡饮料，抽象方法
//                   addCondiment = abstractFunc  // 加调味品，抽象方法
//                 }) {
//         this.brewDrink = brewDrink
//         this.addCondiment = addCondiment
//     }
    
//     /* 烧开水，共用方法 */
//     boilWater() { console.log('水已经煮沸') }
    
//     /* 倒杯子里，共用方法 */
//     pourCup() { console.log('倒进杯子里') }
  
//     /* 模板方法 */
//     init() {
//         this.boilWater()
//         this.brewDrink()
//         this.pourCup()
//         this.addCondiment()
//     }
// }

// /* 咖啡 */
// const coffee = new Beverage({
//     /* 冲泡饮料，覆盖抽象方法 */
//     brewDrink: function() { console.log('水已经煮沸') },
    
//     /* 加调味品，覆盖抽象方法 */
//     addCondiment: function() { console.log('加点咖啡伴侣') }
// })

// coffee.init()		// 执行模板方法

/**
 * 模板方法的优点
 * 1、封装了不变的部分，扩展可变部分
 * 2、提取了公共代码的部分，易于维护
 * 3、行为被父类模板方法固定
 * 模板方法的缺点
 * 1、增加了系统复杂度
 * 
 */