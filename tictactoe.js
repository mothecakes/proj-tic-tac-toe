const GameController = (function() {
    let gameboard = GameBoard();
    let player1 = Player(1);
    let player2 = Player(2);
    
    let test = function(){
        console.log(gameboard.getBoard);
        gameboard.placeTile(player1,0,0)
    }

    return {test};
})();

let Player = (side) => {
    const playerName = side;
    const tile = function(side) {
        if(side == 1)
            return "X"
        else if (side ==2)
            return "O"
    }; 

    return {tile, playerName};
}

let GameBoard = (function() {
    const row = 3;
    const col = 3;
    let gameboard = [row][col];

    let getBoard = function() {
        return gameboard;
    }

    let checkTile = function(x,y) {
        let tile = gameboard[x][y];
        if (tile == null)
            return true;
    }

    let placeTile = function(player,x,y) {
        if(checkTile(x,y)) {
            gameboard[x][y] = player.tile;
            return true;
        }
        else {
            return false;
        }
    }

    return {getBoard, placeTile};

    
})();

const init = GameController();