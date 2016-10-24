import * as actions from '../../../lib/actions'

describe('actions', () => {
  it('should create an action to save a edit', () => {
    const value = '#!mruby'
    const expectedAction = {
      type: 'saveEdit',
      payload: value
    }
    expect(
      actions.saveEdit(value)
    ).toEqual(
      expectedAction
    )
  })

  it('should create an action to select a port', () => {
    const value = {
      connection: {
        serialport: {}
      }
    }
    const expectedAction = {
      type: 'selectPort',
      payload: value
    }
    expect(
      actions.selectPort(value)
    ).toEqual(
      expectedAction
    )
  })
})
