import React, { Component } from 'react'
import PreviewAce from './ace'
import style from './style'

class Preview extends Component {
  render() {
    return (
      <div>
        <header className={style.header}>Preview</header>
        <div className={style.ace}>
          <PreviewAce value={this.props.value} />
        </div>
        <footer className={style.footer}>footer</footer>
      </div>
    )
  }
}

export default Preview
