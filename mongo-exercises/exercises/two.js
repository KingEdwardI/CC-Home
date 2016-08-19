module.exports = function(mongoose, Checkout, Movie) {
	// Which users checked out any of the Lord of the Rings trilogy?
    /* 
     * access the Movie list
     *      if the movie title contains 'Lord of the Rings'
     *          return the movie Ids
     * access the Checkouts
     *      if a user has the movie Id
     *          return that user id
     */
    
    Movie.find(
        { title: { $regex: 'Lord of the Rings' } },
        function (err, res) {
            var idnum = [];
            if (err) {
                return console.log(err);
            } else {
                for( var i = 0; i < res.length; i++ ) {
                    idnum.push(res[i]._id);
                }

                Checkout.distinct(
                    "userId",
                    { movieId: { $in: idnum } },
                    function (err, res) {
                        if (err) {
                            return console.log(err);
                        } else {
                            console.log("The users: ", res.sort().join(", "), "\n ------- \n", res.length, " out of 100 \n ------- \n checked out at least one LOTR movies.");
                        }
                    }
                );
            }
        }
    );
};
