import { handleActions } from 'redux-actions'

const initialState = {
  file: {
    path: '',
    name: '',
    title: 'Untitled',
    value: ''
  },
  connection: {
    serialport: '',
    gadget: {
      version: ''
    },
  },
  tools: {
    mrbc: {
      path: '',
      title: 'Untitled',
      version: ''
    }
  }
}

const reducerMap = {
  selectFile(state, action) {
    return Object.assign({}, state, {
      file: action.payload
    })
  },
  attachFile(state, action) {
    const file = Object.assign({}, state.file, {
      value: action.payload
    })
    return Object.assign({}, state, {file: file})
  },
  saveFile(state, action) {
    return state
  },
  saveAsFile(state, action) {
    return state
  },
  selectPort(state, action) {
    const connection = Object.assign({}, state.connection, {
      serialport: action.payload
    })
    return Object.assign({}, state, {connection: connection})
  },
  attachGadget(state, action) {
    const gadget = Object.assign({}, state.connection.gadget, {
      version: action.payload
    })
    const connection = Object.assign({}, state.connection, {
      gadget: gadget
    })
    return Object.assign({}, state, {connection: connection})
  },
  selectMrbc(state, action) {
    const mrbc = Object.assign({}, state.tools.mrbc, {
      path: action.payload.path,
      title: action.payload.title
    })
    return Object.assign({}, state, {tools: {mrbc: mrbc}})
  },
  attachMrbc(state, action) {
    const mrbc = Object.assign({}, state.tools.mrbc, {
      version: action.payload
    })
    return Object.assign({}, state, {tools: {mrbc: mrbc}})
  }
}

export default handleActions(reducerMap, initialState)
