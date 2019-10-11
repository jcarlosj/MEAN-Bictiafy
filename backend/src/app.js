const express = require( 'express' ),
      app = express(),
      bodyParser = require( 'body-parser' ),

/** Importa rutas disponibles */
      userRoutes = require( './routes/userRoutes' ),
      artistRoutes = require( './routes/artistRoutes' ),
      albumRoutes = require( './routes/albumRoutes' );

require( 'express-async-errors' );

/** Middlewares */
app .use( bodyParser .json() );
app .use( '/api', userRoutes );
app .use( '/api', artistRoutes );
app .use( '/api', albumRoutes );

module .exports = app;      
