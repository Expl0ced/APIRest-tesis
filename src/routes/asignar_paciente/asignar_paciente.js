const express = require('express');
const router = express.Router();
const cors = require('cors');
const mysqlConnection  = require('../../database.js');


    
router.get('/:id', cors(), (req, res)=>{
    const { id } = req.params;
    mysqlConnection.query("SELECT idUser ,Nombre, Apellido, Email FROM usuarios WHERE idUser=?", [id], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    })  
});
router.post('/', cors(),(req, res)=>{
    const { idOrden, nombreNutri,apellidoNutri,idClienteNutri } = req.body;
    const query = "CALL Asignacion(?,?,?,?)";
    mysqlConnection.query(query, [ idOrden, nombreNutri,apellidoNutri,idClienteNutri ], (err, rows, fields)=>{
        if(!err){
            console.log(req.body)
            res.json({Status:'Usuario Guardado'})
        }else{
            console.log(err)
        }
    });
})

router.get('/', cors(), (req, res) => {
    mysqlConnection.query("SELECT idUser, Nombre, Apellido, Sintomas, Peso, Altura, Img, IMC, Genero FROM usuarios WHERE (Asignado is null or Asignado='No') and (Rol='usuario' or Rol='admin');",(err, rows, fields) => {
    if(!err) {
        res.json(rows);
    } else {
        console.log(err);
    }
    });  
});
router.put('/:id', cors(), (req, res)=>{
    const { idOrden, Nombre, Apellido, apellidoNutri, nombreNutri, idUser } = req.body;
    const query = "CALL Asignacion(?,?,?,?,?,?)";
    mysqlConnection.query(query, [ idOrden, Nombre, Apellido, apellidoNutri, nombreNutri, idUser ], (err, rows, fields)=>{
        if(!err){
            res.json({Status: 'Usuario Actualizado'});
        }else{
            console.log(err);
        }
    });
}); 


module.exports=router;  