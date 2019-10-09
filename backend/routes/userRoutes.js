const { Router } = require( 'express' ),
      { getUsers, createUser, getUser, updateUser, deleteUser } = require ( '../controllers/userController' ),
      usuario = Router();      

// Escucha la ruta
usuario .route( '/users' ) 
    .get( getUsers )        // Recupera todos los recursos (Registros)
    .post( createUser );    // Crea o envia una entidad a un recurso en específico 
    
usuario .route( '/users/:id' )
    .get( getUser )         // Recupera un recurso específico
    .put( updateUser )      // Reemplaza el recurso específico de destino
    .delete( deleteUser );  // Borra un recurso en específico

module .exports = usuario;