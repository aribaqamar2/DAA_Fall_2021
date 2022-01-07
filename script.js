let count = 0;
let N = 0;
var triggerFunction = function(n){
  var table = document.getElementById("myTable");
  table.innerHTML = "";
  let number = +n
  N = number;
  solveNQueens(number);
  solveNQueens2(number);
  count = 0
  points= null;
}

var solveNQueens = function (num) {
  let n = +num;
  if(n>3){
  var res = [];
  if (n === 1 || n >= 4) dfs(res, [], n, 0);
  return res;
  }
  else{
    alert("Please Input Number Greater than 3")
  }
};

var dfs = function (res, points, n, index) {
  for (var i = index; i < n; i++) {
    if (points.length !== i) return;
    for (var j = 0; j < n; j++) {
      if (isValid(points, [i, j])) {
        points.push([i, j]);
        dfs(res, points, n, i + 1);
        if (points.length === n) res.push(buildRes(points));
        points.pop();
      }
    }
  }
};

var buildRes = function (points) {
  var res = [];
  var n = points.length;
  for (var i = 0; i < n; i++) {
    res[i] = "";
    for (var j = 0; j < n; j++) {
      res[i] += points[i][1] === j ? "Q" : " ";
    }
  }
  count++;
  drawBoard(res, count,points);
  return res;
};

var drawBoard = function (res, count,points) {

  if (count ===2 ) {
    var n = res.length;
    for (var i = 0; i < n; i++) {
      var x = document.getElementById("myTable").insertRow(i);
      res[i] = "";
      for (var j = 0; j < n; j++) {
        var y = x.insertCell(j);
        res[i] +=
          points[i][1] === j
            ? (y.classList.add("queen", "box"), "Q")
            : (y.classList.add("box"), " ");
        y.innerHTML = res[i][j];
      }
    }
  }
};

var isValid = function (oldPoints, newPoint) {
  var len = oldPoints.length;
  for (var i = 0; i < len; i++) {
    if (oldPoints[i][0] === newPoint[0] || oldPoints[i][1] === newPoint[1])
      return false;
    if (
      Math.abs(
        (oldPoints[i][0] - newPoint[0]) / (oldPoints[i][1] - newPoint[1])
      ) === 1
    )
      return false;
  }
  return true;
};


// JavaScript program to solve N Queen Problem
// using Branch and Bound

// A utility function to print solution
function printSolution(board)
{
	let N = board.length;
	for(let i = 0; i < N; i++)
	{
		for(let j = 0; j < N; j++)
			console.log(board[i][j]+" ");
			
      console.log("<br>");
	}
}

// A Optimized function to check if a queen
// can be placed on board[row][col]
function isSafe(row,col,slashCode,backslashCode,rowLookup,slashCodeLookup,backslashCodeLookup)
{
	if (slashCodeLookup[slashCode[row][col]] ||
		backslashCodeLookup[backslashCode[row][col]] ||
		rowLookup[row])
		return false;

	return true;
}

// A recursive utility function to
// solve N Queen problem
function solveNQueensUtil(board,col,slashCode,
backslashCode,rowLookup,slashCodeLookup,backslashCodeLookup)
{
	// Base case: If all queens are placed
	// then return true
	//let N = board.length;
	
	if (col >= N)
		return true;

	// Consider this column and try placing
	// this queen in all rows one by one
	for(let i = 0; i < N; i++)
	{
		// Check if queen can be placed on board[i][col]
		if (isSafe(i, col, slashCode, backslashCode,
				rowLookup, slashCodeLookup,
				backslashCodeLookup))
		{
			
			// Place this queen in board[i][col]
			board[i][col] = 1;
			rowLookup[i] = true;
			slashCodeLookup[slashCode[i][col]] = true;
			backslashCodeLookup[backslashCode[i][col]] = true;

			// recur to place rest of the queens
			if (solveNQueensUtil(
					board, col + 1, slashCode,
					backslashCode, rowLookup,
					slashCodeLookup,
					backslashCodeLookup))
				return true;

			// If placing queen in board[i][col] doesn't
			// lead to a solution, then backtrack

			// Remove queen from board[i][col]
			board[i][col] = 0;
			rowLookup[i] = false;
			slashCodeLookup[slashCode[i][col]] = false;
			backslashCodeLookup[backslashCode[i][col]] = false;
		}
	}

	// If queen can not be place in any row
	// in this column col then return false
	return false;
}

/*
* This function solves the N Queen problem using Branch
* and Bound. It mainly uses solveNQueensUtil() to solve
* the problem. It returns false if queens cannot be
* placed, otherwise return true and prints placement of
* queens in the form of 1s. Please note that there may
* be more than one solutions, this function prints one
* of the feasible solutions.
*/
function solveNQueens2(N)
{
	let board = new Array(N);
	
	// Helper matrices
	let slashCode = new Array(N);
	let backslashCode = new Array(N);
	
	for(let i=0;i<N;i++)
	{
		board[i]=new Array(N);
		slashCode[i]=new Array(N);
		backslashCode[i]=new Array(N);
		for(let j=0;j<N;j++)
		{
			board[i][j]=0;
			slashCode[i][j]=0;
			backslashCode[i][j]=0;
		}
	}
	
	
	// Arrays to tell us which rows are occupied
	let rowLookup = new Array(N);
	for(let i=0;i<N;i++)
		rowLookup[i]=false;
	
	// Keep two arrays to tell us
	// which diagonals are occupied
	let slashCodeLookup = new Array(2 * N - 1);
	let backslashCodeLookup = new Array(2 * N - 1);
	for(let i=0;i<2*N-1;i++)
	{
		slashCodeLookup[i]=false;
		backslashCodeLookup[i]=false;
	}

	// Initialize helper matrices
	for(let r = 0; r < N; r++)
		for(let c = 0; c < N; c++)
		{
			slashCode[r] = r + c;
			backslashCode[r] = r - c + 7;
		}

	if (solveNQueensUtil(board, 0, slashCode,
						backslashCode, rowLookup,
						slashCodeLookup,
						backslashCodeLookup) == false)
	{
		console.log("Solution does not exist");
		return false;
	}
	
	// Solution found
	printSolution(board);
	return true;
}

// Driver code
solveNQueens();


// This code is contributed by avanitrachhadiya2155
