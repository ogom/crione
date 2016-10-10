import { dialog } from 'electron'

export function open (focusedWindow) {
  dialog.showOpenDialog({properties: ['openFile']}, function (filenames) {
    if (filenames) {
      focusedWindow.webContents.send('selected-file', filenames[0])
    }
  })
}

export function save (focusedWindow) {
  focusedWindow.webContents.send('save-file')
}
