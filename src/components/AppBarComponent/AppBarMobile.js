import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import AvatarIcon from 'material-ui/svg-icons/navigation/expand-more'
import FaceIcon from 'material-ui/svg-icons/action/face'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app'

import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import axios from 'axios';
import { Link, hashHistory } from 'react-router'
import DrawerComponent from './../DrawerComponent/DrawerComponent'

import {connect} from 'react-redux'
import { userActions } from '../../actions/userActions'
import { toggleActions } from '../../actions/toggleActions'

import ProfileMenu from './ProfileMenu'

  const MyTitle = () => (
    <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
    <h2 style={{alignSelf: 'center', marginTop: 11}}><Link to="/" style={{color: 'white'}}>Portal</Link></h2>
    </div>
  )

class AppBarComponent extends Component {
  constructor (props) {
    super(props)
    this.changeProfileMenu = this.changeProfileMenu.bind(this);
    this.changeDrawerOpen = this.changeDrawerOpen.bind(this);
    
    this.state = {
      drawerOpen: false,
      profileMenuOpen: false,
      showMenuIcon: false
    }
  }

  changeProfileMenu (event) {
    const { dispatch } = this.props;
    dispatch(toggleActions.toggleProfileMenu());
    this.setState({ anchorEl: event.currentTarget })
  }

  changeDrawerOpen () {
    const { dispatch } = this.props;
    dispatch(toggleActions.toggleSideNav());
  }

  componentWillMount() {

    console.log(window.location.hash)
    if(window.location.hash.search('classroom') > -1) {
      this.setState({showMenuIcon: true})
    }

    hashHistory.listen(location => {
    const {dispatch} = this.props
    dispatch(userActions.errorNuller())
    console.log(location.pathname);
    if (['/home','/pricing','/auth', '/complaints'].indexOf(location.pathname) > -1 || location.pathname =='/') {
      this.setState({showMenuIcon: false})
    }
    else
      this.setState({showMenuIcon: true})
  })
  }

  render() {
    return (
      <div>
      {
        !this.props.user ? (
        <AppBar
          style={{position: "fixed"}}
          title={<MyTitle />}
          zDepth={1}
          iconElementRight={<div><IconButton><MoreVertIcon /></IconButton><ProfileMenu anchorEl={this.state.anchorEl} open={this.props.openProfileMenu} onRequestClose={this.changeProfileMenu}/></div>}
          showMenuIconButton={false}
          onRightIconButtonClick={this.changeProfileMenu}
        />
        ) : (
        <AppBar
          style={{position: "fixed"}}
          title={<MyTitle />}
          zDepth={1}
          iconElementLeft={<IconButton>{this.props.openSideNav ? <CloseIcon /> : <MenuIcon />}</IconButton>}
          iconElementRight={<div style={{float: 'right'}}><IconButton><MoreVertIcon/></IconButton><ProfileMenu anchorEl={this.state.anchorEl} open={this.props.openProfileMenu} onRequestClose={this.changeProfileMenu}/></div>}
          onRightIconButtonClick={this.changeProfileMenu}
          onLeftIconButtonClick={this.changeDrawerOpen}
          showMenuIconButton={this.state.showMenuIcon}
        />
        )
      }
      </div>
    );
  }
}
function mapStateToProps(state) {
  const {user} = state.authentication
  const{openSideNav, openProfileMenu} = state.toggler  
  return {
    user,
    openSideNav,
    openProfileMenu,
  }
}

export default connect(mapStateToProps)(AppBarComponent)
