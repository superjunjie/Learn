function hascycle(head) {
    // let low = head,
    //     fast = head
    // while (fast && fast.next) {
    //     low = low.next
    //     fast = fast.next.next
    //     if(low === high) return true
    // }
    // return false
    try {
        JSON.stringify(head)
        return false
    } catch {
        return true
    }
}
