// patchVnode.js
import createElm from './createElm'

export default function patchVnode(oldVnode, newVnode) {
    // 1.判断 oldVnode 与 newVnode是否是同一个对象
    if(oldVnode === newVnode) return
    // 2.判断newVnode上有没有text
    if(newVnode.text && !newVnode.children) {
        if(oldVnode.text !== newVnode.text) {
            oldVnode.elm.textContext = newVnode.text
        }
    } else {
        // 3. 判断oldVnode有children，这个时候要使用 updateChildren更新
        if(oldVnode.children) {
            
        } else {
            // oldVnode没有 children, newVnode 有children
            // 先清空oldVndoe中的text
            oldVnode.elm.innerHTML = ''
            let newChildren = newVnode.children
            // 遍历newVode中的children
            let fragment = document.createDocumentFragment()
            for(let i = 0; i < newChildren.length; i++) {
                let node = createElm(node)
                fragment.appendChild(ndoe)
            }
            oldVnode.appendChild(fragment)
        }
    }
}