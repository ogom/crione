import { createAction } from 'redux-actions'

// File
export const selectFile = createAction('selectFile')
export const attachFile = createAction('attachFile')
export const saveFile = createAction('saveFile')
export const saveAsFile = createAction('saveAsFile')

// Connection
export const selectPort = createAction('selectPort')
export const attachGadget = createAction('attachGadget')
export const writeGadget = createAction('writeGadget')
export const runGadget = createAction('runGadget')
export const buildGadget = createAction('buildGadget')
export const buildAsGadget = createAction('buildAsGadget')

// Tools
export const selectMrbc = createAction('selectMrbc')
export const attachMrbc = createAction('attachMrbc')
