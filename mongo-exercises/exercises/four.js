module.exports = function(mongoose, Checkout, Movie) {
  // Which movie was checked out the most each month?
  /*
   * access the checkouts 
   *  go through each month
   *  count the movies in each month
   *  return the month and the movieId with the highest count
   */
  Checkout.aggregate(
    { $group: { _id : { month : "$month", movie : "$movieId" }, total : { $sum : 1 } } },
    { $project : { month : "$_id.month", movie : "$_id.movie", total : "$total", _id : 0 } },
    { $sort : { month : 1, total: -1} },
    function(err, res) {
       if (err){
        console.log(err);
      } else {
      top = [];
      months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','nov','dec'];
      var topForMonth = 0;
      var currentMonth = '';
        for (var i = 0; i < res.length; i++) {
          if ( res[i].month == currentMonth ){
            if ( res[i].total == topForMonth ){
              top.push(res[i]);
            }
          } else {
            currentMonth = res[i].month;
            topForMonth = res[i].total;
            top.push(res[i]);
          }
        }
        console.log("@@@@@", top, top.length)
        var byMonth = [];
        var movies = [];
        for (var k = 0; k < months.length; k++) {
          for (var l = 0; l < top.length; l++){
            if(top[l].month == months[k]){
              byMonth.push(top[l]);
            }
          movies.push(top[l].movie);
          }
        }
        console.log("#####", byMonth, byMonth.length);
        Movie.find( 
          { _id : { $in: movies } },
          function(err, res){
            if(err){
              console.log(err);
            } else {
              title = [];
              for (var u = 0; u < res.length; u++){
                title.push(res[u].title);
              }
              console.log("$$$$$", title, title.length);
            }
            for( var y = 0; y < byMonth.length; y++ ){
              console.log("@#$%&", " Month: ", byMonth[y].month, " Title: '" + title[y] + "' Checkouts: ", byMonth[y].total);
            }
          }
        );
      }
    }
  );
};

  /*
   * Gets month with top movie
  Checkout.aggregate(
    { "$group": { "_id": { "month" : "$month", "movie" : "$movieId" },
      "count": { "$sum": 1 } } }, 
      { $sort: { count : -1 } },
      function(err, res) {
        if(err) {
          console.log(err);
        } else {
          for(var i = 0; i < 13; i++ ){
            console.log("####", res[i]._id);
          }
        }
      }
  );
  */
