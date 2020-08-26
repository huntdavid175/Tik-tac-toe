let logicController = (function() {
    let gameArray = ['x','','o','','x','','','',''];

    const Player = function(playerName, playerID){
        let score = 0;
        
        // function to add symbol to gameArray 
        let addSymbol = function(id) {
            gameArray.splice(id,1, playerID)
        }
        
        return {
            playerName,
            playerID,
            score,
            addSymbol
        }
    }

    return {
        gameArray,
        Player,
    }
})();


let UIController = (function () {
    // Names of dom element attributes 
    const domLabels = {
        cardsLabel: 'card',
        firstWrapperLabel: 'first-wrapper',
        secondWrapperLabel: 'second-wrapper',
        gameWrapperLabel: 'game-wrapper',
        inputsLabel: 'form-control',
        playBtnLabel: 'playBtn',
        boxLabel: 'box'
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
    };


    return {
        UIDomElements: domElements,
        UIDomLabels: domLabels,
    }
})();


let gameController = (function(UICtrl,logicCtrl) {
    const playersArray = [];
    let boxes = UICtrl.UIDomElements.boxes
    
      // Adding event listeners to cards to choose game mode and navigate to next step 
      UICtrl.UIDomElements.cards.forEach(function(card) {
        card.addEventListener('click', function() {
            if (card.id == 'AI') {
                UICtrl.UIDomElements.firstWrapper.classList.add('no-display');
                UICtrl.UIDomElements.gameWrapper.classList.remove('no-display');
                UICtrl.UIDomElements.gameWrapper.classList.add('show');
            }
            else if (card.id == "friend") {
                UICtrl.UIDomElements.firstWrapper.classList.add('no-display');
                UICtrl.UIDomElements.secondWrapper.classList.remove('no-display');
                UICtrl.UIDomElements.secondWrapper.classList.add('show');
            }
        });
    });

    // Play game button functionality
    UICtrl.UIDomElements.playBtn.addEventListener('click', function() {
        
        UICtrl.UIDomElements.inputs.forEach(function(input) {
            player = logicCtrl.Player(input.value, input.id, UICtrl.UIDomElements.boxes);
            playersArray.push(player)
            console.log(player)
        });
        UICtrl.UIDomElements.secondWrapper.classList.remove('show');
        UICtrl.UIDomElements.secondWrapper.classList.add('no-display');
        UICtrl.UIDomElements.gameWrapper.classList.remove('no-display');
        UICtrl.UIDomElements.gameWrapper.classList.add('show');
        console.log(playersArray);
    })

    // function to add symbols to boxes 
    let display = function() {
        boxes.forEach(function(box,index) {
            box.innerHTML = `<h1> ${logicCtrl.gameArray[index]} </h1>`
        })
    };

return {
    playersArray,
    display
}

})(UIController,logicController);
