'use strict';

var records = require('./records'),
    Piece = require('./Piece'),
    Grid = require('./Grid');

var Rook = function(x, y, type, color) {
    Piece.call(this, x, y, type, color);
};

Rook.prototype = Object.create(Piece.prototype);

Rook.prototype.move = function(x, y, grid) {

    if (!grid.boundaryCheck(x, y)) {
        return false;
    }

    var yToCheck,
        oldX = this.position.x,
        oldY = this.position.y,
        board = grid.grid;

    if ((oldX !== x && oldY !== y) || (oldX === x && oldY === y)) {
        return false;
    }

    if (oldX === x && oldY > y) {
        for (var i = oldY - 1; i > y; i--) {
            if (board[x][i]) {

                var oldObj;

                if (this.checkIfOppositeColor(board, x, i)) {
                    oldObj = board[x][i];
                    this.setGrid(grid, x, oldX, i, oldY);
                    this.unTouched = false;
                    grid.splicePiece(oldObj);
                    return true;
                } else {
                    return false;
                }
            }
        }
        this.setGrid(grid, x, oldX, y, oldY);
        this.unTouched = false;
        return true;
    }

    if (oldX === x && oldY < y) {
        for (var i = oldY + 1; i < y; i++) {
            if (board[x][i]) {

                var oldObj;

                if (this.checkIfOppositeColor(board, x, i)) {
                    var oldObj = board[x][i];
                    this.setGrid(grid, x, oldX, i, oldY);
                    this.unTouched = false;
                    grid.splicePiece(oldObj);
                    return true;
                } else {
                    return false;
                }
            }
        }
        this.setGrid(grid, x, oldX, y, oldY);
        this.unTouched = false;
        return true;
    }

    if (oldY === y && oldX > x) {
        for (var i = oldX - 1; i > x; i--) {
            if (board[i][y]) {

                var oldObj;

                if (this.checkIfOppositeColor(board, i, y)) {
                    var oldObj = board[i][y];
                    this.setGrid(grid, i, oldX, y, oldY);
                    this.unTouched = false;
                    grid.splicePiece(oldObj);
                    return true;
                } else {
                    return false;
                }
            }
        }
        this.setGrid(grid, x, oldX, y, oldY);
        this.unTouched = false;
        return true;
    }

    if (oldY === y && oldX < x) {
        for (var i = oldX + 1; i <= x; i++) {
            if (board[i][y]) {

                var oldObj;

                if (this.checkIfOppositeColor(board, i, y)) {
                    var oldObj = board[i][y];
                    this.setGrid(grid, i, oldX, y, oldY);
                    grid.splicePiece(oldObj);
                    this.unTouched = false;
                    return true;
                } else {
                    return false;
                }
            }
            if (grid.boundaryCheck(i)) {
                this.setGrid(grid, i, oldX, y, oldY);
                this.unTouched = false;
                return true;
            }
        }
    }
}

Rook.prototype.setGrid = function(grid, x, oldX, y, oldY) {

    if (!x || !y || !oldX || !oldY) {
        return false;
    }

    this.setPosition(x, y);
    grid.setPiece(x, y, oldX, oldY, this);
    return true;
}

module.exports = Rook;