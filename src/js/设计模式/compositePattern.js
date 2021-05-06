/**
 * 能够生存下来的物种，并不是那些最强大的，也不是那些最聪明的，而是那些对变化作出快速反映的。
 *                                                                                 --达尔文
 * 组合模式的特点
 * 1、结构呈整体-部分的树形关系，整体部分一般称为组合对象，组合对象下还可以有组合对象和叶对象
 * 2、组合对象和叶对象有一致的接口和数据结构，以保证操作的一致
 * 3、请求从树的顶端往下传递
 */

//创建文件夹
// var createFolder = function (name) {
//     return {
//         name: name,
//         _children: [],

//         //在文件夹下增加文件文件夹
//         add(fileOrFile) {
//             this._children.push(fileOrFile)
//         },

//         //扫描方法
//         scan(cb) {
//             this._children.forEach(function (child) {
//                 child.scan(cb)
//             })
//         }
//     }
// }

// //创建文件
// var createFile = function (name, size) {
//     return {
//         name: name,
//         size: size,

//         add() {
//             throw new Error('文件下面不能再添加文件')
//         },

//         //扫描方法
//         scan(cb) {
//             cb(this)
//         }
//     }
// }

// var foldMovies = createFolder('电影')

// var foldMarvelMovies = createFolder('漫威英雄电影')
// foldMovies.add(foldMarvelMovies)

// var foldDCMovies = createFolder('DC英雄电影')
// foldMovies.add(foldDCMovies)

// foldMarvelMovies.add(createFile('钢铁侠.mp4', 1.9))
// foldMarvelMovies.add(createFile('蜘蛛侠.mp4', 2.4))
// foldMarvelMovies.add(createFile('金刚狼.mp4', 2.3))
// foldMarvelMovies.add(createFile('黑寡妇.mp4', 1.9))
// foldMarvelMovies.add(createFile('美国队长.mp4', 1.4))

// foldDCMovies.add(createFile('蝙蝠侠.mp4', 2.4))
// foldDCMovies.add(createFile('超人.mp4', 1.4))



//ES6方法
class Folder {
    constructor(name, children) {
        this.name = name
        this.children = children
    }

    add(...folderOrFile) {
        this.children.push(...folderOrFile)
        return this
    }

    scan(cb) {
        this.children.forEach(child => child.scan(cb))
    }
}

class File {
    constructor(name, size) {
        this.name = name
        this.size = size
    }

    add(cb) {
        throw new Error('文件下面不能添加文件')
    }

    scan(cb) {
        cb(this)
    }
}

const foldMovies = new Folder('电影', [
    new Folder('漫威英雄电影', [
        new File('钢铁侠.mp4', 1.9),
        new File('蜘蛛侠.mp4', 2.4),
        new File('金刚狼.mp4', 2.3),
        new File('黑寡妇.mp4', 1.9),
        new File('美国队长.mp4', 1.)
    ]),
    new Folder('DC英雄电影', [
        new File('蝙蝠侠.mp4', 2.4),
        new File('超人.mp4', 1.4)
    ])
])

console.log('大于 2G 的文件有：')
foldMovies.scan(function (item) {
    if (item.size > 2) {
        console.log(`name: ${item.name} size: ${item.size}GB`)
    }
})

// const createElement = ({ tag, attr, children }) => {
//     const node = tag
//         ? document.createElement(tag)
//         : document.createTextNode(attr.text)
//     tag && Object.keys(attr)
//         .forEach(key => node.setAttribute(key, attr[key]))
//     children && children
//         .forEach(child => 
//             node.appendChild(createElement.call(null, child)))
//     return node
// }


/**
 * 组合模型的优点
 * 1、使得使用者面向接口编程
 * 2、对扩展友好，符合方法封闭的原则，利于维护
 * 组合模式的缺点
 * 1、增加了系统复杂度，如果对象不多，则不一定需要使用
 * 2、如果通过组合模式创建了过多的对象，那么这些对象可能导致系统负担不起
 * 组合模式的使用场景
 * 1、对象组织呈树形结构
 * 2、使用者希望统一对待树形结构的对象，不想用大量的 if-else 
 */