module.exports = {
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/profile');
    },
    isNotLogged(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/content');
    }
};