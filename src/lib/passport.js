const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

passport.use('local.signup', new localStrategy({
    usernameField: 'nombre',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done)=>{
    console.log(req.bady);
}));