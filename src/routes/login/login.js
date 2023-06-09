const express = require('express');
const router = express.Router();
const cors = require('cors');
const mysqlConnection = require('../../database.js');
const jwt = require('jsonwebtoken')

router.post('/', (req, res) => {
    const { email, pass } = req.body;
    mysqlConnection.query(
        'select idUser, nutria.idNutri, Email, Rol, Nombre, Apellido from usuarios join nutricionistas nutria on usuarios.Email=nutria.EmailNutri and usuarios.Password=nutria.PasswordNutri where Email =?  and Password = ?',
        [email, pass],
        (err, rows, fields) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
            }

            if (rows.length > 0) {
                const data = JSON.stringify(rows[0]);
                const token = jwt.sign(data, 'stil');
                return res.json({ token });
            } else {
                return res.status(401).json({ error: 'Email o Contraseña incorrectos' });
            }
        }
    );
});

router.post('/nutri',cors(), (req, res) => {
    const { email, pass } = req.body;
    mysqlConnection.query(
        'select idNutri, EmailNutri, RolNutri, NombreNutri, ApellidoNutri, usuarios.idUser from nutricionistas nutria join usuarios on usuarios.Email=nutria.EmailNutri and usuarios.Password=nutria.PasswordNutri where EmailNutri = ? and PasswordNutri = ?',
        [email, pass],
        (err, rows, fields) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
            }

            if (rows.length > 0) {
                const data = JSON.stringify(rows[0]);
                const token = jwt.sign(data, 'stil');
                return res.json({ token });
            } else {
                return res.status(401).json({ error: 'Email o Contraseña incorrectos' });
            }
        }
    );
});

router.post('/test', verifyToken, (req, res) => {
    res.json('Informacion secreta');
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json('No autorizado');
    }

    const token = req.headers.authorization.substr(7);
    if (token != '') {
        const content = jwt.verify(token, 'uwu');
        req.data = content
        next()
    } else {
        res.status(401).json('Token vacio')
    }
}

module.exports = router;