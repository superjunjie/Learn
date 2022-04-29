class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = new Node('head')
    this.tail = this.head
  }
  append(val) {
    const list = Array.isArray(val) ? val : [val]
    for(let i = 0; i < list.length; i++) {
      const newNode = new Node(list[i])
      this.tail.next = newNode
      this.tail = newNode
    }
  }
  findByValue(val) {
    if(this.checkCircle()) return
    let cur = this.head
    while (cur !== null && cur.val !== val) {
      cur = cur.next
      pos++
    }
    return cur
  }
  findByIndex(index) {
    let pos = 0
    let cur = this.head.next
    while (cur !== null && pos !== index) {
      cur = cur.next
      pos++
    }
    return cur
  }
  insert(val, target) {
    const cur = this.findByValue(target)
    if(!cur) return false
    const list = Array.isArray(val) ? val : [val]
    for(let i = 0; i < list.length; i++) {
      const newNode = new Node(val)
      newNode.next = cur.next
      cur.next = newNode
    }
  }
  checkCircle() {
    let fast = this.head.next
    let slow = this.head
    while (fast !== null && fast.next !== null) {
        fast = fast.next.next
        slow = slow.next
        if (slow === fast) return true
    }
    return false
  }
  toList() {
    if(this.checkCircle()) return false
    const list = []
    let cur = this.head.next
    while (cur !== null) {
      list.push(cur.val)
      cur = cur.next
    }
    return list
  } 
}


const linkList = new LinkedList()
linkList.append([1,2,3,4])
linkList.append([5,6,7,8], 4)
console.log(linkList.findByIndex(11))