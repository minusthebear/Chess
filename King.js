'use strict';

var Piece = require('./Piece'),
    Grid = require('./Grid');

var King = function(x, y, type, color) {
    Piece.call(this, x, y, type, color);
};

King.prototype = Object.create(Piece.prototype);

function moveStraight(x, y, oldX, oldY) {

    if ((oldX !== x && oldY !== y) || (oldX === x && oldY === y)) {
        return false;
    }

    if (oldX !== x && Math.abs(oldX - x) !== 1) {
        return false;
    }

    if (oldY !== y && Math.abs(oldY - y) !== 1) {
        return false;
    }
    return true;
}

King.prototype.moveStraight = function(x, y, grid) {

    if (!grid.boundaryCheck(x, y)) {
        return false;
    }

    var king = this,
        oldX = king.position.x,
        oldY = king.position.y,
        board = grid.grid;

    if (!moveStraight(x, y, oldX, oldY)) {
        return false;
    }

    try {
        if (board[x][y]) {

            var oldObj;

            if (king.checkIfOppositeColor(board, x, y)) {
                oldObj = board[x][y];
                grid.splicePiece(oldObj);
            } else {
                return false;
            }
        }
        king.setGridStraight(grid, x, oldX, y, oldY);
        king.unTouched = false;

    } catch (err) {
        return false;
    }

    return true;
};

function moveDiagonal(x, y, oldX, oldY, xToCheck, yToCheck) {

    if (oldY === y || oldX === x) {
        return false;
    }

    if (xToCheck !== yToCheck || xToCheck !== 1) {
        return false;
    }
    return true;
}

King.prototype.moveDiagonal = function(x, y, grid) {

    if (!grid.boundaryCheck(x, y)) {
        return false;
    }

    var king = this,
        oldX = king.position.x,
        oldY = king.position.y,
        xToCheck = Math.abs(oldX - x),
        yToCheck = Math.abs(oldY - y);


    if (moveDiagonal(x, y, oldX, oldY, xToCheck, yToCheck) && grid.grid[x][y]) {
        return king.checkPiece.apply(king, [grid, oldX - 1, oldX, oldY - 1, oldY]);
    }
    return false;
};

King.prototype.setGridStraight = function(grid, x, oldX, y, oldY) {
    var king = this;

    if (!x && !y && ((!oldX && !oldY) || (oldY && oldX))) {
        return false;
    }

    king.setPosition(x, y);
    grid.setPiece(x, y, oldX, oldY, king);
};

King.prototype.setGridDiagonal = function(grid, x, oldX, y, oldY) {
    var king = this;

    if (!x && !y && !oldX && !oldY) {
        return false;
    }

    if (oldX !== x && oldY !== y) {
        king.setPosition(x, y);
        grid.setPiece(x, y, oldX, oldY, king);
    }
};

King.prototype.checkPiece = function(grid, numX, oldNumX, numY, oldNumY) {
    var king = this,
        oldObj;

    if (king.checkIfOppositeColor.apply(king, [grid.grid, numX, numY])) {
        oldObj = grid.grid[numX][numY];
        king.setGridDiagonal.apply(king, [grid, numX, oldNumX, numY, oldNumY]);
        grid.splicePiece(oldObj);
        return true;
    } else {
        return false;
    }
};


King.prototype.castle = function(rook, grid) {

    var king = this;

    if (!rook || rook.type !== 'Rook') {
        return false;
    }

    if (!king.untouched || !rook.untouched) {
        return false;
    }

    if (king.white !== rook.white) {
        return false;
    }

    var oldKingPos = king.position.x,
        oldRookPos = rook.position.x,
        posY = king.position.y,
        board = grid.grid,
        row,
        posX;

    if (oldRookPos > kingPos) {
        row = { max: oldRookPos, min: kingPos };
        posX = { king: oldKingPos + 2, rook: oldRookPos - 2 };
    } else {
        row = { max: oldKingPos, min: oldRookPos };
        posX = { king: oldKingPos - 2, rook: oldRookPos + 3 };
    }

    for (var i = row.min + 1; i < row.max; i++) {
        if (board[i][posY]) {
            return false;
        }
    }

    king.setPosition(posX.king, posY);
    grid.setPiece(posX.king, posY, oldKingPos, posY, king);
    rook.setPosition(posX.rook, posY);
    grid.setPiece(posX.rook, posY, oldRookPos, posY, rook);
    return true;
}

