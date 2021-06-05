class eventsEmitter {
    constructor() {
        this.events = {}
    }
    // 实现订阅
    on(type, cb) {
        if(!this.events[type]) {
            this.events[type] = [cb]
        } else {
            this.events[type].push(cb)
        }
    }
    // 删除订阅
    off(type, cb) {
        if(!this.events[type]) return
        this.events[type] = this.events[type].filter(item => {
            return item !== cb
        })
    }
    // 只执行一次订阅操作
    once(type, cb) {
        const fn = (...rest) => {
            cb(...rest)
            this.off(type, fn)
        }
        this.on(type, fn)
    }
    // 触发事件
    emit(type, ...rest) {
        this.events[type] && this.events[type].forEach(cb => cb(...rest))
    }
}

const em = new eventsEmitter()

const handle1 = (...message) => {
    console.log('player-1' + message)
}
const handle2 = (...message) => {
    console.log('player-2' + message)
}
const handle3 = (...message) => {
    console.log('player-3' + message)
}
const handle4 = (...message) => {
    console.log('player-4' + message)
}

em.on('click', handle1)
em.on('click', handle2)
em.on('double', handle3)
em.once('double', handle4)
em.off('click', handle2)

em.emit('click', '点击了该元素')
em.emit('double', '双击了该元素')
em.emit('double', '双击了该元素')