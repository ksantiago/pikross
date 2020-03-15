import {ref} from '../config/firebase'

// Initial state
const initialState = {}

// Action Types
const GOT_BOARD = 'GOT_BOARD'

// Action creators
const gotBoard = (solution) => ({
  type: GOT_BOARD,
  solution
})

// Thunks
export const fetchBoard = () => async dispatch => {
  try {
    // await ref.once("value", async (snapshot) => {
    //   console.log(Object.keys(snapshot.child('solutions').val()))
    // })
    await ref.once("value", async (snapshot) => {
      const solutions = await snapshot.child('solutions').val();
      // console.log('solutions: ', solutions)
      const solKeys = Object.keys(solutions)
      const randIdx = Math.floor( Math.random() * Math.floor(solKeys.length))
      const solution = await snapshot.child(`solutions/${solKeys[randIdx]}`).val()
      dispatch(gotBoard(solution))
    })
  } catch (error) {
    console.error(error)
  }
}

// Reducer
const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_BOARD:
      return action.solution
    default:
      return state;
  }
}

// Export
export default boardReducer
