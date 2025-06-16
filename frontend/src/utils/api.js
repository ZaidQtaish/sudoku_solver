import { boardToStr } from './helpers.js';

export async function solveSudoku(board) {
  const response = await fetch('/api/solve', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ puzzle: boardToStr(board) }),
  });
  console.log(boardToStr(board));
  return response.json();
}

export async function checkSudoku(board, coordinate, value) {
  const response = await fetch('/api/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ puzzle: boardToStr(board), coordinate, value }),
  });
  return response.json();
}