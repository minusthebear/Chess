var expect = require('chai').expect,
    should = require('chai').should(),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    Grid = require('../Grid'),
    King = require('../King'),
    Rook = require('../Rook'),
    Queen = require('../Queen');

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

describe('King.js', function() {
    var grid,
        king,
        rookOne,
        rookTwo,
        rookThree,
        rookFour,
        rookFive,
        queenOne,
        queenTwo;

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
            var testOne = king.moveStraight(6, 3, grid);
            expect(testOne).to.be.false;
            expect(king.position.x).to.equal(5);
            expect(king.position.y).to.equal(1);

            var testTwo = king.moveStraight(4, 2, grid);
            expect(testTwo).to.be.false;
            expect(king.position.x).to.equal(5);
            expect(king.position.y).to.equal(1);

            var testThree = king.moveStraight(5, 2, grid);
            expect(testThree).to.be.true;
            expect(king.position.x).to.equal(5);
            expect(king.position.y).to.equal(2);
        });

        it('King.moveStraight should not move more than one space', function() {
            var testOne = king.moveStraight(1, 1, grid);
            expect(testOne).to.be.false;
            expect(king.position.x).to.equal(5);
            expect(king.position.y).to.equal(1);

            var testTwo = king.moveStraight(8, 1, grid);
            expect(testTwo).to.be.false;
            expect(king.position.x).to.equal(5);
            expect(king.position.y).to.equal(1);

            var testThree = king.moveStraight(5, 8, grid);
            expect(testThree).to.be.false;
            expect(king.position.x).to.equal(5);
            expect(king.position.y).to.equal(1);

            var testFour = king.moveStraight(5, 3, grid);
            expect(testFour).to.be.false;
            expect(king.position.x).to.equal(5);
            expect(king.position.y).to.equal(1);
        });

        it('King.moveStraight should move only one space horizontally', function() {
            var testThree = king.moveStraight(6, 1, grid);
            expect(testThree).to.be.true;
            expect(king.position.x).to.equal(6);
            expect(king.position.y).to.equal(1);
        });

        it('King.moveStraight should move only one space vertically', function() {
            var testThree = king.moveStraight(5, 2, grid);
            expect(testThree).to.be.true;
            expect(king.position.x).to.equal(5);
            expect(king.position.y).to.equal(2);
        });
    });

    describe('Move diagonal', function() {

        function falseCheck(king, x, y, grid) {
            var origX = 5,
                origY = 5,
                test = king.moveDiagonal(x, y, grid);

            expect(test).to.be.false;
            expect(king.position.x).to.equal(origX);
            expect(king.position.y).to.equal(origY);
        }

        function trueCheck(king, x, y, grid) {
            var test = king.moveDiagonal(x, y, grid);

            expect(test).to.be.true;
            expect(king.position.x).to.equal(x);
            expect(king.position.y).to.equal(y);
        }

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
            falseCheck(king, 6, 5, grid);
            falseCheck(king, 5, 4, grid);
            falseCheck(king, 7, 2, grid);
        });

        it('King.moveDiagonal should not move more than one space', function() {
            falseCheck(king, 7, 7, grid);
            falseCheck(king, 3, 3, grid);
            falseCheck(king, 7, 3, grid);
            falseCheck(king, 3, 7, grid);
        });

        it('King.moveDiagonal should move one space', function() {
            trueCheck(king, 6, 6, grid);
        });

        it('King.moveDiagonal should move one space', function() {
            trueCheck(king, 4, 4, grid);
        });

        it('King.moveDiagonal should move one space', function() {
            trueCheck(king, 4, 6, grid);
        });

        it('King.moveDiagonal should move one space', function() {
            trueCheck(king, 6, 4, grid);
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

            var x = king.castle(rookOne, grid);
            expect(x).to.be.true;
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

            var x = king.castle(rookTwo, grid);
            expect(x).to.be.true;
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

            var x = king.castle(rookTwo, grid);
            expect(x).to.be.false;
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

            var x = king.castle(rookTwo, grid);
            expect(x).to.be.false;
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

            var x = king.castle(rookThree, grid);
            expect(x).to.be.false;
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

            var x = king.castle(rookFour, grid);
            expect(x).to.be.false;
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

            var x = king.castle(rookFive, grid);
            expect(x).to.be.false;
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

            var x = king.castle(rookOne, grid);
            expect(x).to.be.false;
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

            var x = king.castle(rookTwo, grid);
            expect(x).to.be.false;
        });
    });
});