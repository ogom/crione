import React, { Component } from 'react'
import SplitPane from 'react-split-pane'
import Editor from '../../components/Editor'
import Preview from '../../components/Preview'
import style from './style.css'
import { ipcRenderer } from 'electron'

class SetGems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    ipcRenderer.on('ipc::sendGadget', (e, raw) => {
      this.setState({value: raw})
    })
  }

  handleEditorChange(value) {
    this.props.actions.attachFile(value)
  }

  render() {
    return (
      <div>
        <SplitPane split='vertical' defaultSize='50%' primary='second'>
          <div>
            <Editor
              title={this.props.file.title}
              value={this.props.file.value}
              mrbc={this.props.tools.mrbc}
              onEditorChange={this.handleEditorChange.bind(this)} />
          </div>
          <div>
            <Preview
              connection={this.props.connection}
              value={this.state.value} />
          </div>
        </SplitPane>
      </div>
    )
  }
}

export default SetGems
