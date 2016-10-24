import * as actions from '../../../lib/actions'

describe('actions', () => {
  it('should create an action to attach a file', () => {
    const value = '#!mruby'
    const expectedAction = {
      type: 'attachFile',
      payload: value
    }
    expect(
      actions.attachFile(value)
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
