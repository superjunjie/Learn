/**
 * @param {*} val 传入的值 String | Number
 * @param {*} config 配置
 * @returns string
 */
function formatCurrency(val, config) {
  const {
    format = '$0,0.00',
    prefix = '$', 
    suffix = '', 
    roundMethod  = null,
    invalid = '-',
    division = 1
  } = config
  if(Number.isNaN(Number(val)) || Array.isArray(val)) return invalid
  val = Number(val) / division
  const hasKilobit = format.indexOf(',') >= 0
  const hasDecimal = format.indexOf('.') >= 0
  const fmtDeliLen = hasDecimal ? format.split('.')[1].length : 0
  const valStr = String(val)
  let valDecimal = valStr.split('.')[1]
  let integer = ''
  let decimal = ''
  if(hasDecimal) {
    integer = valStr.split('.')[0]
    decimal = valDecimal.length > fmtDeliLen
      ? valDecimal.substring(0, fmtDeliLen) 
      : valDecimal.padEnd(fmtDeliLen, '0')
  } else {
    integer =  roundMethod ? roundMethod.call(this, val) + '' : valStr.split('.')[0]
  }
  if(hasKilobit) {
    integer = integer.replace(/(?!^)(?=(\d{3})+$)/g, ',')
  }
  return `${prefix}${integer}${hasDecimal ? '.' : ''}${decimal}${suffix}`
}
const res = formatCurrency('1321611312.991',
  { format: '0,0',
    suffix: 'M', 
    roundMethod: Math.round,
    division: 1000000 
  }
)
console.log(res) // $1,322M