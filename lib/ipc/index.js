import { ipcRenderer } from 'electron'

export default function ipc (store) {
  ipcRenderer.on('ipc::dispatch', (e, action) => {
    store.dispatch(action)
  })

  ipcRenderer.on('ipc::getState', (e, action) => {
    ipcRenderer.send('ipc::' + action.type, store.getState(), action)
  })
}
