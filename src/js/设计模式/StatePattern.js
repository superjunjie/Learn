/**
 * 时间就像海绵里的水，只要挤总会有的
 *                                                                        --鲁迅(这话我没说过)
 * 状态模式的特点
 * 1、对象有有限个状态，且状态之间可以相互切换
 * 2、各种状态和对象的行为逻辑有比较强的对应关系
 */

// var trafficLight = (function () {
//     var state = '绿灯'

//     return {
//         setState: function (target) {
//             if (target === '红灯') {
//                 state = '红灯'
//                 console.log('交通灯颜色变为 红色，行人通行 & 车辆等待')
//             } else if (target === '绿灯') {
//                 state = '绿灯'
//                 console.log('交通灯变为 绿色，行人等待 & 车辆出行')
//             } else if (target === '黄灯') {
//                 state = '黄灯'
//                 console.log('交通灯颜色变为 黄色，行人等待 & 车辆等待')
//             } else {
//                 console.log('鸡你太美')
//             }
//         },
//         getState: function () {
//             return state
//         }
//     }
// })()

//抽象状态类
var AbstractSate = function () { }

//抽象方法
AbstractSate.prototype.employ = function () {
    throw new Error('抽象方法不能调用')
}

//交通灯状态类
var State = function (name, desc) {
    this.color = { name, desc }
}

State.prototype = new AbstractSate()
State.prototype.employ = function (trafficLight) {
    console.log(`交通灯颜色变为 ${this.color.name}, ${this.color.desc}`)
    trafficLight.setState(this)
}

var TrafficLight = function () {
    this.state = null
}

TrafficLight.prototype.getState = function () {
    return this.state
}

TrafficLight.prototype.setState = function (state) {
    this.state = this.state
}



//ES6实现
class AbstractSate{
    constructor(){
        if(new.target == AbstractSate){
            throw new Error('抽象类不能直接实例化！')
        }
    }

    employ(){
        throw new Error('抽象方法不能直接调用')
    }
}

class State extends AbstractSate{
    constructor(name, desc){
        this.color = {name, desc}
    }

    employ(trafficLight){
        console.log(`交通灯颜色变为 ${this.color.name}, ${this.color.desc}`)
        trafficLight.setState(this)
    }
}

class TrafficLight{
    constructor(){
        this.state = null
    }

    getState(){
        return this.state
    }

    setState(state){
        this.state = state
    }
}

var trafficLight = new TrafficLight()

var redState = new State('红灯', '行人通行 & 车辆等待')
var greenState = new State('绿灯', '行人等待 & 车辆通行')
var yellowState = new State('黄灯', '行人等待 & 车辆等待')

redState.employ(trafficLight)
yellowState.employ(trafficLight)
greenState.employ(trafficLight)

/**
 * 状态模式的优点
 * 1、结构相比之下清晰
 * 2、符合开放封闭原则
 * 3、封装性良好
 * 状态模式的缺点
 * 1、引入多于的类，每个状态都有对应的类
 * 状态模式的适用场景
 * 1、操作中包含庞大的多分支语句，且这些分支依赖该对象的状态
 * 2、对象的行为随着状态改变而改变
 */

