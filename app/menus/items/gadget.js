import * as gadget from '../../actions/gadget'

export default {
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
