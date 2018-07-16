'use strict';

var Piece = require('./Piece'),
    Grid = require('./Grid');

var King = function(x, y, type, color) {
    Piece.call(this, x, y, type, color);
};

King.prototype = Object.create(Piece.prototype);

King.prototype.moveStraight = function(x, y, grid) {

    if (!grid.boundaryCheck(x, y)) {
        return false;
    }

    var oldX = this.position.x,
        oldY = this.position.y,
        board = grid.grid;

    if ((oldX !== x && oldY !== y) || (oldX === x && oldY === y)) {
        return false;
    }

    if (oldX !== x && Math.abs(oldX - x) !== 1) {
        return false;
    }

    if (oldY !== y && Math.abs(oldY - y) !== 1) {
        return false;
    }

    try {
        if (board[x][y]) {

            var oldObj;

            if (this.checkIfOppositeColor(board, x, y)) {
                oldObj = board[x][y];
                grid.splicePiece(oldObj);
            } else {
                return false;
            }
        }
        this.setGridStraight(grid, x, oldX, y, oldY);
        this.unTouched = false;

    } catch (err) {
        return false;
    }

    return true;
};

King.prototype.moveDiagonal = function(x, y, grid) {

    if (!grid.boundaryCheck(x, y)) {
        return false;
    }

    var yToCheck,
        oldX = this.position.x,
        oldY = this.position.y,
        xToCheck = Math.abs(oldX - x),
        yToCheck = Math.abs(oldY - y);

    if (oldY === y || oldX === x) {
        return false;
    }

    if (xToCheck !== yToCheck || xToCheck !== 1) {
        return false;
    }

    if (grid.grid[x][y]) {
        return this.checkPiece.apply(this, [grid, oldX - 1, oldX, oldY - 1, oldY]);
    }
};

King.prototype.setGridStraight = function(grid, x, oldX, y, oldY) {

    if (!x && !y && ((!oldX && !oldY) || (oldY && oldX))) {
        return false;
    }

    this.setPosition(x, y);
    grid.setPiece(x, y, oldX, oldY, this);
};

King.prototype.setGridDiagonal = function(grid, x, oldX, y, oldY) {

    if (!x && !y && !oldX && !oldY) {
        return false;
    }

    if (oldX !== x && oldY !== y) {
        this.setPosition(x, y);
        grid.setPiece(x, y, oldX, oldY, this);
    }
};

King.prototype.checkPiece = function(grid, numX, oldNumX, numY, oldNumY) {
    var oldObj;

    if (this.checkIfOppositeColor.apply(this, [grid.grid, numX, numY])) {
        oldObj = grid.grid[numX][numY];
        this.setGridDiagonal.apply(this, [grid, numX, oldNumX, numY, oldNumY]);
        grid.splicePiece(oldObj);
        return true;
    } else {
        return false;
    }
};

module.exports = King;