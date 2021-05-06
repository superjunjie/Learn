/**
 * 职责链模式的特点
 * 1、请求在对象中传递
 * 2、链中的请求接受者队请求进行分析，要么处理这个请求，要么把这个请求传递给链的下一个接受者
 */

class Leader {
    constructor() {
        this.nextLeader = null
    }
    setNext(next) {
        this.nextLeader = next
        return next
    }
}

class GroupLeader extends Leader {
    handle(duration) {
        if (duration <= 0.5) {
            console.log('小领导经过一番心理斗争：同意了')
        } else {
            this.nextLeader.handle(duration)
        }
    }
}

class DepartmentLeader extends Leader {
    handle(duration) {
        if (duration <= 1) {
            console.log('部门经理进过一番心理斗争：同意了')
        } else {
            this.nextLeader.handle(duration)
        }
    }
}

class GeneraLeader extends Leader{
    handle(duration){
        if(duration <= 2){
            console.log('批准')
        }else{
            console.log('不可以哟')
        }
    }
}

const zhangsan = new GroupLeader()
const lisi = new DepartmentLeader()
const wangwu = new GeneraLeader()

zhangsan.setNext(lisi).setNext(wangwu)

zhangsan.handle(0.5)
zhangsan.handle(1)
zhangsan.handle(2)

/**
 * 职责链模式的优点
 * 1、请求的发送者和接受者是解耦的
 * 2、通过改变链内的结点或调整结点顺序，可以动态修改责任链，符合开放封闭的原则
 * 职责链模式的缺点
 * 1、并不能保证请求一定会被处理，有可能到最后一个节点还不能处理
 * 2、调试不便，调用层次会比较深，也有可能会导致循环引用
 * 职责链模式的适用场景
 * 1、需要多个对象可以处理同一个请求，具体该请求油那个对象处理在运行时才确定
 * 2、在不明确接受者的情况下，想多个对象中的其中一个提交请求的话，可以使用职责链模式
 * 3、如果想要动态请求指定处理一个请求对象集合，可以使用职责链模式
 */