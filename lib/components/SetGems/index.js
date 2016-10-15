import React, { Component } from 'react'
import SplitPane from 'react-split-pane'
import Editor from '../../components/Editor'
import Preview from '../../components/Preview'
import style from './style'
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
    this.props.actions.saveEdit(value)
  }

  render() {
    return (
      <div>
        <SplitPane split='vertical' defaultSize='50%' primary='second'>
          <div>
            <Editor
              title={this.props.file.title}
              value={this.props.file.value}
              onEditorChange={this.handleEditorChange.bind(this)} />
          </div>
          <div>
            <Preview
              version={this.props.gadget.version}
              value={this.state.value} />
          </div>
        </SplitPane>
      </div>
    )
  }
}

export default SetGems
