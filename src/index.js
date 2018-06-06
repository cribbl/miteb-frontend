import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import LandingPage from './components/LandingPage/LandingPage'
import LoginComponent from './components/LoginComponent/LoginComponent'
import ForgotPasswordContainer from './components/LoginComponent/ForgotPasswordContainer'
import DrawerComponent from './components/DrawerComponent/DrawerComponent'

//logo, name, fa, email, pass, notif settings: email after every approval/reject, sms and,aws, push notifs,   

import ClassroomComponent from './components/ClassroomComponent/ClassroomComponent'
import MyEventsComponent from './components/ClassroomComponent/MyEventsComponent/MyEventsComponent'
import FA_MyEventsComponent from './components/ClassroomComponent/MyEventsComponent/FA_MyEventsComponent'
import AD_EventsComponent from './components/ClassroomComponent/MyEventsComponent/AD_EventsComponent'
import SO_EventsComponent from './components/ClassroomComponent/MyEventsComponent/SO_EventsComponent'
import DashboardComponent from './components/ClassroomComponent/DashboardComponent/DashboardComponent'
import BookingComponent from './components/ClassroomComponent/BookingComponent/BookingComponent'
import ProfileComponent from './components/ClassroomComponent/ProfileComponent/Profile'

import ComplaintsComponent from './components/ComplaintsComponent/ComplaintsComponent'

import Reg from './components/LoginComponent/Reg'
import {store} from './store'

import { Provider } from 'react-redux'

import './index.css';

import { Router, Route, IndexRoute, hashHistory } from 'react-router'

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
    	<Route path="/" component={App}>
        <Route path="complaints" component={ComplaintsComponent}></Route>
        <IndexRoute component={Reg}></IndexRoute>
            <Route path="auth" component={Reg}>
                <IndexRoute component={LoginComponent} />
                <Route path="signin" component={LoginComponent}></Route>
                <Route path="forgot" component={ForgotPasswordContainer}></Route>
            </Route>
        <Route path="dashboard" component={ClassroomComponent}>
            <IndexRoute component={DashboardComponent}></IndexRoute>
            <Route path="myEvents" component={MyEventsComponent}></Route>
            <Route path="faEvents" component={FA_MyEventsComponent}></Route>
            <Route path="adEvents" component={AD_EventsComponent}></Route>
            <Route path="soEvents" component={SO_EventsComponent}></Route>
            <Route path="book_room" component={BookingComponent}></Route>
            <Route path="profile" component={ProfileComponent}></Route>
        </Route>
    	</Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
