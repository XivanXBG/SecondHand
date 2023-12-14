const jwt = require("../utils/JWT-async")
const { SECRET } = require("../constants")

exports.authenticationMiddle = async(req, res, next) => {

    const token = req.cookies['auth']
    

    
    if (token) { //middleware to set user to locals
        try {
            const Dtoken = await jwt.verify(token, SECRET)
          
            res.locals.user = Dtoken
            req.user = Dtoken   
            res.locals.isAuth = true;
            next();
        } catch (error) {
            res.clearCookie('auth')
            res.redirect("/users/login") 
        }
    } else {
        next()
    }

}

exports.isAuthenticatedGuard = async(req, res, next) => {
    if (!req.user) {
        return res.redirect("/user/login")
    }

    next();
}
exports.isLoggedInGuard = async(req, res, next) => {
    if (req.user) {
        return res.redirect("/")
    }

    next();
}