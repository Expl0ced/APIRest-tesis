

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
    const query2 = "CALL EliminarRegistroMasViejo()";
    mysqlConnection.query(query, [idUser, Nombre, Apellido, Rol, Email, Password, Sintomas, Img, Peso, Altura, Genero, Contex_Fisica], async (err, rows, fields) => {
        if (!err) {
            sendMail(Email)
            res.json({ Status: 'Usuario Guardado' })
        } else {
            console.log(err)
        }
    })
    mysqlConnection.query(query2, async (err, rows, fields) => {
        if (!err) {
            res.json({ Status: "Registro Mas Antiguo, IMC y Peso, Eliminado" })
        } else {
            console.log(err)
        }
    })
});
router.post('/registro_nutria/', cors(), (req, res) => {
    const { idUser, Nombre, Apellido, Rol, Email, Password, Sintomas, Img, Peso, Altura, Genero, Contex_Fisica } = req.body
    const query2 = "CALL nutriADDorEDIT(?,?,?,?,?,?,?,?,?,?,?,?)";
    mysqlConnection.query(query2, [idUser, Nombre, Apellido, Rol, Email, Password, Sintomas, Img, Peso, Altura, Genero, Contex_Fisica], async (err, rows, fields) => {
        if (!err) {
            res.json({ Status: "Nutricionista Guardado"})
        } else {
            console.log(err)
        }
    }
    );
});

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
    })
    const query2 = "CALL nutriADDorEDIT(?,?,?,?,?,?,?,?,?,?,?,?)";
    mysqlConnection.query(query2, [id, Nombre, Apellido, Rol, Email, Password, Sintomas, Img, Peso, Altura, Genero, Contex_Fisica], async (err, rows, fields) => {
        if (!err) {
            res.json({ Status: "Nutricionista Actualizado " })
        } else {
            console.log(err)
        }
    }
    );;
});


router.delete('/:id', cors(), (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM usuarios WHERE idUser=?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: 'Usuario Borrado' });
        }
    });
});

router.put('/update-img/:id', (req, res) => {
    const { imagen } = req.body;
    const { id } = req.params;
    mysqlConnection.query("Call update_images(?,?)", [id, imagen], (err, rows, fields) => {
        console.log(req.body)
        if (!err) {
            res.json({ Status: 'Foto de Perfil Actualizada' });
        } else {
            console.log(err);
        }
    });
});
router.put('/update-imgNutri/:id', (req, res) => {
    const { imagen } = req.body;
    const { id } = req.params;
    mysqlConnection.query("CALL update_imagesNutria(?, ?)", [id, imagen], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: 'Foto de Nutria Actualizada' });
        } else {
            console.log(err);
        }
    });
});
router.delete('/asignacion/:id', cors(), (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('call borrar_paciente(?)', [id], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: 'Asignacion Eliminada' });
        } else {
            console.log(err);
        }
    });
});
router.get('/peso_historico/:id', cors(), (req, res) => {
    const { id } = req.params
    const query2 = "Call viewPeso(?)";
    mysqlConnection.query(query2, [id], async (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err)
        }
    }
    );
});
router.get('/imc_historico/:id', cors(), (req, res) => {
    const { id } = req.params
    const query2 = "Call viewIMC(?)";
    mysqlConnection.query(query2, [id], async (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err)
        }
    }
    );
});

module.exports = router;  