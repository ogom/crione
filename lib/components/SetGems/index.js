import React, { Component } from 'react'
import SplitPane from 'react-split-pane'
import Editor from '../../components/Editor'
import Preview from '../../components/Preview'
import style from './style'
import { ipcRenderer } from 'electron'
import fs from 'fs'

class SetGems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: ''
    }
  }

  componentDidMount() {
    ipcRenderer.on('selected-file', (e, fileName) => {
      this.loadFile(fileName)
    })

    ipcRenderer.on('save-file', (e) => {
      this.saveFile()
    })

    ipcRenderer.on('run-gadget', (e, raw) => {
      this.setState({data: raw})
    })

    ipcRenderer.on('gadget::dispatch', (e, action) => {
      ipcRenderer.send('gadget::notify', this.props, action)
    })
  }

  loadFile(fileName) {
    const fileCode = fs.readFileSync(fileName, 'utf8');
    this.props.actions.loadFile({fileName: fileName, fileCode: fileCode})
  }

  saveFile() {
    fs.writeFileSync(this.props.gem.fileName, this.props.gem.fileCode)
  }

  handleEditorChange(value) {
    this.props.actions.saveCode({fileCode: value})
  }

  render() {
    return (
      <div>
        <SplitPane split='vertical' defaultSize='50%' primary='second'>
          <div>
            <Editor
              fileName={this.props.gem.fileName}
              value={this.props.gem.fileCode}
              onEditorChange={this.handleEditorChange.bind(this)} />
          </div>
          <div>
            <Preview value={this.state.data} />
          </div>
        </SplitPane>
      </div>
    )
  }
}

export default SetGems
