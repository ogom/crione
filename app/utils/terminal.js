import setgem from 'setgem'

const client = setgem.createClient({
  serialport: {
    port: '/dev/cu.usbmodem1_1',
    options: {
      baudRate: 9600,
      dataBits: 8,
      parity: 'none',
      stopBits: 1
    }
  }
})

export function info (focusedWindow) {
  client.citrus.info((err, res) => {
    focusedWindow.webContents.send('info-gadget', res)
  })
}

export function send (event, command, data) {
  var SerialPort = require('serialport');
  var reGT = new RegExp(/\r\n>$/);
  var reWaiting = new RegExp(/\r\nWaiting/);
  var reOutput = new RegExp(/^R|^W|^L/);

  var buffer = [];
  var writing = true;
  var options = {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1
  }

  var port = new SerialPort('/dev/cu.usbmodem1_1', options)

  port.on('data', function(chunk) {
    buffer.push(chunk);
    var raw = buffer.join('');
    event.sender.send('run-gadget', raw)

    if (reGT.test(raw)) {
      port.close();
    }

    if (reWaiting.test(raw) && writing) {
      writing = false;
      port.write(data);
    }

    if (reOutput.test(command)) {
      //process.stdout.write(chunk.toString());
    }
  });

  port.on('error', function(err) {

  });

  port.on('open', function(err) {
    port.write(command + '\n');
  });
}
