const { spawn } = require('child_process')
const { dialog } = require('electron')
const settings = require('electron-settings')
const actions = require('../actions')

const home = process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME']
const reHome = new RegExp('^' + home)

exports.selectMrbc = (focusedWindow) => {
  dialog.showOpenDialog({properties: ['openFile']}, (filenames) => {
    if (filenames) {
      settings.set('crione.tools.mrbc', {
        path: filenames[0],
        title: filenames[0].replace(reHome, '~')
      }).then(() => {
        this.attachMrbc(focusedWindow.webContents)
      })
    }
  })
}

exports.attachMrbc = (sender) => {
  settings.get('crione.tools.mrbc').then(mrbc => {
    if (mrbc) {
      sender.send('ipc::dispatch', actions.selectMrbc(mrbc))
      showMrbc(mrbc.path, (version) => {
        sender.send('ipc::dispatch', actions.attachMrbc(version))
      })
    }
  })
}

function showMrbc (mrbc, cb) {
  const ps = spawn(mrbc, ['--version'])

  ps.stdout.on('data', function (data) {
    cb(data.toString())
  })

  ps.stderr.on('data', function (data) {
    cb(data.toString())
  })
}
