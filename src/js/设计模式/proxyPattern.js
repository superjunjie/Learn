/**
 * 1、导演/法院 (访问者) 对明星/当事人 (目标) 的访问都是通过经纪人/律师 (代理) 来完成
 * 2、经纪人/律师 (代理) 对访问有过滤功能
 */

var SuperStar = {
    name: '鸡你太美',
    scheduleFlag:false,
    playAdvertisement: function (ad) {
        console.log(ad)
    }
}

//经纪人
// var ProxyAssistant = {
//     name: '经纪人宋哲',
//     playAdvertisement: function (reward, ad) {
//         if (reward > 100000) {
//             console.log('你是我爸爸')
//             SuperStar.playAdvertisement(ad)
//         } else {
//             console.log('鸡你太美')
//         }
//     }
// }

// const ProxyAssistant = {
//     name: '经纪人宋哲',
//     scheduleTime() {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 console.log('鸡你太美有空了')
//                 resolve()
//             }, 2000)
//         })
//     },
//     playAdvertisement(reward, ad) {
//         if (reward > 100000) {
//             console.log('你是我爸爸')
//             ProxyAssistant.scheduleTime()
//                 .then(() => SuperStar.playAdvertisement(ad))
//         } else {
//             console.log('鸡你太美')
//         }
//     }
// }

const ProxyAssistant = {
    name: '经纪人宋哲',
    scheduleTime(ad) {
        const schedule = new Proxy(SuperStar, {
            set(obj, prop, val){
                if(prop !== 'scheduleFlag') return
                if(obj.scheduleFlag === false && val === true){
                    obj.scheduleFlag = true
                    obj.playAdvertisement(ad)
                }
            }
        })
        setTimeout(() => {
            console.log('鸡你太美有空了')
            schedule.scheduleFlag = true
        }, 2000);
    },
    playAdvertisement(reward, ad) {
        if (reward > 100000) {
            console.log('你是我爸爸')
            ProxyAssistant.scheduleTime(ad)
        } else {
            console.log('鸡你太美')
        }
    }

}

//ES5代理通过object.defineProperty
// scheduleTime(ad){
//     Object.defineProperty(SuperStar, 'scheduleFlag', {
//         get() {
//             return SuperStar.scheduleFlag
//         },
//         set(val) {
//             if(SuperStar.scheduleFlag === false && val === true){
//                 SuperStar.scheduleFlag = true
//                 SuperStar.playAdvertisement(ad)
//             }
//         }
//     })
// }


ProxyAssistant.playAdvertisement(1000000, '哈哈哈哈')