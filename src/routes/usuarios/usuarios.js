

const express = require('express');
const router = express.Router();
const sendMail = require('../../mailer.js')
const cors = require('cors');

const mysqlConnection = require('../../database.js');



// GET all Employees
router.get('/', cors(), (req, res) => {
    mysqlConnection.query('SELECT Nombre, Apellido, Rol, Email FROM usuarios', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/usuarioExists/', cors(), (req, res) => {
    res.send("direccion valida")
});

router.get('/usuarioExists/:email/:password', cors(), (req, res) => {
    const { email, password } = req.params;
    mysqlConnection.query('SELECT Email, Password FROM usuarios WHERE Email=? and Password=?', [email, password], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            res.send("usuario ya creado")
            console.log(err);
        }
    });
});

router.get('/:id', cors(), (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM usuarios WHERE idUser=?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});

router.post('/', cors(), (req, res) => {
    const { idUser, Nombre, Apellido, Rol, Email, Password, Sintomas, Img, Peso, Altura, Genero, Contex_Fisica } = req.body;
    const query = "CALL usuarioADDorEDIT(?,?,?,?,?,?,?,?,?,?,?,?)";
    mysqlConnection.query(query, [idUser, Nombre, Apellido, Rol, Email, Password, Sintomas, Img, Peso, Altura, Genero, Contex_Fisica], async (err, rows, fields) => {
        if (!err) {
            sendMail(Email)
            res.json({ Status: 'Usuario Guardado' })
        } else {
            console.log(err)
        }
    });
    // sendMail(Email)
})

router.put('/actualizar/:id', cors(), (req, res) => {
    const { Nombre, Apellido, Rol, Email, Password, Sintomas, Img, Peso, Altura, Genero, Contex_Fisica } = req.body;
    const { id } = req.params;
    const query = "CALL usuarioADDorEDIT(?,?,?,?,?,?,?,?,?,?,?,?)";
    mysqlConnection.query(query, [id, Nombre, Apellido, Rol, Email, Password, Sintomas, Img, Peso, Altura, Genero, Contex_Fisica], (err, rows, fields) => {
        console.log(res)
        if (!err) {
            res.json({ Status: 'Usuario Actualizado' });
        } else {
            console.log(err);
        }
    });
});


router.delete('/:id', cors(), (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM usuarios WHERE idUser=?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: 'Usuario Borrado' });
        }
    });
});

router.put('/update-img/:id', (req, res)=>{    
    const { imagen } = req.body;
    const { id } = req.params;
    console.log(imagen)
    mysqlConnection.query("Call update_images(?,?)", [ imagen, id ], (err, rows, fields)=>{    
        console.log(req.body)
        if(!err){
            res.json({Status: 'Foto de Perfil Actualizada'});
        }else{  
            console.log(err);
        }
    });
}); 

module.exports = router;  