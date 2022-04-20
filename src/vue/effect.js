const bucket = new WeakMap()
let activeEffect
const effectStack = []
const jobQueue = new Set()
const p = Promise.resolve()
let isFlushing = false

function flushJob() {
    if (isFlushing) return
    isFlushing = true
    p.then(() => {
        jobQueue.forEach(job => job())
    }).finally(() => {
        isFlushing = false
    })
}

function track(target, key) {
    if (!activeEffect) return
    let depsMap = bucket.get(target)
    if (!depsMap) {
        bucket.set(target, (depsMap = new Map()))
    }
    let deps = depsMap.get(key)
    if (!deps) {
        depsMap.set(key, (deps = new Set()))
    }
    deps.add(activeEffect)
    activeEffect.deps.push(deps)
}

function trigger(target, key) {
    const depsMap = bucket.get(target)
    if (!depsMap) return
    const effects = depsMap.get(key)
    const effectToRun = new Set()
    effects && effects.forEach(effect => {
        if (effect !== activeEffect) {
            effectToRun.add(effect)
        }
    })
    effectToRun.forEach(effectFn => {
        if (effectFn.options.scheduler) {
            effectFn.options.scheduler(effectFn)
        } else {
            effectFn()
        }
    })
}

function cleanup(effectFn) {
    for (let i = 0; i < effectFn.deps.length; i++) {
        const deps = effectFn.deps[i]
        deps.delete(effectFn)
    }
    effectFn.deps.length = 0
}

function reactive(data) {
    return new Proxy(data, {
        get(target, key) {
            track(target, key)
            return target[key]
        },
        set(target, key, newVal) {
            target[key] = newVal
            trigger(target, key)
        }
    })
}

function effect(fn, options) {
    const effectFn = () => {
        cleanup(effectFn)
        activeEffect = effectFn
        effectStack.push(effectFn)
        const res = fn()
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
        return res
    }
    effectFn.options = options
    effectFn.deps = []
    if (!options.lazy) {
        effectFn()
    }
    return effectFn
}

function computed(getter) {
    let value
    let dirty = true
    const effectFn = effect(getter, {
        lazy: true,
        scheduler() {
            dirty = true
        }
    })
    const obj = {
        get value() {
            if (dirty) {
                value = effectFn()
                dirty = false
            }
            return value
        }
    }
    return obj
}

const obj = reactive({ foo: 10, bar: 20 })
const sumRes = computed(() => obj.foo + obj.bar)
console.log(sumRes.value)
obj.foo++
console.log(sumRes.value)
console.log(sumRes.value)