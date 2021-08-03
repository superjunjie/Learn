import createElm from "./createElm";
import patchVnode from "./patchVnode";
import sampleVnode from "./sample-vnode";

/**
 * 
 * @param {dom} parentElm 父节点
 * @param {vnode} oldCh 旧子节点
 * @param {vnode} newCh 新子节点
 */
export default function updateChidren(parentElm, oldCh, newCh) {
    let oldStartIndex = 0,
        newStartIndex = 0,
        oldEndIndex = oldCh.length - 1,
        newEndIndex = newCh.length - 1,
        oldStartVnode = oldCh[oldStartIndex],
        newStartVnode = newCh[newStartIndex],
        oldEndVnode = oldCh[oldEndIndex],
        newEndVnode = newCh[newEndIndex],
        keyMap = null
        // 循环
        while(newStartIndex <= newEndIndex && oldStartIndex <= oldEndIndex) {
            // 下面按照diff算法的四种策略写 这里面还得调用 patchVnode
            // 指针走完就不移动了

            // 下面逻辑是为了忽略undefined节点，这些节点实际上已经移动过了
            if(oldCh[oldStartIndex] === undefined) {
                oldStartVnode = oldCh[++oldStartIndex]
            } else if(oldCh[oldEndIndex] === undefined) {
                oldEndVnode = oldCh[--oldEndIndex]
            } else if(newCh[newStartIndex] === undefined) {
                newStartVnode = newCh[++newStartIndex]
            } else if(newCh[newEndIndex] === undefined) {
                newEndVnode = newCh[--newEndIndex]
            }
            // 忽视所有的undefined 我们来到这里 判断四种diff优化策略
            // 1. compare newStartVnode and oldStartVnode
            else if(sampleVnode(newStartVnode, oldStartVnode)) {
                // 调用 patchVnode 对比两个节点的 对象 文本 children
                patchVnode(oldStartVnode, newStartVnode)
                // 指针移动
                newStartVnode = newCh[++newStartIndex]
                oldStartVnode = oldCh[++oldStartIndex]
            }
            // 2. compare newEndVnode and oldEndVnode
            else if(sampleVnode(newEndVnode, oldEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode)
                newEndVnode = newCh[--newStartIndex]
                oldEndVnode = oldCh[--oldStartIndex]
            }
            // 3. compare newEndVnode and oldStartVnode 
            else if(sampleVnode(newEndVnode, oldStartVnode)) {
                patchVnode(oldStartVnode, newEndVnode)
                // 将 旧前节点 移动到 旧后节点 之后
                parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
                newEndVnode = newCh[--newEndIndex]
                oldStartVnode = oldCh[++oldStartIndex]
            }
            // 4. compare newStartVnode and oldEndVnode
            else if(sampleVnode(newStartVnode, oldEndVnode)) {
                //将就后节点移动到就前节点之前
                patchVnode(oldEndVnode, newStartVnode)
                parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
                newStartVnode = newCh[++newStartIndex]
                oldEndVnode = oldCh[--oldEndIndex]
            } else {
                if(!keyMap) {
                    keyMap = {}
                    for(let i = oldStartVnode; i < oldEndIndex; i++) {
                        const key = oldCh[i].data.key
                        if(!key) keyMap[key] = i
                    }
                }

                let idInOld = keyMap[newStartIndex.data] ? keyMap[newStartIndex.data.key] : undefined

                if(idInOld) {
                    let moveElm = oldCh[idInOld]
                    patchVnode(moveElm, newStartVnode)
                    oldCh[idInOld] = undefined
                    parentElm.insertBefore(moveElm.elm, oldStartVnode.elm)
                } else {
                    parentElm.insertBefore(createElm(newStartVnode), oldStartVnode.elm)
                }
                newStartVnode = newCh[++newStartIndex]

                if(newStartIndex <= newEndIndex) {
                    let beforeFlag = newCh[newEndIndex + 1] ? newCh[newEndIndex + 1] : null
                    for(let i = newStartIndex; i <= newEndIndex; i++) {
                        parentElm.insertBefore(createElm(newCh[i]), beforeFlag)
                    }
                } else if(oldStartIndex <= oldEndIndex) {
                    for(let i = oldStartIndex; i <= oldEndIndex; i++) {
                        if(oldCh[i].elm) parentElm.removeChild(oldCh[i].elm)
                    }
                }
            }
        }

}