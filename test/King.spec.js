var expect = require('chai').expect,
    should = require('chai').should(),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    Grid = require('../Grid'),
    King = require('../King'),
    Rook = require('../Rook'),
    Queen = require('../Queen'),
    Bishop = require('../Bishop'),
    Pawn = require('../Pawn'),
    Knight = require('../Knight');

chai.use(chaiAsPromised);
chai.should();

function initializeGrid() {
    var grid = new Grid();

    for (var i = grid.boundary.min; i <= grid.boundary.max; i++) {
        grid.grid[i] = {};
        for (var j = grid.boundary.min; j <= grid.boundary.max; j++) {
            grid.setStartPosOnGrid(i, j, null);
        }
    }
    return grid;
}

function moveDiagonalFalseCheck(king, x, y, grid) {
    var origX = king.position.x,
        origY = king.position.y,
        test = king.moveDiagonal(x, y, grid);

    expect(test).to.be.false;
    expect(king.position.x).to.equal(origX);
    expect(king.position.y).to.equal(origY);
}

function moveDiagonalTrueCheck(king, x, y, grid) {
    var test = king.moveDiagonal(x, y, grid);

    expect(test).to.be.true;
    expect(king.position.x).to.equal(x);
    expect(king.position.y).to.equal(y);
}

function moveStraightFalseCheck(king, x, y, grid) {
    var origX = king.position.x,
        origY = king.position.y,
        test = king.moveStraight(x, y, grid);

    expect(test).to.be.false;
    expect(king.position.x).to.equal(origX);
    expect(king.position.y).to.equal(origY);
}

function moveStraightTrueCheck(king, x, y, grid) {
    var test = king.moveStraight(x, y, grid);

    expect(test).to.be.true;
    expect(king.position.x).to.equal(x);
    expect(king.position.y).to.equal(y);
}

function trueCastleCheck(king, rook, grid, x1, x2) {
    var x = king.castle(rook, grid);
    expect(x).to.be.true;
    expect(king.position.x).to.equal(x1);
    expect(rook.position.x).to.equal(x2)
}

function falseCastleCheck(king, rook, grid, x2) {
    var x = king.castle(rook, grid);
    expect(x).to.be.false;
    expect(king.position.x).to.equal(5);
    expect(rook.position.x).to.equal(x2);
}

function setGridFunc(king, grid, p1, p1Type, p1x, p1y, p2, p2Type, p2x, p2y) {
    var obj = {
        'white': {
            'king': [king]
        },
        'black': {}
    }

    grid.setStartPosOnGrid(5, 1, king);

    if (p1) {
        obj.white[p1Type] = [p1];
        grid.setStartPosOnGrid(p1x, p1y, p1);
    }
    if (p2) {
        obj.black[p2Type] = [p2];
        grid.setStartPosOnGrid(p2x, p2y, p2);
    }
    grid.setAllObjects(obj);

    return grid;
}


