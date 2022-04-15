class ListNode {
  constructor(val, pre, next) {
    this.val = val 
    this.pre = pre,
    this.next = next
  }
  setPre(node) {
    this.pre = node
    return node
  }
  setNext(node) {
    this.next = node
    return node
  }
}

export {
  ListNode
}