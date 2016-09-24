// various problems to practice algorithmic thinking
// meticulously documented, but ultimately incomplete



/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*///
//          Problem 1           ////
/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*///
// mode of numbers of an array > 0
function mode(arr){
    var counts = {};
    var i, j;
    var maxcount = 1;
    var maxnum = arr[0];

    for(i = 0; i < arr.length; i++){
        // if the number at the 'i' index of the array does not exist
        if(counts[arr[i]] === undefined){
            // set that count at the index of counts array to 0, and the indexes preceding that index to undefined
            counts[arr[i]] = 0;
        }
        // add count to the index (cannot add to undefined)
        counts[arr[i]] += 1;
    }
    for(var e in counts) {
        // check which )umber appears the most
        if (counts[e] > maxcount) {
            // set the index (number set at index) to variable
            maxcount = counts[e];
            // set the max number to the index, which was the number from the first array.
            maxnum = e;
        }
    }
    return maxnum;
}
console.log("PROBLEM 1: mode: " + mode([4.5,2,4.5,3.5,3,4.5]));
// arr = [4,2,4,3,3,4,6]
// counts =[u,u,1,2,3,u,1]
// mode = 4

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*///
//          Problem 2           ////
/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*///
// check if leap year

function leapYear(year) {
    // rules for leap years
    if(year % 4 === 0 && year % 400 === 0){
        return true;
    } else {
        return false;
    }
}
console.log("PROBLEM 2: Leap year is: " + leapYear(2000));

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*///
//          Problem 3           ////
/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*///
// look for the first missing number

function firstInt(arr){
    for(var i = 0; i < arr.length + 1; i++){
        // if the number at the index of the array is not equal to the index + 1
        if(arr[i] !== i + 1){
            // return the missing number
            return i + 1;
        }
    }
}

quop = [1,3,3];
console.log("PROBLEM 3: Missing number: " + firstInt(quop));

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*///
//          Problem 4           ////
/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*///
// remove duplicates

function duplicates(arr){
    var counts = [];
    var i, j;
    var single = [];
    
    for(i = 0; i < arr.length; i++){
        // if the number is not already in the array, put it there and set to the number
        if(counts[arr[i]] === undefined){
            counts[arr[i]] = arr[i];
        }
    }
    for(j = 0; j < counts.length; j++) {
        // push the numbers to their own array
        if (counts[j] !== undefined) {
            single.push(counts[j]);
        }
    }
    return single;
}
// similar to problem one, but instead of counting the numbers via the index, just take the number at array[index] and store it in another array. 
dup = [1,1,2,3,1,2,3,5,5,5,8,8,9,9];
console.log("PROBLEM 4: Duplicates: " + duplicates(dup));

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*///
//          Problem 5           ////
/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*///
// pig latin

function piggy(string){
    var splitWords = [];
    var joinedWords = [];
    // split the original string into an array
    var eng = string.split(" ");
    pigLatin = "";
    for(var i = 0; i < eng.length; i++){
        // split the array into letters
        splitWords.push(eng[i].split(""));
    }
    for(var j = 0; j < splitWords.length; j++){
        // move the first letter to the end of the word and add 'ay'
        splitWords[j].push(splitWords[j].shift() + "ay ");
        // put the letters back together within an array
        joinedWords = [].concat.apply([], splitWords);
        // join the letters to make words
        pigLatin = joinedWords.join('');
    }
        // set to lowercase
    pigLatin = pigLatin.toLowerCase();
    return pigLatin;
}
var test = "the quick red fox jumped over the brown log";
console.log("PROBLEM 5: Pig Latin: " + piggy(test));

function unPiggy(pigLatin){
    var splitWords = [];
    var joinedWords = [];
    // split the words on space character
    var pig = pigLatin.split(" ");
    var english = "";
    // split words to letters
    for(var i = 0; i < pig.length; i++){
        splitWords.push(pig[i].split(""));
    }
    for(var j = 0; j < splitWords.length - 1 ; j++){
        // remove last two letters
        splitWords[j].pop();
        splitWords[j].pop();
        // move the last letter to the beginning
        splitWords[j].unshift(splitWords[j].pop());
        // add a space to the end of each word
        splitWords[j].push(" ");
        // combine subarrays to make single array
        joinedWords = [].concat.apply([], splitWords);
        // join into words
        english = joinedWords.join(""); 
    }
    english = english.toLowerCase();
    return english;
}
console.log("PROBLEM 5: English: " + unPiggy(piggy(test)));

/*
 * Take in a string
 * split the string by the word
 * split the word
 * move the first letter to the end of the word
 * concatenate 'ay' to the end of the word
 * join the newly formed words back together
 * return the rejoined string and print
 *
 * take in pig latin string
 * split string by the word
 * split words by the letter
 * remove last two letters of each word 'ay'
 * move the last letter to the beginning (pop & unshift)
 * rejoin letters
 * rejoin words
 * return string
*/

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*///
//          Problem 6           ////
/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*///
// same number & same value

