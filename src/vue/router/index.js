let _Vue = null


export default class MyVueRouter {
  static install(Vue) {
    if(MyVueRouter.install.installed) return
    MyVueRouter.install.installed = true
    _Vue = Vue
    _Vue.mixin({
      beforeCreated() {
        if(this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }
  constructor(options) {
    this.$options = options
    this.routerMap = {}
    this.data = _Vue.observable({
      current: '/'
    })
  }
  createRouterMap() {
    this.options.router.forEach(item => {
      this.routerMap[item.path] = item.component
    })
  }
  initComponents(Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      render(h){
        return h(
          'a',
          {
            attrs: {
              herf: this.to
            },
            on: {
              click: Myclick
            }
          },
          [this.$slots.default]
        )
      },
      methods: {
        myClick(e) {
          history.pushState({}, '', this.to)
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
    })
    Vue.component('router-view', {
      render(h) {
        const component = this.$router.routerMap[this.$router.data.current]
        return h(component)
      }
    })
  }
  initEvent() {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
  init() {
    this.createRouterMap()
    this.initComponents(_Vue)
    this.initEvent()
  }
}