describe('King.js', function() {
    var grid,
        king,
        rookOne,
        rookTwo,
        rookThree,
        rookFour,
        rookFive,
        queenOne,
        queenTwo,
        bishopOne,
        knightOne,
        pawnOne;

    describe('Move straight', function() {

        beforeEach(function() {
            king = new King(5, 1, 'King', true);

            grid = initializeGrid();

            var obj = {
                'white': {
                    'king': [king]
                }
            }
            grid.setAllObjects(obj);
            grid.setStartPosOnGrid(5, 5, king);
        });

        it('King should have correct default values', function() {
            expect(king.type).to.equal('King');
            expect(king.white).to.be.true;
        });

        it('King.moveStraight should not move in anything but a straight line', function() {
            moveStraightFalseCheck(king, 6, 3, grid);
            moveStraightFalseCheck(king, 4, 2, grid);
            moveStraightTrueCheck(king, 5, 2, grid);
        });

        it('King.moveStraight should not move more than one space', function() {
            moveStraightFalseCheck(king, 1, 1, grid);
            moveStraightFalseCheck(king, 8, 1, grid);
            moveStraightFalseCheck(king, 5, 8, grid);
            moveStraightFalseCheck(king, 5, 3, grid);
        });

        it('King.moveStraight should move only one space horizontally', function() {
            moveStraightTrueCheck(king, 6, 1, grid);
        });

        it('King.moveStraight should move only one space vertically', function() {
            moveStraightTrueCheck(king, 5, 2, grid);
        });
    });

    describe('Move diagonal', function() {

        beforeEach(function() {
            king = new King(5, 5, 'King', true);

            grid = initializeGrid();

            var obj = {
                'white': {
                    'king': [king]
                }
            }
            grid.setAllObjects(obj);
            grid.setStartPosOnGrid(5, 5, king);
        });

        it('King.moveDiagonal should not move in anything but a diagonal line', function() {
            moveDiagonalFalseCheck(king, 6, 5, grid);
            moveDiagonalFalseCheck(king, 5, 4, grid);
            moveDiagonalFalseCheck(king, 7, 2, grid);
        });

        it('King.moveDiagonal should not move more than one space', function() {
            moveDiagonalFalseCheck(king, 7, 7, grid);
            moveDiagonalFalseCheck(king, 3, 3, grid);
            moveDiagonalFalseCheck(king, 7, 3, grid);
            moveDiagonalFalseCheck(king, 3, 7, grid);
        });

        it('King.moveDiagonal should move one space', function() {
            moveDiagonalTrueCheck(king, 6, 6, grid);
        });

        it('King.moveDiagonal should move one space', function() {
            moveDiagonalTrueCheck(king, 4, 4, grid);
        });

        it('King.moveDiagonal should move one space', function() {
            moveDiagonalTrueCheck(king, 4, 6, grid);
        });

        it('King.moveDiagonal should move one space', function() {
            moveDiagonalTrueCheck(king, 6, 4, grid);
        });
    });

    describe('Castle works properly', function() {
        beforeEach(function() {
            king = new King(5, 1, 'King', true);
            rookOne = new Rook(1, 1, 'Rook', true);
            rookTwo = new Rook(8, 1, 'Rook', true);

            grid = initializeGrid();

            var obj = {
                'white': {
                    'king': [king],
                    'rooks': [rookOne, rookTwo]
                }
            }
            grid.setAllObjects(obj);
            grid.setStartPosOnGrid(5, 5, king);
        });

        it('King.castle should move as it\'s supposed to - left', function() {
            var x = king.castle(rookOne, grid);
            expect(x).to.be.true;
        });

        it('King.castle should move as it\'s supposed to - right', function() {
            var x = king.castle(rookTwo, grid);
            expect(x).to.be.true;
        });
    });

    describe('Castle doesn\'t work if certain conditions aren\'t met', function() {
        beforeEach(function() {
            king = new King(5, 1, 'King', true);
            rookOne = new Rook(1, 1, 'Rook', true);
            rookTwo = new Rook(8, 1, 'Rook', true);
            rookThree = new Rook(1, 2, 'Rook', true);
            rookFour = new Rook(8, 2, 'Rook', true);
            rookFive = new Rook(8, 1, 'Rook', false);
            queenOne = new Queen(4, 8, 'Queen', false);
            queenTwo = new Queen(6, 8, 'Queen', false);
        });

        it('King.castle should move as it\'s supposed to - left', function() {

            grid = initializeGrid();

            var obj = {
                'white': {
                    'king': [king],
                    'rooks': [rookOne]
                }
            }
            grid.setAllObjects(obj);
            grid.setStartPosOnGrid(5, 1, king);
            grid.setStartPosOnGrid(1, 1, rookOne);

            trueCastleCheck(king, rookOne, grid, 3, 4);
        });

        it('King.castle should move as it\'s supposed to - right', function() {
            grid = initializeGrid();

            var obj = {
                'white': {
                    'king': [king],
                    'rooks': [rookTwo]
                }
            }
            grid.setAllObjects(obj);
            grid.setStartPosOnGrid(5, 1, king);
            grid.setStartPosOnGrid(8, 1, rookTwo);

            trueCastleCheck(king, rookTwo, grid, 7, 6);
        });

        it('King.castle - king should not move if it\'s touched', function() {
            grid = initializeGrid();

            var obj = {
                'white': {
                    'king': [king],
                    'rooks': [rookTwo]
                }
            }
            king.untouched = false;

            grid.setAllObjects(obj);
            grid.setStartPosOnGrid(5, 1, king);
            grid.setStartPosOnGrid(8, 1, rookTwo);

            falseCastleCheck(king, rookTwo, grid, 8);
        });

        it('King.castle - rook should not move if it\'s touched', function() {
            grid = initializeGrid();

            var obj = {
                'white': {
                    'king': [king],
                    'rooks': [rookTwo]
                }
            }
            rookTwo.untouched = false;

            grid.setAllObjects(obj);
            grid.setStartPosOnGrid(5, 1, king);
            grid.setStartPosOnGrid(8, 1, rookTwo);

            falseCastleCheck(king, rookTwo, grid, 8);
        });

        it('King.castle - king cannot castle unless same position on x-axis - left', function() {
            grid = initializeGrid();

            var obj = {
                'white': {
                    'king': [king],
                    'rooks': [rookThree]
                }
            }

            grid.setAllObjects(obj);
            grid.setStartPosOnGrid(5, 1, king);
            grid.setStartPosOnGrid(1, 2, rookThree);

            falseCastleCheck(king, rookThree, grid, 1);
        });

        it('King.castle - king cannot castle unless same position on x-axis - right', function() {
            grid = initializeGrid();

            var obj = {
                'white': {
                    'king': [king],
                    'rooks': [rookFour]
                }
            }

            grid.setAllObjects(obj);
            grid.setStartPosOnGrid(5, 1, king);
            grid.setStartPosOnGrid(8, 2, rookFour);

            falseCastleCheck(king, rookFour, grid, 8);
        });

        it('King.castle - king cannot castle with rook of different color', function() {
            grid = initializeGrid();

            var obj = {
                'white': {
                    'king': [king],
                    'rooks': [rookFive]
                }
            }

            grid.setAllObjects(obj);
            grid.setStartPosOnGrid(5, 1, king);
            grid.setStartPosOnGrid(8, 1, rookFive);

            falseCastleCheck(king, rookFive, grid, 8);
        });

        it('King.castle - king cannot castle if it passes through check - left', function() {
            grid = initializeGrid();

            var obj = {
                'white': {
                    'king': [king],
                    'rooks': [rookOne]
                },
                'black': {
                    'queens': [queenOne]
                }
            }

            grid.setAllObjects(obj);
            grid.setStartPosOnGrid(5, 1, king);
            grid.setStartPosOnGrid(1, 1, rookOne);
            grid.setStartPosOnGrid(4, 8, queenOne);

            falseCastleCheck(king, rookOne, grid, 1);
        });

        it('King.castle - king cannot castle if it passes through check - right', function() {
            grid = initializeGrid();

            var obj = {
                'white': {
                    'king': [king],
                    'rooks': [rookTwo]
                },
                'black': {
                    'queens': [queenTwo]
                }
            }

            grid.setAllObjects(obj);
            grid.setStartPosOnGrid(5, 1, king);
            grid.setStartPosOnGrid(8, 1, rookTwo);
            grid.setStartPosOnGrid(6, 8, queenTwo);

            falseCastleCheck(king, rookTwo, grid, 8);
        });
    });

    describe('checkIfInCheck should work properly', function() {
        beforeEach(function() {
            king = new King(5, 1, 'King', true);
            rookTwo = new Rook(8, 1, 'Rook', false);
            rookThree = new Rook(5, 3, 'Rook', false);
            rookFour = new Rook(3, 2, 'Rook', true);
            rookFive = new Rook(8, 1, 'Rook', false);
            queenTwo = new Queen(6, 8, 'Queen', false);

            grid = initializeGrid();
        });

        it('Rook of own color should not put in check', function() {
            rookOne = new Rook(1, 2, 'Rook', true);

            grid = setGridFunc(king, grid,
                rookOne, 'rooks', 1, 2,
                false, false, false, false);

            moveStraightTrueCheck(king, 5, 2, grid);
        });

        it('King cannot move into check - rook', function() {

            rookOne = new Rook(1, 2, 'Rook', false);

            grid = setGridFunc(king, grid,
                false, false, false, false,
                rookOne, 'rooks', 1, 2);

            moveStraightFalseCheck(king, 5, 1, grid);
        });

        it('King cannot move into check - queen', function() {
            queenOne = new Queen(1, 2, 'Queen', false);

            grid = setGridFunc(king, grid,
                false, false, false, false,
                queenOne, 'queens', 1, 2);

            moveStraightFalseCheck(king, 5, 1, grid);
        });

        it('King cannot move into check - bishop', function() {
            bishopOne = new Bishop(7, 4, 'Bishop', false);

            grid = setGridFunc(king, grid,
                false, false, false, false,
                bishopOne, 'bishops', 7, 4);

            moveStraightFalseCheck(king, 5, 1, grid);
        });

        it('King cannot move into check - knight', function() {
            knightOne = new Knight(3, 3, 'Knight', false);

            grid = setGridFunc(king, grid,
                false, false, false, false,
                knightOne, 'knights', 3, 3);

            moveStraightFalseCheck(king, 5, 1, grid);
        });

        it('King cannot move into check - pawn', function() {
            pawnOne = new Pawn(4, 3, 'Pawn', false);

            grid = setGridFunc(king, grid,
                false, false, false, false,
                pawnOne, 'pawns', 4, 3);

            moveStraightFalseCheck(king, 5, 1, grid);
        });
    });
});