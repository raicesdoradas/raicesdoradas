document.addEventListener('DOMContentLoaded', function() {
    const memoryGrid = document.querySelector('.memory-grid');
    let cards = [
        { name: 'papa', img: 'img/papa1.jpg' },
        { name: 'yuca', img: 'img/yuca1.jpg' },
        { name: 'camote', img: 'img/camo1.jpg' },
        { name: 'logo', img: 'img/logo.jpg' },
        { name: 'par', img: 'img/pareja.png' },
        { name: 'trivia', img: 'img/trivia.png' }
        //Agrega más pares de imágenes
    ];

    cards = cards.concat(cards);
    cards.sort(() => 0.5 - Math.random());

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let errors = 0;
    const maxErrors = 3;
    let matchedCards = 0;
    const totalPairs = cards.length / 2;

     // Crear un elemento para mostrar los errores
    const errorsDisplay = document.createElement('p');
    errorsDisplay.textContent = `Errores: ${errors} / ${maxErrors}`;
    document.querySelector('.memory-container').insertBefore(errorsDisplay, memoryGrid);


    function createCard(card) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.dataset.name = card.name;

        const frontFace = document.createElement('div');
        frontFace.classList.add('memory-face', 'front');

        const backFace = document.createElement('div');
        backFace.classList.add('memory-face', 'back');
        backFace.style.backgroundImage = `url(${card.img})`;
        backFace.style.backgroundSize = 'cover';

        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);

        cardElement.addEventListener('click', flipCard);

        return cardElement;
    }

    function flipCard() {
        if (lockBoard || errors >= maxErrors) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
          matchedCards++;

        if (matchedCards === totalPairs) {
            showWinMessage();
        }

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        errors++;
        updateErrorsDisplay();


        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');

            resetBoard();
              if (errors >= maxErrors) {
                showLoseMessage();
             }
        }, 1000);
    }

    function resetBoard() {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }

    function updateErrorsDisplay() {
        errorsDisplay.textContent = `Errores: ${errors} / ${maxErrors}`;
    }

     function showWinMessage() {
         const winMessage = document.createElement('div');
          winMessage.textContent = '¡Felicidades, has ganado!';
           winMessage.style.fontSize = '2em';
            winMessage.style.color = 'green';
          document.querySelector('.memory-container').appendChild(winMessage);
        lockBoard = true; //Bloquear la volteada de cartas si ya gano
        }

     function showLoseMessage() {
        const loseMessage = document.createElement('div');
         loseMessage.textContent = '¡Has perdido! Inténtalo de nuevo.';
          loseMessage.style.fontSize = '2em';
           loseMessage.style.color = 'red';
          document.querySelector('.memory-container').appendChild(loseMessage);
        lockBoard = true; //Bloquear la volteada de cartas si ya perdio
     }


    // Crear las cartas y añadirlas al grid
    cards.forEach(card => {
        const cardElement = createCard(card);
        memoryGrid.appendChild(cardElement);
    });
});