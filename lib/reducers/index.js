import { handleActions } from 'redux-actions'

const initialState = []

const reducerMap = {
  show_gems(state, action) {
    return action.payload
  },
  add_gem(state, action) {
    return state.concat([action.payload])
  }
}

export default handleActions(reducerMap, initialState)
