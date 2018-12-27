import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import { connect } from 'react-redux'

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

class Dialogxx extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: this.props.open
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ open: nextProps.open })
  }
  handleFileDownload (file) {
    window.open(file)
  }
  renderLocation (location) {
    if (location) {
      return (<div>
        {
          Object.keys(location).map((key, index) => (
            <p key={index}> {key} </p>
          ))
        }
      </div>)
    } else return <div />
  }
  renderPosters () {
    return (<div>
      {this.props.currentEvent.files.map(file =>
        <Avatar
          src={file}
          size={100}
          onClick={this.handleFileDownload.bind(this, file)}
        />
      ) }
    </div>)
  }
  render () {
    console.log(this.props.currentEvent)
    const FAActions = [
      <FlatButton
        label='Cancel'
        primary={false}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label='Reject'
        primary={false}
        onClick={() => this.props.flagRejectHandler(this.props.currentEvent, 'reject')}
      />,
      <FlatButton
        label='Flag'
        primary
        onClick={() => this.props.flagRejectHandler(this.props.currentEvent, 'flag')}
      />,
      <FlatButton
        label='Approve'
        primary
        onClick={() => this.props.approveHandler(this.props.currentEvent)}
      />,
      <FlatButton
        label='Next'
        primary
        onClick={this.props.nextEvent}
      />
    ]

    const ClubActions = [
      <FlatButton
        label='Cancel'
        primary={false}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label='Next'
        primary
        onClick={this.props.nextEvent}
      />,
      <FlatButton
        label='Download Receipt'
        primary
        hidden={!this.props.currentEvent.receiptURL}
        onClick={() => { window.location = (this.props.currentEvent.receiptURL) }}
      />
    ]

    return (
      <div>
        <Dialog
          title={this.props.currentEvent.clubName}
          actions={this.props.user && this.props.user.isClub ? ClubActions : FAActions}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
          autoScrollBodyContent
          contentStyle={{ width: this.props.isMobile ? '97%' : '60%' }}
          actionsContainerStyle={{ backgroundColor: 'rgb(248, 248, 248)' }}
          titleStyle={{ backgroundColor: 'rgb(240, 240, 240)', fontWeight: 700 }}
          bodyStyle={{ marginTop: 15 }}
        >
          <div>
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>Title</p>
              <p style={styles.value}>{this.props.currentEvent.title}</p>
            </div>
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>Start Date</p>
              <p style={styles.value}>{this.props.currentEvent.startDate}</p>
            </div>
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>End Date</p>
              <p style={styles.value}>{this.props.currentEvent.endDate}</p>
            </div>
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>Booker Name</p>
              <p style={styles.value}>{this.props.currentEvent.bookerFields && this.props.currentEvent.bookerFields.booker_name}</p>
            </div>
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>Booker Email</p>
              <p style={styles.value}>{this.props.currentEvent.bookerFields && this.props.currentEvent.bookerFields.booker_email}</p>
            </div>
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>Booker Contact</p>
              <p style={styles.value}>{this.props.currentEvent.bookerFields && this.props.currentEvent.bookerFields.booker_contact}</p>
            </div>
            <div hidden={!(this.props.currentEvent.Poster)} style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>Poster</p>
              <p style={styles.value}>{this.renderLocation(this.props.currentEvent.Poster)} </p>
            </div>
            <div hidden={!(this.props.currentEvent.Poster)} style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              {this.props.currentEvent.files && this.renderPosters()}
            </div>

            <div hidden={!(this.props.currentEvent['Digital Board'])} style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>Digital Board</p>
              <p style={styles.value}>{this.renderLocation(this.props.currentEvent['Digital Board'])} </p>
            </div>

            <div hidden={!(this.props.currentEvent.InfoDesk)} style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>InfoDesk</p>
              <p style={styles.value}>{this.renderLocation(this.props.currentEvent.InfoDesk)} </p>
            </div>
            <div hidden={!(this.props.currentEvent.Banner)} style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>Banner</p>
              <p style={styles.value}>{this.renderLocation(this.props.currentEvent.Banner)} </p>
            </div>

            <div hidden={!((this.props.currentEvent.FA_appr === 'flagged') || (this.props.currentEvent.FA_appr === 'rejected'))} style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>{this.props.currentEvent.FA_appr} by FA</p>
              <p style={styles.value}>{this.props.currentEvent.FA_msg}</p>
            </div>
            <div hidden={!((this.props.currentEvent.AD_appr === 'flagged') || (this.props.currentEvent.AD_appr === 'rejected'))} style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>{this.props.currentEvent.AD_appr} by AD</p>
              <p style={styles.value}>{this.props.currentEvent.AD_msg}</p>
            </div>
            <div hidden={!((this.props.currentEvent.SO_appr === 'flagged') || (this.props.currentEvent.SO_appr === 'rejected'))} style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>{this.props.currentEvent.SO_appr} by SO</p>
              <p style={styles.value}>{this.props.currentEvent.SO_msg}</p>
            </div>

          </div>

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
    isMobile,
  }
}

export default connect(mapStateToProps)(Dialogxx)
