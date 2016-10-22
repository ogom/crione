const actions = require('.')
const { ipcMain, dialog } = require('electron')
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const SerialPort = require('serialport')
const setgem = require('setgem')
const config = require('../config')

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
        const client = setgem.createClient({serialport: serialport})
        client.citrus.info((err, res) => {
          const gadget = {
            serialport: serialport,
            version: res
          }
          focusedWindow.webContents.send('ipc::dispatch',
            actions.selectedGadget({gadget: gadget})
          )
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

ipcMain.on('ipc::nativeAction::runGadget', (event, state, action) => {
  const command = ['R', state.file.name].join(' ')
  send(state.gadget.serialport, command, null, event)
})

ipcMain.on('ipc::nativeAction::writeGadget', (event, state, action) => {
  readmrb(state.file.path, true, (err, data) => {
    const command = ['W', state.file.name + '.mrb', data.length].join(' ')
    send(state.gadget.serialport, command, data, event)
  })
})

ipcMain.on('ipc::nativeAction::buildGadget', (event, state, action) => {
  readmrb(state.file.path, true, (err, data) => {
    const command = ['X', state.file.name + '.mrb', data.length].join(' ')
    send(state.gadget.serialport, command, data, event)
  })
})

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

function readmrb (file, build, cb) {
  const mrb = path.join(path.dirname(file), path.basename(file, path.extname(file)) + '.mrb')

  if (build) {
    const ps = spawn('mrbc', ['-g', path.resolve(file)])
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
