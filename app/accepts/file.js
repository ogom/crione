const fs = require('fs')
const path = require('path')
const { dialog } = require('electron')
const settings = require('electron-settings')
const actions = require('../actions')

const home = process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME']
const reHome = new RegExp('^' + home)

exports.open = (focusedWindow) => {
  dialog.showOpenDialog({properties: ['openFile']}, (filenames) => {
    if (filenames) {
      settings.set('crione.file', {
        path: filenames[0],
        name: path.basename(filenames[0], path.extname(filenames[0])),
        title: filenames[0].replace(reHome, '~')
      }).then(() => {
        this.attachFile(focusedWindow.webContents)
      })
    }
  })
}

exports.attachFile = (sender) => {
  settings.get('crione.file').then(file => {
    if (file) {
      sender.send('ipc::dispatch', actions.selectFile(file))
      fs.readFile(file.path, 'utf8', (err, value) => {
        if (err) {
          dialog.showErrorBox('Write File', err.message)
        } else {
          sender.send('ipc::dispatch', actions.attachFile(value))
        }
      })
    }
  })
}

exports.save = (focusedWindow) => {
  focusedWindow.webContents.send('ipc::acceptAction', actions.saveFile())
}

exports.saveAs = (focusedWindow) => {
  focusedWindow.webContents.send('ipc::acceptAction', actions.saveAsFile())
}

exports.writeFile = (sender, state, action) => {
  fs.writeFile(state.file.path, state.file.value, (err) => {
    if (err) {
      dialog.showErrorBox('Write File', err.message)
    } else {
      sender.send('ipc::dispatch', action)
    }
  })
}

exports.writeAsFile = (sender, state, action) => {
  dialog.showSaveDialog({}, (filename) => {
    if (filename) {
      settings.set('crione.file', {
        path: filename,
        name: path.basename(filename, path.extname(filename)),
        title: filename.replace(reHome, '~')
      }).then(() => {
        attachAsFile(sender, state.file.value)
      })
    }
  })
}

function attachAsFile (sender, value) {
  settings.get('crione.file').then(file => {
    if (file) {
      fs.writeFile(file.path, value, (err) => {
        if (err) {
          dialog.showErrorBox('Write File', err.message)
        } else {
          sender.send('ipc::dispatch', actions.selectFile(file))
          sender.send('ipc::dispatch', actions.attachFile(value))
        }
      })
    }
  })
}
