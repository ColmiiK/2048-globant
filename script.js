let score = 0;
let grid = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

document.addEventListener("keydown", handleKeyPress);
function handleKeyPress(event) {
  let moved = false;
  if (event.key === "ArrowUp") moved = moveUp(grid);
  else if (event.key === "ArrowDown") moved = moveDown(grid);
  else if (event.key === "ArrowLeft") moved = moveLeft(grid);
  else if (event.key === "ArrowRight") moved = moveRight(grid);
  if (moved) {
    addValue(grid);
    updateGrid(grid);
    updateScore();
  }
}

function updateScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = score;
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, index) => val === b[index]);
}

function slideMerge(row) {
  let newRow = row.filter((val) => val !== 0);
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      score += newRow[i];
      newRow[i + 1] = 0;
    }
  }
  newRow = newRow.filter((val) => val !== 0);
  while (newRow.length < row.length) {
    newRow.push(0);
  }
  return newRow;
}

function moveUp(grid) {
  let moved = false;
  for (let col = 0; col < grid[0].length; col++) {
    let column = grid.map((row) => row[col]);
    let newColumn = slideMerge(column);
    if (!arraysEqual(column, newColumn)) {
      for (let row = 0; row < grid.length; row++) {
        grid[row][col] = newColumn[row];
      }
      moved = true;
    }
  }
  return moved;
}
function moveDown(grid) {
  let moved = false;
  for (let col = 0; col < grid[0].length; col++) {
    let column = grid.map((row) => row[col]);
    let reversedColumn = [...column].reverse();
    let newColumn = slideMerge(reversedColumn).reverse();
    if (!arraysEqual(column, newColumn)) {
      for (let row = 0; row < grid.length; row++) {
        grid[row][col] = newColumn[row];
      }
      moved = true;
    }
  }
  return moved;
}
function moveLeft(grid) {
  let moved = false;
  for (let row = 0; row < grid.length; row++) {
    let newRow = slideMerge(grid[row]);
    if (!arraysEqual(grid[row], newRow)) {
      grid[row] = newRow;
      moved = true;
    }
  }
  return moved;
}
function moveRight(grid) {
  let moved = false;
  for (let row = 0; row < grid.length; row++) {
    let reversedRow = [...grid[row]].reverse();
    let newRow = slideMerge(reversedRow).reverse();
    if (!arraysEqual(grid[row], newRow)) {
      grid[row] = newRow;
      moved = true;
    }
  }
  return moved;
}

function addValue(grid) {
  let emptyCells = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }
  if (emptyCells.length === 0) {
    window.alert("Game over!");
    return;
  }
  let randomIndex = Math.floor(Math.random() * emptyCells.length);
  let { row, col } = emptyCells[randomIndex];
  grid[row][col] = Math.random() < 0.9 ? 2 : 4;
  const cell = document.querySelector(
    `.grid-row:nth-child(${row + 1}) .grid-cell:nth-child(${col + 1})`,
  );
  cell.textContent = grid[row][col];
  cell.classList.add(`cell-${grid[row][col]}`, "new");

  // Remove the "new" class after animation finishes
  setTimeout(() => {
    cell.classList.remove("new");
  }, 200);
}

function drawGrid(gridSize) {
  const container = document.querySelector(".grid-container");
  for (let i = 0; i < gridSize; i++) {
    const gridRow = document.createElement("div");
    gridRow.className = "grid-row";
    for (let j = 0; j < gridSize; j++) {
      const gridCell = document.createElement("div");
      gridCell.className = "grid-cell";
      gridCell.setAttribute("data-col", j);
      gridCell.setAttribute("data-row", i);
      gridRow.appendChild(gridCell);
    }
    container.appendChild(gridRow);
  }
}
function updateGrid(grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = document.querySelector(
        `.grid-cell[data-row="${row}"][data-col="${col}"]`,
      );
      if (grid[row][col] === 0) {
        cell.textContent = "";
      } else {
        cell.textContent = grid[row][col];
      }
      cell.className = `grid-cell cell-${grid[row][col]}`;
    }
  }
}

drawGrid(4);
addValue(grid);
addValue(grid);
updateGrid(grid);
console.log(score);
