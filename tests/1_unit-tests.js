const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {
    suite('User input tests', () => {
        test('Logic handles a valid puzzle string of 81 characters', () => {
            const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            assert.isTrue(solver.validate(puzzleString));
        });

        test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
            const puzzleString = 'invalid puzzleString string';
            assert.isFalse(solver.validate(puzzleString));
        });

        test('Logic handles a puzzle string that is not 81 characters in length', () => {
            const puzzleString = '1.5..2.84..63.12.7.2..5.....9';
            assert.isFalse(solver.validate(puzzleString));
        });
    });
    suite('Check placement tests', () => {
        test('Logic handles a valid row placement', () => {
            const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            assert.isTrue(solver.checkRowPlacement(puzzleString, 'a', '3'));
        });

        test('Logic handles an invalid row placement', () => {
            const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            assert.isFalse(solver.checkRowPlacement(puzzleString, 'a', '1'));
        });

        test('Logic handles a valid column placement', () => {
            const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            assert.isTrue(solver.checkColPlacement(puzzleString, '1', '5'));
        });

        test('Logic handles an invalid column placement', () => {
            const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            assert.isFalse(solver.checkColPlacement(puzzleString, '1', '2'));
        });

        test('Logic handles a valid region (3x3 grid) placement', () => {
            const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            assert.isTrue(solver.checkRegionPlacement(puzzleString, 'b', '2', '3'));
        });

        test('Logic handles an invalid region (3x3 grid) placement', () => {
            const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            assert.isFalse(solver.checkRegionPlacement(puzzleString, 'b', '2', '2'));
        });
    });

    suite('Solver tests', () => {
        test('Valid puzzle strings pass the solver', () => {
            const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            const solvedPuzzle = solver.solve(puzzleString);
            assert.isString(solvedPuzzle);
            assert.equal(solvedPuzzle.length, 81);
            assert.notEqual(solvedPuzzle, puzzleString);
        });

        test('Invalid puzzle strings fail the solver', () => {
            const puzzleString = '1.5..2.84..63.12.7.2..5.....9';
            assert.equal(solver.solve(puzzleString), 'invalid puzzle');
        });

        test('Solver returns the expected solution for an incomplete puzzle', () => {
            const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            const solvedPuzzle = solver.solve(puzzleString);
            assert.equal(solvedPuzzle, '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
        });
    });
});
