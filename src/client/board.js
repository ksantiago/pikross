import React from "react";
import { fetchBoard } from '../reducers/boardReducer'
import { connect } from 'react-redux'
import Navbar from './navbar'

const initBoard = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      hintsTop: [
        [],
        [],
        [],
        [],
        []
      ],
      hintsLeft: [
        [],
        [],
        [],
        [],
        []
      ],
      board: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      boardHistory: [[
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ]],
      gameComplete: false,
      gameWon: '',
      accuracy: 0
    };
    this.handleClickCell = this.handleClickCell.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.cloneArray = this.cloneArray.bind(this)
    this.handleNewGame = this.handleNewGame.bind(this)
    this.handleUndo = this.handleUndo.bind(this)
    this.getAccuracy = this.getAccuracy.bind(this)
  }

  componentDidMount() {
    this.props.fetchBoard()
  }

  cloneArray(array) {
    let clone = []
    for (let i = 0; i < array.length; i++) {
      clone.push([...array[i]])
    }
    return clone
  }

  handleClickCell = (evt, rIdx, cIdx) => {
    const newBoard = this.cloneArray(this.state.board)

    if (this.state.board[rIdx][cIdx] === 0) newBoard[rIdx][cIdx] = 1
    else if (this.state.board[rIdx][cIdx] === 1) newBoard[rIdx][cIdx] = 2
    else newBoard[rIdx][cIdx] = 0

    this.setState({
      board: newBoard
    })
    this.state.boardHistory.push(newBoard)
  }

  stringifyArray(array) {
    let str = ""

    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        str += this.stringifyArray(array[i])
      } else {
        if (array[i] === 0) str += '2'
        else str += array[i]
      }
    }
    return str
  }

  handleDone() {
    let currentBoard = this.stringifyArray(this.state.board);
    let solutionBoard = this.stringifyArray(this.props.board.solution);
    const acc = this.getAccuracy(currentBoard, solutionBoard)

    if (currentBoard === solutionBoard) {
      this.setState({
        gameWon: true,
        gameComplete: true,
        accuracy: acc
      })
    } else {
      this.setState({
        gameComplete: true,
        accuracy: acc
      })
    }
  }

  handleReset() {
    this.setState({
      board: initBoard,
      gameComplete: false,
      gameWon: false
    })
  }

  handleNewGame() {
    this.props.fetchBoard()
    this.handleReset()
  }

  handleUndo() {
    let cpBoardHist = this.cloneArray(this.state.boardHistory)
    cpBoardHist.pop()
    let lastBoardPlayed = cpBoardHist[cpBoardHist.length - 1]
    this.setState({
      boardHistory: cpBoardHist,
      board: lastBoardPlayed
    })
  }

  getAccuracy(currBoard, solution) {
    console.log('you accurate girl')

    if (currBoard === solution) { return 100 }
    else {
      let strWhereTheyMatch = ''
      for (let i = 0; i < currBoard.length; i++) {

        if (currBoard[i] === solution[i]) {
          strWhereTheyMatch += currBoard[i]
        }
      }
      return strWhereTheyMatch.length / solution.length * 100
    }

  }

  render() {

    const { hintsTop, hintsLeft } = this.props.board
    return (
      <div>
        <Navbar />
        <div className="top-section">

          <button onClick={this.handleNewGame}>New Game</button>
        </div>
        <div className="win-message">
        </div>
        <div className="board">
          {this.state.gameComplete ?
            (this.state.gameWon ? <div className="board-results">Winner, Winner, Chicken Dinner!</div> : <div className="board-results">You almost got it. You're {this.state.accuracy}% accurate!</div>)
            : null
          }

          {hintsTop ?
            <div className="hints-top">{hintsTop.map((hintsRow, rhIdx) => {
              return (
                <div className="hintT-row" key={`rht-${rhIdx}`}>{
                  hintsRow.map((hintCell, chIdx) => (
                    <div className="hintT-cell" key={`cht-${chIdx}`}>{hintCell}</div>
                  ))
                }</div>
              )
            })}</div> :
            null
          }
          <div className="hl-board">
            <div className="hints-left">
              {hintsLeft ?
                hintsLeft
                  .map((hintLRow, rhLIdx) =>
                    <div className="hintL-row" key={`rhl-${rhLIdx}`}>{
                      hintLRow.map((hintLCell, chLIdx) =>
                        <div className="hintL-cell" key={`chl-${chLIdx}`}>{hintLCell}</div>
                      )
                    }
                    </div>
                  )
                : null

              }
            </div>
            <div>
              {this.state.board.map((row, rIdx) => {
                return (
                  <div className="row" key={`row-${rIdx}`}>
                    {row.map((cell, cIdx) => {
                      let styleList = "cell";
                      let innerText = '';
                      if (cell === 0) {
                        styleList = "cell"
                      } else if (cell === 1) {
                        styleList = "cell one"
                      } else {
                        styleList = "cell two"
                        innerText = "X"
                      }
                      return (
                        <div onClick={(e) => this.handleClickCell(e, rIdx, cIdx)} className={styleList} key={`cell-${cIdx}`}>{innerText}</div>
                      )
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="game-buttons">
            <button onClick={this.handleDone}>Done</button>
            <button onClick={this.handleReset}>Reset</button>
            <button onClick={this.handleUndo}>Undo</button>
          </div>
        </div>
      </div>
    );
  }
}

// map state to props
const mapState = (state) => ({
  board: state.board
})

// map dispatch to props
const mapDispatch = (dispatch) => ({
  fetchBoard: () => dispatch(fetchBoard())
})

//return connected board
export default connect(mapState, mapDispatch)(Board)

