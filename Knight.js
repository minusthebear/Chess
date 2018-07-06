'use strict';

var Grid = require('./Grid'),
    Piece = require('./Piece');

var Knight = function(x, y, color) {
    Piece.call(this, x, y, color);
};

Knight.prototype = Object.create(Piece.prototype);

Knight.prototype.move = function(x, y, grid) {

    if (!grid.boundaryCheck(x, y)) {
        return false;
    }

    var board = grid.grid,
        xToCheck,
        yToCheck,
        oldX = this.position.x,
        oldY = this.position.y;

    if (oldY === y || oldX === x) {
        return false;
    } else if (oldGreaterThanNew(y, oldY, 2)) {
        if (!checkBoth(x, oldX, 1)) {
            return false;
        } else {
            setPosition(x, y);
        }
    } else if (newGreaterThanOld(y, oldY, 2)) {
        if (!checkBoth(x, oldX, 1)) {
            return false;
        } else {
            setPosition(x, y);
        }
    } else if (oldGreaterThanNew(x, oldX, 2)) {
        if (!checkBoth(y, oldY, 1)) {
            return false;
        } else {
            setPosition(x, y);
        }
    } else if (newGreaterThanOld(x, oldX, 2)) {
        if (!checkBoth(y, oldY, 1)) {
            return false;
        } else {
            setPosition(x, y);
        }
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

    function setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
    }
}


module.exports = Knight;