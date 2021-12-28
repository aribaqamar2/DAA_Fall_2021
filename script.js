let count = 0;

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
