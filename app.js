let UIController = (function () {
    const domLabels = {
        cardsLabel: 'card',
        firstWrapperLabel: 'first-wrapper',
        secondWrapperLabel: 'second-wrapper',
        gameWrapperLabel: 'game-wrapper'
    }

    const domElements = {
        cards: document.querySelectorAll(`.${domLabels.cardsLabel}`),
        firstWrapper: document.querySelector(`.${domLabels.firstWrapperLabel}`),
        secondWrapper: document.querySelector(`.${domLabels.secondWrapperLabel}`),
        gameWrapper: document.querySelector(`.${domLabels.gameWrapperLabel}`),
    }

    
    domElements.cards.forEach(function(card) {
        card.addEventListener('click', function() {
            if (card.id == 'AI') {
                domElements.firstWrapper.classList.add('no-display')
                domElements.gameWrapper.classList.remove('no-display')
                domElements.gameWrapper.classList.add('show')
            }
            else if (card.id == "friend") {
                domElements.firstWrapper.classList.add('no-display');
                domElements.secondWrapper.classList.remove('no-display');
                domElements.secondWrapper.classList.add('show')
            }
        })
    });
})();


let gameController = (function() {
    // some code here 
})();
