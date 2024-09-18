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
        if (board[y][x] != "_") {
            return true;
        }
        return false;
    }

    const placeTile = function(player,x,y) {
        if (!checkTile(x,y)) {
            board[y][x] = player.getMarker();
        }
    }

    const checkWins = function() {
        debugger;
        const checkVertical = (function() {
            for (let i = 0; i<2; i++) {
                let firstChar = board[0][i];
                console.log(firstChar);
                if (firstChar == '_')
                    return false;
                for (let j = 1; j<2; j++) {
                    if (board[j][i] != firstChar) 
                        return false;
                }
            }
            return true;
        })();
        const checkHorizontal = (function() {
            for (let i = 0; i<2; i++) {
                let firstChar = board[i][0];
                if (firstChar == '_')
                    return false;
                for (let j = 1; j<2; j++) {
                    if (board[i][j] != firstChar) 
                        return false;
                }
            }
            return true;
        })();
        const checkDiagonal = (function() {
            let firstChar1 = board[0][0];
            let firstChar2 = board[0][2];
            let middle = board[1][1];
            let lastChar1 = board[2][0];
            let lastChar2 = board[2][2];

            if (firstChar1 == '_' || firstChar2 == '_')
                return false;
            if (firstChar1 != middle && middle != lastChar2) {
                return false;
            }
            if (firstChar2 != middle && middle != lastChar1) {
                return false;
            }

            return true;
        })();

        if (checkVertical || checkHorizontal || checkDiagonal) {
            return true;
        }
        return false;
    }

    
    return {getBoard, placeTile, checkWins};
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

    const queryPlayer = function() {
        let x = Number(prompt(`player ${currentPlayer.getMarker()} x:`));
        let y = Number(prompt(`player ${currentPlayer.getMarker()} y:`));

        gameBoard.placeTile(currentPlayer, x, y);
        //swapTurn();
    }

    let gameFinished = false;

    //expected output [O,X,_]
    while (!gameFinished) {
        queryPlayer();
        if (gameBoard.checkWins()) {
            gameFinished = true;
        }
        console.log(gameBoard.getBoard());
    }

})();
