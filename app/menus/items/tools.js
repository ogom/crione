const tools = require('../../accepts/tools')
const gadget = require('../../accepts/gadget')

module.exports = {
  label: 'Tools',
  submenu: [
    {
      label: 'mruby',
      submenu: [
        {
          label: 'mrbc',
          click(item, focusedWindow) {
            tools.selectMrbc(focusedWindow)
          }
        }
      ]
    },
    {
      type: 'separator'
    },
    {
      label: 'Build',
      accelerator: 'CmdOrCtrl+B',
      click(item, focusedWindow) {
        gadget.build(focusedWindow)
      }
    }
  ]
}
