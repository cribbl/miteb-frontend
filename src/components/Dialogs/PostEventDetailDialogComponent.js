import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'

class PostEventDetailDialog extends Component {
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
        label={'Submit'}
        primary
        onClick={() => this.props.uploadPostEventDetail(this.props.currentEvent, this.state.message)}
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

          <textarea rows={5} style={{ width: '100%', padding: 5 }} onChange={this.changeMessage} value={this.state.message} placeholder={'Please add description of ' + (this.props.currentEvent.title)} />

        </Dialog>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { isMobile } = state.toggler
  const { user } = state.authentication
  return {
    user,
    isMobile
  }
}

export default connect(mapStateToProps)(PostEventDetailDialog)
