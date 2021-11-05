const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const pool = require('../database');
const help = require('../lib/helpers.js');

passport.use('local.signin', new localStrategy({
    usernameField: 'nombre',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, nombre, password, done)=>{
    const row = await pool.query('SELECT * FROM users WHERE username = ?', [nombre]);

    if(row.length > 0){
        const user = row[0];
        const salvePass = await help.comparePass(password, user.password);
        if(salvePass){
            done(null, user, req.flash('success', `Bienvenido ${user.username}`));
        }else{
            done(null, false, req.flash('message', 'Password incorrecto!'));
        }
    }else{
        done(null, false, req.flash('message', 'El usuario no existe!'));
    }
}));

passport.use('local.signup', new localStrategy({
    usernameField: 'nombre',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, pass, done)=>{
    const {nombre, apellido, password} = req.body;
    const newUser = {
        username: nombre,
        fullname: apellido,
        password: password
    };
    //encrypto la contraseña.
    newUser.password = await help.encryptPass(password);
    const resultado = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = resultado.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done)=>{
    done(null, user.user_id);
});

passport.deserializeUser(async (id, done)=>{
    const rows = await pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
    done(null, rows[0]);
});
