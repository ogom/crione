import { app } from 'electron'
const appName = app.getName()

export default {
  label: appName,
  submenu: [
    {
      label: 'About Crione',
      role: 'about'
    },
    {
      type: 'separator'
    },
    {
      role: 'services',
      submenu: []
    },
    {
      type: 'separator'
    },
    {
      role: 'hide'
    },
    {
      role: 'hideothers'
    },
    {
      role: 'unhide'
    },
    {
      type: 'separator'
    },
    {
      role: 'quit'
    }
  ]
}
