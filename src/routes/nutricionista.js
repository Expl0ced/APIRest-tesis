const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');


//get all ordenes
router.get('/', (req, res) => {
    mysqlConnection.query('select idOrden, nombreNutri, apellidoNutri, nombreCliente, apellidoCliente, idClienteNutri, Genero, usuarios.Peso, usuarios.Altura, usuarios.IMC from usuarios join orden_nutri on (usuarios.Nombre=orden_nutri.nombreNutri and usuarios.Apellido=orden_nutri.apellidoNutri)', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });  
});


//get all ordenes
router.get('/nombre/:nombre/apellido/:apellido', (req, res) => {
    const { nombre, apellido } = req.params;
    mysqlConnection.query('select idOrden, nombreNutri, apellidoNutri, nombreCliente, apellidoCliente, idClienteNutri, Genero, usuarios.Peso, usuarios.Altura, usuarios.IMC, orden_nutri.img from usuarios join orden_nutri on (usuarios.idUser=orden_nutri.idClienteNutri) where nombreNutri=? and apellidoNutri=?',[ nombre, apellido], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });  
});
module.exports=router;