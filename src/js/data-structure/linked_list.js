import { ListNode } from './list_node'

class LinkedList {
  constructor(val) {
    this.val = Array.isArray(val) ? val : [...arguments]
    this.head = new ListNode()
  }
  createLinkedList() {
    let cur = this.head
    this.val.forEach(val => {
      const node = new ListNode(val)
      cur.next = node
      cur = cur.next
    })
  }
  insert()
} 