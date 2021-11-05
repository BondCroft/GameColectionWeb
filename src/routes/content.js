const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const pool = require('../database.js');

router.get('/inicio', isLoggedIn, (req, res)=>{
    res.render('../views/content/inicio.hbs');
});
router.post('/inicio', async (req, res)=>{
    const { nombre, descripcion } = req.body;
    const new_consola = {
        nombre,
        descripcion
    };
    await pool.query('INSERT INTO consolas set ?', [new_consola]);
    req.flash('success', 'Consola guardada correctamnente! ');
    res.redirect('/content');

});

router.get('/', async (req, res)=>{

    const consolas = await pool.query('SELECT * FROM consolas');
    res.render('../views/content/consolas.hbs', {consolas});
});

router.get('/delete/:id', async (req, res)=>{
    const { id } = req.params;
    await pool.query('DELETE FROM consolas WHERE consola_id = ?', [id]);
    req.flash('success', 'Consola borrada de la coleccion! ');
    res.redirect('/content');
});

router.get('/edit/:id', async (req, res)=>{
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

module.exports = router;