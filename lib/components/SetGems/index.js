import React, { Component } from 'react'
import Editor from '../../components/Editor'
import Preview from '../../components/Preview'
import style from './style'
import { ipcRenderer } from 'electron'
import fs from 'fs'

const home = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]
const reHome = new RegExp('^' + home)

class SetGems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: {},
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

    ipcRenderer.on('info-gadget', (e, info) => {
      this.setState({info: info})
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
        <header>
          <dl>
            <dt>File: {this.props.gem.fileName.replace(reHome, '~')}</dt>
            <dt>citrus: {this.state.info.citrus}</dt>
            <dt>mruby: {this.state.info.mruby}</dt>
          </dl>
        </header>
        <div className={style.main}>
          <article>
            <Editor
              value={this.props.gem.fileCode}
              onEditorChange={this.handleEditorChange.bind(this)} />
          </article>
          <aside>
            <Preview
              value={this.state.data} />
          </aside>
        </div>
        <footer>footer</footer>
      </div>
    )
  }
}

export default SetGems
