import React, { Component } from 'react'
import style from './style'

class SetGems extends Component {
  constructor(props) {
    super(props)
    this.state = {data: []}
  }

  render() {
    return (
      <div className={style.normal}>
        <h1>SetGems</h1>
      </div>
    )
  }
}

export default SetGems