King.prototype.checkIfInCheck = function(x, y, grid) {
    var king = this,
        posX,
        posY,
        diagonalLineChk;

    if (x && y) {
        posX = x;
        posY = y;
        // diagonalLineChk = diagonalLineCheck.apply(king, [posX, posY, grid]);
    } else {
        posX = king.position.x;
        posY = king.position.y;
        // diagonalLineChk = diagonalLineCheck.apply(king, [posX, posY, grid]);
    }

    function boundaryCheck(x, y, grid) {
        return x < grid.boundary.min || x > grid.boundary.max || y < grid.boundary.min || y > grid.boundary.max;
    }

    // for (var i = 1; i <= xToCheck; i++) {
    //     if (checkIfOppositeColor(oldX - i, oldY - i, grid)) {
    //         return true;
    //     }
    // }

    // Check horizontally
    for (var i = posX - 1; i >= grid.boundary.min; i--) {
        if (straightLineCheck(i, posY, posX, i, grid)) {
            return true;
        }
    }

    // Check horizontally
    for (var i = posX + 1; i <= grid.boundary.max; i++) {
        if (straightLineCheck(i, posY, posX, i, grid)) {
            return true;
        }
    }

    // Check verticaly
    for (var i = posY - 1; i >= grid.boundary.min; i--) {
        if (straightLineCheck(posX, i, posY, i, grid)) {
            return true;
        }
    }

    // Check verticaly
    for (var i = posY + 1; i <= grid.boundary.max; i--) {
        if (straightLineCheck(posX, i, posY, i, grid)) {
            return true;
        }
    }
}

function diagonalLineCheck(x, y, oldX, oldY, grid) {

    if (oldX > x && oldY > y) {
        var xToCheck = oldX - x,
            yToCheck = oldY - y;

        if (xToCheck !== yToCheck) {
            return false;
        }

        for (var i = 1; i <= xToCheck; i++) {
            if (checkIfOppositeColor(oldX - i, oldY - i, grid)) {
                return true;
            }
        }
    }

    if (oldX > x && oldY < y) {
        var xToCheck = oldX - x,
            yToCheck = y - oldY;

        if (xToCheck !== yToCheck) {
            return false;
        }

        for (var i = 1; i <= xToCheck; i++) {
            if (checkIfOppositeColor(oldX - i, oldY + i, grid)) {
                return true;
            }
        }
    }

    if (oldX < x && oldY > y) {
        var xToCheck = x - oldX,
            yToCheck = oldY - y;

        if (xToCheck !== yToCheck) {
            return false;
        }

        for (var i = 1; i <= xToCheck; i++) {
            if (checkIfOppositeColor(oldX + i, oldY - i, grid)) {
                return true;
            }
        }
    }

    if (oldX < x && oldY < y) {
        var xToCheck = x - oldX,
            yToCheck = y - oldY;

        if (xToCheck !== yToCheck) {
            return false;
        }


        for (var i = 1; i <= xToCheck; i++) {
            if (checkIfOppositeColor(oldX + i, oldY + i, grid)) {
                return true;
            }
        }
    }
}

function checkIfOppositeColor(x, y, grid) {
    var king = this;

    if (grid.grid[x][y]) {
        if (king.checkIfOppositeColor.apply(king, [grid.grid, x, y])) {
            return true;
        } else {
            return false;
        }
    }
    return false;
}

function straightLineCheck(x, y, pos, num) {
    if (grid[x][y]) {
        if (grid[x][y].white === king.white) {
            return false;
        }

        if (pos - num === 1 && grid[x][y].type === 'King') {
            return true;
        } else if (grid[x][y].type === 'Queen' || grid[x][y].type === 'Rook') {
            return true;
        } else {
            return false;
        }
    }
    return false;
}

module.exports = King;