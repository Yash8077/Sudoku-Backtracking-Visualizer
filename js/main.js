// Get some element from html
const subMenu = document.querySelector("#nav-bar .sub-menu");         
const speedButton = document.querySelector("#nav-bar .selected");
const SpeedMenu = document.querySelector("#nav-bar li span.selected").closest('li');
const AlgoMenu = document.querySelector("#nav-bar #solve").closest('li');
const container = document.querySelector(".fireworkDiv");
const solve = document.querySelector("#solve");
const clear = document.querySelector("#clear");
const backNo=document.querySelector("#noback");
const randomlyFill = document.querySelector("#randomly-fill");
const grid = document.querySelector("#grid");
const inputs = document.querySelectorAll('#grid input[type="text"]');
const gridCells = document.querySelectorAll('.cell input'); 
// START Dropdown menu (Speed)
const speedDropDown = document.querySelector("span.selected");
const speedOptions = document.querySelectorAll('.speed-options');
speedOptions.forEach(e => {
    e.addEventListener("click", () => {
        let value = e.innerHTML;
        speedDropDown.innerHTML = value;
    });
});
// DONE Dropdown menu (Speed)
const fireworks = new Fireworks(container, {
    autoresize: true,
    opacity: 0.5,
    acceleration: 1.05,
    friction: 0.97,
    gravity: 1.5,
    particles: 50,
    traceLength: 3,
    traceSpeed: 10,
    explosion: 5,
    intensity: 30,
    flickering: 50,
    lineStyle: 'round',
    hue: {
      min: 0,
      max: 360
    },
    delay: {
      min: 30,
      max: 60
    },
    rocketsPoint: {
      min: 50,
      max: 50
    },
    lineWidth: {
      explosion: {
        min: 1,
        max: 3
      },
      trace: {
        min: 1,
        max: 2
      }
    },
    brightness: {
      min: 50,
      max: 80
    },
    decay: {
      min: 0.015,
      max: 0.03
    },
    mouse: {
      click: false,
      move: false,
      max: 1
    }
  })

function startFireworks() {
    fireworks.start();
    setTimeout(() => fireworks.stop(), 5000);  // Stop fireworks after 5 seconds
}
// START Dropdown menu (Algorithms)
const algorithmsDropDown = "Backtracking";
// DONE Dropdown menu (Algorithms)
function showSuccessToast() {
    const toast = document.getElementById("successToast");
    toast.textContent="✅ Sudoku solved successfully";
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000); // Hide after 3 seconds
}
function noSolToast() {
    const toast = document.getElementById("failToast");
    toast.textContent="❌ No Solution Possible!";
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000); // Hide after 3 seconds
    clickedClear();
}
function invalidInput(){
    const toast = document.getElementById("failToast");
    toast.textContent="❌ Invalid input entered. Please enter numbers from 1-9";
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000); // Hide after 3 seconds
}
function gradientApplied() {
    const toast = document.getElementById("successToast");
    toast.textContent="🖌️ Gradient Applied";
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000); // Hide after 3 seconds
}


// CONSTANT SPEED (The lower the faster. It actually is the time lapse between 2 animation)
const FAST_SPEED = 0.4;
const MEDIUM_SPEED = 10;
const SLOW_SPEED = 50;
const EXTRA_SLOW_SPEED = 150;

// Add eventListener
clear.addEventListener('click', clickedClear);
randomlyFill.addEventListener('click', clickedRandomlyFill);
solve.addEventListener('click', clickedSolve);





//-------------------------------------------------START ClickedClear-------------------------------------------------
//-------------------------------------------------START ClickedClear-------------------------------------------------
//-------------------------------------------------START ClickedClear-------------------------------------------------

// This function clears all timeouts, animation colors and allow to press Solve and Speed again
function clickedClear(e)
{
    clear.textContent="Clear";
    solve.textContent="Solve";
    solve.style.backgroundColor="";
    backNo.style.borderColor = "";
    backNo.textContent="";
    fireworks.stop();
    clearAnimTimeOuts();
    clearAllColors();
    allowSolving();
    clear.style.backgroundColor = "";
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            grid.rows[i].cells[j].firstChild.value = "";
        }
    }
}



// This function delete all timeOut (animations)
function clearAnimTimeOuts()
{
    while(animTimeout >= 0)
    {
        clearTimeout(animTimeout);
        animTimeout--;
    }
}

