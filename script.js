let array = [];
const container = document.getElementById("array-container");

function generateArray(size = 30) {
  array = [];
  container.innerHTML = "";
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 300) + 20;
    array.push(value);
    const bar = document.createElement("div");
    bar.style.height = `${value}px`;
    bar.classList.add("bar");
    container.appendChild(bar);
  }
}

async function swap(el1, el2) {
  return new Promise(resolve => {
    setTimeout(() => {
      const temp = el1.style.height;
      el1.style.height = el2.style.height;
      el2.style.height = temp;
      resolve();
    }, 100);
  });
}

async function bubbleSort() {
  const bars = document.querySelectorAll(".bar");
  for (let i = 0; i < bars.length - 1; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      bars[j].style.backgroundColor = "#f59e0b";
      bars[j + 1].style.backgroundColor = "#f59e0b";
      if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
        await swap(bars[j], bars[j + 1]);
      }
      bars[j].style.backgroundColor = "#60a5fa";
      bars[j + 1].style.backgroundColor = "#60a5fa";
    }
  }
}

async function selectionSort() {
  const bars = document.querySelectorAll(".bar");
  for (let i = 0; i < bars.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < bars.length; j++) {
      bars[j].style.backgroundColor = "#f59e0b";
      if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
        minIndex = j;
      }
      await new Promise(resolve => setTimeout(resolve, 50));
      bars[j].style.backgroundColor = "#60a5fa";
    }
    if (minIndex !== i) {
      await swap(bars[i], bars[minIndex]);
    }
  }
}

async function insertionSort() {
  const bars = document.querySelectorAll(".bar");
  for (let i = 1; i < bars.length; i++) {
    let j = i;
    while (j > 0 && parseInt(bars[j - 1].style.height) > parseInt(bars[j].style.height)) {
      bars[j - 1].style.backgroundColor = "#f59e0b";
      bars[j].style.backgroundColor = "#f59e0b";
      await swap(bars[j], bars[j - 1]);
      bars[j - 1].style.backgroundColor = "#60a5fa";
      bars[j].style.backgroundColor = "#60a5fa";
      j--;
    }
  }
}

function startSort() {
  const algo = document.getElementById("algorithm").value;
  if (algo === "bubble") bubbleSort();
  else if (algo === "selection") selectionSort();
  else if (algo === "insertion") insertionSort();
}

// Initialize with default array
generateArray();
