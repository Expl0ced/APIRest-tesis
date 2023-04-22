const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
// Settings
app.set('port', process.env.PORT || 3000);



// Middlewares
const whitelist = ['https://healthyfoodpage.netlify.app', 'localhost:4200'];
app.use('/api', function (req, res, next) {
    res.json({
        message: 'This is your API response!'
    });
    console.log("TU api esta hecha por un mamahuevo")
});
app.use(cors({
    origin: '*', // Permitir solicitudes de cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitir solicitudes con estos métodos HTTP
    allowedHeaders: ['Content-Type', 'Authorization'] // Permitir solicitudes con estos encabezados
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "application/json");
    next();
});
app.use(express.json());
app.use(bodyparser.json());

app.use(bodyparser.urlencoded({
    extended: true
}));

//endpoint archivos



// Routes
app.use('/api/login', cors(), require('./routes/login/login'));
app.use('/api/recetas', cors(), require('./routes/recetas/recetas'));
app.use('/api/usuarios', cors(), require('./routes/usuarios/usuarios'));
app.use('/api/orden_nutri', cors(), require('./routes/nutricionista/nutricionista'));
app.use('/api/modificar_user', cors(), require('./routes/asignar_paciente/asignar_paciente'));
app.use('/api/archivo', cors(), require('./routes/subidas/subidas'));
app.use('/api/saverecipe', cors(), require('./routes/receta_guardada/receta_guardada'));

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

