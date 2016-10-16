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

  it('should create an action to selected a gadget', () => {
    const value = {
      gadget: {
        serialport: {},
        version: {}
      }
    }
    const expectedAction = {
      type: 'selectedGadget',
      payload: value
    }
    expect(
      actions.selectedGadget(value)
    ).toEqual(
      expectedAction
    )
  })
})
