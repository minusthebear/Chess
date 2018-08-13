var expect = require('chai').expect,
    should = require('chai').should(),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    Grid = require('../Grid'),
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

function moveStraightFalseCheck(queen, x, y, grid) {
    var origX = queen.position.x,
        origY = queen.position.y,
        test = queen.moveStraight(x, y, grid);

    expect(test).to.be.false;
    expect(queen.position.x).to.equal(origX);
    expect(queen.position.y).to.equal(origY);
}

function moveStraightTrueCheck(queen, x, y, grid) {
    var test = queen.moveStraight(x, y, grid);

    expect(test).to.be.true;
    expect(queen.position.x).to.equal(x);
    expect(queen.position.y).to.equal(y);
}

function moveDiagonalFalseCheck(queen, x, y, grid) {
    var origX = queen.position.x,
        origY = queen.position.y,
        test = queen.moveDiagonal(x, y, grid);

    expect(test).to.be.false;
    expect(queen.position.x).to.equal(origX);
    expect(queen.position.y).to.equal(origY);
}

function moveDiagonalTrueCheck(queen, x, y, grid) {
    var test = queen.moveDiagonal(x, y, grid);

    expect(test).to.be.true;
    expect(queen.position.x).to.equal(x);
    expect(queen.position.y).to.equal(y);
}

function setGridFunc(queen, grid, p1, p1Type, p1x, p1y, p2, p2Type, p2x, p2y) {
    var obj = {
        'white': {
            'queen': [queen]
        },
        'black': {}
    }

    grid.setStartPosOnGrid(5, 1, queen);

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


describe('queen.js', function() {
    var grid,
        queen;

    describe('queen.moveStraight', function() {
        beforeEach(function() {

            grid = initializeGrid();

            queen = new Queen(4, 5, 'Queen', true);
            var obj = {
                'white': {
                    'queens': [queen]
                }
            }
            grid.setAllObjects(obj);
            grid.setStartPosOnGrid(4, 5, queen);
        });

        it('queen should have correct default values', function() {
            expect(queen.type).to.equal('Queen');
            expect(queen.white).to.be.true;
            expect(queen.untouched).to.be.true;
        });

        it('Queen.moveStraight should not moveStraight in anything but a straight line', function() {
            moveStraightFalseCheck(queen, 5, 6, grid);
            moveStraightFalseCheck(queen, 6, 6, grid);
            moveStraightFalseCheck(queen, 3, 4, grid);
            moveStraightFalseCheck(queen, 2, 4, grid);
        });

        it('Queen.moveStraight should moveStraight straight - north', function() {
            moveStraightTrueCheck(queen, 4, 1, grid);
        });

        it('Queen.moveStraight should moveStraight straight - south', function() {
            moveStraightTrueCheck(queen, 4, 8, grid);
        });

        it('Queen.moveStraight should moveStraight straight - east', function() {
            moveStraightTrueCheck(queen, 8, 5, grid);
        });

        it('Queen.moveStraight should moveStraight straight - west', function() {
            moveStraightTrueCheck(queen, 1, 5, grid);
        });

        it('Queen.setGridStraight should return false if it has incorrect values', function() {
            var a = queen.setGridStraight(grid, null, 4, 5, 5);
            var b = queen.setGridStraight(grid, 1, 4, null, 5);
            var c = queen.setGridStraight(grid, 8, null, 5, null);

            expect(a).to.be.false;
            expect(b).to.be.false;
            expect(c).to.be.false;
        });

    });


    describe('queen.moveDiagonal', function() {
        beforeEach(function() {

            grid = initializeGrid();

            queen = new Queen(5, 5, 'Queen', true);
            var obj = {
                'white': {
                    'queens': [queen]
                }
            }
            grid.setAllObjects(obj);
            grid.setStartPosOnGrid(5, 5, queen);
        });

        it('Queen.moveDiagonal should not move in anything but a diagonal line', function() {
            moveDiagonalFalseCheck(queen, 8, 5, grid);
            moveDiagonalFalseCheck(queen, 5, 8, grid);
            moveDiagonalFalseCheck(queen, 4, 3, grid);
        });

        it('Queen.moveDiagonal should move one space', function() {
            moveDiagonalTrueCheck(queen, 7, 3, grid);
        });

        it('Queen.moveDiagonal should move one space', function() {
            moveDiagonalTrueCheck(queen, 3, 7, grid);
        });

        it('Queen.moveDiagonal should move one space', function() {
            moveDiagonalTrueCheck(queen, 7, 7, grid);
        });

        it('Queen.moveDiagonal should move one space', function() {
            moveDiagonalTrueCheck(queen, 3, 3, grid);
        });
    });
});