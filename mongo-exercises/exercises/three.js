module.exports = function(mongoose, Checkout, Movie) {
	//What is the title of the movie(s) that was the most checked out?
    Checkout.aggregate(
        { $group: { _id: '$movieId', movies: {$sum: 1} } },
        { $sort: { movies: -1 } },
        function (err,res){
            if(err) {
                console.log(err);
            } else {
                console.log(res[0]._id.toString() + " Was checked out the most.")
            }
        Movie.findOne( { _id: res[0]._id },
            function (err, res){
                if(err){
                    console.log(err);
                }
                console.log("The movie '" + res.title + "' was checked out the most");
            }
        );
    });
};
