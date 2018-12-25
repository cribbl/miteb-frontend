import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import LandingPage from './components/LandingPage/LandingPage'
import LoginComponent from './components/LoginComponent/LoginComponent'
import ForgotPasswordContainer from './components/LoginComponent/ForgotPasswordContainer'
import SignupContainer from './components/LoginComponent/SignupContainer'
import SignupFAContainer from './components/LoginComponent/SignupFAContainer'
import DevelopersComponent from './components/DevelopersComponent/DevelopersComponent'
// logo, name, fa, email, pass, notif settings: email after every approval/reject, sms and,aws, push notifs,

import ClassroomComponent from './components/ClassroomComponent/ClassroomComponent'
import MyEventsComponent from './components/ClassroomComponent/MyEventsComponent/MyEventsComponent'
import SCEventsComponent from './components/ClassroomComponent/MyEventsComponent/SCEventsComponent'
import FAmyEventsComponent from './components/ClassroomComponent/MyEventsComponent/FAMyEventsComponent'
import ADeventsComponent from './components/ClassroomComponent/MyEventsComponent/ADEventsComponent'
import SOeventsComponent from './components/ClassroomComponent/MyEventsComponent/SOEventsComponent'
import DashboardComponent from './components/ClassroomComponent/DashboardComponent/DashboardComponent'
import BookingComponent from './components/ClassroomComponent/BookingComponent/BookingComponent'
import ProfileComponent from './components/ClassroomComponent/ProfileComponent/Profile'
import ApproveClubsComponent from './components/ClassroomComponent/ApproveClubsComponent/ApproveClubsContainer'

import ComplaintsComponent from './components/ComplaintsComponent/ComplaintsComponent'
import ViewComplaintsComponent from './components/ClassroomComponent/ViewComplaintsComponent/ViewComplaintsComponent'
import NotFound from './components/NotFound/NotFound'
import Reg from './components/LoginComponent/Reg'

import FaqComponent from './components/FaqComponent/FaqComponent'
import PrivacyPolicy from './components/Policies/PrivacyPolicy'
import TnC from './components/Policies/TnC'
import postEventDetails from './components/ClassroomComponent/PostEventComponent/postEventContainer'

import { store } from './store'

import { Provider } from 'react-redux'

import './index.css'

import { Router, Route, IndexRoute, hashHistory } from 'react-router'

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route exact path='/' component={App}>
        <Route path='faq' component={FaqComponent} />
        <IndexRoute component={LandingPage} />
        <Route path='complaints' component={ComplaintsComponent} />
        <Route path='developers' component={DevelopersComponent} />
        <Route path='policy/privacy' component={PrivacyPolicy} />
        <Route path='policy/tnc' component={TnC} />
        <Route path='auth' component={Reg}>
          <IndexRoute component={LoginComponent} />
          <Route path='signin' component={LoginComponent} />
          <Route path='forgot' component={ForgotPasswordContainer} />
          <Route path='signup' component={SignupContainer} />
          <Route path='signup-fa' component={SignupFAContainer} />
        </Route>
        <Route path='dashboard' component={ClassroomComponent}>
          <IndexRoute component={DashboardComponent} />
          <Route path='myEvents' component={MyEventsComponent} />
          <Route path='scEvents' component={SCEventsComponent} />
          <Route path='faEvents' component={FAmyEventsComponent} />
          <Route path='adEvents' component={ADeventsComponent} />
          <Route path='soEvents' component={SOeventsComponent} />
          <Route path='book_room' component={BookingComponent} />
          <Route path='profile' component={ProfileComponent} />
          <Route path='approveClubs' component={ApproveClubsComponent} />
          <Route path='viewComplaints' component={ViewComplaintsComponent} />
          <Route path='postEventDetails' component={postEventDetails} />
        </Route>
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
