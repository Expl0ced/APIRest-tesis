const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../../database.js');

router.get('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('select id, nombre, imagen, fecha_creacion, idUser from files where idUser=?',[ id ], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });  
});

router.get('/cuenta/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('select count(id) from files where idUser=?',[ id ], (err, rows, fields) => {
        console.log(res)
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });  
});
module.exports=router;