// Clear all colors from animations
function clearAllColors()
{
    for(let i = 0; i < inputs.length; i++)
    {
        inputs[i].classList.remove('active');
        inputs[i].classList.remove('succeeded');
    }
}


// Allow to click solve, choose speed and algorithms again
function allowSolving()
{
    
    solve.setAttribute("style", "cursor: pointer"); // Allow to click solve button

    solve.addEventListener('click', clickedSolve);  // Add back eventListener for solve button
    randomlyFill.setAttribute("style", "cursor: pointer");
    SpeedMenu.setAttribute("style", "cursor: pointer"); // enable dropdown (pointerEvent)
    AlgoMenu.setAttribute("style", "cursor: pointer"); // enable dropdown (pointerEvent)
}

// Not allow to click solve, choose speed and algorithms
function setNotAllowSolveSpeedAndAlgorithms()
{
    solve.style.backgroundColor = "red";
    solve.style.borderRadius = "30px";
    solve.textContent="Solving";    // Turn solve button to red
    solve.style.cursor = "not-allowed";     // Change cursor mode
    solve.removeEventListener('click', clickedSolve);   // Remove any function when click
    clear.textContent="Stop & Clear";
    randomlyFill.setAttribute("style","pointer-events: none");
    SpeedMenu.setAttribute("style", "pointer-events: none"); // Cannot click Speed menu

}


//-------------------------------------------------DONE ClickedClear-------------------------------------------------
//-------------------------------------------------DONE ClickedClear-------------------------------------------------
//-------------------------------------------------DONE ClickedClear-------------------------------------------------

//---------------------------------------------START clickedRandomlyFill----------------------------------------------
//---------------------------------------------START clickedRandomlyFill----------------------------------------------
//---------------------------------------------START clickedRandomlyFill----------------------------------------------

// This function is called when we click the "Randomly-fill" button
function clickedRandomlyFill(e)
{
    clickedClear();  // Clear the board first
    fillRandomValuesSucceed();
}



// Fill the board with  probability that we will have a solution and  truly random
function fillRandomValuesSucceed()
{
    if(Math.random() < 0.8)
    {
        hasSolutionMatrix = [[8, 2, 5, 1, 9, 7, 3, 4, 6],   
                            [6, 1, 7, 3, 4, 2, 9, 5, 8],
                            [4, 3, 9, 6, 8, 5, 7, 1, 2],
                            [1, 9, 6, 5, 3, 8, 2, 7, 4],
                            [2, 8, 3, 7, 6, 4, 5, 9, 1],
                            [5, 7, 4, 9, 2, 1, 8, 6, 3],
                            [7, 6, 1, 2, 5, 3, 4, 8, 9],
                            [9, 4, 2, 8, 7, 6, 1, 3, 5],
                            [3, 5, 8, 4, 1, 9, 6, 2, 7]];
        newSudokuQuiz = mixSudokuQuiz(hasSolutionMatrix);   
        printBoardOnWeb(newSudokuQuiz);
    }
    else // The rest Just randomly fill
    {
        matrix = generateRandomBoard(); // This is random
        printBoardOnWeb(matrix);
    }
}

// This function randomly swaps rows and columns of a sudoku board with a specific rule
// Rule: If a sudoku board has a solution, if we swap 2 rows (or 2 columns)  within the same
// 3x9 (or 9x3) "rectangle", our sudoku will preserve its solvability
function mixSudokuQuiz(matrix)
{
    let numEntries = 20 + Math.floor((Math.random() * 8));  // Number of entries to be kept
    mixRowsAndColumns(matrix);  // Mix board
    keepSomeEntries(matrix, numEntries);    // Keep some random Entries
    return matrix;
}

// This function randomly swaps different rows (or columns) with the "appropriate" rows(or columns)
function mixRowsAndColumns(matrix)
{
    let numSwap = Math.floor(Math.random() * 15) + 1; // Swap 1-10 times
    while(numSwap > 0)
    {
        let num1 = Math.floor(Math.random() * 9);   // Pick a row (or column) from 0 to 8
        let num2 = Math.floor(num1 / 3) * 3 + Math.floor(Math.random() * 3); // Pick another row (column) in the right range
        if(Math.random() < 0.5)
        {
            swapRow(matrix, num1, num2);
        }
        else
        {
            swapCol(matrix, num1, num2);
        }
        numSwap--;
    }
}

