import { shell } from 'electron'

export default {
  label: 'Help',
  role: 'help',
  submenu: [
    {
      label: 'Learn More',
      click() {
        shell.openExternal('https://github.com/ogom/crione')
      }
    }
  ]
}
