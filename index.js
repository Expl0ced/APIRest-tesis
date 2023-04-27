const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
// Settings
app.set('port', process.env.PORT || 3000);


// Middlewares
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders:['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: 'include',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

//endpoint archivos



// Routes

app.get('/', (req, res) => {
    res.send('Bienvenidos a mi API')
})



app.use('/api/login', cors(corsOptions), require('./src/routes/login/login'));
app.use('/api/recetas', cors(corsOptions), require('./src/routes/recetas/recetas'));
app.use('/api/usuarios', cors(corsOptions), require('./src/routes/usuarios/usuarios'));
app.use('/api/orden_nutri', cors(corsOptions), require('./src/routes/nutricionista/nutricionista'));
app.use('/api/modificar_user',cors(corsOptions), require('./src/routes/asignar_paciente/asignar_paciente'));
app.use('/api/archivo',cors(corsOptions), require('./src/routes/subidas/subidas'));
app.use('/api/saverecipe',cors(corsOptions), require('./src/routes/receta_guardada/receta_guardada'));

// Cualquier otra ruta que no esté definida, devolverá un 404
// app.use((req, res, next) => {
//     res.status(200).send('Not found');
// });

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

