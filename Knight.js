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
        board = grid.grid,
        oldX = this.position.x,
        oldY = this.position.y;

    workingOnTheKnightMoves.call(this, x, y, oldX, oldY, board);

    function workingOnTheKnightMoves(x, y, oldX, oldY, board) {
        if (oldY === y || oldX === x) {
            return false;
        } else if (oldGreaterThanNew(y, oldY, 2) || newGreaterThanOld(y, oldY, 2)) {
            checkBothAndSetPosition.call(this, x, y, oldX, x, board);
            grid.setPiece(x, y, oldX, oldY, this);
        } else if (oldGreaterThanNew(x, oldX, 2) || newGreaterThanOld(x, oldX, 2)) {
            checkBothAndSetPosition.call(this, x, y, oldY, y, board);
            grid.setPiece(x, y, oldX, oldY, this);
        } else {
            console.log('Line 37');
            return false;
        }
    }

    function checkBothAndSetPosition(x, y, oldNum, nouveauNum, board) {
        if (checkBoth(oldNum, nouveauNum, 1) && this.checkIfOppositeColor(board, x, y)) {
            this.setPosition(x, y);
        } else {
            return false;
        }
    }

    function oldGreaterThanNew(n, o, num) {
        console.log('line 53');
        return (o > n && (o - n === num));
    }

    function newGreaterThanOld(n, o, num) {
        console.log('line58');
        return (o < n && (n - o === num));
    }

    function checkBoth(n, o, num) {
        console.log('Line 63');
        return oldGreaterThanNew(n, o, num) || newGreaterThanOld(n, o, num);
    }
}


module.exports = Knight;