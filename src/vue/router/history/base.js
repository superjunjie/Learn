import createRoute from "../utils/route"

export default class History {
    constructor(router) {
        this.router = router
        this.current = createRoute(null, '/')
    }
    transitionTo(path, onComplete) {
        this.current = this.router.matcher.match(path)
        onComplete && onComplete()
    }
}