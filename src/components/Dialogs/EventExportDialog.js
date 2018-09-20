import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import moment from 'moment'
import DatePicker from 'material-ui/DatePicker'
import { exportEvents } from '../../Services/firebaseStorageService'

class EventExportDialog extends Component {
  constructor (props) {
    super(props)
    this.handleRadio = this.handleRadio.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.handleStartDate = this.handleStartDate.bind(this)
    this.handleEndDate = this.handleEndDate.bind(this)
    this.export = this.export.bind(this)
    this.state = {
      exportMode: 'CUSTOM',
      startDate: null,
      endDate: null
    }
  }

  handleRadio (e) {
    this.setState({ exportMode: e.target.value })
  }

  formatDate (date) {
    return moment(date).format('DD MMM YYYY')
  }

  handleStartDate (event, startDate) {
    this.setState({ startDate: startDate })
  }

  handleEndDate (event, endDate) {
    this.setState({ endDate: endDate })
  }

  export () {
    const { dispatch } = this.props
    dispatch({ type: 'TOASTER', message: 'Events will be expoted shortly!', toastOpen: true })
    this.props.handleClose()
    exportEvents(this.props.view, this.props.user.uid, this.state.exportMode, moment(this.state.startDate).format('DD-MM-YYYY'), moment(this.state.endDate).format('DD-MM-YYYY'))
      .then(res => {
        // dispatch({type: "TOASTER", message: "Sheet downloaded", toastOpen: true})
      })
  }

  render () {
    const viewActions = [
      <FlatButton
        label='Cancel'
        primary={false}
        onClick={this.props.handleClose}
        style={{ margin: '0px 5px' }}
      />,
      <RaisedButton
        label={'Export'}
        primary
        onClick={this.export}
        style={{ margin: '0px 5px' }}
      />
    ]

    return (
      <Dialog
        title={'Export ' + this.props.titleText}
        actions={viewActions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.handleClose}
        autoScrollBodyContent
        contentStyle={{ width: this.props.isMobile ? '97%' : '30%', maxWidth: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        actionsContainerStyle={{ backgroundColor: 'rgb(248, 248, 248)' }}
        titleStyle={{ backgroundColor: 'rgb(240, 240, 240)' }}
        bodyStyle={{ marginTop: 15 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <RadioButtonGroup
              name='Workshop'
              defaultSelected={this.state.exportMode}
              onChange={this.handleRadio}
              style={{ display: 'flex', margin: 20 }}>
              <RadioButton
                value='CUSTOM'
                label='Custom'
                labelStyle={{ width: '100%' }}
                style={{ width: '40%' }}
              />

              <RadioButton
                value='ALL'
                label='All'
                labelStyle={{ width: '100%' }}
                style={{ width: '40%' }}
              />
            </RadioButtonGroup>
          </div>
          <div style={{ display: 'flex' }}>
            <DatePicker
              floatingLabelText='From'
              mode={this.props.isMobile ? 'portrait' : 'landscape'}
              autoOk
              onChange={this.handleStartDate}
              value={this.state.startDate}
              disableYearSelection
              formatDate={this.formatDate}
              errorStyle={{ position: 'absolute', bottom: -8 }}
              disabled={this.state.exportMode === 'ALL'}
              required={this.state.exportMode !== 'ALL'}
              textFieldStyle={{ width: '60%' }}
            />

            <DatePicker
              floatingLabelText='To'
              mode={this.props.isMobile ? 'portrait' : 'landscape'}
              autoOk
              onChange={this.handleEndDate}
              value={this.state.endDate}
              disableYearSelection
              minDate={this.state.startDate}
              formatDate={this.formatDate}
              errorStyle={{ position: 'absolute', bottom: -8 }}
              disabled={this.state.exportMode === 'ALL'}
              required={this.state.exportMode !== 'ALL'}
              textFieldStyle={{ width: '60%' }}
            />

          </div>
        </div>
      </Dialog>
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
export default connect(mapStateToProps)(EventExportDialog)
