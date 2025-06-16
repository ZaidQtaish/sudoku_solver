export function strToBoard(str) {
  const arr = str.split("").map((c) => (c === "." ? "" : c));
  while (arr.length < 81) arr.push("");
  return Array.from({ length: 9 }, (_, i) => arr.slice(i * 9, i * 9 + 9));
};

export function boardToStr(board) {
  // Ensure every row has 9 cells
  const normalized = board.map(row => {
    const copy = row.slice();
    while (copy.length < 9) copy.push("");
    return copy;
  });
  // Ensure there are 9 rows
  while (normalized.length < 9) normalized.push(Array(9).fill(""));
  return normalized.flat().map(cell => (cell === "" ? "." : cell)).join("");
}