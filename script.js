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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

async function quickSort(start = 0, end = array.length - 1) {
    const bars = document.querySelectorAll(".bar");
    if (start < end) {
        let pivotIndex = await partition(bars, start, end);
        await quickSort(start, pivotIndex - 1);
        await quickSort(pivotIndex + 1, end);
    }
}

async function partition(bars, low, high) {
    let pivot = parseInt(bars[high].style.height);
    let i = low - 1;

    bars[high].style.backgroundColor = "red";

    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = "#f59e0b";
        await delay(100);

        if (parseInt(bars[j].style.height) < pivot) {
            i++;
            await swap(bars[i], bars[j]);
        }

        bars[j].style.backgroundColor = "#60a5fa";
    }

    await swap(bars[i + 1], bars[high]);
    bars[high].style.backgroundColor = "#60a5fa";

    return i + 1;
}

async function mergeSort(start = 0, end = array.length - 1) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    const bars = document.querySelectorAll(".bar");
    const left = [];
    const right = [];

    for (let i = start; i <= mid; i++) {
        left.push(parseInt(bars[i].style.height));
        bars[i].style.backgroundColor = "#f59e0b";
    }

    for (let i = mid + 1; i <= end; i++) {
        right.push(parseInt(bars[i].style.height));
        bars[i].style.backgroundColor = "#f59e0b";
    }

    await delay(200);

    let i = 0, j = 0, k = start;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            bars[k].style.height = `${left[i]}px`;
            i++;
        } else {
            bars[k].style.height = `${right[j]}px`;
            j++;
        }
        bars[k].style.backgroundColor = "#60a5fa";
        k++;
        await delay(100);
    }

    while (i < left.length) {
        bars[k].style.height = `${left[i]}px`;
        bars[k].style.backgroundColor = "#60a5fa";
        i++; k++;
        await delay(100);
    }

    while (j < right.length) {
        bars[k].style.height = `${right[j]}px`;
        bars[k].style.backgroundColor = "#60a5fa";
        j++; k++;
        await delay(100);
    }
}

function startSort() {
    const algo = document.getElementById("algorithm").value;
    if (algo === "bubble") bubbleSort();
    else if (algo === "selection") selectionSort();
    else if (algo === "insertion") insertionSort();
    else if (algo === "quick") quickSort();
    else if (algo === "merge") mergeSort();
}

// Initialize with default array
generateArray();
