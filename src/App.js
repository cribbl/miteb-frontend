import React, { Component } from 'react';
import { hashHistory, Router, Route} from 'react-router';
import AppBarComponent from './components/AppBarComponent/AppBarComponent';
import AppBarMobile from './components/AppBarComponent/AppBarMobile'
import DrawerComponent from './components/DrawerComponent/DrawerComponent';
import ReactLoading from 'react-loading';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SnackbarComponent from './components/SnackbarComponent'
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
      {this.props.sessionCheck ? <div style={{display: 'flex', justifyContent: 'center'}}><ReactLoading type={'cylon'} color={'#00bcd4'} height='667px' width='50%' /></div> : (
        <div className="propChildrenContainer">
    	   {this.props.children}
         <SnackbarComponent />
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
