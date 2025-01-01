'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = app => {
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;

      // Check for missing fields
      if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing' });
      }

      // Validate puzzle
      if (!/^[0-9.]+$/.test(puzzle)) {
        return res.json({ error: 'Invalid characters in puzzle' });
      }
      if (puzzle.length !== 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      }

      // Validate coordinate and value
      if (!/^[a-i][1-9]$/i.test(coordinate)) {
        return res.json({ error: 'Invalid coordinate' });
      }
      if (!/^[1-9]$/.test(value)) {
        return res.json({ error: 'Invalid value' });
      }

      const row = coordinate[0].toLowerCase();
      const col = coordinate[1];

      let isValid = true;
      const conflict = [];

      const rowIndex = row.charCodeAt(0) - 97; // Convert 'a-i' to 0-8
      const colIndex = parseInt(col, 10) - 1;  // Convert '1-9' to 0-8
      const cellIndex = rowIndex * 9 + colIndex;

      // Check if the value is already present
      if (puzzle[cellIndex] === value) {
        return res.json({ valid: true });
      }

      // Check row, column, and region validity
      if (!solver.checkRowPlacement(puzzle, row, value)) {
        isValid = false;
        conflict.push('row');
      }
      if (!solver.checkColPlacement(puzzle, col, value)) {
        isValid = false;
        conflict.push('column');
      }
      if (!solver.checkRegionPlacement(puzzle, row, col, value)) {
        isValid = false;
        conflict.push('region');
      }

      // Return the result
      res.json(isValid ? { valid: true } : { valid: false, conflict });
    });

  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;

      // Validate puzzle
      if (!puzzle) {
        return res.json({ error: 'Required field missing' });
      }
      if (!/^[0-9.]+$/.test(puzzle)) {
        return res.json({ error: 'Invalid characters in puzzle' });
      }
      if (puzzle.length !== 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      }

      const solution = solver.solve(puzzle);

      if (!solution) {
        return res.json({ error: 'Puzzle cannot be solved' });
      }

      res.json({ solution });
    });
};
