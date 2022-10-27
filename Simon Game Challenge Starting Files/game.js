var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        colorChange();
        started = true;
    }
});

$(".btn").click(function () {


    var userChosenColour = $(this).attr("id");


    userClickedPattern.push(userChosenColour);

    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
       

});



let randomNumber;
//function nextsequence() {

//}
//nextsequence();


//window.addEventListener('keydown', function (event) {
    //console.log(event);
    //if (event.key == 'a') {
        //colorChange();
    //}
//})
//jquery
function colorChange() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

    function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");


    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");

    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                colorChange();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout (function(){
            $("body").removeClass("game-over");

        },200);
        $("#level-title").text("GAME OVER,Press any key to restart!");

        startOver();


    }

}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;

}
