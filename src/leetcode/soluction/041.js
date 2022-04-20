class ListNode {
    constructor(val, next) {
        this.val = val || 0
        this.next = next || null
    }
    nextNode(val) {
        const node = new ListNode(val)
        this.next = node
        return node
    }
}

function arrayToLinkedList(arr) {
    let head = new ListNode()
    let cur = head
    arr.forEach(val => {
        let node = new ListNode(val)
        cur.next = node
        cur = cur.next
    })
    return head.next
}


function linkedListToArray(head) {
    const res = []
    while (head) {
        res.push(head.val)
        head = head.next
    }
    return res
}



const arr = [1, 2, 3]
const linkedList = arrayToLinkedList(arr)
const list = linkedListToArray(linkedList)
console.log(list)


const head = new ListNode(1)
head.nextNode(2).nextNode(3).nextNode(4)