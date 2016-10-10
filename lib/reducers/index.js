import { handleActions } from 'redux-actions'

const initialState = {
  fileName: '',
  fileCode: ''
}

const reducerMap = {
  loadFile(state, action) {
    return {
      fileName: action.payload.fileName,
      fileCode: action.payload.fileCode
    }
  },
  saveCode(state, action) {
    return {
      fileName: state.fileName,
      fileCode: action.payload.fileCode
    }
  }
}

export default handleActions(reducerMap, initialState)
