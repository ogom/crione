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
          connection={this.props.connection}
          tools={this.props.tools}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    file: state.file,
    connection: state.connection,
    tools: state.tools,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
