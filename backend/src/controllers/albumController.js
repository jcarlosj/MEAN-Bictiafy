/** Album Controllers */
const albumController = {},
      Artist = require( '../models/Artista' ),       // Importa el Modelo de datos;
      Album = require( '../models/Album' );          // Importa el Modelo de datos;

// Métodos del Controlador Albums
albumController .getAlbumsAndArtists = async ( request, response ) => { 
    
    const albums = await Album .find() .populate( 'artista' );   
    response .json( albums ); 
}

albumController .createAlbumAndArtist = async ( request, response ) => { 
    console .log( 'Enviado por el Cliente', request .body );      // Representa los datos que envia el 'cliente'

    const { 
            titulo,
            descripcion,
            anio,
            imagen,
            artista
        } = request .body,

        /** Crea Objeto con el Schema Artista */
        newArtist = new Artist({
            nombre: artista .nombre,
            descripcion: artista .descripcion, 
            imagen: artista .imagen
        });

    console .log( 'Objeto Schema Artist', newArtist );

    /** Registra en la BD */
    const artist = await newArtist .save(),              // Es una operación Asíncrona 

        /** Crea Objeto con el Schema Album */
        newAlbum = new Album({            
            titulo,
            descripcion,
            anio,
            imagen,
            artista: artist ._id 
        });

    console .log( 'Objeto Schema Artist', newAlbum );

    /** Registra en la BD */
    const album = await newAlbum .save();

    console .log( 'Registro realizado', album );

    response .json({ message: 'Artist & Album Saved' });
}

albumController .getAlbumAndArtist = async ( request, response ) => {
    console .log( request .params .id );     // Recibe el parámetro ID de la URL

    const album = await Album .findById( request .params .id ) .populate( 'artista' );
    console .log( album );
    response .json( album );
}

albumController .updateAlbumAndArtist = async ( request, response ) => {
    console .log( request .params .id );     // Recibe el parámetro ID de la URL
    
    const { 
            titulo,
            descripcion,
            anio,
            imagen,
            artista
        } = request .body,

        album = await Album .findByIdAndUpdate( request .params .id, {
            titulo,
            descripcion,
            anio,
            imagen
        }),
        artist = await Artist .findByIdAndUpdate( album .artista, {
            nombre: artista .nombre,
            descripcion: artista .descripcion, 
            imagen: artista .imagen
        });

    console .group( 'Encuentra' );      
    console .info( 'Album', album );
    console .info( 'Artista', artist );
    console .groupEnd();

    console .group( 'Actualiza a' );
    console .log( 'Album & Artista', album );
    console .groupEnd();

    response .json({ message: 'Album Updated' });
}

albumController .deleteAlbumAndArtist = async ( request, response ) => {

    console .log( request .params .id );     // Recibe el parámetro ID de la URL

    const album = await Album .findByIdAndDelete( request .params .id ),
          artist = await Artist .findByIdAndDelete( album .artista );

    console .group( 'Encuentra y Elimina' );      
    console .info( 'Album', album );
    console .info( 'Artista', artist );
    console .groupEnd();      

    response .json({ message: 'Album & Artist Deleted' });
}

module .exports = albumController;