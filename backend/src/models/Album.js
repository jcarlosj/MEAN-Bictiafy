const mongoose = require( 'mongoose' ),
      Schema = mongoose .Schema;

const AlbumSchema = new Schema({
    titulo: String,
    descripcion: String,
    anio: Number,
    imagen: String,
    artista: { type: Schema.ObjectId, ref: 'Artista' }
});

module .exports = mongoose .model( 'Album', AlbumSchema );