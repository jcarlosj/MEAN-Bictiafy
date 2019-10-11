const { Router } = require( 'express' ),
      { getTracksAlbumsArtist, createTracksAlbumsArtist } = require( '../controllers/trackController' ),
      cancion = Router();

cancion .route( '/tracks' )
    .get( getTracksAlbumsArtist )
    .post( createTracksAlbumsArtist );

module .exports = cancion;