/**
 * 合理的安排时间，就等于节约时间
 *    
 * 中介者模式的特点                                                              --培根
 * 1、目标对象关系复杂，引入中介者对极大方便各方之间沟通
 * 2、目标对象对象如果有什么想法上的变更或新的要求，可以通过中介者及时通知到相关各方
 */

// class Person {
//     constructor(name, info, target) {
//         this.name = name
//         this.info = info
//         this.target = target
//         this.enemyList = []
//     }

//     //注册相亲对象的家长
//     registEnemy(...enemy) {
//         this.enemyList.push(...enemy)
//     }

//     //检查所有相亲对象及其家长的条件
//     checkAllPurpose() {
//         this.enemyList.forEach(enemy => enemy.info && this.checkPurpose(enemy))
//     }

//     //检查对方是否满足自己的要求，并发信息
//     checkPurpose(enemy) {
//         const result = Object.keys(this.target)
//             .every(key => {
//                 const [low, high] = this.target[key]
//                 return low <= enemy.info[key] && enemy.info[key] <= high
//             })
//         enemy.receiveResult(result, this, enemy)
//     }

//     receiveResult(result, they, me) {
//         result
//             ? console.log(`${they.name}: 我觉得合适~ \t (我的要求 ${me.name} 已经满足)`)
//             : console.log(`${they.name}: 你是个好人！ \t (我的要求 ${me.name} 不能满足！)`)
//     }
// }

// const ZhangXiaoShuai ={
//     '张大炮',
//     { age: 25, height: 171, salary: 5000 },
//     { age: [23, 27] }
// )

// const ZhangXiaoShuaiParent ={
//     '张大炮家长',
//     null,
//     { height: [160, 167] }
// )

// const LiXiaoMei ={
//     '李小梅',
//     { age: 23, height: 161 },
//     { age: [25, 27] }
// )

// const LiXiaoMeiParent ={
//     '李小梅家长',
//     null,
//     { salary: [10000, 20000] }
// )

// ZhangXiaoShuai.registEnemy(LiXiaoMei, LiXiaoMeiParent)
// ZhangXiaoShuaiParent.registEnemy(LiXiaoMei, LiXiaoMeiParent)
// LiXiaoMei.registEnemy(ZhangXiaoShuai, ZhangXiaoShuaiParent)
// LiXiaoMeiParent.registEnemy(ZhangXiaoShuai, ZhangXiaoShuaiParent)

// ZhangXiaoShuai.checkAllPurpose()
// ZhangXiaoShuaiParent.checkAllPurpose()
// LiXiaoMei.checkAllPurpose()
// LiXiaoMeiParent.checkAllPurpose()


const ZhangXiaoShuai = {
    name: '张大炮',
    family: '张大炮家',
    info: { age: 25, height: 171, salary: 5000 },
    target: { age: [23, 27] }
}

const ZhangXiaoShuaiParent = {
    name: '张大炮家长',
    family: '张大炮家',
    info: null,
    target: { height: [160, 167] }
}

const LiXiaoMei = {
    name: '李小梅',
    family: '李小梅家',
    info: { age: 23, height: 161 },
    target: { age: [25, 27] }
}

const LiXiaoMeiParent = {
    name: '李小梅家长',
    family: '李小梅家',
    info: null,
    target: { salary: [10000, 20000] }
}


const MatchMaker = {
    matchBook: {},

    registPerson(...personList) {
        personList.forEach(person => {
            if (this.matchBook[person.family]) {
                this.matchBook[person.family].push(person)
            } else this.matchBook[person.family] = [person]
        })
    },

    checkAllPurpose() {
        Object.keys(this.matchBook).forEach((familyName, idx, matchList) => {
            matchList.filter(match => match !== familyName)
                .forEach(enemyFamily => this.matchBook[enemyFamily]
                    .forEach(enemy => this.matchBook[familyName]
                        .forEach(person =>
                            enemy.info && this.checkPurpose(person, enemy))))
        })
    },

    checkPurpose(person, enemy) {
        const result = Object.keys(person.target)
            .every(key => {
                const [low, high] = person.target[key]
                return low <= enemy.info[key] && enemy.info[key] <= high
            })
        this.receiveResult(result, person, enemy)
    },

    receiveResult(result, person, me) {
        result
            ? console.log(`${person.name}: 我觉得合适~ \t (我的要求 ${me.name} 已经满足)`)
            : console.log(`${person.name}: 你是个好人！ \t (我的要求 ${me.name} 不能满足！)`)
    }
}

MatchMaker.registPerson(ZhangXiaoShuai, ZhangXiaoShuaiParent, LiXiaoMei, LiXiaoMeiParent)
MatchMaker.checkAllPurpose()

/**
 * 中介者模式的优点
 * 1、松散的耦合，降低了同事之间的相互依赖和耦合
 * 2、一会多关系转变为一对一关系
 * 3、进行同事对象间的访问控制，功能扩展
 * 2、简化同时对象的设计和实现
 * 中介者模式的缺点
 * 1、逻辑过度集中，不利于维护
 * 使用场景
 * 1、当多个对象之间的引用关系变成网状结构时，可以考虑引入中介者模式
 */