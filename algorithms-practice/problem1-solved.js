/*
1. Write a function which takes an array of numbers and returns the mode of that array.
[2, 4, 4, 4, 6, 6, 1] - > 4
[0, 0, 0, 10] -> 0
[1] -> 1
*/

function mode(arr) {
	"use strict";
	var counts = [];
	var i, j;
	var maxcount = 1;
	var maxnum = arr[0];
	
	//count the numbers in arr, into counts
	for (i = 0; i < arr.length; i++) {
		if (counts[arr[i]] === undefined) {
			counts[arr[i]] = 0;
		}
		counts[arr[i]] = counts[arr[i]] + 1; 
	}
	
	//find the max number in the counts array
	for (j = 0; j < counts.length; j++) {
		if (counts[j] > maxcount) {
			maxcount = counts[j];
			maxnum = j;
		}
	}
	return maxnum;
}

console.log(mode([2, 4, 4, 4, 6, 6, 1]) == 4);
console.log(mode([0, 0, 0, 10]) == 0);
console.log(mode([1]) == 1);
