// include file system module
var fs = require("fs");

// array of user objects
var usersArr;

// if the file doesnt exist, set the user list to an empty array
try {
	usersArr = JSON.parse(fs.readFileSync("./users.json"));
} catch (e) {
	usersArr = [];
}

// check if a user exists
function userExists(username) {
	for (var i = 0; i < usersArr.length; i++) {
		if (usersArr[i].username === username) {
			return usersArr[i];
		}
	}
	return undefined;
}

// check that username and password match
function checkLogin (username, password) {
	var user = userExists(username);
	if (user && user.password === password) {
		return true;
	}
	return false;
}

// make a new user & double check that the user doesn't already exist
function registerUser(username, password) {
	if (userExists(username)) {
		return false;
	}
    // using an object literal to store users for simplicity
	usersArr.push({
		username: username,
		password: password
	});
	//save all users as JSON into users.json
	saveAllUsers();
	return true;
}

// convert the array of users to JSON string and save it to file
function saveAllUsers() {
	fs.writeFile("./users.json",JSON.stringify(usersArr),function(err) {
			if (err) {
				console.log(err);
			}
    });
}

// make this file available to other files
module.exports = {
	userExists : userExists,
	checkLogin : checkLogin,
	registerUser : registerUser,
	saveAllUsers : saveAllUsers
};
