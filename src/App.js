import React, { Component } from 'react';
import { hashHistory, Router, Route} from 'react-router';
import AppBarComponent from './components/AppBarComponent/AppBarComponent';
import AppBarMobile from './components/AppBarComponent/AppBarMobile'
import DrawerComponent from './components/DrawerComponent/DrawerComponent';
import ReactLoading from 'react-loading';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import {store} from './store'
import {connect} from 'react-redux'

import {userActions} from './actions/userActions'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const {dispatch} = this.props
    dispatch(userActions.getUser());
  }
  
  render() {
    return (
      <MuiThemeProvider>
    	<div>
    	{this.props.isMobile ? <AppBarMobile /> : <AppBarComponent />}
      {this.props.sessionCheck ? <ReactLoading type={'cylon'} color={'#FF0000'} height='667' width='375' /> : (
        <div className="propChildrenContainer">
    	   {this.props.children}
        </div>
        )}
      </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  const {isMobile} = state.toggler
  const {sessionCheck} = state.authentication
  return {
    isMobile,
    sessionCheck
  }
}

export default connect(mapStateToProps)(App);
