import React, { Component } from 'react'
import FaceIcon from 'material-ui/svg-icons/action/face'
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app'
import HomeIcon from 'material-ui/svg-icons/action/home'
import ComplaintIcon from 'material-ui/svg-icons/av/new-releases'
import Divider from 'material-ui/Divider'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Avatar from 'material-ui/Avatar'

import { connect } from 'react-redux'
import { userActions } from '../../actions/userActions'
import { toggleActions } from '../../actions/toggleActions'
import { hashHistory } from 'react-router'

class ProfileMenu extends Component {
  constructor (props) {
    super(props)
    this.menuItemClicked = this.menuItemClicked.bind(this)
  }

  menuItemClicked (event, menuItem, index) {
    const { dispatch } = this.props
    dispatch(toggleActions.closeProfileMenu())
    if (menuItem.key === 'logout') {
      dispatch(userActions.logout())
    } else { hashHistory.push(menuItem.key) }
  }

  render () {
    const Hihi = () => {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <Avatar
              src={this.props.user.profilePicURL ? this.props.user.profilePicURL : this.props.user.isClub ? require('../../assets/clubDefaultProfilePicture.jpeg') : require('../../assets/personDefaultProfilePic.png')}
              size={70} />
          </div>
          <div style={{ textAlign: 'center', color: 'black', width: '100%' }}>
            <p style={{ height: 10 }}>{this.props.user.name}</p>
            <p style={{ height: 60, color: 'grey', fontSize: 15, lineHeight: 5 }}>{this.props.user.email}</p>
          </div>
        </div>
      )
    }
    return (
      <Popover
        open={this.props.open}
        anchorEl={this.props.anchorEl}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        onRequestClose={this.props.onRequestClose}
        animation={PopoverAnimationVertical}>
        <Menu onItemClick={this.menuItemClicked} style={{ maxWidth: 350 }}>
          {this.props.user &&
            <MenuItem key='/dashboard'>
              <Hihi />
            </MenuItem>
          }

          <Divider hidden={!this.props.isMobile || !this.props.user} />

          <MenuItem
            key='/'
            primaryText='Home'
            leftIcon={<HomeIcon />}
            hidden={!this.props.isMobile}
          />

          <Divider hidden={!this.props.isMobile} />

          <MenuItem
            key='/complaints'
            primaryText='Complaints'
            leftIcon={<ComplaintIcon />}
            hidden={!this.props.isMobile}
          />

          <Divider hidden={!this.props.isMobile || this.props.user} />

          <MenuItem
            key='/auth'
            primaryText='Login'
            leftIcon={<FaceIcon />}
            hidden={!this.props.isMobile || this.props.user} />

          <Divider hidden={!this.props.user} />

          <MenuItem key='logout' primaryText='Logout' leftIcon={<LogoutIcon />} hidden={!this.props.user} />

        </Menu>
      </Popover>
    )
  }
}

function mapStateToProps (state) {
  const { user } = state.authentication
  const { isMobile } = state.toggler
  return {
    user,
    isMobile
  }
}

export default connect(mapStateToProps)(ProfileMenu)
