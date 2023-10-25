var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var level=0;
var started=false;
$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence(buttonColours);
        started=true;
    }
})

function nextSequence(buttonColours) {
    level++;
    $("#level-title").text("Level "+level);
    var x=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[x];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").on("click",function (event){
    var name=event.target.id;
    userClickedPattern.push(name);
    playSound(name);
    checkAns(userClickedPattern.length-1);
    // console.log(userClickedPattern);
});

function playSound(name){
    var sound=new Audio("./sounds/"+name+".mp3");
    sound.play();
}

$(".btn").on("click",function animatePress(currentColor) {
    var color=currentColor.target.id;
    $("#"+color).addClass("pressed");
    setTimeout(function () {
        $("#"+color).removeClass("pressed");
    },100);
});

function checkAns(currentLevel) {
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        // console.log("success");
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function () {
                userClickedPattern=[];
                nextSequence(buttonColours);
            },1000);
        }
    }else{
        console.log("wrong");
        // playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart" );
        startAgain();
    }
}
function startAgain() {
    level=0;
    gamePattern=[];
    started=false;
    userClickedPattern=[];
}