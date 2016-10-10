import React, { Component } from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/ruby'
import 'brace/theme/github'

class Editor extends Component {
  handleEditorChange(value) {
    this.props.onEditorChange(value)
  }

  render() {
    return (
      <AceEditor
        name='editor'
        mode='ruby'
        theme='github'
        width='100%'
        height='100%'
        tabSize={2}
        showPrintMargin={false}
        editorProps={{$blockScrolling: true}}
        value={this.props.value}
        onChange={this.handleEditorChange.bind(this)}
      />
    )
  }
}

export default Editor
