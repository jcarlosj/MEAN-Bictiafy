const express = require( 'express' ),
      app = express(),
      bodyParser = require( 'body-parser' ),

/** Importa rutas disponibles */
      userRoutes = require( './routes/userRoutes' );

/** Middlewares */
app .use( bodyParser .json() );
app .use( '/api', userRoutes );

module .exports = app;      
