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
        king;

    beforeEach(function() {
        king = new King(5, 1, 'King', true);

        grid = initializeGrid();

        var obj = {
            'white': {
                'king': [king]
            }
        }
        grid.setAllObjects(obj);
    });

    it('King should have correct default values', function() {
        expect(king.type).to.equal('King');
        expect(king.white).to.be.true;
    });

    describe('Move straight', function() {
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

            var testThree = king.moveStraight(5, 3, grid);
            expect(testThree).to.be.false;
            expect(king.position.x).to.equal(5);
            expect(king.position.y).to.equal(1);
        });

        it('King.moveStraight should not move more than one space horizontally', function() {
            var testThree = king.moveStraight(6, 1, grid);
            expect(testThree).to.be.true;
            expect(king.position.x).to.equal(6);
            expect(king.position.y).to.equal(1);
        });

        it('King.moveStraight should not move more than one space vertically', function() {
            var testThree = king.moveStraight(5, 2, grid);
            expect(testThree).to.be.true;
            expect(king.position.x).to.equal(5);
            expect(king.position.y).to.equal(2);
        });
    });
});