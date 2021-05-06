
var start = new Date()
setTimeout(() => {
    var result = 0;
    for(var i=0;i<100000000;i++){
        result++
    }
    console.log(result)
});
setTimeout(() => {
    console.log(1)
});
var end = new Date()
console.log(end - start)



