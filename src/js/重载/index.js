function addMethods(object, name, f) {
    let old = object[name]
    object[name] = function () {
        if (f.length === arguments.length) {
            return f.apply(this, arguments)
        } else if (typeof old === 'function') {
            return old.apply(this, arguments)
        }
    }
}

function find0() {
    return this.names
}

function find1(firstName) {
    const result = []
    for (let i = 0; i < this.names.length; i++) {
        if (this.names[i].indexOf(firstName) === 0) {
            result.push(this.names[i])
        }
    }
    return result
}

function find2(firstName, lastName) {
    const result = []
    for (let i = 0; i < this.names.length; i++) {
        if (this.names[i] === firstName + ' ' + lastName) {
            result.push(this.names[i])
        }
    }
    return result
}

const people = {
    names: ['A B', 'A C', 'B C', 'B D']
}

addMethods(people, 'find', find0)
addMethods(people, 'find', find1)
addMethods(people, 'find', find2)


console.log(people.find())
console.log(people.find('A B'))
console.log(people.find('A', 'B'))