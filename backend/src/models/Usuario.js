const mongoose = require( 'mongoose' ),
      Schema = mongoose .Schema;

const UsuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    correo: String,
    contrasena: String,
    rol: String, 
    imagen: String,
    fecha_registro: {
        type: Date,
        default: Date .now
    }
});

module .exports = mongoose .model( 'Usuario', UsuarioSchema );