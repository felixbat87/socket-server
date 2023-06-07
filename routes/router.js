const express = require('express');
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

    res.json({
       ok: true,
       mensaje:cuerpo,
       de:de,
       id
    });
  });



 module.exports = router;