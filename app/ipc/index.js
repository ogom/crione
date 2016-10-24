const { ipcMain } = require('electron')
const { attachFile, writeFile, writeAsFile } = require('../accepts/file')
const { attachPort } = require('../accepts/gadget')
const { attachMrbc } = require('../accepts/tools')

module.exports = function ipc () {
  ipcMain.on('ipc::attachSettings', (event) => {
    attachFile(event.sender)
    attachPort(event.sender)
    attachMrbc(event.sender)
  })

  ipcMain.on('ipc::nativeAction::saveFile', (event, state, action) => {
    writeFile(event.sender, state, action)
  })

  ipcMain.on('ipc::nativeAction::saveAsFile', (event, state, action) => {
    writeAsFile(event.sender, state, action)
  })
}
