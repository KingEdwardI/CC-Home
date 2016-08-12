var express = require("express");
var app = express(); 
var PORT = process.env.port || 8000; 
var bodyParser = require("body-parser"); 
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost');

var User = mongoose.model("User", {
    username : String,
    clickCount: Number
});

app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json()); 
/*
app.use(session({ 
    secret: "Secret Key", 
    resave: false, 
    saveUninitialized: false 
})); 

app.use(function(req, res, next) { 
    console.log(req.url); 
    next(); 
}); 
*/

app.get("/", function(req, res) { 
    res.sendFile(__dirname + "/index.html"); 
}); 

app.post("/api/click", function(req, res) { 
    console.log(req.body.username);

    User.findOneAndUpdate({
        {username : req.body.username}, 
        {$inc : {clickCount: 1}},
        {upsert: true},
    function(err,myUser){
        User.findOne({
            $query : {}
        })
            .sort({
                clickCount: -1
            })
            .exec(function(err, winnerUser){
                res.send({
                    me: myUser,
                    winner: winnerUser
                });
            .});
    });
}); 
app.use(express.static("public")); 

app.use(function(req,res,next){
    res.status(404);
    res.send("No such page")})


app.listen(PORT, function() { 
    console.log("Listening on port " + PORT); 
});
