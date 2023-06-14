const express = require('express');
const server  = require("socket.io");
const router = express.Router();



router.get('/mensajes', (req, res) => {
   res.json({
      ok: true,
      mensaje:'Todo Esta Bien'
   });
 });

 router.post('/mensajes', (req, res) => {

  const cuerpo=req.body.cuerpo;
  const de =req.body.de;

   res.json({
      ok: true,
      mensaje:cuerpo,
      de:de
   });
 });

 router.post('/mensajes/:id', (req, res) => {

   const cuerpo=req.body.cuerpo;
   const de =req.body.de;
   const id= req.params.id;
   
   payload = {

      de,
      cuerpo

   }
   
    res.json({
       ok: true,
       mensaje:cuerpo,
       de:de,
       id
    });

  });

//Servicio para Obtener todos los ids Usuarios

router.get('/usuarios',(req,res)=>{





});

 module.exports = router;