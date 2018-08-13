var expect = require('chai').expect,
    should = require('chai').should(),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    Grid = require('../Grid'),
    Pawn = require('../Pawn');

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

function moveDiagonalFalseCheck(pawn, x, y, grid) {
    var origX = pawn.position.x,
        origY = pawn.position.y,
        test = pawn.move(x, y, grid);

    expect(test).to.be.false;
    expect(pawn.position.x).to.equal(origX);
    expect(pawn.position.y).to.equal(origY);
}

function moveDiagonalTrueCheck(pawn, x, y, grid) {
    var test = pawn.move(x, y, grid);

    expect(test).to.be.true;
    expect(pawn.position.x).to.equal(x);
    expect(pawn.position.y).to.equal(y);
}

function moveStraightFalseCheck(pawn, x, y, grid) {
    var origX = pawn.position.x,
        origY = pawn.position.y,
        test = pawn.moveForward(x, y, grid);

    expect(test).to.be.false;
    expect(pawn.position.x).to.equal(origX);
    expect(pawn.position.y).to.equal(origY);
}

function moveStraightTrueCheck(pawn, x, y, grid) {
    var test = pawn.moveForward(x, y, grid);

    expect(test).to.be.true;
    expect(pawn.position.x).to.equal(x);
    expect(pawn.position.y).to.equal(y);
}

function setGridFunc(pawn, grid, p1, p1Type, p1x, p1y, p2, p2Type, p2x, p2y) {
    var obj = {
        'white': {
            'pawn': [pawn]
        },
        'black': {}
    }

    grid.setStartPosOnGrid(5, 1, pawn);

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


describe('pawn.js', function() {
    var grid,
        pawn;

    describe('pawn.move', function() {
        beforeEach(function() {

            grid = initializeGrid();

            pawn = new Pawn(5, 7, 'Pawn', true);
            var obj = {
                'white': {
                    'pawns': [pawn]
                }
            }
            grid.setAllObjects(obj);
            grid.setStartPosOnGrid(5, 7, pawn);
        });

        // it('Pawn.move should not move in anything but a straight line', function() {
        //     moveStraightFalseCheck(pawn, 6, 6, grid);
        //     moveStraightFalseCheck(pawn, 4, 5, grid);
        // });

        // it('Pawn.move can move two spaces on first move', function() {
        //     moveStraightTrueCheck(pawn, 5, 5, grid);
        // });

        // it('Pawn.move can move one spaces on first move', function() {
        //     moveStraightTrueCheck(pawn, 5, 6, grid);
        // });

        it('Pawn.move can move only one space after moving two spaces', function() {
            moveStraightTrueCheck(pawn, 5, 5, grid);
            moveStraightFalseCheck(pawn, 5, 3, grid);
            moveStraightTrueCheck(pawn, 5, 4, grid);
        });

        // it('Pawn.move should move one space', function() {
        //     moveStraightTrueCheck(pawn, 7, 7, grid);
        // });

        // it('Pawn.move should move one space', function() {
        //     moveStraightTrueCheck(pawn, 3, 3, grid);
        // });
    });
});