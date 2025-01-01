class SudokuSolver {

  // Validate the puzzle string: must be 81 characters long and only contain digits or dots
  validate(puzzleString) {
    return puzzleString.length == 81 && /^[0-9.]+$/.test(puzzleString);
  }

  // Helper function to convert row letter ('A' to 'I') to a numerical index (0 to 8)
  rowToIndex(row) {
    return row.toLowerCase().charCodeAt(0) - 97; // Convert 'a' to 0, 'b' to 1, etc.
  }

  // Check if placing the number in the specified row is valid
  checkRowPlacement(puzzleString, row, value) {
    const rowIndex = this.rowToIndex(row); // Convert row letter to index
    const start = rowIndex * 9; // Calculate the starting index of the row
    const rowValues = puzzleString.slice(start, start + 9); // Get all values in the row
    return !rowValues.includes(value); // Return true if value is not in the row
  }

  // Check if placing the number in the specified column is valid
  checkColPlacement(puzzleString, column, value) {
    // Adjust column to start from 0 index, as column is 1-based
    const adjustedColumn = column - 1;

    // Loop through each row in the given column
    for (let row = 0; row < 9; row++) {
      // Calculate the index for the current position in the column
      const index = row * 9 + adjustedColumn;

      // Check if the current value is already in that column
      if (puzzleString[index] == value)
        return false; // Invalid if the value already exists
    }
    return true; // Valid if the value is not found
  }

  // Check if placing the number in the 3x3 region is valid
  checkRegionPlacement(puzzleString, row, column, value) {
    const rowIndex = this.rowToIndex(row); // Convert row letter to index

    // Find the top-left corner of the 3x3 region
    const regionStartRow = Math.floor(rowIndex / 3) * 3;
    const regionStartCol = Math.floor((column - 1) / 3) * 3; // Adjust column for 1-based index

    // Loop through each cell in the region
    for (let r = regionStartRow; r < regionStartRow + 3; r++) {
      for (let c = regionStartCol; c < regionStartCol + 3; c++) {
        // Calculate the index in the puzzle string
        const index = r * 9 + c;

        // Check if the value is already in the region
        if (puzzleString[index] == value)
          return false; // Invalid if the value exists
      }
    }
    return true; // Valid if the value is not found
  }

  // Solve the Sudoku puzzle using backtracking
  solve(puzzleString) {
    if (!this.validate(puzzleString)) return 'invalid puzzle';

    const solveRecursively = board => {
      // Find the next empty cell (marked with ".")
      const emptyIndex = board.indexOf(".");

      // If there are no empty cells, the puzzle is solved
      if (emptyIndex == -1)
        return board.join("");

      // Calculate row and column based on index
      const row = Math.floor(emptyIndex / 9);
      const col = emptyIndex % 9;

      // Try numbers 1-9 in the empty cell
      for (let num = 1; num <= 9; num++) {
        const value = num.toString();

        // Check if the number can be placed in the current row, column, and region
        if (
          this.checkRowPlacement(board.join(""), String.fromCharCode(97 + row), value) &&
          this.checkColPlacement(board.join(""), col + 1, value) && // Column adjusted to 1-based
          this.checkRegionPlacement(board.join(""), String.fromCharCode(97 + row), col + 1, value) // Column adjusted to 1-based
        ) {
          board[emptyIndex] = value; // Place the value in the board

          // Recursively try to solve the rest of the puzzle
          if (solveRecursively(board))
            return board.join("");

          // Backtrack if no solution is found
          board[emptyIndex] = ".";
        }
      }
      return false; // Return false if no solution exists
    };

    // Convert puzzle string to an array for mutability
    const board = puzzleString.split("");

    // Start solving the puzzle and return the result or false if unsolvable
    return solveRecursively(board) || false;
  }
}

module.exports = SudokuSolver;
