const { createAction } = require('redux-actions')

exports.saveEdit = createAction('saveEdit')
exports.selectedFile = createAction('selectedFile')
exports.saveFile = createAction('saveFile')
exports.saveAsFile = createAction('saveAsFile')

exports.selectedGadget = createAction('selectedGadget')
exports.writeGadget = createAction('writeGadget')
exports.runGadget = createAction('runGadget')
exports.buildGadget = createAction('buildGadget')
