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



