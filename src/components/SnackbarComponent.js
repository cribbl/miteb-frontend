import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import { toggleActions } from '../actions/toggleActions'

class SnackbarComponent extends React.Component {
  constructor (props) {
    super(props)
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this)
    this.state = {
      message: props.toastMessage
    }
  }

  handleSnackBarClose () {
    const { dispatch } = this.props
    dispatch(toggleActions.toggleToaster('', false))
  }

  componentWillReceiveProps (newProps) {
    console.log(newProps)
  }

  render () {
    return (
      <span>
        <Snackbar
          open={this.props.toastOpen}
          message={this.props.toastMessage}
          autoHideDuration={3000}
          onRequestClose={this.handleSnackBarClose}
        />
      </span>
    )
  }
}

function mapStateToProps (state) {
  const { toastOpen, toastMessage, isMobile } = state.toggler
  return {
    toastOpen,
    toastMessage,
    isMobile
  }
}

export default connect(mapStateToProps)(SnackbarComponent)
