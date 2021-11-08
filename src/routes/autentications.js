const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLogged } = require('../lib/auth.js');

router.get('/signup', isNotLogged, (req, res)=>{
    res.render('../views/auth/signup.hbs');
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/content',
    failureRedirect: '/signup',
    failureFlash: true
})); 

router.get('/signin', isNotLogged, (req, res)=>{
    res.render('../views/auth/signin.hbs');
});

router.post('/signin', (req, res, next)=>{
    passport.authenticate('local.signin', {
        successRedirect: '/content',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res)=>{
    req.logOut();
    res.redirect('/profile');
});

module.exports = router;