const { createAction } = require('redux-actions')

// File
exports.selectFile = createAction('selectFile')
exports.attachFile = createAction('attachFile')
exports.saveFile = createAction('saveFile')
exports.saveAsFile = createAction('saveAsFile')

// Connection
exports.selectPort = createAction('selectPort')
exports.attachGadget = createAction('attachGadget')
exports.writeGadget = createAction('writeGadget')
exports.runGadget = createAction('runGadget')
exports.buildGadget = createAction('buildGadget')

// Tools
exports.selectMrbc = createAction('selectMrbc')
exports.attachMrbc = createAction('attachMrbc')
