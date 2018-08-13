var expect = require('chai').expect,
    should = require('chai').should(),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    Grid = require('../Grid'),
    Bishop = require('../Bishop');

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

function moveDiagonalFalseCheck(bishop, x, y, grid) {
    var origX = bishop.position.x,
        origY = bishop.position.y,
        test = bishop.move(x, y, grid);

    expect(test).to.be.false;
    expect(bishop.position.x).to.equal(origX);
    expect(bishop.position.y).to.equal(origY);
}

function moveDiagonalTrueCheck(bishop, x, y, grid) {
    var test = bishop.move(x, y, grid);

    expect(test).to.be.true;
    expect(bishop.position.x).to.equal(x);
    expect(bishop.position.y).to.equal(y);
}

function setGridFunc(bishop, grid, p1, p1Type, p1x, p1y, p2, p2Type, p2x, p2y) {
    var obj = {
        'white': {
            'bishop': [bishop]
        },
        'black': {}
    }

    grid.setStartPosOnGrid(5, 1, bishop);

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


describe('bishop.js', function() {
    var grid,
        bishop;

    describe('bishop.move', function() {
        beforeEach(function() {

            grid = initializeGrid();

            bishop = new Bishop(5, 5, 'Bishop', true);
            var obj = {
                'white': {
                    'bishops': [bishop]
                }
            }
            grid.setAllObjects(obj);
            grid.setStartPosOnGrid(5, 5, bishop);
        });

        it('Bishop.move should not move in anything but a diagonal line', function() {
            moveDiagonalFalseCheck(bishop, 8, 5, grid);
            moveDiagonalFalseCheck(bishop, 5, 8, grid);
            moveDiagonalFalseCheck(bishop, 4, 3, grid);
        });

        it('Bishop.move should move one space', function() {
            moveDiagonalTrueCheck(bishop, 7, 3, grid);
        });

        it('Bishop.move should move one space', function() {
            moveDiagonalTrueCheck(bishop, 3, 7, grid);
        });

        it('Bishop.move should move one space', function() {
            moveDiagonalTrueCheck(bishop, 7, 7, grid);
        });

        it('Bishop.move should move one space', function() {
            moveDiagonalTrueCheck(bishop, 3, 3, grid);
        });
    });
});