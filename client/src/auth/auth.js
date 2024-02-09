
const Cookies = require("js-cookie")
//  check login
export const isLoggedIn = () => {
    const user = Cookies.get("authToken")
    if (user == null) {
        return false
    } else {
        return true
    }

}

export const adminId = () => {
    let id = localStorage.getItem('adminid')
    if (id == null) {
        return false
    } else {
        return id
    }
}
