# 🧠 Algorithm Visualizer

An interactive web application built with **React** and **JavaScript** that visualizes sorting and pathfinding algorithms through real-time, step-by-step animations. Designed as a learning tool for students and developers to understand how algorithms work under the hood.

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript)
![CSS3](https://img.shields.io/badge/CSS3-Animations-1572B6?style=flat&logo=css3)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## 📸 Preview

> Sorting Visualizer — animated bar chart with color-coded comparison, swap, and sorted states.

> Pathfinding Visualizer — interactive 2D grid with wall drawing, playback controls, and animated traversal.

---

## ✨ Features

- 📊 **Sorting Algorithms** — Bubble Sort, Merge Sort, Quick Sort, Insertion Sort, Selection Sort
- 🗺️ **Pathfinding Algorithms** — Dijkstra's, A\*, BFS, DFS
- 🔀 **View Toggle** — switch between Sorting and Pathfinding from the top navigation
- ▶️ **Real-time Step-by-Step Animation** — watch every comparison, swap, and node visit
- ⏯️ **Pause / Resume** — stop the animation at any point and continue from where you left off
- 🎚️ **Speed Control** — adjust animation speed from very slow to very fast using a slider
- ✍️ **Custom Input** — enter your own array values for sorting visualization
- 🎲 **Random Array Generator** — generate random arrays with configurable length (default 20)
- 🧱 **Wall Drawing** — click and drag on the grid to place or remove walls
- 🔵🔴 **Draggable Start / End Nodes** — move source and destination points directly on the grid
- 🔄 **Reset Controls** — reset playback and clear walls in pathfinding
- 🏁 **Shortest Path Trace** — highlights the final optimal path after the algorithm completes
- 🖥️ **Desktop Layout** — fixed desktop layout (no responsive/mobile mode)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/31deepti/algorithm-visualizer.git

# Navigate into the project directory
cd algorithm-visualizer

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

---

## 🗂️ Project Structure

```
algorithm-visualizer/
├── index.html
├── src/
│   ├── algorithms/
│   │   ├── sorting/
│   │   │   ├── bubbleSort.js
│   │   │   ├── mergeSort.js
│   │   │   ├── quickSort.js
│   │   │   ├── insertionSort.js
│   │   │   └── selectionSort.js
│   │   └── pathfinding/
│   │       ├── dijkstra.js
│   │       ├── aStar.js
│   │       ├── bfs.js
│   │       └── dfs.js
│   ├── components/
│   │   ├── AlgorithmSelector.jsx
│   │   ├── ControlPanel.jsx
│   │   ├── InputPanel.jsx
│   │   ├── RandomizePanel.jsx
│   │   ├── SortingVisualizer.jsx
│   │   └── PathfindingVisualizer.jsx
│   ├── hooks/
│   │   └── useAnimationEngine.js
│   ├── utils/
│   │   └── gridHelpers.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

---

## 🧩 How It Works

### The Snapshot Pattern

The core idea behind the animations is **snapshot recording**. Algorithms are not animated while they run — instead, every algorithm runs instantly and records each meaningful step (comparison, swap, node visit) into an array of snapshots. The animation engine then plays those snapshots back one at a time using a timer.

This is what makes **pause**, **resume**, and **speed control** work seamlessly.

```
Algorithm runs → collects steps[] → Animation engine replays steps[] at chosen speed
```

### Sorting Visualizer

- The array is rendered as vertical bars where **height = value**
- Bar colors change based on state:
  - 🔵 Default
  - 🟡 Being compared
  - 🔴 Being swapped
  - 🟢 Finalized / sorted

### Pathfinding Visualizer

- The grid is a 2D array of node objects
- Each node tracks positional and wall state (`row`, `col`, `isWall`, `isStart`, `isEnd`)
- Algorithms record snapshots for `visited`, `frontier`, `current`, and final `path`
- Cell color states:
  - ⬜ Unvisited
  - 🟦 Visited
  - 🟨 Current frontier
  - 🟫 Wall
  - 🟩 Shortest path
  - 🔵 Start | 🔴 End

---

## 🎮 Usage Guide

### Sorting

1. Select a **sorting algorithm** from the dropdown
2. Optionally enter a **custom array** (comma-separated numbers, e.g. `5,3,8,1,9`)
3. Set **random length** and click **Randomize** to generate a new array
4. Click **Apply Input** to load manual values
5. Adjust the **speed slider** to your preference
6. Press **Play** to start the animation
7. Use **Pause / Resume** at any time
8. Press **Reset** to return to the first snapshot

### Pathfinding

1. Select a **pathfinding algorithm** from the dropdown
2. **Click and drag** on the grid to draw walls
3. **Drag the start node** (🔵) and **end node** (🔴) to reposition them
4. Press **Play** to visualize the algorithm
5. Watch the algorithm explore the grid, then trace the shortest path
6. Press **Reset** to replay from the first snapshot
7. Press **Clear Walls** to remove all walls and keep start/end nodes

---

## 🔬 Algorithms Reference

### Sorting

| Algorithm | Time Complexity (Best) | Time Complexity (Worst) | Space | Stable |
|---|---|---|---|---|
| Bubble Sort | O(n) | O(n²) | O(1) | ✅ |
| Selection Sort | O(n²) | O(n²) | O(1) | ❌ |
| Insertion Sort | O(n) | O(n²) | O(1) | ✅ |
| Merge Sort | O(n log n) | O(n log n) | O(n) | ✅ |
| Quick Sort | O(n log n) | O(n²) | O(log n) | ❌ |

### Pathfinding

| Algorithm | Weighted | Guarantees Shortest Path | Notes |
|---|---|---|---|
| BFS | ❌ | ✅ (unweighted) | Best for unweighted grids |
| DFS | ❌ | ❌ | Does not guarantee shortest path |
| Dijkstra's | ✅ | ✅ | Best for weighted grids |
| A\* | ✅ | ✅ | Fastest in practice using heuristic |

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@31deepti](https://github.com/31deepti)
- LinkedIn: [deepti0508](https://www.linkedin.com/in/deepti0508/)
- Portfolio: [deeptichoudhary.in](http://deeptichoudhary.in/)

---

## 🙏 Acknowledgements

- Inspired by [Clement Mihailescu's](https://github.com/clementmihailescu) pathfinding and sorting visualizer projects
- Algorithm complexity references from [Big-O Cheat Sheet](https://www.bigocheatsheet.com/)
- Animation technique inspired by common React visualization patterns

---

*If you found this project helpful, please consider giving it a ⭐ on GitHub!*