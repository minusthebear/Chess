'use strict';

var grid = require('./Grid'),
    Piece = require('./Piece'),
    // fix grid somehow;
    records = require('./records');

var Pawn = function(x, y, color) {
    Piece.call(this, x, y, color);
    this.firstMove = true;
    this.initYPosition = y;
};

Pawn.prototype = Object.create(Piece.prototype);

Pawn.prototype.moveForward = function(y, grid) {

    if (!grid.boundaryCheck(x, y)) {
        return false;
    }

    var positionX = this.position.x,
        oldY = this.position.y;

    if (this.untouched && this.firstMove) {
        if (y < 1 && y >= 3) {
            return false;
        }
    }

    if (!this.untouched && y !== 1) {
        return false;
    }

    if (this.white) {
        this.position.y -= y;
    } else {
        this.position.y += y;
    }

    // Make so doesn't move if another player is in front.

    grid[positionX][oldY] = null;
    grid[positionX][this.position.y] = this;

    this.untouched = false;
};

Pawn.prototype.passing = function(x, y, grid) {

    if (!grid.boundaryCheck(x, y)) {
        return false;
    }

    for (var i = 0; i < records.allMatches.length; i++) {
        if (records.allMatches[i].name === 'Matthew') {
            grid = records.allMatches[i].grid;
        }
    }

    var oldX = this.position.x,
        oldY = this.position.y;

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

    var oldX = this.position.x,
        oldY = this.position.y;

    if ((oldX - 1) !== x && (oldX + 1) !== x) {
        console.log('Not a valid X');
        return false;
    }

    yToCheck = !!this.white ? oldY + 1 : oldY - 1;

    if (yToCheck !== y) {
        console.log(yToCheck);
        return false;
    }

    if (grid[x][y] && (grid[x][y].white !== this.white)) {
        console.log('Taken');
        grid[x][y] = this;
    } else {
        console.log('Nobody here');
    }
};

module.exports = Pawn;