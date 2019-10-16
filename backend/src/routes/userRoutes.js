const { Router } = require( 'express' ),
      { getUsers, createUser, getUser, updateUser, deleteUser, loginUser, uploadUserImage } = require ( '../controllers/userController' ),
      usuario = Router(),
      multipart  =  require( 'connect-multiparty' ),
      multipartMiddleware  =  multipart({ uploadDir:  './uploads' });
      

// Escucha la ruta
usuario .route( '/users' ) 
    .get( getUsers )        // Recupera todos los recursos (Registros)
    .post( createUser );    // Crea o envia una entidad a un recurso en específico 
    
usuario .route( '/users/:id' )
    .get( getUser )         // Recupera un recurso específico
    .put( updateUser )      // Reemplaza el recurso específico de destino
    .delete( deleteUser );  // Borra un recurso en específico

usuario .route( '/login' )
	.post( loginUser );		// Login de Usuario

usuario .route( '/users-upload/:id', multipartMiddleware )
    .get( uploadUserImage );

module .exports = usuario;