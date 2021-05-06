/**
 * 抽象工厂(Abstract Factory):通过对类的工厂抽象使其业务用于对产品类的创建
 * 而不是负责创建某一类产品的实例。关键在于使用抽象类制定了实例的结构， 调用者直接
 * 实例编程，从实例的具体实现中解耦
 */

class AbstractClass1 {
    constructor() {
        if (new.target === AbstractClass1) {
            throw new Error('抽象类不能直接实例化')
        }
    }

    //抽象方法
    operate() {
        throw new Error('抽象类不能直接实例化!')
    }
}
//抽象类，ES5构造函数式
var AbstractClass2 = function () {
    if (new.target === AbstractClass2) {
        throw new Error('抽象类不能直接实例化!')
    }
}


// //饭店方法
// function Restaurant() { }

// Restaurant.orderDish = function (type) {
//     switch (type) {
//         case '鱼香肉丝':
//             return new YuXiangRouSi()
//         case '宫保鸡丁':
//             return new GongBaoJiDin()
//         default:
//             throw new Error('这个菜本店没有哟^-^')
//     }
// }

// //菜品抽象类
// function Dish() { this.kind = '菜' }

// Dish.prototype.eat = function () { throw new Error('抽象方法不可调用') }

// //鱼香肉丝类
// function YuXiangRouSi() { this.type = '鱼香肉丝' }

// YuXiangRouSi.prototype = new Dish()

// YuXiangRouSi.prototype.eat = function () {
//     console.log(`${this.kind}——${this.type}真香~`)
// }

// //宫保鸡丁类
// function GongBaoJiDin() { this.type = '宫保鸡丁' }

// GongBaoJiDin.prototype = new Dish()

// GongBaoJiDin.prototype.eat = function () {
//     console.log(`${this.kind}——${this.type}让我想起了外婆做的菜QWQ`)
// }

//ES6方法
// class Dish {
//     constructor() {
//         if (new.target === Dish) {
//             throw new Error('抽象方法不能直接实例化')
//         }
//         this.kind = '特色菜'
//     }
//     eat() {
//         throw new Error('抽象方法不能直接调用')
//     }
// }

// class YuXiangRouSi extends Dish {
//     constructor() {
//         super()
//         this.type = '鱼香肉丝'
//     }
//     eat() {
//         console.log(`${this.kind}——${this.type}真香~`)
//     }
// }

// class GongBaoJiDin extends Dish {
//     constructor() {
//         super()
//         this.type = '宫保鸡丁'
//     }
//     eat() {
//         console.log(`${this.kind}——${this.type}让我想起了外婆做的菜QWQ`)
//     }
//}


// const dish1 = Restaurant.orderDish('鱼香肉丝')
// dish1.eat()

class AbstractRestaurant {
    constructor() {
        if (new.target === AbstractRestaurant) {
            throw new Error('抽象方法不能直接实例化')
        }
    }

    createDish() {
        throw new Error('抽象方法不能直接调用')
    }

    createSoup() {
        throw new Error('抽象方法不能直接调用')
    }
}

class Restaurant extends AbstractRestaurant {
    constructor() {
        super()
    }

    createDish(type) {
        switch (type) {
            case '鱼香肉丝':
                return new YuXiangRouSi()
            case '宫保鸡丁':
                return new GongBaoJiDin()
            default:
                throw new Error('这个菜本店没有哟^-^')
        }
    }

    createSoup(type){
        switch (type) {
            case '紫菜蛋花汤':
                return new ZiCaiDanHuaTang()
            case '老番茄汤':
                return new LaoFanQieTang()
            default:
                throw new Error('这个菜本店没有哟^-^')
        }
    }
}

class AbstractDish{
    constructor(){
        if(new.target === AbstractDish){
            throw new Error('抽象方法不能直接调用')
        }
        this.kind = '家乡菜'
    }
    eat(){
        throw new Error('抽象方法不能直接调用')
    }
}

class YuXiangRouSi extends AbstractDish{
    constructor(){
        super()
        this.type = '鱼香肉丝'
    }
    eat(){
        console.log(`${this.kind}——${this.type}真香~`)
    }
}

class GongBaoJiDin extends AbstractDish{
    constructor(){
        super()
        this.type = '宫保鸡丁'
    }
    eat(){
        console.log(`${this.kind}——${this.type}让我想起了外婆做的菜QWQ`)
    }
}

class AbstractSoup{
    constructor(){
        if(new.target === AbstractSoup){
            throw new Error('抽象方法不能直接调用')
        }
        this.kind = '家乡汤'
    }
    drink(){
        throw new Error('抽象方法不能直接调用')
    }
}

class ZiCaiDanHuaTang extends AbstractSoup{
    constructor(){
        super()
        this.type='紫菜蛋花汤'
    }
    drink(){
        console.log(`${this.kind}——${this.type}我从小喝到大~~`)
    }
}


class LaoFanQieTang extends AbstractSoup{
    constructor(){
        super()
        this.type='老番茄汤'
    }
    drink(){
        console.log(`${this.kind}——${this.type}我从小喝到大~~`)
    }
}
const restaurant = new Restaurant()
const soup1 = restaurant.createSoup('紫菜蛋花汤')
soup1.drink()


/**
 * 抽象工厂的优点
 * 1、从产品的具体实现中解耦
 * 抽象工厂的缺点
 * 1、扩展新的类族比较困难
 * 2、带来了系统复杂度，增加了新的类，和新的继续继承关系
 * 使用场景
 * 1、如果一组实例都具有相同的结构，那么就可以使用抽象工厂
 */


 