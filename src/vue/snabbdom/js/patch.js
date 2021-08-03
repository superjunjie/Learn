// patch.js

import createElm from "./createElm";
import sampleVnode from "./sample-vnode";
import vnode from "./vnode";

/**
 * 
 * @param {vnode/DOM} oldVnode 
 * @param {vnode} newVnode 
 */
export default function patch(oldVnode, newVnode) {
    // 1.判断oldvnode是否为虚拟节点 如果不是将其转为虚拟节点
    if(!oldVnode.sel) {
        oldVnode = emptyNodeAt(oldVnode)
    }
    // 2.判断oldVnode和newVnode是否为sampleVnode
    if(sampleVnode(oldVnode, newVnode)) {
        // 是同一个虚拟节点 调用我们写的 patchVnode.js 中的方法
    } else {
        // 不是同一个虚拟节点 直接暴力替换上新的节点
        let newNode = createElm(newVnode)
        // 旧节点的父节点
        if(oldVnode.elm.parentNode) {
            let parentNode = oldVnode.elm.parentNode
            // 添加到真实的DOM上
            parentNode.insertBefore(newNode, oldVnode.elm)
            // 删除旧的节点
            parentNode.removeChild(oldVnode.elm)
        }
    }
    newVnode.elm = oldVnode.elm
    return oldVnode
}

function emptyNodeAt(elm) {
    return vnode(elm.tagName.toLowerCase(), undefined, undefined, undefined, elm)
}