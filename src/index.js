const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
// Settings
app.set('port', process.env.PORT || 3000);



// Middlewares
var corsOptions = {
    origin: ['https://healthyfoodpage.netlify.app', 'localhost:4200'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
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

