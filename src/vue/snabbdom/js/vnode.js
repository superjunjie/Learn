// vnode.js\

/**
 * 把传入的 参数 作为对象返回
 * @param {string} sel sel 选择器
 * @param {object} data data 数据
 * @param {array} children children 子节点
 * @param {string} text text 文本
 * @param {dom} elm DOM
 * @returns object
 */
export default function (sel, data, children, text, elm) {
    return {sel, data, children, text, elm}
}