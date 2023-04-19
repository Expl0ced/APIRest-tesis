<<<<<<< HEAD
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
// Settings
app.set('port', process.env.PORT || 3000);



// Middlewares
app.use(cors({ origin: "*" }))
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

=======
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
// Settings
app.set('port', process.env.PORT || 3000);



// Middlewares
app.use(cors({ origin: "*" }))
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

>>>>>>> 2772ec34df411192a5976936a63c4a06e9930022
