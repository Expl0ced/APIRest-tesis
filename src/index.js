const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
// Settings
app.set('port', process.env.PORT || 3000);



// Middlewares
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200, https://apihealthyfood.herokuapp.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

//endpoint archivos


// Routes
app.use('/api/login', require('./routes/login'));
app.use('/api/recetas', require('./routes/recetas'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/orden_nutri', require('./routes/nutricionista'));
app.use('/api/modificar_user', require('./routes/asignar_paciente'));
app.use('/api/archivo', require('./routes/subidas'));
app.use('/api/saverecipe', require('./routes/receta_guardada'));

// app.post("/uploads", (req, res) => { 
//     const newpath = __dirname + "/files/";
//     const file = req.files.file;
//     const filename = file.name;

//     file.mv(`${newpath}${filename}`, (err) => {
//         if (err) {
//             res.status(500).send({ message: "File upload failed", code: 200 });
//         }
//         res.status(200).send({ message: "File Uploaded", code: 200 });
//     });
// });


// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

