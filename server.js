var mongoose = require( './server/config/mongoose.js' ),
    express  = require( 'express' ),
    bp       = require('body-parser'),
    path     = require( 'path' ),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express();

app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));
//app.use(bp.json());

// configure the app to use bodyParser()
app.use(bp.urlencoded({
    extended: true
}));
app.use(bp.json());

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//app.use(bp.urlencoded({ extended: true }));
//... express, path, app, etc
//require("./server/config/routes.js")(app);
/* since routes.js exports a function
 require("./server/config/routes.js") IS A FUNCTION!
 now we invoke it, passing it app!
*/
//... app listen ...
var routes_setter = require('./server/config/routes.js');
// invoke the function stored in routes_setter and pass it the "app" variable
routes_setter(app);
app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});
