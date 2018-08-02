'use strict';

var splicePiece = require('./records').splicePiece,
    Pawn = require('./Pawn'),
    Knight = require('./Knight'),
    Bishop = require('./Bishop'),
    Rook = require('./Rook'),
    Queen = require('./Queen'),
    Grid = require('./Grid');

function initializeGrid() {
    var grid = new Grid('matthew');

    for (var i = grid.boundary.min; i <= grid.boundary.max; i++) {
        grid.grid[i] = {};
        for (var j = grid.boundary.min; j <= grid.boundary.max; j++) {
            grid.setStartPosOnGrid(i, j, null);
        }
    }
    return grid;
}

function initializeGame() {
    var grid = initializeGrid();
    var homeTeam,
        initFrontYPosition,
        initRearYPosition,
        color,
        allObjects = {};

    for (var i = 0; i < 2; i++) {
        if (i % 2 === 0) {
            initFrontYPosition = 7;
            initRearYPosition = 8;
            color = 'white';
            homeTeam = true;
        } else {
            initFrontYPosition = 2;
            initRearYPosition = 1;
            color = 'black';
            homeTeam = false;
        }

        allObjects[color] = {};
        allObjects[color].pawns = initializePawns(grid, homeTeam, initFrontYPosition);
        allObjects[color].bishops = initializeBishops(grid, homeTeam, initRearYPosition);
        allObjects[color].knights = initializeKnights(grid, homeTeam, initRearYPosition);
        allObjects[color].rooks = initializeRooks(grid, homeTeam, initRearYPosition);
        allObjects[color].queens = initializeQueens(grid, homeTeam, initRearYPosition);
    }
    grid.setAllObjects(allObjects);

    return grid;
}

function initializePawns(grid, team, Y) {
    var pawns = [];

    for (var i = grid.boundary.min; i <= grid.boundary.max; i++) {
        var pwn = new Pawn(i, Y, 'Pawn', team);
        pawns.push(pwn);
        grid.setStartPosOnGrid(i, Y, pwn);
    }
    return pawns;
}

function initializeBishops(grid, team, Y) {
    var bishopOne = new Bishop(3, Y, 'Bishop', team),
        bishopTwo = new Bishop(6, Y, 'Bishop', team),
        bishops = [bishopOne, bishopTwo];

    grid.setTwoStartPosOnGrid([3, Y, bishopOne], [6, Y, bishopTwo]);

    return bishops;
}

function initializeKnights(grid, team, Y) {
    var knightOne = new Knight(2, Y, 'Knight', team),
        knightTwo = new Knight(7, Y, 'Knight', team),
        knights = [knightOne, knightTwo];

    grid.setTwoStartPosOnGrid([2, Y, knightOne], [7, Y, knightTwo]);

    return knights;
}

function initializeRooks(grid, team, Y) {
    var rookOne = new Rook(1, Y, 'Rook', team),
        rookTwo = new Rook(8, Y, 'Rook', team),
        rooks = [rookOne, rookTwo];

    grid.setTwoStartPosOnGrid([1, Y, rookOne], [8, Y, rookTwo]);

    return rooks;
}

function initializeQueens(grid, team, Y) {
    var queen = new Queen(4, Y, 'Queen', team),
        queens = [queen];
    grid.setStartPosOnGrid(4, Y, queen);

    return queens;
}
module.exports = initializeGame();