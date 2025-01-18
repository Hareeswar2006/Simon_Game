var gamePattern=[];
var userclickedPattern=[];
var level=0;
var started=false;
var buttonColors=["blue","yellow","green","red"];
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
  
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    $("#"+userChosenColor).fadeOut(100).fadeIn(100);
    playAudio(userChosenColor);
    userclickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userclickedPattern.length-1);
 });
function nextSequence(){
    userclickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChoosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeOut(100).fadeIn(100);
    playAudio(randomChoosenColor);
}
function playAudio(randomChoosenColor){
    var src=randomChoosenColor+".mp3";
    var audio=new Audio(src);
    audio.play();
}
function animatePress(userChosenColor){
    var currentColor=userChosenColor;
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
function checkAnswer(currentLevel){
    if(userclickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("correct");
    if (userclickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
    else{
        playAudio("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}