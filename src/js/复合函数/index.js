function lowerCase(input) {
    return input && typeof input === "string" ? input.toLowerCase() : input;
}

function upperCase(input) {
return input && typeof input === "string" ? input.toUpperCase() : input;
}

function trim(input) {
return typeof input === "string" ? input.trim() : input;
}

function split(input, delimiter = ",") {
return typeof input === "string" ? input.split(delimiter) : input;
}

// compose函数的实现
const trimLowerCaseAndSplit = compose(trim, lowerCase, split);
let result = trimLowerCaseAndSplit(" a,B,C "); // ["a", "b", "c"]
console.log(result)

// 复合函数
function compose(...funcs) {
    return function(x) {
        return funcs.reduce(function(arg, fn){
            return fn(arg)
        }, x)
    }
}


