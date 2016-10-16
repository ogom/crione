import { ipcRenderer } from 'electron'

export default function ipc (store) {
  ipcRenderer.on('ipc::dispatch', (e, action) => {
    store.dispatch(action)
  })

  ipcRenderer.on('ipc::acceptAction', (e, action) => {
    ipcRenderer.send('ipc::nativeAction::' + action.type, store.getState(), action)
  })
}
