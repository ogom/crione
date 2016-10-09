import React, { Component } from 'react'
import SetGems from '../../components/SetGems'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'

class App extends Component {
  render() {
    const { data, actions } = this.props
    return (
      <div>
        <SetGems
          data={data}
          actions={actions}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
