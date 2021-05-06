/**
 * 既然我己经踏上了这条道路，那么，任何东西都不妨碍我沿着这条路走下去。
 *                                                                     --康德
 * 外观模式的特点
 * 1、一个统一的外观为复杂的子系统提供一个简单的高层功能接口
 * 2、原来访问者直接调用系统内部模块导致的复杂引用关系，现在可以通过只访问这个统一的外观来避免
 */

var uav = {
    //电子调速器
    diantiao1: {
        up() {
            console.log('电调1发送指令：电机1增大转速')
            uav.dianji1.up()
        },
        down() {
            console.log('电调1发送指令：电机1减小转速')
            uav.dianji1.down()
        }
    },
    diantiao2: {
        up() {
            console.log('电调2发送指令：电机2增大转速')
            uav.dianji2.up()
        },
        down() {
            console.log('电调1发送指令：电机2减小转速')
            uav.dianji2.down()
        }
    },
    diantiao3: {
        up() {
            console.log('电调3发送指令：电机3增大转速')
            uav.dianji3.up()
        },
        down() {
            console.log('电调1发送指令：电机3减小转速')
            uav.dianji3.down()
        }
    },
    diantiao4: {
        up() {
            console.log('电调4发送指令：电机4增大转速')
            uav.dianji1.up()
        },
        down() {
            console.log('电调4发送指令：电机4减小转速')
            uav.dianji4.down()
        }
    },
    dianji1: {
        up() { console.log('电机1增大转速') },
        down() { console.log('电机1减小转速') }
    },
    dianji2: {
        up() { console.log('电机2增大转速') },
        down() { console.log('电机2减小转速') }
    },
    dianji3: {
        up() { console.log('电机3增大转速') },
        down() { console.log('电机3减小转速') }
    },
    dianji4: {
        up() { console.log('电机4增大转速') },
        down() { console.log('电机4减小转速') }
    },

    controller:{
        up(){
            uav.diantiao1.up()
            uav.diantiao2.up()
            uav.diantiao3.up()
            uav.diantiao4.up()
        },

        forward(){
            uav.diantiao1.down()
            uav.diantiao2.down()
            uav.diantiao3.up()
            uav.diantiao4.up()
        },
        
        down(){
            uav.diantiao1.down()
            uav.diantiao2.down()
            uav.diantiao3.down()
            uav.diantiao4.down()
        },

        left(){
            uav.diantiao1.up()
            uav.diantiao2.down()
            uav.diantiao3.up()
            uav.diantiao4.down()
        }
    }
}

uav.controller.up()
uav.controller.left()
uav.controller.down()

// function domBindEvent(node, type, selector, fn){
//     if(fn === undefined){
//         fn = selector
//         selector = null
//     }
// }

/**
 * 外观模式的优点
 * 1、访问者不需要再了解子系统内部模块的功能，使访问子系统变得简单
 * 2、访问者与子系统中模块之间的松耦合
 * 3、更好的划分系统访问层次
 * 外观模式的缺点
 * 1、不符合开放封闭原则。对修改关闭，对扩展开放
 * 2、不需要或不合理的使用外观模式会让人迷惑，过犹不及
 * 外观模式的适用场景
 * 1、维护复杂和难以理解的遗留系统，为复杂的系统提供清晰地接口
 * 2、使用外观模式提供大功能
 * 3、团队协作，简化使用、方便交流
 * 4、简化层级调用，松散层间耦合
 */