function compare(arr1, arr2){
    if(arr1.length === arr2.length){
        if(typeof(arr1) === 'undefined' && typeof(arr2) === 'undefined'){
            return true;
        } else if(arr1.every(Number) && arr2.every(Number)){
            arr1.sort(function(a,b){return a-b;});
            arr2.sort(function(a,b){return a-b;});
            for(var i = 0; i < arr1.length; i++){
                if(arr1[i] !== arr2[i]){
                    return false;
                }
            }
            return true;
        } else if(arr1.every(String) && arr2.every(String)){
            arr1.sort();
            arr2.sort();
            for(var j = 0; j < arr1.length; j++){
                if(arr1[j] !== arr2[j]){
                    return false;
                }
            }
            return true;
        }
    } else {
        return false;
    }
}
var blurg = [];
var blah = [];

console.log("PROBLEM 6: Compare Values: " + compare(blurg,blah));

/*
 * take in two arrays
 * sort elements of each array
 * compare elements of the arrays
 * if matching return true
 * else return false
*/

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*///
//          Problem 7           ////
/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*///
// cutoff & replace

function replNums(arr, cutoff) {
    for(var i = 0; i < arr.length; i++){
        if(arr[i] >= cutoff){
            arr.splice(i, 1, cutoff);
        }
    }
    return arr;
}

stuff = [1,2,3,4,5,8,9,2,4];
cut = 5;
console.log("PROBLEM 7: Replace Numbers: " + replNums(stuff, cut));
// TODO: returns undefined

/*
 * iterate through array and find cutoff value within
 * once found, replace all values following with the cutoff value
 * if any of the following values are less than the cutoff value leave them in place
*/

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*///
//          Problem 8           ////
/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*///

function random(){
    var diffNums = [];
    var generateNums; 
    for(var i = 0; i < 100; i++){
        generateNums = Math.round(Math.random() * 100);
        if(diffNums.indexOf(generateNums) == -1) {
                diffNums.push(generateNums);
            if(diffNums.length == 10){
                return diffNums;
            }
        }
    }
}

console.log("PROBLEM 8: Random Numbers: " + random());

/* 
 * generate amount of numbers
 * check all against each other
 *    1  generate one at a time and compare whether or not they are equal
 *    2  or generate all at once and regenerate until all are different.
 *      # 1 is probably quicker than generating all of them at once.
*/

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*///
//          Problem 9           ////
/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*///
// merge sorted arrays

function mergeArrays(arr1, arr2){
    merged = arr1.concat(arr2);
    sorted = merged.sort(function(a,b){return a-b;});
    return sorted;
}

first = [-1,0,1];
second = [-2,2];
console.log("PROBLEM 9: Merge Arrays: " + mergeArrays(first, second));

/*
 * take in two arrays
 * merge arrays
 * sort again
*/
/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
//          Problem 10          //
/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
// determine largest sum of subarray

function subSum(array){
    for(var i = 0; i < array.length; i++){
        
    }
}

nums = [1,3,-4,5,7,9]; //[5,7,9]
//nums1 = [1,5,-4,3,2,-3]; //[1,5,-4,3,2]
//nums2 = [2,2,-10,5,-10,2,2]; //[5]
//console.log(subSum(nums));
//console.log(subSum(nums1));
//console.log(subSum(nums2));

/*
 * take in an array
 * look at each element
 *      individually and grouped
 *      add each group
 * compare all values 
 * return group as array
*/

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
//          Problem 11          //
/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
// square code

function encodeSquare(string){
    var str;
    var noSpace = [];
    var square = 0;
    str = string.split('');
    var splitSpace = [];
    var squareCode = "";
    for(var i = 0; i < str.length; i++){
        if(str[i] != " ") {
            noSpace.push(str[i]);
        }
    }
    square = Math.round(Math.sqrt(noSpace.length));
    console.log(square);
    for(var j = 0; j < noSpace.length; j += square){
        splitSpace.push(noSpace.slice(j, j + square));
    }
    for(var k = 0; k < splitSpace.length; k++){
        for(var l = 0; l < splitSpace[k].length; l += 1){
            squareCode += splitSpace[k][l];
        }
    }
    console.log(squareCode);
}

function decodeSquare(square){

}

console.log(encodeSquare("have a nice day!"));
/*
 * take in a string
 * remove spaces
 * determine length of string
 * find square of string length rounded
 * split string into squared lengths
 * return split strings line by line
 * 
 * take in square code
 * determine length of first string
 * combine strings according to length of first
 * return decoded string
*/
/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
//          Problem 12          //
/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
// count letter pairs

function letterPairs(text) {

}

/*
 * take in a string
 * split string into subarrays of two
 *      start at index 0 and index 1 to get lists of letter pairs
 * count stored letter pairs
 * sort and store top (10) letter pairs
 * take highest (10)  count of letter pairs and divide by length of the list to get list of percentages
 * return list of percentages
 * create exceptions for strings with less than 10 letter pairs
 */

// Problems completed: 1,2,3,4,5,6,7,8,9, , , .
