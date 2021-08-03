// createElm.js

export default function createElm(vnode) {
    // 拿出 新创建的 vnode 中的 sel
    let node = document.createElement(vnode.sel)
    // 存在子节点
    // 子节点是文本
    if(
        vnode.text !== '' &&
        (vnode.children === undefined || vnode.children.length === 0)
    ) {
        node.textContext = vnode.text
    } else if(Array.isArray(vnode.children) && vnode.children.length > 0) {
        let chidren = vnode.children
        // 遍历children
        for(let i = 0; i < chidren.length; i++) {
            let ch = chidren[i]
            let chDom = createElm(ch)
            node.appendChild(chDom)
        }
    }
    vnode.elm = node
    return node
}