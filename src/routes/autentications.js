const express = require('express');
const router = express.Router();

const pool = require('../database');
const passport = require('../lib/passport');

router.get('/signup', (req, res)=>{
    res.render('../views/auth/signup.hbs');
});

router.post('/signup', (req, res)=>{

    passport.authenticate('local.signup', {
        successRedirect: '/content',
        failureRedirect: '/signup',
        failureFlash: true
    });

    const {nombre, apellido, password} = req.body;
    const newUser = {
        nombre,
        apellido,
        password
    };
    console.log(`n: ${nombre} / a: ${apellido} / p: ${password}`);
    res.send('recivido!');
});


module.exports = router;