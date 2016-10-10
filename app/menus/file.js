import * as files from '../files'

export default {
  label: 'File',
  submenu: [{
    label: 'Open...',
    accelerator: 'CmdOrCtrl+O',
    click (item, focusedWindow) {
      files.open(focusedWindow)
    }
  }, {
    label: 'Save',
    accelerator: 'CmdOrCtrl+S',
    click (item, focusedWindow) {
      files.save(focusedWindow)
    }
  }, {
    label: 'Save As...',
    accelerator: 'Shift+CmdOrCtrl+S',
    click: function () {}
  }, {
    type: 'separator'
  }, {
    label: 'Export As HTML',
    click: function () {}
  }, {
    label: 'Export As PDF',
    click: function () {}
  }, {
    type: 'separator'
  }, {
    label: 'Print',
    accelerator: 'CmdOrCtrl+P',
    click: function () {}
  }]
}