// Randomly keep some entries out of a full sudoku board
function keepSomeEntries(matrix, numEntriesKeep)
{
    let numEntriesDelete = 81 - numEntriesKeep;
    for(let i = 0; i < numEntriesDelete; i++)
    {
        while(true)
        {
            let row = Math.floor(Math.random() * 9);
            let col = Math.floor(Math.random() * 9);
            if(matrix[row][col] != 0)
            {
                matrix[row][col] = 0;
                break;
            }
        }
    }
}

// Swap 2 row
function swapRow(matrix, row1, row2)
{
    for(let i = 0; i < 9; i++)
    {
        let temp = matrix[row1][i];
        matrix[row1][i] = matrix[row2][i];
        matrix[row2][i] = temp;
    }
}

// Swap 2 col
function swapCol(matrix, col1, col2)
{
    for(let i = 0; i < 9; i++)
    {
        let temp = matrix[i][col1];
        matrix[i][col1] = matrix[i][col2];
        matrix[i][col2] = temp;
    }
}

// This function generates a fully random board
function generateRandomBoard()
{
    let numFill = 20 + Math.floor((Math.random() * 8));
    let matrix = new Array(9);

    for(let i = 0; i < 9; i++)
    {
        matrix[i] = new Array(9);
        for(let j = 0; j < 9; j++)
        {
            matrix[i][j] = "";
        }
    }

    while(true)
    {
        if(numFill === 0)
            break;
        let i = Math.floor(Math.random() * 9);
        let j = Math.floor(Math.random() * 9);
        if(matrix[i][j] == "")
        {
            matrix[i][j] = Math.floor(Math.random() * 9) + 1;
            if(canBeCorrect(matrix, i, j))
                numFill--;
            else
                matrix[i][j] = "";
        }
    }
    return matrix;
}

function clickedSolve(e)
{
    // Verify input first
    if(verifyInput() == false) 
        return;

    if(speedDropDown.innerHTML === "Speed") // If haven't set speed
        speedDropDown.innerHTML = "Medium"; // Set to medium

    
    algorithmsDropDown.innerHTML = "Backtracking"; // Set to Backtracking
    
    let currentAlgo = getCurrentAlgorithm();

    // Reverse Backtracking and Spiral Backtracking are just different variation of Backtracking
    if(currentAlgo === "Backtracking")
        solveByBacktracking(e, currentAlgo);
 
}

//------------------------------------------------START Backtracking-------------------------------------------------
//------------------------------------------------START Backtracking-------------------------------------------------
//------------------------------------------------START Backtracking-------------------------------------------------
function solveByBacktracking(e, currentAlgo)
{
    backtrackingTotalCount = 0;
    setNotAllowSolveSpeedAndAlgorithms();   // Disable some buttons
    let matrix = readValue();               // Read values from web board

    backtracking(matrix, currentAlgo);                    // Solving sudoku

    let timeAfterAllDone = (++backtrackingTimeCount) * backtrackingDuration;

    if(allBoardNonZero(matrix))             // If We actually have a solution
    {
        if(currentAlgo === "Backtracking"){
            succeededNormalAnimation(backtrackingTimeCount, backtrackingDuration);
        }

    }
    else
    {
        
        animTimeout = setTimeout(alertNoSolution, timeAfterAllDone);
        animTimeout = setTimeout(allowSolving, timeAfterAllDone);
    }

}

