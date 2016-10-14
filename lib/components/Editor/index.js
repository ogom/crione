import React, { Component } from 'react'
import EditorAce from './ace'
import style from './style'

const home = process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME']
const reHome = new RegExp('^' + home)

class Editor extends Component {
  render() {
    return (
      <div>
        <header className={style.header}>
          File: {this.props.fileName.replace(reHome, '~')}
        </header>
        <div className={style.ace}>
          <EditorAce
            value={this.props.value}
            onEditorChange={this.props.onEditorChange} />
        </div>
        <footer className={style.footer}>footer</footer>
      </div>
    )
  }
}

export default Editor
