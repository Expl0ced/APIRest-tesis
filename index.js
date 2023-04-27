const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
// Settings
app.set('port', process.env.PORT || 3000);


// Middlewares
app.use(cors({  
    origin: '*', // Permitir solicitudes desde estos dos orígenes
    methods: ["GET","PUT","POST","DELETE"], // Permitir solicitudes con estos métodos HTTP
    allowedHeaders: ['Origin', 'X-Requested-With',' Content-Type', 'Accept','Authorization'], // Permitir solicitudes con estos encabezados
    credentials: true,
    optionsSuccessStatus: 200
}));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // Actualiza "*"" con el dominio de tu frontend
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Max-Age', 86400)
//     next();
// });

app.use(express.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

//endpoint archivos



// Routes

app.get('/', (req, res)=>{
    res.send('Bienvenidos a mi API')
})



app.use('/api/login', require('./src/routes/login/login'));
app.use('/api/recetas', require('./src/routes/recetas/recetas'));
app.use('/api/usuarios', require('./src/routes/usuarios/usuarios'));
app.use('/api/orden_nutri', require('./src/routes/nutricionista/nutricionista'));
app.use('/api/modificar_user', require('./src/routes/asignar_paciente/asignar_paciente'));
app.use('/api/archivo', require('./src/routes/subidas/subidas'));
app.use('/api/saverecipe', require('./src/routes/receta_guardada/receta_guardada'));

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

