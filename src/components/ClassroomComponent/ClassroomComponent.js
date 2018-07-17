import React, {Component} from 'react';
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux'
import {toggleActions} from '../../actions/toggleActions'
import {userActions} from '../../actions/userActions'

const astyle = {
  minWidth: '100%',
  paddingLeft: 0,
}

const bstyle = {
  minWidth: '100%',
  paddingLeft: 230,
}

class ClassroomComponent extends Component {
  constructor (props) {
    super(props)
    const {dispatch} = this.props
    dispatch(toggleActions.closeProfileMenu());
    if(this.props.user) {
      console.log('User prop exists')
    }
    else {
      console.log('User prop DNE')
      hashHistory.push('/auth')
    }
  }

  render() {
    return (
    	<div className="row">
      		<div>
      		<DrawerComponent />
          </div>
      		<div style={this.props.isMobile ? astyle : bstyle}>
      		{this.props.children}
      		</div>
	    </div>
    );
  }
}
function mapStateToProps(state) {
  const {openSideNav, isMobile} = state.toggler
  const {user, verified} = state.authentication
  return {
    user,
    openSideNav,
    verified,
    isMobile
  }
}

export default connect(mapStateToProps)(ClassroomComponent)