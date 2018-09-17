import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import { toggleActions } from '../actions/toggleActions'

class SnackbarComponent extends React.Component {
  constructor (props) {
    super(props)
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this)
    this.state = {
    	message: props.toast_message
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
          open={this.props.toast_open}
          message={this.props.toast_message}
          autoHideDuration={3000}
          onRequestClose={this.handleSnackBarClose}
        />
      </span>
    )
  }
}

function mapStateToProps (state) {
  const { toast_open, toast_message, isMobile } = state.toggler
  return {
    toast_open,
    toast_message,
    isMobile
  }
}

export default connect(mapStateToProps)(SnackbarComponent)
