$(document).ready(() => {
  const $textArea = $("#text-input");
  const $coordInput = $("#coord");
  const $valInput = $("#val");
  const $errorMsg = $("#error");

  // Set the initial puzzle
  const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
  $textArea.val(randomPuzzle);
  fillpuzzle($textArea.val());

  // Update puzzle on input change
  $textArea.on("input", () => {
    fillpuzzle($textArea.val());
  });

  function fillpuzzle(data) {
    const len = data.length < 81 ? data.length : 81;
    for (let i = 0; i < len; i++) {
      const rowLetter = String.fromCharCode("A".charCodeAt(0) + Math.floor(i / 9));
      const col = (i % 9) + 1;
      if (!data[i] || data[i] === ".") {
        $("." + rowLetter + col).text(" ");
        continue;
      }
      $("." + rowLetter + col).text(data[i]);
    }
  }

  // Solve puzzle
  async function getSolved() {
    const stuff = { puzzle: $textArea.val() };
    const data = await fetch("/api/solve", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(stuff)
    });
    const parsed = await data.json();
    if (parsed.error) {
      $errorMsg.html(`<code>${JSON.stringify(parsed, null, 2)}</code>`);
      return;
    }
    fillpuzzle(parsed.solution);
  }

  // Check placement
  async function getChecked() {
    const stuff = {
      puzzle: $textArea.val(),
      coordinate: $coordInput.val(),
      value: $valInput.val()
    };
    const data = await fetch("/api/check", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(stuff)
    });
    const parsed = await data.json();
    $errorMsg.html(`<code>${JSON.stringify(parsed, null, 2)}</code>`);
  }

  // Event listeners
  $("#solve-button").on("click", getSolved);
  $("#check-button").on("click", getChecked);

  $("#btn-import").on("click", () => {
    $("#text-input").toggleClass("hidden");
  });

  $(".sudoku-input").on("click", function() {
    const cellValue = $(this).val(); // Get the value of the clicked input
    const cellId = $(this).attr("id"); // Get the ID of the clicked input, e.g., "A1", "B3", etc.

    // Update the coord and checker with the cell's info
    $("#coord").val(cellId); // Show the ID of the clicked cell (coord)
    $("#checker").val(cellValue); // Show the value of the clicked cell (value)
  });
});

const puzzles = [
  '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
];