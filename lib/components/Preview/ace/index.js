import React, { Component } from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/ruby'
import 'brace/theme/github'

class PreviewAce extends Component {
  handleEditorLoad(editor) {
    this.editor=editor
  }

  render() {
    if (this.editor) {
      const count = this.editor.session.getLength()
      this.editor.gotoLine(count, 0)
    }

    return (
      <AceEditor
        name='preview'
        mode='ruby'
        theme='github'
        width='100%'
        height='100%'
        tabSize={2}
        showGutter={false}
        showPrintMargin={false}
        readOnly={true}
        editorProps={{$blockScrolling: true}}
        value={this.props.value}
        setOptions={{cursorStyle: 'slim'}}
        onLoad={this.handleEditorLoad.bind(this)}
      />
    )
  }
}

export default PreviewAce
