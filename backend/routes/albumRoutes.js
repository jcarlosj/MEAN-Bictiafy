const { Router } = require( 'express' ),
      { getAlbums, createAlbumAndArtist, getAlbum, updateAlbum, deleteAlbum } = require ( '../controllers/albumController' ),
      album = Router();      

// Escucha la ruta
album .route( '/albums' ) 
    .get( getAlbums )        // Recupera todos los recursos (Registros)
    .post( createAlbumAndArtist );    // Crea o envia una entidad a un recurso en específico 
    
album .route( '/albums/:id' )
    .get( getAlbum )         // Recupera un recurso específico
    .put( updateAlbum )      // Reemplaza el recurso específico de destino
    .delete( deleteAlbum );  // Borra un recurso en específico

module .exports = album;