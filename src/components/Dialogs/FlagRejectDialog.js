import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'

class FlagRejectDialog extends Component {
  constructor (props) {
    super(props)
    this.changeMessage = this.changeMessage.bind(this)
    this.state = {
      open: this.props.open,
      message: ''
    }
  }

  changeMessage (e) {
    this.setState({ message: e.target.value })
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    this.setState({ open: nextProps.open, message: '' })
  }

  render () {
    const flagActions = [
      <FlatButton
        label='Cancel'
        primary={false}
        onClick={this.props.handleClose}
        style={{ margin: '0px 5px' }}
      />,
      <RaisedButton
        label={this.props.mode === 'flag' ? 'Flag' : 'Reject'}
        primary
        onClick={() => this.props.flagRejectHandler(this.props.currentEvent, this.state.message, this.props.mode)}
        style={{ margin: '0px 5px' }}
        disabled={this.state.message.length < 1}
      />
    ]

    return (
      <div>
        <Dialog
          title={this.props.currentEvent.title}
          actions={flagActions}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
          autoScrollBodyContent
          contentStyle={{ width: this.props.isMobile ? '97%' : '40%' }}
          actionsContainerStyle={{ backgroundColor: 'rgb(248, 248, 248)' }}
          titleStyle={{ backgroundColor: 'rgb(240, 240, 240)' }}
          bodyStyle={{ marginTop: 15 }}
        >

          <textarea rows={5} style={{ width: '100%', padding: 5 }} onChange={this.changeMessage} value={this.state.message} placeholder={'Please mention the reason to ' + (this.props.mode) + ' the event'} />

        </Dialog>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { openSideNav, isMobile, filter } = state.toggler
  const { user, verified, vals } = state.authentication
  return {
    user,
    openSideNav,
    verified,
    isMobile,
    vals,
    filter
  }
}

export default connect(mapStateToProps)(FlagRejectDialog)
