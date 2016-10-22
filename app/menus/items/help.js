const { shell } = require('electron')

module.exports = {
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
