/**
 * 装配器模式
 * 1、装饰不影响原有的功能
 * 2、装饰可以增加多个，共同给目标添加额外功能
 */

// function OriginHouse() { }

// OriginHouse.prototype.getDesc = function () {
//     console.log('毛坯房')
// }

// function Furniture(house) {
//     this.house = house
// }

// Furniture.prototype.getDesc = function () {
//     this.house.getDesc()
//     console.log('搬入家具')
// }

// function Painting(house) {
//     this.house = house
// }

// Painting.prototype.getDesc = function () {
//     this.house.getDesc()
//     console.log('粉刷墙壁')
// }

// var house = new OriginHouse()
// house = new Furniture(house)
// house = new Painting(house)

// house.getDesc()


//ES6
// class OriginHouse{
//     getDesc(){
//         console.log('毛坯房')
//     }
// }

// class Furniture{
//     constructor(house){
//         this.house =house
//     }

//     getDesc(){
//         this.house.getDesc()
//         console.log('搬入家具')
//     }
// }

// class Painting{
//     constructor(house){
//         this.house = house
//     }

//     getDesc(){
//         this.house.getDesc()
//         console.log('粉刷墙壁')
//     }
// }

var originHouse = {
    getDesc() {
        console.log('毛坯房')
    }
}

function furniture() {
    console.log('搬入家具')
}

function painting() {
    console.log('墙壁粉刷')
}

originHouse.getDesc = function () {
    var getDesc = originHouse.getDesc
    return function () {
        getDesc()
        furniture()
    }
}()


originHouse.getDesc = function () {
    var getDesc = originHouse.getDesc
    return function () {
        getDesc()
        painting()
    }
}()

originHouse.getDesc()

/**
 * 装饰器模式的优点
 * 1、装饰者与被装饰者之间松耦合
 * 2、动态的增加和撤销功能
 * 3、有利于装饰器功能的复用
 * 4、创造不同行为和功能的结合体
 * 装饰器模式的缺点
 * 1、使用装饰器模式会产生很多细粒度的装饰者对象，这些装饰对象由于接口和功能的
 *   多样化导致系统复杂度增加，功能越复杂，需要的细粒度对象越多
 * 2、由于更大的灵活性，也更容易出错，特别是对于多级装饰漆场景，错误的定位复杂
 */