var backtrackingTotalCount = 0;
var backtrackingDuration = 1;
var backtrackingTimeCount = 0;
var animTimeout = 0;
function backtracking(matrix, currentAlgo)
{
    // Setting Speed
    backtrackingDuration = MEDIUM_SPEED;
    console.log(speedDropDown.innerHTML);
    if(speedDropDown.innerHTML === 'Fast') backtrackingDuration = FAST_SPEED;
    else if(speedDropDown.innerHTML === 'Medium') backtrackingDuration = MEDIUM_SPEED;
    else if(speedDropDown.innerHTML === 'Slow') backtrackingDuration = SLOW_SPEED;
    else if(speedDropDown.innerHTML === 'Extra Slow') backtrackingDuration = EXTRA_SLOW_SPEED;


    backtrackingTimeCount = 0;  // Time count for scheduling animation
    
    // Find out which entries are user input (isFixed===true), which are empty (isFixed===false)
    let isFixed = new Array(9);
    for(let i = 0; i < isFixed.length; i++)
    {
        isFixed[i] = new Array(9);
        for(let j = 0; j < isFixed[i].length; j++)
        {
            if(matrix[i][j] !== 0)
            {
                isFixed[i][j] = true;
            }
            else
            {
                isFixed[i][j] = false;
            }
        }
    }

    let data = {cont: true};
    let startingRow = -1;
    let startingCol = -1;
    if(currentAlgo === "Backtracking")
    {
        startingRow = 0;
        startingCol = 0;
    }
   
    backtrackingHelper(matrix, isFixed, startingRow, startingCol, data, currentAlgo);
}

function backtrackingHelper(matrix, isFixed, row, col, data, currentAlgo)
{

    // If !data.cont or having our current entry at (row, col) lead to a clearly invalid sudoku board
    if(data.cont === false || !canBeCorrect(matrix, row, col))  // 1st stopping point
        return;

    // Backtracking is a naive solution.
    backtrackingTotalCount++;
    if(backtrackingTotalCount > 100000)  // Runs for too long without a solution
    {
        data.cont = false;  // Set the flag so that the rest of the recursive calls can stop at "stopping points"
        stopSolveSudokuBacktracking(currentAlgo); // Stop the program
        return;
    }

    if((currentAlgo === "Backtracking" && row === 8 && col === 8))  // If reach the last entry
    {
        if(isFixed[row][col])   // The last entry is user input
        {
            if(canBeCorrect(matrix, row, col))  // And it doesn't create an invalid board
            {
                data.cont = false;  // Yesss!! Found the solution!
            }
            return;
        }
        else    // If it is not user input
        {
            for(let i = 1; i <= 9; i++) 
            {
                matrix[row][col] = i; // Try 1-9
                animTimeout = setTimeout(fillCell, (backtrackingTimeCount++)*backtrackingDuration, row, col, i);
                if(canBeCorrect(matrix, row, col)) // If found the solution
                {
                    data.cont = false; 
                    return;
                }
            }
            animTimeout = setTimeout(emptyCell, (backtrackingTimeCount++)*backtrackingDuration, row, col);
            matrix[row][col] = 0;   // Otherwise, backtrack, reset the current entry to 0
        }
    }

    // Compute newRow and new Column coressponding to currentAlgo
    let newRow = -1;
    let newCol = -1;
    if(currentAlgo === "Backtracking")
    {
        // Fill from left to right, from top to bottom
        newRow = (col === 8) ? row + 1 : row;   
        newCol = (col === 8) ? 0 : col + 1;
    }
    
    // If this entry is user input and is valid
    if(isFixed[row][col] && canBeCorrect(matrix, row, col))
    {
        backtrackingHelper(matrix, isFixed, newRow, newCol, data, currentAlgo); // Continue next entry
    }
    // If it is empty
    else    
    {
        for(let i = 1; i <= 9; i++) 
        {
            if(data.cont === false) // Stopping entry 2
                return;
            animTimeout = setTimeout(fillCell, (backtrackingTimeCount++)*backtrackingDuration, row, col, i);
            matrix[row][col] = i; // Try 1-9

            if(canBeCorrect(matrix, row, col))  // If any of those values (1-9) can be valid
            {
                backtrackingHelper(matrix, isFixed, newRow, newCol, data, currentAlgo); // recursively move on to the next cell
            }
        }
        if(data.cont === false) // Stopping entry 3
            return;
        animTimeout = setTimeout(emptyCell, (backtrackingTimeCount++)*backtrackingDuration, row, col);
        matrix[row][col] = 0; // Backtrack, set entry to 0
    }
}

// This function is called when backtracking function is running for too long
// It will stop the function to prevent hanging
function stopSolveSudokuBacktracking(currentAlgo)
{
    if(currentAlgo === "Backtracking")
    {
        alert("Backtracking is a Naive Algorithm. It tends to do well when the majority of entries near the top are prefilled.\nThe program is taking too long to find a solution. It will be terminated to prevent hanging.");
    }
    clickedClear();
}

