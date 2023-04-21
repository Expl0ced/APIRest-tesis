

const express = require('express');
const router = express.Router();
const cors = require('cors');

const mysqlConnection = require('../../database.js');

var corsOptions = {
    origin: 'https://apihealthyfood.netlify.app',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// GET all recetas
router.get('/', cors(corsOptions), (req, res) => {
    mysqlConnection.query('SELECT * FROM recetas', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });

    console.log('aaaaaaaaaa')
});


router.get('/:id', cors(corsOptions), (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM recetas WHERE IdReceta=?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});
router.get('/ultima/ingreso', cors(corsOptions), (req, res) => {
    mysqlConnection.query('select IdReceta from recetas ORDER BY IdReceta DESC LIMIT 1;', (err, rows, fields) => {
        console.log(req.body)
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});

router.post('/', cors(corsOptions), (req, res) => {
    const { IdReceta, Encabezado, Ingredientes, Preparacion, Notas, Detalles, Imagen, Etiqueta } = req.body;
    const query = "CALL recetasADDorEDIT(?, ?, ?, ?, ?, ?, ? ,?)";
    mysqlConnection.query(query, [IdReceta, Encabezado, Ingredientes, Preparacion, Notas, Detalles, Imagen, Etiqueta], (err, rows, fields) => {
        console.log(res)
        if (!err) {
            res.json({ Status: 'Receta Ingresada' })
        } else {
            console.log(err)
        }
    });
})

router.put('/:id', cors(corsOptions), (req, res) => {
    const { Encabezado, Ingredientes, Preparacion, Notas, Detalles, Imagen, Etiqueta } = req.body;
    const { Id } = req.params;
    // const query ="UPDATE employees SET name=?, salary=? WHERE id=?"
    const query = "CALL recetasADDorEDIT(?, ?, ?, ?, ?, ?, ? ,?);";
    mysqlConnection.query(query, [Id, Encabezado, Ingredientes, Preparacion, Notas, Detalles, Imagen, Etiqueta], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: 'Receta Actualizada' });
        } else {
            console.log(err);
        }
    });
});


router.delete('/:id', cors(corsOptions), (req, res) => {
    const { Id } = req.params;
    mysqlConnection.query('DELETE FROM recetas WHERE id=?', [Id], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: 'Receta Eliminada' });
        }
    });
});


module.exports = router;