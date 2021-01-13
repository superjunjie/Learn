/*
 * 题目来源于 LeetCode 上第 2 号问题：两数相加。题目难度为 Medium
 */
var addTwoNumbers = function (l1, l2) {
    let carried = 0
    let sum = new ListNode('0')
    let head = sum
    while(carried || l1 || l2) {
        let val1 = l1 !== null ? l1.val : 0
        let val2 = l2 !== null ? l2.val : 0
        let r1 = val1 + val2 + carried
        carried = r1 >= 10 ? 1 : 0
        sum.next = new ListNode(r1 % 10)
        sum = sum.next
        if(l1) l1 = l1.next
        if(l2) l2 = l2.next
    }
    return head.next
}
