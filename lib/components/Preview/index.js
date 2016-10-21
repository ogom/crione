import React, { Component } from 'react'
import PreviewAce from './ace'
import style from './style.css'

class Preview extends Component {
  title() {
    const {version} = this.props
    let value = 'No connection'
    if (Object.prototype.toString.call(version) === '[object Object]') {
      value = `GR-CITRUS citrus: ${version.citrus} mruby: ${version.mruby}`
    }
    return value
  }

  render() {
    return (
      <div>
        <header className={style.header}>{this.title()}</header>
        <div className={style.ace}>
          <PreviewAce value={this.props.value} />
        </div>
        <footer className={style.footer}>Type a command ...</footer>
      </div>
    )
  }
}

export default Preview
