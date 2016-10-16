import React, { Component } from 'react'
import SetGems from '../../components/SetGems'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'

class App extends Component {
  render() {
    return (
      <div>
        <SetGems
          actions={this.props.actions}
          file={this.props.file}
          gadget={this.props.gadget}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    file: state.file,
    gadget: state.gadget
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
