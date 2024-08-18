let game1;
var answeredalready=[];
const puzzleDIV = document.querySelector("#puzzle");
const remainingDIV = document.querySelector("#guesses");
const keyboardKeys = document.getElementsByClassName("jkey");
var clickedKey='';
window.addEventListener("keypress", (e) => {
  let guess = String.fromCharCode(e.charCode);
  for (let j = 0; j < keyboardKeys.length; j++) {
    if (guess.toUpperCase() == keyboardKeys[j].innerHTML) {
      game1.makeGuess(keyboardKeys[j].textContent, keyboardKeys[j]);
      render();
    }
  }
  game1.makeGuess(guess);
  render();
});

for (let i = 0; i < keyboardKeys.length; i++) {
  keyboardKeys[i].addEventListener("click", function abc() {
    clickedKey=keyboardKeys[i].textContent.toLowerCase();
    game1.makeGuess(keyboardKeys[i].textContent, keyboardKeys[i]);
    render();
  });
}

const render = () => {
  //Status Message is like a number of lives number
  puzzleDIV.innerHTML = "";
  //Storing our lives in localstorage

  let livesLeft = parseInt(window.localStorage.getItem("LivesLeft"));
  window.localStorage.setItem("LivesLeft", livesLeft);
  let gameStatus = window.localStorage.getItem("gameStatus");

  
  //Condition to render what puzzle or answers depending on the lives left
  if ((livesLeft > 0 && gameStatus == "notplayed") || gameStatus == null) {
    if(game1.statusMessage==1){
      document.getElementById("livesReduction").disabled = true;
    }
    
    remainingDIV.textContent = `Lives left: ${game1.statusMessage} / ${totalLives}`;
    game1.puzzle.forEach((puzzle) => {
      if (puzzle.letter === " ") {
        const breakerEL = document.createElement("p");
        breakerEL.textContent = "";
        puzzleDIV.appendChild(breakerEL);
      } else {
        if(puzzle.color=='#6aaa64'){
          if(clickedKey==puzzle.letter){
            $("#puzzle").append("<div class='flipdiv'><span class='front'>*</span><span class='back'>"+puzzle.letter+"</span></div>");
           }else{
            const letterEl = document.createElement("span");
            letterEl.textContent = puzzle.letter;
            puzzleDIV.appendChild(letterEl);
            letterEl.style.background = puzzle.color;  
          }
        }else{
          const letterEl = document.createElement("span");
        letterEl.textContent = puzzle.letter;
        puzzleDIV.appendChild(letterEl);
        letterEl.style.background = puzzle.color;
        }
      }
    });
    setTimeout(function(){$('.flipdiv').addClass('flipped');}, 1)
    
  } else {
   
    remainingDIV.textContent = `Lives Left: ${livesLeft} / ${totalLives}`;
    game1.answers.forEach((puzzle) => {
      if (puzzle.letter === " ") {
        const breakerEL = document.createElement("p");
        breakerEL.textContent = "";
        puzzleDIV.appendChild(breakerEL);
      } else {
        const letterEl = document.createElement("span");


       
        letterEl.textContent = puzzle.letter;
        puzzleDIV.appendChild(letterEl);
        letterEl.style.background = puzzle.color;
     
      }
    });
    calculateEmoji();
  }
};

document.getElementById("livesReduction").addEventListener("click", displayLives);

function displayLives() {

let text = "Click OK to show hint or Cancel";
  if (confirm(text) == true) {
    let livesLeft = parseInt(window.localStorage.getItem("LivesLeft"));
    let newlives = livesLeft - 1;
    game1.viewHint();
    window.localStorage.setItem("LivesLeft", newlives);
    let newLives = parseInt(window.localStorage.getItem("LivesLeft"));
    remainingDIV.textContent = `Lives left: ${newLives} / ${totalLives}`;
    document.getElementById("hint").innerHTML = firstChar;
    document.getElementById("livesReduction").disabled = true;
  } else {
    text = "You canceled!";
  }
  document.getElementById("demo").innerHTML = text;
}

let livesLeft1 = parseInt(window.localStorage.getItem("LivesLeft"));
if (livesLeft1 <= 1){
document.getElementById("livesReduction").disabled = true;
}else{
}

$("#openStatsModal").on("click", () => {
  calculateEmoji();
  setStatsData(dataWordle);
  $("#statsModal").modal("toggle");
});

