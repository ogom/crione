const { app, BrowserWindow, Menu, shell } = require('electron')
const menus = require('./menus')
const ipc = require('./ipc')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 1200, height: 800})
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus()))
  if (process.env.NODE_ENV == 'development') {
    mainWindow.webContents.openDevTools()
  }
  ipc()
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
