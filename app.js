// Logic controller 
let logicController = (function () {
      // function to determine winner 
  let getWinner = function() {
    let zero = gameArray[0];
    let one = gameArray[1];
    let two = gameArray[2];
    let three = gameArray[3];
    let four = gameArray[4];
    let five = gameArray[5];
    let six = gameArray[6];
    let seven = gameArray[7];
    let eight = gameArray[8];

    let winningCombos = [[zero,one,two],[three,four,five],[six,seven,eight],[zero,three,six],[one,four,seven],[two,five,eight],[zero,four,eight],[two,four,six]];
    let deciderArray = [];
    winningCombos.forEach(function(combo){
        // Check if an array has the same symbols 
       let decider = combo.every(function(item){
           if (combo[0] != ''){
             return item == combo[0]
           }
       });
       deciderArray.push(decider)
    })

    // Check to see if there is a winner in the array ie. true 
    let winnerDecider = deciderArray.some(function(item) {
        return item == true
    })

    // Get index of the occurence of true 
    let indexOfWinner = deciderArray.indexOf(true);
    let winningSymbol;

    // Get Symbol that won 
    if(winnerDecider){
        winningSymbol = winningCombos[indexOfWinner][0];
    }
    

    
    // console.log(deciderArray)
    // console.log(winningCombos)
    // console.log(winningSymbol);
    
    
    return winningSymbol
}

// Function to check if game has ended or is still in progress 
let gameEnded = function() {
  let status = gameArray.every(function(item) {
    return item != ''
  })
  return status
}
    
  let gameArray = ["", "", "", "", "", "", "", "", ""];

  const Player = function (playerName, playerID) {
    let score = 0;

    // function to add symbol to gameArray
    let addSymbol = function (id) {
      gameArray.splice(id, 1, playerID);
    };

    return {
      playerName,
      playerID,
      score,
      addSymbol,
    };
  };


  // Reset gameArray function 

  function resetGameArray() {
    gameArray.forEach(function(item, index) {
      item = '';
      gameArray[index] = item;
    })
  }

  return {
    gameArray,
    Player,
    getWinner,
    gameEnded,
    resetGameArray,
  };
})();

// UI controller 
let UIController = (function () {
  // Names of dom element attributes
  const domLabels = {
    cardsLabel: "card",
    firstWrapperLabel: "first-wrapper",
    secondWrapperLabel: "second-wrapper",
    gameWrapperLabel: "game-wrapper",
    inputsLabel: "form-control",
    playBtnLabel: "playBtn",
    boxLabel: "box",
    playerNameLabel: "player-name",
    playerScoreLabel: "player-score",
    winnerDivLabel: "winner-div",
    winnerMessageLabel: "winner-message-label",
    playAgainBtnLabel: "play-again"
  };

  // Getting html elements
  const domElements = {
    cards: document.querySelectorAll(`.${domLabels.cardsLabel}`),
    firstWrapper: document.querySelector(`.${domLabels.firstWrapperLabel}`),
    secondWrapper: document.querySelector(`.${domLabels.secondWrapperLabel}`),
    gameWrapper: document.querySelector(`.${domLabels.gameWrapperLabel}`),
    inputs: document.querySelectorAll(`.${domLabels.inputsLabel}`),
    playBtn: document.querySelector(`#${domLabels.playBtnLabel}`),
    boxes: document.querySelectorAll(`.${domLabels.boxLabel}`),
    playerNames: document.querySelectorAll(`.${domLabels.playerNameLabel}`),
    playerScore: document.querySelectorAll(`.${domLabels.playerScoreLabel}`),
    winnerDiv: document.querySelector(`#${domLabels.winnerDivLabel}`),
    winnerMessage: document.querySelector(`#${domLabels.winnerMessageLabel}`),
    playAgainBtn: document.querySelector(`#${domLabels.playAgainBtnLabel}`)
  };

  // function to remove classes on playing again 

  function removeClasses() {
    domElements.boxes.forEach(function(box) {
      box.classList.remove('blue-color', 'brown-color');
    })
  }

  return {
    UIDomElements: domElements,
    UIDomLabels: domLabels,
    removeClasses,
  };
})();

