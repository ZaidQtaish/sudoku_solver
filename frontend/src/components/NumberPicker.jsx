export default function NumberPicker({ onNumberClick }) {
  return (
    <div id="number-picker">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          type="button"
          className="num-btn"
          data-num={num}
          onClick={() => onNumberClick(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
