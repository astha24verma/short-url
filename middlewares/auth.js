const { getUser } = require('../services/auth');

// Authentication
function checkForAuthentication(req, res, next) {
    req.user = null;
    const tokenCookie = req.cookies?.token;
    if(!tokenCookie){
        return next();
    }

    const user = getUser(tokenCookie);

    req.user = user;
    next();
}

// Authorization
function restrictTo(roles = []){ // roles => ('Admin'), ('Normal')
    return function (req, res, next){
        if(!req.user) return res.redirect('/login');

        if(!roles.includes(req.user.role)) return res.end("Unauthorized access!")

        return next();
    }
}

module.exports = { checkForAuthentication, restrictTo };