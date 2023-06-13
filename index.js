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
//app.use('/', router); llamando a router
///////////////////////////////////////////////////
//creando server de soket.io
const server = http.createServer(app);
const io = new Server(server,{ cors: { origin: true, credentials: true } });
//apis para usar servicio res 
//mensaje privado
app.post('/mensajes/:id', (req, res) => {

  const cuerpo=req.body.cuerpo;
  const de =req.body.de;
  const id= req.params.id;
  
  payload = {

     de,
     cuerpo

  }

  io.in(id).emit('mensaje-privado',payload);

   res.json({
      ok: true,
      mensaje:cuerpo,
      de:de,
      id
   });

 });

 //mensaje general
 app.post('/mensajes', (req, res) => {

  const cuerpo=req.body.cuerpo;
  const de =req.body.de;

  const payload={

    de,
    cuerpo

  }

  io.emit('mensaje-nuevo',payload);

   res.json({
      ok: true,
      mensaje:cuerpo,
      de:de
   });
 });

//
const PORT = process.env.PORT||5000
// express normal
// app.listen(PORT, () => {
// console.log("Servidor en ejecucion:" + PORT);
// });
server.listen(PORT, () => {
    console.log("Servidor en ejecucion:" + PORT);
  });
//io sockets functions

console.log('escuchando conexiones - sockets');
io.on('connection', (cliente) => { 

 //conectar cliente
 
 conectarCliente(cliente);

 //Login configuracion de usuario
 configurarUsuario(cliente);
  //console.log(cliente.id)
  //console.log('Cliente Conectado');
  //mensajes
  mensaje(cliente);
  //Desconectar
  desconectar(cliente);
  
});
//funcion desconectar
function desconectar(cliente){
  cliente.on('disconnect',()=>{
  console.log("Cliente Desconectado");
  usuarioConectados.borrarUsuario(cliente.id);
  });



}
//Escuchar mensajes
function mensaje(cliente){

  cliente.on('mensaje',(payload={de:String,cuerpo:String})=>{
   console.log("Mensaje Recibido", payload);
   io.emit('mensaje-nuevo',payload);
  });

}
//Configurar Usuario

function configurarUsuario(cliente){

  cliente.on('configurar-usuario',(payload={nombre:string},callback=Function)=>{

    usuarioConectados.actualizarNombre(cliente.id,payload.nombre)
  
    callback({
      ok: true,
      mensaje:`Usuario ${payload.nombre}, configurando`
    });
   
  });
  
}
// funcion conectar cliente
function conectarCliente(cliente){

  const usuario= new Usuario(cliente.id);
  usuarioConectados.agregar(usuario);

}

//Clases
class Usuario {
  constructor(id) {
    this.id = id
    this.nombre = "sin-nombre"
    this.sala = "sin-sala"
  }
}
 class UsuariosLista {
  lista = []

  constructor() {}

  // Agregar un usuario
  agregar(usuario) {
    this.lista.push(usuario)
    console.log(this.lista)
    return usuario
  }

  actualizarNombre(id, nombre) {
    for (let usuario of this.lista) {
      if (usuario.id === id) {
        usuario.nombre = nombre
        break
      }
    }

    console.log("===== Actualizando usuario ====")
    console.log(this.lista)
  }

  // Obtener lista de usuarios
  getLista() {
    return this.lista
  }

  // Obtener un usuario
  getUsuario(id) {
    return this.lista.find(usuario => usuario.id === id)
  }

  // Obtener usuario en una sala en particular
  getUsuariosEnSala(sala) {
    return this.lista.filter(usuario => usuario.sala === sala)
  }

  // Borrar Usuario
  borrarUsuario(id) {
    const tempUsuario = this.getUsuario(id)

    this.lista = this.lista.filter(usuario => usuario.id !== id)
    

    return tempUsuario;
  }
}

//Objeto de clase
const usuarioConectados= new UsuariosLista();
