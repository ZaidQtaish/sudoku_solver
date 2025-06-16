import Board from "./components/Board.jsx";
import NumberPicker from "./components/NumberPicker.jsx";
import { useState } from "react";
import { strToBoard } from "./utils/helpers";
import { solveSudoku, checkSudoku } from "./utils/api.js";

function App() {
  const initialPuzzle = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
  const [board, setBoard] = useState(strToBoard(initialPuzzle));
  const [selectedCell, setSelectedCell] = useState(null);
  const [showTextarea, setShowTextarea] = useState(false);
  const [error, setError] = useState("");
  const [textareaValue, setTextareaValue] = useState(initialPuzzle);

  function handleCellClick(coords) {
    setSelectedCell(coords);
  }

  async function handleNumberClick(num) {
    const res = await checkSudoku(board, selectedCell, num);

    if (res.valid) {
      setError("");

      const rowI = "ABCDEFGHI".indexOf(selectedCell[0]);
      const colI = Number(selectedCell[1]) - 1;

      const newBoard = board.map((row, r) =>
        row.map((cell, c) => (r == rowI && c == colI ? num : cell))
      );
      setBoard(newBoard);
    } else if (res.conflict) {
      setError(`Conflict in ${res.conflict}`);
    }
  }

  async function handleSolve() {
    const res = await solveSudoku(board);
    if (res.error) {
      setError(res.error);
    } else {
      setBoard(strToBoard(res.solution));
    }

  }

  function handleTextareaChange(e) {
    const value = e.target.value;
    setTextareaValue(value);
    setBoard(strToBoard(value));
  }

  function handleReset() {
    setBoard(strToBoard(initialPuzzle));
    setTextareaValue(initialPuzzle);
    setError("");
    setSelectedCell(null);
  }

  return (
    <div className="container">
      <Board
        board={board}
        selectedCell={selectedCell}
        onCellClick={handleCellClick}
      />
      <div className="controls-container">
        <NumberPicker onNumberClick={handleNumberClick} />
        <div id="error-msg">
          <code>{error}</code>
        </div>
        <textarea
          rows="10"
          cols="85"
          id="text-input"
          name="puzzle"
          className={showTextarea ? "" : "hidden"}
          value={textareaValue}
          onChange={handleTextareaChange}
        ></textarea>
        <div className="buttons-container">
          <button id="solve-button" onClick={handleSolve}>
            Solve
          </button>
          <button
            id="btn-import"
            onClick={() => setShowTextarea((show) => !show)}
          >
            Import Puzzle
          </button>
          <button id="btn-reset" onClick={handleReset}>
            Reset Puzzle
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
