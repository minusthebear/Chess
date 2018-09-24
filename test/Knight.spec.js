var expect = require('chai').expect,
    should = require('chai').should(),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    Grid = require('../Grid'),
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

function moveDiagonalFalseCheck(knight, x, y, grid) {
    var origX = knight.position.x,
        origY = knight.position.y,
        test = knight.move(x, y, grid);

    expect(test).to.be.false;
    expect(knight.position.x).to.equal(origX);
    expect(knight.position.y).to.equal(origY);
}

function moveDiagonalTrueCheck(knight, x, y, grid) {
    var test = knight.move(x, y, grid);

    expect(test).to.be.true;
    expect(knight.position.x).to.equal(x);
    expect(knight.position.y).to.equal(y);
}

function setGridFunc(knight, grid, p1, p1Type, p1x, p1y, p2, p2Type, p2x, p2y) {
    var obj = {
        'white': {
            'knight': [knight]
        },
        'black': {}
    }

    grid.setStartPosOnGrid(5, 1, knight);

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


describe('knight.js', function() {
    var grid,
        knight;

    describe('knight.move', function() {
        beforeEach(function() {

            grid = initializeGrid();

            knight = new Knight(5, 5, 'Knight', true);
            var obj = {
                'white': {
                    'knights': [knight]
                }
            }
            grid.setAllObjects(obj);
            grid.setStartPosOnGrid(5, 5, knight);
        });

        it('Knight.move should not make invalid moves', function() {
            moveDiagonalFalseCheck(knight, 7, 7, grid);
            moveDiagonalFalseCheck(knight, 3, 3, grid);
            moveDiagonalFalseCheck(knight, 7, 3, grid);
            moveDiagonalFalseCheck(knight, 3, 7, grid);
            moveDiagonalFalseCheck(knight, 5, 3, grid);
            moveDiagonalFalseCheck(knight, 5, 7, grid);
            moveDiagonalFalseCheck(knight, 7, 5, grid);
            moveDiagonalFalseCheck(knight, 3, 5, grid);
            moveDiagonalFalseCheck(knight, 4, 6, grid);
            moveDiagonalFalseCheck(knight, 4, 4, grid);
            moveDiagonalFalseCheck(knight, 6, 6, grid);
            moveDiagonalFalseCheck(knight, 6, 4, grid);
        });

        it('Knight.move should move, x - 6, y - 7', function() {
            moveDiagonalTrueCheck(knight, 6, 7, grid);
        });

        it('Knight.move should move, x - 7, y - 6', function() {
            moveDiagonalTrueCheck(knight, 7, 6, grid);
        });

        it('Knight.move should move, x - 7, y - 4', function() {
            moveDiagonalTrueCheck(knight, 7, 4, grid);
        });

        it('Knight.move should move, x - 4, y - 7', function() {
            moveDiagonalTrueCheck(knight, 4, 7, grid);
        });

        it('Knight.move should move, x - 3, y - 4', function() {
            moveDiagonalTrueCheck(knight, 3, 4, grid);
        });

        it('Knight.move should move, x - 4, y - 3', function() {
            moveDiagonalTrueCheck(knight, 4, 3, grid);
        });

        it('Knight.move should move, x - 6, y - 3', function() {
            moveDiagonalTrueCheck(knight, 6, 3, grid);
        });

        it('Knight.move should move, x - 3, y - 6', function() {
            moveDiagonalTrueCheck(knight, 3, 6, grid);
        });
    });

    describe('knight.move can not move out of boundary', function() {
        beforeEach(function() {

            grid = initializeGrid();

            knight = new Knight(2, 1, 'Knight', true);
            var obj = {
                'white': {
                    'knights': [knight]
                }
            }
            grid.setAllObjects(obj);
            grid.setStartPosOnGrid(2, 1, knight);
        });

        it('Knight.move should not make invalid moves', function() {
            moveDiagonalFalseCheck(knight, 1, 0, grid);
            moveDiagonalFalseCheck(knight, 0, 1, grid);
        });
    });
});