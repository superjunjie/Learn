import { generateBinarySearchTree } from './tree'
/**
 * @param {TreeNode} root
 * @return {number[]}
 * @description 94
 */
var inorderTraversal = function(root) {
  let list = []
  let stack = []
  let cur = root
  while (cur !== null || stack.length !== 0) {
    if(cur !== null) {
      stack.push(cur)
      cur = cur.left
    } else {
      cur = stack.pop()
      list.push(cur.val)
      cur = cur.right
    }
  }
  return list
};

const root = generateBinarySearchTree([1,null,2,3])
console.log(root)
console.log(inorderTraversal(root))

/**
 * @param {TreeNode} root
 * @return {boolean}
 * @description 98
 */
var isValidBST = function(root) {
  const validate = (node, min, max) => {
    if(node === null) {
      return true
    }
    if(node.val <= min || node.val >= max) {
      return false
    }
    return validate(node.left, min, node.val) && validate(node.right, node.val, max)
  }
  return validate(root, Number.MIN_VALUE, Number.MAX_VALUE)
};

/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 * @description 99
 */
var recoverTree = function(root) {

};


/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 * @detail https://leetcode-cn.com/problems/same-tree/
 */
var isSameTree = function(p, q) {
  if(p === null && q === null) return true
  if(p === null || q === null) return false
  if(p.val !== q.val) return false
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};