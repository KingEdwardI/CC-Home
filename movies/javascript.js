// //////////////////// //
// create lists of data //
// //////////////////// //
function dataList(checkouts){
    var users = [];
    var months = [];
    var movieId = [];
    checkouts = checkouts.replace(/\n/g, " ");
    checkouts = checkouts.split(" ");
    for(var i = 0; i < checkouts.length; i+=2){
        users.push(checkouts.splice(i, 1));
    }
    for(var j = 0; j < checkouts.length; j++){
        months.push(checkouts.splice(j,1));
    }
    for(var k = 0; k < checkouts.length; k++){
        movieId.push(checkouts[k]);
    }
    var items = [[users], [months], [movieId]];
    return items;
}

// ////////////////////// //
// find max count of data //
// ////////////////////// //
function counts(data){
    // concatenate array af arrays
    data = [].concat.apply([], data);
    // variables for finding the count of each item
    var counter = [];
    var maxnum = data[0];
    var modes = [];

    for(var i = 0; i < data.length; i++){
        // if the counter index does not exist
        if(counter[data[i]] === undefined){
            // set the index to the value of the data (ex. dec)
            counter[data[i]] = 0;
        }
        // increment data at index
        counter[data[i]] += 1;
    }
    // find the highest count(s)
    var max = 0;
    for (x in counter){
        if(counter[x] > max){
            max = counter [x];
        }
    }
    maxNums = [];
    // get the index of the highest counts
    for(var k in counter){
        if (counter[k] == max) {
            maxNums.push(k)
        }
    }
    return maxNums;
}

// ///////////////////////////// //
// turn movie list into an array //
// ///////////////////////////// //
function movieData(movies){
    movies = movies.replace(/\n/g, " ");
    movies = movies.split(/\d+ (?=\D)/); // splits on any number followed by a space. 
    movies.shift();
    return movies;
}

// ////////////////////////// //
// get data from api and call //
// functions on that data     //
// ////////////////////////// //
$.get('http://159.203.175.239:8080/movies.txt', function(movies){
    $.get('http://159.203.175.239:8080/checkouts.txt', function(checkout){
        var moviesList = movieData(movies);
        // set the return value to a variable
        var items = dataList(checkout);
        // concatenate arrays
        items = [].concat.apply([], items);
        // set each array from items to their own
        var users = items.slice(0,1);
        var months = items.slice(1,2);
        var movieId = items.slice(2,3);
        // concatenate each item array to array items
        users = [].concat.apply([], users);
        months = [].concat.apply([], months);
        movieId = [].concat.apply([], movieId);

        var mostMonths = (counts(months));
        var mostUsers = (counts(users));
        var mostMovie = (counts(movieId));
        var bestMovie = moviesList[mostMovie];
        console.log("The most popular month(s) : " + mostMonths);
        console.log("The most common user(s) : " + mostUsers);
        console.log("The most popular movie(s) : " + bestMovie);
    });
});
