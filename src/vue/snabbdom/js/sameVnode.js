// sample-vnode.js


export default function sampleVnode(oldVnode, newVnode) {
    return (
        (oldVnode.data ? oldVnode.data.key : undefined) ===
            (newVnode.data ? newVnode.data.key : undefined) && oldVnode.sel === newVnode.sel
    )
}