import React from "react";
//import {fetchBoard} from '../store'
//import {connect} from 'react-redux'
// const ref = require('../../app')

class Board extends React.Component {
	constructor() {
		super();
		this.state = {
			hintsTop: [
				[0,0,0],
				[0,0,0],
				[0,0,0],
				[0,0,0],
				[0,0,0]
			],
			hintsLeft: [
				[0,0,0],
				[0,0,0],
				[0,0,0],
				[0,0,0],
				[0,0,0]
			],
			board: [
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			]
    };
  }
  // componentDidMount(){
	// 	//call thunk to fetch new board with solution
	// 	this.props.fetchBoard()
	// }
	//handle clickCell
	//updates the local state - board
	//colors cell to blue when clicked
	//if you hold down shft + click = X
	//handle clickDone
	//checks current local state board against solution board
	//convert array to string
	//handle clickReset
	//this.setState ({this.state.board = [
			// 	[0, 0, 0, 0, 0],
			// 	[0, 0, 0, 0, 0],
			// 	[0, 0, 0, 0, 0],
			// 	[0, 0, 0, 0, 0],
			// 	[0, 0, 0, 0, 0]
			// ]})
	render() {
		console.log('These are the props on board', this.props)
		return (
			<div className="board">
				{this.state.board.map((row, index) => {
					return (
						<div className="row" key={`row-${index}`}>
							{row.map((cell, index) => {
								return (
                  <div className="cell" key={`cell-${index}`}></div>
                )
							})}
						</div>
					);
				})}
			</div>
		);
	}
}
//map state to props
// const mapState = (state) => ({
// 	board: state.board
// })
//map dispatch to props
// const mapDispatch = (dispatch) => ({
// 	fetchBoard: () => dispatch(fetchBoard())
// })
//return connected board
//export default connect(mapState)(Board)
export default Board
