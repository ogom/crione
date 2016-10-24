const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const { ipcMain, dialog } = require('electron')
const SerialPort = require('serialport')
const settings = require('electron-settings')
const setgem = require('setgem')
const config = require('../config')
const actions = require('../actions')

const reGT = new RegExp(/\r\n>$/)
const reWaiting = new RegExp(/\r\nWaiting/)
const reOutput = new RegExp(/^R|^W|^L/)

exports.connect = (focusedWindow) => {
  ports((items) => {
    if (items.length > 0) {
      const options = {
        type: 'info',
        title: 'Connect',
        buttons: items,
        message: 'Connect Serial Port'
      }
      dialog.showMessageBox(focusedWindow, options, (index) => {
        const serialport = {
          port: items[index],
          options: {
            baudRate: config.serialport.baud_rate,
            dataBits: config.serialport.data_bits,
            parity: config.serialport.parity,
            stopBits: config.serialport.stop_bits
          }
        }
        settings.set('crione.connection.serialport',
          serialport
        ).then(() => {
          this.attachPort(focusedWindow.webContents)
        })
      })
    } else {
      dialog.showErrorBox('No target of port', 'Connect to the gadget is required')
    }
  })
}

exports.run = (focusedWindow) => {
  focusedWindow.webContents.send('ipc::acceptAction', actions.runGadget())
}

exports.write = (focusedWindow) => {
  focusedWindow.webContents.send('ipc::acceptAction', actions.writeGadget())
}

exports.build = (focusedWindow) => {
  focusedWindow.webContents.send('ipc::acceptAction', actions.buildGadget())
}

exports.buildAs = (focusedWindow) => {
  focusedWindow.webContents.send('ipc::acceptAction', actions.buildAsGadget())
}

exports.attachPort = (sender) => {
  settings.get('crione.connection.serialport').then(serialport => {
    if (serialport) {
      sender.send('ipc::dispatch', actions.selectPort(serialport))
      showGadget(serialport, (version) => {
        sender.send('ipc::dispatch', actions.attachGadget(version))
      })
    }
  })
}

function showGadget (serialport, cb) {
  const client = setgem.createClient({serialport: serialport})
  client.citrus.info((err, res) => {
    cb(res)
  })
}

function ports (cb) {
  SerialPort.list(function(err, ports) {
    if (err) {
      cb([])
    } else {
      const items = ports.filter((port) => {
        return port.manufacturer != undefined
      }).map((port) => {
        return port.comName
      })
      cb(items)
    }
  })
}

function readmrb (file, mrbc, build, cb) {
  const mrb = path.join(path.dirname(file), path.basename(file, path.extname(file)) + '.mrb')

  if (build) {
    const ps = spawn(mrbc, ['-g', path.resolve(file)])
    ps.stdout.on('data', function (data) {
      //console.log(data.toString())
    })

    ps.stderr.on('data', function (data) {
      //console.log(data.toString())
    })

    ps.on('exit', function (code) {
      cb(null, fs.readFileSync(mrb))
    })
  } else {
    cb(null, fs.readFileSync(mrb))
  }
}

function send (serialport, command, data, event) {
  let buffer = []
  let writing = true
  const port = new SerialPort(serialport.port, serialport.options)

  port.on('data', function(chunk) {
    buffer.push(chunk)
    const raw = buffer.join('')
    event.sender.send('ipc::sendGadget', raw)

    if (reGT.test(raw)) {
      port.close()
    }

    if (reWaiting.test(raw) && writing) {
      writing = false
      port.write(data)
    }

    if (reOutput.test(command)) {
      //process.stdout.write(chunk.toString())
    }
  })

  port.on('error', function(err) {

  })

  port.on('open', function(err) {
    port.write(command + '\n')
  })
}

ipcMain.on('ipc::nativeAction::runGadget', (event, state, action) => {
  if (state.file.name) {
    const command = ['R', state.file.name].join(' ')
    send(state.connection.serialport, command, null, event)
  } else {
    dialog.showErrorBox('No file of .rb', 'Select the file of .rb')
  }
})

ipcMain.on('ipc::nativeAction::writeGadget', (event, state, action) => {
  if (state.tools.mrbc.path) {
    readmrb(state.file.path, state.tools.mrbc.path, true, (err, data) => {
      const command = ['W', state.file.name + '.mrb', data.length].join(' ')
      send(state.connection.serialport, command, data, event)
    })
  } else {
    dialog.showErrorBox('No file of mrbc', 'Select the file of mrbc')
  }
})

ipcMain.on('ipc::nativeAction::buildGadget', (event, state, action) => {
  if (state.file.path) {
    readmrb(state.file.path, state.tools.mrbc.path, true, (err, data) => {
      const command = ['X', state.file.name + '.mrb', data.length].join(' ')
      send(state.connection.serialport, command, data, event)
    })
  } else {
    dialog.showErrorBox('No file of mrbc', 'Select the file of mrbc')
  }
})

ipcMain.on('ipc::nativeAction::buildAsGadget', (event, state, action) => {
  if (state.tools.mrbc.path) {
    fs.writeFile(state.file.path, state.file.value, (err) => {
      if (err) {
        dialog.showErrorBox('Write File', err.message)
      } else {
        //sender.send('ipc::dispatch', action)
        readmrb(state.file.path, state.tools.mrbc.path, true, (err, data) => {
          const command = ['X', state.file.name + '.mrb', data.length].join(' ')
          send(state.connection.serialport, command, data, event)
        })
      }
    })
  } else {
    dialog.showErrorBox('No file of mrbc', 'Select the file of mrbc')
  }
})
