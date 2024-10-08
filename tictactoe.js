const gameBoard = (function () {
    const row = 3;
    const col = 3;
    let board = [
        ["_","_","_"],
        ["_","_","_"],
        ["_","_","_"]
    ];

    const getBoard = () => board;

    const checkTile = function(x,y) {
        if (board[x][y] != "_") {
            return true;
        }
        return false;
    }

    const placeTile = function(player,x,y) {
        if (!checkTile(x,y)) {
            board[x][y] = player.getMarker();
        }
    }

    const checkWins = function() {
        const checkVertical = function() {
            for (let i = 0; i<2; i++) {
                let firstChar = board[0][i];
                console.log(firstChar);
                if (firstChar == '_')
                    continue;
                if (board[1][i] == firstChar && board[2][i] == firstChar)
                    return true;
            }
            
            return false;

        };
        const checkHorizontal = function() {
            for (let i = 0; i<2; i++) {
                let firstChar = board[i][0];
                console.log(firstChar);
                if (firstChar == '_')
                    continue;
                if (board[i][1] == firstChar && board[i][2] == firstChar)
                    return true;
            }
            return false;
        };
        const checkDiagonal = function() {
            let firstChar1 = board[0][0];
            let firstChar2 = board[0][2];
            let middle = board[1][1];
            let lastChar1 = board[2][0];
            let lastChar2 = board[2][2];

            if (firstChar1 != '_' && firstChar1 == middle && middle == lastChar2) {
                return true;
            }
            if (firstChar2 != '_' && firstChar2 == middle && middle == lastChar1) {
                return true;
            }

            return false;
        };

        if (checkVertical() || checkHorizontal() || checkDiagonal()){
            console.log("win");
            return true;
        }
        return false;
    }

    
    return {getBoard, placeTile, checkWins};
})();

const renderer = (function(){
    const updateDisplay = function() {
        const width = 3;
        let board = gameBoard.getBoard();
        const buttons = document.querySelectorAll(".container div")
        let count = 0;
                    console.log("called");
        board.forEach(function(row) {
            row.forEach(function(element) {
                switch (element) {
                    case "X": 
                        buttons[count].style.backgroundColor = "red";
                        count++;
                        break;
                    
                    case "O": 
                        buttons[count].style.backgroundColor = "green";
                        count++;
                        break;
                    
                    default: 
                        buttons[count].style.backgroundColor = "blue";
                        count++;
                }
            })
        })
    }
    
    return {updateDisplay};
})();

const createPlayer = function(playerSide, mark) {
    let marker = mark;
    let side = playerSide;
    let wins = 0;

    let getSide = () => side;
    let getMarker = () => marker;

    let getWins = () => wins;
    let increaseWins = function() {
        wins++;
        return wins;
    }

    return {getSide, getWins, getMarker, getWins};
}

const gameController = (function() {
    let player1 = createPlayer(1, "O"); 
    let player2 = createPlayer(2, "X");

    let currentPlayer = player2;

    
    const swapTurn = function() {
        if (currentPlayer == player2) {
            currentPlayer = player1;
            return;
        }
        currentPlayer = player2;
    }

    const queryPlayer = function(x, y) {
        gameBoard.placeTile(currentPlayer, x, y);
        console.log(gameBoard.getBoard());
        swapTurn();
    }

    const init = (function() {
        let buttons = document.querySelectorAll(".container div");

        let count = 0;
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                buttons[count].addEventListener("click", function() {
                    console.log(x +", " + y);
                    queryPlayer(x, y);
                    renderer.updateDisplay();
                })
                count++;
            }
        }
    })();

    let gameFinished = false;

    //expected output [O,X,_]
    while (gameFinished) {
        if (gameBoard.checkWins()) {
            gameFinished = true;
        }
    }

})();

