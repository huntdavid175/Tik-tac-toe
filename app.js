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
    let eight = gameArray[08];

    let winningCombos = [[zero,one,two],[three,four,five],[six,seven,eight],[zero,three,six],[one,four,seven],[two,five,eight],[zero,four,eight],[two,four,six]];
    let deciderArray = [];
    winningCombos.forEach(function(combo){
        // Check if an array has the same symbols 
       let decider = combo.every(function(item){
           return item == combo[0]
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
    

    
    console.log(deciderArray)
    console.log(winningCombos)
    console.log(winningSymbol);
    
    
    return winningSymbol
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

  return {
    gameArray,
    Player,
    getWinner,
  };
})();

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
  };

  return {
    UIDomElements: domElements,
    UIDomLabels: domLabels,
  };
})();

let gameController = (function (UICtrl, logicCtrl) {
  let gameState = 0;
  const playersArray = [];
  let boxes = UICtrl.UIDomElements.boxes;

  // Adding event listeners to cards to choose game mode and navigate to next step
  UICtrl.UIDomElements.cards.forEach(function (card) {
    card.addEventListener("click", function () {
      if (card.id == "AI") {
        UICtrl.UIDomElements.firstWrapper.classList.add("no-display");
        UICtrl.UIDomElements.gameWrapper.classList.remove("no-display");
        UICtrl.UIDomElements.gameWrapper.classList.add("show");
      } else if (card.id == "friend") {
        UICtrl.UIDomElements.firstWrapper.classList.add("no-display");
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
      console.log(player);
    });
    UICtrl.UIDomElements.secondWrapper.classList.remove("show");
    UICtrl.UIDomElements.secondWrapper.classList.add("no-display");
    UICtrl.UIDomElements.gameWrapper.classList.remove("no-display");
    UICtrl.UIDomElements.gameWrapper.classList.add("show");
    console.log(playersArray);
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
        playersArray[gameState].addSymbol(id);
        display();
        declareWinner()
        if (gameState == 0) {
          gameState = 1;
        } else if (gameState == 1) {
          gameState = 0;
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

  let declareWinner = function() {
    let gameWinner = logicCtrl.getWinner()
    if (gameWinner != undefined) {
        if (gameWinner == 'x'){
            console.log(`${playersArray[0].playerName} is the Winner`)
            updateScore(playersArray[0])
        }
        else if (gameWinner == 'o') {
            console.log(`${playersArray[1].playerName} is the Winner`)
            updateScore(playersArray[1])
        }
      }
    }

//   function to update score 

function updateScore(player) {
player.score += 1;
setPlayerInfo(playersArray)
}


  return {
    playersArray,
    display,
  };
})(UIController, logicController);
