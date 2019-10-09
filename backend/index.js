const mongoose = require( 'mongoose' ),
      app = require( './app' ),
      port = 4000;

/** Promise:
 *  1. Realiza conexión a MondoDB  
 *  2. Lanza el servidor usando Express
 *  3. Controla los errores producidos por la secuencia del 'Promise'
 * */
mongoose .connect(
    'mongodb://localhost:27017/bictiafy',
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
) 
.then( () => {
    app .listen( port, () => {
        console .log( `Servidor lanzando en: http://localhost:${ port }` );
    });
}, error => {
    console .log( `Error al lanzar el servidor: ${ error }` );
});