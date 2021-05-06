/**
 * 享元模式特点
 * 1、目标对象具有一些共同的特性
 * 2、这些共同的状态所对应的对象，可以被共享出来
 */

// var candidateNum = 10
// var examCarNum = 0

// //驾考车构造函数
// function ExamCar(carType) {
//     examCarNum++
//     this.carld = examCarNum
//     this.carType = carType ? '自动挡' : '手动挡'
// }

// ExamCar.prototype.examine = function (candidateld) {
//     console.log(`考生-${candidateld}在${this.carType}驾考车${this.carld}上考试`)
// }

// var manualExamCar = new ExamCar(true)
// var autoExamCar = new ExamCar(false)


// for (var candidateld = 1; candidateld <= candidateNum; candidateld++) {
//     var examCar = candidateld % 2 ? manualExamCar : autoExamCar
//     examCar.examine(candidateld)
// }


// console.log('叫考车总数 - ' + examCarNum)

let examCarNum = 0

//叫考车对象
class ExamCar {
    constructor(carType) {
        examCarNum++
        this.carld = examCarNum
        this.carType = carType ? '手动挡' : '自动挡'
        this.usingState = false
    }

    //在本车上考试
    examine(candidateld) {
        return new Promise((resolve => {
            this.usingState = true
            console.log(`考生-${candidateld}在${this.carType}驾考车${this.carld}上考试`)
            setTimeout(() => {
                this.usingState = false
                console.log(`%c考生- ${candidateld} 在${this.carType}驾考车- ${this.carld} 上考试完毕`, 'color:#f40')
                resolve()
            }, Math.random() * 2000);
        }))
    }
}

//手动挡汽车对象池
ManualExamCarPool = {
    _pool: [],
    _candidateQueue: [],

    //注册考生 ID 列表
    registCandidates(candidateList) {
        candidateList.forEach(candidateld => this.registCandidate(candidateld))
    },

    //注册手动挡考生
    registCandidate(candidateld) {
        const examCar = this.getManualExamCar()
        if (examCar) {
            examCar.examine(candidateld)
                .then(() => {
                    const nextCandidateld = this._candidateQueue.length && this._candidateQueue.shift()
                    nextCandidateld && this.registCandidate(nextCandidateld)
                })
        } else this._candidateQueue.push(candidateld)
    },

    //注册手动挡车
    initManualExamCar(manualExamCarNum){
        for(let i=1;i<=manualExamCarNum;i++){
            this._pool.push(new ExamCar(true))
        }
    },

    getManualExamCar(){
        return this._pool.find(car => !car.usingState)
    }
}

ManualExamCarPool.initManualExamCar(3)
ManualExamCarPool.registCandidates([1,2,3,4,5,6,7,8,9,10])

/**
 * 享元模式的优点
 * 1、减少系统中对象的数量
 * 2、外部状态相对独立
 * 享元模式的缺点
 * 1、引入共享对象，使对象数据结构变得复杂
 * 2、共享对象的创建、销毁等需要维护、带来额外的复杂度
 * 享元模式的适用场景
 * 1、一个程序中大量使用了相同或相似的对象
 * 2、对象的大部分状态可以转变为外部状态
 * 3、剥离出对象的外部状态后，可以使用相对较少的共享对象取代大量对象
 */