const mongoose = require( 'mongoose' ),
      Schema = mongoose .Schema;

const ArtistaSchema = new Schema({
    nombre: String,
    descripcion: String,
    imagen: String
});

module .exports = mongoose .model( 'Artista', ArtistaSchema );