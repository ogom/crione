import { app, BrowserWindow, Menu, shell } from 'electron'
import menus from './menus'

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 1200, height: 600})
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus()))
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
