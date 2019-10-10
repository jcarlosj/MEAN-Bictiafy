/** Album Controllers */
const albumController = {},
      Artist = require( '../models/Artista' ),       // Importa el Modelo de datos;
      Album = require( '../models/Album' );          // Importa el Modelo de datos;

// Métodos del Controlador Albums
albumController .getAlbums = async ( request, response ) => { 
    
    const albums = await Album .find() .populate( 'artista' );   
    response .json( albums ); 
}
/** TO DO: 
 *  1. Preguntar si la registro de documentos debe ser exclusivamente anidado
 *  2. En caso de que sea exclusivo reescribir el método seedArtist como createAlbum
 */
albumController .seedArtist = async ( request, response ) => { 

    /** Crea Objeto con el Schema Artista */
    const newArtist = new Artist({
        nombre: 'ABBA',
        descripcion: 'Grupo sueco de música pop, integrado por Agnetha Fältskog, Björn Ulvaeus, Benny Andersson y Anni-Frid «Frida» Lyngstad', 
        imagen: 'http://localhost:4000/images/artist/abba.png'
    });

    console .log( 'Objeto Schema Artist', newArtist );

    /** Registra en la BD */
    const artista = await newArtist .save();              // Es una operación Asíncrona 

    /** Crea Objeto con el Schema Album */
    const newAlbum = new Album({            
        titulo: 'ABBA',
        descripcion: 'Tercer álbum',
        anio: '1975',
        imagen: 'http://localhost:4000/images/albums/abba.png',
        artista: artista ._id 
    });

    console .log( 'Objeto Schema Artist', newAlbum );

    /** Registra en la BD */
    const album = await newAlbum .save();

    console .log( 'Registro realizado', album );

    response .json({ message: 'Artist & Album Saved' });
}

albumController .createAlbum = async ( request, response ) => { 
    console .log( 'Enviado por el Cliente', request .body );      // Representa los datos que envia el 'cliente'

    const { 
        titulo,
        descripcion,
        anio,
        imagen,
        artista 
    } = request .body,
        
    /** Crea Objeto con el Schema Note */
    newAlbum = new Album({            
        titulo,
        descripcion,
        anio,
        imagen,
        artista 
    });

    console .log( 'Objeto Schema Album', newAlbum );

    /** Registra en la BD */
    await newAlbum .save();              // Es una operación Asíncrona 

    response .json({ message: 'Album Saved' });
}

albumController .getAlbum = async ( request, response ) => {
    console .log( request .params .id );     // Recibe el parámetro ID de la URL

    const album = await Album .findById( request .params .id ) .populate( 'artista' );
    console .log( album );
    response .json( album );
}
/** TO DO:
 *  1. Realizar implementación de actualización anidada de colecciones
 */
albumController .updateAlbum = async ( request, response ) => {
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
        imagen,
        artista 
    });
    console .log( album );
    response .json({ message: 'Album Updated' });
}

albumController .deleteAlbum = async ( request, response ) => {

    console .log( request .params .id );     // Recibe el parámetro ID de la URL

    const album = await Album .findByIdAndDelete( request .params .id );
    console .log( album );
    response .json({ message: 'Album Deleted' });
}

module .exports = albumController;