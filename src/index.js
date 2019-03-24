module.exports = function solveSudoku(matrix) {
  // your solution
  return sudokuSolver(matrix);
}

function sudokuSolver(matrix) {
  let row = 0;
  let col = 0;
  
  let position = getUnsolved(matrix);
  if(position.length===0) return matrix;

  row = position[0];
  col = position[1];
  for (let num = 1; num <= 9; num++) { 
    
    if (isAllowed(matrix, row, col, num)) { 
      
      matrix[row][col] = num; 
      
      if (sudokuSolver(matrix)) { 
        return matrix;
      }
      
      matrix[row][col] = 0; 
    }
  } 
}

function getUnsolved(matrix){
  let isZero = false;
  for (row = 0; row < matrix.length; row++) { 
    for (col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === 0) {
        isZero = true; 
        return [row, col];
      }
    }
  }
  if (isZero === false) {
    return []; 
  } 
}

function isAllowed(matrix, row, col, num) {
  return (
    !usedInRow(matrix, row, num) &&
    !usedInCol(matrix, col, num) &&
    !usedInBox(matrix, row - (row % 3), col - (col % 3), num)
  );
}

function usedInRow(matrix, row, num) {
  for (let col = 0; col < matrix.length; col++) { 
    if (matrix[row][col] === num) {
      return true;
    }
  }
  return false;
}

function usedInCol(matrix, col, num) {
  for (let row = 0; row < matrix.length; row++) { 
    if (matrix[row][col] === num) {
      return true;
    }
  }
  return false;
}

function usedInBox(matrix, startRow, startCol, num) { 
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (matrix[row + startRow][col + startCol] === num) { 
        return true;
      }
    }
  }
  return false;
}