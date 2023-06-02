const express = require('express');
const router = express.Router();
const cors = require('cors');
const mysqlConnection = require('../../database.js');

router.get('/:id', cors(), (req, res) => {
    const { id } = req.params;
    mysqlConnection.query("SELECT id, nombre, imagen, fecha_creacion, idUser, nutri_n, nutri_ape FROM files WHERE idUser = 12 AND STR_TO_DATE(fecha_creacion, '%d/%m/%y') BETWEEN CURDATE() - INTERVAL 1 MONTH AND CURDATE() ORDER BY STR_TO_DATE(fecha_creacion, '%d/%m/%y') ASC LIMIT 3", [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/cuenta/:id', cors(), (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('select count(id) from files where idUser=?', [id], (err, rows, fields) => {
        console.log(res)
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.post('/subir-Archivo/', cors(), (req, res) => {
    const { nombre, imagen, fecha_creacion, idUser, nutri_n, nutri_ape } = req.body;

    mysqlConnection.query('INSERT INTO files (nombre, imagen, fecha_creacion, idUser, nutri_n, nutri_ape) VALUES (?,?,?,?,?,?)', [nombre, imagen, fecha_creacion, idUser, nutri_n, nutri_ape], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: 'Archivo Subido' })
        }
        else {
            console.log(err)
        }
    })
})

// router.put('/actualizar/:id', cors(), (req, res) => {
//     const { id, Img } = req.body;
//     const query = "update usuarios set Img=? where idUser=?;";
//     mysqlConnection.query(query, [Img, id ], (err, rows, fields) => {
//         console.log(req.body)
//         if (!err) {
//             res.json({ Status: 'Foto de Perfil Actualizada'});
//         } else {
//             console.log(err);
//         }
//     });
// });

router.put('/:id', (req, res)=>{    
    const { imagen } = req.body;
    const { id } = req.params;
    console.log(imagen)
    mysqlConnection.query("update usuarios set Img=? where idUser=?", [ imagen, id ], (err, rows, fields)=>{
        console.log(req.body)
        if(!err){
            res.json({Status: 'Foto de Perfil Actualizada'});
        }else{
            console.log(err);
        }
    });
}); 

router.put('/prueba/:id', (req, res)=>{    
    const { imagen } = req.body;
    const { id } = req.params;
    console.log(imagen)
}); 

module.exports = router;