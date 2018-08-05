var expect = require('chai').expect,
    should = require('chai').should(),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    Grid = require('../Grid'),
    King = require('../King');

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
        rookTwo;

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
            var testOne = king.moveDiagonal(6, 5, grid);
            expect(testOne).to.be.false;
            expect(king.position.x).to.equal(5);
            expect(king.position.y).to.equal(5);

            var testTwo = king.moveDiagonal(5, 4, grid);
            expect(testTwo).to.be.false;
            expect(king.position.x).to.equal(5);
            expect(king.position.y).to.equal(5);

            var testThree = king.moveDiagonal(7, 2, grid);
            expect(testThree).to.be.false;
            expect(king.position.x).to.equal(5);
            expect(king.position.y).to.equal(5);

            var testFour = king.moveDiagonal(4, 4, grid);
            expect(testFour).to.be.true;
            expect(king.position.x).to.equal(4);
            expect(king.position.y).to.equal(4);
        });

        it('King.moveDiagonal should not move more than one space', function() {
            var testOne = king.moveDiagonal(7, 7, grid);
            expect(testOne).to.be.false;
            expect(king.position.x).to.equal(5);
            expect(king.position.y).to.equal(5);

            var testTwo = king.moveDiagonal(3, 3, grid);
            expect(testTwo).to.be.false;
            expect(king.position.x).to.equal(5);
            expect(king.position.y).to.equal(5);

            var testThree = king.moveDiagonal(7, 3, grid);
            expect(testThree).to.be.false;
            expect(king.position.x).to.equal(5);
            expect(king.position.y).to.equal(5);

            var testFour = king.moveDiagonal(3, 7, grid);
            expect(testFour).to.be.false;
            expect(king.position.x).to.equal(5);
            expect(king.position.y).to.equal(5);
        });

        it('King.moveDiagonal should move one space', function() {
            var testOne = king.moveDiagonal(6, 6, grid);
            expect(testOne).to.be.true;
            expect(king.position.x).to.equal(6);
            expect(king.position.y).to.equal(6);
        });

        it('King.moveDiagonal should move one space', function() {
            var testOne = king.moveDiagonal(4, 4, grid);
            expect(testOne).to.be.true;
            expect(king.position.x).to.equal(4);
            expect(king.position.y).to.equal(4);
        });

        it('King.moveDiagonal should move one space', function() {
            var testOne = king.moveDiagonal(4, 6, grid);
            expect(testOne).to.be.true;
            expect(king.position.x).to.equal(4);
            expect(king.position.y).to.equal(6);
        });

        it('King.moveDiagonal should move one space', function() {
            var testOne = king.moveDiagonal(6, 4, grid);
            expect(testOne).to.be.true;
            expect(king.position.x).to.equal(6);
            expect(king.position.y).to.equal(4);
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

        it('King.castle should move as it\'s supposed to', function() {
            king
        });
    });
});