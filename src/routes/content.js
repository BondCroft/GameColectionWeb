const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLogged } = require('../lib/auth.js');
const pool = require('../database.js');

//consolas
router.get('/add', isLoggedIn, (req, res)=>{
    res.render('../views/content/add.hbs');
});
router.post('/add', async (req, res)=>{
    const { nombre, descripcion } = req.body;
    const new_consola = {
        user_id: req.user.user_id,
        nombre,
        descripcion
    };
    await pool.query('INSERT INTO consolas set ?', [new_consola]);
    req.flash('success', 'Consola guardada correctamnente! ');
    res.redirect('/content');

});

router.get('/', isLoggedIn, async (req, res)=>{

    const consolas = await pool.query('SELECT * FROM consolas WHERE user_id = ?', [req.user.user_id]);
    res.render('../views/content/consolas.hbs', {consolas});
});

router.get('/delete/:id', isLoggedIn, async (req, res)=>{
    const { id } = req.params;
    await pool.query('DELETE FROM consolas WHERE consola_id = ?', [id]);
    req.flash('success', 'Consola borrada de la coleccion! ');
    res.redirect('/content');
});

router.get('/edit/:id', isLoggedIn, async (req, res)=>{
    const { id } = req.params;
    const consola = await pool.query('SELECT * FROM consolas WHERE consola_id = ?', [id]);
    console.log(consola[0]);
    res.render('../views/content/edit.hbs', {consola: consola[0]});
});

router.post('/edit/:id', async (req, res)=>{
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const new_consola = {
        nombre,
        descripcion
    };
    await pool.query('UPDATE consolas set ? WHERE consola_id = ?', [new_consola, id]);
    req.flash('success', 'Consola editada con exito! ');
    res.redirect('/content');
});

//juegos
router.get('/addjuego', isLoggedIn, (req, res)=>{
    res.render('../views/content/addjuego.hbs');
});
router.post('/addjuego', async (req, res)=>{
    const { nombre, formato, descripcion } = req.body;
    const new_juego = {
        nombre,
        formato,
        descripcion
    };
    new_juego.user_id = req.user.user_id;
    await pool.query('INSERT INTO juegos set ?', [new_juego]);
    req.flash('success', 'Juego guardado correctamnente! ');
    res.redirect('/content/juegos');

});

router.get('/juegos', isLoggedIn, async (req, res)=>{

    const juegos = await pool.query('SELECT * FROM juegos WHERE user_id = ?', [req.user.user_id]);
    res.render('../views/content/juegos.hbs', {juegos});
});

router.get('/deleteJ/:id', isLoggedIn, async (req, res)=>{
    const { id } = req.params;
    await pool.query('DELETE FROM juegos WHERE juego_id = ?', [id]);
    req.flash('success', 'Juego borrado de la coleccion! ');
    res.redirect('/content/juegos');
});

router.get('/editJ/:id', isLoggedIn, async (req, res)=>{
    const { id } = req.params;
    const juego = await pool.query('SELECT * FROM juegos WHERE juego_id = ?', [id]);
    res.render('../views/content/editJ.hbs', {juego: juego[0]});
});

router.post('/editJ/:id', async (req, res)=>{
    const { id } = req.params;
    const { nombre, formato, descripcion } = req.body;
    const new_juego = {
        nombre,
        formato,
        descripcion
    };
    await pool.query('UPDATE juegos set ? WHERE juego_id = ?', [new_juego, id]);
    req.flash('success', 'Juego editado con exito!');
    res.redirect('/content/juegos');
});

//accesorio

router.get('/addAcc', isLoggedIn, (req, res)=>{
    res.render('../views/content/addAcc.hbs');
});
router.post('/addAcc', async (req, res)=>{
    const { nombre, descripcion } = req.body;
    const new_accesorio = {
        user_id: req.user.user_id,
        nombre,
        descripcion
    };
    await pool.query('INSERT INTO accesorios set ?', [new_accesorio]);
    req.flash('success', 'Accesorio guardado correctamnente! ');
    res.redirect('/content/accesorios');

});

router.get('/accesorios', isLoggedIn, async (req, res)=>{

    const accesorio = await pool.query('SELECT * FROM accesorios WHERE user_id = ?', [req.user.user_id]);
    res.render('../views/content/accesorios.hbs', {accesorio});
});

router.get('/deleteAcc/:id', isLoggedIn, async (req, res)=>{
    const { id } = req.params;
    await pool.query('DELETE FROM accesorios WHERE acceso_id = ?', [id]);
    req.flash('success', 'Accesorio borrado de la coleccion! ');
    res.redirect('/content/accesorios');
});

router.get('/editAcc/:id', isLoggedIn, async (req, res)=>{
    const { id } = req.params;
    const accesorio = await pool.query('SELECT * FROM accesorios WHERE acceso_id = ?', [id]);
    console.log(accesorio[0]);
    res.render('../views/content/editAcc.hbs', {accesorio: accesorio[0]});
});

router.post('/editAcc/:id', async (req, res)=>{
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const new_accesorio = {
        nombre,
        descripcion
    };
    await pool.query('UPDATE accesorios set ? WHERE acceso_id = ?', [new_accesorio, id]);
    req.flash('success', 'Accesorio editado con exito! ');
    res.redirect('/content/accesorios');
});

module.exports = router;