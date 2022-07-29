function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}


function generateBinarySearchTree(arr) {
  if(arr.length  < 1) return
  let root = new TreeNode(arr[0]),
    cur = root,
    queue = new Array(),
    n = 0
  queue.push(cur)
  while (queue.length > 0) {
    for(let i = 0, size = queue.length; i < size; i++) {
      cur = queue.pop()
      cur.left = arr[n + 1] != null ? new TreeNode(arr[n + 1]) : null
      cur.left && queue.unshift(cur.left)
      n++

      cur.right = arr[n + 1] != null ? new TreeNode(arr[ n + 1]) : null
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
}

function preOrderTraversal(root) {
  let list = []
  let stack = []
  let cur = root
  while (cur !== null || stack.length !== 0) {
    if(cur !== null) {
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
    if(cur.right === null || cur.right === lastView) {
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


function morrisPre(head) {
  if (head === null) return head
  let cur = head
  let mostRight = null
  const list = []
  while (cur !== null) {
    mostRight = cur.left
    if (mostRight !== null) {
      while (mostRight.right && mostRight.right !== cur) {
        mostRight = mostRight.right
      }
      if (mostRight.right === null) {
        mostRight.right = cur
        list.push(cur.val)
        cur = cur.left
        continue
      } else {
        mostRight.right = null
      }
    } else {
      list.push(cur.val)
    }
    cur = cur.right
  }
  return list
}

function morrisIn(head) {
  if(head === null) return null
  let cur = head
  let mostRight = null
  const list = []
  while (cur !== null) {
    mostRight = cur.left
    if(mostRight !== null) {
      while (mostRight.right && mostRight.right !== cur) {
        mostRight = mostRight.right
      }
      if (mostRight.right === null) {
        mostRight.right = cur
        cur = cur.left
        continue
      } else {
        mostRight.right = null
      }
    }
    list.push(cur.val)
    cur = cur.right
  }
  return list
}

function morrisPos(head) {
  if(head === null) return head
  let cur = head
  let mostRight
  const list = []
  while (cur !== null) {
    mostRight = cur.left
    if(mostRight !== null) {
      while (mostRight.right !== null && mostRight.right !== cur) {
        mostRight = mostRight.right
      }
      if(mostRight.right === null) {
        mostRight.right = cur
        cur = cur.left
        continue
      } else {
        mostRight.right = null
        printEdge(cur.left, list)
      }
    }
    cur = cur.right
  }
  printEdge(head, list)
  return list
}

function printEdge(node, list) {
  const tail = reverseEdge(node)
  let cur = tail
  while (cur !== null) {
    list.push(cur.val)
    cur = cur.right
  }
  reverseEdge(tail)
}

function reverseEdge(node) {
  let pre = null
  let next = null
  while (node != null) {
    next = node.right
    node.right = pre
    pre = node
    node = next
  }
  return pre
}

var maxPathSum = function(root) {
  let max = -Number.MAX_VALUE
  const dfs = node => {
      if (node === null) return 0
      node.val += dfs(node.left)
      node.val += dfs(node.right)
      max = Math.max(max, node.val)
      return node.val
  }
  dfs(root)
  return max
}


const root = generateBinarySearchTree([1,2,3])
const ans = maxPathSum(root)
console.log(ans)