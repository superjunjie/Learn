/**
 * 建造者模式(Builder Pattern)
 * 特点
 * 1.整车制造厂(指挥者)无需知道零件的生产过程，零部件的生产过程一般由零部件厂商(建造者)来完成
 * 2.整车制造厂(指挥者)决定以怎样的方式来装配零部件
 */


//建造者，汽车部件厂家，提供具体零部件生产
function CarBuilder({ color = 'white', weight = 0 }) {
    this.color = color
    this.weight = weight
}

//生产部件，轮胎
CarBuilder.prototype.buildTyre = function (type) {
    const tyre = {}
    switch (type) {
        case 'small':
            tyre.tyreType = '小号轮胎'
            tyre.tyreInfo = '正在使用小号轮胎'
            break
        case 'normal':
            tyre.tyreType = '中号轮胎'
            tyre.tyreInfo = '正在使用中号轮胎'
        case 'big':
            tyre.tyreType = '大号轮胎'
            tyre.tyreInfo = '正在使用大号轮胎'
    }
    this.tyre = tyre
}

//生产部件， 发动机
CarBuilder.prototype.buildEngine = function (type) {
    const engine = {}
    switch (type) {
        case 'small':
            engine.engineType = '小号引擎'
            engine.engineInfo = '正在使用小号引擎'
            break
        case 'normal':
            engine.engineType = '中号引擎'
            engine.engineInfo = '正在使用中号引擎'
        case 'big':
            engine.engineType = '大号引擎'
            engine.engineInfo = '正在使用大号引擎'
    }
    this.engine = engine
}

//奔驰厂家，负责汽车装配
function benChiDirector(tyre, engine, param) {
    var _car = new CarBuilder(param)
    _car.buildTyre(tyre)
    _car.buildEngine(engine)
    return _car
}

//获得产品实例
var benchi1 = benChiDirector('small', 'big', { color: 'black', weight: '1900kg' })

console.log(benchi1)

//ES6实现
class CarBuilder {
    constructor({ color = 'white', weight = 0 }) {
        this.color = color
        this.weight = weight
    }

    buildTyre(type){
        const tyre = {}
        switch (type) {
            case 'small':
                tyre.tyreType = '小号轮胎'
                tyre.tyreInfo = '正在使用小号轮胎'
                break
            case 'normal':
                tyre.tyreType = '中号轮胎'
                tyre.tyreInfo = '正在使用中号轮胎'
            case 'big':
                tyre.tyreType = '大号轮胎'
                tyre.tyreInfo = '正在使用大号轮胎'
        }
        this.tyre = tyre
        return this
    }

    buildEngine(type){
        const engine = {}
        switch (type) {
            case 'small':
                engine.engineType = '小号引擎'
                engine.engineInfo = '正在使用小号引擎'
                break
            case 'normal':
                engine.engineType = '中号引擎'
                engine.engineInfo = '正在使用中号引擎'
            case 'big':
                engine.engineType = '大号引擎'
                engine.engineInfo = '正在使用大号引擎'
        }
        this.engine = engine
        return this
    }
}

/**
 * 建造者模式的优点
 * 1、使产品的构建流程和产品的表现分离
 * 2、扩展方便
 * 3、更好的复用性
 * 建筑者模式的缺点
 * 1、如果产品差异大、复用性不高
 * 2、使用与小粒度对象
 * 使用场景
 * 1、相同的方法， 不同的执行顺序， 产生的不一样的产品
 * 2、产品的组成部件类似，可以通过不同的组件获得不同的产品
 */