import React, { Component } from 'react'
import { connect } from 'react-redux'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { firebaseDB } from '../../firebaseConfig'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import CardComponent from './CardComponent'

class DevelopersComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      developers: []
    }
  }

  componentWillMount () {
    var scope = this
    firebaseDB.ref('developers').orderByChild('pos').once('value',
      function (snapshot) {
        snapshot.forEach(child => {
          let developer = child.val()
          const developers = scope.state.developers
          developer['key'] = child.key
          developers.push(developer)
          scope.setState({ developers })
        })
      })
  }

  render () {
    return (
      <div style={{ padding: 20 }}>
        <h1 style={{ textAlign: 'center', fontWeight: 700 }}>OUR TEAM</h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: this.props.isMobile ? 'column' : 'row', maxWidth: '100%', flexWrap: 'wrap' }}>
          {
            this.state.developers.length > 0 ? (this.state.developers.map(function (developer, index) {
              if (!developer.openPosition) {
                return (
                  <CardComponent developer={developer} key={index} />
                )
              }
            }, this)) : <p>Fetching Developers</p>
          }
        </div>

        <h1 hidden={this.state.developers.length <= 0} style={{ textAlign: 'center', marginTop: 50 }}>OPEN POSITIONS</h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: this.props.isMobile ? 'column' : 'row', maxWidth: '100%', flexWrap: 'wrap' }}>
          {
            this.state.developers.length > 0 ? (this.state.developers.map(function (developer, index) {
              if (developer.openPosition) {
                return (
                  <CardComponent developer={developer} key={index} />
                )
              }
            }, this)) : null
          }
        </div>

      </div>
    )
  }
}

function mapStateToProps (state) {
  const { openSideNav, isMobile } = state.toggler
  const { user, verified } = state.authentication
  return {
    user,
    openSideNav,
    verified,
    isMobile
  }
}

export default connect(mapStateToProps)(DevelopersComponent)
