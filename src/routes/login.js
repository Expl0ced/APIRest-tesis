const express=require('express');
const router=express.Router();

const mysqlConnection  = require('../database.js');
const jwt =require('jsonwebtoken')

router.post('/', (req,res)=>{
    const { email, pass }= req.body;
    mysqlConnection.query('select idUser ,Email, Rol, Nombre, Apellido from usuarios where Email=? and Password=?',
    [email, pass],
    (err, rows, fields) => {
        if(!err){
            console.log(rows)
            if(rows.length>0){
                let data= JSON.stringify(rows[0]);
                const token = jwt.sign(data, 'uwu');
                res.json({token})
            }else{
                res.json('Email o Contraseña incorrectos')
            }
        }else{
            console.log(err);
        } 
    })
})

router.post('/test', verifyToken,(req, res)=>{
    res.json('Informacion secreta');
})

function verifyToken(req,res, next){
    if(!req.headers.authorization){
        return res.status(401).json('No autorizado');
    }   
    
    const token=req.headers.authorization.substr(7);
    if(token!=''){
        const content = jwt.verify(token,'uwu');
        req.data = content
        next()
    }else{
        res.status(401).json('Token vacio')
    }
}

module.exports=router;