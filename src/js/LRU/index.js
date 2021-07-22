// LRU缓存淘汰算法
class LRUCache {
    constructor(capacity) {
        this.secretKey = new Map()
        this.capacity = capacity
    }
     get(key) {
         if(this.secretKey.has(key)) {
             let tempValue = this.secretKey.get(key)
             this.secretKey.delete(key)
             this.secretKey.set(key, tempValue)
             return tempValue
         } else {
             return -1
         }
     }
     put(key, value) {
        // key存在，仅修改值
        if(this.secretKey.has(key)) {
            this.secretKey.delete(key)
            this.secretKey.put(key, value)
        // key不存在，catch未满
        } else if(this.secretKey.size < this.capacity) {
            this.secretKey.set(key, value)
        // key不存在，catch已满
        } else {
            this.secretKey.set(key, value)
            this.secretKey.delete(this.secretKey.keys().next().value)
        }
     }
}

let cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log("cache.get(1)", cache.get(1))// 返回  1
cache.put(3, 3);// 该操作会使得密钥 2 作废
console.log("cache.get(2)", cache.get(2))// 返回 -1 (未找到)
cache.put(4, 4);// 该操作会使得密钥 1 作废
console.log("cache.get(1)", cache.get(1))// 返回 -1 (未找到)
console.log("cache.get(3)", cache.get(3))// 返回  3
console.log("cache.get(4)", cache.get(4))// 返回  4