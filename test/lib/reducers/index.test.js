import * as actions from '../../../lib/actions'
import reducers from '../../../lib/reducers'

describe('reducers', () => {
  let initialState
  let state
  beforeEach(() => {
    state = {
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
  })

  it('should return the initial state', () => {
    expect(
      reducers(undefined, {type: ''})
    ).toEqual(
      state
    )
  })

  it('should return the attach a file', () => {
    const value = '#!mruby'
    state.file.value = value
    expect(
      reducers(undefined, actions.attachFile(value))
    ).toEqual(
      state
    )
  })

  it('should return the save a file', () => {
    expect(
      reducers(undefined, actions.saveFile())
    ).toEqual(
      state
    )
  })

  describe('Connection', () => {
    it('should return the select a port', () => {
      const value = {}
      state.connection.serialport = value
      expect(
        reducers(undefined, actions.selectPort(value))
      ).toEqual(
        state
      )
    })
  })

  describe('selectMrbc', () => {
    beforeEach(() => {
      state.tools.mrbc.path = 'mrbc'
    })

    it('should return the select a mrbc', () => {
      expect(
        reducers(undefined, actions.selectMrbc({
          path: state.tools.mrbc.path,
          title: state.tools.mrbc.title
        }))
      ).toEqual(
        state
      )
    })

    describe('attachMrbc', () => {
      beforeEach(() => {
        initialState = state
        state.tools.mrbc.version = 'mruby 1.2.0 (2015-11-17)'
      })

      it('should return the attach a mrbc', () => {
        expect(
          reducers(initialState, actions.attachMrbc(state.tools.mrbc.version))
        ).toEqual(
          state
        )
      })
    })
  })
})
