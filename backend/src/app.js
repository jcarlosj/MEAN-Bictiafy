const express = require( 'express' ),
      app = express(),
      bodyParser = require( 'body-parser' ),

/** Importa rutas disponibles */
      userRoutes = require( './routes/userRoutes' ),
      artistRoutes = require( './routes/artistRoutes' ),
      albumRoutes = require( './routes/albumRoutes' ),
      trackRoutes = require( './routes/trackRoutes' );

require( 'express-async-errors' );

/** Middlewares */
app .use( bodyParser .json() );
app .use( '/api', userRoutes );
app .use( '/api', artistRoutes );
app .use( '/api', albumRoutes );
app .use( '/api', trackRoutes );

module .exports = app;      
