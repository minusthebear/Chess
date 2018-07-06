'use strict';

var Pawn = require('./Pawn'),
    Bishop = require('./Bishop'),
    Rook = require('./Rook'),
    Knight = require('./Knight');

function getPieceType(obj) {
    if (obj instanceof Rook) {
        return "rooks";
    } else if (obj instanceof Pawn) {
        return "pawns";
    } else if (obj instanceof Bishop) {
        return "bishops";
    } else if (obj instanceof Knight) {
        console.log("knights");
        return "knights";
        // } else if (obj instanceof Queen) {
        //     console.log("queens");
        //     return "queens";
        // } else if (obj instanceof King) {
        //     console.log("king")
        //     return "king";

    } else {
        return null;
    }
}

function splicePiece(obj, grid) {
    var piece = getPieceType(obj);

    if (piece) {
        var color = obj.white ? 'white' : 'black',
            id = obj.id,
            arr = allObjects[color][piece];

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                arr.splice(i, i + 1);
            }
        }
    }
}

module.exports = {
    // allObjects: allObjects,
    // allMatches: allMatches,
    // getPieceType: getPieceType,
    // splicePiece: splicePiece
};