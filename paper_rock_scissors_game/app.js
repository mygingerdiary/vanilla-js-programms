const game = () => {
    let pScore = 0;
    let cScore = 0;

    //start the game
    const startGame = () => {
        const playBtn = document.querySelector('.intro button');
        const introScreen = document.querySelector('.intro');
        const match = document.querySelector('.match');

        playBtn.addEventListener('click', () => {
            introScreen.classList.add('fadeOut');
            match.classList.add('fadeIn');
        });
    };

    //play match
    const playMatch = () => {
        const options = document.querySelectorAll('.options button');
        const playerHand = document.querySelector('.player-hand');
        const computerHand = document.querySelector('.computer-hand');
        const hands = document.querySelectorAll('.hands img');

        hands.forEach(hand => {
            hand.addEventListener('animationend', function(){
                this.style.animation = '';
            });
        })

        //computer options -> randomly generated
        const computerOptions = ['rock', 'paper', 'scissors'];

        options.forEach(option => {
            option.addEventListener('click', function () {
                //computer's choice
                const computerNumber = Math.floor(Math.random() * 3);  //0-2
                const computerChoice = computerOptions[computerNumber];

                setTimeout(() => {
                    //call compare hands
                    compareHands(this.textContent, computerChoice);

                    //update images
                    playerHand.src = `assets/${this.textContent}.png`;
                    computerHand.src = `assets/${computerChoice}.png`;
                }, 2000)

                //hands during game
                playerHand.src = 'assets/rock.png';
                computerHand.src = 'assets/rock.png';

                //animation
                playerHand.style.animation = "shakePlayer 2s ease";
                computerHand.style.animation = "shakeComputer 2s ease";
            });
        });
    };

    const updateScore = () => {
        const playerScore = document.querySelector('.player-score p');
        const computerScore = document.querySelector('.computer-score p');

        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    }

    const compareHands = (playerChoice, computerChoice) => {
        //update text
        const winner = document.querySelector('.winner');

        //check for a tie
        if (playerChoice === computerChoice) {
            winner.textContent = 'It is a tie';
            return;
        }

        //check for rock
        if (playerChoice === 'rock') {
            if (computerChoice === 'scissors') {
                winner.textContent = 'Player wins';
                pScore++;
                updateScore();
                return;
            } else {
                winner.textContent = 'Computer wins';
                cScore++;
                updateScore();
                return;
            }
        }

        //check for paper
        if (playerChoice === 'paper') {
            if (computerChoice === 'rock') {
                winner.textContent = 'Player wins';
                pScore++;
                updateScore();
                return;
            } else {
                winner.textContent = 'Computer wins';
                cScore++;
                updateScore();
                return;
            }
        }

        //check for scissors
        if (playerChoice === 'scissors') {
            if (computerChoice === 'paper') {
                winner.textContent = 'Player wins';
                pScore++;
                updateScore();
                return;
            } else {
                winner.textContent = 'Computer wins';
                cScore++;
                updateScore();
                return;
            }
        }
    }

//call all the inner functions
startGame();
playMatch();
};

//start the game
game();