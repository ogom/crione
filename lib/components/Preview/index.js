import React, { Component } from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/ruby'
import 'brace/theme/github'

class Preview extends Component {
  render() {
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
        highlightActiveLine={false}
        readOnly={true}
        editorProps={{$blockScrolling: true}}
        value={this.props.value}
      />
    )
  }
}

export default Preview
