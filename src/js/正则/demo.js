/**
 * 数字千分位分割
 */
let price = '123456789'
let priceRegex = /(?!^)(?=(\d{3})+$)/g
console.log(price.replace(priceRegex, ','))

/**
 * 手机号3-4-4分割
 */

let phoneNumberRegex = /(?!^)(?=(\d{4})+$)/g
let phoneNumber = '13526365238'
console.log(phoneNumber.replace(phoneNumberRegex, '-'))



const str = '2021-10-09'

const res = str.match(/-(\d{1,2})$/)
console.log(res[1])