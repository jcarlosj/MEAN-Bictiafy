const { Router } = require( 'express' ),
      { getAlbumsAndArtists, createAlbumAndArtist, getAlbumAndArtist, updateAlbumAndArtist, deleteAlbumAndArtist } = require ( '../controllers/albumController' ),
      album = Router();      

// Escucha la ruta
album .route( '/albums' ) 
    .get( getAlbumsAndArtists )        // Recupera todos los recursos (Registros)
    .post( createAlbumAndArtist );    // Crea o envia una entidad a un recurso en específico 
    
album .route( '/albums/:id' )
    .get( getAlbumAndArtist )         // Recupera un recurso específico
    .put( updateAlbumAndArtist )      // Reemplaza el recurso específico de destino
    .delete( deleteAlbumAndArtist );  // Borra un recurso en específico

module .exports = album;