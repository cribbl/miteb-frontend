import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import LandingPage from './components/LandingPage/LandingPage'
import LoginComponent from './components/LoginComponent/LoginComponent'
import DrawerComponent from './components/DrawerComponent/DrawerComponent'


import ClassroomComponent from './components/ClassroomComponent/ClassroomComponent'
import MyEventsComponent from './components/ClassroomComponent/MyEventsComponent/MyEventsComponent'
import DashboardComponent from './components/ClassroomComponent/DashboardComponent/DashboardComponent'
import BookingComponent from './components/ClassroomComponent/BookingComponent/BookingComponent'

import Reg from './components/LoginComponent/Reg'
import {store} from './store'

import { Provider } from 'react-redux'

import './index.css';

import { Router, Route, IndexRoute, hashHistory } from 'react-router'

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
    	<Route path="/" component={App}>
    	<IndexRoute component={Reg}></IndexRoute>
        	<Route path="auth" component={Reg}>
    			<IndexRoute component={LoginComponent} />
    			<Route path="signin" component={LoginComponent}></Route>
    		</Route>
        <Route path="dashboard" component={ClassroomComponent}>
            <IndexRoute component={DashboardComponent}></IndexRoute>
            <Route path="myEvents" component={MyEventsComponent}></Route>
            <Route path="book_room" component={BookingComponent}></Route>
        </Route>
    	</Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
