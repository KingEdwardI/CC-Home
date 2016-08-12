// import express
var express = require("express");

// create a variable to handle requests
var app = express();

// allow for an external server to set the port, or use the default
var PORT = process.env.PORT || 8000;

// import external files
var Sighting = require("./Sighting.js");
var UserFtns = require("./userFncs.js");
// import other middleware
var bodyParser = require('body-parser');
var session = require('express-session');

// lifetime variable to hold sightings
var sightings =[];

// logs the current requested URL
app.use(function(req, res, next) {
	console.log(req.url);
	next();
});

// handle form submit data and json AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// add a session property to the req object
app.use(session({
	secret: "lol pokemon", // this should not go on github (after you graduate)
	resave: false,
	saveUninitialized: false
}));

// handle GET requests to localhost:8000/sighting
app.get("/sighting", function(req, res) {
	//check if user is logged in
	if (!req.session.user) {
		res.redirect('/login.html');
		return;
	}
	// send the entire sightings list, as a string
	res.send(JSON.stringify(sightings));
});

// handle GET requests for specific Ids
app.get("/sighting/id/:pokemonId", function(req, res) {
	//check if user is logged in
	if (!req.session.user) {
		res.redirect('/login.html');
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

// handle GET requests for other Ids
app.get("/sighting/city/:cityId", function(req, res) {
	//check if user is logged in
	if (!req.session.user) {
		res.redirect('/login.html');
		return;
    }
    var nearby = [];
    for(var i = 0; i < sightings.length; i++){
        if(sightings[i].locStr == (req.params.cityId)){
            console.log('hello');
            nearby.push(sightings[i]);
        }
    }
	// send any sightings that match the pokemon id
    res.send(JSON.stringify(nearby));
});

app.post('/sighting/city', function(req,res) {
    if (!req.session.user) {
		res.redirect('/login.html');
		return;
	}
    req.session.sightLoc = req.body.locStr;
    res.send('success');
})

app.get('/sighting/id/:id', function(req,res) {
    if (!req.session.user) {
    res.redirect('/login.html');
    return;
    }
    var ids = [];
    for(var i = 0; i < sightings.length; i++){
        if(sightings[i].pokemonId == (req.params.id)){
            ids.push(sightings[i]);
        }
    }
    res.send(JSON.stringify(ids));
})

// handles POST request to /sighting
app.post("/sighting", function(req, res) {
	// Check if the user is logged in
	if (!req.session.user) {
		res.redirect('/login.html');
		return;
	}
    // create new Sighting object with the constructor and store it in the sightings array
	var newLoc = new Sighting(
		req.body.locStr,
		req.body.pokemonId,
		Date.now(),
		req.session.user);
	sightings.push(newLoc);

	//Tell the frontend that the request was successful
	res.send("success");
});

// send login.html to the user
app.post('/login(.html)?', function(req, res){
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

// allow access to the /map page without having to type '.html'
app.get('/map(.html)?', function(req,res) {
	//Check if the user is logged in
	if (!req.session.user) {
		res.redirect("/login.html");
		return;
	}
	//send forward map.html
	res.sendFile(__dirname + "/public/map.html");
});

// registration
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

function timeRemoval(){
    setInterval(function(){
        time = Date.now();
        for(var i = 0; i < sightings.length; i++){
            if(sightings[i].timestamp <= time - 600000){
                sightings.splice(i,1)
            }
        }
    60000});
}

timeRemoval();
// serve files and folders in 'public' as-is
app.use(express.static("public"));

// 404 error
app.use(function(req, res, next) {
	res.status(404);
	res.send("It's not very effective");
});

// start the server
app.listen(PORT, function() {
	console.log("Gotta catch 'em all on port " + PORT);
});
