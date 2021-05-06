/**
 * 学习知识要善于思考，思考，在思考
 *                                                                             --爱因斯坦
 * 发布订阅者模式(观察者模式)特点
 * 1、买家（订阅者)只要声明对消息的一次订阅
 * 2、售货员(发布者)持有一个订阅者列表，复杂订阅者的添加和删除
 * 3、一对多 多对多
 */

const adidasPub = {
    adidasBook: [],
    subShoe(customer) {
        if (!this.adidasBook.includes(customer)) {
            this.adidasBook.push(customer)
        }
    },

    unSubShoe(customer) {
        if (!this.adidasBook.includes(customer)) return
        const idx = this.adidasBook.indexOf(customer)
        this.adidasBook.splice(idx, 1)
    },

    notify() {
        for (const customer of this.adidasBook) {
            customer.update()
        }
    }
}

const customer1 = {
    phoneNumber: '15345678908',
    update() {
        console.log(this.phoneNumber + ': 去商场看看')
    }
}

const customer2 = {
    phoneNumber: '158345678908',
    update() {
        console.log(this.phoneNumber + ': 给弟弟买双')
    }
}

adidasPub.subShoe(customer1)
adidasPub.subShoe(customer1)
adidasPub.subShoe(customer2)
adidasPub.unSubShoe(customer1)

adidasPub.notify()


//ES6
class Publisher {
    constructor() {
        this._subMap = {}
    }
    subscribe(type, cb) {
        if (this._subMap[type]) {
            if (!this._subMap[type].includes(cb)) {
                this._subMap[type].push(cb)
            }
        } else {
            this._subMap[type] = [cb]
        }
    }

    unSubscribe(type, cb) {
        if (!this._subMap[type] || !this._subMap[type].includes(cb)) return
        const idx = this._subMap[type].indexOf(cb)
        this._subMap[type].splice(idx, 1)
    }

    notify(type, ...playload) {
        if (!this._subMap[type]) return
        this._subMap[type].forEach(cb => cb(...playload))
    }
}

const adidas = new Publisher()

adidas.subscribe('运动鞋', message => console.log('15823457896' + message))
adidas.subscribe('运动鞋', message => console.log('13523457896' + message))
adidas.subscribe('帆布鞋', message => console.log('13823457896' + message))

adidas.notify('运动鞋', '运动鞋到货了~')
adidas.notify('帆布鞋', '帆布鞋售空了T-T')


/**
 * 发布-订阅模式的优点
 * 1、时间上的解耦
 * 2、空间上的解耦
 * 发布-订阅模式的缺点
 * 1、增加消耗
 * 2、增加复杂度
 */