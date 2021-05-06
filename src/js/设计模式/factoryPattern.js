/**
 * 工厂模式
 * 1.访问者只需要知道产品名，就可以从工厂获得对应的实例
 * 2.访问者不关心实例创建的过程
 */

/**
 * 饭店方法
 function restaurant(menu) {
     switch (menu) {
         case '鱼香肉丝':
             return new YuXiangRouSi()
         case '宫保鸡丁':
             return new GongBaoJiDin()
         default:
             throw new Error('这个菜本店没有哟^-^')
     }
 }
 function YuXiangRouSi() {
     this.type = '鱼香肉丝'
 }
 YuXiangRouSi.prototype.eat = function () {
     console.log(`艾玛，${this.type} 真香~`)
 }
 
 function GongBaoJiDin() {
     this.type = '宫保鸡丁'
 }
 GongBaoJiDin.prototype.eat = function () {
     console.log(`${this.type}让我想起外婆做的菜~`)
 }
 */

/**
 * ES6方法
 class Restaurant {
     static getMenu(menu) {
         switch (menu) {
             case '鱼香肉丝':
                 return new YuXiangRouSi()
             case '宫保鸡丁':
                 return new GongBaoJiDin()
             default:
                 throw new Error('这个菜本店没有哟^-^')
         }
     }
 }
 
 class YuXiangRouSi {
     constructor() {
         this.type = '鱼香肉丝'
     }
     eat() {
         console.log(`艾玛，${this.type} 真香~`)
     }
 }
 class GongBaoJiDin {
     constructor() {
         this.type = '宫保鸡丁'
     }
     eat() {
         console.log(`${this.type}让我想起外婆做的菜~`)
     }
    }
// const dish1 = restaurant('鱼香肉丝')
// dish1.eat()
// const dish2 = restaurant('麻婆豆腐')
 */


//饭店方法
class Restaurant {
    constructor() {
        this.menuData = {}
    }

    //创建菜品
    getMenu(menu) {
        if (!this.menuData[menu]) {
            throw new Error('这个菜本店没有QWQ')
        }
        const { type, message } = this.menuData[menu]
        return new Menu(type, message)
    }

    //增加菜品种类
    addMenu(menu, type, message) {
        if (this.menuData[menu]) {
            console.log('已经有这个菜了')
        }
        this.menuData[menu] = { type, message }
    }

    //移除菜品
    removeMenu(menu) {
        if (!this.menuData[menu]) return
        delete this.menuData[menu]
    }
}

class Menu {
    constructor(type, message) {
        this.type = type
        this.message = message
    }
    eat() {
        console.log(this.type + this.message)
    }
}

const restaurant = new Restaurant()
restaurant.addMenu('YuXiangRusi', '鱼香如丝', '真香~')
restaurant.addMenu('GongBaoJiDin', '宫保鸡丁', '让我想起外婆做的菜~')

const dish1 = restaurant.getMenu('YuXiangRusi')
dish1.eat()
const dish2 = restaurant.getMenu('LaZiJi')

class Factory {
    static getInstance(type) {
        switch (type) {
            case 'Product1':
                return new Product1()
            case 'Product2':
                return new Product2()
            default:
                throw new Error('当前没有这个产品')
        }
    }
}

class Product1 {
    constructor() {
        this.type = 'Product1'
    }
    operate(){
        console.log(this.type)
    }
}

class Product2 {
    constructor() {
        this.type = 'Product2'
    }
    operate(){
        console.log(this.type)
    }
}


/**
 * 工厂模式的优点
 * 1.良好的封装，代码结构清晰，访问者无需知道对象的创建流程，特别是创建比较复杂的情况
 * 2.扩展性优良，通过工厂方法隔离了用户和创建流程隔离, 符合开放封闭原则
 * 3.解耦了高层逻辑和底层产品类， 符合最少知识原则
 * 工厂模式缺点
 * 1.带来额外的系统复杂度，增加了抽象性
 * 使用场景
 * 1.对象创建比较复杂
 * 2.处理大量具有相同属性的小对象
 */
