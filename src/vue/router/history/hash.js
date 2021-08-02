import History from "./base"

export default class HashHistory extends History {
    constructor(router) {
        super(router)
        ensureSlash()
    }
    setUpListener() {
        window.addEventListener('hashchange', () => {
            this.transitionTo(this.getCurrentLocation())
        })
    }
    getCurrentLocation() {
        let href = window.location.href
        const index = href.indexOf('#')
        if(index < 0) return ''
        href = href.slice(index + 1)
        return href
    }
}


function ensureSlash() {
    if(window.hash) return

    window.location.href = '/'
}