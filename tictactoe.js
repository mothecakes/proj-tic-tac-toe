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

    
    return {getBoard, placeTile};
})();

const createPlayer = function(playerSide, mark) {
    let marker = mark;
    let side = playerSide;
    let wins = 0

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

    gameBoard.placeTile(player1, 0, 0);
    gameBoard.placeTile(player2, 1, 0);
    gameBoard.placeTile(player1, 1, 0);
    //expected output [O,X,_]

    console.log(gameBoard.getBoard());
})();
