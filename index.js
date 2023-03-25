
const cells = document.querySelectorAll(".cell");
const msgDisplay = document.querySelector("#msg");
const restartBtn = document.querySelector("#restartBtn");

/* 
    indexes within the board
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]           
*/ 

const winningOptions = [
    // three in a row
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // three in a column
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // three diagonally
    [0, 4, 8],
    [2, 4, 6]
];

let boardStatus = ["", "", "", "", "", "", "", "" , ""];
let currentPlayer = "X";
isGameActive = false; // when a game is over, this will help us block additional drawings of X or O on the board 
// until restarting the game - mostly important for when a game is over but the board isn't full 



startGame();



function startGame(){
    cells.forEach((cell) => {
        cell.addEventListener("click", cellClicked)
    });
    restartBtn.addEventListener("click", restart);
    msgDisplay.textContent = `${currentPlayer}'s turn`
    isGameActive = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIdx");
    if(boardStatus[cellIndex] != "" || isGameActive == false)
    {
        return; // ignore the click
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, cellIndex){
    let color = (currentPlayer == "X") ? "red" : "blue";
    boardStatus[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer; 
    cell.style.color = color;
}

function changePlayer(){

    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    msgDisplay.textContent = `${currentPlayer}'s turn`;

}

function checkWinner(){
    let won = false;
    for(let i = 0; i < winningOptions.length; i++)
    {
        const option = winningOptions[i];


        if(boardStatus[option[0]] == boardStatus[option[1]]
            && boardStatus[option[0]] == boardStatus[option[2]]
            && boardStatus[option[0]] == currentPlayer)
        {
            won = true;
            break;
        }
    }
    if(won)
    {
        msgDisplay.textContent = `${currentPlayer} won!`;
        isGameActive = false;
    }
    else
    {
        let draw = true;
        for(let i = 0; i < boardStatus.length; i++)
        {
            if(boardStatus[i] == "") 
            {
                draw = false; // board isn't full && no winner -> can keep playing
            }
        }
        if(draw)
        {
           msgDisplay.textContent = "Draw!"; // board is full && no winner
           isGameActive = false; 
        }
        else
        {
            changePlayer();
        }
        
    }

}

function restart(){
    currentPlayer = "X";
    msgDisplay.textContent = `${currentPlayer}'s turn`;
    boardStatus = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    isGameActive = true;
}




