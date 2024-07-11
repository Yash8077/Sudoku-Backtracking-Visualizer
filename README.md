

# Sudoku Solver Visualizer
![image](https://github.com/Yash8077/Sudoku-Backtracking-Visualizer/assets/39164064/ee80b1ac-e0bc-48f8-9669-eeedbe7a1007)

Welcome to the Sudoku Solver Visualizer! This project is a web-based application that allows you to visualize the process of solving Sudoku puzzles using different algorithms. It includes features like random puzzle generation, various solving speeds, and visual effects to celebrate a solved puzzle.

## Features

- **Random Puzzle Generation**: Generate a new Sudoku puzzle with a single click.
- **Speed Control**: Choose from different solving speeds (Fast, Medium, Slow, Extra Slow).
- **Algorithm Selection**: Select different algorithms to solve the Sudoku (currently supports Backtracking).
- **Visual Effects**: Enjoy visual effects like fireworks upon successfully solving a puzzle.
- **Interactive Board**: Click on cells to input your own Sudoku puzzle.

## Getting Started

### Prerequisites

- Web browser (Google Chrome, Firefox, Safari, etc.)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sudoku-solver-visualizer.git
   ```

2. Navigate to the project directory:
   ```bash
   cd sudoku-solver-visualizer
   ```

3. Open `index.html` in your web browser to start using the application.

## Usage

1. **Clear Board**: Click the "Clear" button to clear the Sudoku board.
2. **Randomly Fill**: Click the "Randomly Fill" button to generate a new random Sudoku puzzle.
3. **Solve**: Click the "Solve" button to start solving the puzzle using the selected algorithm and speed.
4. **Select Speed**: Choose the speed of the solving animation from the dropdown menu (Fast, Medium, Slow, Extra Slow).
5. **Select Algorithm**: Choose the algorithm for solving the puzzle from the dropdown menu (currently supports Backtracking).
6. **Enjoy the Visual Effects**: Upon solving the puzzle, enjoy the fireworks effect celebrating your success.

## Code Overview

### HTML Elements

- `subMenu`: Refers to the submenu element inside the navigation bar.
- `speedButton`: Refers to the button for selecting speed inside the navigation bar.
- `speedDropDown`: Holds the current selected speed.
- `speedOptions`: List of all available speed options.
- `fireworks`: Configures the fireworks effect for celebrating the solved puzzle.
- `algorithmsDropDown`: Holds the current selected algorithm.
- `algorithmsOptions`: List of all available algorithm options.

### Speed Constants

Defines the different speeds for the solving animation:
- `FAST_SPEED`: 0.4 seconds
- `MEDIUM_SPEED`: 10 seconds
- `SLOW_SPEED`: 50 seconds
- `EXTRA_SLOW_SPEED`: 150 seconds

### Event Listeners

- `clear.addEventListener('click', clickedClear)`: Clears the board.
- `randomlyFill.addEventListener('click', clickedRandomlyFill)`: Fills the board with a random puzzle.
- `solve.addEventListener('click', clickedSolve)`: Starts solving the puzzle.

### Main Functions

- `clickedClear(e)`: Clears the board and resets the state.
- `clickedRandomlyFill(e)`: Clears the board and fills it with a random puzzle.
- `clickedSolve(e)`: Starts the solving process.
- `solveByBacktracking(algo)`: Solves the puzzle using the Backtracking algorithm.
- `backtracking(matrix, algo)`: Initializes and runs the backtracking algorithm.
- `backtrackingHelper(matrix, isFixed, i, j, data, algo)`: Recursively solves the puzzle using backtracking.

### Utility Functions

- `getFixedEntries(matrix)`: Returns an array indicating which entries are fixed.
- `canBeCorrect(matrix, i, j)`: Checks if the current state of the board is valid.
- `allBoardNonZero(matrix)`: Checks if all cells in the board are filled.
- `readValue()`: Reads the current values from the Sudoku board.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [fireworks.js](https://github.com/crashmax-dev/fireworks-js): Library used for the fireworks effect.

---

Enjoy solving and visualizing Sudoku puzzles!
```
