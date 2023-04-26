
const express = require('express');
const router = express.Router();
const cors = require('cors');

const mysqlConnection  = require('../../database.js'); 



router.get('/:id', cors(), (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('select rg.id, rg.idReceta, rg.idUser, r.Encabezado, r.Imagen from receta_guardada rg join recetas r on rg.idReceta=r.IdReceta join usuarios us on rg.idUser=us.idUser where rg.idUser=?;',[id],(err, rows, fields) => {
        console.log(res)
        if(!err) {
        res.json(rows);
    } else {
        console.log(err);
    }
    });  
});

router.post('/', cors(), (req, res) => {
    const { id, idReceta, idUser } = req.body;
    const query = "call Saverecipe(?,?,?)";
    mysqlConnection.query(query, [ id,  idReceta, idUser ], (err, rows, fields) => {
        console.log(res)
        if (!err) {
            res.json({ Status: 'Receta Ingresada' })
        } else {
            console.log(err)
        }
    });
});     

router.delete('/:id', cors(), (req, res)=>{
    const {id}= req.params;
    mysqlConnection.query('delete from receta_guardada where idReceta=?', [id], (err, rows, fields)=>{
        if(!err){
            res.json({Status:'Usuario Borrado'});
        }
    });
});     

router.get('/comprobar/:id', cors(), (req, res) => {
    const { idReceta } = req.params;
    mysqlConnection.query('select * from receta_guardada where idReceta=?',[idReceta],(err, rows, fields) => {
        console.log(res.body)
        if(!err) {
        res.json(rows);
    } else {
        console.log(err);
    }
    });  
});

module.exports=router;