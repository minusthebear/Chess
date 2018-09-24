'use strict';

var Grid = require('./Grid'),
    Piece = require('./Piece');

var Knight = function(x, y, type, color) {
    Piece.call(this, x, y, type, color);
};

Knight.prototype = Object.create(Piece.prototype);

Knight.prototype.move = function(x, y, grid) {

    if (!grid.boundaryCheck(x, y)) {
        console.log('Line 15');
        return false;
    }

    var piece = this,
        oldX = piece.position.x,
        oldY = piece.position.y;

    return workingOnTheKnightMoves.call(piece, x, y, oldX, oldY, grid);
}

function workingOnTheKnightMoves(x, y, oldX, oldY, grid) {
    var piece = this;

    if (oldY === y || oldX === x) {
        return false;
    } else if (checkWhenYisTwoAndXisOne(x, y, oldX, oldY)) {
        checkBothAndSetPosition.call(piece, x, y, oldX, x, grid);
        grid.setPiece(x, y, oldX, oldY, piece);
        return true;
    } else if (checkWhenXisTwoAndYisOne(x, y, oldX, oldY)) {
        checkBothAndSetPosition.call(piece, x, y, oldY, y, grid);
        grid.setPiece(x, y, oldX, oldY, piece);
        return true;
    }
    return false;
}

function checkBothAndSetPosition(x, y, oldNum, nouveauNum, grid) {
    var piece = this,
        board = grid.grid;

    if (checkBoth(oldNum, nouveauNum, 1) && piece.checkIfOppositeColor(board, x, y)) {
        piece.setPosition(x, y);
        return true;
    } else {
        return false;
    }
}

function checkWhenYisTwoAndXisOne(x, y, oldX, oldY) {
    return (oldGreaterThanNew(y, oldY, 2) || newGreaterThanOld(y, oldY, 2)) &&
        (oldGreaterThanNew(x, oldX, 1) || newGreaterThanOld(x, oldX, 1));
}

function checkWhenXisTwoAndYisOne(x, y, oldX, oldY) {
    return (oldGreaterThanNew(x, oldX, 2) || newGreaterThanOld(x, oldX, 2)) &&
        (oldGreaterThanNew(y, oldY, 1) || newGreaterThanOld(y, oldY, 1));
}

function oldGreaterThanNew(n, o, num) {
    return (o > n && (o - n === num));
}

function newGreaterThanOld(n, o, num) {
    return (o < n && (n - o === num));
}

function checkBoth(n, o, num) {
    return oldGreaterThanNew(n, o, num) || newGreaterThanOld(n, o, num);
}


module.exports = Knight;