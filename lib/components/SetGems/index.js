import React, { Component } from 'react'
import style from './style'

class SetGems extends Component {
  constructor(props) {
    super(props)
    this.state = {data: []}
  }

  render() {
    return (
      <div>
        <header>header</header>
        <div className={style.main}>
          <article>article</article>
          <nav>nav</nav>
          <aside>aside</aside>
        </div>
        <footer>footer</footer>
      </div>
    )
  }
}

export default SetGems
