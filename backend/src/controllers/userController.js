/** Users Controllers */
const usersController = {},
      User = require( '../models/Usuario' );       // Importa el Modelo de datos;

// Métodos del Controlador Users
usersController .getUsers = async ( request, response ) => { 
    
    const users = await User .find();   
    response .json( users ); 
};

usersController .createUser = async ( request, response ) => { 
    console .log( 'Enviado por el Cliente', request .body );      // Representa los datos que envia el 'cliente'

    const { 
        nombre,
        apellido,
        correo,
        contrasena,
        rol, 
        imagen  
    } = request .body,
        
    /** Crea Objeto con el Schema Note */
    newUser = new User({            
        nombre,
        apellido,
        correo,
        contrasena,
        rol, 
        imagen 
    });

    console .log( 'Objeto Schema User', newUser );

    /** Registra en la BD */
    await newUser .save();              // Es una operación Asíncrona 

    response .json({ message: 'User Saved' });
}

usersController .getUser = async ( request, response ) => {
    console .log( request .params .id );     // Recibe el parámetro ID de la URL

    const user = await User .findById( request .params .id );
    console .log( user );
    response .json( user );
}

usersController .updateUser = async ( request, response ) => {
    console .log( request .params .id );     // Recibe el parámetro ID de la URL
    
    const { 
        nombre,
        apellido,
        correo,
        contrasena,
        rol, 
        imagen  
    } = request .body,

    user = await User .findByIdAndUpdate( request .params .id, {
        nombre,
        apellido,
        correo,
        contrasena,
        rol, 
        imagen
    });
    console .log( user );
    response .json({ message: 'User Updated' });
}

usersController .deleteUser = async ( request, response ) => {

    console .log( request .params .id );     // Recibe el parámetro ID de la URL

    const user = await User .findByIdAndDelete( request .params .id );
    console .log( user );
    response .json({ message: 'User Deleted' });
}

module .exports = usersController;