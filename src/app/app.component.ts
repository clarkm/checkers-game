import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CheckersGame';
  board = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [-1, 0, -1, 0, -1, 0, -1, 0],
    [0, -1, 0, -1, 0, -1, 0, -1],
    [-1, 0, -1, 0, -1, 0, -1, 0]
  ];
  clickedCurrentPos: any;
  clickedNewPos: any;
  // rule is black goes first
  playerTurn = "black";

  redCheckersRemaining: Number[] = [];
  blackCheckersRemaining: Number[] = [];

  onPieceClick(piece:number, i:number, j:number) {

    // current piece already clicked/set; move the piece
    if (this.clickedCurrentPos && (piece === 0)) {
      this.clickedNewPos = { x: i, y: j };
      this.moveChecker(this.board, this.clickedCurrentPos, this.clickedNewPos)
      // run the counters:
      this.countPieces();
      this.clickedCurrentPos = null;
      this.clickedNewPos = null;
    }
    // no currentPiece set and colored piece clicked on; set the clickedCurrent
    else if (!this.clickedCurrentPos && (piece === 1 || piece === -1 || piece === 3 || piece === -3)) {
      this.clickedCurrentPos = { x: i, y: j };
    }
  }

  countPieces() {
    this.redCheckersRemaining = [];
    this.blackCheckersRemaining = [];

    this.board.forEach(
      row => row.forEach(
        checker => {
          if (checker === 1) {
            this.blackCheckersRemaining.push(checker);
          } 
          if (checker === -1) {
            this.redCheckersRemaining.push(checker);
          }
        }) )

    if (this.redCheckersRemaining.length === 0) {
      alert(`Black Wins!!`)
    }
    if (this.blackCheckersRemaining.length === 0) {
      alert(`Red Wins!!`)
    }

  }

  moveChecker(board:any, currentPos:any, newPos:any) {

    // Here is an example of how the function could be used:
    // const currentPos = { x: 3, y: 4 };
    // const newPos = { x: 4, y: 5 };
    // const updatedBoard = moveChecker(board, currentPos, newPos);
    
      // check if currentPos and newPos are valid positions on the board
      if (currentPos.x < 0 || currentPos.x > 7 || currentPos.y < 0 || currentPos.y > 7 ||
          newPos.x < 0 || newPos.x > 7 || newPos.y < 0 || newPos.y > 7) {
            debugger;
          return "Invalid position";
      }
      // check if there is a checker at currentPos
      if (board[currentPos.x][currentPos.y] === 0) {
          debugger;
          return "No checker at current position";
      }

      let checker = board[currentPos.x][currentPos.y]

      // check if it's the correct player's turn
    if ((checker > 0 && this.playerTurn === "red") || (checker < 0 && this.playerTurn === "black")) {
      alert("It's not your turn");
      return;
  }

      // check if the checker reaches the opposite side of the board
      // and that they're not already a king
      if ((checker > 0 && newPos.x === 7) && checker !== 3) {
          checker = checker + 2;
      } else if ((checker < 0 && newPos.x === 0) && checker !== -3) {
          checker = checker - 2;
      }

      if(checker > 1 || checker < -1){
          // check if newPos is a valid move for the king
          if(Math.abs(newPos.x - currentPos.x) !== Math.abs(newPos.y - currentPos.y) ) {
            debugger;
            alert("Invalid move for king");
            return;
          }
      }

      // check if the checker is moving backwards
      if ((checker === 1 && newPos.x < currentPos.x) || (checker === -1
        && newPos.x > currentPos.x)) {
          debugger;
          alert("Checker cannot move backwards");
          return;
        }
          

         // check if a capture is being made
        const isCapture = Math.abs(newPos.x - currentPos.x) === 2 && Math.abs(newPos.y - currentPos.y) === 2;
        if (isCapture) {
            // calculate the position of the captured piece
            const capturedPos = {
                x: (currentPos.x + newPos.x) / 2,
                y: (currentPos.y + newPos.y) / 2
            };
            // check if the captured piece is of the opposite color
            if (board[capturedPos.x][capturedPos.y] === 0 || board[capturedPos.x][capturedPos.y] === checker) {
                debugger;
                return "Invalid capture";
            }
            // remove the captured piece from the board
            board[capturedPos.x][capturedPos.y] = 0;
        } 
        else {
          // check if newPos is a valid move for the checker
          // verify they're not a king first
          if (
            (checker !== 3 || checker !== -3) &&
             Math.abs(newPos.x - currentPos.x) !== 1 || Math.abs(newPos.y - currentPos.y) !== 1) 
          {
              debugger;
              return "Invalid move";
          }
        }

      

      // move the checker
      board[newPos.x][newPos.y] = checker;
      board[currentPos.x][currentPos.y] = 0;

      // toggle player turn
      if (this.playerTurn === "red") {
        this.playerTurn = "black";
      } else {
        this.playerTurn = "red";
      }
      return board;
  }

  ngOnInit(): void {
    this.countPieces();
  }

}
