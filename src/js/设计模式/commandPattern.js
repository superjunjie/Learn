/**
 * 世界上最宽阔的是海洋，比海洋更宽阔的是天空，比天空更宽阔的是人的胸怀
 *                                                                      --雨果
 * 命令模式的特点
 * 1、将命令发送者和接受者解耦
 * 2、对命令还可以进行撤销、排队操作
 */

var canvas = document.getElementById('my-canvas')
var CanvasWidth = 400    // 画布宽度
var CanvasHeight = 400   // 画布高度
var CanvasStep = 40      // 动作步长
canvas.width = CanvasWidth
canvas.height = CanvasHeight

// 移动对象类
var Role = function (x, y, imgSrc) {
    this.position = { x, y }
    this.canvas = document.getElementById('my-canvas')

    this.ctx = this.canvas.getContext('2d')
    this.img = new Image()
    this.img.style.width = CanvasStep
    this.img.style.height = CanvasStep
    this.img.src = imgSrc
    this.img.onload = () => {
        this.ctx.drawImage(this.img, x, y, CanvasStep, CanvasStep)
        this.move(0, 0)
    }
}

Role.prototype.move = function (x, y) {
    var pos = this.position
    if (pos.x + x >= 0 && pos.x + x < 400 && pos.y + y >= 0 && pos.y + y < 400) {
        this.ctx.clearRect(pos.x, pos.y, CanvasStep, CanvasStep)
        pos.x += x
        pos.y += y
        this.ctx.drawImage(this.img, pos.x, pos.y, CanvasStep, CanvasStep)
        console.log(pos)
    }
}

var mario = new Role(200, 200, 'images/mario.jpg')

// 设置按钮回调
var elementUp = document.getElementById('up-btn')
elementUp.onclick = function () {
    mario.move(0, -CanvasStep)
}

var elementDown = document.getElementById('down-btn')
elementDown.onclick = function () {
    mario.move(0, CanvasStep)
}

var elementLeft = document.getElementById('left-btn')
elementLeft.onclick = function () {
    mario.move(-CanvasStep, 0)
}

var elementRight = document.getElementById('right-btn')
elementRight.onclick = function () {
    mario.move(CanvasStep, 0)
}

/**
 * 命令模式的优点
 * 1、命令模式将调用命令的请求对象与执行该命令的接收对象解耦，因此系统的可扩展性良好，加入新的命令不影响原有逻辑，所以增加新的命令也很容易
 * 2、命令对象可以被不同的请求者角色重用，方便复用
 * 3、可以将命令记入日志，根据日志可以容易地实现对命令的撤销和重做
 * 命令模式的缺点
 * 1、命令类或者命令对象随着命令的变多而膨胀，如果命令对象很多
 * 使用场景
 * 1、需要将请求调用者和请求的接收者解耦的时候；
 * 2、需要将请求排队、记录请求日志、撤销或重做操作时；
 */
