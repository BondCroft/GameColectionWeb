const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

router.get('/signup', (req, res)=>{
    res.render('../views/auth/signup.hbs');
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/content',
    failureRedirect: '/signup',
    failureFlash: true
})); 

router.get('/signin', (req, res)=>{
    res.render('../views/auth/signin.hbs');
});

router.post('/signin', (req, res, next)=>{
    passport.authenticate('local.signin', {
        successRedirect: '/content',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res)=>{
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;