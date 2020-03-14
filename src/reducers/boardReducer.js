import {solutionsRef} from '../config/firebase'

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
export const fetchBoard = () => async dispatch =>{
  try {
    await solutionsRef.once("value", async function(snapshot){
      const solutions = await snapshot.child('solutions').val();
      const solKeys = Object.keys(solutions)
      // console.log('Keys=', solKeys);
      const randIdx = Math.floor( Math.random() * Math.floor(solKeys.length))
      // console.log('Random Idx', randIdx)
      const sol = await snapshot.child(`solutions/${solKeys[randIdx]}`).val()
      // console.log('solution=', solution )
      dispatch(gotBoard(sol))
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
