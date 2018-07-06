'use strict';

var splicePiece = require('./records').splicePiece,
    Pawn = require('./Pawn'),
    Knight = require('./Knight'),
    Bishop = require('./Bishop'),
    Rook = require('./Rook'),
    Grid = require('./Grid');

var grid = new Grid('matthew');

function initializeGrid() {
    grid.setName('Balsac');

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
        allObjects[color].pawns = initializePawns(grid, color, homeTeam, initFrontYPosition);
        allObjects[color].bishops = initializeBishops(grid, color, homeTeam, initRearYPosition);
        allObjects[color].knights = initializeKnights(grid, color, homeTeam, initRearYPosition);
        allObjects[color].rooks = initializeRooks(grid, color, homeTeam, initRearYPosition);
    }
    grid.setAllObjects(allObjects);
}

function initializePawns(grid, color, team, Y) {
    var pawns = [];

    for (var i = grid.boundary.min; i <= grid.boundary.max; i++) {
        var pwn = new Pawn(i, Y, team);
        pawns.push(pwn);
        grid.setStartPosOnGrid(i, Y, pwn);
    }
    return pawns;
}

function initializeBishops(grid, color, team, Y) {
    var bishopOne = new Bishop(3, Y, team),
        bishopTwo = new Bishop(6, Y, team),
        bishops = [bishopOne, bishopTwo];

    grid.setTwoStartPosOnGrid([3, Y, bishopOne], [6, Y, bishopTwo]);

    return bishops;
}

function initializeKnights(grid, color, team, Y) {
    var knightOne = new Knight(2, Y, team),
        knightTwo = new Knight(7, Y, team),
        knights = [knightOne, knightTwo];

    grid.setTwoStartPosOnGrid([2, Y, knightOne], [7, Y, knightTwo]);

    return knights;
}

function initializeRooks(grid, color, team, Y) {
    var rookOne = new Rook(1, Y, team),
        rookTwo = new Rook(8, Y, team),
        rooks = [rookOne, rookTwo];

    grid.setTwoStartPosOnGrid([1, Y, rookOne], [8, Y, rookTwo]);

    return rooks;
}

initializeGame();

var bishopOne = grid.getSpecificPiece('black', 'bishops', 3);
console.log(bishopOne);
var bishopTwo = grid.getSpecificPiece('white', 'bishops', 3);
console.log(bishopTwo);

var knightOne = grid.getSpecificPiece('black', 'knights', 2);
console.log(knightOne);
knightOne.move(3, 3, grid);
console.log(grid);