

const express = require('express');
const router = express.Router();
const sendMail= require('C:/Users/explo/APIRest tesis/src/mailer.js')

const mysqlConnection  = require('../database.js');

// GET all Employees
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT Nombre, Apellido, Rol, Email FROM usuarios',(err, rows, fields) => {
    if(!err) {
        res.json(rows);
    } else {
        console.log(err);
    }
    });  
});

router.get('/usuarioExists/:email/:password', (req, res) => {
    const { email, password}=req.params;
    mysqlConnection.query('SELECT Email, Password FROM usuarios WHERE Email=? and Password=?', [email, password] ,(err, rows, fields) => {
    if(!err) {
        res.json(rows);
    } else {
        console.log(err);
    }
    });  
});

router.get('/:id', (req, res)=>{
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM usuarios WHERE idUser=?', [id], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    })
});

router.post('/',(req, res)=>{
    const { idUser, Nombre, Apellido, Rol, Email, Password, Sintomas, Img, Peso, Altura, Genero, Contex_Fisica} = req.body;
    const query = "CALL usuarioADDorEDIT(?,?,?,?,?,?,?,?,?,?,?,?)";
    mysqlConnection.query(query, [idUser, Nombre, Apellido, Rol, Email, Password, Sintomas, Img, Peso, Altura, Genero, Contex_Fisica ], async (err, rows, fields)=>{
        if(!err){
            sendMail(Email)
            res.json({Status:'Usuario Guardado'})
        }else{
            console.log(err)            
        }
    });
    // sendMail(Email)
})

router.put('/:id', (req, res)=>{
    const { Nombre, Apellido, Rol, Email, Password, Sintomas, Img, Peso, Altura, Genero} = req.body;
    const { id } = req.params;  
    const query = "CALL usuarioADDorEDIT(?,?,?,?,?,?,?,?,?,?,?)";
    mysqlConnection.query(query, [id, Nombre, Apellido, Rol, Email, Password, Sintomas, Img, Peso, Altura, Genero ], (err, rows, fields)=>{
        if(!err){
            res.json({Status: 'Usuario Actualizado'});
        }else{
            console.log(err);
        }
    });
}); 


router.delete('/:id', (req, res)=>{
    const {id}= req.params;
    mysqlConnection.query('DELETE FROM usuarios WHERE idUser=?', [id], (err, rows, fields)=>{
        if(!err){
            res.json({Status:'Usuario Borrado'});
        }
    });
});     


module.exports=router;  