/** Artist Controllers */
const artistController = {},
      Artist = require( '../models/Usuario' );       // Importa el Modelo de datos;

// Métodos del Controlador Artists
artistController .getArtists = async ( request, response ) => { 
    
    const artists = await Artist .find();   
    response .json( artists ); 
};

artistController .createArtist = async ( request, response ) => { 
    console .log( 'Enviado por el Cliente', request .body );      // Representa los datos que envia el 'cliente'

    const { 
        nombre,
        descripcion, 
        imagen  
    } = request .body,
        
    /** Crea Objeto con el Schema Note */
    newArtist = new Artist({            
        nombre,
        descripcion, 
        imagen 
    });

    console .log( 'Objeto Schema Artist', newArtist );

    /** Registra en la BD */
    await newArtist .save();              // Es una operación Asíncrona 

    response .json({ message: 'Artist Saved' });
}

artistController .getArtist = async ( request, response ) => {
    console .log( request .params .id );     // Recibe el parámetro ID de la URL

    const artist = await Artist .findById( request .params .id );
    console .log( artist );
    response .json( artist );
}

artistController .updateArtist = async ( request, response ) => {
    console .log( request .params .id );     // Recibe el parámetro ID de la URL
    
    const { 
        nombre,
        descripcion, 
        imagen  
    } = request .body,

    artist = await Artist .findByIdAndUpdate( request .params .id, {
        nombre,
        descripcion,
        imagen
    });
    console .log( artist );
    response .json({ message: 'Artist Updated' });
}

artistController .deleteArtist = async ( request, response ) => {

    console .log( request .params .id );     // Recibe el parámetro ID de la URL

    const artist = await Artist .findByIdAndDelete( request .params .id );
    console .log( artist );
    response .json({ message: 'Artist Deleted' });
}

module .exports = artistController;