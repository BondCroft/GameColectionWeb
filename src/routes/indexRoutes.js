const express = require('express');
const router = express.Router();
const { isNotLogged } = require('../lib/auth.js');

router.get('/profile', (req, res)=>{
    res.render('../views/layouts/profile.hbs');
});

module.exports = router;