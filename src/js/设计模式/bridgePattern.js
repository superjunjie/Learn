/**
 * 什么是路? 就是从没路的地方践踏出来的，从只有荆棘的地方开辟出来的。
 *                                                                      --鲁迅
 * 桥接模式的特点
 * 1、将抽象与现实分离，互相独立互不影响
 * 2、产品有多个维度(部件)，每个维度都可独立变化(实例化过程)
 */

//组装洗衣机
// function Washer(motorType, rollerType, transducerType) {
//     this.motor = new Motor(motorType)
//     this.roller = new Roller(rollerType)
//     this.transducer = new Transducer(transducerType)
// }

// Washer.prototype.work = function () {
//     this.motor.run()
//     this.roller.run()
//     this.transducer.run()
// }

// function Motor(type) {
//     this.motorType = type + '电机'
// }

// Motor.prototype.run = function () {
//     console.log(this.motorType + '开始工作')
// }

// function Roller(type) {
//     this.rollerType = type + '滚筒'
// }

// Roller.prototype.run = function () {
//     console.log(this.rollerType + '开始工作')
// }

// function Transducer(type) {
//     this.transducerType = type + '变频器'
// }

// Transducer.prototype.run = function () {
//     console.log(this.transducerType + '开始工作')
// }



//ES6实现
class Washer {
    constructor(motorType, rollerType, transducerType) {
        this.motor = new Motor(motorType)
        this.roller = new Roller(rollerType)
        this.transducer = new Transducer(transducerType)
    }

    work() {
        this.motor.run()
        this.roller.run()
        this.transducer.run()
    }
}

class Motor {
    constructor(type) {
        this.motorType = type + '电机'
    }

    run() {
        console.log(this.motorType + '开始工作')
    }
}

class Roller {
    constructor(type) {
        this.rollerType = type + '滚筒'
    }
    run() {
        console.log(this.rollerType + '开始工作')
    }
}

class Transducer {
    constructor(type) {
        this.transducerType = type + '变频器'
    }
    run() {
        console.log(this.transducerType + '开始工作')
    }
}

var washerA = new Washer('小功率', '直立', '小功率')
washerA.work()

var btn = document.createElement('button')
var text = document.createTextNode('确认')
btn.appendChild(text)

function setColor(element, color = 'black', bgc = 'lightgray') {
    element.style.setProperty('color', color)
    element.style.setProperty('background-color', bgc)
}

function setSize(element, size = '1') {
    element.style.setProperty('transform', `scale(${size})`)
}

btn.addEventListener('mouseover', () => {
    setColor(btn, 'blue', 'green')
    setSize(btn, '1.5')
})

btn.addEventListener('mouseleave', () => {
    setColor(btn)
    setSize(btn)
})

btn.addEventListener('mousedown', () => {
    setColor(btn, 'red', 'purple')
    setSize(btn, '.5')
})

btn.addEventListener('mouseup', () => {
    setColor(btn)
    setSize(btn)
})


document.body.appendChild(btn)

/**
 * 桥接模式的优点
 * 1、有利于分层
 * 2、提高了特扩展性
 * 3、使用者不用关心细节的实现
 * 桥接模式的缺点
 * 1、桥接模式要求两个部件没有耦合关系，否则无法独立地变化
 * 2、桥接模式的引入增加了系统的复杂度
 * 桥接模式的使用场景
 * 1、如果产品有独立的变化维度，可以考虑桥接模式
 * 2、不希望产品继承，或因为多层次继承导致系统类的个数急剧增加的系统
 * 3、产品不见得粒度越细，部件复用的必要性就越大，可以考虑桥接模式
 */