import React, { Component } from 'react'
import Editor from '../../components/Editor'
import style from './style'
import { ipcRenderer } from 'electron'
import fs from 'fs'

class SetGems extends Component {
  componentDidMount() {
    ipcRenderer.on('selected-file', (e, fileName) => {
      this.loadFile(fileName)
    })

    ipcRenderer.on('save-file', (e) => {
      this.saveFile()
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
        <header>File: {this.props.gem.fileName}</header>
        <div className={style.main}>
          <article>
            <Editor
              value={this.props.gem.fileCode}
              onEditorChange={this.handleEditorChange.bind(this)} />
          </article>
          <nav>nav</nav>
          <aside>aside</aside>
        </div>
        <footer>footer</footer>
      </div>
    )
  }
}

export default SetGems