// Normal animation when we have found the solution 
function succeededNormalAnimation(currentTimeCount, currentDuration)
{
    let currentTime = currentTimeCount * currentDuration;
    let succeededDuration = 20;
    let newCount = 0;
    for(let row = 0; row < 9; row++)
    {
        for(let col = 0; col < 9; col++)
        {
            animTimeout = setTimeout(cellColoring, 
                            currentTime + (newCount++)*succeededDuration, row, col);
        }

    }
    
    animTimeout = setTimeout(allowSolving, currentTime + (newCount++)*succeededDuration);
}

//------------------------------------------------END Backtracking-------------------------------------------------
//------------------------------------------------END Backtracking-------------------------------------------------
//------------------------------------------------END Backtracking-------------------------------------------------

// Get elements
const themeIcon = document.getElementById('theme-icon');
const colorPickerPopup = document.getElementById('color-picker-popup');
const applyGradientButton = document.getElementById('apply-gradient');
const body = document.body;
themeIcon.addEventListener('mouseenter', () => {
    colorPickerPopup.style.display = 'block';
});

// Toggle popup display
themeIcon.addEventListener('click', () => {
    colorPickerPopup.style.display = colorPickerPopup.style.display === 'none' ? 'block' : 'none';
});

// Apply gradient background
applyGradientButton.addEventListener('click', () => {
    const color1 = document.getElementById('color1').value;
    const color2 = document.getElementById('color2').value;
    body.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
    gridCells.forEach(cell => {
        cell.style.borderColor = `${color1}`;
    });
    
    colorPickerPopup.style.display = 'none'; // Hide the popup
    gradientApplied();
});
//popup intro eventlistener
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'flex'; // Use flex to center it
    popup.style.opacity = '1'; // Make sure it's visible
}

// Add event listeners
document.getElementById('footDiv').addEventListener('click', showPopup);

// Hide the popup when the "Get Started!" button is clicked
document.getElementById('get-started-btn').addEventListener('click', function() {
    document.getElementById('popup').style.opacity = '0'; // Fade out
    setTimeout(() => {
        document.getElementById('popup').style.display = 'none'; // Hide after fade out
    }, 300); // Match the transition duration
});
window.addEventListener('click', function(event) {
    const popup = document.getElementById('popup');
    if (event.target === popup) {
        popup.style.opacity = '0'; // Fade out
        setTimeout(() => {
            popup.style.display = 'none'; // Hide after fade out
        }, 300); // Match the transition duration
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("popup");
    const getStartedBtn = document.getElementById("get-started-btn");

    if (!getCookie("popupClosed")) {
        popup.style.display = "flex";
        getStartedBtn.addEventListener("click", function() {
            popup.style.opacity = "0";
            setTimeout(() => {
                popup.style.display = "none";
                setCookie("popupClosed", "true", 7); // Cookie expires in 7 days
            }, 300);
        });
    } else {
        popup.style.display = "none";
    }
});

//navigating grid code start
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelectorAll('#grid .cell input');
    
    grid.forEach((input, index) => {
        input.addEventListener('keydown', (event) => handleArrowKeys(event, input, grid, index));
        input.addEventListener('input', (event) => handleInput(event, input, grid));
    });
});

function handleArrowKeys(event, currentInput, grid, currentIndex) {
    const key = event.key;
    let newIndex = currentIndex;

    switch (key) {
        case 'ArrowRight':
            newIndex = currentIndex + 1;
            break;
        case 'ArrowLeft':
            newIndex = currentIndex - 1;
            break;
        case 'ArrowDown':
            newIndex = currentIndex + 9;
            break;
        case 'ArrowUp':
            newIndex = currentIndex - 9;
            break;
        default:
            return; // exit if not an arrow key
    }

    if (newIndex >= 0 && newIndex < grid.length) {
        grid[newIndex].focus();
    }

    event.preventDefault(); // prevent the default action for arrow keys
}

function handleInput(event, input, grid) {
    const value = input.value;
    const inputType = event.inputType;

    // Check for backspace or empty input
    if (inputType === 'deleteContentBackward' || value === '') {
        return;
    }

    setTimeout(() => {
        // Validate the input is a number between 1 and 9
        if (!/^[1-9]$/.test(value)) {
            invalidInput();
            input.value = ''; // Clear the input if invalid
        } else {
            moveToNextCell(input, grid);
        }
    }, 0);
}

