/**
 * 学习这件事不在乎有没有教你，最重要的是在于你自己有没有觉悟和恒心
 *                                                                              --法布尔
 * 策略模式的的特点
 * 1、策略之间相互独立，也可以相互替换
 * 2、封装上下文，可以根据需求选用不同的策略
 */

const  priceCalculate = (function () {
    const DiscountMap = {
        minus100_30: function (price) {
            return price - Math.floor(price / 100) * 30
        },
        minus200_80: function (price) {
            return price - Math.floor(price / 200) * 80
        },
        percent80: function (price) {
            return price * 0.8
        }
    }

    return {
        priceClac:function(discountType, price){
            return DiscountMap[discountType] && DiscountMap[discountType](price)
        },
        addStrategy:function(discountType, fn){
            if(DiscountMap[discountType]) return
            DiscountMap[discountType] = fn
        }
    }
})()



/**
 * 策略模式的优点
 * 1、策略之间相互独立，策略之间可以相互切换
 * 2、可以避免多重判断
 * 3、可拓展型好
 * 策略模式的缺点
 * 1、无法共享一些算法
 * 2、策略都需要向外暴露，违法最少知识原则
 * 策略模式的使用场景
 * 1、多个算法只在行为上稍有不同
 * 2、算法需要自由切换场景
 * 3、有时需要多重条件判断
 */