import { createAction } from 'redux-actions'

export const saveEdit = createAction('saveEdit')
export const selectedFile = createAction('selectedFile')
export const saveFile = createAction('saveFile')
export const saveAsFile = createAction('saveAsFile')

export const selectedGadget = createAction('selectedGadget')
export const writeGadget = createAction('writeGadget')
export const runGadget = createAction('runGadget')
export const buildGadget = createAction('buildGadget')