function moveToNextCell(input, grid) {
    const currentIndex = Array.from(grid).indexOf(input);
    if (input.value && currentIndex !== -1) {
        const nextIndex = currentIndex + 1;
        if (nextIndex < grid.length) {
            grid[nextIndex].focus();
        }
    }
}

//navigating grid code end

//-----------------------------------------------START HelperFunction------------------------------------------------
//-----------------------------------------------START HelperFunction------------------------------------------------
//-----------------------------------------------START HelperFunction------------------------------------------------
function emptyCell(row, col)
{
    inputs[row*9+col].classList.remove('active');
    grid.rows[row].cells[col].firstChild.value = "";
}

function fillCell(row, col, val)
{
    inputs[row*9+col].classList.add('active');
    grid.rows[row].cells[col].firstChild.value = val;
}

function cellColoring(row, col)
{
    inputs[row*9+col].classList.add('succeeded');
    backNo.style.borderColor = "rgb(120, 255, 0)";
    backNo.textContent="Number of Backtracking counts: "+backtrackingTotalCount;
    // Call showToast() when the Sudoku is solved successfully
    showSuccessToast();
    fireworks.start();
    playSoundSuccess();
    solve.textContent="Solved";
    solve.style.backgroundColor="green";
}

function canBeCorrect(matrix, row, col)
{
    // Check row
    for(let c = 0; c < 9; c++)
    {
        if(matrix[row][col] !== 0 && col !== c && matrix[row][col] === matrix[row][c])
            return false;
    }
    
    // Check column
    for(let r = 0; r < 9; r++)
    {
        if(matrix[row][col] !== 0 && row !== r && matrix[row][col] === matrix[r][col])
            return false;
    }
    
    // Check 3x3 square
    let r = Math.floor(row / 3);
    let c = Math.floor(col / 3);
    for(let i = r*3; i < r*3 + 3; i++)
    {
        for(let j = c * 3; j < c*3 + 3; j++)
        {
            if((row !== i || col !== j) && matrix[i][j] !== 0 && matrix[i][j] === matrix[row][col])
                return false;
        }
    }

    return true;
}

function allBoardNonZero(grid)
{
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            if(grid[i][j] === 0)
                return false;
        }
    }
    return true;
}

// Read value from web board to 2d array
function readValue()
{
    let matrix = new Array(9);
    for(let i = 0; i < 9; i++)
    {
        matrix[i] = new Array(9);
        for(let j = 0; j < 9; j++)
        {
            val = grid.rows[i].cells[j].firstChild.value;
            matrix[i][j] = (val === "") ? 0 : parseInt(val);
        }
    }
    return matrix;
}

// See if the input is valid
function verifyInput()
{
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            let val = grid.rows[i].cells[j].firstChild.value;

            if((val != "" && Number.isNaN(parseInt(val))) || 0 >= parseInt(val) || 9 < parseInt(val))
            {
                return false;
            }
        }
    }
    return true;
}
document.querySelectorAll('#grid input').forEach((input) => {
    input.addEventListener('input', function(e) {
        // Get the value of the input and the key code of the event
        const value = this.value;
        const keyCode = e.inputType;

        // Check if the key pressed was backspace or if the input is empty
        if (keyCode === 'deleteContentBackward' || value === '') {
            return;
        }

        setTimeout(() => {
            // Validate that the value is between 1-9
            if (!/^[1-9]$/.test(value)) {
                invalidInput(); // Clear the input if invalid
            } 
        }, 0);
    });
});


// Get the current Algorithm from Algorithms dropdown menu
function getCurrentAlgorithm()
{
    let currentAlgo = "Backtracking";   // Default is Backtracking

    return currentAlgo;
}
function playSound() {
    const audio = document.getElementById("audio");
    audio.play();
}
function playSoundSuccess(){
    const audio2=document.getElementById("audio2");
    audio2.play();
}
function alertNoSolution()
{
    playSound();
    noSolToast();
}

function printBoardOnWeb(matrix)
{
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            if(matrix[i][j] == 0)
                grid.rows[i].cells[j].firstChild.value = "";
            else
                grid.rows[i].cells[j].firstChild.value = matrix[i][j];
        }
    }
}


particlesJS('particles-js',
    {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    }
  );
  
  