var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var connectionString='mongodb://localhost:27017/userDB';
mongoose.connect(connectionString);

require('./config/passport')(passport); 

app.configure(function() {

	
	app.use(express.logger('dev')); 
	app.use(express.cookieParser());
	app.use(express.bodyParser()); 

	app.engine('html', require('ejs').renderFile);


	app.use(express.session({ secret: 'test@123' })); 
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash()); 

});

require('./app/routes.js')(app, passport);
app.listen(port);
console.log('The magic happens on port ' + port);
