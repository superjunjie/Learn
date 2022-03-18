function parseFilters (exp) {
  let filters = exp.split('|')
  let expression = filters.shift().trim()
  let i
  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i].trim())
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  const i = filter.indexOf('(')
  if (i < 0) {
    // _f: resolveFilter
    return `_f("${filter}")(${exp})`
  } else {
    const name = filter.slice(0, i)
    const args = filter.slice(i + 1)
    return `_f("${name}")(${exp},${args}`
  }
}

// 测试


parseFilters(`message | capitalize`)
// _f("capitalize")(message)

parseFilters(`message | filterA | filterB`)
// _f("filterB")(_f("filterA")(message))

parseFilters(`message | filterA('arg1', arg2)`)
// _f("filterA")(message,'arg1', arg2)