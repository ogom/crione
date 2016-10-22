const actions = require('.')
const { ipcMain, dialog } = require('electron')
const fs = require('fs')
const path = require('path')

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
  focusedWindow.webContents.send('ipc::acceptAction', actions.saveFile())
}

exports.saveAs = (focusedWindow) => {
  focusedWindow.webContents.send('ipc::acceptAction', actions.saveAsFile({}))
}

ipcMain.on('ipc::nativeAction::saveFile', (event, state, action) => {
  fs.writeFile(state.file.path, state.file.value, (err) => {
    if (err) {
      dialog.showErrorBox('Write File', err.message)
    } else {
      event.sender.send('ipc::dispatch', action)
    }
  })
})

ipcMain.on('ipc::nativeAction::saveAsFile', (event, state, action) => {
   dialog.showSaveDialog({}, (filename) => {
    if (filename) {
      action.payload.file = {
        path: filename,
        name: path.basename(filename, path.extname(filename)),
        title: filename.replace(reHome, '~')
      }
      fs.writeFile(action.payload.file.path, state.file.value, (err) => {
        if (err) {
          dialog.showErrorBox('Write File', err.message)
        } else {
          event.sender.send('ipc::dispatch', action)
        }
      })
    }
  })
})
