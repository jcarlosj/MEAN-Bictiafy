const mongoose = require( 'mongoose' ),
      Schema = mongoose .Schema;

const CancionSchema = new Schema({
    numero: String,
    tituloCancion: String,
    duracion: String,
    urlCancion: String,
    album: { type: Schema.ObjectId, ref: 'Album' }
});

module .exports = mongoose .model( 'Cancion', CancionSchema );