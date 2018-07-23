'use strict';

var grid = require('./Grid'),
    Piece = require('./Piece'),
    // fix grid somehow;
    records = require('./records');

var Pawn = function(x, y, type, color) {
    Piece.call(this, x, y, type, color);
    this.firstMove = true;
    this.initYPosition = y;
};

Pawn.prototype = Object.create(Piece.prototype);

Pawn.prototype.moveForward = function(y, grid) {

    if (!grid.boundaryCheck(x, y)) {
        return false;
    }

    var piece = this,
        positionX = piece.position.x,
        oldY = piece.position.y;

    if (piece.untouched && piece.firstMove) {
        if (y < 1 && y >= 3) {
            return false;
        }
    }

    if (!piece.untouched && y !== 1) {
        return false;
    }

    if (piece.white) {
        piece.position.y -= y;
    } else {
        piece.position.y += y;
    }

    // Make so doesn't move if another player is in front.

    grid[positionX][oldY] = null;
    grid[positionX][piece.position.y] = piece;

    piece.untouched = false;
};

Pawn.prototype.passing = function(x, y, grid) {

    var piece = this;

    if (!grid.boundaryCheck(x, y)) {
        return false;
    }

    for (var i = 0; i < records.allMatches.length; i++) {
        if (records.allMatches[i].name === 'Matthew') {
            grid = records.allMatches[i].grid;
        }
    }

    var oldX = piece.position.x,
        oldY = piece.position.y;

    // This is not correct, figure out correct function
    if (!grid[oldX - 1][oldY] && !grid[oldX + 1][oldY]) {
        console.log("returning false?????");
        return false;
    }

    // This is not correct, figure out correct function
    if (!(grid[oldX - 1][oldY] instanceof Pawn) && !(grid[oldX + 1][oldY] instanceof Pawn)) {
        console.log("Not a pawn");
        return false;
    }

    console.log("All good!");
}

Pawn.prototype.take = function(x, y, grid) {

    if (!grid.boundaryCheck(x, y)) {
        return false;
    }
    // Edit out grid
    var grid,
        yToCheck;

    for (var i = 0; i < records.allMatches.length; i++) {
        if (records.allMatches[i].name === 'Matthew') {
            grid = records.allMatches[i].grid;
        }
    }

    var piece = this,
        oldX = piece.position.x,
        oldY = piece.position.y;

    if ((oldX - 1) !== x && (oldX + 1) !== x) {
        console.log('Not a valid X');
        return false;
    }

    yToCheck = !!piece.white ? oldY + 1 : oldY - 1;

    if (yToCheck !== y) {
        console.log(yToCheck);
        return false;
    }

    if (grid[x][y] && (grid[x][y].white !== piece.white)) {
        console.log('Taken');
        grid[x][y] = piece;
    } else {
        console.log('Nobody here');
    }
};

module.exports = Pawn;