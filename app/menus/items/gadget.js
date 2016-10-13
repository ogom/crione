import { ipcMain } from 'electron'
import * as terminal from '../../utils/terminal'

import fs from 'fs'
import path from 'path'
import { spawn } from 'child_process'

export default {
  label: 'Gadget',
  submenu: [
    {
      label: 'Info',
      click(item, focusedWindow) {
        terminal.info(focusedWindow)
      }
    },
    {
      label: 'Write',
      click(item, focusedWindow) {
        focusedWindow.webContents.send('gadget::dispatch',
          {type: 'write'}
        )
      }
    },
    {
      label: 'Run',
      accelerator: 'CmdOrCtrl+R',
      click(item, focusedWindow) {
        focusedWindow.webContents.send('gadget::dispatch',
          {type: 'run'}
        )
      }
    },
    {
      label: 'Build',
      accelerator: 'CmdOrCtrl+B',
      click(item, focusedWindow) {
        focusedWindow.webContents.send('gadget::dispatch',
          {type: 'build'}
        )
      }
    }
  ]
}

function readmrb (file, build, cb) {
  const mrb = path.join(path.dirname(file), path.basename(file, path.extname(file)) + '.mrb');

  if (build) {
    const ps = spawn('mrbc', ['-g', path.resolve(file)])
    ps.stdout.on('data', function (data) {
      console.log(data.toString())
    })

    ps.stderr.on('data', function (data) {
      console.log(data.toString())
    })

    ps.on('exit', function (code) {
      console.log('exit', code)
      cb(null, fs.readFileSync(mrb))
    })
  } else {
    cb(null, fs.readFileSync(mrb))
  }
}

function commander (type, file, cb) {
  const basename = path.basename(file, path.extname(file))

  switch (type) {
  case 'write':
    readmrb(file, true, (err, data) => {
      cb(['W', basename + '.mrb', data.length].join(' '), data)
    })
    break
  case 'run':
    cb(`R ${basename}`, null)
    break
  case 'build':
    readmrb(file, true, (err, data) => {
      cb(['X', basename + '.mrb', data.length].join(' '), data)
    })
    break
  }
}

ipcMain.on('gadget::notify', (event, state, action) => {
  commander(action.type, state.gem.fileName, (command, data) => {
    terminal.send(event, command, data)
  })
})
