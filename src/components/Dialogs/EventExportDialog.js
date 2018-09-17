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
      start_date: null,
      end_date: null
    }
  }

  handleRadio (e) {
    this.setState({ exportMode: e.target.value })
  }

  formatDate (date) {
    return moment(date).format('DD MMM YYYY')
  }

  handleStartDate (event, start_date) {
    this.setState({ start_date: start_date })
  }

  handleEndDate (event, end_date) {
    this.setState({ end_date: end_date })
  }

  export () {
  	const { dispatch } = this.props
  	dispatch({ type: 'TOASTER', message: 'Events will be exported shortly!', toast_open: true })
  	this.props.handleClose()
  	exportEvents(this.props.view, this.props.user.uid, this.state.exportMode, moment(this.state.start_date).format('DD-MM-YYYY'), moment(this.state.end_date).format('DD-MM-YYYY'))
  	.then(res => {
  		// dispatch({type: "TOASTER", message: "Sheet downloaded", toast_open: true})
  	})
  }

  render () {
    const styles = {
		  label: {
		    maxWidth: '30%',
		    width: '30%',
		    display: 'inline-block',
		    padding: 7
		  },

		  value: {
		    width: '70%',
		    display: 'inline-block',
		    padding: 7
		  }
    }

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
        bodyStyle={{ marginTop: 15 }}
	    >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <RadioButtonGroup style={{ margin: 20 }}
              name='Workshop'
              defaultSelected={this.state.exportMode}
              onChange={this.handleRadio}
              style={{ display: 'flex' }}>
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
              value={this.state.start_date}
              disableYearSelection
              formatDate={this.formatDate}
              errorStyle={{ position: 'absolute', bottom: -8 }}
              disabled={this.state.exportMode === 'ALL'}
              required={this.state.exportMode != 'ALL'}
              textFieldStyle={{ width: '60%' }}
            />

            <DatePicker
              floatingLabelText='To'
              mode={this.props.isMobile ? 'portrait' : 'landscape'}
              autoOk
              onChange={this.handleEndDate}
              value={this.state.end_date}
              disableYearSelection
              minDate={this.state.start_date}
              formatDate={this.formatDate}
              errorStyle={{ position: 'absolute', bottom: -8 }}
              disabled={this.state.exportMode === 'ALL'}
              required={this.state.exportMode != 'ALL'}
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
