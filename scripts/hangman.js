class Hangman {
  constructor(word, remainingGuesses) {
    this.word = word.toLowerCase().split("");
    this.remainingGuesses = remainingGuesses;
    this.guessedLetters = [];
    this.wrongLetters = [];
    this.status = "playing";
    var streak = 0;
  }

  get puzzle() {
    let puzzle = [];
    if (puzzle != null) {
      this.word.forEach((letter) => {
        if (this.guessedLetters.includes(letter)) {
          puzzle.push({
            letter: letter,
            color: "#6aaa64",
          });
          document.getElementById("puzzle").style.transform = "rotate(0deg)";
        } else if (letter === " ") {
          puzzle.push({
            letter: letter,
            color: "none",
          });
        } else {
          puzzle.push({
            letter: "*",
            color: "#c9b458",
          });
        }
      });
      return puzzle;
    }
  }

  get answers() {
    let puzzle = [];
    let guessedLettersLocalStorage = JSON.parse(
      window.localStorage.getItem("guessedLetters")
    );
    console.log(guessedLettersLocalStorage);
    this.word.forEach((letter) => {
      if (
        guessedLettersLocalStorage != null &&
        guessedLettersLocalStorage.includes(letter)
      ) {
        puzzle.push({
          letter: letter,
          color: "#6aaa64",
        });
      } else if (letter === " ") {
        puzzle.push({
          letter: letter,
          color: "none",
        });
      } else {
        puzzle.push({
          letter: letter,
          color: "#c9b458",
        });
      }
    });
    return puzzle;
  }
  viewHint() {
    this.remainingGuesses--;
  }
  makeGuess(guess, keyboardKey) {  
    if (
      parseInt(window.localStorage.getItem("LivesLeft")) > 0 &&
      window.localStorage.getItem("gameStatus").toString() == "notplayed"
    ) {
      guess = guess.toLowerCase();
      const isUnique = !this.guessedLetters.includes(guess);
      const isBadUnique = !this.wrongLetters.includes(guess);
      const isBadGuess = !this.word.includes(guess);
      if (this.status !== "playing") {
        return;
      }
      if (isUnique && isBadUnique && isBadGuess) {
        document.getElementById("puzzle").style.transform = "rotate(0deg)";
        keyboardKey.style =
          "border: 1px solid #c0b7b7; color:white;background-color:#131414";
        this.remainingGuesses--;
        this.wrongLetters.push(guess);
        window.localStorage.setItem(
          "wrongLetters",
          JSON.stringify(this.wrongLetters)
        );
        document.getElementById('guesses').style.animation = 'pulsez 2s';
        window.localStorage.setItem("LivesLeft", this.remainingGuesses);
        var elementt = document.getElementById("kbbox");
        elementt.classList.toggle("shake");
      } else if (isUnique && !isBadGuess) { console.log(333)
          keyboardKey.style =
          "border: 1px solid #c0b7b7; color:white;background-color:#6aaa64";
          
        this.guessedLetters.push(guess);
        var elementtt = document.getElementById("puzzle");
       // elementtt.classList.toggle("pulse");
        window.localStorage.setItem(
          "guessedLetters",
          JSON.stringify(this.guessedLetters)
        );
           }
      this.calculateStatus();
    }
  }

  get statusMessage() {
    if (this.status === "playing") {
      return this.remainingGuesses;
    } else if (this.status === "failed") {
      console.log("->", puzzleDIV);
      for (let j = 0; j <= keyboardKeys.length; j++) {
        keyboardKeys[j].style = "border: 1px solid white";
      }
      console.log(dataWordle.DaysPlayed);
      console.log(game1.answers);
    } else {
      console.log("reset");
      console.log(game1.answers);
    }
  }

  calculateStatus() {
    const finished = this.word.every(
      (letter) => this.guessedLetters.includes(letter) || letter === " "
    );

    if (this.remainingGuesses === 0) {
      window.localStorage.setItem("gameStatus", "played");
      window.localStorage.setItem("answers", JSON.stringify(game1.answers));
      this.status = "failed";
      let dataWordle = JSON.parse(window.localStorage.getItem("dataWordle"));
      dataWordle.DaysPlayed++;
      window.localStorage.setItem("dataWordle", JSON.stringify(dataWordle));
      calculateStats();
      calculateEmoji();
      setStatsData();
      document.getElementById("winlose").innerHTML = "You Lose! Streak &#9660;";
      document.getElementById("winlose").style.color = "red";
      $("#statsModal").modal("toggle");
      document.getElementById('dtroy').style.display='block'; 
 setTimeout(function () {
        document.getElementById('dtroy').style.display='none';
    }, 4000);
    var hintbutton = document.getElementById("livesReduction");
    $(document).on('click','#puzzle span',function(){
      console.log($(this).index('#puzzle span'))
            })
    //resetBtn.disabled = "disabled";
    } else if (finished) {
      window.localStorage.setItem("gameStatus", "played");
      window.localStorage.setItem("answers", JSON.stringify(game1.answers));
      this.status = "finished";
      let dataWordle = JSON.parse(window.localStorage.getItem("dataWordle"));
      document.getElementById("clickButton").click();
      dataWordle.DaysPlayed++;
      window.localStorage.setItem("dataWordle", JSON.stringify(dataWordle));
      calculateStats();
      calculateEmoji();
      setStatsData();
      document.getElementById("winlose").innerHTML = "You Win! Streak &#9650;";
      document.getElementById("winlose").style.color = "green";
      $("#statsModal").modal("toggle");
      document.getElementById('dtroy').style.display='block'; 
      $(document).on('click','span',function(){
console.log(2)
      })
 setTimeout(function () {
        document.getElementById('dtroy').style.display='none';
    }, 4000);
    var hintbutton = document.getElementById("livesReduction");
    //resetBtn.disabled = "disabled";

//definition 
$('#definotify').show()
$(document).on('click','#puzzle span',function(){
  console.log(33)
  $('#defimodel').show()
  $('#deficont').html('<div>loading..</div>')
  var indx=$(this).index('#puzzle span')
  let day = date.getDay();
  var wordd=''
  var wordsar=words[day].split(' ');
  if(indx<6){
    wordd=wordsar[0]
  } else if(indx>5&&indx<12){
    wordd=wordsar[1]
  }
  else if(indx>11&&indx<18){
    wordd=wordsar[2]
  }
  else if(indx>17&&indx<24){
    wordd=wordsar[3]
  }
  else if(indx>23&&indx<30){
    wordd=wordsar[4]
  }
  console.log(indx)
  console.log(wordd)
  $.ajax({
    url:'https://api.dictionaryapi.dev/api/v2/entries/en/'+wordd,
    dataType:'json',
    success:function(e){
  //console.log(e[0]['meanings'][0]['definitions'])
  var defi=''
  defi+='<h2>'+wordd+'</h2>';
  $.each(e[0]['meanings'][0]['definitions'],function(k,v){
   
     defi+='<div><div><b>Definition:</b>'+v.definition+'</div>'
     defi+='<div><b>Example:</b>'+v.definition+'</div></div><br>'
  })
  $('#deficont').html(defi)
  
    }
  })
  $('.deficlose').on('click',function(){
    $('#defimodel').hide()
  })
})


    } else {
      this.status = "playing";
    }

 //testing


//end testing

  }



  
}
