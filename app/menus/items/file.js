const file = require('../../actions/file')

module.exports = {
  label: 'File',
  submenu: [
    {
      label: 'Open...',
      accelerator: 'CmdOrCtrl+O',
      click(item, focusedWindow) {
        file.open(focusedWindow)
      }
    },
    {
      label: 'Save',
      accelerator: 'CmdOrCtrl+S',
      click(item, focusedWindow) {
        file.save(focusedWindow)
      }
    },
    {
      label: 'Save As...',
      accelerator: 'Shift+CmdOrCtrl+S',
      click(item, focusedWindow) {
        file.saveAs(focusedWindow)
      }
    }
  ]
}
