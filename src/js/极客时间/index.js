// 作用域链 上下文 this值取向 
var bar = {
    myName: 'time.geekbang.com',
    printName: function() {
        console.log(this.myName)
    }
}

function foo() {
    debugger
    let myName = '极客时间'
    return bar.printName
}

var myName = '极客邦'
let _printName = foo()
_printName()
bar.printName()