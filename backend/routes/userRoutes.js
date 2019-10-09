const { Router } = require( 'express' ),
      usuario = Router();      

// Escucha la ruta
usuario .route( '/' ) 
    .get( ( request, response ) => {
        response .send( 'GET: usuarios' );
    });


module .exports = usuario;