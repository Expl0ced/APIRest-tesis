<<<<<<< HEAD

const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all recetas
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM recetas', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});


router.get('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM recetas WHERE IdReceta=?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});
router.get('/ultima/ingreso', (req, res) => {
    mysqlConnection.query('select IdReceta from recetas ORDER BY IdReceta DESC LIMIT 1;', (err, rows, fields) => {
        console.log(req.body)
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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


router.delete('/:id', (req, res) => {
    const { Id } = req.params;
    mysqlConnection.query('DELETE FROM recetas WHERE id=?', [Id], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: 'Receta Eliminada' });
        }
    });
});

=======

const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all recetas
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM recetas', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});


router.get('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM recetas WHERE IdReceta=?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});
router.get('/ultima/ingreso', (req, res) => {
    mysqlConnection.query('select IdReceta from recetas ORDER BY IdReceta DESC LIMIT 1;', (err, rows, fields) => {
        console.log(req.body)
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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


router.delete('/:id', (req, res) => {
    const { Id } = req.params;
    mysqlConnection.query('DELETE FROM recetas WHERE id=?', [Id], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: 'Receta Eliminada' });
        }
    });
});

>>>>>>> 2772ec34df411192a5976936a63c4a06e9930022
module.exports = router;