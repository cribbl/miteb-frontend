import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import IconDashboard from 'material-ui/svg-icons/action/dashboard'
import IconAnalytics from 'material-ui/svg-icons/editor/insert-chart'
import IconTest from 'material-ui/svg-icons/editor/mode-edit'
import IconProfile from 'material-ui/svg-icons/social/person'
import ComplaintIcon from 'material-ui/svg-icons/av/new-releases'

import { connect } from 'react-redux'
import { toggleActions } from '../../actions/toggleActions'

const drawerStyle = {
  height: 'calc(100% - 64px)',
  top: 64,
  width: 230,
  backgroundColor: '#424242'
}

const menuStyle = {
  maxWidth: 227
}

const menuItemStyle = {
  color: '#FFFFFF'
}

const active = {
  backgroundColor: '#323232'
}

class DrawerComponent extends Component {
  constructor (props) {
    super(props)
    this.menuItemClicked = this.menuItemClicked.bind(this)
    this.closeSideNav = this.closeSideNav.bind(this)

    this.state = {
      activeItem: ''
    }

    hashHistory.listen(location => {
      this.setState({ activeItem: location.pathname })
    })
  }

  closeSideNav () {
    const { dispatch } = this.props
    dispatch(toggleActions.closeSideNav())
  }

  menuItemClicked (event, menuItem, index) {
    console.log(index)
    if (this.props.isMobile) {
      const { dispatch } = this.props
      dispatch(toggleActions.closeSideNav())
    }
    hashHistory.push(menuItem.key)
  }

  render () {
    return (
      <div className='drawer-div'>

        <Drawer containerStyle={drawerStyle} open={this.props.openSideNav} className='drawer-div' docked={!this.props.isMobile} onRequestChange={this.closeSideNav}>

          <Menu style={menuStyle} onItemClick={this.menuItemClicked}>

            <MenuItem
              style={Object.assign(this.state.activeItem === '/dashboard' ? active : '', menuItemStyle)}
              key='/dashboard'
              primaryText='Dashboard'
              leftIcon={<IconDashboard color={'#FFFFFF'} />} />

            <MenuItem
              style={Object.assign(this.state.activeItem === '/dashboard/book_room' ? active : '', menuItemStyle)}
              key='/dashboard/book_room'
              primaryText='Room Booking'
              leftIcon={<IconTest color={'#FFFFFF'} />}
              hidden={this.props.user && !this.props.user.isClub} />

            <MenuItem
              style={Object.assign(this.state.activeItem.toLowerCase().indexOf('event') !== -1 ? active : '', menuItemStyle)}
              key='/dashboard/myEvents'
              primaryText='My Events'
              leftIcon={<IconAnalytics color={'#FFFFFF'} />} />

            {this.props.user && this.props.user.isSC
              ? <MenuItem
                style={Object.assign(this.state.activeItem === '/dashboard/approveClubs' ? active : '', menuItemStyle)}
                key='/dashboard/approveClubs'
                primaryText='Approve Clubs'
                leftIcon={<ActionCheckCircle color={'#FFFFFF'} />}
              />
              : null}

            {this.props.user && this.props.user.isSC
              ? <MenuItem
                style={Object.assign(this.state.activeItem === '/dashboard/viewComplaints' ? active : '', menuItemStyle)}
                key='/dashboard/viewComplaints'
                primaryText='View Complaints'
                leftIcon={<ComplaintIcon color={'#FFFFFF'} />}
              />
              : null}

            <MenuItem
              style={Object.assign(this.state.activeItem === '/dashboard/profile' ? active : '', menuItemStyle)}
              key='/dashboard/profile'
              primaryText='Profile'
              leftIcon={<IconProfile color={'#FFFFFF'} />} />

          </Menu>
        </Drawer>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { user } = state.authentication
  const { openSideNav, isMobile } = state.toggler
  return {
    openSideNav,
    isMobile,
    user
  }
}

export default connect(mapStateToProps)(DrawerComponent)
