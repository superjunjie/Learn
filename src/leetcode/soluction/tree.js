function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}


function generateBinarySearchTree(arr) {
  if (arr.length < 1) return
  let root = new TreeNode(arr[0]),
    cur = root,
    queue = new Array(),
    n = 0
  queue.push(cur)
  while (queue.length > 0) {
    for (let i = 0, size = queue.length; i < size; i++) {
      cur = queue.pop()
      cur.left = arr[n + 1] ? new TreeNode(arr[n + 1]) : null
      cur.left && queue.unshift(cur.left)
      n++

      cur.right = arr[n + 1] ? new TreeNode(arr[n + 1]) : null
      cur.right && queue.unshift(cur.right)
      n++
    }
  }
  return root
}

function inOrderTraversal(root) {
  let list = []
  let stack = []
  let cur = root
  while (cur !== null || stack.length !== 0) {
    if (cur !== null) {
      stack.push(cur)
      cur = cur.left
    } else {
      cur = stack.pop()
      list.push(cur.val)
      cur = cur.right
    }
  }
  return list
}

function preOrderTraversal(root) {
  let list = []
  let stack = []
  let cur = root
  while (cur !== null || stack.length !== 0) {
    if (cur !== null) {
      list.push(cur.val)
      stack.push(cur)
      cur = cur.left
    } else {
      cur = stack.pop()
      cur = cur.right
    }
  }
  return list
}

function postOrderTraversal(root) {
  const list = []
  let stack = []
  let lastView = root
  let cur = root
  while (cur !== null || stack.length !== 0) {
    while (cur !== null) {
      stack.push(cur)
      cur = cur.left
    }
    cur = stack[stack.length - 1]
    if (cur.right === null || cur.right === lastView) {
      list.push(cur.val)
      stack.pop()
      lastView = cur
      cur = null
    } else {
      cur = cur.right
    }
  }
  return list
}


var pathSum = function (root, target) {
  const list = []
  let stack = []
  let lastView = root
  let cur = root
  while (cur !== null || stack.length !== 0) {
    while (cur !== null) {
      stack.push(cur)
      cur = cur.left
    }
    cur = stack[stack.length - 1]
    if (cur.right === null || cur.right === lastView) {
      let temp = 0
      for (let i = 0; i < stack.length; i++) {
        temp += stack[i].val
      }
      if (temp === target) {
        list.push([...stack])
      }
      stack.pop()
      lastView = cur
      cur = null
    } else {
      cur = cur.right
    }
  }
  return list
};

const root = generateBinarySearchTree([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1])
console.log(pathSum(root, 22))