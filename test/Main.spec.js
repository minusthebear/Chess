var expect = require('chai').expect,
    should = require('chai').should(),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    main = require('../main');

chai.use(chaiAsPromised);
chai.should();

describe('Main.js', function() {
    describe('pieces should be set correctly', function() {

        it('Rooks should be set correctly', function() {
            testCorrectFunc(1, 1, 'Rook', false);
            testCorrectFunc(1, 8, 'Rook', true);
            testCorrectFunc(8, 1, 'Rook', false);
            testCorrectFunc(8, 8, 'Rook', true);
        });

        it('Knights should be set correctly', function() {
            testCorrectFunc(2, 1, 'Knight', false);
            testCorrectFunc(2, 8, 'Knight', true);
            testCorrectFunc(7, 1, 'Knight', false);
            testCorrectFunc(7, 8, 'Knight', true);
        });

        it('Bishops should be set correctly', function() {
            testCorrectFunc(3, 1, 'Bishop', false);
            testCorrectFunc(3, 8, 'Bishop', true);
            testCorrectFunc(6, 1, 'Bishop', false);
            testCorrectFunc(6, 8, 'Bishop', true);
        });

        it('Queens should be set correctly', function() {
            testCorrectFunc(4, 1, 'Queen', false);
            testCorrectFunc(4, 8, 'Queen', true);
        });

        it('Pawns should be set correctly', function() {
            for (var i = 1; i <= 8; i++) {
                testCorrectFunc(i, 2, 'Pawn', false);
                testCorrectFunc(i, 7, 'Pawn', true);
            }
        });

        it('Blank spaces should be null', function() {
            for (var i = 1; i <= 8; i++) {
                for (var j = 3; j <= 6; j++) {
                    testInorrectFunc(i, j);
                }
            }
        });
    });

    describe('allObjects property should be set', function() {
        it('Pawns should be set correctly', function() {
            testAllObjects('white', 'pawns', 'Pawn', 8);
            testAllObjects('black', 'pawns', 'Pawn', 8);
        });

        it('Bishops should be set correctly', function() {
            testAllObjects('white', 'bishops', 'Bishop', 2);
            testAllObjects('black', 'bishops', 'Bishop', 2);
        });

        it('Knights should be set correctly', function() {
            testAllObjects('white', 'knights', 'Knight', 2);
            testAllObjects('black', 'knights', 'Knight', 2);
        });

        it('Rooks should be set correctly', function() {
            testAllObjects('white', 'rooks', 'Rook', 2);
            testAllObjects('black', 'rooks', 'Rook', 2);
        });

        it('Queens should be set correctly', function() {
            testAllObjects('white', 'queens', 'Queen', 1);
            testAllObjects('black', 'queens', 'Queen', 1);
        });

        it('Kings should be set correctly', function() {
            testAllObjects('white', 'kings', 'King', 1);
            testAllObjects('black', 'kings', 'King', 1);
        });
    });

    function testAllObjects(color, piece, name, length) {
        expect(main.allObjects[color][piece].length).to.equal(length);
        expect(main.allObjects[color][piece][0].type).to.equal(name);
    }

    function testCorrectFunc(numOne, numTwo, piece, white) {
        expect(main.grid[numOne][numTwo]).to.be.an('object');
        expect(main.grid[numOne][numTwo].type).to.equal(piece);
        if (white) {
            expect(main.grid[numOne][numTwo].white).to.be.true;
        } else {
            expect(main.grid[numOne][numTwo].white).to.be.false;
        }
    }

    function testInorrectFunc(numOne, numTwo) {
        expect(main.grid[numOne][numTwo]).to.be.a('null');
    }
});