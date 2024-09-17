let randtoken = require('rand-token').generator()

export function getToken() {
    return  randtoken.generate(8)
}