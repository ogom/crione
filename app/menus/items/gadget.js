const gadget = require('../../accepts/gadget')

module.exports = {
  label: 'Gadget',
  submenu: [
    {
      label: 'Connect',
      accelerator: 'CmdOrCtrl+K',
      click(item, focusedWindow) {
        gadget.connect(focusedWindow)
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Write',
      click(item, focusedWindow) {
        gadget.write(focusedWindow)
      }
    },
    {
      label: 'Run',
      accelerator: 'CmdOrCtrl+R',
      click(item, focusedWindow) {
        gadget.run(focusedWindow)
      }
    }
  ]
}
