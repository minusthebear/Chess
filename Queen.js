'use strict';

var Piece = require('./Piece'),
    Grid = require('./Grid');

var Queen = function(x, y, color) {
    Piece.call(this, x, y, color);
};

Queen.prototype = Object.create(Piece.prototype);

Queen.prototype.setPosition = function(x, y) {
    this.position.x = x;
    this.position.y = y;
};

Queen.prototype.moveStraight = function(x, y, grid) {

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
        for (var i = oldY - 1; i >= y; i--) {
            if (board[x][i]) {

                var oldObj;

                if (this.checkIfOppositeColor(board, x, i)) {
                    oldObj = board[x][i];
                    this.setGrid(board, x, null, i, oldY);
                    this.unTouched = false;
                    grid.splicePiece(oldObj);
                    return true;
                } else {
                    return false;
                }
            }
        }
        this.setGrid(board, x, null, y, oldY);
        this.unTouched = false;
        return true;
    }

    if (oldX === x && oldY < y) {
        for (var i = oldY + 1; i <= y; i++) {
            if (board[x][i]) {

                var oldObj;

                if (this.checkIfOppositeColor(board, x, i)) {
                    var oldObj = board[x][i];
                    this.setGrid(board, x, null, i, oldY);
                    this.unTouched = false;
                    grid.splicePiece(oldObj);
                    return true;
                } else {
                    return false;
                }
            }
        }
        this.setGrid(board, x, null, y, oldY);
        this.unTouched = false;
        return true;
    }

    if (oldY === y && oldX > x) {
        for (var i = oldX - 1; i >= x; i--) {
            if (board[i][y]) {

                var oldObj;

                if (this.checkIfOppositeColor(board, i, y)) {
                    var oldObj = board[i][y];
                    this.setGrid(board, i, oldX, y, null);
                    this.unTouched = false;
                    grid.splicePiece(oldObj);
                    return true;
                } else {
                    return false;
                }
            }
        }
        this.setGrid(board, x, oldX, y, null);
        this.unTouched = false;
        return true;
    }

    if (oldY === y && oldX < x) {
        for (var i = oldX + 1; i <= x; i++) {
            if (board[i][y]) {

                var oldObj;

                if (this.checkIfOppositeColor(board, i, y)) {
                    var oldObj = board[i][y];
                    this.setGrid(board, i, oldX, y, null);
                    grid.splicePiece(oldObj);
                    this.unTouched = false;
                    return true;
                } else {
                    return false;
                }
            }
        }
        this.setGrid(board, i, oldX, y, null);
        this.unTouched = false;
        return true;
    }
};

Queen.prototype.moveDiagonal = function(x, y, grid) {

    if (!grid.boundaryCheck(x, y)) {
        return false;
    }

    var yToCheck,
        oldX = this.position.x,
        oldY = this.position.y,
        color = this.color;

    if (oldY === y || oldX === x) {
        return false;
    }

    if (oldX > x && oldY > y) {
        var xToCheck = oldX - x,
            yToCheck = oldY - y;

        if (xToCheck !== yToCheck) {
            return false;
        }

        for (var i = 1; i <= xToCheck; i++) {
            if (grid.grid[oldX - i][oldY - i]) {
                return this.checkPiece.apply(this, [grid, oldX - 1, oldX, oldY - 1, oldY]);
            }
        }

        this.setPosition(x, y);
    }

    if (oldX > x && oldY < y) {
        var xToCheck = oldX - x,
            yToCheck = y - oldY;

        if (xToCheck !== yToCheck) {
            return false;
        }

        for (var i = 1; i <= xToCheck; i++) {
            if (grid.grid[oldX - i][oldY + i]) {
                return this.checkPiece.apply(this, [grid, oldX - 1, oldX, oldY + i, oldY]);
            }
        }

        this.setPosition(x, y);
    }

    if (oldX < x && oldY > y) {
        var xToCheck = x - oldX,
            yToCheck = oldY - y;

        if (xToCheck !== yToCheck) {
            return false;
        }

        for (var i = 1; i <= xToCheck; i++) {
            if (grid.grid[oldX + i][oldY - i]) {
                return this.checkPiece.apply(this, [grid, oldX + 1, oldX, oldY + i, oldY]);
            }
        }

        this.setPosition(x, y);
    }

    if (oldX < x && oldY < y) {
        var xToCheck = x - oldX,
            yToCheck = y - oldY;

        if (xToCheck !== yToCheck) {
            return false;
        }


        for (var i = 1; i <= xToCheck; i++) {
            if (grid.grid[oldX - i][oldY - i]) {
                return this.checkPiece.apply(this, [grid, oldX + 1, oldX, oldY + i, oldY]);
            }
        }

        this.setPosition(x, y);
    }
};

Rook.prototype.setGrid = function(board, x, oldX, y, oldY) {

    if (!board && !x && !y && (!oldX && !oldY)) {
        return false;
    }

    if (oldX && !oldY) {
        this.setPosition(oldX, y);
        board[oldX][y] = null;
    }

    if (!oldX && oldY) {
        this.setPosition(x, oldY);
        board[x][oldY] = null;
    }

    board[x][y] = this;
}

Bishop.prototype.setGrid = function(board, x, oldX, y, oldY) {

    if (!x && !y && !oldX && !oldY) {
        return false;
    }

    if (oldX !== x && oldY !== y) {
        this.setPosition(x, y);
        this.unTouched = false;
        board[oldX][oldY] = null;
    }

    board[x][y] = this;
}