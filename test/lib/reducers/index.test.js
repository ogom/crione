import * as actions from '../../../lib/actions'
import reducers from '../../../lib/reducers'

describe('reducers', () => {
  let state
  beforeEach(() => {
    state = {
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
  })

  it('should return the initial state', () => {
    expect(
      reducers(undefined, {type: ''})
    ).toEqual(
      state
    )
  })

  it('should return the save a edit', () => {
    const value = '#!mruby'
    state.file.value = value
    expect(
      reducers(undefined, actions.saveEdit(value))
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
})
