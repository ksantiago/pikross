import React from "react";
import { fetchBoard } from '../reducers/boardReducer'
import { connect } from 'react-redux'


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
      ]
    };
    this.handleClickCell = this.handleClickCell.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  componentDidMount() {
    this.props.fetchBoard()
  }

  handleClickCell = (evt, rIdx, cIdx) => {
    const newBoard = [...this.state.board]
    if (evt.shiftKey) {
      newBoard[rIdx][cIdx] = 2
      this.setState({
        board: newBoard
      })
      // evt.target.innerHTML = 'X'
    }
    else {
      newBoard[rIdx][cIdx] = 1
      this.setState({
        board: newBoard
      })
    }
  }
  //handle clickCell
  //updates the local state - board
  //colors cell to blue when clicked
  //if you hold down shft + click = X
  //handle clickDone
  //checks current local state board against solution board
  //convert array to string
  stringifyArray(array){
    let str = ""
    for(let i=0; i< array.length; i++){
      if(Array.isArray(array[i])){
        str += this.stringifyArray(array[i])
      } else {
        if (array[i] === 0) str += '2'
        else str += array[i]
      }
    }

    return str
  }

  handleDone(){
    let currentBoard = this.stringifyArray(this.state.board);
    let solutionBoard = this.stringifyArray(this.props.board.solution);
    console.log(currentBoard)
    console.log(solutionBoard)
    if (currentBoard === solutionBoard){
      console.log('You win!!!!')
    } else {
      console.log('you lost!')
    }
  }
  //handle clickReset
  //this.setState ({this.state.board = [
  // 	[0, 0, 0, 0, 0],
  // 	[0, 0, 0, 0, 0],
  // 	[0, 0, 0, 0, 0],
  // 	[0, 0, 0, 0, 0],
  // 	[0, 0, 0, 0, 0]
  // ]})
  handleReset(){
    this.setState({board: [
      	[0, 0, 0, 0, 0],
      	[0, 0, 0, 0, 0],
      	[0, 0, 0, 0, 0],
      	[0, 0, 0, 0, 0],
      	[0, 0, 0, 0, 0]
    ]})
  }

  render() {
    // console.log('This is the state', this.state)
    //console.log('These are the props on board', this.props)
    // let hintsTop
    // if (!this.props.board.hintsTop) hintsTop = this.state.hintsTop
    // else hintsTop = this.props.board.hintsTop
    // console.log(hintsTop)
    const {hintsTop,hintsLeft} = this.props.board
    return (
      <div className="board">
        {
          hintsTop ?
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
                  <div className ="hintL-row"key ={`rhl-${rhLIdx}`}>{
                    hintLRow.map((hintLCell,chLIdx) =>
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
                    if(cell === 0){
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

