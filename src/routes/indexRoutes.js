const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('Aca muestro opciones!');
});

module.exports = router;