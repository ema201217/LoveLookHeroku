module.exports = function(req, res, next){
    if(req.cookies.userLoveLook){
        req.session.user = req.cookies.userLoveLook;
        res.locals.user = req.session.user
    }
    next()
}