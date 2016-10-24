import React, { Component } from 'react'
import PreviewAce from './ace'
import style from './style.css'

class Preview extends Component {
  title() {
    const {connection} = this.props
    let value = 'No connection'
    if (Object.prototype.toString.call(connection.serialport) === '[object Object]') {
      value = `port: ${connection.serialport.port}`
      if (Object.prototype.toString.call(connection.gadget.version) === '[object Object]') {
        value += `, citrus: ${connection.gadget.version.citrus}`
        value += `, mruby: ${connection.gadget.version.mruby}`
      }
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
