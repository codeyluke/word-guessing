//Query Selectors
const guessTheWord = document.querySelector("#word");
const pastGuesses = document.querySelector("#past-guesses");
const form = document.querySelector("#player-input");
const userInput = document.querySelector("#player-guess");
const guessesLeft = document.querySelector("#guesses-left");

//Initial states
const wordsToGuess = ["bananas", "apples", "mangoes", "durian", "grapes"];
let wordPicked;
let prevGuessed = [];
let numGuesses = 10;

//Choosing the random words
function randomWords() {
  let randomNumber = Math.floor(Math.random() * wordsToGuess.length);
  wordPicked = wordsToGuess[randomNumber];
  //The chosen word to be displayed
  displayWordState(wordPicked);
}

//Display the number of underscore based on the number of alphabets in the wordPicked
function displayWordState(state) {
  let output = [];
  const arrayState = state.split("");
  for (let i = 0; i < arrayState.length; i++) {
    output.push(" _ ");
  }
  guessTheWord.innerHTML = output.join("");
  console.log(output);
  console.log(state);
}

//Display the number of tries remaining
function displayGuessesLeft(num) {
  guessesLeft.innerHTML = num;
}

//Keep track of the previously guessed alphabet
function displayPrevGuess(letter) {
  //The alphabets are stored in an array so we need to clear
  //prev list and add the new list.
  pastGuesses.innerHTML = "";
  for (let i = 0; i < letter.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = letter[i];
    pastGuesses.appendChild(li);
  }
  updateDisplay(letter);
}

//Track the correctly guessed words
function updateDisplay(letterLefts) {
  // making the wordPicked into array
  const arrayPickedWord = wordPicked.split("");
  //console.log(arrayPickedWord);

  for (let i of letterLefts) {
    //console.log(i);
    let index;

    while (index !== -1) {
      index = arrayPickedWord.findIndex(letter => letter === i);
      index !== -1 ? (arrayPickedWord[index] = "_") : null;
      //console.log(arrayPickedWord);
      /*
      This method is remove the correctly guessed letter to "_" 
      and leaving the letters that has not been guessed yet, 
      so we need to inverse that because we want to show the words 
      that had been guessed instead of showing the answer 
      we want to show the words tha
      */
    }
  }
  inverseDisplay(arrayPickedWord);
}

//Inverse the tracked result to be displayed + checking for Winner / Loser
function inverseDisplay(word) {
  const arrayPickedWord = wordPicked.split("");
  //console.log(arrayPickedWord);

  const inverseWords = arrayPickedWord.map((elem, i) => {
    return word[i] == "_" ? elem : "_";
  });

  //console.log(inverseWords);

  //Determine the winner / loser within 10 guesses
  checkWon(inverseWords);
  if (checkWon(inverseWords)) {
    //debugger;
    alert(checkWon(inverseWords));
  }
  guessTheWord.innerHTML = inverseWords.join(" ");
}

//Determining the Winner / Loser
function checkWon(inverseWords) {
  if (inverseWords.includes("_")) {
    if (numGuesses === 0) {
      return `You Lose`;
    }
  } else {
    return `You Won`;
  }
}

form.onsubmit = function(e) {
  e.preventDefault();
  /*
  take the input from the form
  only one letter is allowed
  push the letter to the previousGuessed
  clear out the prev letter then display
  */
  const currentInput = userInput.value;
  if (currentInput.length !== 1) {
    alert("enter one alphabet at a time");
  } else {
    prevGuessed.push(currentInput);
  }
  userInput.value = "";
  numGuesses--;
  //console.log(prevGuessed);
  displayGuessesLeft(numGuesses);

  //append to the ul of #past-guesses
  displayPrevGuess(prevGuessed);
};

//Initial setup
randomWords();
displayGuessesLeft(numGuesses);
