'use strict';

var Piece = require('./Piece');

var Pawn = function(x, y, type, color) {
    Piece.call(this, x, y, type, color);
    this.firstMove = true;
    this.initYPosition = y;
};

Pawn.prototype = Object.create(Piece.prototype);

Pawn.prototype.moveForward = function(x, y, grid) {

    if (!grid.boundaryCheck(x, y)) {
        return false;
    }

    var piece = this,
        positionX = piece.position.x,
        oldY = piece.position.y,
        diff = Math.abs(oldY - y);

    if (positionX !== x) {
        console.log("line 28");
        return false;
    }

    if (piece.untouched) {
        if (diff < 1 && diff >= 3) {
            console.log("line 34");
            return false;
        }
    }

    if (!piece.untouched && diff !== 1) {
        console.log("line 40");
        return false;
    }

    if (piece.white && oldY <= y) {
        return false;
    } else if (!piece.white && oldY >= y) {
        return false;
    }

    // Make so doesn't move if another player is in front.

    piece.setPosition(x, y);
    grid.grid[x][oldY] = null;
    grid.grid[x][y] = piece;
    piece.untouched = false;
    return true;
};

Pawn.prototype.passing = function(x, y, grid) {

    if (!grid.boundaryCheck(x, y)) {
        return false;
    }

    var piece = this,
        oldX = piece.position.x,
        oldY = piece.position.y,
        board = grid.grid,
        diffX = Math.abs(x - oldX),
        diffY = Math.abs(y - oldY);

    if (diffX !== 1 || diffY !== 1) {
        return false;
    }

    if (!board[x][oldY] || board[x][y]) {
        return false;
    }

    if (board[x][oldY].type === 'Pawn' && board[x][oldY].white !== piece.white) {
        board[oldX][oldY] = null;
        board[x][y] = piece;
        piece.setPosition(x, y);
        return true;
    }
    return false;
}

Pawn.prototype.take = function(x, y, grid) {

    if (!grid.boundaryCheck(x, y)) {
        return false;
    }

    var board = grid.grid,
        yToCheck,
        piece = this,
        oldX = piece.position.x,
        oldY = piece.position.y,
        diffX = Math.abs(x - oldX),
        diffY = Math.abs(y - oldY);

    if (diffX !== 1 || diffY !== 1) {
        return false;
    }

    yToCheck = !!piece.white ? oldY - 1 : oldY + 1;

    if (yToCheck !== y) {
        return false;
    }

    if (board[x][y] && (board[x][y].white !== piece.white)) {
        board[oldX][oldY] = null;
        board[x][y] = piece;
        piece.setPosition(x, y);
        return true;
    }
    return false;
};

module.exports = Pawn;