function calculateStats() {
  let LSdataWordle = JSON.parse(window.localStorage.getItem("dataWordle"));
  let guessedLetters = JSON.parse(
    window.localStorage.getItem("guessedLetters")
  );
  if (guessedLetters.length == figureGuessWordsLength) {

    LSdataWordle.CurrrentStreak++;
    if (LSdataWordle.CurrrentStreak >= LSdataWordle.MaxStreak) {
      LSdataWordle.MaxStreak = LSdataWordle.CurrrentStreak;
    }
    LSdataWordle.WinPercentage = (
      (parseFloat(LSdataWordle.MaxStreak) /
        parseFloat(LSdataWordle.DaysPlayed)) *
      100
    ).toFixed(2);
    window.localStorage.setItem("dataWordle", JSON.stringify(LSdataWordle));
  } else {
    LSdataWordle.CurrrentStreak = 0;
    LSdataWordle.WinPercentage = (
      (parseFloat(LSdataWordle.MaxStreak) /
        parseFloat(LSdataWordle.DaysPlayed)) *
      100
    ).toFixed(2);
    window.localStorage.setItem("dataWordle", JSON.stringify(LSdataWordle));
  }
 

}
function calculateEmoji() {

  let EmojiData = JSON.parse(window.localStorage.getItem("dataWordle"));

  let mainArray = [];
  let secondaryArray = [];

  let childNodes = document.getElementById("puzzle").childNodes;
  puzzleEmojiDiv = document.getElementById("puzzle-emojis");
  puzzleEmojiDiv.innerHTML = "";
  for (let i = 0; i <= childNodes.length - 1; i++) {
    
    if (childNodes[i].textContent == "") {
      puzzleEmojiDiv.innerHTML += ` <br /> `;
      mainArray.push(secondaryArray);
      secondaryArray = [];
    } else if (i == childNodes.length) {
      mainArray.push(secondaryArray);
      secondaryArray = [];
    } else {
      if (childNodes[i].style.background == "rgb(201, 180, 88)") {
        puzzleEmojiDiv.innerHTML += ` 🟨 `;
        secondaryArray.push(0);
      } else {
        puzzleEmojiDiv.innerHTML += ` 🟩 `;
        secondaryArray.push(1);
      }
    }
  }
 
  guessedScoreArray = [];
  totalGuessed = 0;
  for (let i = 0; i < mainArray.length; i++) {
    guessedScoreArray.push(checkArrayEqualElements(mainArray[i]));
  }
  for (let i = 0; i < guessedScoreArray.length; i++) {
    if (guessedScoreArray[i] == true) {
      totalGuessed++;
    }
  }
  window.localStorage.setItem("dataWordle", JSON.stringify(EmojiData));
}

const startGame = async () => {
  //Now we have to make a logic here that detects if the day is changed or not
  // hint localStorage and date object
  const puzzle = await getPuzzle("3");
  firstChar  = puzzle.charAt(Math.floor(Math.random() * puzzle.length));
  const node = document.createElement("li");
node.id = 'nodez';
const textnode = document.createTextNode(puzzle);
node.appendChild(textnode);
document.getElementById("dtroy").appendChild(node);
  game1 = new Hangman(
    puzzle,
    parseInt(window.localStorage.getItem("LivesLeft"))
  );
  render();
};

document.querySelector("#reset").addEventListener("click", startGame);
startGame();



function checkArrayEqualElements(_array) {
  if (typeof _array !== "undefined") {
    return !!_array.reduce(function (a, b) {
      return a === b ? a : NaN;
    });
  }
  return "Array is Undefined";
}

var todayz = new Date();
var ddz = String(todayz.getDate()).padStart(2, '0');
var mmz = String(todayz.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyyz = todayz.getFullYear();

todayz = ddz + '/' + mmz + '/' + yyyyz;
 

$("#share-button").on("click", function () {
  let dataWordle = JSON.parse(window.localStorage.getItem("dataWordle"));
  let width = document.body.clientWidth;
  if (width < 780) {
    navigator.share({
      title: "Trio Uno Score",
      text: `${puzzleEmojiDiv.innerText}    

      trio-uno.com
      ${window.localStorage.getItem("LivesLeft")}/${totalLives}
      Streak: ${dataWordle.CurrrentStreak}
      TrioUno#${todayz}
          `,
    });
  } else {
    //Apply Clipboard API
    navigator.clipboard.writeText(`${puzzleEmojiDiv.innerText}    

trio-uno.com
${window.localStorage.getItem("LivesLeft")}/${totalLives}
Streak: ${dataWordle.CurrrentStreak}

  `);
    document.getElementById("notificationCOPY").style.display = "block";
    setTimeout(() => {
      document.getElementById("notificationCOPY").style.display = "none";
    }, 600);
  }
});

$("#day-counter").text(`Days Played: ${dataWordle.DaysPlayed}`);

//Uncomment to clear LS
//window.localStorage.clear();

var modalk = document.getElementById("myModalk");

var btnz = document.getElementById("myBtnn");

var spanz = document.getElementsByClassName("closedz")[0];

// When the user clicks the button, open the modal 
btnz.onclick = function() {
  modalk.style.display = "block";
}

spanz.onclick = function() {
  modalk.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalk) {
    modalk.style.display = "none";
  }
}



