import install from "./install"
import createMatcher from "./create-matcher"

export default class VueRouter {
  constructor(options) {
    this._routes = options._routes || []
    this.matcher = createMatcher(this._routes)
  }
  init(Vue){}
}
VueRouter.install = install