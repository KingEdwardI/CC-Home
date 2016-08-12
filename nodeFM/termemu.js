var fs = require('fs');

// keywords and what to do
var useStdin = function() {
    var input = process.stdin.read();
    if(input !== null){
        var inputSplit = input.toString().trim().split(' ');
        switch (inputSplit[0]) {
            case 'cat':
                catFile(inputSplit[1]);
                break;
            case 'touch':
                touchFile(inputSplit[1]);
                break;
            case 'rm':
                deleteFile(inputSplit[1]);
                break;
            case 'repl':
                replWord(inputSplit[1], inputSplit[2], inputSplit[3]);
                break;
            case 'grep':
                grepFile(inputSplit[1], inputSplit[2]);
                break;
            case 'mkdir':
                makeDir(inputSplit[1]);
                break;
            case 'rmdir': // currently does not work & crashed the program
                if(inputSplit[1].substring(0,3) == '..'){
                    console.log("You cannot remove anything outside of the current directory")
                    break;
                }
                removeDir(inputSplit[1]);
                break;
            case 'ls': // still requires input
                if(inputSplit[1] === undefined){
                    inputSplit[1] = '.';
                }
                listDir(inputSplit[1]);
                break;
            case 'help':
                helpMe();
                break;
            case 'exit':
                process.exit();
            default:
                console.log("You Typed: " + input + "this doesn't do anything");
        }
    }    
}
console.log('Type "help" for a help menu, or a command to continue');

// help menu
function helpMe(){
    console.log("Commands are: \n touch[name]: make a blank file \n rm[filename]: remove a file \n mkdir[name]: make a new folder \n rmdir[folder name]: remove a folder \n ls[directory]: list directory contents \n cat[text-file]: display file contents \n repl[text-file old-word new-word]: replace old word with new word \n exit: exits teminal emulator");
}
// make a blank file
function touchFile(fileName){
    fs.writeFile(fileName, "", function(err){
        if(err) {
            console.log('could not write to file');
        } else {
            console.log("file created and saved");
        }
    });
}

// delete any file and its contents.
function deleteFile(fileName){
    fs.unlink(fileName, function(err){
        if(err){
            console.log('could not delete file');
        } else {
            console.log("file removed");
        }
    });
}

// replace all selected words in a file with another selected word
function replWord(fileName, oldWord, newWord){
    fs.readFile(fileName, function(err, data){
        if(err){
            console.log("Could not read file. cancelling..");
        }
        data = data.toString();
        var change = new RegExp(oldWord, 'g');
        var newData = data.replace(change, newWord);
        fs.writeFile(fileName, newData, function(err){
            if(err){
                console.log("Could not replace word");
            }
            console.log("replaced " + oldWord + " with " + newWord);
        });
    });
}


// locate all instances of word in a file and return the line that it is located on
function grepFile(fileName, word){
    fs.readFile(fileName, function(err, data){
        if(err){
            console.log("Could not read File, " + fileName + " it may not exist");
        }
        data = data.toString(); data = data.split("\n");
        for(var i = 0; i < data.length; i++){
            if(data[i].includes(word)){
                console.log(data[i]);
            }
        }
    });
}

// make a new directory
function makeDir(directory){
    fs.mkdir(directory, function(err){
        if(err){
            console.log("could not create directory, it may already exist");
        } else {
            console.log("directory " + directory + " successfully created");
        }
    });
};

// remove a directory and all its contents
function removeDir(directory){
    process.stdin.write("are you sure you want to remove directory " + directory + " (y/n) ", function(answer){
        var useStdin = function(){
            var answer = process.stdin.read();
            if(answer !== null){
                answer = answer.toString().trim();
               if(answer == 'y'){
                    fs.rmdir(directory, function(err, check){
                        if(err){
                            console.log("rmdir " + directory + " could not locate directory");
                        } else {
                            console.log(directory + " was successfully removed")}
                        });
                } else if (answer == 'n'){
                    console.log(directory + " was not removed");
                } else {
                    console.log("unknown operation, cancelling...");
                }
            }
        }
    });
}

// list all files and folders in a selected directory 
function listDir(directory){
    fs.readdir(directory, 'utf8', function(err, files){
        if(err){
            console.log("could not list, possibly an invalid file path");
        } else {
            console.log(files.join(' '));
        }
    });
}

// print the contents of a file
function catFile(fileName){
    fs.readFile(fileName, function(err, data){
        if(err){
            console.log("cat: " + fileName + "No such file or directory");
        } else {
            console.log(data.toString());
        }
    });
}

// if the user enters input and hits enter use function
process.stdin.on('readable', useStdin);

////////////////////////////////
// currently working commands //
//      touch / rm            //
//      cat                   //
//      rmdir / mkdir         //
//      ls                    //
//      grep / repl           //
////////////////////////////////
//          TODO:             //
//   rmdir tweaks / fixes     //
////////////////////////////////