// Game controller 
let gameController = (function (UICtrl, logicCtrl) {
  let roundState = 0;
  let winnerDeclared = false;
  const playersArray = [];
  let boxes = UICtrl.UIDomElements.boxes;

  // Adding event listeners to cards to choose game mode and navigate to next step
  UICtrl.UIDomElements.cards.forEach(function (card) {
    card.addEventListener("click", function () {
      if (card.id == "AI") {
        UICtrl.UIDomElements.firstWrapper.classList.add("no-display");
        UICtrl.UIDomElements.firstWrapper.classList.remove("show");
        UICtrl.UIDomElements.gameWrapper.classList.remove("no-display");
        UICtrl.UIDomElements.gameWrapper.classList.add("show");
      } else if (card.id == "friend") {
        UICtrl.UIDomElements.firstWrapper.classList.add("no-display");
        UICtrl.UIDomElements.firstWrapper.classList.remove("show");
        UICtrl.UIDomElements.secondWrapper.classList.remove("no-display");
        UICtrl.UIDomElements.secondWrapper.classList.add("show");
      }
    });
  });

  // Play game button functionality
  UICtrl.UIDomElements.playBtn.addEventListener("click", function () {
    UICtrl.UIDomElements.inputs.forEach(function (input) {
      player = logicCtrl.Player(
        input.value,
        input.id,
        UICtrl.UIDomElements.boxes
      );
      playersArray.push(player);
      input.value = ''
      // console.log(player);
    });
    UICtrl.UIDomElements.secondWrapper.classList.remove("show");
    UICtrl.UIDomElements.secondWrapper.classList.add("no-display");
    UICtrl.UIDomElements.gameWrapper.classList.remove("no-display");
    UICtrl.UIDomElements.gameWrapper.classList.add("show");
    // console.log(playersArray);
    setPlayerInfo(playersArray);
  });
  // UICtrl.UIDomElements.playerNames[0].textContent = playerOne;

  // Function to add symbols to boxes
  let display = function () {
    boxes.forEach(function (box, index) {
        if(logicCtrl.gameArray[index] == 'x') {
            box.classList.add('brown-color')
        }
        else if (logicCtrl.gameArray[index] == 'o') {
            box.classList.add('blue-color')
        }
      box.innerHTML = ` ${logicCtrl.gameArray[index]} `;
    });
  };

  // Add event listeners to boxes to add symbols to array when clicked

  UICtrl.UIDomElements.boxes.forEach(function (box) {
    box.addEventListener("click", function (e) {
      // Check to see if the box already has an element before performing actions
      if (e.target.textContent.trim().length == 0) {
        let id = e.target.dataset.key;
        playersArray[roundState].addSymbol(id);
        display();
        declareWinner()
        if (roundState == 0) {
          roundState = 1;
        } else if (roundState == 1) {
          roundState = 0;
        }
      }
    });
  });



  // Function to set Usernames to UI
  let setPlayerInfo = function (players) {
    let playerOne = players[0].playerName;
    let playerTwo = players[1].playerName;
    let playerOneScore = players[0].score;
    let playerTwoScore = players[1].score;

    UICtrl.UIDomElements.playerNames[0].textContent = playerOne;
    UICtrl.UIDomElements.playerNames[1].textContent = playerTwo;
    UICtrl.UIDomElements.playerScore[0].textContent = playerOneScore;
    UICtrl.UIDomElements.playerScore[1].textContent = playerTwoScore;
  };


  // Function to declare winner 
  let declareWinner = function() {
    let gameEnded = logicCtrl.gameEnded();
    let gameWinner = logicCtrl.getWinner();
    let winningMessage;

    if (gameEnded && gameWinner == undefined ) {
      winningMessage = "It's a draw"
      UICtrl.UIDomElements.winnerDiv.classList.add('show-block');
      UICtrl.UIDomElements.winnerMessage.textContent = winningMessage
      // console.log(winningMessage)
    }
 
        if (gameWinner == 'x'){
          winningMessage = `${playersArray[0].playerName} is the Winner`
          UICtrl.UIDomElements.winnerDiv.classList.add('show-block');
          UICtrl.UIDomElements.winnerMessage.textContent = winningMessage
            // console.log(winningMessage)
            updateScore(playersArray[0])
            winnerDeclared = true;
        }
        else if (gameWinner == 'o') {
          winningMessage = `${playersArray[1].playerName} is the Winner`
          UICtrl.UIDomElements.winnerDiv.classList.add('show-block');
          UICtrl.UIDomElements.winnerMessage.textContent = winningMessage
            // console.log(winningMessage)
            updateScore(playersArray[1])
            winnerDeclared = true;
        }
      }


//   function to update score 
function updateScore(player) {
player.score += 1;
setPlayerInfo(playersArray)
}

// function to reset score 
function resetScore() {
  playersArray[0].score = 0;
  playersArray[1].score = 0;
  setPlayerInfo(playersArray)
}

function playAgain() {
  roundState = 0
  UICtrl.UIDomElements.winnerDiv.classList.remove('show-block');
  logicCtrl.resetGameArray();
  display();
  UICtrl.removeClasses()
}

// function to start a new game 
function startNewGame(){
    playAgain();
    resetScore();
    UICtrl.UIDomElements.gameWrapper.classList.remove("show");
    UICtrl.UIDomElements.gameWrapper.classList.add("no-display");
    UICtrl.UIDomElements.firstWrapper.classList.remove('no-display')
    UICtrl.UIDomElements.firstWrapper.classList.add('show')
}

  return {
    playersArray,
    display,
    playAgain,
    startNewGame
  };
})(UIController, logicController);
