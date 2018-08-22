import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import LandingPage from './components/LandingPage/LandingPage'
import LoginComponent from './components/LoginComponent/LoginComponent'
import ForgotPasswordContainer from './components/LoginComponent/ForgotPasswordContainer'
import SignupContainer from './components/LoginComponent/SignupContainer'
import SignupFAContainer from './components/LoginComponent/SignupFAContainer'
import DrawerComponent from './components/DrawerComponent/DrawerComponent'
import DevelopersComponent from './components/DevelopersComponent/DevelopersComponent'
//logo, name, fa, email, pass, notif settings: email after every approval/reject, sms and,aws, push notifs,   

import ClassroomComponent from './components/ClassroomComponent/ClassroomComponent'
import MyEventsComponent from './components/ClassroomComponent/MyEventsComponent/MyEventsComponent'
import FA_MyEventsComponent from './components/ClassroomComponent/MyEventsComponent/FA_MyEventsComponent'
import AD_EventsComponent from './components/ClassroomComponent/MyEventsComponent/AD_EventsComponent'
import SO_EventsComponent from './components/ClassroomComponent/MyEventsComponent/SO_EventsComponent'
import DashboardComponent from './components/ClassroomComponent/DashboardComponent/DashboardComponent'
import BookingComponent from './components/ClassroomComponent/BookingComponent/BookingComponent'
import ProfileComponent from './components/ClassroomComponent/ProfileComponent/Profile'
import ApproveClubsComponent from './components/ClassroomComponent/ApproveClubsComponent/ApproveClubsContainer'
import PublicityPermComponent from './components/ClassroomComponent/PublicityPermComponent/Publicity'
import MyPublicityComponent from './components/ClassroomComponent/MyPublicityEventsComponent/MyPublicityComponent';
import FA_MyPublicityComponent from './components/ClassroomComponent/MyPublicityEventsComponent/FA_MyPublicityComponent';
import SO_MyPublicityComponent from './components/ClassroomComponent/MyPublicityEventsComponent/SO_MyPublicityComponent';
import AD_MyPublicityComponent from './components/ClassroomComponent/MyPublicityEventsComponent/AD_MyPublicityComponent';


import ComplaintsComponent from './components/ComplaintsComponent/ComplaintsComponent'
import ViewComplaintsComponent from './components/ClassroomComponent/ViewComplaintsComponent/ViewComplaintsComponent'
import NotFound from './components/NotFound/NotFound'
import Reg from './components/LoginComponent/Reg'

import FaqComponent from './components/FaqComponent/FaqComponent'
import PrivacyPolicy from './components/Policies/PrivacyPolicy'
import TnC from './components/Policies/TnC'

import {store} from './store'

import { Provider } from 'react-redux'

import './index.css';

import { Router, Route, IndexRoute, hashHistory } from 'react-router'

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
        <Route exact path="/" component={App}>
            <Route path="faq" component={FaqComponent}></Route>
            <IndexRoute component={LandingPage}></IndexRoute>
            <Route path="complaints" component={NotFound}></Route>
            <Route path='developers' component={DevelopersComponent}></Route>
            <Route path='policy/privacy' component={PrivacyPolicy}></Route>
            <Route path='policy/tnc' component={TnC}></Route>
            <Route path="auth" component={Reg}>
                <IndexRoute component={LoginComponent} />
                <Route path="signin" component={LoginComponent}></Route>
                <Route path="forgot" component={ForgotPasswordContainer}></Route>
                <Route path="signup" component={SignupContainer}></Route>
                <Route path="signup-fa" component={SignupFAContainer}></Route>
            </Route>
            <Route path="dashboard" component={ClassroomComponent}>
                <IndexRoute component={DashboardComponent}></IndexRoute>
                <Route path="myEvents" component={MyEventsComponent}></Route>
                <Route path="faEvents" component={FA_MyEventsComponent}></Route>
                <Route path="adEvents" component={AD_EventsComponent}></Route>
                <Route path="soEvents" component={SO_EventsComponent}></Route>
                <Route path="book_room" component={BookingComponent}></Route>
                <Route path="profile" component={ProfileComponent}></Route>
                <Route path="publicity_perm" component={PublicityPermComponent}></Route>
                <Route path="myPublicity" component={MyPublicityComponent}></Route>
                <Route path="faPublicity" component={FA_MyPublicityComponent}></Route>
                <Route path="adPublicity" component={AD_MyPublicityComponent}></Route>
                <Route path="soPublicity" component={SO_MyPublicityComponent}></Route>
                <Route path="approveClubs" component={ApproveClubsComponent}></Route>
                <Route path="viewComplaints" component={ViewComplaintsComponent}></Route>
            </Route>
        <Route path="*" component={NotFound} />
        </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
