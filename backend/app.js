const express = require( 'express' ),
      app = express(),
      bodyParser = require( 'body-parser' ),

/** Importa rutas disponibles */
      userRoutes = require( './routes/userRoutes' ),
      artistRoutes = require( './routes/artistRoutes' );

/** Middlewares */
app .use( bodyParser .json() );
app .use( '/api', userRoutes );
app .use( '/api', artistRoutes );

module .exports = app;      
