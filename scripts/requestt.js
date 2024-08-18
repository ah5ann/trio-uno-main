//Words Array
$(function(){
$.ajax({url:"words.php",success: function(json) {
  //console.log(json); // this will show the info it in firebug console
}
});
})

//ar
const words = [
"etapes etapes escars entomb evulse",
"irking immure impled ingate induce",
"jurist jurels jicama jocund jouals",
"oniony oboles ouches outbid obtain",
"quinta quarts quired queued qualia",
"triced trivet tolars tanuki toiler",
"vandal votary verger visits vivace",
];

//ar

let day = date.getDay();
dataWordle = JSON.parse(window.localStorage.getItem("dataWordle"));
document.getElementById('twords').innerHTML='<span>'+words[day].split(' ').join('</span><span>')+'</span>'
const getPuzzle = async () => {
  return words[day];
};



// checks if one day has passed.
function hasOneDayPassed() {
  // get today's date. eg: "7/37/2007"
  var date = new Date().toLocaleDateString();
  console.log(date);
  // if there's a date in localstorage and it's equal to the above:
  // inferring a day has yet to pass since both dates are equal.
  if (window.localStorage.day == date) return false;

  // this portion of logic occurs when a day has passed
  window.localStorage.day = date;
  return true;
}

function runOncePerDay() {
  if (!hasOneDayPassed()) {
    return false;
  } else {
    // your code below
    console.log("DAY CHANGED");
    console.log(day != parseInt(window.localStorage.getItem("day")));
    console.log(parseInt(window.localStorage.getItem("day")) != -1);
    //Creating a function that will check for a day change and (hoping to be auto refresh)
    let tempArray = [];
    window.localStorage.setItem("guessedLetters", JSON.stringify(tempArray));
    let NewLivesLeft = totalLives;
    window.localStorage.setItem("LivesLeft", NewLivesLeft.toString());
    window.localStorage.setItem("gameStatus", "notplayed");
    guessedScoreArray = [];
    totalGuessed = 0;
    window.location.reload();
    startGame();
  }
}

function figureGuessWords(str) {
  let guessString = String.prototype.concat(...new Set(str));
  return guessString.replace(/\s/g, "").length;
}
let figureGuessWordsLength = figureGuessWords(words[day]);
console.log(figureGuessWordsLength);
runOncePerDay();
//window.localStorage.clear();
