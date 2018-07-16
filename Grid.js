'use strict';

var Pawn = require('./Pawn'),
    Bishop = require('./Bishop'),
    Rook = require('./Rook'),
    Knight = require('./Knight');

var Grid = function(name) {
    this.name = name;
    this.grid = {};
    this.allObjects = {};
    this.boundary = {
        min: 1,
        max: 8
    };
    Object.freeze(this.boundary);
};

Grid.prototype.setName = function(name) {
    Object.defineProperty(this, 'name', {
        value: name,
        writable: false,
        configurable: false
    });
}

Grid.prototype.setAllObjects = function(obj) {
    this.allObjects = obj;
}

Grid.prototype.setTwoStartPosOnGrid = function(one, two) {
    this.setStartPosOnGrid.apply(this, one);
    this.setStartPosOnGrid.apply(this, two);
}

Grid.prototype.setStartPosOnGrid = function(x, y, obj) {
    this.grid[x][y] = obj;
}

Grid.prototype.getSpecificPiece = function(color, piece, id) {
    if (!color || !piece) {
        return false;
    }

    var arr = this.allObjects[color][piece];

    for (var i = 0; i < arr.length; i++) {
        if (id === arr[i].id) {
            return arr[i];
        }
    }
}

Grid.prototype.setPiece = function(x, y, oldX, oldY, obj) {
    this.grid[oldX][oldY] = null;
    this.grid[x][y] = obj;
}

Grid.prototype.splicePiece = function(obj) {
    // TODO: see if this works
    var piece = this.getPieceType.call(this, obj);

    if (piece) {
        var color = obj.white ? 'white' : 'black',
            id = obj.id,
            arr = this.allObjects[color][piece];

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                arr.splice(i, i + 1);
            }
        }
    }
}

Grid.prototype.getPieceType = function(obj) {
    console.log(obj);

    // if (obj instanceof require('./Rook')) {
    //     return "rooks";
    // } else if (obj instanceof require('./Pawn')) {
    //     return "pawns";
    // } else if (obj instanceof require('./Bishop')) {
    //     return "bishops";
    // } else if (obj instanceof require('./Knight')) {
    //     console.log("knights");
    //     return "knights";
    // } else if (obj instanceof Queen) {
    //     console.log("queens");
    //     return "queens";
    // } else if (obj instanceof King) {
    //     console.log("king")
    //     return "king";

    // } else {
    //     return null;
    // }
}

Grid.prototype.boundaryCheck = function(x, y) {
    if (this.boundary.min > x || this.boundary.max < x || this.boundary.min > y || this.boundary.max < y) {
        return false;
    } else {
        return true;
    }
}

module.exports = Grid;