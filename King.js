'use strict';

var Piece = require('./Piece');

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

    if (king.checkIfInCheck(x, y, grid)) {
        return false;
    }

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
        xAbs = Math.abs(oldX - x),
        yAbs = Math.abs(oldY - y);

    if (king.checkIfInCheck(x, y, grid)) {
        return false;
    }

    if (moveDiagonal(x, y, oldX, oldY, xAbs, yAbs) && grid.grid[x][y]) {
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

    if (king.checkIfInCheck(posX.king, posY, grid)) {
        return false;
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
        posY;

    if (x && y) {
        posX = x;
        posY = y;
    } else {
        posX = king.position.x;
        posY = king.position.y;
    }

    // Check horizontally, x value descending
    for (var i = posX - 1; i >= grid.boundary.min; i--) {
        if (straightLineCheck(i, posY, posX, grid)) {
            return true;
        }
    }

    // Check horizontally, x value ascending
    for (var i = posX + 1; i <= grid.boundary.max; i++) {
        if (straightLineCheck(i, posY, posX, grid)) {
            return true;
        }
    }

    // Check verticaly, y value descending
    for (var i = posY - 1; i >= grid.boundary.min; i--) {
        if (straightLineCheck(posX, i, posY, grid)) {
            return true;
        }
    }

    // Check verticaly, y value ascending
    for (var i = posY + 1; i <= grid.boundary.max; i++) {
        if (straightLineCheck(posX, i, posY, grid)) {
            return true;
        }
    }

    // Check diagonally, x and y value descending
    for (var i = posX - 1; i >= grid.boundary.min; i--) {
        for (var j = posY - 1; j >= grid.boundary.min; j--) {
            if ((posX - i) === (posY - j) && diagonalLineCheck(i, j, (posX - i), grid)) {
                return true;
            }
        }
    }

    // Check diagonally, x ascending and y value descending
    for (var i = posX + 1; i <= grid.boundary.max; i++) {
        for (var j = posY - 1; j >= grid.boundary.min; j--) {
            if ((i - posX) === (posY - j) && diagonalLineCheck(i, j, (i - posX), grid)) {
                return true;
            }
        }
    }

    // Check diagonally, x descending and y value ascending
    for (var i = posX - 1; i >= grid.boundary.min; i--) {
        for (var j = posY + 1; j <= grid.boundary.max; j++) {
            if ((posX - i) === (j - posY) && diagonalLineCheck(i, j, (i - posX), grid)) {
                return true;
            }
        }
    }

    // Check diagonally, x ascending and y value ascending
    for (var i = posX + 1; i <= grid.boundary.min; i++) {
        for (var j = posY + 1; j <= grid.boundary.max; j++) {
            if ((i - posX) === (j - posY) && diagonalLineCheck(i, j, (i - posX), grid)) {
                return true;
            }
        }
    }

    // Check for a knight
    if (allKnightChecks(posX, posY, grid)) {
        return true;
    }

    return false;
}

function allKnightChecks(x, y, grid) {
    return (knightCheck(x - 2, y - 1, grid) || knightCheck(x + 2, y - 1, grid) ||
        knightCheck(x - 2, y + 1, grid) || knightCheck(x + 2, y + 1, grid) ||
        knightCheck(x - 1, y - 2, grid) || knightCheck(x + 1, y - 2, grid) ||
        knightCheck(x - 1, y + 2, grid) || knightCheck(x + 1, y + 2, grid));
}

function knightCheck(x, y, grid) {
    if (!grid.boundaryCheck(x, y)) {
        return false;
    }

    if (grid[x][y]) {
        if (grid[x][y].white === king.white) {
            return false;
        }

        if (grid[x][y].type === 'Knight') {
            return true;
        }
    }
    return false;
}

function diagonalLineCheck(x, y, pos, grid) {
    if (grid[x][y]) {
        if (grid[x][y].white === king.white) {
            return false;
        }

        if (pos - num === 1 && (grid[x][y].type === 'King' || grid[x][y].type === 'Pawn')) {
            return true;
        } else if (grid[x][y].type === 'Queen' || grid[x][y].type === 'Bishop') {
            return true;
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