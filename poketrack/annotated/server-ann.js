
/*
Express is a library that we installed by running
npm install express --save
in the terminal. It is located in the node_modules folder.
Express makes our job of writing a node server much easier by
providing shortcuts for many of the tasks that would otherwise
take a lot of code to complete.

typeof(express) == "function"
*/
var express = require("express");

/*
We call the express function to create a new "Express App"
This "app" will handle every request that comes in to our server
We're going to configure this app to handle the requests the
way that we want.
*/
var app = express();

/*
	process.env.PORT is an environment (system) variable
	which allows an external application like Heroku to
	set the port for our server. Or, we use the default
	port of 8000. Remember! Ports below 1024 are reserved
	for administrator use only.
*/
var PORT = process.env.PORT || 8000;

/*
	If we use a local file (like "./whatever.js") that means
	that we're going to load the file from the current folder.
	So, we have written a file called Sightings.js in the current folder
	which exports some data on "module.exports". In this case, it is our
	constructor function for a sighting data point.
*/
var Sighting = require("./Sighting.js");

/*
	Require (but don't yet use) the body-parser middleware
	(installed using "npm install --save body-parser")
	This will take any POST request body, parse it, and
	give it to us as an object called req.body, after the
	request has passed through that middleware
*/
var bodyParser = require('body-parser');

/*
	This does the same thing as above except that it
	handles our session data - it adds an object
	called req.session, which is unique to each user
	and persists for that user across requests
*/
var session = require('express-session');

/*
Application-lifetime variable to hold all of the sightings
*/
var sightings = [];

/*
	Functions for dealing with users
*/
var UserFtns = require("./UserFtns.js");


/*
	Middleware Starts!
*/

/*
	"Transparent" middleware which logs the current requested URL
*/
app.use(function(req, res, next) {
	console.log(req.url);
	next();
});

/*
	Experimental: Anything after this middleware requires
	the user to be logged in
*/
// app.use(function(req, res, next) {
// 	if (!req.session.user) {
// 		res.redirect("/login");
// 	} else {
// 		next();
// 	}
// });

/*
 bodyParser.urlencoded() returns a function(req, res, next) which is used
 as this layer of middleware. We pass an options object in as the first
 parameter to configure the way that the bodyparser middleware function works.
 This handles form submit data.
*/
app.use(bodyParser.urlencoded({ extended: false }));
// same, parse application/json (json AJAX requests)
app.use(bodyParser.json());

/*
	Add the .session property to the req object as it passes through
	this layer of middleware. The session object is per-user.
	By default, for a new user, the session object is empty
*/
app.use(session({
	secret: "lol pokemon", // this should not go on github (after you graduate)
	resave: false,
	saveUninitialized: false
}));

/*
The following are the actual "business logic" middleware, which handle
GET and POST requests to specific routes on the server. We usually call
these types of middleware "routes"
*/

/*
	This is a route, that handles a GET request to localhost:8000/sighting
*/
app.get("/sighting", function(req, res) {
	//check if user is logged in
	if (!req.session.user) {
		res.redirect('/login');
		return;
	}
	// send the entire sightings list, as a string
	res.send(JSON.stringify(sightings));
});

/*
	Handles a GET request to localhost:8000/sighting/4 (charmander!)
	The pokemonId variable (recognizable because it has a ":" in front of it)
	will end up in req.params.pokemonId

	If I have the ROUTE /sighting/:pokemonId/:city
	and I visit the URL /sighting/4/boulder
	then I will have
		req.params.pokemonId == 4
		req.params.city == "boulder"
*/
app.get("/sighting/id/:pokemonId", function(req, res) {
	//check if user is logged in
	if (!req.session.user) {
		res.redirect('/login');
		return;
	}
	// send any sightings that match the pokemon id
	res.send( //send to the user
		JSON.stringify( // a string representing
			sightings //all of the sightings
			.filter( //which match the following
				function(loc) { //that
					return loc.pokemonId == req.params.pokemonId; //the ids match
				}
			)
		)
	);
});


/*
	Same as above, but with a filter on city name (loc string)
*/
app.get("/sighting/city/:cityName", function(req, res) {
	//check if user is logged in
	if (!req.session.user) {
		res.redirect('/login');
		return;
	}
	// send any sightings that match the pokemon id
	res.send(JSON.stringify(sightings.filter(function(loc) {
		return loc.locStr == req.params.cityName;
	})));
});

/*
	This handles a POST request to /sighting
	A post request usually has a post body, which is information from the user
	about what we want to change on the server
	With a POST request, our data will be in req.body, and matches the object
	that is sent to the backend in the jQuery POST request
*/
app.post("/sighting", function(req, res) {
	// Check if the user is logged in
	if (!req.session.user) {
		res.redirect('/login');
		return;
	}
	// Create our new Sighting object using the Sighting constructor function
	// (now we have a new sighting object) and store it in our super fancy
	// database (the sightings array)
	var newLoc = new Sighting(
		req.body.locStr,
		req.body.pokemonId,
		Date.now(),
		req.session.user);
	sightings.push(newLoc);

	//Tell the frontend that the request was successful
	res.send("success");
});

/*
	This is just a way of sending login.html to the user
	when they visit localhost:8000/login
*/
app.get('/login', function(req, res){
	// sendFile requires an absolute path, so we
	// have to use the __dirname, which tells us
	// what directory we are running node in.
	res.sendFile(__dirname + "/public/login.html");
});

/*
	Here is where we handle a login with a username
	and password. Note that this is using the POST
	method.
*/
app.post('/login', function(req, res){
	// TODO: Make this for more than one user
	if (UserFtns.checkLogin(req.body.username, req.body.password)) {
		// if the user logs in, we set the session
		// variable for future requests (now the user is
		// logged in)
		// and then we say that the request was a success
		req.session.user = req.body.username;
		res.send("success");
	} else {
		// If something went wrong, we just say "error"
		res.send("error");
	}
});

/*
	We can use a regular expression (regex) for our route
	so in this case it will match both "map" and "map.html".

	Since this comes *before* the public folder, this means
	that no user will be able to load map.html without
	being logged in.
*/
app.get('/map(.html)?', function(req,res) {
	//Check if the user is logged in
	if (!req.session.user) {
		res.redirect("/login");
		return;
	}
	//send forward map.html
	res.sendFile(__dirname + "/public/map.html");
});

app.post('/register', function(req, res){
	//shorthand variables to save us time
	var username = req.body.username;
	var password = req.body.password;
	if (UserFtns.userExists(username)) {
		// If the username already exists
		if (UserFtns.checkLogin(username, password)) {
			// ... and they have the right password
			// then log the user in
			req.session.user = username;
			// Send "success" so that the frontend knows
			// it is ok to redirect to /map
			res.send("success");
		} else {
			// Otherwise, they might be trying to
			// take a username that already exists - error!
			res.send("error");
		}
	} else {
		// Username is not taken, register a new user
		// and log them in - success!
		if(UserFtns.registerUser(username, password)) {
			req.session.user = username;
			// Send "success" so that the frontend knows
			// it is ok to redirect to /map
			res.send("success");
		} else {
			// there was a problem registering
			res.send("error");
		}
	}
});

/*
	Serve all files and folders in "public" as-is.
*/
app.use(express.static("public"));

/*
	If no other route matches, send a 404 error (file not found)
*/
app.use(function(req, res, next) {
	res.status(404);
	res.send("It's not very effective");
});

/*
	Start the server!
*/
app.listen(PORT, function() {
	console.log("Gotta catch 'em all on port " + PORT);
});
