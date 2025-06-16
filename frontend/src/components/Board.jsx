export default function Board({ board, selectedCell, onCellClick }) {
  const rows = "ABCDEFGHI".split("");
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const boardCells = board.map((row, rowI) => (
    <tr key={rows[rowI]}>
      {row.map((cell, colI) => {
        const cellId = `${rows[rowI]}${cols[colI]}`;
        const isSelected = selectedCell === cellId;
        const isHighlighted =
          selectedCell &&
          (selectedCell[0] === rows[rowI] || selectedCell[1] === String(cols[colI]));

        return (
          <td
            className={
              `${cellId} sudoku-input` +
              (isSelected ? " selected" : "") +
              (!isSelected && isHighlighted ? " highlight" : "")
            }
            id={cellId}
            title={cellId}
            key={cellId}
            onClick={() => onCellClick(cellId)}
          >
            {cell}
          </td>
        );
      })}
    </tr>
  ));

  return (
    <div id="sudoku-grid-container">
      <div>
        <table className="yAxisLegend">
          <tbody>
            {rows.map((r) => (
              <tr key={r}>
                <td>{r}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id="sudoku-grid">
        <table className="xAxisLegend">
          <tbody>
            <tr>
              {cols.map((c) => (
                <td key={c}>{c}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <table className="grid">
          <tbody>{boardCells}</tbody>
        </table>
      </div>
    </div>
  );
}
