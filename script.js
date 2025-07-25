let array = [];
let delay = 250;

function generateArray() {
  const size = document.getElementById("size").value;
  array = Array.from({ length: size }, () => Math.floor(Math.random() * 350 + 10));
  drawBars();
}

function drawBars(highlighted = -1) {
  const container = document.getElementById("bar-container");
  container.innerHTML = "";
  array.forEach((value, i) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;
    bar.style.width = `${100 / array.length}%`;
    if (i === highlighted) {
      bar.style.backgroundColor = "#e74c3c";
    }
    container.appendChild(bar);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Sorting Algorithms
async function bubbleSort() {
  let n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      drawBars(j);
      await sleep(delay);
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        drawBars(j);
      }
    }
  }
  drawBars();
}

async function selectionSort() {
  let n = array.length;
  for (let i = 0; i < n; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      drawBars(j);
      await sleep(delay);
      if (array[j] < array[min]) {
        min = j;
      }
    }
    if (min !== i) {
      [array[i], array[min]] = [array[min], array[i]];
    }
  }
  drawBars();
}

async function insertionSort() {
  let n = array.length;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      drawBars(j);
      await sleep(delay);
      j--;
    }
    array[j + 1] = key;
  }
  drawBars();
}

async function startSort() {
  const algo = document.getElementById("algorithm").value;
  switch (algo) {
    case "bubble":
      await bubbleSort();
      break;
    case "selection":
      await selectionSort();
      break;
    case "insertion":
      await insertionSort();
      break;
    default:
      alert("Invalid algorithm");
  }
}
