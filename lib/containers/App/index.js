import React, { Component } from 'react'
import SetGems from '../../components/SetGems'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'

class App extends Component {
  render() {
    const { actions, gem } = this.props
    return (
      <div>
        <SetGems
          actions={actions}
          gem={gem}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    gem: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
