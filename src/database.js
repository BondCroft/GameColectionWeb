const mysql = require('mysql');
const { database } = require('./keys');
const { promisify } = require('util');
const pool = mysql.createPool(database);

pool.getConnection((err, connection)=>{
    if(err){
        console.error('Error de coneccion a la base de datos!');
    }
    if(connection){
        connection.release();
        console.log('Conectado a la base de datos!');
    }
    return;
});
pool.query = promisify(pool.query);
module.exports = pool;