/*
	Constructor function for a sighting
*/
function Sighting(locStr, pokemonId, timestamp, user) {
	this.locStr = locStr;
	this.pokemonId = pokemonId;
	this.timestamp = timestamp;
	this.user = user;
}

/*
    Make sighting usable by other files
*/
module.exports = Sighting;
