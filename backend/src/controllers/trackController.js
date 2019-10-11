/** Track Controllers */
const trackController = {},
    Artist = require( '../models/Artista' ),
    Album = require( '../models/Album' ),
    Track = require( '../models/Cancion' ); 

// Métodos del Controlador Tracks
trackController .getTracksAlbumsArtist = async ( request, response ) => {
    
    const tracks = await Track .find() .populate({
        path: 'album',
        populate : {
            path: 'artista'
        }
    });
    
    response .json( tracks );
}    

trackController .createTracksAlbumsArtist = async ( request, response ) => {
    console .log( 'Enviado por el Cliente', request .body );      // Representa los datos que envia el 'cliente'

    const {
        numero,
        tituloCancion,
        duracion,
        urlCancion,
        album
    } = request .body,

    /** Crea Objeto con el Schema Artista */
    newArtist = new Artist({
        nombre: album .artista .nombre,
        descripcion: album .artista .descripcion,
        imagen: album .artista .imagen
    });

    /** Registra en la BD */
    const $artist = await newArtist .save(),

    /** Crea Objeto con el Schema Album */
    newAlbum = new Album({
        titulo: album .titulo,
        descripcion: album .descripcion,
        anio: album .anio,
        imagen: album .imagen,
        artista: $artist ._id
    });

    /** Registra en la BD */
    const $album = await newAlbum .save(),

    /** Crea Objeto con el Schema Track */
    newTrack = new Track({
        numero,
        tituloCancion,
        duracion,
        urlCancion,
        album: $album ._id
    });

    /** Registra en la BD */
    const track = await newTrack .save();

    console .log( 'Registro realizado', track );

    response .json({ message: 'Artist & Album Saved' });
}

module .exports = trackController;