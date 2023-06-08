const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
const bodyParser = require('body-parser');
//Socket.io
const http = require('http');
const { Server } = require("socket.io");

////////////////////////////////////////////

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Body Parse
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//cors
app.use(cors({origin:true,credentials:true}));
//rutas
app.use('/', router);
///////////////////////////////////////////////////
//creando server de soket.io
const server = http.createServer(app);
const io = new Server(server,{ cors: { origin: true, credentials: true } });


const PORT = process.env.PORT||5000
//express normal
// app.listen(PORT, () => {
//     console.log("Servidor en ejecucion:" + PORT);
// });
server.listen(PORT, () => {
    console.log("Servidor en ejecucion:" + PORT);
  });
//io sockets functions

console.log('escuchando conexiones - sockets');

io.on('connection', (cliente) => { 

  console.log('Cliente Conectado');
  
  //mensajes
  mensaje(cliente);
  //Desconectar
  desconectar(cliente);

});
//funcion desconectar

function desconectar(cliente){
  cliente.on('disconnect',()=>{
    console.log("Cliente Desconectado");
  });
}
//Escuchar mensajes
function mensaje(cliente){
  cliente.on('mensaje',(payload={de:String,cuerpo:String})=>{
   console.log("Mensaje Recibido", payload);
  });
}



