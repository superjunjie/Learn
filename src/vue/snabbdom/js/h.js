// h.js

import vnode from  './vnode'


export default function h(a, b, c) {
    // 确认参数的个数
    if(arguments.length < 3) throw new Error('please check params length')
    // 第三个参数有不确定性 进行判断
    // 1.第三个参数是文本节点
    if(typeof c === 'string' || typeof c === 'number') {
        // 调用vnode 这里传入 text 进去
        // 返回值 {sel, data, children, text, elm}
        return vnode(a, b, undefined, c, undefined)
    } else if(Array.isArray(c)) {  // 第三个参数是数组 [h(),h()] [h(),text] 这些情况
        // 然而 数组里必须是h()函数
        // children 用来收集返回结果
        let children = []
        // 先判断里面是否都是h()执行的返回结果 如果是就添加到 chidren 里面
        for(let i = 0; i < c.length; i++) {
            // h() 的返回结果 是{} 而且 包含 sel
            if(!(typeof c[i] === 'object' && c[i].sel)) {
                throw new Error('第三个参数只能是h()函数')
            }
            children.push(c[i])
        }
        return vnode(a, b , children, undefined, undefined)
    } else if(typeof c === 'object' && c.sel) { // 第三个参数是 h 函数
        // 转成数组，方便统一处理
        let children = [c]
        return vnode(a, b, children, undefined, undefined)
    }
}
