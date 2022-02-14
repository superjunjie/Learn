function run(gen) {
  let args = [].slice.call( arguments, 1), it

  // 在当前上下文中初始化生成器
  it = gen.apply( this, args )
  // 返回一个promise用于生成器完成
  return Promise.resolve()
    .then( function handleNext(value){
        // 对下一个yield出的值运行
        let next = it.next( value )
        return (function handleResult(next){
            // 生成器运行完毕了吗？
            if (next.done) {
                return next.value
            }
            // 否则继续运行
            else {
              return Promise.resolve( next.value )
                .then(
                  // 成功就恢复异步循环，把决议的值发回生成器
                  handleNext,
                  // 如果value是被拒绝的promise，
                  // 就把错误传回生成器进行出错处理
                  function handleErr(err) {
                    return Promise.resolve(it.throw( err ))
                      .then( handleResult )
                  }
                )
            }
        })(next)
    })
}


function request(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url)
    }, 100)
  })
}

/**
 * 递归委托
 * 1. run(bar)启动生成器＊bar()
 * 2. foo(3) 创建一个 foo(...)的迭代器，传入3作为其参数val
 * 3. 因为3 > 1，所以foo(2)创建了另一个迭代器，并传入2作为其参数val
 * 4. 因为2 > 1，所以foo(1)创建了另一个迭代器，并传入1作为其参数val
 * 5. 因为1 > 1不成立，所以接下来以值为“请求1”调用request()，并得到一个promise
 * 6. 这个promise通过yield传出，回到*foo(2)生成器实例
 * 7. yield *把这个promise实例传出，回到*foo(3)生成器实例
 * 8. yield *把这个promise传到*bar()生成器实例
 * 9. yield *把这个promise传到run(...)函数，这个工具会等待这个promise（第一个request请求）的处理
 * 10. 这个promise决议后，它的完成消息会发送出来恢复＊bar()；后者通过yield ＊转入＊foo(3)实例；
 *     后者接着通过yield ＊转入＊foo(2)生成器实例；
 *     后者再接着通过yield ＊转入＊foo(3)生成器实例内部的等待着的普通yield
 * 11. 在＊foo(2)中，通过request(..)发送了第二个Ajax请求。
 *     它的promise通过yield发回给＊foo(1)实例，然后通过yield ＊一路传递到run(..)（再次进行步骤7）。
 *     这个promise决议后，第二个Ajax响应一路传播回到＊foo(2)生成器实例，赋给它的局部变量val
 * 12. 在＊foo(2)中，通过request(..)发送了第二个Ajax请求。它的promise通过yield发回给＊foo(1)实例
 *     然后通过yield ＊一路传递到run(..)（再次进行步骤7）。
 *    这个promise决议后，第二个Ajax响应一路传播回到＊foo(2)生成器实例，赋给它的局部变量val
 */
let res
function *foo(val) {
  if(val > 1) {
    res = yield *foo(val - 1)
  }
  return yield request(`请求${val}(${res ?? ''})`)
}

function *bar() {
  const r1 = yield *foo(3)
  console.log(r1)
}
run(bar)
