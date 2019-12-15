// Variables to keep track of Wins, Guesses Remaining, Letters Guessed
var wins = 0;
var won = false;
var numberOfGuessesRemaining = 10;
var lettersGuessed = [];
var letter = '';
var currentWordIndex = 0;
var currentWordArray;
var emptyString = [];
var myMusic = [];

var christmasWords = [
    "christmas",
    "holly",
    "egg nog",
    "presents",
    "tree",
    "ornament",
    "mistletoe",
    "holiday",
    "figgy pudding",
    "wreath",
    "lights"
];
var musicLinks = [
    "assets/music/We Wish You a Merry Christmas with Lyrics Christmas Carol & Song.mp3",
    "assets/music/Holly Jolly Christmas Lyrics - Burl Ives.mp3",
    "assets/music/Straight No Chaser - Who Spiked the Eggnog.mp3",
    "assets/music/Kelly Clarkson - Underneath the Tree (Audio).mp3",
    "assets/music/Rockin' Around The Christmas Tree Lyrics.mp3",
    "assets/music/Ornament.mp3",
    "assets/music/I Saw Mommy Kissing Santa Claus lyrics.mp3",
    "assets/music/NSYNC - Merry Christmas, Happy Holidays.mp3",
    "assets/music/We Wish You a Merry Christmas with Lyrics Christmas Carol & Song.mp3",
    "assets/music/Christmas Music - Wreaths of Green.mp3",
    "assets/music/Owl City (feat. Toby Mac) - Light of Christmas [HD Lyrics + Description].mp3"
]

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.sound.volume = 0.1;
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}
function createSoundElements(){
    for(var i=0; i < musicLinks.length; i++){
        myMusic[i] = new sound(musicLinks[i]);
    }
}

function initializeGame() {
    document.getElementById("start").style.visibility = "visible";
    currentWordArray = christmasWords[currentWordIndex].split("");
    emptyString = [];
    updateWins();
    emptyGuessedLetters();

    for (var i = 0; i < currentWordArray.length; i++) {
        if (currentWordArray[i] == " ") {
            emptyString[i] = ' ';
        }
        else {
            emptyString[i] = '_';
        }
    }
}
function updateWins() {
    document.getElementById("wins").textContent = wins;
}
function updateGuessedLetters(key) {
    if (lettersGuessed.includes(key)) {
        // do nothing
    }
    else {
        document.getElementById("lettersGuessed").append(key + ' ');
        lettersGuessed.push(letter);
        numberOfGuessesRemaining--;
        document.getElementById("guessesNumber").textContent = numberOfGuessesRemaining;
    }
}
function emptyGuessedLetters() {
    lettersGuessed = [];
    document.getElementById("lettersGuessed").textContent = '';
    numberOfGuessesRemaining = 10;
    document.getElementById("guessesNumber").textContent = numberOfGuessesRemaining;
}

initializeGame();
createSoundElements();

document.onkeyup = function (event) {
    if (won) {
        var temp = emptyString.toString().replace(/,/g, '');
        document.getElementById("word").textContent = temp;
        won = false;
        initializeGame();
        updateWins();
        emptyGuessedLetters();
        document.getElementById("start").style.visibility = "visible";
    }

    document.getElementById("start").style.visibility = "hidden";
    letter = event.key.toLowerCase();
    if (currentWordArray.includes(letter)) {
        for (var i = 0; i < currentWordArray.length; i++) {
            if (currentWordArray[i].toLowerCase() == letter) {
                emptyString[i] = letter;
            }
        }
        var temp = emptyString.toString().replace(/,/g, '');
        document.getElementById("word").textContent = temp;
        if(currentWordIndex == 0){
            myMusic[10].stop();
        }
        else{
            myMusic[currentWordIndex-1].stop();
        }
    }
    else {
        updateGuessedLetters(letter);
        var temp = emptyString.toString().replace(/,/g, '');
        document.getElementById("word").textContent = temp;
    }

    if (!emptyString.includes("_")) {
        myMusic[currentWordIndex].play();
        wins++;
        updateWins();
        won = true;
        currentWordIndex++;

        if (currentWordIndex == 11) {
            currentWordIndex = 0;
            won = true;
            wins = 0;
            alert("You won!");
            document.getElementById("start").style.visibility = "visible";
        }
        else {
            initializeGame();
            updateWins();
            emptyGuessedLetters();
        }
    }
    else if (numberOfGuessesRemaining == 0) {
        alert("You lost. Press any key to restart");
        currentWordIndex = 0;
        emptyGuessedLetters();
        wins = 0;
        updateWins();
        emptyString = [];
        var temp = emptyString.toString().replace(/,/g, '');
        document.getElementById("word").textContent = temp;
        initializeGame();
    }
}
