import { handleActions } from 'redux-actions'

const initialState = {
  file: {
    path: '',
    name: '',
    title: 'Untitled',
    value: ''
  },
  gadget: {
    serialport: '',
    version: ''
  }
}

const reducerMap = {
  saveEdit(state, action) {
    return Object.assign({}, state, {
      file: {
        path: state.file.path,
        name: state.file.name,
        title: state.file.title,
        value: action.payload
      }
    })
  },
  selectedFile(state, action) {
    return Object.assign({}, state, {
      file: action.payload.file
    })
  },
  saveFile(state, action) {
    return state
  },
  selectedGadget(state, action) {
    return Object.assign({}, state, {
      gadget: action.payload.gadget
    })
  }
}

export default handleActions(reducerMap, initialState)
