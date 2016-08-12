/*
	Below is a small script which generates random adventures. There are two
	problems which are marked below with "TODO". Your assignment is to solve
	those TODOs and get this script really up to snuff.
*/
//*****//*****//*****//*****//*****//*****//*****//

// Show an initial adventure when the page loads
window.onload = adventureStart;

// elements of the game to be chosen from
var monsters = [
	"dragon",
	"troll",
	"alien mothership",
    "illithid",
    "cthulu",
    "creature from the black lagoon",
    "golem",
    "zombie Bill Murray"
];

var weapons = [
	"deadly dagger",
	"artful axe",
	"skillful swordplay",
    "menacing mace",
    "wizardly lizard",
    "keyboard of killing",
    "dreadlocks of doom",
    "timey wimey TARDIS",
    "crystals of light"
];

var actions = [
	"defeated",
	"attacked",
	"ran from",
    "talked to",
    "played with",
    "called upon",
    "danced with"

];

var treasure = [
    "lightbulb moment",
    "striped sweater",
    "diamond encrusted egg",
    "crystal skull",
    "root password that you lost last week"
]
// end elements


/******************************
	TODO: The following three lines of code have a lot of repetition and are
	ripe for turning into a function! Create a function to handle choosing
	a random element from an array instead of doing the math each time.
    *****Done*****
******************************/

// old code
/*
[Math.floor(Math.random() * monsters.length)];
[Math.floor(Math.random() * weapons.length)];
[Math.floor(Math.random() * actions.length)];
*/

// New function to create elements
function chooseRandom(thing){
    var chosen = thing[Math.floor(Math.random() * thing.length)];
    return chosen;
}

// function to create treasure
function getTreasure() {
    var chosenTreasure = chooseRandom(treasure);
    var openChest = "You open the treasure chest and revealed is a " + chosenTreasure;

    document.getElementById("treasure").innerText = openChest;
}

// game function
function adventureStart(){

    // clear hash
    document.location.hash = "";

    // create elements
    var chosenMonster = chooseRandom(monsters); 
    var chosenWeapon = chooseRandom(weapons);
    var chosenAction = chooseRandom(actions);

    // create hero
    var heroGender;
    if (Math.random() < 0.5) {
        heroGender = "heroine";
    } else {
        heroGender = "hero";
    }
    
    // output of the created elements
    var output = "Armed with only their " +
        chosenWeapon +
        " our " +
        heroGender +
        " " +
        chosenAction +
        " the evil " +
        chosenMonster +
        "! Doing this reveals a path to a treasure chest!";

    // make game viewable in html
    document.getElementById("adventure").innerText = output;
    
    // clear the treasure until "Open Chest!" is clicked
    document.getElementById("treasure").innerText = "";

    // create hash to save game // doesn't work yet 
    var hashStr = "#" + weapons.indexOf(chosenWeapon) + actions.indexOf(chosenAction) + monsters.indexOf(chosenMonster);
    document.location.hash = hashStr;
}

/******************************
	TODO: Right now the "new adventure!" button doesn't work. Create a function
	to bind to that button so that the user can create a new adventure without
	refreshing the page.
    *****Done*****
******************************/

// start game on button click
document.getElementById("new_adventure").onclick = adventureStart;  

// reveal treasure on button click
document.getElementById("treasure_chest").onclick = getTreasure;

/******************************
	Optional(TODO): Create several more types of adventures, weapons, actions, etc.
    *****Done*****

	Optional(TODO): Allow the user to interact with the story more than just clicking
	the "new adventure!" button. You'll need to create variables to keep track
	of state.
    *****Done*****

	Optional (TODO) (advanced): Use document.location.hash in a way which allows the
	user to bookmark a specific story that they like and return to it later.
    *****Created Hash*****
    TODO: make hash linkable to specific game

******************************/
