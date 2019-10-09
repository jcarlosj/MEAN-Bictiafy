const { Router } = require( 'express' ),
      { getArtists, createArtist, getArtist, updateArtist, deleteArtist } = require ( '../controllers/artistController' ),
      artista = Router();      

// Escucha la ruta
artista .route( '/artists' ) 
    .get( getArtists )        // Recupera todos los recursos (Registros)
    .post( createArtist );    // Crea o envia una entidad a un recurso en específico 
    
artista .route( '/artists/:id' )
    .get( getArtist )         // Recupera un recurso específico
    .put( updateArtist )      // Reemplaza el recurso específico de destino
    .delete( deleteArtist );  // Borra un recurso en específico

module .exports = artista;