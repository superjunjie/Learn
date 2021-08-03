import h from '../js/h'
import patch from '../js/patch'

let vnode = h('ul', {}, [
    h('li', {}, '我是一个li'),
    h('li', {}, [
        h('p', {}, '我是一个p'),
        h('p', {}, '我是一个p'),
        h('p', {}, '我是一个p'),
    ]),
    h('li', {}, '我是一个li'),
])

let oldVnode = patch(app, vnode)