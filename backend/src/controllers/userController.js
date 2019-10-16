/** Users Controllers */
const usersController = {},
      bcrypt = require( 'bcryptjs' ),
      jwt = require('jwt-simple'),
      User = require( '../models/Usuario' );       // Importa el Modelo de datos;

// Métodos del Controlador Users
usersController .getUsers = async ( request, response ) => { 
    
    const users = await User .find();   
    response .json( users ); 
};

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

// Login Usuario
usersController .loginUser = async ( request, response ) => {
    console .log( 'Enviado por el Cliente', request .body );      // Representa los datos que envia el 'cliente'

    const { correo, contrasena } = request .body,
          SECRET_KEY='Secret-Key';

    // TODO: Hacer definir valores usando express ( app.set/app.get ) como se hizo con 'port'
    try {
        const user = await User .find({
            correo
        });

        console .log( 'user', user );

        if( user .length == 1 ) {
            // Valida contraseña
            const match = await bcrypt .compare( contrasena, user[ 0 ] .contrasena );

            console .log( 'match', match );

            if( match ) {   //login

                const payload = {
                    _id        : user[ 0 ] ._id,
                    nombre     : user[ 0 ] .nombre,
                    apellido   : user[ 0 ] .apellido,
                    correo     : user[ 0 ] .correo,
                    contrasena : user[ 0 ] .contrasena,
                    rol        : user[ 0 ] .rol, 
                    imagen     : user[ 0 ] .imagen
                }

                console .log( 'El usuario se loguea' );

                /** Encode Token: Paso de JSON y Token al FrontEnd */
                let token = jwt .encode( payload, SECRET_KEY );

                console .log( 'TOKEN', token );
                //response .send( token );

                response .json({ 
                    nombre: user[ 0 ] .nombre,
                    correo: user[ 0 ] .correo,
                    message: 'El usuario se loguea.',
                    token: token 
                });
            }
        }
        else {
            response .json({ error: 'Registrese. El usuario NO existe.' });
        }

    } catch ( err ) {
        response .send( `ERROR: ${ err }` );
    }
}

// Registra Usuario
usersController .createUser = async ( request, response ) => { 
    console .log( 'Enviado por el Cliente', request .body );      // Representa los datos que envia el 'cliente'

    const { nombre, apellido, correo, contrasena, imagen } = request .body;
        
    try {
        const users = await User .find({
            correo
        });
        
        console .log( users .length );

        if( users .length == 0 ) {
            const pass = await bcrypt .hash( contrasena, bcrypt .genSaltSync( 10 ) );
            console .log( 'pass', pass );

            /** Crea Objeto con el Schema Note */
            newUser = new User({            
                nombre,
                apellido,
                correo,
                contrasena: pass,
                rol: 'registrado', 
                imagen,
                fecha_registro: new Date       // Today
            });

            console .log( 'Objeto Schema User', newUser );

            /** Registra en la BD */
            await newUser .save(); 

            response .json({ status: correo + ' registrado!' });
        }
        else {
            response .json({ error: 'El usuario ya existe!' });
        }

    } catch( err ) {
        response .send( `ERROR: ${ err }` );
    }
      
}

// Subir imagen
usersController .uploadUserImage = async( request, response ) => {
    console .log( request .params .id );     // Recibe el parámetro ID de la URL

    const user = await User .findById( request .params .id );
    console .log( user );

    console .log( 'Files', request .files );

    response .json({
        'message': 'Imagen subida exitosamente'
    });
}

module .exports = usersController;