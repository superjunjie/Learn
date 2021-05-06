/**
 * 适配器模式特点
 * 1、旧有接口格式已经不满足现在的需求
 * 2、通过增加适配器来更好地使用现有的接口
 */

var chinaPlug = {
    name: '中国插头',
    chinalnPlug() {
        console.log('开始供电')
    }
}

var japanPlug = {
    name: '日本插头',
    JapanlnPlug() {
        console.log('开始供电')
    }
}

function japanPlugAdapter(plug) {
    return {
        chinalnPlug() {
            return plug.JapanlnPlug()
        }
    }
}

japanPlugAdapter(japanPlug).chinalnPlug()

//jQuery.ajax 适配 Axios
// function ajax2AxiosAdapter(ajaxOptions) {
//     return axios({
//         url: ajaxOptions.url,
//         method: ajaxOptions.type,
//         response: ajaxOptions.dataType,
//         data: ajaxOptions.data
//     })
//         .then(ajaxOptions.success)
//         .catch(ajaxOptions.error)
// }

// $.ajax = function(options){
//     return ajax2AxiosAdapter(options)
// }

/**
 * 适配器模式的优点
 * 1、更好的复用性
 * 2、可扩展性良好
 * 3、灵活性好
 * 适配模式的缺点
 * 1、可阅读性不好
 * 使用场景
 * 1、如果你想使用一个已经存在的接口，但是它的接口不满足需求，你又不想重构这个接口
 * 2、如果你想创建一个可复用对象，而且确定和一些不兼容的对象一起工作
 */