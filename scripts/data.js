let date = new Date();
let puzzleEmojiDiv;
let guessedScoreArray = [];
let totalGuessed = 0;
let totalLives = 4;

let dataWordle = {
  DaysPlayed: 0,
  CurrrentStreak: 0,
  MaxStreak: 0,
  WinPercentage: 0.0,
};
if (window.localStorage.getItem("dataWordle") != null) {
  console.log("Stats Data Loaded");
} else {
  console.log("Stats Data Not Loaded");
  window.localStorage.setItem("dataWordle", JSON.stringify(dataWordle));
}

//Setting localStorage Assignments

let gamePlayedAtHour = window.localStorage.getItem("playedAtHour");
if (gamePlayedAtHour == null) {
  window.localStorage.setItem("playedAtHour", date.getHours().toString());
  gamePlayedAtHour = window.localStorage.getItem("playedAtHour");
  console.log("Time Stamped: ", gamePlayedAtHour);
} else {
  console.log("Getting Time Stamped: ", gamePlayedAtHour);
}

let guessedLettersArray = JSON.parse(
  window.localStorage.getItem("guessedLetters")
);
console.log(guessedLettersArray);
if (guessedLettersArray == null) {
  let tempArray = [];
  window.localStorage.setItem("guessedLetters", JSON.stringify(tempArray));
  guessedLettersArray = JSON.parse(
    window.localStorage.getItem("guessedLetters")
  );
  console.log("Made new guess letters: ", guessedLettersArray);
} else {
  console.log("Old guess letters: ", guessedLettersArray);
}

let wrongLettersArray = JSON.parse(window.localStorage.getItem("wrongLetters"));
console.log(wrongLettersArray);
if (wrongLettersArray == null) {
  let tempArray1 = [];
  window.localStorage.setItem("wrongLetters", JSON.stringify(tempArray1));
  wrongLettersArray = JSON.parse(window.localStorage.getItem("wrongLetters"));
  console.log("Made new wrong letters: ", wrongLettersArray);
} else {
  console.log("Old wrong letters: ", wrongLettersArray);
}

let LivesLeftLocalStorage = parseInt(window.localStorage.getItem("LivesLeft"));
console.log(LivesLeftLocalStorage);

if (isNaN(LivesLeftLocalStorage)) {
  let NewLivesLeft = totalLives;
  window.localStorage.setItem("LivesLeft", NewLivesLeft.toString());
  LivesLeftLocalStorage = parseInt(window.localStorage.getItem("LivesLeft"));
  console.log("NEW GAME:" + LivesLeftLocalStorage);
} else {
  console.log("OLD GAME:" + LivesLeftLocalStorage);
}

let gameStatus = window.localStorage.getItem("gameStatus");
console.log(gameStatus);
if (gameStatus == null) {
  window.localStorage.setItem("gameStatus", "notplayed");
} else {
  console.log("gameStatus: ", window.localStorage.getItem("gameStatus"));
}

function setStatsData() {
  let StatsData = JSON.parse(window.localStorage.getItem("dataWordle"));
  $("#days-played").text(StatsData.DaysPlayed);
  $("#current-streak").text(StatsData.CurrrentStreak);
  $("#win-percentage").text(StatsData.WinPercentage);
  $("#max-streak").text(StatsData.MaxStreak);
}

// let dayLS = window.localStorage.getItem("day");
// if (dayLS == null) {
//   window.localStorage.setItem("day", parseInt(-1));
// }

function setData(data) {
  window.localStorage.setItem("dataWordle", JSON.stringify(data));
  console.log("INSERTED DATA: ", window.localStorage.getItem("dataWordle"));
}
//window.localStorage.clear();
