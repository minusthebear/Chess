'use strict';

var Grid = require('./Grid'),
    Piece = require('./Piece');

var Knight = function(x, y, color) {
    Piece.call(this, x, y, color);
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
        } else if (oldGreaterThanNew(y, oldY, 2)) {
            checkBothAndSetPosition.call(this, x, y, oldX, x, board);
        } else if (newGreaterThanOld(y, oldY, 2)) {
            checkBothAndSetPosition.call(this, x, y, oldX, x, board);
        } else if (oldGreaterThanNew(x, oldX, 2)) {
            checkBothAndSetPosition.call(this, x, y, oldY, y, board);
        } else if (newGreaterThanOld(x, oldX, 2)) {
            checkBothAndSetPosition.call(this, x, y, oldY, y, board);
        } else {
            console.log('Line 37');
            return false;
        }
    }

    function checkBothAndSetPosition(x, y, oldNum, nouveauNum, board) {
        if (!checkBoth(oldNum, nouveauNum, 1)) {
            console.log('Line 44');
            return false;
        } else {
            setPosition.call(this, x, y, board);
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

    function setPosition(x, y, board) {
        this.position.x = x;
        this.position.y = y;
        console.log('#######################\nSUCCESS!!!!\n#######################');
        console.log(this);
    }
}


module.exports = Knight;