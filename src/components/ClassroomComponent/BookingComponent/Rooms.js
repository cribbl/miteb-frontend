import React, { Component } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'

class RoomsContainer extends Component {
  constructor (props) {
    super(props)
    this.handleRoomSelection = this.handleRoomSelection.bind(this)
    this.state = {
      selectedRooms: this.props && this.props.selectedRooms,
      takenRooms: this.props && this.props.takenRooms,
      bookedRooms: [3202, 3205]
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.takenRooms) {
      let selRooms = this.state.selectedRooms
      for (let room of newProps.takenRooms) {
        if ((selRooms).includes(room)) {
          let index = selRooms.indexOf(room)
          selRooms.splice(index, 1)
        }
      }
      this.setState({ takenRooms: newProps.takenRooms, selectedRooms: selRooms })
    }
  }

  handleRoomSelection (id) {
    let temp = this.state.selectedRooms

    if (temp.includes(id)) {
      let index = temp.indexOf(id)
      temp.splice(index, 1)
    } else {
      if (temp.length >= 3) {
        const { dispatch } = this.props
        dispatch({ type: 'TOASTER', message: 'Maximum 3 rooms allowed at once!', toastOpen: true })
        return
      }
      temp.push(id)
    }
    this.setState({ selectedRooms: temp })
    this.props.handleSelectedRooms(temp)
  }

  render () {
    const styles = {
      paper: {
        minHeight: 300,
        marginTop: 20,
        display: 'flex',
        flexDirection: this.props.isMobile ? 'column' : 'row',
        justifyContent: this.props.isMobile ? 'start' : 'space-between',
        alignItems: !this.props.datesSelected || this.props.fetchingRooms ? 'center' : ''
      },
      roomButton: {
        minWidth: 0,
        height: 30,
        lineHeight: '14px'
      },
      roomButtonLabel: {
        margin: 0,
        padding: this.props.isMobile ? 6 : 12
      },
      buttonsRow: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '4px 0px'
      }
    }

    const MyRaisedButton = (props) => {
      var scope = this
      let label
      switch (props.id) {
        case 53101: label = '310 A'; break
        case 53102: label = '310 B'; break
        default: label = (props.id) % 1000
      }
      return (
        <RaisedButton
          label={label}
          style={styles.roomButton}
          labelStyle={styles.roomButtonLabel}
          disabledBackgroundColor={'#FAE0DE'}
          disabled={(scope.state.takenRooms).includes(props.id) || (scope.state.bookedRooms).includes(props.id)}
          primary={(scope.state.selectedRooms).includes(props.id)}
          onClick={() => this.handleRoomSelection(props.id)}
        />
      )
    }

    if (!this.props.datesSelected) {
      return (
        <Paper style={styles.paper} zDepth={1}>
          <div style={{ width: '100%' }}>
            <p>Please select date</p>
          </div>
        </Paper>
      )
    } else if (this.props.fetchingRooms) {
      return (
        <Paper style={styles.paper} zDepth={1}>
          <div style={{ width: '100%' }}>
            <CircularProgress size={60} />
          </div>
        </Paper>
      )
    } else {
      return (
        <Paper style={styles.paper} zDepth={1}>

          <div style={{ width: this.props.isMobile ? '100%' : '35%', backgroundColor: '', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
            <h4>NLH</h4>
            {/* <div style={styles.buttonsRow}>
              <MyRaisedButton id={3102} />
              <MyRaisedButton id={3103} />
              <MyRaisedButton id={3104} />
              <MyRaisedButton id={3105} />
            </div> */}
            <div style={styles.buttonsRow}>
              <MyRaisedButton id={3202} />
              {/* <MyRaisedButton id={3203} /> DIRECTOR */}
              <MyRaisedButton id={3204} />
              <MyRaisedButton id={3205} />
            </div>
            <div style={styles.buttonsRow}>
              {/* <MyRaisedButton id={3302} /> PARIKSHIT */}
              <MyRaisedButton id={3303} />
              <MyRaisedButton id={3304} />
              <MyRaisedButton id={3305} />
            </div>
            <div style={styles.buttonsRow}>
              <MyRaisedButton id={3402} />
              <MyRaisedButton id={3403} />
              <MyRaisedButton id={3404} />
              <MyRaisedButton id={3405} />
            </div>
          </div>

          <div style={{ display: this.props.isMobile ? 'none' : '', height: 300, border: '1px solid lightgrey' }} />

          <div style={{ width: this.props.isMobile ? '100%' : '63%', backgroundColor: '', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
            <h4>AB-5</h4>
            <div style={styles.buttonsRow}>
              <MyRaisedButton id={5201} />
              <MyRaisedButton id={5202} />
              <MyRaisedButton id={5203} />
              <MyRaisedButton id={5205} />
              <MyRaisedButton id={5206} />
              {/* <MyRaisedButton id={5207} /> SC */}
              <MyRaisedButton id={5208} />
            </div>
            <div style={styles.buttonsRow}>
              <MyRaisedButton id={5209} />
              <MyRaisedButton id={5210} />
              <MyRaisedButton id={5211} />
              <MyRaisedButton id={5212} />
              <MyRaisedButton id={5301} />
              <MyRaisedButton id={5302} />
              <MyRaisedButton id={5303} />
            </div>
            <div style={styles.buttonsRow}>
              <MyRaisedButton id={5304} />
              <MyRaisedButton id={5305} />
              <MyRaisedButton id={5306} />
              <MyRaisedButton id={5307} />
              <MyRaisedButton id={5308} />
              <MyRaisedButton id={5309} />
              <MyRaisedButton id={53101} />
            </div>
            <div style={styles.buttonsRow}>
              <MyRaisedButton id={53102} />
              <MyRaisedButton id={5311} />
              <MyRaisedButton id={5312} />
              <MyRaisedButton id={5313} />
              <MyRaisedButton id={5314} />
              <MyRaisedButton id={5315} />
              <MyRaisedButton id={5316} />
            </div>
            <div style={styles.buttonsRow}>
              <MyRaisedButton id={5317} />
              <MyRaisedButton id={5318} />
              <MyRaisedButton id={5401} />
              <MyRaisedButton id={5402} />
              <MyRaisedButton id={5403} />
              <MyRaisedButton id={5404} />
              <MyRaisedButton id={5405} />
            </div>
            <div style={styles.buttonsRow}>
              <MyRaisedButton id={5406} />
              <MyRaisedButton id={5407} />
              <MyRaisedButton id={5408} />
              <MyRaisedButton id={5409} />
              <MyRaisedButton id={5410} />
              <MyRaisedButton id={5411} />
              <MyRaisedButton id={5501} />
            </div>
            <div style={styles.buttonsRow}>
              <MyRaisedButton id={5502} />
              <MyRaisedButton id={5503} />
              <MyRaisedButton id={5504} />
              <MyRaisedButton id={5505} />
              <MyRaisedButton id={5506} />
              <MyRaisedButton id={5507} />
              <MyRaisedButton id={5508} />
            </div>
          </div>
        </Paper>
      )
    }
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

export default connect(mapStateToProps)(RoomsContainer)
