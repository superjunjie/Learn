class ListNode {
    constructor(key, value) {
        this.key = key
        this.value = value
        this.next = null
        this.prev = null
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity
        this.hash = {}
        this.count = 0
        this.dummpyHead = new ListNode()
        this.dummpyTail = new ListNode()
        this.dummpyHead.next = this.dummpyTail
        this.dummpyTail.prev = this.dummpyHead
    }
    get(key) {
        let node = this.hash[key]
        if (node === null) return -1
        this.moveToHead(node)
        return node.value
    }
    moveToHead(node) {
        this.removeFromList(node)
        this.addToHead(node)
    }
    removeFromList(node) {
        let temp1 = node.prev
        let temp2 = node.next
        temp1.next = temp2
        temp2.prev = temp1
    }
    addToHead(node) {
        node.prev = this.dummpyHead
        node.next = this.dummpyHead.next
        this.dummpyHead.next.prev = node
        this.dummpyHead.next.next = node
    }
    put(key, value) {
        let node = this.hash[key]
        if(node == null) {
            if (this.count === this.capacity) {
                this.removeLRUItem()
            }
            let newNode = new ListNode(key, value)
            this.hash[key] = newNode
            this.addToHead(newNode)
            this.count++
        } else {
            node.value = value
            this.moveToHead(node)
        }
    }
    removeLRUItem() {
        let tail = this.popTail()
        delete this.hash[tail.key]
        this.count--
    }
    popTail() {
        let tail = this.dummpyTail.prev
        this.removeFromList(tail)
        return tail
    }
}
