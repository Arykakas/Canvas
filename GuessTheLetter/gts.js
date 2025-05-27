var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d')

function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.setTransform(1, 0, 0, 1, 0, 0); 
      ctx.scale(dpr, dpr);

      drawScreen(); // Redraw content
    }

// window.addEventListener('resize', resizeCanvas);
// localStorage.clear();

var guesses = 0;
var message = "Guess The Letter From a (lower) to z (higher)";
var letters = [
    "a","b","c","d","e","f","g","h","i","j","k","l","m", "n", "o",
    "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];

var today = new Date();
var letterToGuess = "";
var higherOrLower = "";
var lettersGuessed;
var gameOver = false;

var letterIndex = Math.floor(Math.random() * letters.length);
letterToGuess = letters[letterIndex];

window.addEventListener("keydown", eventKeyPressed, false);

function eventKeyPressed(e) {
    if(!gameOver) {
        var letterPressed = String.fromCharCode(e.keyCode).toLowerCase();
        guesses++;
        lettersGuessed.push(letterPressed);
        if(letterPressed == letterToGuess){
            gameOver = true
        }
        else {
            letterIndex = letters.indexOf(letterToGuess);
            guessIndex = letters.indexOf(letterPressed);
            if(guessIndex < 0) {
                higherOrLower = "That is not a letter";
            } else if (guessIndex > letterIndex) {
                higherOrLower = "Lower"
            } else {
                higherOrLower = "Higher"
            }
        }
        drawScreen();
    }
    else if(gameOver) {
        var oldPb = localStorage.getItem("PB")
        if(oldPb > guesses || oldPb == null) {
            localStorage.setItem("PB", guesses)
        }
        initGame();
    }
}

function initGame() {
    var letterIndex = Math.floor(Math.random() * letters.length);
    letterToGuess = letters[letterIndex];
    guesses = 0;
    lettersGuessed = [];
    gameOver = false;
    window.addEventListener("keydown", eventKeyPressed);
    drawScreen();
}

function drawScreen() {
    const { width, height } = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffaa";
    ctx.fillRect(0,0,500,300);
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(5, 5, 490, 290);
    ctx.textBaseline = "top";

    // Date
    ctx.fillStyle = "#000000";
    ctx.font = "14px Sans-Serif";
    ctx.fillText(today, 80, 10);

    // Message
    ctx.fillStyle = "#FFOOOO";
    ctx.font = "10px Sans-Serif";
    ctx.fillText(message, 125, 30);
    ctx.fillStyle = "#109910";
    ctx.font = "24px Sans-Serif";
    ctx.fillText('Guesses: '+ guesses, 188, 50);

    //Higher Or Lower
    ctx.fillStyle = "#000000";
    ctx.font = "16px Sans-Serif";
    ctx.fillText("Higher Or Lower: "+higherOrLower, 150,125)

    //Letters Guessed
    ctx.fillStyle = "#FF0000";
    ctx.font = "16px Sans-Serif";
    ctx.fillText("Letters Guessed: "+ lettersGuessed.toString(), 10, 260);

    //Personal Best
    ctx.fillStyle = "#FF0000";
    ctx.font = "10px Sans-Serif";
    var oldPb = localStorage.getItem("PB")
    if(!!oldPb) {
        ctx.fillText("Personal Best: "+ localStorage.getItem("PB"), 355, 30);
    }else {
        ctx.fillText("Personal Best: "+ 'N/A', 355, 30);
    }
    if(gameOver){
        ctx.fillStyle = "#FF0000";
        ctx.font = "40px Sans-Serif";
        ctx.fillText("You Got It!", 150, 180);
        ctx.fillStyle = "#109910";
        ctx.font = "20px Sans-Serif";
        ctx.fillText("Press any key to restart", 144, 220);
        
    } 
}

initGame();

//line of 24