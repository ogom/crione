import { dialog } from 'electron'

exports.open = (focusedWindow) => {
  dialog.showOpenDialog({properties: ['openFile']}, (filenames) => {
    if (filenames) {
      focusedWindow.webContents.send('selected-file', filenames[0])
    }
  })
}

exports.save = (focusedWindow) => {
  focusedWindow.webContents.send('save-file')
}
