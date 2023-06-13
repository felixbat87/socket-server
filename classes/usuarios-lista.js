
export class UsuariosLista {
   lista = []
   constructor() {}
 
   //Agregar Un Usuario
   agregar(usuario) {
     this.lista.push(usuario)
     console.log(this.lista)
     return usuario
   }
 
   actualizarNombre(id, nombre) {
     for (let usuario of this.lista) {
       if (usuario.id == id) {
         usuario.nombre = nombre
         break
       }
     }
     console.log("=========Actualizando Usuarios=========")
     console.log(this.lista)
   }
 
   //Obtener Lista de Usuarios
   getLista() {
     return this.lista
   }
   //Obtener un usaurio
   getUsuario(id) {
     return this.lista.find(usuario => usuario.id === id)
   }
 
   //obtener usuario de una sala en particular
 
   getUsuariosEnSala(sala) {
     return this.lista.filter(usuario => usuario.sala === sala)
   }
   //borrar Usuario
   borrarUsuario(id) {
     const tempUsuario = this.getUsuario(id)
 
     this.lista = this.lista.filter(usuario => usuario.id !== id)
 
     return tempUsuario
   }
 }
 