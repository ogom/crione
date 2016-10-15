import * as actions from '../../lib/actions'
import { ipcMain, dialog } from 'electron'
import fs from 'fs'
import path from 'path'

const home = process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME']
const reHome = new RegExp('^' + home)

exports.open = (focusedWindow) => {
  dialog.showOpenDialog({properties: ['openFile']}, (filenames) => {
    if (filenames) {
      const file = {path: filenames[0]}
      file.name = path.basename(file.path, path.extname(file.path))
      file.title = file.path.replace(reHome, '~')
      file.value = fs.readFileSync(file.path, 'utf8')
      focusedWindow.webContents.send('ipc::dispatch',
        actions.selectedFile({file: file})
      )
    }
  })
}

exports.save = (focusedWindow) => {
  focusedWindow.webContents.send('ipc::getState', actions.saveFile())
}

ipcMain.on('ipc::saveFile', (event, state, action) => {
  fs.writeFileSync(state.file.path, state.file.value)
  event.sender.send('ipc::dispatch', action)
})
