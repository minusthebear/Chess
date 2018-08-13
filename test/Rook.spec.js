var expect = require('chai').expect,
    should = require('chai').should(),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    Grid = require('../Grid'),
    Rook = require('../Rook');

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

function moveStraightFalseCheck(rook, x, y, grid) {
    var origX = rook.position.x,
        origY = rook.position.y,
        test = rook.move(x, y, grid);

    expect(test).to.be.false;
    expect(rook.position.x).to.equal(origX);
    expect(rook.position.y).to.equal(origY);
}

function moveStraightTrueCheck(rook, x, y, grid) {
    var test = rook.move(x, y, grid);

    expect(test).to.be.true;
    expect(rook.position.x).to.equal(x);
    expect(rook.position.y).to.equal(y);
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


describe('Rook.js', function() {
    var grid,
        rook;

    beforeEach(function() {

        grid = initializeGrid();

        rook = new Rook(4, 5, 'Rook', true);
        var obj = {
            'white': {
                'rooks': [rook]
            }
        }
        grid.setAllObjects(obj);
        grid.setStartPosOnGrid(4, 5, rook);
    });

    it('Rook should have correct default values', function() {
        expect(rook.type).to.equal('Rook');
        expect(rook.white).to.be.true;
        expect(rook.untouched).to.be.true;
    });

    it('Rook.moveStraight should not move in anything but a straight line', function() {
        moveStraightFalseCheck(rook, 5, 6, grid);
        moveStraightFalseCheck(rook, 6, 6, grid);
        moveStraightFalseCheck(rook, 3, 4, grid);
        moveStraightFalseCheck(rook, 2, 4, grid);
    });

    it('Rook.moveStraight should move straight - north', function() {
        moveStraightTrueCheck(rook, 4, 1, grid);
    });

    it('Rook.moveStraight should move straight - south', function() {
        moveStraightTrueCheck(rook, 4, 8, grid);
    });

    it('Rook.moveStraight should move straight - east', function() {
        moveStraightTrueCheck(rook, 8, 5, grid);
    });

    it('Rook.moveStraight should move straight - west', function() {
        moveStraightTrueCheck(rook, 1, 5, grid);
    });

    it('Rook.setGrid should return false if it has incorrect values', function() {
        var a = rook.setGrid(grid, null, 4, 5, 5);
        var b = rook.setGrid(grid, 1, 4, null, 5);
        var c = rook.setGrid(grid, 8, null, 5, null);

        expect(a).to.be.false;
        expect(b).to.be.false;
        expect(c).to.be.false;
    });
});