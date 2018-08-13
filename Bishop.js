'use strict';

var Grid = require('./Grid'),
    Piece = require('./Piece');

var Bishop = function(x, y, type, color) {
    Piece.call(this, x, y, type, color);
};

Bishop.prototype = Object.create(Piece.prototype);

Bishop.prototype.move = function(x, y, grid) {

    if (!grid.boundaryCheck(x, y)) {
        return false;
    }

    var piece = this,
        yToCheck,
        oldX = piece.position.x,
        oldY = piece.position.y,
        color = piece.color;

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
                return piece.checkPiece.apply(piece, [grid, oldX - 1, oldX, oldY - 1, oldY]);
            }
        }
        setPosition.call(piece, x, y);
        return true;
    }

    if (oldX > x && oldY < y) {
        var xToCheck = oldX - x,
            yToCheck = y - oldY;

        if (xToCheck !== yToCheck) {
            return false;
        }

        for (var i = 1; i <= xToCheck; i++) {
            if (grid.grid[oldX - i][oldY + i]) {
                return piece.checkPiece.apply(piece, [grid, oldX - 1, oldX, oldY + i, oldY]);
            }
        }
        setPosition.call(piece, x, y);
        return true;
    }

    if (oldX < x && oldY > y) {
        var xToCheck = x - oldX,
            yToCheck = oldY - y;

        if (xToCheck !== yToCheck) {
            return false;
        }

        for (var i = 1; i <= xToCheck; i++) {
            if (grid.grid[oldX + i][oldY - i]) {
                return piece.checkPiece.apply(piece, [grid, oldX + 1, oldX, oldY + i, oldY]);
            }
        }
        setPosition.call(piece, x, y);
        return true;
    }

    if (oldX < x && oldY < y) {
        var xToCheck = x - oldX,
            yToCheck = y - oldY;

        if (xToCheck !== yToCheck) {
            return false;
        }


        for (var i = 1; i <= xToCheck; i++) {
            if (grid.grid[oldX - i][oldY - i]) {
                return piece.checkPiece.apply(piece, [grid, oldX + 1, oldX, oldY + i, oldY]);
            }
        }
        setPosition.call(piece, x, y);
        return true;
    }
    return false;
}

function setPosition(x, y) {
    this.position.x = x;
    this.position.y = y;
}

Bishop.prototype.checkPiece = function(grid, numX, oldNumX, numY, oldNumY) {
    var oldObj;

    if (this.checkIfOppositeColor.apply(this, [grid.grid, numX, numY])) {
        oldObj = grid.grid[numX][numY];
        this.setGrid.apply(this, [grid, numX, oldNumX, numY, oldNumY]);
        grid.splicePiece(oldObj);
        return true;
    } else {
        return false;
    }
}

Bishop.prototype.setGrid = function(grid, x, oldX, y, oldY) {

    if (!x && !y && !oldX && !oldY) {
        return false;
    }

    if (oldX !== x && oldY !== y) {
        this.position.x = x;
        this.position.y = y;
        this.unTouched = false;
        grid.grid[oldX][oldY] = null;
    }

    grid.grid[x][y] = this;
}

module.exports = Bishop;